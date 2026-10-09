import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Info } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { CTA } from "@/components/site/CTA";
import { Img } from "@/components/site/Img";
import { ProjectCard } from "@/components/site/ProjectCard";
import { FinalCTA } from "@/components/site/FinalCTA";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { media } from "@/content/mediaCatalog";
import {
  HAS_COMPLETED_PROJECTS,
  HAS_PLACEHOLDER_PROJECTS,
  PORTFOLIO,
  PORTFOLIO_CATEGORIES,
  type PortfolioProject,
} from "@/lib/portfolio-data";
import { ALL_SERVICES, servicePath } from "@/lib/services-data";
import { breadcrumbSchema, seo } from "@/lib/seo";
import { trackEvent } from "@/lib/analytics";
import { typeset } from "@/lib/typeset";

const PATH = "/portfolio";

export const Route = createFileRoute("/portfolio")({
  head: () =>
    seo({
      title:
        "Portfolio — Outdoor & Interior Transformations | SilverScape Solutions",
      description:
        "Outdoor and interior work by SilverScape Solutions: landscaping, sod, decks, fences, interlocking, bathrooms, flooring and tile.",
      path: PATH,
      jsonLd: [
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Portfolio", path: PATH },
        ]),
      ],
    }),
  component: PortfolioPage,
});

type DivisionFilter = "all" | "outdoor" | "interior";

function PortfolioPage() {
  const [division, setDivision] = useState<DivisionFilter>("all");
  const [category, setCategory] = useState<string>("all");
  const [open, setOpen] = useState<PortfolioProject | null>(null);

  const categories = useMemo(() => {
    const ordered =
      division === "all"
        ? [...PORTFOLIO_CATEGORIES.outdoor, ...PORTFOLIO_CATEGORIES.interior]
        : PORTFOLIO_CATEGORIES[division];
    return ordered.filter((c) => PORTFOLIO.some((p) => p.category === c));
  }, [division]);
  const projects = PORTFOLIO.filter(
    (p) =>
      (division === "all" || p.division === division) &&
      (category === "all" || p.category === category),
  );

  function chooseDivision(d: DivisionFilter) {
    setDivision(d);
    setCategory("all");
    trackEvent("portfolio_filter", {
      filter_type: "division",
      filter_value: d,
    });
  }
  function chooseCategory(c: string) {
    setCategory(c);
    trackEvent("portfolio_filter", {
      filter_type: "category",
      filter_value: c,
    });
  }
  function openProject(p: PortfolioProject) {
    setOpen(p);
    trackEvent("portfolio_project_view", {
      project: p.slug,
      division: p.division,
    });
  }

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title={
          <>
            Transformations,{" "}
            <span className="accent-serif">inside and out.</span>
          </>
        }
        description="Landscaping, sod, decks, fences and interlocking outside. Bathrooms, flooring and tile inside."
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Portfolio", path: PATH },
        ]}
      />

      <Section tone="ink" size="sm" labelledBy="portfolio-grid">
        <h2 id="portfolio-grid" className="sr-only">
          Projects
        </h2>
        {HAS_PLACEHOLDER_PROJECTS && (
          <div className="mb-10 flex gap-4 rounded-[var(--radius-lg)] border border-gold/30 bg-gold/[0.06] p-5 text-[0.9375rem] text-cream/90">
            <Info aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
            <p>
              <strong className="font-semibold text-cream">
                Representative project types.
              </strong>{" "}
              {HAS_COMPLETED_PROJECTS
                ? "Entries marked “Project type” show the typical scope for that kind of work with reference imagery — not a completed SilverScape job."
                : "Each entry shows the typical scope for that kind of work with reference imagery — not a completed SilverScape job. Documented case studies, with real photos and locations, will replace them as they are published."}
            </p>
          </div>
        )}

        <div className="flex flex-col gap-4">
          <div
            role="group"
            aria-label="Filter by division"
            className="flex flex-wrap gap-2"
          >
            {(["all", "outdoor", "interior"] as const).map((d) => (
              <Button
                key={d}
                type="button"
                size="sm"
                variant={division === d ? "filterActive" : "filter"}
                aria-pressed={division === d}
                onClick={() => chooseDivision(d)}
              >
                {d === "all"
                  ? "All work"
                  : d === "outdoor"
                    ? "Outdoor"
                    : "Interior"}
              </Button>
            ))}
          </div>
          <div
            role="group"
            aria-label="Filter by category"
            className="flex flex-wrap gap-x-5 gap-y-1"
          >
            {["all", ...categories].map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={category === c}
                onClick={() => chooseCategory(c)}
                className="min-h-11 text-sm text-cream/70 underline-offset-[6px] transition-colors hover:text-cream aria-pressed:text-gold aria-pressed:underline"
              >
                {c === "all" ? "All categories" : c}
              </button>
            ))}
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          {projects.length} {projects.length === 1 ? "entry" : "entries"} shown
        </p>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <li key={p.slug}>
              <ProjectCard project={p} onOpen={() => openProject(p)} />
            </li>
          ))}
        </ul>
      </Section>

      <Dialog open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="block max-h-[92svh] max-w-3xl overflow-y-auto border-cream/12 bg-ink p-0 text-cream sm:rounded-[var(--radius-xl)] [&>button]:grid [&>button]:h-11 [&>button]:w-11 [&>button]:place-items-center [&>button]:rounded-[var(--radius-sm)] [&>button]:bg-ink/80 [&>button]:opacity-100">
          {open && <ProjectDetail project={open} />}
        </DialogContent>
      </Dialog>

      <FinalCTA title="Have a space you'd like to transform?" />
    </>
  );
}

function ProjectDetail({ project }: { project: PortfolioProject }) {
  const service = ALL_SERVICES.find(
    (s) => s.slug === project.serviceSlug && s.division === project.division,
  );
  return (
    <>
      <div className="relative aspect-[16/10] overflow-hidden">
        <Img
          image={media(project.images[0])}
          sizes="(min-width: 768px) 48rem, 100vw"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-6 sm:p-9">
        <span className="badge badge-dark">
          {project.division === "outdoor" ? "Outdoor" : "Interior"} ·{" "}
          {project.category}
        </span>
        <DialogTitle className="type-h2 mt-4 text-cream">
          {typeset(project.title)}
        </DialogTitle>
        <DialogDescription className="type-lead mt-3 text-muted-dark">
          {project.outcome}
        </DialogDescription>
        <dl className="mt-7 grid gap-6 sm:grid-cols-2">
          {project.location && (
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                Location
              </dt>
              <dd className="mt-2 text-cream/90">{project.location}</dd>
            </div>
          )}
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
              {project.isPlaceholder ? "Typical scope" : "Scope"}
            </dt>
            <dd className="mt-2">
              <ul className="list-check grid gap-2 text-cream/90">
                {project.scope.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <CTA
            to="/contact"
            search={{ division: project.division, service: service?.label }}
            track="request_quote_click"
            trackLabel={`portfolio_${project.slug}`}
          >
            Request a similar project
          </CTA>
          {service && (
            <Link
              to={servicePath(service) as never}
              className="link-arrow min-h-11"
            >
              {service.title} <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
