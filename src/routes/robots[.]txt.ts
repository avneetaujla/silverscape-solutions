import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/lib/site";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const base = SITE_URL || new URL(request.url).origin;
        const isProduction =
          !process.env.CONTEXT || process.env.CONTEXT === "production";
        const body = isProduction
          ? [
              "User-agent: *",
              "Allow: /",
              "Disallow: /sod-ordering/confirmation",
              "",
              `Sitemap: ${base}/sitemap.xml`,
              "",
            ].join("\n")
          : ["User-agent: *", "Disallow: /", ""].join("\n");
        return new Response(body, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
