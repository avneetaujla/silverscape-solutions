import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import {
  GA_MEASUREMENT_ID,
  META_PIXEL_ID,
  gaBootstrap,
  metaPixelBootstrap,
  trackEvent,
  trackPageView,
  type AnalyticsEvent,
} from "@/lib/analytics";

/** Third-party tags, rendered only when their IDs are configured. */
export function AnalyticsScripts() {
  return (
    <>
      {GA_MEASUREMENT_ID && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`}
          />
          <script
            dangerouslySetInnerHTML={{ __html: gaBootstrap(GA_MEASUREMENT_ID) }}
          />
        </>
      )}
      {META_PIXEL_ID && (
        <script
          dangerouslySetInnerHTML={{
            __html: metaPixelBootstrap(META_PIXEL_ID),
          }}
        />
      )}
    </>
  );
}

/** Page views on navigation plus one delegated listener for phone, email and CTA clicks. */
export function useAnalytics() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest?.("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      const location = window.location.pathname;
      if (href.startsWith("tel:")) {
        trackEvent("phone_click", { link_location: location });
      } else if (href.startsWith("mailto:")) {
        trackEvent("email_click", { link_location: location });
      }
      if (
        (anchor.dataset.track as AnalyticsEvent | undefined) ===
        "request_quote_click"
      ) {
        trackEvent("request_quote_click", {
          cta_location: anchor.dataset.trackLabel ?? location,
        });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
}
