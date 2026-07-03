import { createFileRoute } from "@tanstack/react-router";
import {
  ShieldCheck,
  FileText,
  Sparkles,
  MapPin,
  Hammer,
  Trees,
} from "lucide-react";
import heroImg from "@/assets/proj-deck.jpg";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHeader } from "@/components/site/Section";
import { CTA } from "@/components/site/CTA";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About SilverScape Solutions" },
      {
        name: "description",
        content:
          "Premium residential contractor — outdoor and interior — across Southern Ontario.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={
          <>
            One contractor. <em className="italic text-gold">Two divisions.</em>{" "}
            One standard.
          </>
        }
        description="SilverScape Solutions is a premium residential design–build company serving Guelph, Kitchener, Waterloo and the GTA — outdoor improvements and interior renovations under one accountable team."
        image={heroImg}
        height="short"
      >
        <CTA to="/contact">Request a Quote</CTA>
      </PageHero>

      <Section variant="dark">
        <div className="grid items-center gap-12 lg:grid-cols-2 xl:gap-16">
          <div>
            <SectionHeader
              eyebrow="Our Approach"
              title={
                <>
                  Built for properties that{" "}
                  <em className="italic text-gold">deserve better</em>.
                </>
              }
              description="We started SilverScape because too many residential projects end with the same problems — vague pricing, missed timelines, and finishes that don't hold up. We built our team and process to fix all three."
            />
          </div>
          <ul className="space-y-5">
            {[
              {
                i: ShieldCheck,
                t: "Accountability",
                d: "One team, one project manager — outdoor or interior.",
              },
              {
                i: FileText,
                t: "Transparent pricing",
                d: "Written quotes with itemized scope and material specs.",
              },
              {
                i: Sparkles,
                t: "Finish-first execution",
                d: "We deliver the level of finish the photos promised.",
              },
            ].map((b, i) => (
              <li key={i} className="glass-card p-6 md:p-7 flex gap-4">
                <b.i className="h-6 w-6 text-gold shrink-0" />
                <div>
                  <div className="font-serif text-xl text-cream">{b.t}</div>
                  <p className="text-sm text-cream/70 mt-1">{b.d}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section variant="deep">
        <SectionHeader
          eyebrow="By the Numbers"
          title="The work behind the standard."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { v: "850+", l: "Residential projects" },
            { v: "2", l: "Coordinated divisions" },
            { v: "8", l: "Service area cities" },
            { v: "1", l: "Business day response" },
          ].map((s, i) => (
            <div key={i} className="glass-card p-7 md:p-8">
              <div className="font-serif text-5xl text-gold">{s.v}</div>
              <div className="mt-2 text-cream/70 text-sm">{s.l}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section variant="light">
        <SectionHeader
          variant="light"
          eyebrow="What We Do"
          title="Two divisions. One brand."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="glass-card-light p-8 md:p-9">
            <Trees className="h-7 w-7 text-gold" />
            <h3 className="mt-4 font-serif text-3xl text-forest-deep">
              Outdoor Improvements
            </h3>
            <p className="mt-3 text-forest/75">
              Landscaping, decks, fences, interlocking, sod and seasonal
              property maintenance.
            </p>
          </div>
          <div className="glass-card-light p-8 md:p-9">
            <Hammer className="h-7 w-7 text-gold" />
            <h3 className="mt-4 font-serif text-3xl text-forest-deep">
              Interior Renovations
            </h3>
            <p className="mt-3 text-forest/75">
              Flooring, vinyl & laminate, tile work and full bathroom
              renovations.
            </p>
          </div>
        </div>
      </Section>

      <Section variant="dark">
        <div className="text-center max-w-2xl mx-auto">
          <MapPin className="w-6 h-6 text-gold mx-auto" />
          <h2 className="mt-4 font-serif text-4xl md:text-5xl text-cream">
            Local to Southern Ontario.
          </h2>
          <p className="mt-5 text-cream/70 text-lg">
            Based in the Guelph–KW corridor, serving the GTA. We know the
            neighbourhoods we work in — and the standard our homeowners expect.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <CTA to="/contact">Request a Quote</CTA>
            <CTA to="/portfolio" variant="outline">
              See Our Work
            </CTA>
          </div>
        </div>
      </Section>
    </>
  );
}
