import { createServerFn } from "@tanstack/react-start";
import { leadSchema } from "@/lib/leads/lead-schema";
import {
  deliverLead,
  type MarketingConsentRecord,
} from "@/lib/leads/deliver.server";
import { MARKETING_CONSENT, marketingConsentAvailable } from "@/lib/legal";
import { isRateLimited } from "@/lib/rate-limit.server";

export type LeadResult =
  | { ok: true }
  | {
      ok: false;
      code: "not_configured" | "delivery_failed" | "rejected" | "rate_limited";
    };

const MIN_FILL_MS = 2500;

export const submitLead = createServerFn({ method: "POST" })
  .validator((input: unknown) => leadSchema.parse(input))
  .handler(async ({ data }): Promise<LeadResult> => {
    if (isRateLimited("lead", 5, 10 * 60_000)) {
      return { ok: false, code: "rate_limited" };
    }
    // Bots fill the honeypot or submit instantly; acknowledge without delivering.
    if (data.website || data.elapsedMs < MIN_FILL_MS) {
      return { ok: true };
    }
    const marketing: MarketingConsentRecord | null = marketingConsentAvailable()
      ? {
          granted: data.marketingOptIn === true,
          recordedAt: new Date().toISOString(),
          wordingVersion: MARKETING_CONSENT.version,
          wording: MARKETING_CONSENT.wording,
          channel: MARKETING_CONSENT.channel,
          source: `Website quote form (${data.pagePath})`,
        }
      : null;
    const result = await deliverLead(data, marketing);
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
