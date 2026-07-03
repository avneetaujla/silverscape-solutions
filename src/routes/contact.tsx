import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import heroImg from "@/assets/proj-landscape.jpg";
import { PageHero } from "@/components/site/PageHero";
import { CTA } from "@/components/site/CTA";
import { Section, SectionHeader } from "@/components/site/Section";
import { LeadForm } from "@/components/site/LeadForm";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact SilverScape Solutions — Request a Quote" },
      {
        name: "description",
        content:
          "Request a quote for outdoor or interior renovations in Southern Ontario. (226) 500-4608.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Tell us about your <em className="italic text-gold">property</em>.
          </>
        }
        description="Outdoor, interior or sod — fill out the form, call, or email. We respond within one business day."
        image={heroImg}
        height="short"
      />

      <Section variant="dark">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="space-y-6">
            <SectionHeader eyebrow="Get in touch" title="Talk to our team." />
            <div className="space-y-5 mt-6">
              {[
                {
                  i: Phone,
                  l: "Phone",
                  v: "(226) 500-4608",
                  h: "tel:+12265004608",
                },
                {
                  i: Mail,
                  l: "Email",
                  v: "silverscapesolutions@gmail.com",
                  h: "mailto:silverscapesolutions@gmail.com",
                },
                {
                  i: MapPin,
                  l: "Service Area",
                  v: "Guelph · KW · Cambridge · GTA",
                },
                { i: Clock, l: "Hours", v: "Mon–Sat · 8:00am – 7:00pm" },
              ].map((c, i) => (
                <div key={i} className="glass-card p-6 flex items-start gap-4">
                  <c.i className="h-5 w-5 text-gold mt-0.5 shrink-0" />
                  <div>
                    <div className="premium-kicker text-gold">{c.l}</div>
                    {c.h ? (
                      <a
                        href={c.h}
                        className="text-cream hover:text-gold mt-1 block break-all"
                      >
                        {c.v}
                      </a>
                    ) : (
                      <div className="text-cream mt-1">{c.v}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="glass-card p-6 md:p-7">
              <div className="eyebrow">Sod orders</div>
              <p className="mt-2 text-sm text-cream/70">
                For delivery-only sod orders, use our online portal — instant
                pricing and secure checkout.
              </p>
              <CTA
                to="/sod-ordering"
                variant="outline"
                size="sm"
                className="mt-4"
              >
                Open Sod Portal
              </CTA>
            </div>
          </div>

          <div className="glass-card p-8 md:p-9 lg:col-span-2">
            <LeadForm />
          </div>
        </div>
      </Section>
    </>
  );
}
