import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHeader } from "@/components/site/Section";
import { CTA } from "@/components/site/CTA";
import { ServiceCard, ArticleCard } from "@/components/site/Cards";
import { ProjectCard } from "@/components/site/ProjectCard";
import { LeadForm } from "@/components/site/LeadForm";
import { FinalCTA } from "@/components/site/FinalCTA";
import type { SiteImage } from "@/content/mediaCatalog";
import type { Division, ServiceDetail } from "@/lib/services-data";
import { PORTFOLIO, PORTFOLIO_CTA_LABEL } from "@/lib/portfolio-data";
import { ARTICLES } from "@/lib/articles-data";
import { typeset } from "@/lib/typeset";

export function DivisionHub({
  division,
  image,
  eyebrow,
  title,
  description,
  services,
  approach,
  articleSlugs,
  path,
  crumb,
}: {
  division: Division;
  image: SiteImage;
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  services: ServiceDetail[];
  approach: { t: string; d: string }[];
  articleSlugs: string[];
  path: string;
  crumb: string;
}) {
  const warm = division === "interior";
  const projects = PORTFOLIO.filter(
    (p) => p.division === division && !p.isPlaceholder,
  ).slice(0, 3);
  const articles = articleSlugs
    .map((s) => ARTICLES.find((a) => a.slug === s))
    .filter((a): a is (typeof ARTICLES)[number] => Boolean(a));

  return (
    <>
      <PageHero
        image={image}
        eyebrow={eyebrow}
        title={title}
        description={description}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: crumb, path },
        ]}
      >
        <CTA
          to="/contact"
          search={{ division }}
          size="lg"
          track="request_quote_click"
          trackLabel={`${division}_hub_hero`}
        >
          Request a Quote
        </CTA>
        <CTA to="/portfolio" variant="outline" size="lg">
          {PORTFOLIO_CTA_LABEL}
        </CTA>
      </PageHero>

      <Section tone={warm ? "paper" : "ink"} labelledBy="services">
        <SectionHeader
          id="services"
          eyebrow="Services"
          title={
            warm
              ? "Every room, finished properly."
              : "Every part of the property, planned together."
          }
          description={
            warm
              ? "Choose a single upgrade or combine them into one renovation — the planning and finish standard is the same."
              : "Take on one project or the whole yard. Either way, it is planned with the rest of the property in mind."
          }
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard
              key={s.slug}
              service={s}
              tone={warm ? "light" : "dark"}
            />
          ))}
        </div>
      </Section>

      <Section tone={warm ? "stone" : "forest"} labelledBy="approach">
        <SectionHeader
          id="approach"
          eyebrow="Our approach"
          title="How we work differently."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {approach.map((a, i) => (
            <div key={a.t} className="border-t border-current/15 pt-6">
              <span
                aria-hidden
                className="font-serif text-3xl text-gold [.on-light_&]:text-bronze"
              >
                0{i + 1}
              </span>
              <h3 className="type-h4 mt-3">{a.t}</h3>
              <p className="mt-2 text-muted-dark [.on-light_&]:text-muted-light">
                {a.d}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {projects.length > 0 && (
        <Section tone="ink" labelledBy="work">
          <SectionHeader
            id="work"
            eyebrow="Portfolio"
            title={warm ? "Interior work" : "Outdoor work"}
            action={
              <Link to="/portfolio" className="link-arrow">
                Full portfolio <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
            }
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {projects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </Section>
      )}

      <Section tone="forest" id="quote" labelledBy="hub-quote">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="eyebrow">Request a quote</p>
            <h2 id="hub-quote" className="type-h2 mt-4">
              {typeset(
                warm
                  ? "Planning a renovation?"
                  : "Planning an outdoor project?",
              )}
            </h2>
            <p className="type-lead mt-5 measure text-muted-dark">
              Tell us what you have in mind. We'll follow up to arrange a site
              walk and a written, itemized proposal.
            </p>
          </div>
          <div className="card-dark p-6 sm:p-8">
            <LeadForm defaultDivision={division} />
          </div>
        </div>
      </Section>

      {articles.length > 0 && (
        <Section tone={warm ? "paper" : "cream"} labelledBy="guides">
          <SectionHeader
            id="guides"
            eyebrow="Planning guides"
            title="Read before you renovate."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {articles.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </Section>
      )}

      <FinalCTA showSod={!warm} />
    </>
  );
}
