import { NO_CONSENT, type ConsentChoice } from "@/lib/consent";

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: ((...args: unknown[]) => void) & {
      callMethod?: (...args: unknown[]) => void;
      queue?: unknown[];
      loaded?: boolean;
      version?: string;
      push?: unknown;
    };
    _fbq?: unknown;
  }
}

export const GA_MEASUREMENT_ID = String(
  import.meta.env.VITE_GA4_MEASUREMENT_ID ?? "",
).trim();
export const META_PIXEL_ID = String(
  import.meta.env.VITE_META_PIXEL_ID ?? "",
).trim();

/** True when at least one optional (consent-gated) tool is configured. */
export const OPTIONAL_TRACKING_CONFIGURED = Boolean(
  GA_MEASUREMENT_ID || META_PIXEL_ID,
);

/**
 * Event names and parameters must never carry names, emails, phone numbers,
 * street addresses or free-text project descriptions.
 */
export type AnalyticsEvent =
  | "quote_started"
  | "quote_submitted"
  | "phone_clicked"
  | "email_clicked"
  | "request_quote_click"
  | "portfolio_filter"
  | "portfolio_viewed"
  | "sod_order_started"
  | "sod_quote_calculated"
  | "sod_checkout_started"
  | "sod_order_completed";

/** Meta standard events where a clean equivalent exists; everything else stays GA-only. */
const META_EVENT: Partial<Record<AnalyticsEvent, string>> = {
  quote_submitted: "Lead",
  phone_clicked: "Contact",
  email_clicked: "Contact",
  sod_checkout_started: "InitiateCheckout",
  sod_order_completed: "Purchase",
};

let consent: ConsentChoice = { ...NO_CONSENT };
let gaLoaded = false;
let metaLoaded = false;

/** Page URL without query string or fragment (the confirmation page carries a Stripe session id). */
function cleanLocation() {
  return `${window.location.origin}${window.location.pathname}`;
}

function injectScript(src: string) {
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

function expireCookies(match: (name: string) => boolean) {
  const host = window.location.hostname;
  const domains = [host, `.${host}`, `.${host.replace(/^www\./, "")}`];
  for (const part of document.cookie.split(";")) {
    const name = part.split("=")[0]?.trim();
    if (!name || !match(name)) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/; domain=${domain}`;
    }
    document.cookie = `${name}=; Max-Age=0; path=/`;
  }
}

function loadGa(id: string) {
  (window as unknown as Record<string, unknown>)[`ga-disable-${id}`] = false;
  if (gaLoaded) {
    window.gtag?.("consent", "update", { analytics_storage: "granted" });
    return;
  }
  gaLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag.js expects the Arguments object itself.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag("js", new Date());
  window.gtag("config", id, {
    send_page_view: false,
    page_location: cleanLocation(),
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });
  injectScript(
    `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`,
  );
}

function stopGa(id: string) {
  (window as unknown as Record<string, unknown>)[`ga-disable-${id}`] = true;
  window.gtag?.("consent", "update", { analytics_storage: "denied" });
  expireCookies((n) => n === "_ga" || n.startsWith("_ga_") || n === "_gid");
}

function loadMeta(id: string) {
  if (metaLoaded) {
    window.fbq?.("consent", "grant");
    return;
  }
  metaLoaded = true;
  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue!.push(args);
  } as NonNullable<Window["fbq"]>;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  window.fbq = fbq;
  if (!window._fbq) window._fbq = fbq;
  // Automatic configuration would collect button text and page metadata.
  fbq("set", "autoConfig", false, id);
  fbq("consent", "grant");
  fbq("init", id);
  injectScript("https://connect.facebook.net/en_US/fbevents.js");
}

function stopMeta() {
  window.fbq?.("consent", "revoke");
  expireCookies((n) => n === "_fbp" || n === "_fbc");
}

/**
 * Applies the visitor's choice. Nothing optional is requested before this runs
 * with a granted category; withdrawing stops future events and clears the
 * tools' first-party cookies.
 */
export function applyConsent(
  next: ConsentChoice,
  { sendPageView = false }: { sendPageView?: boolean } = {},
) {
  if (typeof window === "undefined") return;
  const prev = consent;
  consent = { ...next };

  if (GA_MEASUREMENT_ID) {
    if (next.analytics) loadGa(GA_MEASUREMENT_ID);
    else if (prev.analytics || gaLoaded) stopGa(GA_MEASUREMENT_ID);
  }
  if (META_PIXEL_ID) {
    if (next.marketing) loadMeta(META_PIXEL_ID);
    else if (prev.marketing || metaLoaded) stopMeta();
  }
  if (
    sendPageView &&
    ((next.analytics && !prev.analytics) || (next.marketing && !prev.marketing))
  ) {
    trackPageView();
  }
}

export function hasTrackingConsent() {
  return (
    (consent.analytics && Boolean(GA_MEASUREMENT_ID)) ||
    (consent.marketing && Boolean(META_PIXEL_ID))
  );
}

export function trackEvent(name: AnalyticsEvent, params: Params = {}) {
  if (typeof window === "undefined") return;
  if (consent.analytics && gaLoaded) window.gtag?.("event", name, params);
  const metaName = META_EVENT[name];
  if (consent.marketing && metaLoaded && metaName) {
    const { value, currency } = params;
    window.fbq?.(
      "track",
      metaName,
      value !== undefined ? { value, currency: currency ?? "CAD" } : undefined,
    );
  }
}

export function trackPageView() {
  if (typeof window === "undefined") return;
  if (consent.analytics && gaLoaded) {
    window.gtag?.("set", { page_location: cleanLocation() });
    window.gtag?.("event", "page_view", {
      page_location: cleanLocation(),
      page_path: window.location.pathname,
      page_title: document.title,
    });
  }
  if (consent.marketing && metaLoaded) window.fbq?.("track", "PageView");
}
