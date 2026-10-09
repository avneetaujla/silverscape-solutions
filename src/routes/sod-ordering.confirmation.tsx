import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Clock } from "lucide-react";
import { Section } from "@/components/site/Section";
import { CTA } from "@/components/site/CTA";
import { BUSINESS } from "@/lib/site";
import { seo } from "@/lib/seo";
import { hasTrackingConsent, trackEvent } from "@/lib/analytics";
import { formatCents } from "@/lib/sod/pricing";
import { getSodOrderStatus } from "@/lib/sod/sod.functions";

const SESSION_RE = /^cs_[A-Za-z0-9_]+$/;

export const Route = createFileRoute("/sod-ordering/confirmation")({
  validateSearch: (search: Record<string, unknown>): { session_id?: string } =>
    typeof search.session_id === "string" && SESSION_RE.test(search.session_id)
      ? { session_id: search.session_id }
      : {},
  loaderDeps: ({ search }) => ({ sessionId: search.session_id }),
  loader: async ({ deps }) => {
    if (!deps.sessionId)
      return { status: { found: false as const }, sessionId: null };
    const status = await getSodOrderStatus({
      data: { sessionId: deps.sessionId },
    });
    return { status, sessionId: deps.sessionId };
  },
  head: () =>
    seo({
      title: "Sod Order Confirmation | SilverScape Solutions",
      description:
        "Confirmation of your Kentucky Bluegrass sod order with SilverScape Solutions.",
      path: "/sod-ordering/confirmation",
      noindex: true,
    }),
  component: ConfirmationPage,
});

function ConfirmationPage() {
  const { status, sessionId } = Route.useLoaderData();

  useEffect(() => {
    if (!status.found || !status.paid || !sessionId) return;
    if (!hasTrackingConsent()) return;
    const key = `sss_purchase_${sessionId}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      // Storage unavailable: still report once per page load.
    }
    trackEvent("sod_order_completed", {
      transaction_id: sessionId,
      value: status.totalCents / 100,
      currency: "CAD",
      items: "kentucky_bluegrass_sod",
    });
  }, [status, sessionId]);

  return (
    <Section
      tone="paper"
      className="pt-[calc(var(--header-h)+4rem)]"
      labelledBy="confirm-heading"
    >
      <div className="mx-auto max-w-2xl">
        {status.found && status.paid ? (
          <div className="card-light p-8 sm:p-10">
            <CheckCircle2 aria-hidden className="h-12 w-12 text-forest" />
            <h1 id="confirm-heading" className="type-h1 mt-6">
              Your sod order is confirmed.
            </h1>
            <p className="type-lead mt-4 text-muted-light">
              Thank you. Payment was received and we'll contact you to confirm a
              delivery date.
              {status.email && status.confirmationEmail && (
                <>
                  {" "}
                  A written copy of your order is being emailed to{" "}
                  <strong className="text-forest-deep">{status.email}</strong>.
                </>
              )}
            </p>
            <dl className="mt-8 grid gap-4 rounded-[var(--radius-md)] bg-stone-warm/45 p-5 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-bronze">
                  Rolls
                </dt>
                <dd className="mt-1 text-forest-deep">
                  {status.rolls.toLocaleString("en-CA")} rolls of Kentucky
                  Bluegrass
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-bronze">
                  Total paid
                </dt>
                <dd className="mt-1 text-forest-deep">
                  {formatCents(status.totalCents)}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-bronze">
                  Delivery to
                </dt>
                <dd className="mt-1 text-forest-deep">
                  {status.deliveryAddress}
                </dd>
              </div>
            </dl>
            <p className="mt-6 text-sm text-muted-light">
              Order reference:{" "}
              <span className="break-all text-forest-deep">{sessionId}</span>.
              Please keep this page or your email for your records.
              Cancellations and refunds are handled under our{" "}
              <Link to="/refunds" className="link-inline">
                Refund &amp; Cancellation Policy
              </Link>
              .
            </p>
            <p className="mt-3 text-sm text-muted-light">
              Questions about your delivery? Call{" "}
              <a href={BUSINESS.phoneHref} className="link-inline">
                {BUSINESS.phoneDisplay}
              </a>{" "}
              or email{" "}
              <a href={BUSINESS.emailHref} className="link-inline break-all">
                {BUSINESS.email}
              </a>
              .
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CTA to="/" variant="forest">
                Back to home
              </CTA>
              <CTA
                to="/outdoor-services/$service"
                params={{ service: "sod-installation" }}
                variant="light-outline"
              >
                Need it installed?
              </CTA>
            </div>
          </div>
        ) : status.found ? (
          <div className="card-light p-8 sm:p-10">
            <Clock aria-hidden className="h-12 w-12 text-bronze" />
            <h1 id="confirm-heading" className="type-h1 mt-6">
              Your payment is processing.
            </h1>
            <p className="type-lead mt-4 text-muted-light">
              Stripe hasn't confirmed the payment yet. Once it does, we&rsquo;ll
              be in touch to confirm your order. If you don&rsquo;t hear from
              us, call{" "}
              <a href={BUSINESS.phoneHref} className="link-inline">
                {BUSINESS.phoneDisplay}
              </a>
              .
            </p>
          </div>
        ) : (
          <div className="card-light p-8 sm:p-10">
            <h1 id="confirm-heading" className="type-h1">
              We couldn't find that order.
            </h1>
            <p className="type-lead mt-4 text-muted-light">
              If you&rsquo;ve just paid, check your email for a confirmation, or
              contact us at{" "}
              <a href={BUSINESS.phoneHref} className="link-inline">
                {BUSINESS.phoneDisplay}
              </a>{" "}
              and we'll confirm it for you.
            </p>
            <div className="mt-8">
              <Link to="/sod-ordering" className="link-arrow min-h-11">
                Return to sod ordering
              </Link>
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
