import deckImg from "@/assets/proj-deck.jpg";
import paversImg from "@/assets/proj-pavers.jpg";
import landscapeImg from "@/assets/proj-landscape.jpg";
import fenceImg from "@/assets/proj-fence.jpg";
import sodImg from "@/assets/hero-sod.jpg";
import bathroomImg from "@/assets/proj-bathroom.jpg";
import flooringImg from "@/assets/proj-flooring.jpg";
import tileImg from "@/assets/proj-tile.jpg";

export type ServiceDetail = {
  slug: string;
  title: string;
  short: string;
  hero: string;
  intro: string;
  bullets: string[];
  process: { t: string; d: string }[];
  faq: { q: string; a: string }[];
};

export const OUTDOOR: ServiceDetail[] = [
  {
    slug: "landscaping",
    title: "Landscaping & Yard Transformations",
    short:
      "Front-yard resets to full backyard transformations — designed, planted and finished.",
    hero: landscapeImg,
    intro:
      "We design and build landscapes that hold up to Ontario seasons and look intentional from the first day. Garden beds, plantings, mulch, edging and grading — handled as one organized project.",
    bullets: [
      "Garden bed design & planting",
      "Sod, seed & soil prep",
      "Mulch & edging",
      "Grading & drainage",
      "Front entry resets",
      "Backyard transformations",
    ],
    process: [
      {
        t: "Site walk",
        d: "We measure, photograph and confirm scope on-site.",
      },
      {
        t: "Design plan",
        d: "Layout, plant selection and material specs in writing.",
      },
      { t: "Install", d: "Organized crews, daily cleanup, finished result." },
    ],
    faq: [
      {
        q: "How long does a typical landscape job take?",
        a: "Most residential landscape projects run 2–7 working days depending on scope and access.",
      },
      {
        q: "Do you handle plant selection?",
        a: "Yes — we choose hardy, climate-appropriate plants and confirm choices before install.",
      },
    ],
  },
  {
    slug: "sod-installation",
    title: "Sod Installation",
    short: "Premium sod, professionally laid for a finished lawn from day one.",
    hero: sodImg,
    intro:
      "Whether it's a small front yard or a full property, our sod installs include site prep, soil amendments, premium sod and proper watering instructions to protect your investment.",
    bullets: [
      "Site prep & grading",
      "Topsoil amendments",
      "Standard, premium & luxury sod",
      "Roller finish",
      "Aftercare guidance",
      "Same-day delivery option",
    ],
    process: [
      { t: "Measure", d: "We confirm square footage and access." },
      { t: "Prep", d: "Old turf removal and topsoil prep." },
      {
        t: "Install & finish",
        d: "Lay, roll and water — with care instructions.",
      },
    ],
    faq: [
      {
        q: "Can I just order sod for self-install?",
        a: "Yes — use the Sod Ordering portal to order delivery only.",
      },
      {
        q: "When is the best time to install sod?",
        a: "Spring through early fall offers the best establishment conditions in Ontario.",
      },
    ],
  },
  {
    slug: "decks",
    title: "Deck Building",
    short:
      "Composite, pressure-treated and cedar decks with finish-grade detail.",
    hero: deckImg,
    intro:
      "Decks built on permits, designed for Ontario weather, and finished with the kind of detailing you'd expect on a high-end home addition.",
    bullets: [
      "Composite & PT framing",
      "Glass, aluminum & cable rails",
      "Stairs & landings",
      "Built-in lighting",
      "Privacy screens",
      "Multi-level designs",
    ],
    process: [
      { t: "Design & permit", d: "Drawings, permits and material specs." },
      { t: "Build", d: "Structural framing, decking and rails." },
      { t: "Finish", d: "Lighting, trims and a clean handover." },
    ],
    faq: [
      {
        q: "Do I need a permit for a deck?",
        a: "Most municipalities require a permit above a certain height. We handle the application.",
      },
      {
        q: "Composite or wood?",
        a: "Composite costs more upfront but eliminates staining and replacement. We'll walk through trade-offs.",
      },
    ],
  },
  {
    slug: "fences",
    title: "Fence Installation",
    short:
      "Privacy, picket and modern horizontal fences engineered for Ontario.",
    hero: fenceImg,
    intro:
      "Fences built straight, plumb and durable — installed with proper post depth and finishing detail that lasts well past the warranty period.",
    bullets: [
      "Modern horizontal cedar",
      "PT privacy fencing",
      "Aluminum & metal",
      "Gates with hardware",
      "Property line surveys",
      "Repairs & replacements",
    ],
    process: [
      { t: "Layout", d: "Confirm property lines and post locations." },
      { t: "Install", d: "Concrete post setting and panel install." },
      { t: "Finish", d: "Caps, gates and final adjustments." },
    ],
    faq: [
      {
        q: "How tall can my fence be?",
        a: "Bylaw varies by city — most allow 6 ft in rear yards. We confirm before quoting.",
      },
    ],
  },
  {
    slug: "interlocking",
    title: "Interlocking & Pavers",
    short: "Driveways, walkways, patios and steps in premium concrete pavers.",
    hero: paversImg,
    intro:
      "Interlocking that stays level. Proper base prep, edge restraints and polymeric sand make the difference between a driveway that looks great for 15 years and one that fails in three.",
    bullets: [
      "Driveway interlocking",
      "Walkways & steps",
      "Patio installs",
      "Retaining walls",
      "Permeable pavers",
      "Repair & re-leveling",
    ],
    process: [
      { t: "Excavate & base", d: "Proper depth, compacted gravel base." },
      { t: "Lay pavers", d: "Pattern, cuts and edge restraints." },
      { t: "Finish", d: "Polymeric sand and final wash." },
    ],
    faq: [
      {
        q: "How long do pavers last?",
        a: "20+ years when installed with proper base depth and edge restraints — both standard for us.",
      },
    ],
  },
  {
    slug: "lawn-maintenance",
    title: "Lawn Maintenance",
    short: "Seasonal upkeep, mowing, and property care plans.",
    hero: landscapeImg,
    intro:
      "Keep your investment looking finished year-round with weekly or bi-weekly maintenance plans built around your property.",
    bullets: [
      "Mowing & edging",
      "Spring & fall cleanup",
      "Aeration & overseeding",
      "Fertilization plans",
      "Hedge trimming",
      "Seasonal contracts",
    ],
    process: [
      { t: "Walkthrough", d: "Property walk to confirm needs." },
      { t: "Plan", d: "Frequency and scope confirmed in writing." },
      { t: "Maintain", d: "Same crew, consistent standard." },
    ],
    faq: [
      {
        q: "Do you offer one-time cleanups?",
        a: "Yes — spring and fall cleanups are available without an ongoing contract.",
      },
    ],
  },
];

export const INTERIOR: ServiceDetail[] = [
  {
    slug: "flooring",
    title: "Flooring Installation",
    short: "Hardwood, engineered, vinyl, laminate and tile — installed clean.",
    hero: flooringImg,
    intro:
      "Flooring installs that respect the home: dust control, careful subfloor prep and detail trim that makes the room feel built-in.",
    bullets: [
      "Hardwood & engineered",
      "Vinyl plank",
      "Laminate",
      "Subfloor prep",
      "Trim & transitions",
      "Furniture move support",
    ],
    process: [
      {
        t: "Measure & spec",
        d: "Material selection and quantity confirmation.",
      },
      { t: "Prep", d: "Subfloor leveling and removal of old flooring." },
      { t: "Install & finish", d: "Plank install, trim and clean handover." },
    ],
    faq: [
      {
        q: "Can you install over existing tile?",
        a: "Sometimes — depends on tile condition and floor height. We'll inspect first.",
      },
    ],
  },
  {
    slug: "vinyl-laminate",
    title: "Vinyl & Laminate Flooring",
    short: "Durable, water-resistant flooring perfect for Ontario homes.",
    hero: flooringImg,
    intro:
      "Modern vinyl plank and laminate options offer hardwood looks at a friendlier price — with better moisture tolerance.",
    bullets: [
      "Luxury vinyl plank (LVP)",
      "SPC rigid core vinyl",
      "Premium laminate",
      "Underlayment included",
      "Stair installs",
      "Whole-home installs",
    ],
    process: [
      { t: "Choose product", d: "Samples brought to you for final selection." },
      { t: "Prep", d: "Level and clean subfloor." },
      { t: "Install", d: "Click-lock install with proper expansion gaps." },
    ],
    faq: [
      {
        q: "Vinyl or laminate — which is better?",
        a: "Vinyl is more water-resistant; laminate often feels more like real wood. We'll match it to your room.",
      },
    ],
  },
  {
    slug: "tile",
    title: "Tile Installation",
    short: "Bathroom, kitchen and entry tile installed by trades who care.",
    hero: tileImg,
    intro:
      "Tile work is where good contractors get exposed. Layouts that line up at every wall, level transitions and grout joints that read clean.",
    bullets: [
      "Large-format porcelain",
      "Mosaic & feature walls",
      "Heated floor systems",
      "Curbless showers",
      "Backsplashes",
      "Shower niches",
    ],
    process: [
      { t: "Layout planning", d: "Dry layout to balance cuts." },
      { t: "Install", d: "Proper waterproofing and adhesive selection." },
      { t: "Grout & finish", d: "Clean grout lines and silicone transitions." },
    ],
    faq: [
      {
        q: "Do you do heated floors?",
        a: "Yes — electric in-floor heating systems are a popular bathroom addition.",
      },
    ],
  },
  {
    slug: "bathrooms",
    title: "Bathroom Renovations",
    short: "Full bathroom renovations from demo to handover.",
    hero: bathroomImg,
    intro:
      "Bathroom renovations are project-managed end to end: demo, plumbing, electrical, tile, vanity, fixtures and trim — coordinated by one team.",
    bullets: [
      "Full demos",
      "Curbless walk-in showers",
      "Tub-to-shower conversions",
      "Vanity & fixture upgrades",
      "Custom tile work",
      "Heated floors",
    ],
    process: [
      { t: "Design", d: "Layout, materials and fixture selection." },
      { t: "Demo & rough-in", d: "Plumbing, electrical and waterproofing." },
      { t: "Finish", d: "Tile, vanity, fixtures and clean handover." },
    ],
    faq: [
      {
        q: "How long does a bathroom take?",
        a: "Typical full renovation runs 3–5 weeks depending on scope and material lead times.",
      },
      {
        q: "Do you handle plumbing & electrical?",
        a: "Yes — through licensed trade partners, fully coordinated.",
      },
    ],
  },
];

export const ALL = [...OUTDOOR, ...INTERIOR];
