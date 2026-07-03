import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { INTERIOR } from "@/lib/services-data";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHeader } from "@/components/site/Section";
import { CTA } from "@/components/site/CTA";
import heroImg from "@/assets/hero-interior.jpg";

export const Route = createFileRoute("/interior-renovations/")({
  head: () => ({
    meta: [
      {
        title: "Interior Renovations — Flooring, Tile, Bathrooms | SilverScape",
      },
      {
        name: "description",
        content:
          "Flooring, tile and full bathroom renovations across Southern Ontario.",
      },
    ],
  }),
  component: InteriorOverview,
});

function InteriorOverview() {
  return (
    <>
      <PageHero
        eyebrow="Division 02 · Interior Renovations"
        title={
          <>
            Interiors that feel <em className="italic text-gold">composed</em>.
          </>
        }
        description="Flooring, tile and complete bathroom renovations — project-managed by trades who treat your home like it's their own."
        image={heroImg}
      >
        <CTA to="/contact">Start Your Project</CTA>
        <CTA to="/portfolio" variant="outline">
          See Renovations
        </CTA>
      </PageHero>

      <Section variant="dark">
        <SectionHeader
          eyebrow="Interior Division"
          title={
            <>
              Renovations{" "}
              <em className="italic text-gold">finished properly</em>.
            </>
          }
          description="Coordinated trades, premium materials, daily cleanup, and the kind of finish detail you can run your hand along — not just look at."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {INTERIOR.map((s) => (
            <Link
              key={s.slug}
              to="/interior-renovations/$service"
              params={{ service: s.slug }}
              className="group premium-card premium-card-interactive block"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={s.hero}
                  alt={s.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-7 md:p-8">
                <h3 className="font-serif text-2xl text-cream group-hover:text-gold transition-colors">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-cream/70">{s.short}</p>
                <div className="premium-link mt-5">
                  Explore <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section variant="light">
        <SectionHeader
          variant="light"
          eyebrow="Why Interior With Us"
          title={
            <>
              Renovations that <em className="italic">finish well</em>.
            </>
          }
          description="Coordinated trades, daily cleanup, and finish detail you can run your hand along — not just look at."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              t: "One project manager",
              d: "Single point of contact across plumbing, electrical, tile and finishing.",
            },
            {
              t: "Premium materials",
              d: "We spec materials that hold up — and brought to you for selection.",
            },
            {
              t: "Clean job sites",
              d: "Dust control, daily cleanup, and respect for the home around the job.",
            },
          ].map((b, i) => (
            <div key={i} className="glass-card-light p-7 md:p-8">
              <div className="font-serif text-xl text-forest-deep">{b.t}</div>
              <p className="mt-2 text-sm text-forest/70">{b.d}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
