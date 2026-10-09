import {
  SOD_PRODUCT,
  type SodOrderInput,
  type SodQuote,
} from "@/lib/sod/pricing";

const STRIPE_API = "https://api.stripe.com/v1";

export function stripeKey() {
  return process.env.STRIPE_SECRET_KEY?.trim() || "";
}

async function stripeRequest<T>(
  path: string,
  init: {
    method: "GET" | "POST";
    body?: URLSearchParams;
    idempotencyKey?: string;
  },
): Promise<T> {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${stripeKey()}`,
  };
  if (init.body) headers["Content-Type"] = "application/x-www-form-urlencoded";
  if (init.idempotencyKey) headers["Idempotency-Key"] = init.idempotencyKey;
  const res = await fetch(`${STRIPE_API}${path}`, {
    method: init.method,
    headers,
    body: init.body,
  });
  const json = (await res.json()) as T & { error?: { message?: string } };
  if (!res.ok) {
    throw new Error(
      json.error?.message ?? `Stripe request failed (${res.status})`,
    );
  }
  return json;
}

export type CheckoutSession = {
  id: string;
  url: string | null;
  status: "open" | "complete" | "expired";
  payment_status: "paid" | "unpaid" | "no_payment_required";
  amount_total: number | null;
  currency: string | null;
  customer_details?: { email?: string | null; name?: string | null } | null;
  metadata: Record<string, string>;
};

/** Creates a hosted Stripe Checkout session for a server-calculated sod quote. Card data never touches our servers. */
export async function createSodCheckoutSession(input: {
  order: SodOrderInput;
  quote: SodQuote;
  origin: string;
  idempotencyKey: string;
}) {
  const { order, quote, origin } = input;
  const metadata: Record<string, string> = {
    order_type: "sod_delivery",
    rolls: String(quote.rolls),
    route_km: quote.routeKm.toFixed(1),
    sod_total_cents: String(quote.sodTotalCents),
    delivery_cents: String(quote.deliveryCents),
    total_cents: String(quote.totalCents),
    delivery_address: quote.deliveryAddress.slice(0, 500),
    customer_name: order.name.slice(0, 100),
    customer_phone: order.phone.slice(0, 40),
    notes: (order.notes ?? "").slice(0, 500),
  };

  const body = new URLSearchParams();
  body.set("mode", "payment");
  body.set("currency", "cad");
  body.set("customer_email", order.email);
  body.set(
    "success_url",
    `${origin}/sod-ordering/confirmation?session_id={CHECKOUT_SESSION_ID}`,
  );
  body.set("cancel_url", `${origin}/sod-ordering?checkout=cancelled`);

  body.set("line_items[0][quantity]", "1");
  body.set("line_items[0][price_data][currency]", "cad");
  body.set(
    "line_items[0][price_data][unit_amount]",
    String(quote.sodTotalCents),
  );
  body.set(
    "line_items[0][price_data][product_data][name]",
    `${SOD_PRODUCT.name} — ${quote.rolls} roll${quote.rolls === 1 ? "" : "s"}`,
  );
  body.set(
    "line_items[0][price_data][product_data][description]",
    `${quote.rolls} × $4.20 per roll, plus 13% HST. ${quote.coverageSqFt} sq ft coverage.`,
  );

  body.set("line_items[1][quantity]", "1");
  body.set("line_items[1][price_data][currency]", "cad");
  body.set(
    "line_items[1][price_data][unit_amount]",
    String(quote.deliveryCents),
  );
  body.set("line_items[1][price_data][product_data][name]", "Sod delivery");
  body.set(
    "line_items[1][price_data][product_data][description]",
    `${quote.routeKm.toFixed(1)} km round-trip route at $1.50/km`,
  );

  for (const [key, value] of Object.entries(metadata)) {
    body.set(`metadata[${key}]`, value);
    body.set(`payment_intent_data[metadata][${key}]`, value);
  }
  body.set(
    "payment_intent_data[description]",
    `Sod delivery — ${quote.rolls} rolls to ${quote.deliveryAddress}`.slice(
      0,
      500,
    ),
  );

  return stripeRequest<CheckoutSession>("/checkout/sessions", {
    method: "POST",
    body,
    idempotencyKey: input.idempotencyKey,
  });
}

export function retrieveCheckoutSession(id: string) {
  return stripeRequest<CheckoutSession>(
    `/checkout/sessions/${encodeURIComponent(id)}`,
    { method: "GET" },
  );
}
