import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { z } from "zod";
import { BUSINESS } from "@/lib/site";
import {
  SOD_PRODUCT,
  calculateSodPrice,
  sodOrderSchema,
  type SodOrderInput,
  type SodQuote,
  type SodResult,
} from "@/lib/sod/pricing";
import {
  computeDeliveryRoute,
  geocodeOntarioAddress,
  mapsKey,
} from "@/lib/sod/route.server";
import {
  createSodCheckoutSession,
  retrieveCheckoutSession,
  stripeKey,
} from "@/lib/sod/stripe.server";
import { confirmationEmailConfigured } from "@/lib/sod/confirmation-email.server";
import { CHECKOUT_ACKNOWLEDGEMENT, launchBlockers } from "@/lib/legal";
import { isRateLimited } from "@/lib/rate-limit.server";

const CALL_US = `Please call ${BUSINESS.phoneDisplay} and we'll price your order directly.`;

const RATE_LIMITED = {
  ok: false as const,
  code: "invalid" as const,
  message: `Too many attempts from this connection. Please wait a few minutes and try again, or call ${BUSINESS.phoneDisplay}.`,
};

/**
 * Live (real-money) payments stay off while any launch blocker remains or no
 * durable confirmation email can be sent. Test-mode keys are unaffected so the
 * flow can still be exercised end to end.
 */
function liveCheckoutBlockers() {
  const key = stripeKey();
  if (!/^(sk|rk)_live_/.test(key)) return [];
  const blockers = launchBlockers();
  if (!confirmationEmailConfigured())
    blockers.push(
      "Order confirmation email not configured (STRIPE_WEBHOOK_SECRET, RESEND_API_KEY, LEAD_FROM_EMAIL)",
    );
  return blockers;
}

async function buildQuote(order: SodOrderInput): Promise<SodResult<SodQuote>> {
  if (!mapsKey()) {
    console.error("[sod] GOOGLE_MAPS_API_KEY is not set");
    return {
      ok: false,
      code: "not_configured",
      message: `Online delivery pricing is temporarily unavailable. ${CALL_US}`,
    };
  }

  const geo = await geocodeOntarioAddress(
    `${order.street}, ${order.city}, ON ${order.postalCode}, Canada`,
  );
  if (!geo.ok) {
    const messages = {
      not_found:
        "We couldn't find that address. Please check the street, city and postal code.",
      imprecise:
        "Please enter a complete street address (number and street) so we can route the delivery.",
      outside_ontario: "Sod delivery is available to Ontario addresses only.",
      error: `We couldn't verify the address right now. ${CALL_US}`,
    } as const;
    return {
      ok: false,
      code:
        geo.reason === "outside_ontario"
          ? "outside_service_area"
          : "address_not_found",
      message: messages[geo.reason],
    };
  }

  const route = await computeDeliveryRoute(geo);
  if (!route) {
    return {
      ok: false,
      code: "route_failed",
      message: `We couldn't calculate a driving route to that address. ${CALL_US}`,
    };
  }

  const maxKm = Number(process.env.SOD_MAX_ROUTE_KM);
  if (Number.isFinite(maxKm) && maxKm > 0 && route.totalKm > maxKm) {
    return {
      ok: false,
      code: "outside_service_area",
      message: `That address is outside our online delivery area. ${CALL_US}`,
    };
  }

  const price = calculateSodPrice(order.rolls, route.totalKm);
  return {
    ok: true,
    data: {
      rolls: order.rolls,
      coverageSqFt: order.rolls * SOD_PRODUCT.rollSqFt,
      routeKm: price.routeKm,
      legs: route.legs,
      sodSubtotalCents: price.sodSubtotalCents,
      sodHstCents: price.sodHstCents,
      sodTotalCents: price.sodTotalCents,
      deliveryCents: price.deliveryCents,
      totalCents: price.totalCents,
      deliveryAddress: geo.formatted,
    },
  };
}

export const quoteSodOrder = createServerFn({ method: "POST" })
  .validator((input: unknown) => sodOrderSchema.parse(input))
  .handler(async ({ data }): Promise<SodResult<SodQuote>> => {
    if (isRateLimited("sod_quote", 20, 10 * 60_000)) return RATE_LIMITED;
    return buildQuote(data);
  });

const checkoutSchema = sodOrderSchema.extend({
  expectedTotalCents: z.number().int().positive(),
  attemptId: z.string().uuid(),
  /** The unchecked-by-default acknowledgement on the review step. */
  acceptedTerms: z.literal(true, {
    errorMap: () => ({
      message:
        "Please confirm you've reviewed your order and agree to the terms.",
    }),
  }),
});

export const startSodCheckout = createServerFn({ method: "POST" })
  .validator((input: unknown) => checkoutSchema.parse(input))
  .handler(async ({ data }): Promise<SodResult<{ url: string }>> => {
    if (isRateLimited("sod_checkout", 10, 10 * 60_000)) return RATE_LIMITED;
    if (!stripeKey()) {
      console.error("[sod] STRIPE_SECRET_KEY is not set");
      return {
        ok: false,
        code: "not_configured",
        message: `Online payment is temporarily unavailable. ${CALL_US}`,
      };
    }
    const blockers = liveCheckoutBlockers();
    if (blockers.length) {
      console.error("[sod] Live checkout blocked:", blockers.join(" | "));
      return {
        ok: false,
        code: "not_configured",
        message: `Online payment isn't available yet. ${CALL_US}`,
      };
    }

    const { expectedTotalCents, attemptId, acceptedTerms: _, ...order } = data;
    // Never trust the client total: recalculate from scratch and refuse on mismatch.
    const quote = await buildQuote(order);
    if (!quote.ok) return quote;
    if (quote.data.totalCents !== expectedTotalCents) {
      return {
        ok: false,
        code: "price_changed",
        message:
          "Your delivery total was recalculated. Please review the updated summary before paying.",
      };
    }

    const request = getRequest();
    const origin =
      process.env.URL?.trim() && process.env.CONTEXT === "production"
        ? process.env.URL.trim()
        : new URL(request.url).origin;

    try {
      const session = await createSodCheckoutSession({
        order,
        quote: quote.data,
        origin,
        idempotencyKey: attemptId,
        acknowledgement: {
          version: CHECKOUT_ACKNOWLEDGEMENT.version,
          acceptedAt: new Date().toISOString(),
        },
      });
      if (!session.url) throw new Error("Stripe returned no checkout URL");
      return { ok: true, data: { url: session.url } };
    } catch (error) {
      console.error("[sod] checkout session failed", error);
      return {
        ok: false,
        code: "payment_failed",
        message: `We couldn't start secure checkout. ${CALL_US}`,
      };
    }
  });

export const getSodOrderStatus = createServerFn({ method: "GET" })
  .validator((input: unknown) =>
    z
      .object({ sessionId: z.string().regex(/^cs_[A-Za-z0-9_]+$/) })
      .parse(input),
  )
  .handler(async ({ data }) => {
    if (!stripeKey()) return { found: false as const };
    try {
      const s = await retrieveCheckoutSession(data.sessionId);
      if (s.metadata?.order_type !== "sod_delivery")
        return { found: false as const };
      return {
        found: true as const,
        paid: s.payment_status === "paid",
        totalCents: s.amount_total ?? Number(s.metadata.total_cents),
        rolls: Number(s.metadata.rolls),
        routeKm: s.metadata.route_km,
        deliveryAddress: s.metadata.delivery_address,
        email: s.customer_details?.email ?? null,
        confirmationEmail: confirmationEmailConfigured(),
      };
    } catch (error) {
      console.error("[sod] session lookup failed", error);
      return { found: false as const };
    }
  });
