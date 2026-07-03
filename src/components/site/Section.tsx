import type { ReactNode } from "react";

export function Section({
  children,
  className = "",
  variant = "dark",
  id,
  contentClassName = "",
  spacing = "default",
}: {
  children: ReactNode;
  className?: string;
  variant?: "dark" | "light" | "deep";
  id?: string;
  contentClassName?: string;
  spacing?: "default" | "compact";
}) {
  const bg =
    variant === "light"
      ? "bg-cream text-forest-deep"
      : variant === "deep"
        ? "bg-forest-deep text-cream"
        : "bg-background text-foreground";
  const space =
    spacing === "compact" ? "section-space-compact" : "section-space";
  return (
    <section id={id} className={`${bg} ${className}`}>
      <div className={`section-shell ${space} ${contentClassName}`}>
        {children}
      </div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <div className="eyebrow">{children}</div>;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  variant = "dark",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  variant?: "dark" | "light";
}) {
  const sub = variant === "light" ? "text-forest/70" : "text-cream/70";
  return (
    <div
      className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="mt-4 font-serif text-[2.65rem] leading-[1.04] md:text-5xl lg:text-[3.85rem]">
        {title}
      </h2>
      {description && (
        <p
          className={`mt-6 max-w-2xl text-base leading-relaxed md:text-lg ${sub} ${align === "center" ? "mx-auto" : ""}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
