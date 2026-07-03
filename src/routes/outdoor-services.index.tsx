import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { OUTDOOR } from "@/lib/services-data";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHeader } from "@/components/site/Section";
import { CTA } from "@/components/site/CTA";
import heroImg from "@/assets/hero-outdoor.jpg";

export const Route = createFileRoute("/outdoor-services/")({
  head: () => ({
    meta: [
      { title: "Outdoor Services — Landscaping, Decks, Fences | SilverScape" },
      {
        name: "description",
        content:
          "Premium landscaping, decks, fences, interlocking, sod and lawn maintenance across Southern Ontario.",
      },
    ],
  }),
  component: OutdoorOverview,
});

function OutdoorOverview() {
  return (
    <>
      <PageHero
        eyebrow="Division 01 · Outdoor Transformations"
        title={
          <>
            Outdoor spaces designed to be{" "}
            <em className="italic text-gold">lived in</em>.
          </>
        }
        description="Landscape design, decks, fences, interlocking and outdoor living — built for the way you actually want to use your property."
        image={heroImg}
      >
        <CTA to="/contact">Start Your Project</CTA>
        <CTA to="/portfolio" variant="outline">
          See Recent Work
        </CTA>
      </PageHero>

      <Section variant="dark">
        <SectionHeader
          eyebrow="Outdoor Division"
          title={
            <>
              Six specialties,{" "}
              <em className="italic text-gold">one organized team</em>.
            </>
          }
          description="Every outdoor service is delivered by the same project manager and the same standard — so a complete backyard transformation feels as composed as a single deck build."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {OUTDOOR.map((s) => (
            <Link
              key={s.slug}
              to="/outdoor-services/$service"
              params={{ service: s.slug }}
              className="group premium-card premium-card-interactive block"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={s.hero}
                  alt={s.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-7">
                <h3 className="font-serif text-2xl text-cream group-hover:text-gold transition-colors">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-cream/65">{s.short}</p>
                <div className="premium-link mt-5">
                  Explore <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
