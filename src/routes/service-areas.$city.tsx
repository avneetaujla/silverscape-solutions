import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, MapPin, Truck } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHeader } from "@/components/site/Section";
import { CTA } from "@/components/site/CTA";
import { ServiceLinkRow } from "@/components/site/Cards";
import { LeadForm } from "@/components/site/LeadForm";
import { RegionMap } from "@/components/site/RegionMap";
import { findLocation, GTA_CITIES, type Location } from "@/lib/locations-data";
import { findService, type ServiceDetail } from "@/lib/services-data";
import { breadcrumbSchema, seo, serviceSchema } from "@/lib/seo";
import { PORTFOLIO_CTA_LABEL } from "@/lib/portfolio-data";
import { typeset } from "@/lib/typeset";

function crumbs(loc: Location) {
  const items = [
    { name: "Home", path: "/" },
    { name: "Service Areas", path: "/service-areas" },
  ];
  if (loc.tier === "gta")
    items.push({ name: "GTA", path: "/service-areas/gta" });
  items.push({ name: loc.name, path: `/service-areas/${loc.slug}` });
  return items;
}

export const Route = createFileRoute("/service-areas/$city")({
  loader: ({ params }) => {
    const loc = findLocation(params.city);
    if (!loc) throw notFound();
    return { slug: loc.slug };
  },
  head: ({ params }) => {
    const loc = findLocation(params.city);
    if (!loc) return {};
    const path = `/service-areas/${loc.slug}`;
    const area =
      loc.slug === "gta"
        ? GTA_CITIES.map((c) => ({ "@type": "City", name: c.name }))
        : [{ "@type": "City", name: loc.name }];
    return seo({
      title: `${loc.metaTitle} | SilverScape Solutions`,
      description: loc.metaDescription,
      path,
      jsonLd: [
        serviceSchema({
          name: `Outdoor and interior renovation in ${loc.name}`,
          serviceType: "Landscaping and home renovation",
          description: loc.metaDescription,
          path,
          areaServed: area,
        }),
        breadcrumbSchema(crumbs(loc)),
      ],
    });
  },
  component: CityPage,
});

function pick(division: "outdoor" | "interior", slugs: string[]) {
  return slugs
    .map((s) => findService(division, s))
    .filter((s): s is ServiceDetail => Boolean(s));
}

function CityPage() {
  const { slug } = Route.useLoaderData();
  const loc = findLocation(slug)!;
  const outdoor = pick("outdoor", loc.featuredOutdoor);
  const interior = pick("interior", loc.featuredInterior);
  const nearby = loc.nearby
    .map(findLocation)
    .filter((l): l is Location => Boolean(l));
  const isGtaHub = loc.slug === "gta";

  return (
    <>
      <PageHero
        aside={<RegionMap active={[loc.slug]} className="hidden lg:block" />}
        eyebrow={loc.tier === "gta" ? "Greater Toronto Area" : "Service area"}
        title={
          <>
            Outdoor & interior transformations in{" "}
            <span className="accent-serif">{loc.name}</span>
          </>
        }
        description={loc.intro}
        breadcrumbs={crumbs(loc)}
      >
        <CTA
          to="/contact"
          size="lg"
          track="request_quote_click"
          trackLabel={`city_${loc.slug}`}
        >
          Request a Quote
        </CTA>
        <CTA to="/portfolio" variant="outline" size="lg">
          {PORTFOLIO_CTA_LABEL}
        </CTA>
      </PageHero>

      {isGtaHub && (
        <Section tone="forest" size="sm" labelledBy="gta-cities">
          <h2 id="gta-cities" className="type-h3">
            GTA cities we work in
          </h2>
          <ul className="mt-6 grid gap-3 md:grid-cols-3">
            {GTA_CITIES.map((c) => (
              <li key={c.slug}>
                <Link
                  to="/service-areas/$city"
                  params={{ city: c.slug }}
                  className="group card-dark card-interactive flex min-h-16 items-center justify-between gap-4 px-6 py-5"
                >
                  <span className="font-serif text-2xl">{c.name}</span>
                  <ArrowRight aria-hidden className="h-5 w-5 text-gold" />
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section tone="paper" labelledBy="local">
        <SectionHeader
          id="local"
          eyebrow={`Working in ${loc.name}`}
          title="What we plan for locally."
          description="Every property is different, but these are the local factors that most often shape a project here."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {loc.localNotes.map((n) => (
            <div key={n.t} className="card-light p-7">
              <h3 className="type-h4">{n.t}</h3>
              <p className="mt-3 text-muted-light">{n.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="ink" labelledBy="services">
        <SectionHeader
          id="services"
          eyebrow="Popular here"
          title={`Services in ${loc.name}`}
          description="The full range of outdoor and interior services is available — these are the projects homeowners here ask about most."
        />
        <div className="mt-10 grid gap-12 lg:grid-cols-2">
          <div>
            <h3 className="type-h4 text-gold">Outdoor Transformations</h3>
            <div className="mt-3">
              {outdoor.map((s) => (
                <ServiceLinkRow key={s.slug} service={s} />
              ))}
            </div>
            <Link to="/outdoor-services" className="link-arrow mt-6">
              All outdoor services{" "}
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>
          <div>
            <h3 className="type-h4 text-gold">Interior Renovations</h3>
            <div className="mt-3">
              {interior.map((s) => (
                <ServiceLinkRow key={s.slug} service={s} />
              ))}
            </div>
            <Link to="/interior-renovations" className="link-arrow mt-6">
              All interior services{" "}
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Section>

      <Section tone="stone" size="sm" labelledBy="sod">
        <div className="grid items-center gap-8 md:grid-cols-[auto_1fr_auto]">
          <span className="grid h-14 w-14 place-items-center rounded-[var(--radius-lg)] bg-forest-deep text-gold">
            <Truck aria-hidden className="h-6 w-6" />
          </span>
          <div>
            <h2 id="sod" className="type-h3">
              {typeset(`Sod delivery to ${loc.name}`)}
            </h2>
            <p className="mt-2 measure text-muted-light">{loc.sodNote}</p>
          </div>
          <CTA to="/sod-ordering" variant="forest">
            Order sod online
          </CTA>
        </div>
      </Section>

      <Section tone="forest" id="quote" labelledBy="city-quote">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="eyebrow">Request a quote</p>
            <h2 id="city-quote" className="type-h2 mt-4">
              {typeset(`Planning a project in ${loc.name}?`)}
            </h2>
            <p className="type-lead mt-5 measure text-muted-dark">
              Tell us about the property. We'll follow up to arrange a site walk
              and a written, itemized proposal.
            </p>
            {nearby.length > 0 && (
              <div className="mt-10">
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                  Nearby areas
                </h3>
                <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-1">
                  {nearby.map((n) => (
                    <li key={n.slug}>
                      <Link
                        to="/service-areas/$city"
                        params={{ city: n.slug }}
                        className="inline-flex min-h-11 items-center gap-2 text-cream/85 hover:text-cream"
                      >
                        <MapPin aria-hidden className="h-4 w-4 text-gold" />
                        {n.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="card-dark p-6 sm:p-8">
            <LeadForm heading={`${loc.name} project quote`} />
          </div>
        </div>
      </Section>
    </>
  );
}
