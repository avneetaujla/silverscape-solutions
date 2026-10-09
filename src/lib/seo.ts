import { BUSINESS, SITE_URL, absoluteUrl } from "@/lib/site";
import { media } from "@/content/mediaCatalog";

type JsonLd = Record<string, unknown>;

export type SeoInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
  jsonLd?: JsonLd[];
};

const DEFAULT_OG_IMAGE = media("backyard-deck-patio").src;

function serializeJsonLd(data: JsonLd): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/** Builds the per-route `head()` payload: title, description, canonical, OG/Twitter, JSON-LD. */
export function seo({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  type = "website",
  noindex = false,
  jsonLd = [],
}: SeoInput) {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  const meta: Array<Record<string, string>> = [
    { title },
    { name: "description", content: description },
    { property: "og:site_name", content: BUSINESS.name },
    { property: "og:locale", content: "en_CA" },
    { property: "og:type", content: type },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: imageUrl },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: imageUrl },
  ];
  if (SITE_URL) meta.push({ property: "og:url", content: url });
  if (noindex) meta.push({ name: "robots", content: "noindex, follow" });

  return {
    meta,
    links: SITE_URL && !noindex ? [{ rel: "canonical", href: url }] : [],
    scripts: jsonLd.map((data) => ({
      type: "application/ld+json",
      children: serializeJsonLd(data),
    })),
  };
}

/** head() for the legal pages: indexable, canonical, with a breadcrumb. */
export function legalSeo(input: {
  title: string;
  description: string;
  path: string;
}) {
  return seo({
    title: `${input.title} | SilverScape Solutions`,
    description: input.description,
    path: input.path,
    jsonLd: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: input.title, path: input.path },
      ]),
    ],
  });
}

const BUSINESS_ID = `${SITE_URL || ""}/#business`;

export const AREA_SERVED = [
  "Guelph",
  "Kitchener",
  "Waterloo",
  "Cambridge",
  "Toronto",
  "Mississauga",
  "Brampton",
].map((name) => ({ "@type": "City", name }));

export function localBusinessSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": BUSINESS_ID,
    name: BUSINESS.name,
    url: SITE_URL || undefined,
    logo: absoluteUrl("/icon-512.png"),
    telephone: BUSINESS.phoneE164,
    email: BUSINESS.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: BUSINESS.baseLocality,
      addressRegion: BUSINESS.region,
      addressCountry: BUSINESS.country,
    },
    areaServed: AREA_SERVED,
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceSchema(input: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
  areaServed?: JsonLd[];
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    serviceType: input.serviceType,
    description: input.description,
    url: absoluteUrl(input.path),
    provider: {
      "@id": BUSINESS_ID,
      "@type": "HomeAndConstructionBusiness",
      name: BUSINESS.name,
    },
    areaServed: input.areaServed ?? AREA_SERVED,
  };
}

export function faqSchema(faqs: { q: string; a: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function articleSchema(input: {
  title: string;
  description: string;
  path: string;
  image?: string;
  datePublished: string;
  dateModified: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    image: input.image ? absoluteUrl(input.image) : undefined,
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    mainEntityOfPage: absoluteUrl(input.path),
    author: { "@type": "Organization", name: BUSINESS.name },
    publisher: {
      "@type": "Organization",
      name: BUSINESS.name,
      logo: { "@type": "ImageObject", url: absoluteUrl("/icon-512.png") },
    },
  };
}
