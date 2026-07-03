import landscapeImg from "@/assets/proj-landscape.jpg";
import sodImg from "@/assets/hero-sod.jpg";
import bathroomImg from "@/assets/proj-bathroom.jpg";
import deckImg from "@/assets/proj-deck.jpg";
import paversImg from "@/assets/proj-pavers.jpg";
import flooringImg from "@/assets/proj-flooring.jpg";
import tileImg from "@/assets/proj-tile.jpg";
import fenceImg from "@/assets/proj-fence.jpg";

export type Article = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  image: string;
  readTime: string;
  body: { h?: string; p?: string }[];
};

export const ARTICLES: Article[] = [
  {
    slug: "landscaping-cost-guide-guelph",
    title: "Landscaping cost guide for Guelph homeowners",
    category: "Cost Guides",
    excerpt:
      "What you can actually expect to invest in a Guelph landscape project this season — itemized.",
    image: landscapeImg,
    readTime: "6 min read",
    body: [
      {
        p: "Landscape pricing varies wildly across Southern Ontario. This guide breaks down realistic ranges for typical Guelph residential projects so you can plan with confidence.",
      },
      { h: "Front yard refresh" },
      {
        p: "Cleanup, fresh mulch, edging and a few new plantings typically runs $2,500–$5,500 for an average lot.",
      },
      { h: "Full backyard transformation" },
      {
        p: "Grading, sod, beds, hardscape edging and feature plantings: $15,000–$45,000+ depending on hardscape scope.",
      },
      { h: "What changes the price" },
      {
        p: "Site access, slope, existing material removal, and material selection (standard vs premium plantings).",
      },
    ],
  },
  {
    slug: "sod-cost-southern-ontario",
    title: "How much does sod installation cost in Southern Ontario?",
    category: "Sod & Lawn Care",
    excerpt:
      "Per-square-foot pricing, delivery vs install, and how to choose a sod grade.",
    image: sodImg,
    readTime: "5 min read",
    body: [
      {
        p: "Sod pricing in Southern Ontario depends on three things: sod grade, square footage, and whether you install it yourself.",
      },
      { h: "Standard pricing" },
      {
        p: "$0.65–$1.10 per sq ft for sod alone. Add $0.85–$1.50/sqft for prep and installation.",
      },
      { h: "Delivery only" },
      {
        p: "Order through our sod portal — choose grade, enter postal code, see delivery total.",
      },
    ],
  },
  {
    slug: "standard-vs-premium-sod",
    title: "Standard vs premium sod: which should you choose?",
    category: "Sod & Lawn Care",
    excerpt:
      "When the upgrade is worth it — and when standard sod is the smarter pick.",
    image: sodImg,
    readTime: "4 min read",
    body: [
      { p: "Premium sod isn't always the right answer. Here's how to choose." },
      { h: "Standard" },
      {
        p: "Reliable Kentucky bluegrass blend. Right for most front and back yards on average lots.",
      },
      { h: "Premium" },
      {
        p: "Denser growth and deeper colour — worth it for visible front yards and higher-end properties.",
      },
    ],
  },
  {
    slug: "deck-vs-patio",
    title: "Deck vs patio: which upgrade makes more sense?",
    category: "Decks & Fences",
    excerpt:
      "Decks build up. Patios sit at grade. Pick the right one for your yard.",
    image: deckImg,
    readTime: "5 min read",
    body: [
      {
        p: "Decks elevate space and work well off raised entries. Patios cost less and integrate at grade — good for flat lots.",
      },
    ],
  },
  {
    slug: "best-interlocking-ontario-weather",
    title: "Best interlocking options for Ontario weather",
    category: "Interlocking & Pavers",
    excerpt: "Freeze-thaw isn't a suggestion. Here's what holds up.",
    image: paversImg,
    readTime: "5 min read",
    body: [
      {
        p: "Choose pavers rated for freeze-thaw, install on a properly compacted base, and use polymeric sand. Skip any of these and you'll re-lay in 3 years.",
      },
    ],
  },
  {
    slug: "vinyl-vs-laminate",
    title: "Vinyl vs laminate flooring: which is better?",
    category: "Flooring",
    excerpt: "Side-by-side comparison for typical Ontario homes.",
    image: flooringImg,
    readTime: "4 min read",
    body: [
      {
        p: "Vinyl wins on water resistance. Laminate wins on hardwood realism. Choose based on the room.",
      },
    ],
  },
  {
    slug: "tile-vs-vinyl-bathrooms",
    title: "Tile flooring vs vinyl flooring for bathrooms",
    category: "Bathrooms",
    excerpt: "Both work. One feels more premium. Here's the trade-off.",
    image: tileImg,
    readTime: "4 min read",
    body: [
      {
        p: "Tile is the long-term answer for bathrooms. Vinyl gets you most of the way for less — with faster installs.",
      },
    ],
  },
  {
    slug: "bathroom-renovation-cost-guide",
    title: "Bathroom renovation cost guide for Southern Ontario",
    category: "Cost Guides",
    excerpt:
      "Realistic ranges for a powder room refresh through a primary bath rebuild.",
    image: bathroomImg,
    readTime: "7 min read",
    body: [
      { h: "Powder room" },
      { p: "$8,000–$15,000 for paint, vanity, fixtures and minor tile." },
      { h: "Full bathroom" },
      { p: "$22,000–$55,000 depending on tile, fixtures and layout changes." },
    ],
  },
  {
    slug: "how-to-choose-contractor-gta",
    title: "How to choose a contractor in the GTA",
    category: "Contractor Advice",
    excerpt: "What separates a finished property from a six-month headache.",
    image: fenceImg,
    readTime: "6 min read",
    body: [
      {
        p: "Insurance, written quotes, real references, daily site management. If a contractor flinches at any of these, walk.",
      },
    ],
  },
  {
    slug: "what-to-expect-yard-makeover",
    title: "What to expect during a full yard makeover",
    category: "Outdoor Planning",
    excerpt: "Timing, disruption and final results — week by week.",
    image: landscapeImg,
    readTime: "5 min read",
    body: [
      {
        p: "A typical full yard project runs 1–3 weeks. Here's what each week looks like.",
      },
    ],
  },
];
