import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../../styles.css?url";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CTA } from "@/components/site/CTA";
import { useAnalytics } from "@/components/site/Analytics";
import { ConsentManager } from "@/components/site/ConsentManager";
import { buttonVariants } from "@/components/ui/button";
import { localBusinessSchema } from "@/lib/seo";
import { BUSINESS } from "@/lib/site";

function NotFoundComponent() {
  return (
    <section className="surface-ink flex min-h-[80svh] items-center pt-[var(--header-h)]">
      <div className="container-site py-20 text-center">
        <p className="eyebrow eyebrow-plain">Page not found</p>
        <h1 className="type-h1 mx-auto mt-4 max-w-2xl">
          We couldn't find that page.
        </h1>
        <p className="type-lead mx-auto mt-5 measure text-cream/80">
          It may have moved. Try one of these instead, or call us at{" "}
          {BUSINESS.phoneDisplay}.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <CTA to="/">Back to home</CTA>
          <CTA to="/outdoor-services" variant="outline">
            Outdoor services
          </CTA>
          <CTA to="/interior-renovations" variant="outline">
            Interior renovations
          </CTA>
          <CTA to="/sod-ordering" variant="outline">
            Order sod
          </CTA>
        </div>
      </div>
    </section>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <section className="surface-ink flex min-h-[80svh] items-center pt-[var(--header-h)]">
      <div className="container-site py-20 text-center">
        <h1 className="type-h2">Something went wrong.</h1>
        <p className="mx-auto mt-4 measure text-cream/80">
          Please try again. If the problem continues, call us at{" "}
          {BUSINESS.phoneDisplay}.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className={buttonVariants({ variant: "default" })}
          >
            Try again
          </button>
          <a href="/" className={buttonVariants({ variant: "outline" })}>
            Home
          </a>
        </div>
      </div>
    </section>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    head: () => ({
      meta: [
        { charSet: "utf-8" },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1, viewport-fit=cover",
        },
        { name: "theme-color", content: "#0f1a14" },
        {
          title:
            "SilverScape Solutions — Property Transformations in Southern Ontario",
        },
        {
          name: "description",
          content:
            "Outdoor transformations, interior renovations and Kentucky Bluegrass sod delivery for homes in Guelph, Kitchener, Waterloo, Cambridge and the GTA.",
        },
        { name: "format-detection", content: "telephone=no" },
      ],
      links: [
        { rel: "stylesheet", href: appCss },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(localBusinessSchema()).replace(
            /</g,
            "\\u003c",
          ),
        },
      ],
    }),
    shellComponent: RootShell,
    component: RootComponent,
    notFoundComponent: NotFoundComponent,
    errorComponent: ErrorComponent,
  },
);

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  useAnalytics();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col bg-ink">
        <Header />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          <Outlet />
        </main>
        <Footer />
      </div>
      <ConsentManager />
    </QueryClientProvider>
  );
}
