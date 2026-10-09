import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  ClipboardCheck,
  Layers,
  MapPin,
  Route as RouteIcon,
} from "lucide-react";
import { CTA } from "@/components/site/CTA";
import { Img } from "@/components/site/Img";
import { Section, SectionHeader } from "@/components/site/Section";
import { ArticleCard } from "@/components/site/Cards";
import { ProjectCard } from "@/components/site/ProjectCard";
import { FAQList } from "@/components/site/FAQList";
import { FinalCTA } from "@/components/site/FinalCTA";
import { media, type MediaId } from "@/content/mediaCatalog";
import {
  findService,
  servicePath,
  type Division,
  type ServiceDetail,
} from "@/lib/services-data";
import { PORTFOLIO } from "@/lib/portfolio-data";
import { ARTICLES } from "@/lib/articles-data";
import { GTA_CITIES, PRIMARY_LOCATIONS } from "@/lib/locations-data";
import { faqSchema, seo } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { typeset } from "@/lib/typeset";

const HOME_FAQ = [
  {
    q: "Do you handle both outdoor and interior projects?",
    a: "Yes. SilverScape has an outdoor division for landscaping, hardscape, decks, fences and lawns, and an interior division for flooring, tile and bathroom renovations. You deal with one team either way.",
  },
  {
    q: "Which areas do you serve?",
    a: "Our primary markets are Guelph, Kitchener, Waterloo, Cambridge and the Greater Toronto Area, including Toronto, Mississauga and Brampton.",
  },
  {
    q: "How does online sod ordering work?",
    a: "Choose how many rolls of Kentucky Bluegrass you need, enter your delivery address and contact details, and review a complete itemized total before paying securely through Stripe. Delivery is calculated from the real driving route.",
  },
  {
    q: "Can I start with one part of the property and add more later?",
    a: "Yes. We can plan the full property and build it in phases, so each stage fits the next instead of being redone later.",
  },
];

const FEATURED_ARTICLES = [
  "landscaping-cost-guide-guelph",
  "how-much-sod-do-i-need",
  "bathroom-renovation-cost-guide",
]
  .map((slug) => ARTICLES.find((a) => a.slug === slug))
  .filter((a): a is (typeof ARTICLES)[number] => Boolean(a));

/** Only documented case studies are featured on the homepage. */
const FEATURED_PROJECTS = PORTFOLIO.filter((p) => !p.isPlaceholder).slice(0, 3);

export const Route = createFileRoute("/")({
  head: () =>
    seo({
      title:
        "SilverScape Solutions — Outdoor & Interior Transformations | Guelph, KW & GTA",
      description:
        "Outdoor transformations, interior renovations and Kentucky Bluegrass sod delivery for homes in Guelph, Kitchener, Waterloo, Cambridge and the GTA.",
      path: "/",
      jsonLd: [faqSchema(HOME_FAQ)],
    }),
  component: HomePage,
});

const DIVISIONS: {
  key: string;
  eyebrow: string;
  title: string;
  body: string;
  to: "/outdoor-services" | "/interior-renovations" | "/sod-ordering";
  cta: string;
  image: MediaId;
}[] = [
  {
    key: "outdoor",
    eyebrow: "Outdoor Services",
    title: "Yards built around how you live.",
    body: "Landscaping, hardscape, decks, fences and lawns — planned as one property.",
    to: "/outdoor-services",
    cta: "Explore outdoor",
    image: "brick-patio-dining",
  },
  {
    key: "interior",
    eyebrow: "Interior Renovations",
    title: "Rooms that feel finished.",
    body: "Bathrooms, flooring and tile, from demolition to the last fixture.",
    to: "/interior-renovations",
    cta: "Explore interior",
    image: "bathroom-glass-shower",
  },
  {
    key: "sod",
    eyebrow: "Sod Ordering",
    title: "Kentucky Bluegrass, ordered online.",
    body: "Order rolls for delivery and see the full total before you pay.",
    to: "/sod-ordering",
    cta: "Order sod",
    image: "sod-pallets-driveway",
  },
];

type Category = {
  title: string;
  body: string;
  /** Service whose page the card opens; its hero is the card image. */
  primary: string;
  links: string[];
};

const OUTDOOR_CATEGORIES: Category[] = [
  {
    title: "Backyard Transformations",
    body: "Whole-yard plans that bring layout, planting, lawn and living space together.",
    primary: "yard-transformations",
    links: ["landscaping", "grading-drainage", "lawn-maintenance"],
  },
  {
    title: "Outdoor Structures",
    body: "Decks, fences and custom builds framed for seasonal weather, load and daily use.",
    primary: "decks",
    links: ["fences", "custom-exterior"],
  },
  {
    title: "Hardscaping & Surfaces",
    body: "Driveways, walkways, patios and lawns on a base built for freeze-thaw.",
    primary: "interlocking",
    links: ["patios-outdoor-living", "sod-installation"],
  },
];

const INTERIOR_CATEGORIES: Category[] = [
  {
    title: "Bathroom Renovations",
    body: "Complete bathrooms, waterproofed before a single tile goes up.",
    primary: "bathrooms",
    links: ["showers-tubs", "vanities-fixtures"],
  },
  {
    title: "Flooring",
    body: "Vinyl, laminate and wood-look floors on a flat, prepared subfloor.",
    primary: "flooring",
    links: ["vinyl-laminate"],
  },
  {
    title: "Tile",
    body: "Floors, showers and feature walls laid out so every line and cut lands right.",
    primary: "tile",
    links: [],
  },
];

function HomePage() {
  return (
    <>
      {/* Hero — who we are */}
      <section className="relative isolate flex min-h-[min(52rem,100svh)] items-end overflow-hidden surface-ink">
        <Img
          image={media("backyard-deck-patio")}
          sizes="100vw"
          priority
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div aria-hidden className="hero-scrim absolute inset-0 -z-10" />
        <div className="container-site w-full pb-10 pt-[calc(var(--header-h)+4rem)] md:pb-14">
          <div className="max-w-[54rem]">
            <p className="eyebrow">
              Guelph · Kitchener-Waterloo · Cambridge · GTA
            </p>
            <h1 className="type-display mt-5 text-cream">
              {typeset(
                <>
                  Transform how your home{" "}
                  <span className="accent-serif">looks, feels and lives.</span>
                </>,
              )}
            </h1>
            <p className="type-lead mt-6 max-w-xl text-cream/85">
              Outdoor transformations, interior renovations and Kentucky
              Bluegrass sod delivery — planned properly and built by one team.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <CTA
                to="/contact"
                size="lg"
                iconAfter={<ArrowRight aria-hidden />}
                track="request_quote_click"
                trackLabel="home_hero"
              >
                Request a Quote
              </CTA>
              <CTA to="/sod-ordering" variant="outline" size="lg">
                Order Sod Online
              </CTA>
            </div>
          </div>
          <ul className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-cream/12 bg-cream/12 text-sm sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Layers, t: "Outdoor and interior, one team" },
              { icon: ClipboardCheck, t: "Written, itemized proposals" },
              { icon: RouteIcon, t: "Sod priced on real driving distance" },
              { icon: MapPin, t: "Based in Guelph, Ontario" },
            ].map(({ icon: Icon, t }) => (
              <li
                key={t}
                className="flex items-center gap-3 bg-ink/80 px-5 py-4 text-cream/90 backdrop-blur-sm"
              >
                <Icon aria-hidden className="h-4 w-4 shrink-0 text-gold" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What does SilverScape do? */}
      <Section tone="ink" labelledBy="divisions">
        <SectionHeader
          id="divisions"
          eyebrow="Three divisions"
          title={
            <>
              One standard,{" "}
              <span className="accent-serif">inside and out.</span>
            </>
          }
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {DIVISIONS.map((d) => (
            <Link
              key={d.key}
              to={d.to}
              className="group card-dark card-interactive flex flex-col overflow-hidden"
            >
              <div className="media-frame aspect-[4/3] rounded-none">
                <Img
                  image={media(d.image)}
                  sizes="(min-width: 1024px) 31vw, 100vw"
                  className="media-zoom"
                />
              </div>
              <div className="flex flex-1 flex-col p-7">
                <p className="eyebrow eyebrow-plain">{d.eyebrow}</p>
                <h3 className="type-h3 mt-3">{typeset(d.title)}</h3>
                <p className="mt-3 flex-1 text-muted-dark">{d.body}</p>
                <span className="link-arrow mt-6">
                  {d.cta} <ArrowRight aria-hidden className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* What can you do outside? */}
      <Section tone="forest" labelledBy="outdoor">
        <SectionHeader
          id="outdoor"
          eyebrow="Outdoor Services"
          title={
            <>
              Planned as one property,{" "}
              <span className="accent-serif">built in the right order.</span>
            </>
          }
          description="Grading before hardscape, hardscape before planting, planting before lawn — so nothing is torn out later."
          action={
            <Link to="/outdoor-services" className="link-arrow">
              All outdoor services{" "}
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          }
        />
        <CategoryGrid division="outdoor" categories={OUTDOOR_CATEGORIES} />
      </Section>

      {/* What can you do inside? */}
      <Section tone="stone" labelledBy="interior">
        <SectionHeader
          id="interior"
          eyebrow="Interior Renovations"
          title={
            <>
              Interiors with a{" "}
              <span className="accent-serif">calm, finished feel.</span>
            </>
          }
          description="We start with the subfloor and the waterproofing — the parts you never see — so the finishes you do see stay right."
          action={
            <Link to="/interior-renovations" className="link-arrow">
              All interior services{" "}
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          }
        />
        <CategoryGrid division="interior" categories={INTERIOR_CATEGORIES} />
      </Section>

      {/* How do I get sod? */}
      <section
        className="relative isolate overflow-hidden surface-ink"
        aria-labelledby="sod"
      >
        <div className="container-site section grid items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
          <div className="media-frame aspect-[4/3]">
            <Img
              image={media("sod-roll-closeup")}
              sizes="(min-width: 1024px) 46vw, 100vw"
            />
          </div>
          <div>
            <p className="eyebrow">Sod Ordering & Delivery</p>
            <h2 id="sod" className="type-h2 mt-4">
              {typeset(
                <>
                  Order sod in <span className="accent-serif">four steps.</span>
                </>,
              )}
            </h2>
            <p className="type-lead mt-5 measure text-muted-dark">
              One product — Kentucky Bluegrass in 2 ft × 5 ft rolls — delivered
              on a priced driving route.
            </p>
            <ol className="mt-8 grid gap-3">
              {[
                "Choose how many rolls you need",
                "Enter your delivery address and details",
                "Review an itemized total with route-based delivery",
                "Pay securely through Stripe",
              ].map((step, i) => (
                <li key={step} className="flex items-start gap-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[var(--radius-sm)] border border-gold/50 text-sm font-semibold text-gold">
                    {i + 1}
                  </span>
                  <span className="pt-1 text-cream/90">{step}</span>
                </li>
              ))}
            </ol>
            <div className="mt-9 flex flex-wrap gap-3">
              <CTA
                to="/sod-ordering"
                size="lg"
                iconAfter={<ArrowRight aria-hidden />}
              >
                Start a sod order
              </CTA>
              <CTA
                to="/outdoor-services/$service"
                params={{ service: "sod-installation" }}
                variant="outline"
                size="lg"
              >
                Want it installed?
              </CTA>
            </div>
          </div>
        </div>
      </section>

      {/* What happens when I call? */}
      <Section tone="cream" labelledBy="process">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          <div>
            <SectionHeader
              id="process"
              eyebrow="How a project works"
              title="Planned before it's priced."
              description="The difference between a good project and a stressful one is usually decided before the first shovel goes in."
            />
            <ol className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {[
                {
                  t: "Conversation",
                  d: "Tell us about the property and what you want to change.",
                },
                {
                  t: "Site walk",
                  d: "We measure and assess access, grade and existing conditions.",
                },
                {
                  t: "Written proposal",
                  d: "Scope, materials, exclusions, schedule and an itemized price.",
                },
                {
                  t: "Build and walkthrough",
                  d: "Work done in sequence, then reviewed with you on site.",
                },
              ].map((s, i) => (
                <li key={s.t} className="border-t border-forest-deep/15 pt-5">
                  <span
                    aria-hidden
                    className="font-serif text-3xl leading-none text-bronze"
                  >
                    0{i + 1}
                  </span>
                  <h3 className="type-h4 mt-3">{s.t}</h3>
                  <p className="mt-1.5 text-muted-light">{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="card-light self-start p-8 md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-bronze">
              A written proposal sets out
            </p>
            <ul className="list-check mt-6 grid gap-4 text-forest-deep">
              {[
                "Scope of work, area by area",
                "Materials and product specifications",
                "What is excluded — stated clearly",
                "Permit and utility-locate requirements",
                "An estimated schedule",
                "An itemized price",
              ].map((i) => (
                <li key={i} className="text-[1.0625rem]">
                  {i}
                </li>
              ))}
            </ul>
            <CTA
              to="/contact"
              variant="forest"
              className="mt-8"
              track="request_quote_click"
              trackLabel="home_proposal"
            >
              Request your proposal
            </CTA>
          </div>
        </div>
      </Section>

      {/* Do you work near me? */}
      <Section tone="ink" labelledBy="areas">
        <SectionHeader
          id="areas"
          eyebrow="Service areas"
          title="Guelph, Kitchener-Waterloo, Cambridge and the GTA."
          action={
            <Link to="/service-areas" className="link-arrow">
              All service areas <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          }
        />
        <ul className="mt-10 grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-cream/10 bg-cream/10 sm:grid-cols-2 lg:grid-cols-5">
          {PRIMARY_LOCATIONS.map((l) => (
            <li key={l.slug} className="bg-ink">
              <Link
                to="/service-areas/$city"
                params={{ city: l.slug }}
                className="group flex h-full min-h-28 flex-col justify-between gap-4 p-6 transition-colors hover:bg-forest-panel"
              >
                <span>
                  <span className="type-h4 block">{l.name}</span>
                  {l.slug === "gta" && (
                    <span className="mt-1 block text-sm text-muted-dark">
                      {GTA_CITIES.map((c) => c.name).join(", ")}
                    </span>
                  )}
                </span>
                <ArrowUpRight
                  aria-hidden
                  className="h-5 w-5 text-gold transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {FEATURED_PROJECTS.length > 0 && (
        <Section tone="forest" labelledBy="featured">
          <SectionHeader
            id="featured"
            eyebrow="Recent work"
            title="Completed projects."
            action={
              <Link to="/portfolio" className="link-arrow">
                View the portfolio{" "}
                <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
            }
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FEATURED_PROJECTS.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </Section>
      )}

      {/* Where can I learn more? */}
      <Section tone="paper" labelledBy="resources">
        <SectionHeader
          id="resources"
          eyebrow="Resources"
          title="Plan with better information."
          action={
            <Link to="/resources" className="link-arrow">
              All guides <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          }
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {FEATURED_ARTICLES.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </Section>

      <Section tone="stone" labelledBy="faq">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeader id="faq" eyebrow="Questions" title="Good to know." />
          <FAQList items={HOME_FAQ} />
        </div>
      </Section>

      <FinalCTA />
    </>
  );
}

function CategoryGrid({
  division,
  categories,
}: {
  division: Division;
  categories: Category[];
}) {
  const light = division === "interior";
  return (
    <ul className="mt-12 grid gap-6 lg:grid-cols-3">
      {categories.map((c) => {
        const primary = findService(division, c.primary);
        if (!primary) return null;
        const links = c.links
          .map((slug) => findService(division, slug))
          .filter((s): s is ServiceDetail => Boolean(s));
        return (
          <li
            key={c.title}
            className={cn(
              "group relative flex flex-col overflow-hidden",
              light ? "card-light" : "card-dark",
            )}
          >
            <div className="media-frame aspect-[4/3] rounded-none">
              <Img
                image={media(primary.image)}
                sizes="(min-width: 1024px) 31vw, 100vw"
                className="media-zoom"
                decorative
              />
            </div>
            <div className="flex flex-1 flex-col p-7">
              <h3 className="type-h3">
                <Link
                  to={servicePath(primary) as never}
                  className="after:absolute after:inset-0 after:content-['']"
                >
                  {typeset(c.title, { phrasesFrom: "xl" })}
                </Link>
              </h3>
              <p
                className={cn(
                  "mt-3 flex-1",
                  light ? "text-muted-light" : "text-muted-dark",
                )}
              >
                {c.body}
              </p>
              {links.length > 0 && (
                <ul className="relative z-10 mt-5 flex flex-wrap gap-x-5 gap-y-1 text-sm">
                  {links.map((s) => (
                    <li key={s.slug}>
                      <Link
                        to={servicePath(s) as never}
                        className={cn(
                          "inline-flex min-h-11 items-center underline-offset-4 hover:underline",
                          light
                            ? "text-forest"
                            : "text-cream/80 hover:text-cream",
                        )}
                      >
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              <span className="link-arrow mt-4" aria-hidden>
                Explore <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
