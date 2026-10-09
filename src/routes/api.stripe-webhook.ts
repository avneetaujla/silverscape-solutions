import { createFileRoute } from "@tanstack/react-router";
import {
  verifyStripeSignature,
  type CheckoutSession,
} from "@/lib/sod/stripe.server";
import {
  confirmationEmailConfigured,
  sendSodOrderEmails,
} from "@/lib/sod/confirmation-email.server";

type StripeEvent = {
  type: string;
  data: { object: CheckoutSession };
};

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

/**
 * Stripe webhook: sends the written order confirmation once payment succeeds.
 * Configure in Stripe → Developers → Webhooks with the events
 * checkout.session.completed and checkout.session.async_payment_succeeded,
 * and set STRIPE_WEBHOOK_SECRET to the endpoint's signing secret.
 */
export const Route = createFileRoute("/api/stripe-webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env.STRIPE_WEBHOOK_SECRET?.trim();
        if (!secret || !confirmationEmailConfigured()) {
          console.error("[stripe-webhook] Not configured");
          return json(503, { error: "not_configured" });
        }
        const payload = await request.text();
        const valid = await verifyStripeSignature(
          payload,
          request.headers.get("stripe-signature"),
          secret,
        );
        if (!valid) return json(400, { error: "invalid_signature" });

        let event: StripeEvent;
        try {
          event = JSON.parse(payload) as StripeEvent;
        } catch {
          return json(400, { error: "invalid_payload" });
        }

        const session = event.data?.object;
        const relevant =
          (event.type === "checkout.session.completed" ||
            event.type === "checkout.session.async_payment_succeeded") &&
          session?.metadata?.order_type === "sod_delivery" &&
          session.payment_status === "paid";
        if (!relevant) return json(200, { received: true });

        try {
          await sendSodOrderEmails(session);
        } catch (error) {
          console.error(
            "[stripe-webhook] confirmation email failed",
            error instanceof Error ? error.message : "unknown",
          );
          // Non-2xx makes Stripe retry; Resend idempotency keys prevent duplicates.
          return json(500, { error: "email_failed" });
        }
        return json(200, { received: true });
      },
    },
  },
});
