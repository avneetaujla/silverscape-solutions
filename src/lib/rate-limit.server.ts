import { getRequest } from "@tanstack/react-start/server";

/**
 * Best-effort fixed-window limiter, kept in memory per server instance.
 * Serverless instances are short-lived and not shared, so this throttles
 * bursts from one client rather than enforcing a global quota. Pair it with
 * provider-side limits (Google Maps quotas, Stripe, Resend).
 */
const buckets = new Map<string, { count: number; resetAt: number }>();
const MAX_BUCKETS = 5000;

function clientIp() {
  try {
    const h = getRequest().headers;
    return (
      h.get("x-nf-client-connection-ip") ||
      h.get("cf-connecting-ip") ||
      h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown"
    );
  } catch {
    return "unknown";
  }
}

/** Returns true when the caller is over `limit` requests in `windowMs` for this action. */
export function isRateLimited(action: string, limit: number, windowMs: number) {
  const now = Date.now();
  if (buckets.size > MAX_BUCKETS) {
    for (const [k, b] of buckets) if (b.resetAt <= now) buckets.delete(k);
  }
  const key = `${action}:${clientIp()}`;
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }
  bucket.count += 1;
  return bucket.count > limit;
}
