import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import {
  trackEvent,
  trackPageView,
  type AnalyticsEvent,
} from "@/lib/analytics";

/**
 * Page views on navigation plus one delegated listener for phone, email and
 * CTA clicks. Every call is a no-op until the visitor has consented
 * (see ConsentManager); no tag is loaded server-side.
 */
export function useAnalytics() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    trackPageView();
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest?.("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      const location = window.location.pathname;
      if (href.startsWith("tel:")) {
        trackEvent("phone_clicked", { link_location: location });
      } else if (href.startsWith("mailto:")) {
        trackEvent("email_clicked", { link_location: location });
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
