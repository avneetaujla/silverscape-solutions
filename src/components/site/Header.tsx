import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { CTA } from "./CTA";

const NAV = [
  { to: "/outdoor-services", label: "Outdoor" },
  { to: "/interior-renovations", label: "Interior" },
  { to: "/sod-ordering", label: "Order Sod" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/resources", label: "Resources" },
  { to: "/service-areas", label: "Service Areas" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="absolute top-0 inset-x-0 z-50">
      <div className="section-shell flex items-center justify-between py-5">
        <Logo />
        <nav className="hidden lg:flex items-center gap-7 text-sm text-cream/85">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="hover:text-gold transition-colors"
              activeProps={{ className: "text-gold" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:+12265004608"
            className="flex items-center gap-2 text-sm text-cream/90 transition-colors hover:text-gold"
          >
            <Phone className="w-4 h-4" /> (226) 500-4608
          </a>
          <CTA to="/contact" variant="outline" size="sm">
            Request a Quote
          </CTA>
        </div>
        <button
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="lg:hidden text-cream transition-colors hover:text-gold"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-forest-deep/98 backdrop-blur-md flex flex-col">
          <div className="section-shell flex items-center justify-between py-5">
            <Logo />
            <button
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="text-cream transition-colors hover:text-gold"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex flex-col gap-6 px-8 mt-8 text-2xl font-serif text-cream">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="transition-colors hover:text-gold"
              >
                {n.label}
              </Link>
            ))}
            <a href="tel:+12265004608" className="mt-6 text-base text-gold">
              (226) 500-4608
            </a>
            <CTA
              to="/contact"
              variant="outline"
              className="mt-2 w-fit"
              onClick={() => setOpen(false)}
            >
              Request a Quote
            </CTA>
          </nav>
        </div>
      )}
    </header>
  );
}
