import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, MapPin, Check } from "lucide-react";
import heroImg from "@/assets/proj-landscape.jpg";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHeader } from "@/components/site/Section";
import { CTA } from "@/components/site/CTA";
import { OUTDOOR, INTERIOR } from "@/lib/services-data";

const CITIES: Record<
  string,
  { name: string; intro: string; localNote: string }
> = {
  guelph: {
    name: "Guelph",
    intro:
      "From Old University to Kortright Hills, our Guelph crews handle everything from front-yard resets to full bathroom renovations.",
    localNote:
      "Local team based in the Guelph–KW corridor. Same-day site walks often available.",
  },
  kitchener: {
    name: "Kitchener",
    intro:
      "Serving Kitchener neighbourhoods including Doon, Forest Heights and downtown — outdoor and interior projects.",
    localNote:
      "Trusted by hundreds of Kitchener homeowners across decks, fences and bathroom renovations.",
  },
  waterloo: {
    name: "Waterloo",
    intro:
      "Waterloo properties from Beechwood to Eastbridge — landscaping, decks and renovations delivered to a higher standard.",
    localNote: "Active project crews in Waterloo every week.",
  },
  cambridge: {
    name: "Cambridge",
    intro:
      "Hespeler, Preston and Galt — we serve Cambridge with the same finish-first approach.",
    localNote: "Quick response for Cambridge enquiries.",
  },
  gta: {
    name: "Greater Toronto Area",
    intro:
      "Coverage across the GTA — Toronto, Mississauga, Brampton and surrounding suburbs.",
    localNote:
      "Dedicated GTA project teams for residential renovations and outdoor builds.",
  },
  toronto: {
    name: "Toronto",
    intro:
      "From the Beaches to Etobicoke — we deliver high-finish outdoor and interior projects across Toronto.",
    localNote:
      "GTA-specialized crews; experienced with city-lot logistics and permitting.",
  },
  mississauga: {
    name: "Mississauga",
    intro:
      "Mississauga homeowners trust us for premium decks, interlocking and bathroom renovations.",
    localNote:
      "Active across Port Credit, Lorne Park, Streetsville and beyond.",
  },
  brampton: {
    name: "Brampton",
    intro:
      "Brampton properties served end-to-end — landscaping, sod, decks and interior renovations.",
    localNote:
      "Local response and clean install standard expected from a high-end builder.",
  },
};

export const Route = createFileRoute("/service-areas/$city")({
  head: ({ params }) => {
    const c = CITIES[params.city];
    return {
      meta: [
        {
          title: `${c?.name ?? "City"} Renovations & Landscaping — SilverScape`,
        },
        { name: "description", content: c?.intro ?? "" },
      ],
    };
  },
  loader: ({ params }) => {
    if (!CITIES[params.city]) throw notFound();
    return { city: CITIES[params.city]!, slug: params.city };
  },
  component: CityPage,
  errorComponent: ({ error }) => (
    <div className="p-20 text-center text-cream">{error.message}</div>
  ),
  notFoundComponent: () => (
    <div className="p-20 text-center text-cream">City not found</div>
  ),
});

function CityPage() {
  const { city } = Route.useLoaderData() as {
    city: { name: string; intro: string; localNote: string };
  };
  return (
    <>
      <PageHero
        eyebrow={`Service Area`}
        title={
          <>
            {city.name}{" "}
            <em className="italic text-gold">renovations & landscaping</em>.
          </>
        }
        description={city.intro}
        image={heroImg}
        height="short"
      >
        <CTA to="/contact">Request a Quote</CTA>
        <CTA to="/sod-ordering" variant="outline">
          Order Sod
        </CTA>
      </PageHero>

      <Section variant="dark">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-12">
            <div>
              <SectionHeader
                eyebrow="Outdoor in this area"
                title={
                  <>
                    {city.name}{" "}
                    <em className="italic text-gold">outdoor services</em>.
                  </>
                }
              />
              <div className="mt-8 grid sm:grid-cols-2 gap-3">
                {OUTDOOR.map((s) => (
                  <Link
                    key={s.slug}
                    to="/outdoor-services/$service"
                    params={{ service: s.slug }}
                    className="glass-card premium-card-interactive p-5 flex items-center gap-3 text-sm text-cream/85"
                  >
                    <Check className="h-4 w-4 text-gold" />
                    {s.title}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <SectionHeader
                eyebrow="Interior in this area"
                title={
                  <>
                    {city.name}{" "}
                    <em className="italic text-gold">interior renovations</em>.
                  </>
                }
              />
              <div className="mt-8 grid sm:grid-cols-2 gap-3">
                {INTERIOR.map((s) => (
                  <Link
                    key={s.slug}
                    to="/interior-renovations/$service"
                    params={{ service: s.slug }}
                    className="glass-card premium-card-interactive p-5 flex items-center gap-3 text-sm text-cream/85"
                  >
                    <Check className="h-4 w-4 text-gold" />
                    {s.title}
                  </Link>
                ))}
              </div>
            </div>
            <div className="glass-card p-7 md:p-8">
              <div className="eyebrow">Local Trust</div>
              <p className="mt-3 text-cream/80 leading-relaxed">
                {city.localNote}
              </p>
            </div>
          </div>

          <aside className="glass-card p-7 md:p-8 h-fit">
            <MapPin className="h-5 w-5 text-gold" />
            <div className="mt-3 font-serif text-2xl text-cream">
              Serving {city.name}
            </div>
            <p className="text-sm text-cream/65 mt-2">
              Talk to a local team member about your project — we usually
              respond within one business day.
            </p>
            <CTA to="/contact" className="mt-6 w-full">
              Request a Quote
            </CTA>
            <a
              href="tel:+12265004608"
              className="mt-3 block text-center text-sm text-gold"
            >
              (226) 500-4608
            </a>
          </aside>
        </div>
      </Section>

      <Section variant="deep">
        <div className="text-center">
          <div className="eyebrow">Other Service Areas</div>
          <h3 className="mt-3 font-serif text-3xl md:text-4xl text-cream">
            Explore nearby
          </h3>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {Object.entries(CITIES).map(([slug, c]) => (
            <Link
              key={slug}
              to="/service-areas/$city"
              params={{ city: slug }}
              className="glass-card premium-card-interactive p-5 flex items-center justify-between text-sm"
            >
              <span className="text-cream">{c.name}</span>
              <ArrowRight className="h-4 w-4 text-gold" />
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
