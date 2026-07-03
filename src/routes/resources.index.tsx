import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ARTICLES } from "@/lib/articles-data";
import heroImg from "@/assets/proj-bathroom.jpg";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHeader } from "@/components/site/Section";

export const Route = createFileRoute("/resources/")({
  head: () => ({
    meta: [
      { title: "Resources & Guides — SilverScape Solutions" },
      {
        name: "description",
        content:
          "Cost guides, planning articles and contractor advice for outdoor and interior renovations.",
      },
    ],
  }),
  component: ResourcesPage,
});

function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title={
          <>
            Plan smarter <em className="italic text-gold">before you build</em>.
          </>
        }
        description="Cost guides, comparisons and contractor advice — written for Southern Ontario homeowners."
        image={heroImg}
        height="short"
      />
      <Section variant="dark">
        <SectionHeader eyebrow="Articles" title="Latest guides." />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ARTICLES.map((a) => (
            <Link
              key={a.slug}
              to="/resources/$slug"
              params={{ slug: a.slug }}
              className="group premium-card premium-card-interactive block"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={a.image}
                  alt={a.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-7">
                <div className="premium-kicker text-gold">
                  {a.category} · {a.readTime}
                </div>
                <h3 className="mt-3 font-serif text-xl text-cream group-hover:text-gold transition-colors">
                  {a.title}
                </h3>
                <p className="mt-2 text-sm text-cream/65">{a.excerpt}</p>
                <div className="premium-link mt-5">
                  Read article <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
