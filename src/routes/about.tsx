import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Hammer, Sprout, Trees } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHeader } from "@/components/site/Section";
import { CTA } from "@/components/site/CTA";
import { FinalCTA } from "@/components/site/FinalCTA";
import { breadcrumbSchema, seo } from "@/lib/seo";
import { PORTFOLIO_CTA_LABEL } from "@/lib/portfolio-data";
import { typeset } from "@/lib/typeset";

const PATH = "/about";

export const Route = createFileRoute("/about")({
  head: () =>
    seo({
      title:
        "About SilverScape Solutions — Guelph-Based Outdoor & Interior Contractor",
      description:
        "SilverScape Solutions is a Guelph-based team delivering outdoor transformations, interior renovations and Kentucky Bluegrass sod delivery across Southern Ontario.",
      path: PATH,
      jsonLd: [
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: PATH },
        ]),
      ],
    }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About SilverScape"
        title={
          <>
            One team. Three divisions.{" "}
            <span className="accent-serif">One standard.</span>
          </>
        }
        description="SilverScape Solutions is based in Guelph, Ontario. We transform properties inside and out — and we'd rather tell you what a project really takes than what you want to hear."
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "About", path: PATH },
        ]}
      >
        <CTA
          to="/contact"
          size="lg"
          track="request_quote_click"
          trackLabel="about_hero"
        >
          Request a Quote
        </CTA>
      </PageHero>

      <Section tone="paper" labelledBy="why-we-exist">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeader
              id="why-we-exist"
              eyebrow="Our approach"
              title="Built around the parts most contractors rush."
              description="Too many residential projects go wrong for the same reasons: vague scope, work done in the wrong order, and preparation skipped where no one will see it. Our process is designed to prevent all three."
            />
            <ul className="mt-8 grid gap-5">
              {[
                {
                  t: "Planned before it's priced",
                  d: "Every quote starts with a site walk and ends with a written, itemized proposal.",
                },
                {
                  t: "Sequenced properly",
                  d: "Grading before hardscape. Waterproofing before tile. The order of work protects the finish.",
                },
                {
                  t: "One point of contact",
                  d: "Outdoor or interior, you deal with one team that is accountable for the whole result.",
                },
              ].map((b) => (
                <li key={b.t} className="border-l-2 border-bronze/50 pl-5">
                  <h3 className="type-h4">{b.t}</h3>
                  <p className="mt-1 text-muted-light">{b.d}</p>
                </li>
              ))}
            </ul>
          </div>
          <figure className="card-stone p-8 md:p-10">
            <figcaption className="eyebrow">The order of work</figcaption>
            <ol className="mt-6 divide-y divide-forest/10">
              {[
                [
                  "Site walk",
                  "Measure, check grade, access and what's underneath.",
                ],
                ["Written proposal", "Itemized scope, materials and schedule."],
                [
                  "Preparation",
                  "Base, drainage, subfloor or waterproofing first.",
                ],
                ["Build", "Work done in the planned sequence, site kept tidy."],
                ["Walkthrough", "We review the finished work with you."],
              ].map(([t, d], i) => (
                <li key={t} className="flex gap-5 py-4 first:pt-0 last:pb-0">
                  <span
                    aria-hidden
                    className="font-serif text-2xl leading-none text-bronze"
                  >
                    0{i + 1}
                  </span>
                  <span>
                    <span className="block font-semibold">{t}</span>
                    <span className="mt-1 block text-[0.9375rem] text-muted-light">
                      {d}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </figure>
        </div>
      </Section>

      <Section tone="ink" labelledBy="divisions">
        <SectionHeader
          id="divisions"
          eyebrow="What we do"
          title="Three divisions, one team."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Trees,
              t: "Outdoor Transformations",
              d: "Landscaping, full yard transformations, interlocking, patios, decks, fences, grading, sod and lawn care.",
              to: "/outdoor-services" as const,
            },
            {
              icon: Hammer,
              t: "Interior Renovations",
              d: "Vinyl, laminate and tile flooring, and complete bathroom renovations — showers, tubs, vanities and finishing.",
              to: "/interior-renovations" as const,
            },
            {
              icon: Sprout,
              t: "Sod Ordering & Delivery",
              d: "Fresh Kentucky Bluegrass sod, ordered online with an itemized total and delivered on a real driving route.",
              to: "/sod-ordering" as const,
            },
          ].map((d) => (
            <Link
              key={d.t}
              to={d.to}
              className="group card-dark card-interactive flex flex-col p-7"
            >
              <d.icon aria-hidden className="h-7 w-7 text-gold" />
              <h3 className="type-h3 mt-5">{typeset(d.t)}</h3>
              <p className="mt-3 flex-1 text-muted-dark">{d.d}</p>
              <span className="link-arrow mt-6">
                Learn more <ArrowRight aria-hidden className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section tone="stone" labelledBy="local">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow eyebrow-plain justify-center">Local</p>
          <h2 id="local" className="type-h2 mt-4">
            {typeset("Rooted in Guelph. Working across the region.")}
          </h2>
          <p className="type-lead mx-auto mt-5 measure text-muted-light">
            We're based in Guelph and work across Kitchener, Waterloo, Cambridge
            and the Greater Toronto Area. We know the soils, the winters and the
            bylaws that shape projects here.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <CTA to="/service-areas" variant="forest">
              Our service areas
            </CTA>
            <CTA to="/portfolio" variant="light-outline">
              {PORTFOLIO_CTA_LABEL}
            </CTA>
          </div>
        </div>
      </Section>

      <FinalCTA />
    </>
  );
}
