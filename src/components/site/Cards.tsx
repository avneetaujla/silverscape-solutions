import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Img } from "@/components/site/Img";
import {
  serviceImage,
  servicePath,
  type ServiceDetail,
} from "@/lib/services-data";
import type { Article } from "@/lib/articles-data";
import { cn } from "@/lib/utils";
import { typeset } from "@/lib/typeset";

export function ServiceCard({
  service,
  tone = "dark",
  headingLevel = "h3",
  showImage = true,
}: {
  service: ServiceDetail;
  tone?: "dark" | "light";
  headingLevel?: "h2" | "h3";
  /** Text-only variant for cross-links, so service heroes aren't repeated. */
  showImage?: boolean;
}) {
  const H = headingLevel;
  return (
    <Link
      to={servicePath(service)}
      className={cn(
        "group card-interactive flex h-full flex-col overflow-hidden",
        tone === "dark" ? "card-dark" : "card-light",
      )}
    >
      {showImage && (
        <div className="media-frame aspect-[4/3] rounded-none">
          <Img
            image={serviceImage(service)}
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
            className="media-zoom"
          />
        </div>
      )}
      <div className="@container flex flex-1 flex-col p-6 md:p-7">
        <H className="type-h3 @max-[13rem]:text-[1.3rem]">
          {typeset(service.title, { phrasesFrom: "xl" })}
        </H>
        <p
          className={cn(
            "mt-3 flex-1",
            tone === "dark" ? "text-muted-dark" : "text-muted-light",
          )}
        >
          {service.summary}
        </p>
        <span className="link-arrow mt-6">
          Explore {service.label.toLowerCase()}{" "}
          <ArrowRight aria-hidden className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}

export function ServiceLinkRow({ service }: { service: ServiceDetail }) {
  return (
    <Link
      to={servicePath(service)}
      className="group flex min-h-16 items-center justify-between gap-4 border-b border-current/10 py-4 text-left"
    >
      <span>
        <span className="block font-serif text-xl">{service.title}</span>
        <span className="mt-1 block text-sm text-muted-dark [.on-light_&]:text-muted-light">
          {service.tagline}
        </span>
      </span>
      <ArrowUpRight
        aria-hidden
        className="h-5 w-5 shrink-0 text-gold transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 [.on-light_&]:text-forest"
      />
    </Link>
  );
}

export function ArticleCard({
  article,
  tone = "light",
}: {
  article: Article;
  tone?: "dark" | "light";
}) {
  return (
    <Link
      to="/resources/$slug"
      params={{ slug: article.slug }}
      className={cn(
        "group card-interactive relative flex h-full flex-col overflow-hidden",
        tone === "dark" ? "card-dark" : "card-light",
      )}
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-[0.18] bg-gold transition-transform duration-500 group-hover:scale-x-100 [.on-light_&]:bg-bronze"
      />
      <div className="@container flex flex-1 flex-col p-7 md:p-8">
        <p className="flex items-center justify-between gap-4 text-xs font-semibold uppercase tracking-[0.14em] text-bronze [.surface-ink_&]:text-gold [.surface-forest_&]:text-gold">
          <span>{article.category}</span>
          <span className="font-medium normal-case tracking-normal">
            {article.readMinutes} min read
          </span>
        </p>
        <h3 className="type-h3 mt-6 text-[1.55rem] leading-[1.2] lg:max-xl:text-[1.4rem] @max-[13rem]:text-[1.3rem]">
          {typeset(article.title, { phrasesFrom: "lg" })}
        </h3>
        <p
          className={cn(
            "mt-3 flex-1 text-[0.9375rem]",
            tone === "dark" ? "text-muted-dark" : "text-muted-light",
          )}
        >
          {article.excerpt}
        </p>
        <span className="link-arrow mt-5">
          Read the guide <ArrowRight aria-hidden className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
