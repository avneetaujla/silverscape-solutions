import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHeader } from "@/components/site/Section";
import { CTA } from "@/components/site/CTA";
import { FinalCTA } from "@/components/site/FinalCTA";
import { RegionMap } from "@/components/site/RegionMap";
import { GTA_CITIES, PRIMARY_LOCATIONS } from "@/lib/locations-data";
import { breadcrumbSchema, seo } from "@/lib/seo";

const PATH = "/service-areas";

export const Route = createFileRoute("/service-areas/")({
  head: () =>
    seo({
      title:
        "Service Areas — Guelph, Kitchener-Waterloo, Cambridge & GTA | SilverScape",
      description:
        "SilverScape Solutions serves Guelph, Kitchener, Waterloo, Cambridge and the GTA — Toronto, Mississauga and Brampton — with outdoor, interior and sod delivery services.",
      path: PATH,
      jsonLd: [
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Service Areas", path: PATH },
        ]),
      ],
    }),
  component: ServiceAreasPage,
});

function ServiceAreasPage() {
  const core = PRIMARY_LOCATIONS.filter((l) => l.slug !== "gta");
  const gta = PRIMARY_LOCATIONS.find((l) => l.slug === "gta");
  return (
    <>
      <PageHero
        aside={
          <RegionMap
            active={["guelph", "kitchener", "waterloo", "cambridge", "gta"]}
            className="hidden lg:block"
          />
        }
        eyebrow="Service areas"
        title={
          <>
            Based in Guelph.{" "}
            <span className="accent-serif">
              Working across Southern Ontario.
            </span>
          </>
        }
        description="Our core markets are Guelph, Kitchener, Waterloo and Cambridge, with outdoor and interior projects across the Greater Toronto Area."
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Service Areas", path: PATH },
        ]}
      >
        <CTA
          to="/contact"
          size="lg"
          track="request_quote_click"
          trackLabel="areas_hero"
        >
          Request a Quote
        </CTA>
      </PageHero>

      <Section tone="paper" labelledBy="core">
        <SectionHeader
          id="core"
          eyebrow="Guelph & Waterloo Region"
          title="Our home markets"
          description="Closest to our base and the sod farm on our delivery route — outdoor, interior and sod delivery all available."
        />
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {core.map((l) => (
            <li key={l.slug}>
              <Link
                to="/service-areas/$city"
                params={{ city: l.slug }}
                className="group card-light card-interactive flex h-full flex-col p-7 md:p-8"
              >
                <span className="flex items-center gap-3">
                  <MapPin aria-hidden className="h-5 w-5 text-forest" />
                  <span className="type-h3">{l.name}</span>
                </span>
                <span className="mt-3 flex-1 text-muted-light">{l.intro}</span>
                <span className="link-arrow mt-6">
                  Services in {l.name}{" "}
                  <ArrowRight aria-hidden className="h-4 w-4" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {gta && (
        <Section tone="forest" labelledBy="gta">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div>
              <SectionHeader
                id="gta"
                eyebrow="Greater Toronto Area"
                title={gta.name}
                description={gta.intro}
              />
              <CTA
                to="/service-areas/$city"
                params={{ city: "gta" }}
                className="mt-8"
                iconAfter={<ArrowRight aria-hidden />}
              >
                Working in the GTA
              </CTA>
            </div>
            <ul className="grid gap-3">
              {GTA_CITIES.map((c) => (
                <li key={c.slug}>
                  <Link
                    to="/service-areas/$city"
                    params={{ city: c.slug }}
                    className="group card-dark card-interactive flex min-h-16 items-center justify-between gap-4 px-6 py-5"
                  >
                    <span>
                      <span className="block font-serif text-2xl">
                        {c.name}
                      </span>
                      <span className="mt-1 block text-sm text-muted-dark">
                        {c.metaDescription}
                      </span>
                    </span>
                    <ArrowRight
                      aria-hidden
                      className="h-5 w-5 shrink-0 text-gold"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      )}

      <Section tone="cream" size="sm" labelledBy="outside">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="outside" className="type-h3">
            Outside these areas?
          </h2>
          <p className="mt-3 text-muted-light">
            We occasionally take on larger projects elsewhere in Southern
            Ontario. Tell us where the property is and what you have in mind,
            and we'll let you know honestly whether it's a fit.
          </p>
          <CTA to="/contact" variant="forest" className="mt-7">
            Ask about your area
          </CTA>
        </div>
      </Section>

      <FinalCTA />
    </>
  );
}
