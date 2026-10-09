import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { CheckCircle2, Loader2, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  LEAD_CITIES,
  LEAD_SERVICES,
  LEAD_TIMING,
  leadSchema,
  type LeadInput,
} from "@/lib/leads/lead-schema";
import { submitLead } from "@/lib/leads/leads.functions";
import { trackEvent } from "@/lib/analytics";
import { MARKETING_CONSENT, marketingConsentAvailable } from "@/lib/legal";
import { BUSINESS } from "@/lib/site";
import { typeset } from "@/lib/typeset";
import { cn } from "@/lib/utils";

type Division = "outdoor" | "interior";
type FieldName =
  | "name"
  | "phone"
  | "email"
  | "city"
  | "division"
  | "service"
  | "timing"
  | "description";
type Values = Record<FieldName, string>;
type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success"; name: string }
  | {
      state: "error";
      reason: "not_configured" | "delivery_failed" | "network" | "rate_limited";
    };

const FIELD_ORDER: FieldName[] = [
  "name",
  "phone",
  "email",
  "city",
  "division",
  "service",
  "timing",
  "description",
];

export function LeadForm({
  defaultDivision,
  defaultService,
  tone = "dark",
  heading = "Request a quote",
}: {
  defaultDivision?: Division;
  defaultService?: string;
  tone?: "dark" | "light";
  heading?: string;
}) {
  const uid = useId();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const startedAt = useRef<number>(0);
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState<Values>({
    name: "",
    phone: "",
    email: "",
    city: "",
    division: defaultDivision ?? "",
    service: defaultService ?? "",
    timing: "",
    description: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const startedTracked = useRef(false);
  const showMarketing = marketingConsentAvailable();
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<Status>({ state: "idle" });

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (status.state === "success" || status.state === "error")
      resultRef.current?.focus();
  }, [status.state]);

  const services = values.division
    ? LEAD_SERVICES[values.division as Division]
    : [];
  const id = (f: string) => `${uid}-${f}`;

  function buildPayload(v: Values): LeadInput {
    return {
      ...v,
      city: v.city as LeadInput["city"],
      division: v.division as Division,
      timing: v.timing as LeadInput["timing"],
      website: honeypot,
      marketingOptIn: showMarketing && marketingOptIn,
      elapsedMs: Math.max(0, Date.now() - startedAt.current),
      pagePath: pathname,
    };
  }

  function validate(v: Values) {
    const result = leadSchema.safeParse(buildPayload(v));
    if (result.success) return {};
    const next: Partial<Record<FieldName, string>> = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0] as FieldName;
      if (FIELD_ORDER.includes(key) && !next[key]) next[key] = issue.message;
    }
    return next;
  }

  function update(field: FieldName, value: string) {
    if (!startedTracked.current) {
      startedTracked.current = true;
      trackEvent("quote_started", { form_location: pathname });
    }
    const next = { ...values, [field]: value };
    if (field === "division") next.service = "";
    setValues(next);
    if (attempted) setErrors(validate(next));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.state === "submitting") return;
    setAttempted(true);
    const found = validate(values);
    setErrors(found);
    const firstInvalid = FIELD_ORDER.find((f) => found[f]);
    if (firstInvalid) {
      const el = formRef.current?.querySelector<HTMLElement>(
        `[name="${firstInvalid}"]`,
      );
      el?.focus();
      return;
    }

    setStatus({ state: "submitting" });
    try {
      const res = await submitLead({ data: buildPayload(values) });
      if (res.ok) {
        trackEvent("quote_submitted", {
          division: values.division,
          service: values.service,
          form_location: pathname,
        });
        setStatus({ state: "success", name: values.name.split(" ")[0] });
      } else {
        setStatus({
          state: "error",
          reason:
            res.code === "not_configured" || res.code === "rate_limited"
              ? res.code
              : "delivery_failed",
        });
      }
    } catch (err) {
      console.error("[lead] submit failed", err);
      setStatus({ state: "error", reason: "network" });
    }
  }

  const surface = tone === "light" ? "on-light" : "";

  if (status.state === "success") {
    return (
      <div
        ref={resultRef}
        tabIndex={-1}
        role="status"
        className={cn("py-6 outline-none", surface)}
      >
        <CheckCircle2
          aria-hidden
          className="h-10 w-10 text-gold [.on-light_&]:text-forest"
        />
        <h3 className="type-h3 mt-5">
          Thank you, {status.name}. Your request has been sent.
        </h3>
        <p className="mt-3 measure text-muted-dark [.on-light_&]:text-muted-light">
          We'll review your project details and get in touch to talk through
          next steps. If it's time-sensitive, call us at{" "}
          <a href={BUSINESS.phoneHref} className="link-inline">
            {BUSINESS.phoneDisplay}
          </a>
          .
        </p>
      </div>
    );
  }

  const submitting = status.state === "submitting";

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      className={cn("grid gap-5", surface)}
      aria-describedby={id("intro")}
    >
      <div>
        <h3 className="type-h3">{typeset(heading)}</h3>
        <p
          id={id("intro")}
          className="mt-2 text-sm text-muted-dark [.on-light_&]:text-muted-light"
        >
          All fields are required unless marked optional.
        </p>
      </div>

      {status.state === "error" && (
        <div
          ref={resultRef}
          tabIndex={-1}
          role="alert"
          className="rounded-[var(--radius-md)] border border-error/50 bg-error/10 p-4 text-sm outline-none [.on-light_&]:border-error-light/40 [.on-light_&]:bg-error-light/[0.06]"
        >
          <p className="font-semibold">
            {status.reason === "network"
              ? "We couldn't send your request — please check your connection and try again."
              : status.reason === "rate_limited"
                ? "We've received several requests from this connection. Please wait a few minutes and try again."
                : "Our online form isn't able to send requests right now."}
          </p>
          <p className="mt-1">
            Please reach us directly:{" "}
            <a href={BUSINESS.phoneHref} className="link-inline font-semibold">
              {BUSINESS.phoneDisplay}
            </a>{" "}
            or{" "}
            <a
              href={BUSINESS.emailHref}
              className="link-inline font-semibold break-all"
            >
              {BUSINESS.email}
            </a>
            .
          </p>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" id={id("name")} error={errors.name}>
          <input
            id={id("name")}
            name="name"
            autoComplete="name"
            className="field-control"
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            {...aria(id("name"), errors.name)}
          />
        </Field>
        <Field label="Phone" id={id("phone")} error={errors.phone}>
          <input
            id={id("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            className="field-control"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            {...aria(id("phone"), errors.phone)}
          />
        </Field>
        <Field label="Email" id={id("email")} error={errors.email}>
          <input
            id={id("email")}
            name="email"
            type="email"
            autoComplete="email"
            className="field-control"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            {...aria(id("email"), errors.email)}
          />
        </Field>
        <Field label="City" id={id("city")} error={errors.city}>
          <select
            id={id("city")}
            name="city"
            className="field-control"
            value={values.city}
            onChange={(e) => update("city", e.target.value)}
            {...aria(id("city"), errors.city)}
          >
            <option value="" disabled>
              Select your city
            </option>
            {LEAD_CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <fieldset
        aria-describedby={
          errors.division ? `${id("division")}-error` : undefined
        }
      >
        <legend className="field-label">Project type</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {(["outdoor", "interior"] as const).map((d) => (
            <label key={d} className="choice">
              <input
                type="radio"
                name="division"
                value={d}
                checked={values.division === d}
                onChange={() => update("division", d)}
              />
              <span className="font-medium">
                {d === "outdoor" ? "Outdoor" : "Interior"}
              </span>
              <span className="text-sm text-muted-dark [.on-light_&]:text-muted-light">
                {d === "outdoor"
                  ? "Yard, hardscape, decks, lawn"
                  : "Flooring, tile, bathrooms"}
              </span>
            </label>
          ))}
        </div>
        {errors.division && (
          <p id={`${id("division")}-error`} className="field-error">
            {errors.division}
          </p>
        )}
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Service"
          id={id("service")}
          error={errors.service}
          hint={!values.division ? "Choose a project type first" : undefined}
        >
          <select
            id={id("service")}
            name="service"
            className="field-control"
            value={values.service}
            disabled={!values.division}
            onChange={(e) => update("service", e.target.value)}
            {...aria(id("service"), errors.service, !values.division)}
          >
            <option value="" disabled>
              Select a service
            </option>
            {services.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Timing" id={id("timing")} error={errors.timing}>
          <select
            id={id("timing")}
            name="timing"
            className="field-control"
            value={values.timing}
            onChange={(e) => update("timing", e.target.value)}
            {...aria(id("timing"), errors.timing)}
          >
            <option value="" disabled>
              When would you like to start?
            </option>
            {LEAD_TIMING.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field
        label="Project description"
        id={id("description")}
        error={errors.description}
        hint="What you'd like done, approximate size, and anything we should know about the property."
      >
        <textarea
          id={id("description")}
          name="description"
          rows={5}
          className="field-control"
          value={values.description}
          onChange={(e) => update("description", e.target.value)}
          {...aria(id("description"), errors.description, true)}
        />
      </Field>

      <div
        aria-hidden
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
      >
        <label>
          Website
          <input
            tabIndex={-1}
            autoComplete="off"
            name="website"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </label>
      </div>

      {showMarketing && (
        <label className="flex items-start gap-3 text-sm">
          <input
            type="checkbox"
            name="marketingOptIn"
            checked={marketingOptIn}
            onChange={(e) => setMarketingOptIn(e.target.checked)}
            className="mt-0.5 h-5 w-5 shrink-0 accent-gold [.on-light_&]:accent-forest"
          />
          <span className="text-muted-dark [.on-light_&]:text-muted-light">
            {MARKETING_CONSENT.wording}
          </span>
        </label>
      )}

      <p
        id={id("privacy")}
        className="text-sm text-muted-dark [.on-light_&]:text-muted-light"
      >
        SilverScape Solutions will use the information you provide to respond to
        your inquiry and manage your requested services. See our{" "}
        <Link to="/privacy" className="link-inline">
          Privacy Policy
        </Link>
        .
      </p>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button
          type="submit"
          size="lg"
          variant={tone === "light" ? "forest" : "default"}
          disabled={submitting}
          aria-disabled={submitting}
          aria-describedby={id("privacy")}
          className="w-full sm:w-auto"
        >
          {submitting ? (
            <>
              <Loader2 aria-hidden className="animate-spin" /> Sending…
            </>
          ) : (
            "Send my request"
          )}
        </Button>
        <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-dark [.on-light_&]:text-muted-light">
          <span>Prefer to talk?</span>
          <a
            href={BUSINESS.phoneHref}
            className="link-inline inline-flex items-center gap-1.5"
          >
            <Phone aria-hidden className="h-3.5 w-3.5" />
            {BUSINESS.phoneDisplay}
          </a>
          <a
            href={BUSINESS.emailHref}
            className="link-inline inline-flex items-center gap-1.5"
          >
            <Mail aria-hidden className="h-3.5 w-3.5" />
            Email us
          </a>
        </p>
      </div>
      <p aria-live="polite" className="sr-only">
        {submitting ? "Sending your request" : ""}
      </p>
    </form>
  );
}

function aria(fieldId: string, error?: string, hasHint = false) {
  const describedBy = [
    error ? `${fieldId}-error` : null,
    hasHint && !error ? `${fieldId}-hint` : null,
  ]
    .filter(Boolean)
    .join(" ");
  return {
    "aria-invalid": error ? (true as const) : undefined,
    "aria-describedby": describedBy || undefined,
    required: true,
  };
}

function Field({
  label,
  id,
  error,
  hint,
  children,
}: {
  label: string;
  id: string;
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
