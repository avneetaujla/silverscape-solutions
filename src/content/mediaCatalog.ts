/**
 * Single source of truth for every photograph on the site.
 *
 * Rules (see docs/LAUNCH_CHECKLIST.md):
 * - Each entry represents ONE subject and has ONE intended use. An image may
 *   additionally appear only as a preview card that links to that use.
 * - `isPlaceholder: true` marks temporary development imagery (AI-generated or
 *   licensed stock). It must never be described as completed SilverScape work.
 * - Files live in media-src/<id>.jpg and are resized by `npm run media`.
 */
import manifest from "./media-manifest.json";

export type MediaCategory = "outdoor" | "interior" | "sod";
export type MediaSource = "ai-generated" | "openverse-cc0" | "silverscape";

type MediaEntry = {
  alt: string;
  category: MediaCategory;
  intendedUse: string;
  isPlaceholder: boolean;
  source: MediaSource;
  attribution?: { creator?: string; license: string; url: string };
  /** CSS object-position used wherever the image is cropped. */
  objectPosition?: string;
};

const AI = { isPlaceholder: true, source: "ai-generated" } as const;
const cc0 = (url: string, creator?: string) =>
  ({
    isPlaceholder: true,
    source: "openverse-cc0",
    attribution: { creator, license: "CC0 1.0", url },
  }) as const;

const CATALOG = {
  // ── Outdoor ────────────────────────────────────────────────────────────
  "backyard-deck-patio": {
    alt: "Backyard with a composite deck stepping down to a paver patio, lawn and planted beds along a cedar fence",
    category: "outdoor",
    intendedUse: "Homepage hero; default social share image",
    ...AI,
  },
  "brick-patio-dining": {
    alt: "Wooden dining set on a brick paver patio beside a lawn and hydrangeas",
    category: "outdoor",
    intendedUse: "Homepage division card — Outdoor Services",
    ...cc0(
      "https://www.rawpixel.com/image/5920752/photo-image-public-domain-house-table",
    ),
  },
  "front-yard-walkway": {
    alt: "Front yard with a curved interlocking walkway, mulched beds and lawn leading to a brick porch",
    category: "outdoor",
    intendedUse: "Outdoor Services hub hero",
    ...AI,
  },
  "front-yard-garden-beds": {
    alt: "Front yard with curved mulched garden beds, fresh lawn and a covered porch",
    category: "outdoor",
    intendedUse: "Service hero — Landscaping",
    ...AI,
  },
  "backyard-firepit-pergola": {
    alt: "Backyard with a flagstone path, gravel fire-pit area with Adirondack chairs and a cedar pergola",
    category: "outdoor",
    intendedUse: "Service hero — Yard Transformations",
    ...AI,
  },
  "yard-regrading-swale": {
    alt: "Freshly regraded backyard soil sloping away from the house with a river-stone drainage swale",
    category: "outdoor",
    intendedUse: "Service hero — Grading & Drainage",
    ...AI,
  },
  "raised-composite-deck": {
    alt: "Raised composite deck with black aluminum railings and wide stairs down to the lawn",
    category: "outdoor",
    intendedUse: "Service hero — Decks",
    ...AI,
  },
  "horizontal-privacy-fence": {
    alt: "Horizontal wood privacy fence with white posts above a planted garden bed",
    category: "outdoor",
    intendedUse: "Service hero — Fences",
    ...AI,
  },
  "herringbone-driveway": {
    alt: "Herringbone interlocking paver driveway with a charcoal border leading to a two-car garage",
    category: "outdoor",
    intendedUse: "Service hero — Interlocking",
    ...AI,
  },
  "patio-dining-lounge": {
    alt: "Backyard deck with an outdoor dining table, lounge bench and planters",
    category: "outdoor",
    intendedUse: "Service hero — Patios & Outdoor Living",
    ...cc0(
      "https://stocksnap.io/photo/patio-backyard-F1AFB213E7",
      "Jay Mantri",
    ),
  },
  "striped-lawn": {
    alt: "Healthy striped lawn bordered by shrubs behind a house",
    category: "outdoor",
    intendedUse: "Service hero — Lawn Maintenance",
    ...cc0(
      "https://www.rawpixel.com/image/6023660/lawn-behind-house-free-public-domain-cc0-photo",
    ),
  },
  "covered-porch": {
    alt: "Covered outdoor living area with a timber ceiling, sofa and garden views",
    category: "outdoor",
    intendedUse: "Service hero — Custom Exterior Projects",
    ...cc0("https://stocksnap.io/photo/house-home-CLD6T4J9VZ", "Joshua Ness"),
  },
  "side-yard-walkway": {
    alt: "Side-yard walkway between a clipped hedge and layered planting",
    category: "outdoor",
    intendedUse: "Portfolio concept — Landscaping",
    ...cc0(
      "https://stocksnap.io/photo/walkway-stones-4B5743BFCF",
      "Jay Mantri",
    ),
  },
  "cedar-deck-steps": {
    alt: "Ground-level cedar deck with wide steps and a dining table off a sliding door",
    category: "outdoor",
    intendedUse: "Portfolio concept — Decks",
    ...AI,
  },
  "cedar-fence-gate": {
    alt: "Cedar board-on-board privacy fence with an arched walk-through gate above a planted bed",
    category: "outdoor",
    intendedUse: "Portfolio concept — Fences",
    ...AI,
  },
  "slab-patio-seating": {
    alt: "Large-format slab patio with two Adirondack chairs and ornamental grasses",
    category: "outdoor",
    intendedUse: "Portfolio concept — Interlocking",
    ...cc0(
      "https://stocksnap.io/photo/patio-furniture-ZIU3AC46X4",
      "Matt Bango",
    ),
  },

  // ── Sod ────────────────────────────────────────────────────────────────
  "sod-pallets-driveway": {
    alt: "Pallet of freshly rolled sod on a residential driveway beside a delivery truck",
    category: "sod",
    intendedUse: "Homepage division card — Sod Ordering",
    ...AI,
  },
  "sod-roll-closeup": {
    alt: "Close-up of a rolled piece of Kentucky Bluegrass sod showing soil and roots",
    category: "sod",
    intendedUse: "Homepage sod ordering section",
    ...AI,
  },
  "sod-farm-field": {
    alt: "Sod farm field at dawn with harvested rows and stacked pallets of sod",
    category: "sod",
    intendedUse: "Sod ordering portal hero",
    ...AI,
    objectPosition: "50% 65%",
  },
  "sod-laying": {
    alt: "Landscaper unrolling sod in staggered rows over prepared topsoil",
    category: "sod",
    intendedUse: "Service hero — Sod Installation",
    ...AI,
  },
  "sod-new-lawn": {
    alt: "Newly sodded backyard lawn along a cedar fence with a young tree",
    category: "sod",
    intendedUse: "Portfolio concept — Sod",
    ...AI,
  },

  // ── Interior ───────────────────────────────────────────────────────────
  "bathroom-glass-shower": {
    alt: "Bright bathroom with a glass shower enclosure, wood vanity and light flooring",
    category: "interior",
    intendedUse: "Homepage division card — Interior Renovations",
    ...cc0(
      "https://www.rawpixel.com/image/5919752/photo-image-public-domain-shadow-blue",
    ),
  },
  "main-floor-oak": {
    alt: "Open main floor with continuous light oak flooring from the living area into a white kitchen",
    category: "interior",
    intendedUse: "Interior Renovations hub hero",
    ...AI,
  },
  "living-room-oak-floor": {
    alt: "Living room with light wood flooring, grey sofa and a low area rug",
    category: "interior",
    intendedUse: "Service hero — Flooring Installation",
    ...cc0(
      "https://www.rawpixel.com/image/5926843/photo-image-public-domain-plants-minimal",
    ),
  },
  "vinyl-plank-install": {
    alt: "Oak-look vinyl plank being clicked into place with a tapping block nearby",
    category: "interior",
    intendedUse: "Service hero — Vinyl & Laminate",
    ...AI,
  },
  "marble-tile-shower": {
    alt: "Glass walk-in shower with marble-look porcelain tile and built-in niches",
    category: "interior",
    intendedUse: "Service hero — Tile Installation",
    ...AI,
  },
  "bathroom-floating-vanity": {
    alt: "Bright bathroom with floating wood vanity, backlit mirror and large-format tile",
    category: "interior",
    intendedUse: "Service hero — Bathroom Renovations",
    ...AI,
  },
  "curbless-shower-tub": {
    alt: "Curbless walk-in shower with a frameless glass panel beside a tiled alcove tub",
    category: "interior",
    intendedUse: "Service hero — Showers & Tubs",
    ...AI,
  },
  "white-oak-vanity": {
    alt: "Floating white-oak vanity with a quartz top, brass faucet and round mirror",
    category: "interior",
    intendedUse: "Service hero — Vanities & Fixtures",
    ...AI,
  },
  "spa-bathroom-tub": {
    alt: "Marble-look bathroom with freestanding tub, double vanity and brass fixtures",
    category: "interior",
    intendedUse: "Portfolio concept — Bathrooms",
    ...AI,
  },
  "hardwood-empty-room": {
    alt: "Empty bright room with refinished hardwood flooring",
    category: "interior",
    intendedUse: "Portfolio concept — Flooring",
    ...cc0(
      "https://www.rawpixel.com/image/5903577/photo-image-public-domain-house-living-room",
    ),
  },
  "sage-tile-shower": {
    alt: "Sage green vertical-stack tile shower with a recessed niche and hexagon mosaic floor",
    category: "interior",
    intendedUse: "Portfolio concept — Tile",
    ...AI,
  },
} satisfies Record<string, MediaEntry>;

export type MediaId = keyof typeof CATALOG;

export type SiteImage = {
  id: MediaId;
  src: string;
  srcSet: string;
  width: number;
  height: number;
  alt: string;
  objectPosition?: string;
};

const FILES = import.meta.glob<string>("../assets/media/*.jpg", {
  eager: true,
  query: "?url",
  import: "default",
});

const MANIFEST: Record<
  string,
  { width: number; height: number; widths: number[] }
> = manifest;

function resolve(id: MediaId): SiteImage {
  const meta = MANIFEST[id];
  if (!meta)
    throw new Error(`Media "${id}" is missing — run \`npm run media\`.`);
  const url = (w: number) => {
    const file = FILES[`../assets/media/${id}-${w}.jpg`];
    if (!file) throw new Error(`Media file ${id}-${w}.jpg not found.`);
    return file;
  };
  const entry: MediaEntry = CATALOG[id];
  return {
    id,
    src: url(meta.widths.at(-1)!),
    srcSet: meta.widths.map((w) => `${url(w)} ${w}w`).join(", "),
    width: meta.width,
    height: meta.height,
    alt: entry.alt,
    objectPosition: entry.objectPosition,
  };
}

const RESOLVED = new Map<MediaId, SiteImage>();

export function media(id: MediaId): SiteImage {
  let image = RESOLVED.get(id);
  if (!image) {
    image = resolve(id);
    RESOLVED.set(id, image);
  }
  return image;
}

export function mediaEntry(id: MediaId): MediaEntry {
  return CATALOG[id];
}

export const MEDIA_IDS = Object.keys(CATALOG) as MediaId[];
