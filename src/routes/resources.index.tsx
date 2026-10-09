import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { ArticleCard } from "@/components/site/Cards";
import { FinalCTA } from "@/components/site/FinalCTA";
import { ARTICLES, type Article } from "@/lib/articles-data";
import { breadcrumbSchema, seo } from "@/lib/seo";

const PATH = "/resources";
const CATEGORIES: Article["category"][] = [
  "Outdoor Planning",
  "Sod & Lawn",
  "Interior Planning",
  "Hiring & Process",
];

export const Route = createFileRoute("/resources/")({
  head: () =>
    seo({
      title:
        "Resources — Planning Guides for Landscaping, Sod & Renovations | SilverScape",
      description:
        "Practical planning guides for Ontario homeowners: landscaping costs, how much sod to order, deck vs patio, interlocking, vinyl vs laminate, bathroom renovations and hiring a contractor.",
      path: PATH,
      jsonLd: [
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Resources", path: PATH },
        ]),
      ],
    }),
  component: ResourcesPage,
});

function ResourcesPage() {
  return (
    <>
      <PageHero
        size="compact"
        eyebrow="Resources"
        title={
          <>
            Plan with <span className="accent-serif">better information.</span>
          </>
        }
        description="Straightforward guides on costs, materials, timelines and Ontario conditions — written to help you make good decisions before you hire anyone."
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Resources", path: PATH },
        ]}
      />
      <Section tone="paper" labelledBy="guides-heading">
        <h2 id="guides-heading" className="sr-only">
          All guides
        </h2>
        <nav
          aria-label="Guide categories"
          className="flex flex-wrap gap-x-6 gap-y-2 border-b border-forest-deep/10 pb-6"
        >
          {CATEGORIES.map((c) => (
            <a
              key={c}
              href={`#${slugify(c)}`}
              className="link-inline min-h-11 inline-flex items-center text-[0.9375rem]"
            >
              {c}
            </a>
          ))}
        </nav>
        {CATEGORIES.map((c) => {
          const items = ARTICLES.filter((a) => a.category === c);
          if (!items.length) return null;
          return (
            <section
              key={c}
              aria-labelledby={slugify(c)}
              className="mt-14 first-of-type:mt-12"
            >
              <h3 id={slugify(c)} className="type-h3">
                {c}
              </h3>
              <div className="mt-7 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {items.map((a) => (
                  <ArticleCard key={a.slug} article={a} />
                ))}
              </div>
            </section>
          );
        })}
      </Section>
      <FinalCTA />
    </>
  );
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
