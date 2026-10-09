export type Location = {
  slug: string;
  name: string;
  /** Primary market, or a GTA city supported under the GTA hub. */
  tier: "primary" | "gta";
  metaTitle: string;
  metaDescription: string;
  intro: string;
  /** Short, practical notes specific to the area. */
  localNotes: { t: string; d: string }[];
  /** Service slugs most relevant here, shown first. */
  featuredOutdoor: string[];
  featuredInterior: string[];
  sodNote: string;
  nearby: string[];
};

export const LOCATIONS: Location[] = [
  {
    slug: "guelph",
    name: "Guelph",
    tier: "primary",
    metaTitle: "Landscaping, Renovations & Sod Delivery in Guelph",
    metaDescription:
      "Outdoor transformations, interior renovations and Kentucky Bluegrass sod delivery for Guelph homeowners — from a team based in Guelph.",
    intro:
      "Guelph is home base. Our sod delivery route starts and ends here, and many of our outdoor and interior projects are a short drive from the yard.",
    localNotes: [
      {
        t: "Heavier soils",
        d: "Much of Guelph sits on clay-rich soil that drains slowly. We grade and amend before planting or laying sod, so lawns do not stay soggy.",
      },
      {
        t: "Mature neighbourhoods",
        d: "Older lots often have established trees, tight side yards and settled grades. We assess access and root zones on the first site walk.",
      },
      {
        t: "Permits",
        d: "Raised decks and some structures in Guelph often need a building permit. Requirements vary by project and should be confirmed before work begins.",
      },
    ],
    featuredOutdoor: [
      "yard-transformations",
      "sod-installation",
      "decks",
      "interlocking",
    ],
    featuredInterior: ["bathrooms", "flooring"],
    sodNote:
      "Guelph is our home base. Your exact delivery cost comes from the real driving route — shown before you pay.",
    nearby: ["kitchener", "waterloo", "cambridge"],
  },
  {
    slug: "kitchener",
    name: "Kitchener",
    tier: "primary",
    metaTitle: "Landscaping, Renovations & Sod Delivery in Kitchener",
    metaDescription:
      "Yard transformations, decks, interlocking, flooring and bathroom renovations for Kitchener homes, plus Kentucky Bluegrass sod delivery.",
    intro:
      "Kitchener is a short drive down Highway 7 from our Guelph base — a core part of where we work.",
    localNotes: [
      {
        t: "New-build lots",
        d: "Newer subdivisions often come with builder-grade sod and minimal landscaping. A planned transformation turns the default yard into one designed for your household.",
      },
      {
        t: "Older homes",
        d: "In established neighbourhoods, bathroom and flooring updates are often the highest-impact interior projects.",
      },
      {
        t: "Locates first",
        d: "Digging should start with an Ontario One Call utility locate. Where a locate is required, that should be addressed before the relevant work begins.",
      },
    ],
    featuredOutdoor: [
      "yard-transformations",
      "interlocking",
      "fences",
      "sod-installation",
    ],
    featuredInterior: ["bathrooms", "vinyl-laminate"],
    sodNote:
      "Kitchener delivery is priced on the real driving route, which is shown before you pay.",
    nearby: ["waterloo", "cambridge", "guelph"],
  },
  {
    slug: "waterloo",
    name: "Waterloo",
    tier: "primary",
    metaTitle: "Landscaping, Renovations & Sod Delivery in Waterloo",
    metaDescription:
      "Outdoor living spaces, decks, landscaping and interior renovations for Waterloo homeowners, plus Kentucky Bluegrass sod delivered to your door.",
    intro:
      "From established streets to newer subdivisions, we help Waterloo homeowners turn standard yards and dated rooms into spaces that feel finished.",
    localNotes: [
      {
        t: "Outdoor living",
        d: "Many Waterloo backyards are compact. Careful zoning — dining, lounging, planting — makes a smaller yard feel larger.",
      },
      {
        t: "Decks and patios",
        d: "Walk-out basements and raised back doors make decks common. Where the door is near grade, a patio can be the better option.",
      },
      {
        t: "Interior updates",
        d: "Flooring and bathroom projects are scheduled to keep the rest of the home livable throughout.",
      },
    ],
    featuredOutdoor: [
      "patios-outdoor-living",
      "decks",
      "landscaping",
      "sod-installation",
    ],
    featuredInterior: ["flooring", "bathrooms"],
    sodNote:
      "Waterloo delivery is priced on the real driving route, which is shown at checkout.",
    nearby: ["kitchener", "guelph", "cambridge"],
  },
  {
    slug: "cambridge",
    name: "Cambridge",
    tier: "primary",
    metaTitle: "Landscaping, Renovations & Sod Delivery in Cambridge",
    metaDescription:
      "Yard transformations, interlocking, fences and interior renovations across Cambridge — Galt, Preston and Hespeler — plus Kentucky Bluegrass sod delivery.",
    intro:
      "Across Galt, Preston and Hespeler, Cambridge homes range from century properties to new builds — and each calls for a different approach.",
    localNotes: [
      {
        t: "Older properties",
        d: "Century homes in Galt and Preston often have settled grades and uneven walkways. Interlocking and regrading can restore both function and curb appeal.",
      },
      {
        t: "Grading and drainage",
        d: "River valley topography means slope and drainage are worth planning carefully before hardscape goes in.",
      },
      {
        t: "Fences and privacy",
        d: "Fence heights and pool enclosures follow municipal bylaws, which should be confirmed before work begins.",
      },
    ],
    featuredOutdoor: [
      "interlocking",
      "grading-drainage",
      "fences",
      "yard-transformations",
    ],
    featuredInterior: ["bathrooms", "tile"],
    sodNote:
      "Cambridge delivery is priced on the real driving route, which is shown before you pay.",
    nearby: ["kitchener", "guelph", "waterloo"],
  },
  {
    slug: "gta",
    name: "Greater Toronto Area",
    tier: "primary",
    metaTitle:
      "Landscaping & Renovations in the GTA — Toronto, Mississauga, Brampton",
    metaDescription:
      "Outdoor transformations and interior renovations for homeowners in Toronto, Mississauga and Brampton, planned and built by SilverScape Solutions.",
    intro:
      "We take on outdoor and interior projects in Toronto, Mississauga and Brampton — with the same planning, written proposals and finish standard as at home in Guelph.",
    localNotes: [
      {
        t: "City-lot logistics",
        d: "Narrow side yards, laneways and street parking affect equipment, material drops and timing. We plan logistics during the site walk.",
      },
      {
        t: "Tree protection",
        d: "Toronto and Mississauga regulate work around protected trees. Requirements should be confirmed before excavating near mature trees.",
      },
      {
        t: "Project fit",
        d: "For GTA addresses we focus on projects where a full scope makes the travel worthwhile — transformations, hardscape, bathrooms and flooring.",
      },
    ],
    featuredOutdoor: [
      "yard-transformations",
      "interlocking",
      "patios-outdoor-living",
      "decks",
    ],
    featuredInterior: ["bathrooms", "flooring"],
    sodNote:
      "Sod delivery to the GTA is available and priced on the full driving route.",
    nearby: ["toronto", "mississauga", "brampton"],
  },
  {
    slug: "toronto",
    name: "Toronto",
    tier: "gta",
    metaTitle: "Landscaping, Decks & Bathroom Renovations in Toronto",
    metaDescription:
      "Backyard transformations, interlocking, decks and bathroom renovations for Toronto homeowners, planned around city-lot realities.",
    intro:
      "Toronto lots reward careful planning: tight access, mature trees and compact backyards where every square metre needs to work.",
    localNotes: [
      {
        t: "Private tree bylaw",
        d: "Toronto regulates work around larger private trees. Excavation near them can require approval, so those requirements should be confirmed before digging.",
      },
      {
        t: "Access and parking",
        d: "Material deliveries and bins often depend on laneway access or street permits. We plan these up front.",
      },
      {
        t: "Small-yard design",
        d: "Compact backyards benefit most from a single integrated plan — patio, planting and privacy working together.",
      },
    ],
    featuredOutdoor: [
      "patios-outdoor-living",
      "interlocking",
      "fences",
      "landscaping",
    ],
    featuredInterior: ["bathrooms", "showers-tubs"],
    sodNote:
      "Sod delivery to Toronto is priced on the full driving route from Guelph. Availability and cost depend on the route.",
    nearby: ["mississauga", "brampton", "gta"],
  },
  {
    slug: "mississauga",
    name: "Mississauga",
    tier: "gta",
    metaTitle: "Landscaping, Interlocking & Renovations in Mississauga",
    metaDescription:
      "Interlocking driveways, backyard transformations, decks and bathroom renovations for Mississauga homeowners.",
    intro:
      "Mississauga homes range from mature lots to newer subdivisions. Both benefit from outdoor spaces and interiors planned as a complete scope.",
    localNotes: [
      {
        t: "Driveway rules",
        d: "Driveway widening and curb cuts are regulated by the City. What is allowed should be confirmed before an interlocking driveway is designed.",
      },
      {
        t: "Tree protection",
        d: "Mississauga regulates removal of larger private trees. Requirements should be confirmed before work near mature trees.",
      },
      {
        t: "Backyard upgrades",
        d: "Decks, patios and privacy fencing often go together. Planning them as one project saves time and keeps materials consistent.",
      },
    ],
    featuredOutdoor: [
      "interlocking",
      "decks",
      "yard-transformations",
      "fences",
    ],
    featuredInterior: ["bathrooms", "flooring"],
    sodNote:
      "Sod delivery to Mississauga is available, with delivery calculated from the full driving route.",
    nearby: ["toronto", "brampton", "gta"],
  },
  {
    slug: "brampton",
    name: "Brampton",
    tier: "gta",
    metaTitle: "Landscaping, Decks & Renovations in Brampton",
    metaDescription:
      "Backyard transformations, decks, fences, interlocking and interior renovations for Brampton homeowners.",
    intro:
      "Many Brampton homes are on newer subdivision lots — a blank canvas for a backyard that feels designed rather than builder-standard.",
    localNotes: [
      {
        t: "New-build yards",
        d: "Builder sod and bare backyards are common. A planned transformation adds structure: patio, planting, privacy and lawn.",
      },
      {
        t: "Privacy",
        d: "Close neighbours make privacy fencing and screens a frequent priority. Height rules should be confirmed before work begins.",
      },
      {
        t: "Basements and flooring",
        d: "Vinyl plank is a common choice for finished basements because it handles moisture well.",
      },
    ],
    featuredOutdoor: [
      "yard-transformations",
      "fences",
      "decks",
      "sod-installation",
    ],
    featuredInterior: ["vinyl-laminate", "bathrooms"],
    sodNote:
      "Sod delivery to Brampton is available, priced on the full driving route.",
    nearby: ["mississauga", "toronto", "gta"],
  },
];

export const PRIMARY_LOCATIONS = LOCATIONS.filter((l) => l.tier === "primary");
export const GTA_CITIES = LOCATIONS.filter((l) => l.tier === "gta");

export function findLocation(slug: string) {
  return LOCATIONS.find((l) => l.slug === slug);
}
