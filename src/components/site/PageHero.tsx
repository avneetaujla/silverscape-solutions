import type { ReactNode } from "react";
import type { SiteImage } from "@/content/mediaCatalog";
import { Img } from "@/components/site/Img";
import { Breadcrumbs, type Crumb } from "@/components/site/Breadcrumbs";
import { cn } from "@/lib/utils";
import { typeset } from "@/lib/typeset";

/**
 * Page header. With an `image` it renders a full-bleed photographic hero;
 * without one it renders a typographic hero on the contour surface, used for
 * pages that should not consume project photography.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  image,
  children,
  breadcrumbs,
  size = "default",
  aside,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  image?: SiteImage;
  children?: ReactNode;
  breadcrumbs?: Crumb[];
  size?: "default" | "compact";
  aside?: ReactNode;
}) {
  return (
    <section
      className={cn(
        "relative isolate flex items-end overflow-hidden",
        image ? "surface-ink" : "surface-contour",
        image
          ? size === "compact"
            ? "min-h-[min(34rem,72svh)]"
            : "min-h-[min(44rem,86svh)]"
          : "min-h-[min(30rem,64svh)]",
      )}
    >
      {image && (
        <>
          <Img
            image={image}
            sizes="100vw"
            priority
            decorative
            className="absolute inset-0 -z-10 h-full w-full object-cover"
          />
          <div aria-hidden className="hero-scrim absolute inset-0 -z-10" />
        </>
      )}
      <div className="container-site w-full pb-14 pt-[calc(var(--header-h)+3.5rem)] md:pb-20">
        <div
          className={cn(
            "grid gap-10",
            aside && "lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end",
          )}
        >
          <div className="max-w-3xl">
            {breadcrumbs && (
              <div className="mb-7">
                <Breadcrumbs items={breadcrumbs} />
              </div>
            )}
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h1 className={cn("type-h1 text-cream", eyebrow && "mt-4")}>
              {typeset(title)}
            </h1>
            {description && (
              <p className="type-lead mt-6 measure text-cream/85">
                {description}
              </p>
            )}
            {children && (
              <div className="mt-9 flex flex-wrap gap-3">{children}</div>
            )}
          </div>
          {aside}
        </div>
      </div>
      {!image && (
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent"
        />
      )}
    </section>
  );
}
