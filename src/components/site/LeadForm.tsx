import {
  useState,
  type InputHTMLAttributes,
  type ReactNode,
  type TextareaHTMLAttributes,
} from "react";
import { toast } from "sonner";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function LeadForm({ compact = false }: { compact?: boolean }) {
  const [submitting, setSubmitting] = useState(false);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitting(true);
        setTimeout(() => {
          setSubmitting(false);
          toast.success("Thanks — we'll be in touch within one business day.");
          (e.target as HTMLFormElement).reset();
        }, 600);
      }}
      className={`grid gap-4 ${compact ? "" : "md:grid-cols-2"}`}
    >
      <Field name="name" label="Full name" required />
      <Field name="phone" label="Phone" type="tel" required />
      <Field name="email" label="Email" type="email" required />
      <Field
        name="city"
        label="City"
        placeholder="Guelph, Kitchener…"
        required
      />
      <div className="md:col-span-2">
        <FieldLabel htmlFor="category">Service category</FieldLabel>
        <select id="category" name="category" className={controlClass}>
          <option value="outdoor" className="bg-forest-deep">
            Outdoor improvements
          </option>
          <option value="interior" className="bg-forest-deep">
            Interior renovation
          </option>
          <option value="sod" className="bg-forest-deep">
            Sod order / delivery
          </option>
          <option value="other" className="bg-forest-deep">
            Other
          </option>
        </select>
      </div>
      <Field
        name="timing"
        label="Project timing"
        placeholder="ASAP, this season, planning…"
      />
      <Field
        name="budget"
        label="Budget range (optional)"
        placeholder="$10k+"
      />
      <div className="md:col-span-2">
        <FieldLabel htmlFor="details">Project details</FieldLabel>
        <TextareaField
          id="details"
          name="details"
          rows={4}
          placeholder="Tell us about the property, timeline and what you'd like done."
        />
      </div>
      <div className="md:col-span-2">
        <button
          type="submit"
          disabled={submitting}
          className={cn(
            buttonVariants({ variant: "default", size: "lg" }),
            "w-full md:w-auto",
          )}
        >
          {submitting ? "Sending…" : "Request a Quote"}
        </button>
      </div>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  placeholder,
  required,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <TextField
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
      />
    </div>
  );
}

export function FieldLabel({
  htmlFor,
  children,
}: {
  htmlFor?: string;
  children: ReactNode;
}) {
  return (
    <label className="eyebrow" htmlFor={htmlFor}>
      {children}
    </label>
  );
}

export function TextField({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(controlClass, className)} {...props} />;
}

export function TextareaField({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(controlClass, "premium-textarea", className)}
      {...props}
    />
  );
}

export const controlClass = "premium-input mt-2 text-sm leading-relaxed";
