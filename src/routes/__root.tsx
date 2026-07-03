import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../../styles.css?url";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { buttonVariants } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-forest-deep px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-8xl text-gold">404</h1>
        <h2 className="mt-4 font-serif text-2xl text-cream">Page not found</h2>
        <p className="mt-3 text-sm text-cream/60">
          The page you're looking for has moved or doesn't exist.
        </p>
        <Link
          to="/"
          className={cn(buttonVariants({ variant: "outline" }), "mt-8")}
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-forest-deep px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-3xl text-cream">Something went wrong</h1>
        <p className="mt-3 text-sm text-cream/60">
          Please try again or return home.
        </p>
        <div className="mt-8 flex gap-3 justify-center">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className={buttonVariants({ variant: "default" })}
          >
            Retry
          </button>
          <a href="/" className={buttonVariants({ variant: "outline" })}>
            Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    head: () => ({
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          title:
            "SilverScape Solutions — Premium Outdoor & Interior Renovations | Southern Ontario",
        },
        {
          name: "description",
          content:
            "Luxury landscaping, decks, fences, interlocking, sod and interior renovations across Guelph, Kitchener, Waterloo and the GTA.",
        },
        { name: "author", content: "SilverScape Solutions" },
        { property: "og:title", content: "SilverScape Solutions" },
        {
          property: "og:description",
          content:
            "Premium outdoor and interior upgrades that make your property feel finished.",
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "stylesheet", href: appCss }],
    }),
    shellComponent: RootShell,
    component: RootComponent,
    notFoundComponent: NotFoundComponent,
    errorComponent: ErrorComponent,
  },
);

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
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
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <Toaster theme="dark" position="top-center" />
      </div>
    </QueryClientProvider>
  );
}
