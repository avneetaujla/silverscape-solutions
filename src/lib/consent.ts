/**
 * Cookie / tracking consent. Strictly necessary storage is always on;
 * analytics (GA4) and marketing (Meta Pixel) default to OFF and their scripts
 * are not requested until the visitor opts in.
 *
 * Bump CONSENT_VERSION when the categories or tools change materially; stored
 * choices with an older version are discarded and the banner is shown again.
 */
export const CONSENT_VERSION = "2026-10-09";
export const CONSENT_STORAGE_KEY = "sss_consent";

const CHANGE_EVENT = "sss:consent-change";
const OPEN_EVENT = "sss:open-cookie-settings";

export type ConsentChoice = { analytics: boolean; marketing: boolean };
export type ConsentRecord = ConsentChoice & {
  necessary: true;
  version: string;
  timestamp: string;
};

export const NO_CONSENT: ConsentChoice = { analytics: false, marketing: false };

export function readConsent(): ConsentRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ConsentRecord>;
    if (parsed.version !== CONSENT_VERSION) return null;
    return {
      necessary: true,
      analytics: parsed.analytics === true,
      marketing: parsed.marketing === true,
      version: parsed.version,
      timestamp: String(parsed.timestamp ?? ""),
    };
  } catch {
    return null;
  }
}

export function saveConsent(choice: ConsentChoice): ConsentRecord {
  const record: ConsentRecord = {
    necessary: true,
    analytics: choice.analytics,
    marketing: choice.marketing,
    version: CONSENT_VERSION,
    timestamp: new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Storage blocked: the choice still applies for this page view.
  }
  window.dispatchEvent(
    new CustomEvent<ConsentRecord>(CHANGE_EVENT, { detail: record }),
  );
  return record;
}

export function onConsentChange(cb: (record: ConsentRecord) => void) {
  const handler = (e: Event) => cb((e as CustomEvent<ConsentRecord>).detail);
  window.addEventListener(CHANGE_EVENT, handler);
  return () => window.removeEventListener(CHANGE_EVENT, handler);
}

/** Reopens the consent manager (footer "Cookie Settings", Cookie Policy page). */
export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function onOpenCookieSettings(cb: () => void) {
  window.addEventListener(OPEN_EVENT, cb);
  return () => window.removeEventListener(OPEN_EVENT, cb);
}
