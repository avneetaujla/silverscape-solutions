import { createServerFn } from "@tanstack/react-start";
import { leadSchema } from "@/lib/leads/lead-schema";
import { deliverLead } from "@/lib/leads/deliver.server";

export type LeadResult =
  | { ok: true }
  | { ok: false; code: "not_configured" | "delivery_failed" | "rejected" };

const MIN_FILL_MS = 2500;

export const submitLead = createServerFn({ method: "POST" })
  .validator((input: unknown) => leadSchema.parse(input))
  .handler(async ({ data }): Promise<LeadResult> => {
    // Bots fill the honeypot or submit instantly; acknowledge without delivering.
    if (data.website || data.elapsedMs < MIN_FILL_MS) {
      return { ok: true };
    }
    const result = await deliverLead(data);
    if (!result.configured) {
      console.error(
        "[lead] No delivery channel configured. Set RESEND_API_KEY + LEAD_NOTIFICATION_EMAIL and/or LEAD_WEBHOOK_URL.",
      );
      return { ok: false, code: "not_configured" };
    }
    return result.delivered
      ? { ok: true }
      : { ok: false, code: "delivery_failed" };
  });
