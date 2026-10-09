import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHeader } from "@/components/site/Section";
import { CTA } from "@/components/site/CTA";
import { FAQList } from "@/components/site/FAQList";
import { LeadForm } from "@/components/site/LeadForm";
import { ServiceCard } from "@/components/site/Cards";
import {
  ALL_SERVICES,
  serviceImage,
  type Division,
  type ServiceDetail,
} from "@/lib/services-data";
import { ARTICLES } from "@/lib/articles-data";
import { DIVISION_META as DIVISION } from "@/lib/service-head";
import { BUSINESS } from "@/lib/site";
import { cn } from "@/lib/utils";
import { typeset } from "@/lib/typeset";

const STANDARD: Record<
  Division,
  { title: string; points: { t: string; d: string }[] }
> = {
  outdoor: {
    title: "Built for Ontario winters",
    points: [
      {
        t: "Below the frost line",
        d: "Deck footings and fence posts go to frost depth — about 1.2 m here — so frost heave doesn't lift them.",
      },
      {
        t: "A base that drains",
        d: "Compacted granular base and grading that sheds water keep pavers and lawns level through freeze-thaw.",
      },
      {
        t: "Water away from the house",
        d: "Every surface is sloped and every downspout considered before anything is finished on top.",
      },
    ],
  },
  interior: {
    title: "What protects the finish",
    points: [
      {
        t: "Moisture first",
        d: "Waterproofing membranes in wet areas and moisture checks on concrete before flooring goes down.",
      },
      {
        t: "A flat, solid subfloor",
        d: "Levelled and fastened before tile or plank, so floors don't flex, crack or click.",
      },
      {
        t: "Planned transitions",
        d: "Thresholds, trim and grout lines are laid out with the design, not improvised at the end.",
      },
    ],
  },
};

export function ServiceDetailPage({
  service,
  path,
}: {
  service: ServiceDetail;
  path: string;
}) {
  const d = DIVISION[service.division];
  const warm = service.division === "interior";
  const related = service.related
    .map((slug) =>
      ALL_SERVICES.find(
        (s) => s.slug === slug && s.division === service.division,
      ),
    )
    .filter((s): s is ServiceDetail => Boolean(s));
  const articles = service.articles
    .map((slug) => ARTICLES.find((a) => a.slug === slug))
    .filter((a): a is (typeof ARTICLES)[number] => Boolean(a));

  return (
    <>
      <PageHero
        image={serviceImage(service)}
        eyebrow={d.name}
        title={service.title}
        description={service.tagline}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: d.crumb, path: d.hub },
          { name: service.title, path },
        ]}
      >
        <CTA
          to="/contact"
          search={{ division: service.division, service: service.label }}
          size="lg"
          track="request_quote_click"
          trackLabel={`service_hero_${service.slug}`}
        >
          Request a Quote
        </CTA>
        {service.slug === "sod-installation" ? (
          <CTA to="/sod-ordering" variant="outline" size="lg">
            Order sod only
          </CTA>
        ) : (
          <CTA href={BUSINESS.phoneHref} variant="outline" size="lg">
            Call {BUSINESS.phoneDisplay}
          </CTA>
        )}
      </PageHero>

      {/* Overview + outcomes */}
      <Section tone={warm ? "paper" : "ink"} labelledBy="overview">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <p className="eyebrow">Overview</p>
            <h2 id="overview" className="type-h2 mt-4">
              What changes for you.
            </h2>
            {service.intro.map((p) => (
              <p
                key={p}
                className="type-lead mt-5 measure text-muted-dark [.on-light_&]:text-muted-light"
              >
                {p}
              </p>
            ))}
          </div>
          <ul className="grid gap-4 self-start">
            {service.outcomes.map((o) => (
              <li
                key={o.t}
                className={warm ? "card-stone p-6" : "card-dark p-6"}
              >
                <h3 className="type-h4">{o.t}</h3>
                <p className="mt-2 text-muted-dark [.on-light_&]:text-muted-light">
                  {o.d}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Scope */}
      <Section tone={warm ? "stone" : "forest"} labelledBy="scope">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <p className="eyebrow">Scope</p>
            <h2 id="scope" className="type-h2 mt-4">
              What's included.
            </h2>
            <ul className="list-check mt-8 grid gap-3 sm:grid-cols-2">
              {service.scope.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-muted-dark [.on-light_&]:text-muted-light">
              Your written proposal confirms the exact scope, materials and
              exclusions for your property.
            </p>
          </div>
          <aside
            aria-labelledby="standard"
            className={cn(
              "self-start p-7 md:p-9",
              warm ? "card-light" : "card-dark",
            )}
          >
            <h3 id="standard" className="type-h3">
              {typeset(STANDARD[service.division].title)}
            </h3>
            <dl className="mt-6 grid gap-5">
              {STANDARD[service.division].points.map((pt) => (
                <div
                  key={pt.t}
                  className="border-l-2 border-gold/60 pl-5 [.on-light_&]:border-bronze/60"
                >
                  <dt className="font-semibold">{pt.t}</dt>
                  <dd className="mt-1 text-[0.9375rem] text-muted-dark [.on-light_&]:text-muted-light">
                    {pt.d}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </Section>

      {/* Planning */}
      <Section tone={warm ? "paper" : "ink"} labelledBy="planning">
        <SectionHeader
          id="planning"
          eyebrow="Before you start"
          title="Worth knowing up front."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {service.planning.map((p) => (
            <div
              key={p.t}
              className={warm ? "card-light p-7" : "card-dark p-7"}
            >
              <h3 className="type-h4">{p.t}</h3>
              <p className="mt-3 text-muted-dark [.on-light_&]:text-muted-light">
                {p.d}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Process */}
      <Section tone={warm ? "cream" : "forest"} labelledBy="process">
        <SectionHeader
          id="process"
          eyebrow="Process"
          title="How the work unfolds."
        />
        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {service.process.map((step, i) => (
            <li key={step.t} className="border-t border-current/15 pt-6">
              <span
                aria-hidden
                className="font-serif text-3xl text-gold [.on-light_&]:text-bronze"
              >
                0{i + 1}
              </span>
              <h3 className="type-h4 mt-3">{step.t}</h3>
              <p className="mt-2 text-muted-dark [.on-light_&]:text-muted-light">
                {step.d}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* FAQ */}
      <Section tone={warm ? "paper" : "ink"} labelledBy="faq">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <SectionHeader
            id="faq"
            eyebrow="FAQ"
            title={`${service.title}: common questions.`}
          />
          <FAQList items={service.faq} />
        </div>
      </Section>

      {/* Quote */}
      <Section tone="forest" id="quote" labelledBy="quote-heading">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="eyebrow">Request a quote</p>
            <h2 id="quote-heading" className="type-h2 mt-4">
              {typeset("Tell us about your project.")}
            </h2>
            <p className="type-lead mt-5 measure text-muted-dark">
              Share a few details and we'll follow up to arrange a site walk.
              Every quote is written and itemized.
            </p>
          </div>
          <div className="card-dark p-6 sm:p-8">
            <LeadForm
              defaultDivision={service.division}
              defaultService={service.label}
              heading={`${service.title} quote`}
            />
          </div>
        </div>
      </Section>

      {/* Related */}
      <Section tone={warm ? "stone" : "ink"} labelledBy="related">
        <SectionHeader
          id="related"
          eyebrow="Keep exploring"
          title={`More from ${d.name}`}
          action={
            <Link to={d.hub} className="link-arrow">
              View all <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          }
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {related.map((s) => (
            <ServiceCard
              key={s.slug}
              service={s}
              tone={warm ? "light" : "dark"}
              showImage={false}
            />
          ))}
        </div>
        {articles.length > 0 && (
          <div className="mt-14">
            <h3 className="type-h4">Related guides</h3>
            <ul className="mt-4 grid gap-3 md:grid-cols-2">
              {articles.map((a) => (
                <li key={a.slug}>
                  <Link
                    to="/resources/$slug"
                    params={{ slug: a.slug }}
                    className="link-arrow min-h-11"
                  >
                    {a.title} <ArrowRight aria-hidden className="h-4 w-4" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Section>
    </>
  );
}
