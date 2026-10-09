import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Sprout } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { CTA } from "@/components/site/CTA";
import { Section } from "@/components/site/Section";
import { LeadForm } from "@/components/site/LeadForm";
import { LEAD_SERVICES } from "@/lib/leads/lead-options";
import { BUSINESS } from "@/lib/site";
import { breadcrumbSchema, seo } from "@/lib/seo";

const PATH = "/contact";

type ContactSearch = { division?: "outdoor" | "interior"; service?: string };

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>): ContactSearch => {
    const division =
      search.division === "outdoor" || search.division === "interior"
        ? search.division
        : undefined;
    const service =
      division &&
      typeof search.service === "string" &&
      (LEAD_SERVICES[division] as readonly string[]).includes(search.service)
        ? search.service
        : undefined;
    return { division, service };
  },
  head: () =>
    seo({
      title: "Contact & Request a Quote | SilverScape Solutions",
      description:
        "Request a quote for an outdoor transformation or interior renovation in Guelph, Kitchener-Waterloo, Cambridge or the GTA. Call (226) 500-4608 or send project details.",
      path: PATH,
      jsonLd: [
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: PATH },
        ]),
      ],
    }),
  component: ContactPage,
});

function ContactPage() {
  const { division, service } = Route.useSearch();
  return (
    <>
      <PageHero
        size="compact"
        eyebrow="Request a quote"
        title={
          <>
            Tell us about your <span className="accent-serif">property.</span>
          </>
        }
        description="Share a few details about the project. We'll follow up to arrange a site walk, then put the plan and price in writing."
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Contact", path: PATH },
        ]}
      />

      <Section tone="ink" labelledBy="contact-options">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-14">
          <div>
            <h2 id="contact-options" className="type-h3">
              Prefer to talk?
            </h2>
            <ul className="mt-6 grid gap-4">
              <li>
                <a
                  href={BUSINESS.phoneHref}
                  className="card-dark card-interactive flex min-h-16 items-center gap-4 p-5"
                >
                  <Phone aria-hidden className="h-5 w-5 shrink-0 text-gold" />
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                      Phone
                    </span>
                    <span className="mt-1 block text-lg text-cream">
                      {BUSINESS.phoneDisplay}
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={BUSINESS.emailHref}
                  className="card-dark card-interactive flex min-h-16 items-center gap-4 p-5"
                >
                  <Mail aria-hidden className="h-5 w-5 shrink-0 text-gold" />
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                      Email
                    </span>
                    <span className="mt-1 block break-all text-cream">
                      {BUSINESS.email}
                    </span>
                  </span>
                </a>
              </li>
              <li className="card-dark flex items-center gap-4 p-5">
                <MapPin aria-hidden className="h-5 w-5 shrink-0 text-gold" />
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                    Based in
                  </span>
                  <span className="mt-1 block text-cream">Guelph, Ontario</span>
                  <span className="mt-1 block text-sm text-muted-dark">
                    Serving Guelph, Kitchener, Waterloo, Cambridge and the GTA
                  </span>
                </span>
              </li>
            </ul>
            <div className="mt-6 rounded-[var(--radius-lg)] border border-gold/25 p-6">
              <p className="flex items-center gap-2 font-semibold text-cream">
                <Sprout aria-hidden className="h-5 w-5 text-gold" /> Just need
                sod?
              </p>
              <p className="mt-2 text-sm text-muted-dark">
                Delivery-only Kentucky Bluegrass orders go through the online
                sod portal, with an itemized total before secure checkout.
              </p>
              <CTA to="/sod-ordering" variant="outline" className="mt-4">
                Order sod online
              </CTA>
            </div>
          </div>
          <div className="card-dark p-6 sm:p-9">
            <LeadForm
              key={`${division ?? ""}:${service ?? ""}`}
              defaultDivision={division}
              defaultService={service}
              heading="Project details"
            />
          </div>
        </div>
      </Section>
    </>
  );
}
