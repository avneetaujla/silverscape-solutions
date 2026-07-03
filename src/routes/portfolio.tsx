import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { MapPin, ArrowUpRight } from "lucide-react";
import deckImg from "@/assets/proj-deck.jpg";
import paversImg from "@/assets/proj-pavers.jpg";
import landscapeImg from "@/assets/proj-landscape.jpg";
import fenceImg from "@/assets/proj-fence.jpg";
import sodImg from "@/assets/hero-sod.jpg";
import bathroomImg from "@/assets/proj-bathroom.jpg";
import flooringImg from "@/assets/proj-flooring.jpg";
import tileImg from "@/assets/proj-tile.jpg";
import heroImg from "@/assets/hero-outdoor.jpg";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHeader } from "@/components/site/Section";
import { CTA } from "@/components/site/CTA";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Property Transformations | SilverScape Solutions" },
      {
        name: "description",
        content:
          "Selected outdoor and interior transformations across Southern Ontario — landscapes, decks, interlocking, bathrooms and flooring.",
      },
    ],
  }),
  component: Portfolio,
});

type Project = {
  img: string;
  title: string;
  city: string;
  category: string;
  division: "Outdoor" | "Interior";
  scope: string;
  outcome: string;
  duration: string;
};

const PROJECTS: Project[] = [
  {
    img: landscapeImg,
    title: "Front Yard Reset",
    city: "Guelph",
    category: "Landscaping",
    division: "Outdoor",
    scope:
      "Tired beds removed, full regrade, new sod, layered plantings and natural stone borders.",
    outcome:
      "An entry that finally matches the home — soft, intentional, and noticeably more inviting from the street.",
    duration: "4 days",
  },
  {
    img: deckImg,
    title: "Multi-Level Composite Deck",
    city: "Waterloo",
    category: "Decks",
    division: "Outdoor",
    scope:
      "Two-tier composite deck with glass railings, integrated step lighting and a covered dining zone.",
    outcome:
      "A genuine outdoor living room — used most evenings from May through October.",
    duration: "3 weeks",
  },
  {
    img: paversImg,
    title: "Driveway & Walkway Interlocking",
    city: "Kitchener",
    category: "Interlocking",
    division: "Outdoor",
    scope:
      "Full base rebuild, herringbone-pattern premium concrete pavers, polymeric sand finish.",
    outcome:
      "A driveway that reads custom — and a curb appeal lift the homeowner noticed within days.",
    duration: "6 days",
  },
  {
    img: fenceImg,
    title: "Modern Horizontal Privacy Fence",
    city: "Cambridge",
    category: "Fences",
    division: "Outdoor",
    scope:
      "Cedar horizontal-board panels on white aluminum posts, custom gate, full property perimeter.",
    outcome:
      "Backyard privacy without sacrificing architectural intent — neighbours have started asking for the same.",
    duration: "5 days",
  },
  {
    img: sodImg,
    title: "Full-Property Sod Replacement",
    city: "Brampton",
    category: "Sod",
    division: "Outdoor",
    scope:
      "Old turf strip-out, soil amendments, premium Kentucky Bluegrass sod, roll and aftercare.",
    outcome:
      "A finished, walkable lawn from day one — and a property the family is proud to host on.",
    duration: "2 days",
  },
  {
    img: bathroomImg,
    title: "Primary Bathroom Retreat",
    city: "Mississauga",
    category: "Bathrooms",
    division: "Interior",
    scope:
      "Full demo, curbless walk-in shower, floating vanity, large-format marble tile, brass fixtures.",
    outcome:
      "A daily-use space that now reads more like a boutique hotel than a builder-grade bath.",
    duration: "5 weeks",
  },
  {
    img: flooringImg,
    title: "Whole-Home Engineered Plank",
    city: "Toronto",
    category: "Flooring",
    division: "Interior",
    scope:
      "Subfloor leveling, wide-plank engineered hardwood throughout main floor and stairs, custom trim.",
    outcome:
      "A cohesive main floor that finally feels like one composed space — not three different rooms.",
    duration: "2.5 weeks",
  },
  {
    img: tileImg,
    title: "Walk-In Tile Shower",
    city: "Guelph",
    category: "Bathrooms",
    division: "Interior",
    scope:
      "Large-format porcelain walls, integrated niche, linear drain, brass fixtures, heated floor.",
    outcome: "A daily moment that the homeowner now actually looks forward to.",
    duration: "3 weeks",
  },
];

const FILTERS = [
  { key: "All", group: null },
  { key: "Outdoor", group: "Outdoor Division" },
  { key: "Landscaping", group: "Outdoor Division" },
  { key: "Decks", group: "Outdoor Division" },
  { key: "Fences", group: "Outdoor Division" },
  { key: "Interlocking", group: "Outdoor Division" },
  { key: "Sod", group: "Outdoor Division" },
  { key: "Interior", group: "Interior Division" },
  { key: "Flooring", group: "Interior Division" },
  { key: "Bathrooms", group: "Interior Division" },
];

function Portfolio() {
  const [filter, setFilter] = useState("All");
  const list = useMemo(() => {
    if (filter === "All") return PROJECTS;
    return PROJECTS.filter(
      (p) => p.division === filter || p.category === filter,
    );
  }, [filter]);

  return (
    <>
      <PageHero
        eyebrow="Selected Transformations"
        title={
          <>
            Real properties,{" "}
            <em className="italic text-gold">finished completely</em>.
          </>
        }
        description="A selection of recent outdoor and interior transformations across Southern Ontario — every project planned, built and handed back by the SilverScape team."
        image={heroImg}
        height="short"
      />

      <Section variant="dark">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                buttonVariants({
                  variant: filter === f.key ? "filterActive" : "filter",
                  size: "sm",
                }),
                "min-h-[2.5rem]",
              )}
            >
              {f.key}
            </button>
          ))}
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {list.map((p, i) => (
            <article
              key={i}
              className="group premium-card premium-card-interactive flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <span className="premium-kicker rounded-full border border-gold/30 bg-forest-deep/85 px-3 py-1.5 text-gold">
                    {p.division} · {p.category}
                  </span>
                </div>
              </div>
              <div className="p-7 flex-1 flex flex-col">
                <div className="premium-kicker flex items-center gap-2 text-cream/55">
                  <MapPin className="h-3.5 w-3.5 text-gold" /> {p.city} ·{" "}
                  {p.duration}
                </div>
                <h3 className="mt-3 font-serif text-2xl md:text-3xl text-cream group-hover:text-gold transition-colors">
                  {p.title}
                </h3>

                <div className="mt-5 space-y-3">
                  <div>
                    <div className="premium-kicker mb-1 text-gold">Scope</div>
                    <p className="text-sm text-cream/75 leading-relaxed">
                      {p.scope}
                    </p>
                  </div>
                  <div>
                    <div className="premium-kicker mb-1 text-gold">Outcome</div>
                    <p className="text-sm text-cream/85 leading-relaxed italic">
                      {p.outcome}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section variant="deep">
        <SectionHeader
          eyebrow="Considering a transformation?"
          title={
            <>
              Let's talk about{" "}
              <em className="italic text-gold">your property</em>.
            </>
          }
          description="Most projects start with a 20-minute conversation. Tell us what you're imagining — we'll tell you what's realistic and what it takes to do it properly."
        />
        <div className="mt-8 flex gap-3 flex-wrap">
          <CTA to="/contact" icon={<ArrowUpRight className="w-3.5 h-3.5" />}>
            Start Your Project
          </CTA>
          <CTA to="/about" variant="outline">
            About SilverScape
          </CTA>
        </div>
      </Section>
    </>
  );
}
