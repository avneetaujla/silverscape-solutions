import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Check,
  ShieldCheck,
  Truck,
  ArrowRight,
  Lock,
  Leaf,
  Sparkles,
} from "lucide-react";
import sodImg from "@/assets/hero-sod.jpg";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHeader } from "@/components/site/Section";
import { CTA } from "@/components/site/CTA";
import {
  FieldLabel,
  TextField,
  TextareaField,
} from "@/components/site/LeadForm";
import { toast } from "sonner";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/sod-ordering")({
  head: () => ({
    meta: [
      {
        title:
          "Order Kentucky Bluegrass Sod Online — Southern Ontario Delivery | SilverScape",
      },
      {
        name: "description",
        content:
          "Premium Kentucky Bluegrass sod, harvested fresh and delivered across Southern Ontario. Transparent pricing, simple ordering, professional delivery.",
      },
    ],
  }),
  component: SodPortal,
});

const PRODUCT = {
  name: "Kentucky Bluegrass Sod",
  price: 0.85,
  unitLabel: "per sq ft",
  description:
    "A dense, deep-green Kentucky Bluegrass blend cultivated for Southern Ontario climate — the same sod we install on our own premium landscape projects.",
  attributes: [
    "Hardy, cold-tolerant Ontario blend",
    "Dense root system for fast establishment",
    "Harvested fresh, delivered same week",
    "Suitable for full-sun residential lawns",
  ],
};

const TAX_RATE = 0.13;

function SodPortal() {
  const [unit, setUnit] = useState<"sqft" | "rolls">("sqft");
  const [qty, setQty] = useState(500);
  const [postal, setPostal] = useState("");

  const sqft = unit === "sqft" ? qty : qty * 10; // 1 roll ≈ 10 sqft
  const subtotal = sqft * PRODUCT.price;
  const delivery = useMemo(() => {
    if (!postal) return 0;
    const p = postal.toUpperCase().trim();
    if (p.startsWith("N1") || p.startsWith("N2")) return 95;
    if (p.startsWith("L") || p.startsWith("M")) return 145;
    return 175;
  }, [postal]);
  const taxes = (subtotal + delivery) * TAX_RATE;
  const total = subtotal + delivery + taxes;
  const fmt = (n: number) => `$${n.toFixed(2)}`;

  return (
    <>
      <PageHero
        eyebrow="Sod Ordering · Kentucky Bluegrass"
        title={
          <>
            Premium sod, <em className="italic text-gold">delivered fresh</em>.
          </>
        }
        description="The same Kentucky Bluegrass we lay on our own landscape projects — now available to order directly, with professional delivery across Southern Ontario."
        image={sodImg}
        height="short"
      />

      <Section variant="dark">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* LEFT: Steps */}
          <div className="lg:col-span-2 space-y-10">
            {/* Product */}
            <div className="premium-card">
              <div className="grid md:grid-cols-2">
                <div className="aspect-[4/3] md:aspect-auto overflow-hidden">
                  <img
                    src={sodImg}
                    alt={PRODUCT.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 md:p-10">
                  <div className="eyebrow flex items-center gap-2">
                    <Leaf className="w-3.5 h-3.5" /> Single Product · Single
                    Standard
                  </div>
                  <h2 className="mt-3 font-serif text-3xl md:text-4xl text-cream leading-tight">
                    {PRODUCT.name}
                  </h2>
                  <div className="mt-3 text-gold font-serif text-2xl">
                    ${PRODUCT.price.toFixed(2)}{" "}
                    <span className="text-cream/55 text-sm font-sans">
                      {PRODUCT.unitLabel}
                    </span>
                  </div>
                  <p className="mt-4 text-sm text-cream/75 leading-relaxed">
                    {PRODUCT.description}
                  </p>
                  <ul className="mt-5 space-y-2">
                    {PRODUCT.attributes.map((a) => (
                      <li
                        key={a}
                        className="flex items-start gap-3 text-sm text-cream/80"
                      >
                        <Check className="w-4 h-4 text-gold mt-0.5 shrink-0" />{" "}
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 1 - Quantity */}
            <Step n={1} title="How much sod do you need?">
              <div className="flex items-center gap-2 mt-6">
                <UnitToggle
                  active={unit === "sqft"}
                  onClick={() => setUnit("sqft")}
                >
                  Square Footage
                </UnitToggle>
                <UnitToggle
                  active={unit === "rolls"}
                  onClick={() => setUnit("rolls")}
                >
                  Number of Rolls
                </UnitToggle>
              </div>
              <div className="mt-5 flex items-center gap-3 max-w-md">
                <TextField
                  type="number"
                  min={1}
                  value={qty}
                  onChange={(e) =>
                    setQty(Math.max(1, Number(e.target.value) || 0))
                  }
                  className="flex-1 mt-0"
                />
                <span className="text-cream/60 text-sm">
                  {unit === "sqft" ? "sq ft" : "rolls"}
                </span>
              </div>
              <div className="mt-3 text-xs text-cream/55">
                {unit === "rolls"
                  ? `1 roll ≈ 10 sq ft. Total coverage: ${sqft} sq ft.`
                  : "Not sure? Measure length × width of your lawn area."}
              </div>
            </Step>

            {/* Step 2 - Delivery */}
            <Step n={2} title="Where are we delivering?">
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <Input label="Street address" placeholder="123 Maple Ave" />
                <Input label="City" placeholder="Guelph, Kitchener…" />
                <Input
                  label="Postal code"
                  placeholder="N1H 1A1"
                  value={postal}
                  onChange={setPostal}
                />
                <Input label="Phone" type="tel" placeholder="(226) 555-0123" />
              </div>
              {postal && (
                <div className="mt-4 text-xs text-gold inline-flex items-center gap-2">
                  <Truck className="w-4 h-4" /> Delivery estimate available —
                  see summary.
                </div>
              )}
            </Step>

            {/* Step 3 - Customer */}
            <Step n={3} title="Your details">
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <Input label="Full name" placeholder="Your name" />
                <Input label="Email" type="email" placeholder="you@email.com" />
                <div className="md:col-span-2">
                  <FieldLabel htmlFor="delivery-notes">
                    Delivery notes (optional)
                  </FieldLabel>
                  <TextareaField
                    id="delivery-notes"
                    rows={3}
                    placeholder="Gate codes, drop-off preferences, preferred delivery window."
                  />
                </div>
              </div>
            </Step>
          </div>

          {/* RIGHT: Order summary */}
          <aside className="lg:sticky lg:top-28 h-fit glass-card p-7 md:p-8">
            <div className="eyebrow">Order Summary</div>
            <h3 className="font-serif text-2xl text-cream mt-2">
              Your Sod Order
            </h3>

            <div className="mt-6 space-y-3 text-sm">
              <Row label={PRODUCT.name} v={fmt(PRODUCT.price) + " / sq ft"} />
              <Row label="Coverage" v={`${sqft} sq ft`} />
              <div className="border-t border-cream/10 my-3" />
              <Row label="Sod subtotal" v={fmt(subtotal)} />
              <Row
                label="Delivery fee"
                v={postal ? fmt(delivery) : "Enter postal code"}
              />
              <Row label="Estimated taxes (HST)" v={fmt(taxes)} />
              <div className="border-t border-cream/10 my-3" />
              <Row label="Total" v={fmt(total)} bold />
            </div>

            <button
              onClick={() =>
                toast.success(
                  "Checkout flow ready — connect Stripe to process payment.",
                )
              }
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "mt-7 w-full",
              )}
            >
              <Lock className="h-4 w-4" /> Proceed to Secure Checkout
            </button>
            <div className="mt-4 text-[0.65rem] tracking-[0.2em] uppercase text-cream/45 text-center">
              Secure payment powered by Stripe (placeholder)
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              {[
                { i: Sparkles, t: "Fresh Cut" },
                { i: Truck, t: "Delivered" },
                { i: ShieldCheck, t: "Guaranteed" },
              ].map((b, i) => (
                <div key={i} className="premium-card p-3">
                  <b.i className="mx-auto h-4 w-4 text-gold" />
                  <div className="premium-kicker mt-1 text-cream/65">{b.t}</div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </Section>

      <Section variant="deep">
        <SectionHeader
          eyebrow="Prefer a finished lawn from day one?"
          title={
            <>
              Add professional{" "}
              <em className="italic text-gold">installation</em>.
            </>
          }
          description="Order delivery only, or have our crew prep the soil, lay the sod, and roll it to a finished lawn — ready to walk on within weeks."
        />
        <div className="mt-8 flex gap-3 flex-wrap">
          <Link
            to="/outdoor-services/$service"
            params={{ service: "sod-installation" }}
            className={buttonVariants({ variant: "default" })}
          >
            Learn About Installation <ArrowRight className="h-4 w-4" />
          </Link>
          <CTA to="/contact" variant="outline">
            Talk to Our Team
          </CTA>
        </div>
      </Section>
    </>
  );
}

function Step({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="glass-card p-7 md:p-8">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full border border-gold text-gold flex items-center justify-center font-serif">
          {n}
        </div>
        <h3 className="font-serif text-2xl text-cream">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function UnitToggle({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={buttonVariants({
        variant: active ? "filterActive" : "filter",
        size: "sm",
      })}
    >
      {children}
    </button>
  );
}

function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (v: string) => void;
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <TextField
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
      />
    </div>
  );
}

function Row({ label, v, bold }: { label: string; v: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span
        className={`${bold ? "text-cream font-serif text-lg" : "text-cream/65"}`}
      >
        {label}
      </span>
      <span
        className={`${bold ? "text-gold font-serif text-2xl" : "text-cream/90"}`}
      >
        {v}
      </span>
    </div>
  );
}
