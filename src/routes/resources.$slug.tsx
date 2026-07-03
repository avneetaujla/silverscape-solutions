import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ARTICLES, type Article } from "@/lib/articles-data";
import { Section } from "@/components/site/Section";
import { CTA } from "@/components/site/CTA";

export const Route = createFileRoute("/resources/$slug")({
  head: ({ params }) => {
    const a = ARTICLES.find((x) => x.slug === params.slug);
    return {
      meta: [
        { title: `${a?.title ?? "Article"} — SilverScape` },
        { name: "description", content: a?.excerpt ?? "" },
      ],
    };
  },
  loader: ({ params }) => {
    const a = ARTICLES.find((x) => x.slug === params.slug);
    if (!a) throw notFound();
    return { article: a };
  },
  component: ArticlePage,
  errorComponent: ({ error }) => (
    <div className="p-20 text-center text-cream">{error.message}</div>
  ),
  notFoundComponent: () => (
    <div className="p-20 text-center text-cream">Article not found</div>
  ),
});

function ArticlePage() {
  const { article } = Route.useLoaderData() as { article: Article };
  const related = ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        <img
          src={article.image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute inset-0 bg-forest-deep/50" />
        <div className="relative section-shell max-w-[1000px] pt-40 pb-16">
          <Link to="/resources" className="premium-link">
            <ArrowLeft className="h-4 w-4" /> All Resources
          </Link>
          <div className="eyebrow mt-6">
            {article.category} · {article.readTime}
          </div>
          <h1 className="mt-3 font-serif text-4xl md:text-5xl lg:text-6xl text-cream leading-[1.05]">
            {article.title}
          </h1>
          <p className="mt-6 text-lg text-cream/80 max-w-2xl">
            {article.excerpt}
          </p>
        </div>
      </section>

      <Section variant="dark">
        <article className="max-w-3xl mx-auto">
          {article.body.map((b, i) =>
            b.h ? (
              <h2
                key={i}
                className="font-serif text-3xl text-cream mt-12 first:mt-0"
              >
                {b.h}
              </h2>
            ) : (
              <p key={i} className="mt-5 text-cream/80 text-lg leading-relaxed">
                {b.p}
              </p>
            ),
          )}

          <div className="mt-16 glass-card p-8 md:p-9 text-center">
            <div className="eyebrow">Need a quote?</div>
            <h3 className="mt-2 font-serif text-3xl text-cream">
              Let's plan your project together.
            </h3>
            <p className="mt-3 text-cream/70 max-w-md mx-auto">
              Written quotes within one business day.
            </p>
            <div className="mt-6 flex justify-center gap-3 flex-wrap">
              <CTA to="/contact">Request a Quote</CTA>
              <CTA to="/sod-ordering" variant="outline">
                Order Sod
              </CTA>
            </div>
          </div>
        </article>
      </Section>

      <Section variant="deep">
        <div className="text-center">
          <div className="eyebrow">Continue Reading</div>
          <h3 className="mt-3 font-serif text-3xl md:text-4xl text-cream">
            Related articles
          </h3>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {related.map((a) => (
            <Link
              key={a.slug}
              to="/resources/$slug"
              params={{ slug: a.slug }}
              className="group glass-card premium-card-interactive p-6"
            >
              <div className="premium-kicker text-gold">{a.category}</div>
              <div className="mt-2 font-serif text-xl text-cream group-hover:text-gold">
                {a.title}
              </div>
              <div className="mt-5 inline-flex items-center gap-1 text-xs tracking-[0.22em] uppercase text-cream/55">
                Read <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
