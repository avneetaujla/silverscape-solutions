export type ArticleBlock =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "list"; items: string[] };

export type Article = {
  slug: string;
  title: string;
  metaDescription: string;
  category:
    | "Outdoor Planning"
    | "Sod & Lawn"
    | "Interior Planning"
    | "Hiring & Process";
  excerpt: string;
  readMinutes: number;
  published: string;
  updated: string;
  body: ArticleBlock[];
  /** Internal links to the services the article supports. */
  services: { label: string; to: string }[];
};

const PUBLISHED = "2026-10-08";

export const ARTICLES: Article[] = [
  {
    slug: "landscaping-cost-guide-guelph",
    title: "What drives the cost of a landscaping project",
    metaDescription:
      "The factors that decide what a landscaping project costs in Guelph and Southern Ontario — access, grading, materials, removals and scope — and how to plan a budget.",
    category: "Outdoor Planning",
    excerpt:
      "Two yards of the same size can differ in cost by several times. Here is what actually moves the number — and how to plan around it.",
    readMinutes: 6,
    published: PUBLISHED,
    updated: PUBLISHED,
    body: [
      {
        type: "p",
        text: "Homeowners often ask for a price per square foot for landscaping. It is a reasonable question with an unhelpful answer: two yards of identical size can differ in cost several times over. The factors below explain why, and how to plan a realistic budget before you request quotes.",
      },
      { type: "h2", text: "1. What has to come out first" },
      {
        type: "p",
        text: "Removal is invisible in the finished photos but often a meaningful part of the cost. Old sod, overgrown shrubs, stumps, failed interlocking and buried debris all have to be excavated, loaded and disposed of.",
      },
      { type: "h2", text: "2. Grading and soil" },
      {
        type: "p",
        text: "Much of Guelph and Waterloo Region sits on heavier, clay-rich soil. If water currently pools or the slope runs toward the house, correcting the grade comes before anything else. Topsoil quantity is a frequent surprise — beds and new lawns need real depth to perform.",
      },
      { type: "h2", text: "3. Access" },
      {
        type: "p",
        text: "A wide side yard that fits a compact loader is very different from a narrow walkway where everything moves by wheelbarrow. Fences, gates, slopes and how close materials can be dropped all change labour time.",
      },
      { type: "h2", text: "4. Hardscape versus softscape" },
      {
        type: "p",
        text: "Planting, mulch and sod — softscape — generally cost less per square foot than hardscape such as patios, walkways and walls. Hardscape requires excavation, base material and compaction before the visible surface goes in.",
      },
      { type: "h2", text: "5. Material choices" },
      {
        type: "list",
        items: [
          "Plant size: larger, more mature plants cost more but look finished sooner.",
          "Edging: spade-cut edges are economical; steel or stone edging lasts longer and stays crisper.",
          "Stone and pavers: product lines vary widely in price, colour stability and freeze-thaw performance.",
        ],
      },
      { type: "h2", text: "How to plan your budget" },
      {
        type: "p",
        text: "Decide which outcome matters most — curb appeal, privacy, a place to entertain, less maintenance — and let that drive the scope. If the full vision exceeds this year's budget, have the complete plan designed now and build it in phases. Each phase then fits the next instead of being torn out later.",
      },
      {
        type: "p",
        text: "Ask every contractor for an itemized, written proposal. It is the only reliable way to compare quotes on equal footing.",
      },
    ],
    services: [
      { label: "Landscaping", to: "/outdoor-services/landscaping" },
      {
        label: "Full yard transformations",
        to: "/outdoor-services/yard-transformations",
      },
    ],
  },
  {
    slug: "how-much-sod-do-i-need",
    title: "How much sod do I need? Measuring your lawn in rolls",
    metaDescription:
      "How to measure your lawn and convert square footage into sod rolls, with a simple waste allowance — plus tips for odd-shaped yards.",
    category: "Sod & Lawn",
    excerpt:
      "A quick, accurate way to measure your lawn, convert it into rolls and avoid running short on installation day.",
    readMinutes: 4,
    published: PUBLISHED,
    updated: PUBLISHED,
    body: [
      {
        type: "p",
        text: "Ordering the right amount of sod saves you a second delivery charge and keeps fresh sod from sitting unused. Here is the simple method we recommend.",
      },
      { type: "h2", text: "Step 1: Break the lawn into simple shapes" },
      {
        type: "p",
        text: "Sketch the area and divide it into rectangles, triangles and circles. Measure each shape in feet.",
      },
      {
        type: "list",
        items: [
          "Rectangle: length × width",
          "Triangle: (base × height) ÷ 2",
          "Circle: 3.14 × radius × radius",
        ],
      },
      { type: "h2", text: "Step 2: Add the shapes together" },
      {
        type: "p",
        text: "Add every area to get your total square footage. Subtract large features you will not sod, such as patios or beds.",
      },
      { type: "h2", text: "Step 3: Convert to rolls" },
      {
        type: "p",
        text: "Standard Kentucky Bluegrass rolls are 2 ft × 5 ft, which covers 10 square feet. Divide your total square footage by 10 to get the number of rolls.",
      },
      { type: "h2", text: "Step 4: Add a waste allowance" },
      {
        type: "p",
        text: "Curves, edges and cuts around obstacles use extra sod. Add about 5% for simple rectangular lawns and closer to 10% for curved beds or many obstacles. Round up to the next whole roll.",
      },
      { type: "h2", text: "Example" },
      {
        type: "p",
        text: "A 40 ft × 25 ft backyard is 1,000 sq ft. That is 100 rolls, plus a 5% allowance — 105 rolls.",
      },
      { type: "h2", text: "Plan the day" },
      {
        type: "p",
        text: "Sod is a living product and should be laid the day it arrives. Have the soil graded and ready before delivery, and plan enough hands to finish the same day.",
      },
    ],
    services: [
      { label: "Order sod", to: "/sod-ordering" },
      { label: "Sod installation", to: "/outdoor-services/sod-installation" },
    ],
  },
  {
    slug: "sod-cost-southern-ontario",
    title: "How sod delivery pricing works",
    metaDescription:
      "How SilverScape prices Kentucky Bluegrass sod delivery in Southern Ontario: a per-roll sod price with HST, plus per-kilometre delivery calculated from the real driving route.",
    category: "Sod & Lawn",
    excerpt:
      "A per-roll sod price, plus delivery based on the actual driving route — and a full itemized total before you pay. Here is how it works.",
    readMinutes: 3,
    published: PUBLISHED,
    updated: PUBLISHED,
    body: [
      {
        type: "p",
        text: "Sod pricing is often opaque — flat delivery zones, minimums and fees that appear late in the conversation. We use one simple, consistent method instead.",
      },
      { type: "h2", text: "The sod" },
      {
        type: "p",
        text: "Kentucky Bluegrass is priced per roll, with 13% HST applied. Each roll is 2 ft × 5 ft and covers 10 sq ft, so the sod amount scales directly with the size of your lawn.",
      },
      { type: "h2", text: "Delivery" },
      {
        type: "p",
        text: "Delivery is charged per kilometre of the complete driving route: from our base in Guelph, to the sod farm, to your address, and back to Guelph. The distance comes from a mapping service using real roads — not a straight line on a map.",
      },
      { type: "h2", text: "Why route-based delivery?" },
      {
        type: "p",
        text: "Flat zones overcharge customers close to the route and undercharge distant ones. Route-based pricing is fairer: Guelph, Kitchener, Waterloo and Cambridge addresses are typically the least expensive to deliver to.",
      },
      { type: "h2", text: "When you see the price" },
      {
        type: "p",
        text: "Enter your roll count, delivery address and contact details in the ordering portal. Your exact total — sod, HST, route distance and delivery — is calculated securely on our server and shown in a full itemized summary before you pay through Stripe Checkout.",
      },
    ],
    services: [
      { label: "Order sod", to: "/sod-ordering" },
      { label: "Sod installation", to: "/outdoor-services/sod-installation" },
    ],
  },
  {
    slug: "deck-vs-patio",
    title: "Deck or patio: choosing the right outdoor surface",
    metaDescription:
      "Deck vs patio for Southern Ontario homes — how door height, grade, maintenance, permits and how you entertain should drive the decision.",
    category: "Outdoor Planning",
    excerpt:
      "Decks build up, patios sit at grade. The right choice depends on your back door, your yard and how you want to use it.",
    readMinutes: 5,
    published: PUBLISHED,
    updated: PUBLISHED,
    body: [
      {
        type: "p",
        text: "Both a deck and a patio create outdoor living space. The better choice for your home mostly depends on the height of your back door, the slope of your yard and how much maintenance you are willing to do.",
      },
      { type: "h2", text: "Start with the door" },
      {
        type: "p",
        text: "If your back door is several steps above the yard, a deck brings the living space out at floor level. If the door is close to grade, a patio is usually simpler, more cost-effective and connects directly to the lawn.",
      },
      { type: "h2", text: "Permits" },
      {
        type: "p",
        text: 'In Ontario, decks more than 600 mm (about 24") above grade — and in many municipalities, decks attached to the house — typically require a building permit. Ground-level patios generally do not, though drainage and lot-coverage rules still apply.',
      },
      { type: "h2", text: "Maintenance" },
      {
        type: "list",
        items: [
          "Pressure-treated and cedar decks need periodic cleaning and staining.",
          "Composite decking reduces maintenance but costs more up front.",
          "Paver patios need occasional joint sand top-ups and are repairable piece by piece.",
        ],
      },
      { type: "h2", text: "Sloped yards" },
      {
        type: "p",
        text: "On a slope, a deck can create a level platform without major excavation. A patio on a slope often needs retaining walls and steps — which can look excellent but adds cost.",
      },
      { type: "h2", text: "Combine them" },
      {
        type: "p",
        text: "Many of the best backyards use both: a deck off the kitchen for dining, stepping down to a patio and fire area at grade. Planning them together keeps levels, materials and drainage consistent.",
      },
    ],
    services: [
      { label: "Decks", to: "/outdoor-services/decks" },
      {
        label: "Patios & outdoor living",
        to: "/outdoor-services/patios-outdoor-living",
      },
    ],
  },
  {
    slug: "best-interlocking-ontario-weather",
    title: "Interlocking that survives Ontario winters",
    metaDescription:
      "Why interlocking sinks, heaves and shifts in Ontario — and the excavation, base, edge restraint and drainage details that prevent it.",
    category: "Outdoor Planning",
    excerpt:
      "Freeze-thaw is relentless. Here is what separates interlocking that stays level from interlocking that fails in a few seasons.",
    readMinutes: 5,
    published: PUBLISHED,
    updated: PUBLISHED,
    body: [
      {
        type: "p",
        text: "Southern Ontario winters cycle above and below freezing many times. Water in the ground expands as it freezes, and any weakness in an interlocking installation gets exposed quickly.",
      },
      { type: "h2", text: "The base does the work" },
      {
        type: "p",
        text: "Pavers are the visible layer. What keeps them level is the excavated depth and the compacted granular base underneath. Driveways need a deeper base than walkways because they carry vehicle loads.",
      },
      { type: "h2", text: "Compaction in lifts" },
      {
        type: "p",
        text: "Base material should be compacted in layers rather than all at once. Compacting a thick layer in a single pass leaves the bottom loose — which shows up later as sinking.",
      },
      { type: "h2", text: "Edge restraint" },
      {
        type: "p",
        text: "Without a proper edge, pavers slowly spread outward and joints open up. Edge restraint keeps the field locked together.",
      },
      { type: "h2", text: "Drainage" },
      {
        type: "p",
        text: "Surfaces should slope away from the house, and water needs somewhere to go. Pooling water in the base is the fastest route to heaving.",
      },
      { type: "h2", text: "Choosing pavers" },
      {
        type: "list",
        items: [
          "Pick products suited to freeze-thaw and de-icing salt exposure.",
          "Thicker pavers are better suited to driveways.",
          "Consider colour-through products if you want chips and wear to stay less visible.",
        ],
      },
      {
        type: "p",
        text: "When comparing quotes, ask each contractor how deep they will excavate, what base material they use and how it will be compacted. Clear answers are a good sign.",
      },
    ],
    services: [
      { label: "Interlocking & pavers", to: "/outdoor-services/interlocking" },
      { label: "Grading & drainage", to: "/outdoor-services/grading-drainage" },
    ],
  },
  {
    slug: "vinyl-vs-laminate",
    title: "Vinyl plank vs laminate: which floor fits which room",
    metaDescription:
      "Vinyl plank vs laminate flooring compared for Ontario homes — water resistance, feel underfoot, durability, basements and kitchens.",
    category: "Interior Planning",
    excerpt:
      "Both look like wood and both install as floating floors. The difference shows up with water, sound and feel underfoot.",
    readMinutes: 4,
    published: PUBLISHED,
    updated: PUBLISHED,
    body: [
      {
        type: "p",
        text: "Luxury vinyl plank (LVP) and laminate are the two most popular alternatives to hardwood. They look similar in a showroom, but they behave differently in your home.",
      },
      { type: "h2", text: "Water" },
      {
        type: "p",
        text: "Vinyl is the clear winner for moisture-prone areas. Rigid-core vinyl tolerates spills and humidity well, which makes it the common choice for basements, laundry rooms and kitchens. Laminate has a wood-fibre core; even water-resistant products are less forgiving of standing water.",
      },
      { type: "h2", text: "Look and feel" },
      {
        type: "p",
        text: "Laminate often has crisper embossing and feels more like real wood underfoot. Vinyl can feel slightly softer and warmer, especially with an attached underlayment.",
      },
      { type: "h2", text: "Durability" },
      {
        type: "p",
        text: "Both resist scratches well when you choose a good wear layer. Laminate generally resists surface scratches; vinyl is quieter and more comfortable in high-traffic family spaces.",
      },
      { type: "h2", text: "A simple rule" },
      {
        type: "list",
        items: [
          "Basement, kitchen, laundry, mudroom: vinyl plank.",
          "Living room, bedrooms, upper floors: either — choose by look and feel.",
          "Bathrooms: vinyl or tile, not laminate.",
        ],
      },
      {
        type: "p",
        text: "Whichever you choose, the subfloor must be flat for click-lock floors to perform. That preparation is where a careful installer earns their keep.",
      },
    ],
    services: [
      {
        label: "Vinyl & laminate flooring",
        to: "/interior-renovations/vinyl-laminate",
      },
      { label: "Flooring installation", to: "/interior-renovations/flooring" },
    ],
  },
  {
    slug: "tile-vs-vinyl-bathrooms",
    title: "Tile or vinyl for a bathroom floor?",
    metaDescription:
      "Tile vs vinyl bathroom flooring compared — water performance, heated floors, durability, comfort and when each makes sense.",
    category: "Interior Planning",
    excerpt:
      "Both can work in a bathroom. Here is when tile is worth it and when vinyl is the smarter choice.",
    readMinutes: 4,
    published: PUBLISHED,
    updated: PUBLISHED,
    body: [
      {
        type: "p",
        text: "Bathroom floors need to handle water, humidity and daily traffic. Porcelain tile and vinyl plank are both suitable — with different strengths.",
      },
      { type: "h2", text: "Choose tile when" },
      {
        type: "list",
        items: [
          "You are doing a full renovation and want the most durable long-term floor.",
          "You want heated floors — electric mats work best under tile.",
          "The floor continues into a tiled shower for a seamless look.",
        ],
      },
      { type: "h2", text: "Choose vinyl when" },
      {
        type: "list",
        items: [
          "You are refreshing a bathroom without a full gut.",
          "You want a warmer, softer feel underfoot without in-floor heat.",
          "Floor height at the doorway is limited.",
        ],
      },
      { type: "h2", text: "Installation matters either way" },
      {
        type: "p",
        text: "Tile needs a stiff, flat substrate and a balanced layout. Vinyl needs a flat subfloor and careful sealing at the tub and toilet. Both need clean transitions at the doorway.",
      },
    ],
    services: [
      { label: "Tile", to: "/interior-renovations/tile" },
      { label: "Bathroom renovations", to: "/interior-renovations/bathrooms" },
    ],
  },
  {
    slug: "bathroom-renovation-cost-guide",
    title: "Planning a bathroom renovation: scope, sequence and budget",
    metaDescription:
      "How to plan a bathroom renovation — refresh vs full renovation, layout changes, selections, the construction sequence and what affects budget.",
    category: "Interior Planning",
    excerpt:
      "The decisions that shape your bathroom budget and schedule — made in the right order, before demolition begins.",
    readMinutes: 6,
    published: PUBLISHED,
    updated: PUBLISHED,
    body: [
      {
        type: "p",
        text: "Bathrooms pack more trades into less space than any other room. Most budget and schedule problems come from decisions made late. Here is how to plan in the right order.",
      },
      { type: "h2", text: "Refresh or full renovation?" },
      {
        type: "p",
        text: "If the tile and shower are sound, a refresh — new vanity, fixtures, lighting, mirror and paint — can transform the room for much less. If tile is cracked, grout is failing or there are signs of water behind the walls, a full renovation is usually the better investment.",
      },
      { type: "h2", text: "Keep the layout if you can" },
      {
        type: "p",
        text: "Moving a toilet, shower drain or vanity means relocating plumbing, which adds cost and time. Keeping fixtures in place is the biggest single way to control budget.",
      },
      { type: "h2", text: "Make selections before demolition" },
      {
        type: "p",
        text: "Tile, vanity, fixtures and glass should be chosen before work starts. Some items have long lead times, and rough-in plumbing depends on the exact fixtures you choose.",
      },
      { type: "h2", text: "The typical sequence" },
      {
        type: "list",
        items: [
          "Protection and demolition",
          "Plumbing and electrical rough-in by licensed trades",
          "Waterproofing",
          "Tile",
          "Vanity, toilet and fixtures",
          "Glass, mirrors, accessories and paint",
        ],
      },
      { type: "h2", text: "What affects budget most" },
      {
        type: "list",
        items: [
          "Layout changes and plumbing relocation",
          "Tile size, quantity and pattern complexity",
          "Custom glass enclosures",
          "Fixture and vanity selections",
          "Surprises behind walls in older homes",
        ],
      },
      {
        type: "p",
        text: "A good proposal itemizes each of these, so you can see exactly where the money goes and adjust before work begins.",
      },
    ],
    services: [
      { label: "Bathroom renovations", to: "/interior-renovations/bathrooms" },
      {
        label: "Showers & tub conversions",
        to: "/interior-renovations/showers-tubs",
      },
    ],
  },
  {
    slug: "how-to-choose-contractor-gta",
    title: "How to choose a renovation or landscaping contractor",
    metaDescription:
      "What to ask before hiring a contractor in Southern Ontario and the GTA — written scope, insurance, permits, schedule, payments and communication.",
    category: "Hiring & Process",
    excerpt:
      "The questions that separate a well-run project from a stressful one — and what a good answer sounds like.",
    readMinutes: 5,
    published: PUBLISHED,
    updated: PUBLISHED,
    body: [
      {
        type: "p",
        text: "Most project problems can be predicted before work begins. These questions help you compare contractors on more than price.",
      },
      { type: "h2", text: "Is the proposal written and itemized?" },
      {
        type: "p",
        text: "A one-line price leaves room for disagreement later. Look for scope, materials, exclusions and an estimated schedule in writing.",
      },
      { type: "h2", text: "Is the contractor insured?" },
      {
        type: "p",
        text: "Ask for proof of liability insurance. Confirm WSIB coverage where it applies to the contractor and their workers.",
      },
      { type: "h2", text: "Who handles permits and locates?" },
      {
        type: "p",
        text: "For decks, structural changes and some fences or walls, permits may be required. Every dig should start with an Ontario One Call utility locate. A good contractor raises these topics without being asked.",
      },
      { type: "h2", text: "How are payments structured?" },
      {
        type: "p",
        text: "Payments should be tied to clear milestones. Be cautious of requests for most of the price before work begins.",
      },
      { type: "h2", text: "Who is your point of contact?" },
      {
        type: "p",
        text: "Know who to call when a question comes up, and how you will be updated as the project progresses.",
      },
      { type: "h2", text: "Can they show relevant work?" },
      {
        type: "p",
        text: "Ask to see completed projects similar to yours and, where possible, speak with past clients.",
      },
    ],
    services: [
      { label: "Outdoor transformations", to: "/outdoor-services" },
      { label: "Interior renovations", to: "/interior-renovations" },
    ],
  },
  {
    slug: "what-to-expect-yard-makeover",
    title: "What to expect during a full yard transformation",
    metaDescription:
      "The stages of a full backyard transformation — planning, excavation, hardscape, structures, planting and lawn — and how to prepare your household.",
    category: "Outdoor Planning",
    excerpt:
      "The stages of a yard transformation, the order they happen in, and how to prepare your household for each.",
    readMinutes: 5,
    published: PUBLISHED,
    updated: PUBLISHED,
    body: [
      {
        type: "p",
        text: "A full yard transformation looks chaotic in the middle and calm at the end. Knowing the sequence makes the process far easier to live with.",
      },
      { type: "h2", text: "Planning" },
      {
        type: "p",
        text: "Site walk, layout, selections and a written proposal. Locates and permits are arranged before any digging.",
      },
      { type: "h2", text: "Excavation and grading" },
      {
        type: "p",
        text: "This is the loudest, messiest stage. Old surfaces come out, the yard is regraded, and bases for patios and walkways are dug. Expect machinery and material deliveries.",
      },
      { type: "h2", text: "Hardscape and structures" },
      {
        type: "p",
        text: "Base material is compacted, then patios, walkways, walls, decks and fences are built. The yard starts to take shape.",
      },
      { type: "h2", text: "Planting and lawn" },
      {
        type: "p",
        text: "Soil is added to beds, plants go in, and new sod is laid last so it is not damaged by the rest of the work.",
      },
      { type: "h2", text: "How to prepare" },
      {
        type: "list",
        items: [
          "Arrange for pets and children to have another outdoor space during the build.",
          "Clear the driveway area for material drops if needed.",
          "Let neighbours know about machinery and deliveries.",
          "Plan to water new sod and plants daily for the first weeks.",
        ],
      },
    ],
    services: [
      {
        label: "Full yard transformations",
        to: "/outdoor-services/yard-transformations",
      },
      {
        label: "Patios & outdoor living",
        to: "/outdoor-services/patios-outdoor-living",
      },
    ],
  },
  {
    slug: "project-timelines",
    title: "Realistic project timelines: what really sets the schedule",
    metaDescription:
      "What determines how long outdoor and interior projects take — permits, material lead times, weather, cure times and decisions.",
    category: "Hiring & Process",
    excerpt:
      "Most delays are predictable. Here is what actually controls the schedule, and how to keep your project moving.",
    readMinutes: 4,
    published: PUBLISHED,
    updated: PUBLISHED,
    body: [
      {
        type: "p",
        text: "Build time is only part of a project timeline. The rest is decided by approvals, materials, weather and decisions.",
      },
      { type: "h2", text: "Permits" },
      {
        type: "p",
        text: "Where a building permit is needed, approval time depends on the municipality and the season. Spring is the busiest period.",
      },
      { type: "h2", text: "Material lead times" },
      {
        type: "p",
        text: "Specific pavers, composite colours, tile, vanities and custom glass can take weeks to arrive. Choosing early keeps the schedule intact.",
      },
      { type: "h2", text: "Weather" },
      {
        type: "p",
        text: "Outdoor work pauses for heavy rain and frozen ground. Excavation and sod in particular depend on soil conditions.",
      },
      { type: "h2", text: "Cure and set times" },
      {
        type: "p",
        text: "Concrete footings, waterproofing membranes, tile adhesive and grout all need time before the next step.",
      },
      { type: "h2", text: "Decisions" },
      {
        type: "p",
        text: "Changes mid-project are sometimes worth it, but each one can shift the schedule. A complete plan up front is the best protection.",
      },
    ],
    services: [
      { label: "Outdoor transformations", to: "/outdoor-services" },
      { label: "Interior renovations", to: "/interior-renovations" },
    ],
  },
  {
    slug: "ontario-climate-landscaping",
    title: "Landscaping for the Southern Ontario climate",
    metaDescription:
      "How Southern Ontario's freeze-thaw cycles, clay soils, summer heat and snow load should shape plant choices, lawns and hardscape.",
    category: "Outdoor Planning",
    excerpt:
      "Freeze-thaw, clay soils, summer heat and road salt — and how to design a landscape that handles all of them.",
    readMinutes: 5,
    published: PUBLISHED,
    updated: PUBLISHED,
    body: [
      {
        type: "p",
        text: "A landscape that looks good in June but struggles by March was not designed for Ontario. These are the climate factors that matter most.",
      },
      { type: "h2", text: "Freeze-thaw" },
      {
        type: "p",
        text: "Repeated freezing and thawing heaves poorly built hardscape and shallow footings. Proper base depth, drainage and frost-depth footings are non-negotiable.",
      },
      { type: "h2", text: "Clay soils" },
      {
        type: "p",
        text: "Clay holds water and compacts easily. Amend beds with organic matter, avoid planting in low spots that stay wet, and grade lawns to shed water.",
      },
      { type: "h2", text: "Summer heat and dry spells" },
      {
        type: "p",
        text: "Kentucky Bluegrass can go dormant during extended dry periods and recovers when moisture returns. Mowing higher — around 2 to 3 inches — helps it handle heat.",
      },
      { type: "h2", text: "Snow and salt" },
      {
        type: "list",
        items: [
          "Leave space for snow storage beside driveways.",
          "Choose salt-tolerant plants near roads and walkways.",
          "Use pavers suited to de-icing exposure.",
        ],
      },
      { type: "h2", text: "Plant hardiness" },
      {
        type: "p",
        text: "Choose plants rated for your hardiness zone, and place them where their light and moisture needs are actually met.",
      },
    ],
    services: [
      { label: "Landscaping", to: "/outdoor-services/landscaping" },
      { label: "Lawn maintenance", to: "/outdoor-services/lawn-maintenance" },
    ],
  },
];

/** Retired slugs that should permanently point at their replacement. */
export const ARTICLE_REDIRECTS: Record<string, string> = {
  "standard-vs-premium-sod": "how-much-sod-do-i-need",
};

export function findArticle(slug: string) {
  return ARTICLES.find((a) => a.slug === slug);
}
