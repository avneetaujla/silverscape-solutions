import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";
import heroImg from "@/assets/proj-pavers.jpg";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHeader } from "@/components/site/Section";
import { CTA } from "@/components/site/CTA";

export const Route = createFileRoute("/service-areas/")({
  head: () => ({
    meta: [
      { title: "Service Areas — Guelph, KW, GTA | SilverScape Solutions" },
      {
        name: "description",
        content:
          "Outdoor and interior renovations across Guelph, Kitchener, Waterloo, Cambridge and the GTA.",
      },
    ],
  }),
  component: ServiceAreas,
});

const CITIES = [
  { slug: "guelph", name: "Guelph", region: "Wellington" },
  { slug: "kitchener", name: "Kitchener", region: "Waterloo Region" },
  { slug: "waterloo", name: "Waterloo", region: "Waterloo Region" },
  { slug: "cambridge", name: "Cambridge", region: "Waterloo Region" },
  { slug: "gta", name: "Greater Toronto Area", region: "GTA" },
  { slug: "toronto", name: "Toronto", region: "GTA" },
  { slug: "mississauga", name: "Mississauga", region: "GTA" },
  { slug: "brampton", name: "Brampton", region: "GTA" },
];

function ServiceAreas() {
  return (
    <>
      <PageHero
        eyebrow="Service Areas"
        title={
          <>
            Built for Southern{" "}
            <em className="italic text-gold">Ontario homes</em>.
          </>
        }
        description="We serve homeowners across Guelph, Kitchener, Waterloo, Cambridge and the GTA — including Toronto, Mississauga and Brampton."
        image={heroImg}
        height="short"
      >
        <CTA to="/contact">Request a Quote</CTA>
      </PageHero>

      <Section variant="dark">
        <SectionHeader eyebrow="Coverage" title="Where we work." />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CITIES.map((c) => (
            <Link
              key={c.slug}
              to="/service-areas/$city"
              params={{ city: c.slug }}
              className="group glass-card premium-card-interactive p-6"
            >
              <MapPin className="h-5 w-5 text-gold" />
              <div className="mt-3 font-serif text-2xl text-cream group-hover:text-gold">
                {c.name}
              </div>
              <div className="text-xs text-cream/55 mt-1">{c.region}</div>
              <div className="premium-link mt-4">
                View page <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
