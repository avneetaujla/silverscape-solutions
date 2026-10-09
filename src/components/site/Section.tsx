import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { typeset } from "@/lib/typeset";

export type Tone = "ink" | "forest" | "cream" | "stone" | "paper";

const TONE_CLASS: Record<Tone, string> = {
  ink: "surface-ink",
  forest: "surface-forest",
  cream: "surface-cream on-light",
  stone: "surface-stone on-light",
  paper: "surface-paper on-light",
};

export const isLightTone = (tone: Tone) =>
  tone === "cream" || tone === "stone" || tone === "paper";

export function Section({
  children,
  tone = "ink",
  id,
  className,
  size = "default",
  labelledBy,
}: {
  children: ReactNode;
  tone?: Tone;
  id?: string;
  className?: string;
  size?: "default" | "sm";
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        TONE_CLASS[tone],
        size === "sm" ? "section-sm" : "section",
        className,
      )}
    >
      <div className="container-site">{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  id,
  as: Heading = "h2",
  className,
  action,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  id?: string;
  as?: "h1" | "h2";
  className?: string;
  action?: ReactNode;
}) {
  const centered = align === "center";
  return (
    <div
      className={cn(
        "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
        centered && "md:flex-col md:items-center text-center",
        className,
      )}
    >
      <div className={cn("max-w-3xl", centered && "mx-auto")}>
        {eyebrow && (
          <p className={cn("eyebrow", centered && "eyebrow-plain")}>
            {eyebrow}
          </p>
        )}
        <Heading
          id={id}
          className={cn(
            Heading === "h1" ? "type-h1" : "type-h2",
            eyebrow && "mt-4",
          )}
        >
          {typeset(title)}
        </Heading>
        {description && (
          <p
            className={cn(
              "type-lead mt-5 measure text-muted-dark [.on-light_&]:text-muted-light",
              centered && "mx-auto",
            )}
          >
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0 [&_a]:min-h-11">{action}</div>}
    </div>
  );
}
