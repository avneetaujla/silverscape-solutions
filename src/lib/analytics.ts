type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export const GA_MEASUREMENT_ID = String(
  import.meta.env.VITE_GA4_MEASUREMENT_ID ?? "",
).trim();
export const META_PIXEL_ID = String(
  import.meta.env.VITE_META_PIXEL_ID ?? "",
).trim();

export type AnalyticsEvent =
  | "generate_lead"
  | "phone_click"
  | "email_click"
  | "request_quote_click"
  | "sod_order_started"
  | "sod_quote_calculated"
  | "begin_checkout"
  | "purchase"
  | "portfolio_filter"
  | "portfolio_project_view";

/** Meta standard events where a clean equivalent exists; everything else stays GA-only. */
const META_EVENT: Partial<Record<AnalyticsEvent, string>> = {
  generate_lead: "Lead",
  phone_click: "Contact",
  email_click: "Contact",
  begin_checkout: "InitiateCheckout",
  purchase: "Purchase",
};

export function trackEvent(name: AnalyticsEvent, params: Params = {}) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", name, params);
  const metaName = META_EVENT[name];
  if (metaName && window.fbq) {
    const { value, currency } = params;
    window.fbq(
      "track",
      metaName,
      value !== undefined ? { value, currency: currency ?? "CAD" } : undefined,
    );
  }
}

export function trackPageView(path: string) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
  window.fbq?.("track", "PageView");
}

/** Inline bootstrap snippets, rendered in <head> only when the IDs are configured. */
export function gaBootstrap(id: string) {
  return `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config',${JSON.stringify(id)},{send_page_view:false});`;
}

export function metaPixelBootstrap(id: string) {
  return `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init',${JSON.stringify(id)});`;
}
