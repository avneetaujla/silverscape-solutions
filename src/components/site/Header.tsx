import { Link, useRouterState } from "@tanstack/react-router";
import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Logo } from "@/components/site/Logo";
import { CTA } from "@/components/site/CTA";
import { BUSINESS } from "@/lib/site";
import { cn } from "@/lib/utils";

export const NAV = [
  { to: "/outdoor-services", label: "Outdoor" },
  { to: "/interior-renovations", label: "Interior" },
  { to: "/sod-ordering", label: "Order Sod" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/service-areas", label: "Service Areas" },
  { to: "/resources", label: "Resources" },
  { to: "/about", label: "About" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300",
        scrolled || open
          ? "border-b border-cream/10 bg-ink/95 shadow-[0_10px_30px_-20px_oklch(0_0_0/0.8)] backdrop-blur-md"
          : "border-b border-transparent bg-gradient-to-b from-ink/70 to-transparent",
      )}
    >
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="container-site flex h-[var(--header-h)] items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Primary" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="relative inline-flex min-h-11 items-center rounded-md px-3 text-[0.9375rem] font-medium text-cream/85 transition-colors hover:text-cream"
                  activeProps={{
                    "aria-current": "page",
                    className:
                      "!text-cream after:absolute after:inset-x-3 after:bottom-1.5 after:h-px after:bg-gold",
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 xl:flex">
          <a
            href={BUSINESS.phoneHref}
            className="inline-flex min-h-11 items-center gap-2 rounded-md px-3 text-[0.9375rem] font-medium text-cream/90 hover:text-cream"
            aria-label={`Call ${BUSINESS.phoneDisplay}`}
          >
            <Phone aria-hidden className="h-4 w-4 text-gold" />
            <span className="hidden 2xl:inline">{BUSINESS.phoneDisplay}</span>
          </a>
          <CTA
            to="/contact"
            size="sm"
            track="request_quote_click"
            trackLabel="header"
          >
            Request a Quote
          </CTA>
        </div>

        <div className="flex items-center gap-1 xl:hidden">
          <a
            href={BUSINESS.phoneHref}
            className="grid h-11 w-11 place-items-center rounded-md text-cream hover:bg-cream/[0.06]"
            aria-label={`Call ${BUSINESS.phoneDisplay}`}
          >
            <Phone aria-hidden className="h-5 w-5" />
          </a>
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger
              className="grid h-11 w-11 place-items-center rounded-md text-cream hover:bg-cream/[0.06]"
              aria-label="Open menu"
            >
              <Menu aria-hidden className="h-6 w-6" />
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-[60] bg-ink/70 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
              <Dialog.Content
                className="fixed inset-y-0 right-0 z-[61] flex w-full max-w-md flex-col overflow-y-auto bg-forest-deep text-cream shadow-2xl data-[state=open]:animate-in data-[state=open]:slide-in-from-right-8 data-[state=open]:fade-in-0"
                aria-describedby={undefined}
              >
                <div className="flex h-[var(--header-h)] items-center justify-between px-5">
                  <Dialog.Title className="sr-only">Site menu</Dialog.Title>
                  <Logo onClick={() => setOpen(false)} />
                  <Dialog.Close
                    className="grid h-11 w-11 place-items-center rounded-md hover:bg-cream/[0.06]"
                    aria-label="Close menu"
                  >
                    <X aria-hidden className="h-6 w-6" />
                  </Dialog.Close>
                </div>
                <nav aria-label="Mobile" className="flex-1 px-5 pb-8 pt-4">
                  <ul className="divide-y divide-cream/10 border-y border-cream/10">
                    {[
                      ...NAV,
                      { to: "/contact", label: "Contact" } as const,
                    ].map((item) => (
                      <li key={item.to}>
                        <Link
                          to={item.to}
                          onClick={() => setOpen(false)}
                          className="flex min-h-14 items-center font-serif text-2xl text-cream/90 hover:text-cream"
                          activeProps={{
                            "aria-current": "page",
                            className: "!text-gold",
                          }}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 grid gap-3">
                    <CTA
                      to="/contact"
                      size="lg"
                      onClick={() => setOpen(false)}
                      track="request_quote_click"
                      trackLabel="mobile_menu"
                    >
                      Request a Quote
                    </CTA>
                    <CTA
                      href={BUSINESS.phoneHref}
                      variant="outline"
                      size="lg"
                      icon={<Phone aria-hidden />}
                    >
                      {BUSINESS.phoneDisplay}
                    </CTA>
                  </div>
                </nav>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
