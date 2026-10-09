// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import netlify from "@netlify/vite-plugin-tanstack-start";

// Canonical/OG URLs need an absolute origin. Netlify exposes the production URL as `URL`
// at build time; an explicit VITE_SITE_URL always wins.
if (!process.env.VITE_SITE_URL && process.env.URL) {
  process.env.VITE_SITE_URL = process.env.URL;
}

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
// @cloudflare/vite-plugin builds from this — wrangler.jsonc main alone is insufficient.
export default defineConfig({
  plugins: [netlify()],
  tanstackStart: {
    start: { entry: "../start" },
    router: {
      entry: "../router",
      generatedRouteTree: "../routeTree.gen.ts",
    },
    server: { entry: "../server" },
  },
});
