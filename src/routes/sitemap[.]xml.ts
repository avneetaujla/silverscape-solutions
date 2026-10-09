import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/lib/site";
import { ALL_SERVICES, servicePath } from "@/lib/services-data";
import { LOCATIONS } from "@/lib/locations-data";
import { ARTICLES } from "@/lib/articles-data";

const STATIC_PATHS = [
  "/",
  "/outdoor-services",
  "/interior-renovations",
  "/sod-ordering",
  "/portfolio",
  "/service-areas",
  "/resources",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/cookies",
  "/refunds",
  "/accessibility",
];

function escapeXml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const base = SITE_URL || new URL(request.url).origin;
        const entries: { path: string; lastmod?: string }[] = [
          ...STATIC_PATHS.map((path) => ({ path })),
          ...ALL_SERVICES.map((s) => ({ path: servicePath(s) })),
          ...LOCATIONS.map((l) => ({ path: `/service-areas/${l.slug}` })),
          ...ARTICLES.map((a) => ({
            path: `/resources/${a.slug}`,
            lastmod: a.updated,
          })),
        ];
        const body = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          ...entries.map(
            (e) =>
              `  <url><loc>${escapeXml(base + (e.path === "/" ? "/" : e.path))}</loc>${
                e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : ""
              }</url>`,
          ),
          "</urlset>",
        ].join("\n");
        return new Response(body, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
