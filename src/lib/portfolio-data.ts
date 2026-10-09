import type { MediaId } from "@/content/mediaCatalog";
import type { Division } from "@/lib/services-data";

/**
 * Entries with `isPlaceholder: true` are representative project types — a
 * typical scope shown with temporary imagery — not completed SilverScape jobs.
 * They are never shown as proof outside /portfolio, and never carry a location.
 *
 * To publish a real case study: use real photos (see mediaCatalog), set the
 * verified city in `location`, describe the actual scope and result, and set
 * `isPlaceholder: false`.
 */
export const PORTFOLIO_CATEGORIES = {
  outdoor: ["Landscaping", "Sod", "Decks", "Fences", "Interlocking"],
  interior: ["Bathrooms", "Flooring", "Tile"],
} as const;

export type PortfolioCategory =
  (typeof PORTFOLIO_CATEGORIES)[keyof typeof PORTFOLIO_CATEGORIES][number];

export type PortfolioProject = {
  slug: string;
  title: string;
  division: Division;
  category: PortfolioCategory;
  serviceSlug: string;
  isPlaceholder: boolean;
  /** Verified city of a completed project. Always null for placeholders. */
  location: string | null;
  images: MediaId[];
  scope: string[];
  outcome: string;
};

export const PORTFOLIO: PortfolioProject[] = [
  {
    slug: "side-yard-planting",
    title: "Side-yard planting and walkway",
    division: "outdoor",
    category: "Landscaping",
    serviceSlug: "landscaping",
    isPlaceholder: true,
    location: null,
    images: ["side-yard-walkway"],
    scope: [
      "Walkway base and stone",
      "Hedge and layered shrub planting",
      "Bed edging and mulch",
    ],
    outcome:
      "Turns a leftover passage into a planted route between the front and back yard.",
  },
  {
    slug: "new-kentucky-bluegrass-lawn",
    title: "New Kentucky Bluegrass lawn",
    division: "outdoor",
    category: "Sod",
    serviceSlug: "sod-installation",
    isPlaceholder: true,
    location: null,
    images: ["sod-new-lawn"],
    scope: [
      "Old turf removal",
      "Grading and topsoil",
      "Kentucky Bluegrass sod",
      "Rolling and watering plan",
    ],
    outcome: "A dense, even lawn installed in a single visit.",
  },
  {
    slug: "ground-level-cedar-deck",
    title: "Ground-level cedar deck",
    division: "outdoor",
    category: "Decks",
    serviceSlug: "decks",
    isPlaceholder: true,
    location: null,
    images: ["cedar-deck-steps"],
    scope: [
      "Helical or concrete footings",
      "Pressure-treated framing",
      "Cedar decking with picture-frame border",
      "Wide box steps",
    ],
    outcome:
      "Extends the kitchen outdoors at door height, with steps wide enough to sit on.",
  },
  {
    slug: "cedar-privacy-fence",
    title: "Cedar privacy fence and gate",
    division: "outdoor",
    category: "Fences",
    serviceSlug: "fences",
    isPlaceholder: true,
    location: null,
    images: ["cedar-fence-gate"],
    scope: [
      "Posts set for the site conditions",
      "Board-on-board cedar panels",
      "Arched walk-through gate",
    ],
    outcome: "Full backyard privacy with no sightline gaps as the boards dry.",
  },
  {
    slug: "large-format-patio",
    title: "Large-format paver patio",
    division: "outdoor",
    category: "Interlocking",
    serviceSlug: "interlocking",
    isPlaceholder: true,
    location: null,
    images: ["slab-patio-seating"],
    scope: [
      "Excavation and compacted granular base",
      "Large-format slab pavers",
      "Edge restraint and polymeric joints",
    ],
    outcome: "A level, quiet surface sized for seating rather than a walkway.",
  },
  {
    slug: "spa-primary-bathroom",
    title: "Spa-style primary bathroom",
    division: "interior",
    category: "Bathrooms",
    serviceSlug: "bathrooms",
    isPlaceholder: true,
    location: null,
    images: ["spa-bathroom-tub"],
    scope: [
      "Full demolition",
      "Large-format tile",
      "Freestanding tub",
      "Double vanity and fixtures",
    ],
    outcome: "A daily-use bathroom with the calm of a boutique hotel.",
  },
  {
    slug: "main-floor-hardwood",
    title: "Main-floor hardwood",
    division: "interior",
    category: "Flooring",
    serviceSlug: "flooring",
    isPlaceholder: true,
    location: null,
    images: ["hardwood-empty-room"],
    scope: [
      "Existing flooring removed",
      "Subfloor leveling",
      "Wide-plank hardwood",
      "New trim and transitions",
    ],
    outcome: "One continuous floor that ties the main level together.",
  },
  {
    slug: "tiled-shower-niche",
    title: "Tiled shower with niche",
    division: "interior",
    category: "Tile",
    serviceSlug: "tile",
    isPlaceholder: true,
    location: null,
    images: ["sage-tile-shower"],
    scope: [
      "Waterproofing membrane",
      "Vertical-stack wall tile",
      "Recessed niche with mitred edges",
      "Mosaic floor sloped to drain",
    ],
    outcome:
      "Straight grout lines and a niche built into the layout, not added after.",
  },
];

export const HAS_COMPLETED_PROJECTS = PORTFOLIO.some((p) => !p.isPlaceholder);
export const HAS_PLACEHOLDER_PROJECTS = PORTFOLIO.some((p) => p.isPlaceholder);

/** Portfolio link label — avoids promising "our work" until case studies exist. */
export const PORTFOLIO_CTA_LABEL = HAS_COMPLETED_PROJECTS
  ? "View Our Work"
  : "See Project Types";
