import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Check,
  Loader2,
  Lock,
  Pencil,
  Truck,
} from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHeader } from "@/components/site/Section";
import { FAQList } from "@/components/site/FAQList";
import { Button } from "@/components/ui/button";
import { media } from "@/content/mediaCatalog";
import { BUSINESS } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";
import { breadcrumbSchema, faqSchema, seo, serviceSchema } from "@/lib/seo";
import { SOD_PRODUCT } from "@/lib/sod/product";
import {
  HST_PERCENT,
  MAX_ROLLS,
  formatCents,
  sodOrderSchema,
  type SodOrderInput,
  type SodQuote,
} from "@/lib/sod/pricing";
import { quoteSodOrder, startSodCheckout } from "@/lib/sod/sod.functions";
import { cn } from "@/lib/utils";

const PATH = "/sod-ordering";

const SOD_FAQ = [
  {
    q: "What kind of sod do you deliver?",
    a: `We supply one product: fresh Kentucky Bluegrass sod in ${SOD_PRODUCT.rollDimensions} rolls, each covering about ${SOD_PRODUCT.rollSqFt} square feet.`,
  },
  {
    q: "How is my delivery cost calculated?",
    a: "Delivery is priced on the full driving route for your order: from our base in Guelph, to the sod farm, to your address and back. We use a real routing service, not straight-line distance, and show you every leg before you pay.",
  },
  {
    q: "When will I see the price?",
    a: "Once you've entered your roll count, address and contact details, we calculate your complete itemized total — sod, HST and delivery — before you're asked to pay anything.",
  },
  {
    q: "How do I pay?",
    a: "Payment is handled by Stripe Checkout. SilverScape never sees or stores your card details.",
  },
  {
    q: "Can you install the sod as well?",
    a: "Yes. Sod installation — including grading, soil preparation and rolling — is part of our outdoor division. Request a quote instead of ordering delivery only.",
  },
];

type CheckoutSearch = { checkout?: "cancelled" };

export const Route = createFileRoute("/sod-ordering/")({
  validateSearch: (search: Record<string, unknown>): CheckoutSearch =>
    search.checkout === "cancelled" ? { checkout: "cancelled" } : {},
  head: () =>
    seo({
      title:
        "Order Kentucky Bluegrass Sod Online — Delivery from Guelph | SilverScape",
      description:
        "Order fresh Kentucky Bluegrass sod online for delivery across Guelph, Kitchener-Waterloo, Cambridge and the GTA. Itemized total before you pay, secure Stripe checkout.",
      path: PATH,
      image: media("sod-farm-field").src,
      jsonLd: [
        serviceSchema({
          name: "Kentucky Bluegrass sod delivery",
          serviceType: "Sod delivery",
          description:
            "Fresh Kentucky Bluegrass sod delivered to residential addresses in Southern Ontario.",
          path: PATH,
        }),
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Order Sod", path: PATH },
        ]),
        faqSchema(SOD_FAQ),
      ],
    }),
  component: SodOrderingPage,
});

type Step = 1 | 2 | 3 | 4;
type FormValues = {
  rolls: string;
  street: string;
  city: string;
  postalCode: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
};
type FieldName = keyof FormValues;

const STEP_FIELDS: Record<1 | 2 | 3, FieldName[]> = {
  1: ["rolls"],
  2: ["street", "city", "postalCode"],
  3: ["name", "email", "phone", "notes"],
};
const STEP_LABELS = [
  "Rolls",
  "Delivery address",
  "Your details",
  "Review & pay",
] as const;

function toOrder(v: FormValues): SodOrderInput {
  return {
    rolls: Number(v.rolls),
    street: v.street,
    city: v.city,
    postalCode: v.postalCode.toUpperCase(),
    name: v.name,
    email: v.email,
    phone: v.phone,
    notes: v.notes.trim() ? v.notes : undefined,
  };
}

function newAttemptId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
        (Number(c) ^ ((Math.random() * 16) >> (Number(c) / 4))).toString(16),
      );
}

function SodOrderingPage() {
  const { checkout } = Route.useSearch();
  return (
    <>
      <PageHero
        image={media("sod-farm-field")}
        size="compact"
        eyebrow="Sod Ordering & Delivery"
        title={
          <>
            Kentucky Bluegrass sod,{" "}
            <span className="accent-serif">delivered.</span>
          </>
        }
        description="Choose your rolls, enter your address and review an itemized total before secure checkout. Delivery is priced on the real driving route."
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Order Sod", path: PATH },
        ]}
      />

      <Section tone="paper" size="sm" id="order" labelledBy="order-heading">
        <SodOrderForm cancelled={checkout === "cancelled"} />
      </Section>

      <Section tone="cream" labelledBy="sod-faq">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeader
            id="sod-faq"
            eyebrow="Sod FAQ"
            title="Before you order."
          />
          <FAQList items={SOD_FAQ} />
        </div>
      </Section>
    </>
  );
}

function SodOrderForm({ cancelled }: { cancelled: boolean }) {
  const uid = useId();
  const id = (f: string) => `${uid}-${f}`;
  const headingRef = useRef<HTMLHeadingElement>(null);
  const startedTracked = useRef(false);
  const [step, setStep] = useState<Step>(1);
  const [values, setValues] = useState<FormValues>({
    rolls: "",
    street: "",
    city: "",
    postalCode: "",
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [busy, setBusy] = useState<null | "quote" | "checkout">(null);
  const [quote, setQuote] = useState<SodQuote | null>(null);
  const [attemptId, setAttemptId] = useState<string>("");
  const [problem, setProblem] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  function update(name: FieldName, value: string) {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
    if (quote) setQuote(null);
  }

  function validateStep(s: 1 | 2 | 3) {
    const result = sodOrderSchema.safeParse(toOrder(values));
    const next: Partial<Record<FieldName, string>> = {};
    if (!result.success) {
      for (const issue of result.error.issues) {
        const key = issue.path[0] as FieldName;
        if (STEP_FIELDS[s].includes(key) && !next[key])
          next[key] = issue.message;
      }
    }
    if (s === 1 && values.rolls.trim() === "")
      next.rolls = "Enter how many rolls you need";
    setErrors(next);
    const first = STEP_FIELDS[s].find((f) => next[f]);
    if (first) {
      document.getElementById(id(first))?.focus();
      return false;
    }
    return true;
  }

  async function runQuote() {
    setBusy("quote");
    setProblem(null);
    try {
      const res = await quoteSodOrder({ data: toOrder(values) });
      if (res.ok) {
        setQuote(res.data);
        setAttemptId(newAttemptId());
        setStep(4);
        trackEvent("sod_quote_calculated", {
          rolls: res.data.rolls,
          value: res.data.totalCents / 100,
          currency: "CAD",
        });
        return true;
      }
      setProblem(res.message);
      if (
        res.code === "address_not_found" ||
        res.code === "outside_service_area"
      )
        setStep(2);
      return false;
    } catch (err) {
      console.error("[sod] quote failed", err);
      setProblem(
        `We couldn't calculate your total right now. Please try again, or call ${BUSINESS.phoneDisplay}.`,
      );
      return false;
    } finally {
      setBusy(null);
    }
  }

  async function next(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    if (step === 4) return;
    if (!validateStep(step)) return;
    setProblem(null);
    if (step === 1 && !startedTracked.current) {
      startedTracked.current = true;
      trackEvent("sod_order_started", { rolls: Number(values.rolls) });
    }
    if (step === 3) {
      await runQuote();
      return;
    }
    setStep((s) => (s + 1) as Step);
  }

  async function checkout() {
    if (!quote || busy) return;
    setBusy("checkout");
    setProblem(null);
    setNotice(null);
    try {
      const res = await startSodCheckout({
        data: {
          ...toOrder(values),
          expectedTotalCents: quote.totalCents,
          attemptId,
        },
      });
      if (res.ok) {
        trackEvent("begin_checkout", {
          value: quote.totalCents / 100,
          currency: "CAD",
          rolls: quote.rolls,
        });
        window.location.assign(res.data.url);
        return;
      }
      if (res.code === "price_changed") {
        setBusy(null);
        const ok = await runQuote();
        if (ok) setNotice(res.message);
        return;
      }
      setProblem(res.message);
      setBusy(null);
    } catch (err) {
      console.error("[sod] checkout failed", err);
      setProblem(
        `We couldn't start secure checkout. Please try again, or call ${BUSINESS.phoneDisplay}.`,
      );
      setBusy(null);
    }
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-14">
      <div className="on-light min-w-0">
        <h2 id="order-heading" className="sr-only">
          Sod order form
        </h2>
        {cancelled && (
          <div
            role="status"
            className="mb-6 rounded-[var(--radius-md)] border border-bronze/40 bg-bronze/[0.07] p-4 text-[0.9375rem] text-forest-deep"
          >
            Checkout was cancelled and you haven't been charged. Your details
            are below if you'd like to try again.
          </div>
        )}
        <ol className="mb-8 grid grid-cols-4 gap-2" aria-label="Order progress">
          {STEP_LABELS.map((label, i) => {
            const n = (i + 1) as Step;
            const done = n < step;
            const current = n === step;
            return (
              <li
                key={label}
                aria-current={current ? "step" : undefined}
                className="min-w-0"
              >
                <span
                  className={cn(
                    "block h-1 rounded-[var(--radius-sm)] transition-colors",
                    done || current ? "bg-forest" : "bg-forest-deep/15",
                  )}
                />
                <span
                  className={cn(
                    "mt-2 block truncate text-xs font-medium sm:text-sm",
                    current ? "text-forest-deep" : "text-muted-light",
                  )}
                >
                  <span className="sr-only">
                    {done ? "Completed: " : current ? "Current: " : ""}
                  </span>
                  <span aria-hidden className="mr-1">
                    {n}.
                  </span>
                  {label}
                </span>
              </li>
            );
          })}
        </ol>

        <form noValidate onSubmit={next} className="card-light p-6 sm:p-8">
          <h3 ref={headingRef} tabIndex={-1} className="type-h3 outline-none">
            {step === 1 && "How many rolls do you need?"}
            {step === 2 && "Where should we deliver?"}
            {step === 3 && "How can we reach you?"}
            {step === 4 && "Review your order"}
          </h3>

          {problem && (
            <div
              role="alert"
              className="mt-5 flex gap-3 rounded-[var(--radius-md)] border border-error-light/40 bg-error-light/[0.06] p-4 text-sm text-forest-deep"
            >
              <AlertTriangle
                aria-hidden
                className="mt-0.5 h-5 w-5 shrink-0 text-error-light"
              />
              <p>{problem}</p>
            </div>
          )}
          {notice && (
            <div
              role="status"
              className="mt-5 rounded-[var(--radius-md)] border border-bronze/40 bg-bronze/[0.07] p-4 text-sm text-forest-deep"
            >
              {notice}
            </div>
          )}

          {step === 1 && (
            <div className="mt-6 grid gap-6">
              <Field
                id={id("rolls")}
                label="Number of rolls"
                error={errors.rolls}
                hint={`Each roll is ${SOD_PRODUCT.rollDimensions} and covers about ${SOD_PRODUCT.rollSqFt} sq ft.`}
              >
                <input
                  id={id("rolls")}
                  name="rolls"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={MAX_ROLLS}
                  step={1}
                  className="field-control max-w-[12rem] text-lg"
                  value={values.rolls}
                  onChange={(e) => update("rolls", e.target.value)}
                  {...describe(id("rolls"), errors.rolls, true)}
                />
              </Field>
              <CoverageHelper onUse={(n) => update("rolls", String(n))} />
            </div>
          )}

          {step === 2 && (
            <div className="mt-6 grid gap-5">
              <Field
                id={id("street")}
                label="Street address"
                error={errors.street}
              >
                <input
                  id={id("street")}
                  name="street"
                  autoComplete="street-address"
                  className="field-control"
                  value={values.street}
                  onChange={(e) => update("street", e.target.value)}
                  {...describe(id("street"), errors.street)}
                />
              </Field>
              <div className="grid gap-5 sm:grid-cols-[1.4fr_1fr]">
                <Field id={id("city")} label="City or town" error={errors.city}>
                  <input
                    id={id("city")}
                    name="city"
                    autoComplete="address-level2"
                    className="field-control"
                    value={values.city}
                    onChange={(e) => update("city", e.target.value)}
                    {...describe(id("city"), errors.city)}
                  />
                </Field>
                <Field
                  id={id("postalCode")}
                  label="Postal code"
                  error={errors.postalCode}
                >
                  <input
                    id={id("postalCode")}
                    name="postalCode"
                    autoComplete="postal-code"
                    className="field-control uppercase"
                    value={values.postalCode}
                    onChange={(e) => update("postalCode", e.target.value)}
                    {...describe(id("postalCode"), errors.postalCode)}
                  />
                </Field>
              </div>
              <p className="text-sm text-muted-light">
                Delivery is available to Ontario addresses. Province: Ontario.
              </p>
            </div>
          )}

          {step === 3 && (
            <div className="mt-6 grid gap-5">
              <Field id={id("name")} label="Full name" error={errors.name}>
                <input
                  id={id("name")}
                  name="name"
                  autoComplete="name"
                  className="field-control"
                  value={values.name}
                  onChange={(e) => update("name", e.target.value)}
                  {...describe(id("name"), errors.name)}
                />
              </Field>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id={id("email")} label="Email" error={errors.email}>
                  <input
                    id={id("email")}
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="field-control"
                    value={values.email}
                    onChange={(e) => update("email", e.target.value)}
                    {...describe(id("email"), errors.email)}
                  />
                </Field>
                <Field id={id("phone")} label="Phone" error={errors.phone}>
                  <input
                    id={id("phone")}
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    className="field-control"
                    value={values.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    {...describe(id("phone"), errors.phone)}
                  />
                </Field>
              </div>
              <Field
                id={id("notes")}
                label="Delivery notes (optional)"
                error={errors.notes}
                hint="Gate codes, where to place the pallet, timing preferences."
              >
                <textarea
                  id={id("notes")}
                  name="notes"
                  rows={3}
                  className="field-control"
                  value={values.notes}
                  onChange={(e) => update("notes", e.target.value)}
                  aria-invalid={errors.notes ? true : undefined}
                  aria-describedby={
                    errors.notes
                      ? `${id("notes")}-error`
                      : `${id("notes")}-hint`
                  }
                />
              </Field>
            </div>
          )}

          {step === 4 && quote && (
            <Summary quote={quote} values={values} onEdit={(s) => setStep(s)} />
          )}

          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-forest-deep/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            {step > 1 ? (
              <Button
                type="button"
                variant="lightOutline"
                size="lg"
                disabled={busy !== null}
                onClick={() => {
                  setProblem(null);
                  setStep((s) => (s - 1) as Step);
                }}
              >
                <ArrowLeft aria-hidden /> Back
              </Button>
            ) : (
              <span />
            )}
            {step < 4 ? (
              <Button
                type="submit"
                variant="forest"
                size="lg"
                disabled={busy !== null}
              >
                {busy === "quote" ? (
                  <>
                    <Loader2 aria-hidden className="animate-spin" /> Calculating
                    route…
                  </>
                ) : step === 3 ? (
                  <>
                    Calculate my total <ArrowRight aria-hidden />
                  </>
                ) : (
                  <>
                    Continue <ArrowRight aria-hidden />
                  </>
                )}
              </Button>
            ) : (
              <Button
                type="button"
                variant="forest"
                size="lg"
                disabled={busy !== null || !quote}
                onClick={checkout}
              >
                {busy === "checkout" ? (
                  <>
                    <Loader2 aria-hidden className="animate-spin" /> Opening
                    secure checkout…
                  </>
                ) : busy === "quote" ? (
                  <>
                    <Loader2 aria-hidden className="animate-spin" />{" "}
                    Recalculating…
                  </>
                ) : (
                  <>
                    <Lock aria-hidden /> Pay securely with Stripe
                  </>
                )}
              </Button>
            )}
          </div>
          <p aria-live="polite" className="sr-only">
            {busy === "quote"
              ? "Calculating your delivery route and total"
              : busy === "checkout"
                ? "Opening secure checkout"
                : ""}
          </p>
        </form>
      </div>
      <OrderPanel values={values} step={step} quote={quote} />
    </div>
  );
}

function OrderPanel({
  values,
  step,
  quote,
}: {
  values: FormValues;
  step: Step;
  quote: SodQuote | null;
}) {
  const rolls = Number(values.rolls);
  const hasRolls = Number.isInteger(rolls) && rolls > 0 && rolls <= MAX_ROLLS;
  const hasAddress =
    step > 2 && values.street.trim() !== "" && values.city.trim() !== "";
  const address = quote
    ? quote.deliveryAddress
    : hasAddress
      ? `${values.street.trim()}, ${values.city.trim()}`
      : null;

  return (
    <aside
      aria-labelledby="order-panel-heading"
      className="on-light lg:sticky lg:top-28 lg:self-start"
    >
      <div className="card-stone p-6 md:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-bronze">
          Your order
        </p>
        <h2 id="order-panel-heading" className="type-h3 mt-2">
          {SOD_PRODUCT.name}
        </h2>
        <p className="mt-1 text-sm text-muted-light">
          {SOD_PRODUCT.rollDimensions} rolls · about {SOD_PRODUCT.rollSqFt} sq
          ft each
        </p>

        <dl className="mt-6 divide-y divide-forest-deep/10 border-y border-forest-deep/10 text-[0.9375rem]">
          <PanelRow label="Rolls">
            {hasRolls
              ? `${rolls.toLocaleString("en-CA")} · about ${(rolls * SOD_PRODUCT.rollSqFt).toLocaleString("en-CA")} sq ft`
              : null}
          </PanelRow>
          <PanelRow label="Deliver to">{address}</PanelRow>
          <PanelRow label="Route">
            {quote ? `${quote.routeKm.toFixed(1)} km driving route` : null}
          </PanelRow>
          <PanelRow label="Total">
            {quote ? (
              <span className="font-serif text-xl font-semibold">
                {formatCents(quote.totalCents)}
              </span>
            ) : null}
          </PanelRow>
        </dl>

        <div className="mt-6 flex gap-3 text-sm text-muted-light">
          <Truck aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-forest" />
          <p>
            Delivery is priced on the full driving route — Guelph base, sod
            farm, your address and back — and shown leg by leg before you pay.
          </p>
        </div>
        <div className="mt-4 flex gap-3 text-sm text-muted-light">
          <Lock aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-forest" />
          <p>Payment through Stripe Checkout. We never see your card.</p>
        </div>
      </div>
      <p className="mt-5 text-sm text-muted-light">
        Want it installed?{" "}
        <Link
          to="/outdoor-services/$service"
          params={{ service: "sod-installation" }}
          className="link-inline"
        >
          See sod installation
        </Link>
        .
      </p>
    </aside>
  );
}

function PanelRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-3">
      <dt className="shrink-0 text-muted-light">{label}</dt>
      <dd className="min-w-0 text-right text-forest-deep">
        {children ?? (
          <span className="text-sm text-muted-light">
            {label === "Total" || label === "Route"
              ? "Calculated at review"
              : "—"}
          </span>
        )}
      </dd>
    </div>
  );
}

function Summary({
  quote,
  values,
  onEdit,
}: {
  quote: SodQuote;
  values: FormValues;
  onEdit: (s: Step) => void;
}) {
  return (
    <div className="mt-6 grid gap-6">
      <dl className="grid gap-4 rounded-[var(--radius-md)] bg-stone-warm/45 p-5 text-[0.9375rem] sm:grid-cols-2">
        <SummaryItem label="Product" value={SOD_PRODUCT.name} />
        <SummaryItem
          label="Rolls"
          value={`${quote.rolls.toLocaleString("en-CA")} rolls · about ${quote.coverageSqFt.toLocaleString("en-CA")} sq ft`}
          onEdit={() => onEdit(1)}
        />
        <SummaryItem
          label="Delivery to"
          value={quote.deliveryAddress}
          onEdit={() => onEdit(2)}
        />
        <SummaryItem
          label="Contact"
          value={`${values.name} · ${values.email}`}
          onEdit={() => onEdit(3)}
        />
      </dl>

      <div>
        <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-bronze">
          Delivery route
        </h4>
        <ol className="mt-3 grid gap-2 text-[0.9375rem]">
          {quote.legs.map((leg) => (
            <li
              key={leg.label}
              className="flex items-baseline justify-between gap-4 border-b border-dashed border-forest-deep/15 pb-2"
            >
              <span className="text-muted-light">{leg.label}</span>
              <span className="shrink-0 tabular-nums text-forest-deep">
                {leg.km.toFixed(1)} km
              </span>
            </li>
          ))}
          <li className="flex items-baseline justify-between gap-4 pt-1 font-semibold text-forest-deep">
            <span>Total route</span>
            <span className="tabular-nums">{quote.routeKm.toFixed(1)} km</span>
          </li>
        </ol>
      </div>

      <div>
        <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-bronze">
          Price
        </h4>
        <table className="mt-3 w-full text-[0.9375rem]">
          <caption className="sr-only">Itemized order total</caption>
          <tbody>
            <PriceRow
              label={`Sod — ${quote.rolls.toLocaleString("en-CA")} rolls`}
              cents={quote.sodSubtotalCents}
            />
            <PriceRow
              label={`HST on sod (${HST_PERCENT}%)`}
              cents={quote.sodHstCents}
            />
            <PriceRow
              label={`Delivery — ${quote.routeKm.toFixed(1)} km route`}
              cents={quote.deliveryCents}
            />
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-forest-deep/20">
              <th
                scope="row"
                className="pt-4 text-left font-serif text-2xl font-semibold text-forest-deep"
              >
                Total
              </th>
              <td className="pt-4 text-right font-serif text-2xl font-semibold tabular-nums text-forest-deep">
                {formatCents(quote.totalCents)}
              </td>
            </tr>
          </tfoot>
        </table>
        <p className="mt-3 text-sm text-muted-light">
          Prices in CAD. HST ({HST_PERCENT}%) is applied to the sod. Delivery is
          charged at the route rate shown, with no additional tax. Your card is
          charged by Stripe only after you confirm on the next screen.
        </p>
      </div>
    </div>
  );
}

function SummaryItem({
  label,
  value,
  onEdit,
}: {
  label: string;
  value: string;
  onEdit?: () => void;
}) {
  return (
    <div className="min-w-0">
      <dt className="flex items-center justify-between gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-bronze">
        {label}
        {onEdit && (
          <button
            type="button"
            onClick={onEdit}
            className="inline-flex min-h-11 min-w-11 items-center justify-end gap-1 text-xs font-medium normal-case tracking-normal text-forest underline-offset-4 hover:underline"
          >
            <Pencil aria-hidden className="h-3.5 w-3.5" /> Edit
            <span className="sr-only"> {label.toLowerCase()}</span>
          </button>
        )}
      </dt>
      <dd className="break-words text-forest-deep">{value}</dd>
    </div>
  );
}

function PriceRow({ label, cents }: { label: string; cents: number }) {
  return (
    <tr className="border-b border-forest-deep/10">
      <th
        scope="row"
        className="py-3 pr-4 text-left font-normal text-muted-light"
      >
        {label}
      </th>
      <td className="py-3 text-right tabular-nums text-forest-deep">
        {formatCents(cents)}
      </td>
    </tr>
  );
}

function CoverageHelper({ onUse }: { onUse: (rolls: number) => void }) {
  const uid = useId();
  const [area, setArea] = useState("");
  const [waste, setWaste] = useState<5 | 10>(5);
  const sqft = Number(area);
  const valid = Number.isFinite(sqft) && sqft > 0;
  const suggested = valid
    ? Math.min(
        MAX_ROLLS,
        Math.ceil((sqft * (1 + waste / 100)) / SOD_PRODUCT.rollSqFt),
      )
    : 0;

  return (
    <details className="group rounded-[var(--radius-md)] border border-forest-deep/12 bg-paper/60">
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-5 py-3 font-medium text-forest-deep [&::-webkit-details-marker]:hidden">
        Not sure? Work it out from your lawn area
        <ArrowRight
          aria-hidden
          className="h-4 w-4 transition-transform group-open:rotate-90"
        />
      </summary>
      <div className="grid gap-4 border-t border-forest-deep/10 px-5 py-5">
        <p className="text-sm text-muted-light">
          Measure the length × width of each area in feet and add them together.
          Add 5% for simple shapes or 10% for curves and lots of edges.
        </p>
        <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <label htmlFor={`${uid}-area`} className="field-label">
              Lawn area (sq ft)
            </label>
            <input
              id={`${uid}-area`}
              type="number"
              inputMode="decimal"
              min={1}
              className="field-control"
              value={area}
              onChange={(e) => setArea(e.target.value)}
            />
          </div>
          <fieldset className="flex gap-2">
            <legend className="field-label">Extra for cuts</legend>
            {([5, 10] as const).map((w) => (
              <label
                key={w}
                className="choice !min-h-12 !flex-row !items-center !px-4 !py-2"
              >
                <input
                  type="radio"
                  name={`${uid}-waste`}
                  checked={waste === w}
                  onChange={() => setWaste(w)}
                />
                <span className="font-medium">{w}%</span>
              </label>
            ))}
          </fieldset>
        </div>
        <div
          aria-live="polite"
          className="flex flex-wrap items-center justify-between gap-3"
        >
          <p className="text-[0.9375rem] text-forest-deep">
            {valid ? (
              <>
                You'll need about{" "}
                <strong className="font-semibold">
                  {suggested.toLocaleString("en-CA")} rolls
                </strong>
                .
              </>
            ) : (
              <span className="text-muted-light">
                Enter an area to see a suggested roll count.
              </span>
            )}
          </p>
          {valid && (
            <Button
              type="button"
              size="sm"
              variant="lightOutline"
              onClick={() => onUse(suggested)}
            >
              <Check aria-hidden /> Use {suggested.toLocaleString("en-CA")}{" "}
              rolls
            </Button>
          )}
        </div>
      </div>
    </details>
  );
}

function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="field-hint">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="field-error">
          {error}
        </p>
      )}
    </div>
  );
}

function describe(fieldId: string, error?: string, hasHint = false) {
  return {
    "aria-invalid": error ? (true as const) : undefined,
    "aria-describedby": error
      ? `${fieldId}-error`
      : hasHint
        ? `${fieldId}-hint`
        : undefined,
    required: true,
  };
}
