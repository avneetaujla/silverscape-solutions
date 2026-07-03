import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  children,
  height = "tall",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  image: string;
  children?: ReactNode;
  height?: "tall" | "short";
}) {
  return (
    <section
      className={`relative ${height === "tall" ? "min-h-[78vh]" : "min-h-[55vh]"} flex items-end overflow-hidden`}
    >
      <img
        src={image}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 hero-overlay" />
      <div className="absolute inset-0 bg-forest-deep/40" />
      <div className="relative section-shell pt-40 pb-20 md:pb-28">
        <div className="max-w-3xl">
          {eyebrow && <div className="eyebrow mb-6">{eyebrow}</div>}
          <h1 className="font-serif text-5xl leading-[1.01] text-cream md:text-6xl lg:text-7xl">
            {title}
          </h1>
          {description && (
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-cream/80 md:text-xl">
              {description}
            </p>
          )}
          {children && (
            <div className="mt-10 flex flex-wrap gap-3 md:gap-4">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
