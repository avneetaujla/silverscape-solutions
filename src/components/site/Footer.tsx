import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/site/Logo";
import { CTA } from "@/components/site/CTA";
import { INTERIOR, OUTDOOR, servicePath } from "@/lib/services-data";
import { PRIMARY_LOCATIONS, GTA_CITIES } from "@/lib/locations-data";
import { BUSINESS } from "@/lib/site";
import { openCookieSettings } from "@/lib/consent";

const linkCls =
  "text-cream/80 hover:text-cream underline-offset-4 hover:underline";
const legalCls =
  "inline-flex min-h-8 items-center text-cream/75 underline-offset-4 hover:text-cream hover:underline";

const LEGAL_LINKS = [
  { to: "/privacy", label: "Privacy Policy" },
  { to: "/terms", label: "Terms & Conditions" },
  { to: "/cookies", label: "Cookie Policy" },
  { to: "/refunds", label: "Refund & Cancellation Policy" },
  { to: "/accessibility", label: "Accessibility" },
] as const;

export function Footer() {
  return (
    <footer className="surface-forest border-t border-cream/10 print:hidden">
      <div className="container-site py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Logo />
            <p className="mt-6 max-w-sm text-cream/80">
              Outdoor transformations, interior renovations and Kentucky
              Bluegrass sod delivery for homes across Guelph,
              Kitchener-Waterloo, Cambridge and the GTA.
            </p>
            <ul className="mt-8 space-y-3 text-[0.9375rem]">
              <li>
                <a
                  href={BUSINESS.phoneHref}
                  className="inline-flex min-h-11 items-center gap-3 text-cream hover:text-gold"
                >
                  <Phone aria-hidden className="h-4 w-4 text-gold" />
                  {BUSINESS.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={BUSINESS.emailHref}
                  className="inline-flex min-h-11 items-center gap-3 break-all text-cream hover:text-gold"
                >
                  <Mail aria-hidden className="h-4 w-4 shrink-0 text-gold" />
                  {BUSINESS.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-cream/80">
                <MapPin aria-hidden className="h-4 w-4 text-gold" />
                Based in Guelph, Ontario
              </li>
            </ul>
            <CTA
              to="/contact"
              className="mt-8"
              track="request_quote_click"
              trackLabel="footer"
            >
              Request a Quote
            </CTA>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
            <FooterColumn title="Outdoor">
              {OUTDOOR.slice(0, 7).map((s) => (
                <li key={s.slug}>
                  <Link to={servicePath(s)} className={linkCls}>
                    {s.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/outdoor-services" className={linkCls}>
                  All outdoor services
                </Link>
              </li>
            </FooterColumn>
            <FooterColumn title="Interior">
              {INTERIOR.map((s) => (
                <li key={s.slug}>
                  <Link to={servicePath(s)} className={linkCls}>
                    {s.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/interior-renovations" className={linkCls}>
                  All interior services
                </Link>
              </li>
            </FooterColumn>
            <FooterColumn title="Service areas">
              {[...PRIMARY_LOCATIONS, ...GTA_CITIES].map((l) => (
                <li key={l.slug}>
                  <Link
                    to="/service-areas/$city"
                    params={{ city: l.slug }}
                    className={linkCls}
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
            </FooterColumn>
            <FooterColumn title="Company">
              <li>
                <Link to="/sod-ordering" className={linkCls}>
                  Order sod
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className={linkCls}>
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/resources" className={linkCls}>
                  Resources
                </Link>
              </li>
              <li>
                <Link to="/about" className={linkCls}>
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className={linkCls}>
                  Contact
                </Link>
              </li>
            </FooterColumn>
          </div>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="container-site flex flex-col gap-3 py-6 text-sm text-cream/70 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          <p>
            © {new Date().getFullYear()} SilverScape Solutions. All rights
            reserved.
          </p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-5 gap-y-1">
              {LEGAL_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className={legalCls}>
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={openCookieSettings}
                  className={legalCls}
                >
                  Cookie Settings
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-gold font-sans">
        {title}
      </h2>
      <ul className="mt-5 space-y-2.5 text-[0.9375rem]">{children}</ul>
    </div>
  );
}
