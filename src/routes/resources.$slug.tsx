import {
  createFileRoute,
  Link,
  notFound,
  redirect,
} from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Section } from "@/components/site/Section";
import { CTA } from "@/components/site/CTA";
import { ArticleCard } from "@/components/site/Cards";
import { FinalCTA } from "@/components/site/FinalCTA";
import type { Article } from "@/lib/articles-data";
import { articleSchema, breadcrumbSchema, seo } from "@/lib/seo";
import { typeset } from "@/lib/typeset";

function crumbs(a: Article) {
  return [
    { name: "Home", path: "/" },
    { name: "Resources", path: "/resources" },
    { name: a.title, path: `/resources/${a.slug}` },
  ];
}

const dateFmt = new Intl.DateTimeFormat("en-CA", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

export const Route = createFileRoute("/resources/$slug")({
  loader: async ({ params }) => {
    const { ARTICLE_REDIRECTS, ARTICLES, findArticle } =
      await import("@/lib/articles-data");
    const target = ARTICLE_REDIRECTS[params.slug];
    if (target)
      throw redirect({
        to: "/resources/$slug",
        params: { slug: target },
        statusCode: 301,
      });
    const article = findArticle(params.slug);
    if (!article) throw notFound();
    const sameCategory = ARTICLES.filter(
      (x) => x.slug !== article.slug && x.category === article.category,
    ).slice(0, 3);
    const more =
      sameCategory.length >= 2
        ? sameCategory
        : ARTICLES.filter((x) => x.slug !== article.slug).slice(0, 3);
    return { article, more };
  },
  head: ({ loaderData }) => {
    const a = loaderData?.article;
    if (!a) return {};
    const path = `/resources/${a.slug}`;
    return seo({
      title: `${a.title} | SilverScape Resources`,
      description: a.metaDescription,
      path,
      type: "article",
      jsonLd: [
        articleSchema({
          title: a.title,
          description: a.metaDescription,
          path,
          datePublished: a.published,
          dateModified: a.updated,
        }),
        breadcrumbSchema(crumbs(a)),
      ],
    });
  },
  component: ArticlePage,
});

function ArticlePage() {
  const { article: a, more } = Route.useLoaderData();

  return (
    <>
      <header className="surface-contour pb-14 pt-[calc(var(--header-h)+3rem)] md:pb-16">
        <div className="container-site">
          <div className="mx-auto max-w-3xl">
            <Breadcrumbs items={crumbs(a)} />
            <p className="eyebrow mt-8">
              {a.category} · {a.readMinutes} min read
            </p>
            <h1 className="type-h1 mt-4 text-cream lg:-mr-28">
              {typeset(a.title)}
            </h1>
            <p className="type-lead mt-5 text-cream/85">{a.excerpt}</p>
            <p className="mt-6 text-sm text-cream/70">
              Updated{" "}
              <time dateTime={a.updated}>
                {dateFmt.format(new Date(a.updated))}
              </time>{" "}
              · SilverScape Solutions
            </p>
          </div>
        </div>
      </header>

      <Section tone="paper" size="sm">
        <div className="mx-auto max-w-3xl">
          <article className="prose-article">
            {a.body.map((b, i) => {
              if (b.type === "h2") return <h2 key={i}>{b.text}</h2>;
              if (b.type === "list")
                return (
                  <ul key={i}>
                    {b.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                );
              return <p key={i}>{b.text}</p>;
            })}
          </article>

          {a.services.length > 0 && (
            <aside
              aria-labelledby="related-services"
              className="card-stone mt-14 p-7 md:p-8"
            >
              <h2 id="related-services" className="type-h4">
                Related services
              </h2>
              <ul className="mt-4 grid gap-1 sm:grid-cols-2">
                {a.services.map((s) => (
                  <li key={s.to}>
                    <Link to={s.to as never} className="link-arrow min-h-11">
                      {s.label} <ArrowRight aria-hidden className="h-4 w-4" />
                    </Link>
                  </li>
                ))}
              </ul>
              <CTA
                to="/contact"
                variant="forest"
                className="mt-6"
                track="request_quote_click"
                trackLabel={`article_${a.slug}`}
              >
                Request a Quote
              </CTA>
            </aside>
          )}
        </div>
      </Section>

      <Section tone="cream" labelledBy="more-guides">
        <h2 id="more-guides" className="type-h2">
          Keep reading
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {more.map((x) => (
            <ArticleCard key={x.slug} article={x} />
          ))}
        </div>
      </Section>

      <FinalCTA />
    </>
  );
}
