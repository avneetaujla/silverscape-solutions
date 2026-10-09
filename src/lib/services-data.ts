import { media, type MediaId } from "@/content/mediaCatalog";

export type Division = "outdoor" | "interior";

export type ServiceDetail = {
  slug: string;
  division: Division;
  title: string;
  /** Short label for nav, chips and lead-form options. */
  label: string;
  metaTitle: string;
  metaDescription: string;
  /** One-line result statement used under the H1. */
  tagline: string;
  /** Card copy on hubs and related lists. */
  summary: string;
  image: MediaId;
  intro: string[];
  outcomes: { t: string; d: string }[];
  scope: string[];
  planning: { t: string; d: string }[];
  process: { t: string; d: string }[];
  faq: { q: string; a: string }[];
  related: string[];
  articles: string[];
};

export const OUTDOOR: ServiceDetail[] = [
  {
    slug: "landscaping",
    division: "outdoor",
    title: "Landscaping",
    label: "Landscaping",
    metaTitle: "Landscaping in Guelph, Kitchener-Waterloo & the GTA",
    metaDescription:
      "Garden beds, planting, edging, mulch and finished lawns designed as one plan. Landscaping for homes in Guelph, Kitchener, Waterloo, Cambridge and the GTA.",
    tagline:
      "A front or back yard that looks intentional — not patched together.",
    summary:
      "Beds, planting, edging, soil and lawn planned as one composition, so the whole property reads finished.",
    image: "front-yard-garden-beds",
    intro: [
      "Good landscaping is less about adding plants and more about editing the property: clear bed lines, the right plant in the right light, and lawn edges that stay crisp through the season.",
      "We plan the layout, confirm plant and material choices with you in writing, then build it as one organized project — rather than a series of disconnected weekend fixes.",
    ],
    outcomes: [
      {
        t: "Curb appeal that holds",
        d: "Defined bed shapes and layered planting that still look deliberate in August.",
      },
      {
        t: "Less guesswork",
        d: "Plants chosen for your sun, soil and Ontario winters — not just what looks good at the garden centre.",
      },
      {
        t: "Lower ongoing effort",
        d: "Proper edging, soil and mulch depth reduce weeding and constant touch-ups.",
      },
    ],
    scope: [
      "Garden bed design and reshaping",
      "Shrub, perennial and tree planting",
      "Soil amendment and topsoil",
      "Steel, stone or spade-cut edging",
      "Mulch and decorative stone",
      "Lawn repair or new sod",
      "Front entry and foundation planting",
      "Removal of overgrown or failing plants",
    ],
    planning: [
      {
        t: "Sun and soil first",
        d: "Much of Southern Ontario sits on heavier clay soils. We plan amendments and plant choices around drainage, not against it.",
      },
      {
        t: "Phasing is fine",
        d: "Larger plans can be built in stages. We design the full picture first so each phase fits the next.",
      },
      {
        t: "Underground utilities",
        d: "Any digging starts with a free Ontario One Call locate. We handle the request before work begins.",
      },
    ],
    process: [
      {
        t: "Site walk",
        d: "We look at light, drainage, access and how you use the space.",
      },
      {
        t: "Written plan",
        d: "Layout, plant list, materials and price — itemized.",
      },
      {
        t: "Build",
        d: "Bed prep, planting, edging and finishing, with daily cleanup.",
      },
      {
        t: "Handover",
        d: "Walkthrough and watering guidance for the first weeks.",
      },
    ],
    faq: [
      {
        q: "When is the best time to plant in Southern Ontario?",
        a: "Spring and early fall are ideal for most shrubs, perennials and trees. Summer planting works with consistent watering.",
      },
      {
        q: "Can you work with plants I already have?",
        a: "Yes. We keep and relocate healthy plants where they fit the new layout and remove what is past saving.",
      },
      {
        q: "Do you offer design-only?",
        a: "Our plans are built to be installed by our crew. If you want a plan for a later phase, we can scope that during the site walk.",
      },
    ],
    related: ["yard-transformations", "sod-installation", "lawn-maintenance"],
    articles: ["landscaping-cost-guide-guelph", "ontario-climate-landscaping"],
  },
  {
    slug: "yard-transformations",
    division: "outdoor",
    title: "Full Yard Transformations",
    label: "Full yard transformation",
    metaTitle: "Full Backyard & Yard Transformations in Southern Ontario",
    metaDescription:
      "Complete yard transformations — grading, hardscape, planting, lawn and lighting — planned and built by one team across Guelph, KW, Cambridge and the GTA.",
    tagline:
      "One plan, one team, one finished property — from bare yard to outdoor room.",
    summary:
      "Grading, hardscape, planting, lawn and finishing coordinated as a single build — so every piece fits.",
    image: "backyard-firepit-pergola",
    intro: [
      "A full transformation is where the order of work matters most. Grading before hardscape, hardscape before planting, planting before the final lawn — done out of sequence, each trade undoes the last.",
      "We plan the entire yard first, then build it in the right order with one point of contact from the first site walk to the final walkthrough.",
    ],
    outcomes: [
      {
        t: "A yard you actually use",
        d: "Zones for dining, lounging, play and storage — laid out around how your household lives.",
      },
      {
        t: "Everything fits together",
        d: "Patio levels, steps, beds and lawn designed as one composition instead of separate projects.",
      },
      {
        t: "One schedule, one contact",
        d: "No juggling separate landscapers, deck builders and paving crews.",
      },
    ],
    scope: [
      "Site planning and layout",
      "Excavation, grading and drainage",
      "Patios, walkways and interlocking",
      "Decks, steps and landings",
      "Privacy fencing and screens",
      "Garden beds and planting",
      "New sod and lawn areas",
      "Low-voltage landscape lighting coordination",
    ],
    planning: [
      {
        t: "Plan the whole yard, build in phases",
        d: "If budget or timing calls for it, we design the complete layout and build it in logical stages.",
      },
      {
        t: "Access and machinery",
        d: "Side-yard width, fences and gates affect equipment and cost. We assess access on the site walk.",
      },
      {
        t: "Permits and bylaws",
        d: "Raised decks, some retaining walls and pool-adjacent work can need permits. We confirm requirements with your municipality before building.",
      },
    ],
    process: [
      {
        t: "Discovery",
        d: "How you want to use the yard, what must stay, what can go.",
      },
      {
        t: "Layout and proposal",
        d: "Zoned plan, materials and an itemized, written price.",
      },
      {
        t: "Sequenced build",
        d: "Grading, hardscape, structures, planting, then lawn.",
      },
      {
        t: "Final walkthrough",
        d: "Punch list, care guidance and a clean site.",
      },
    ],
    faq: [
      {
        q: "How long does a full yard transformation take?",
        a: "It depends on scope, access and weather. Your written proposal includes an estimated schedule, and we keep you updated as the build progresses.",
      },
      {
        q: "Do we need to be home during the work?",
        a: "No. We confirm access, water and power arrangements at the start and keep you updated as each stage finishes.",
      },
      {
        q: "Can you include a deck or fence in the same project?",
        a: "Yes — that is the point of a single plan. Decks, fences, patios and planting are scheduled as one build.",
      },
    ],
    related: ["patios-outdoor-living", "grading-drainage", "decks"],
    articles: ["what-to-expect-yard-makeover", "landscaping-cost-guide-guelph"],
  },
  {
    slug: "sod-installation",
    division: "outdoor",
    title: "Sod Installation",
    label: "Sod installation",
    metaTitle: "Professional Sod Installation — Guelph, KW & GTA",
    metaDescription:
      "Old turf removal, grading, topsoil and professionally laid Kentucky Bluegrass sod. Sod installation across Guelph, Kitchener, Waterloo, Cambridge and the GTA.",
    tagline:
      "A dense, level lawn from day one — prepared properly so it roots properly.",
    summary:
      "Removal, grading, soil prep and Kentucky Bluegrass sod laid tight, rolled and ready to establish.",
    image: "sod-laying",
    intro: [
      "Sod is only as good as what is underneath it. Most failed lawns come down to poor grading, compacted soil or sod left sitting on a pallet too long.",
      "Our installs start with removal and grading, add quality topsoil where needed, and lay Kentucky Bluegrass sod in tight, staggered seams so it knits together evenly.",
    ],
    outcomes: [
      {
        t: "Instant finished look",
        d: "A complete lawn the day we leave — no patchy seed stage.",
      },
      {
        t: "Better drainage",
        d: "Grade corrected away from the house before a single roll goes down.",
      },
      {
        t: "Faster establishment",
        d: "Good soil contact and proper watering guidance help sod root quickly.",
      },
    ],
    scope: [
      "Old turf and weed removal",
      "Rough and finish grading",
      "Topsoil supply and spreading",
      "Kentucky Bluegrass sod",
      "Tight, staggered seams and edge cuts",
      "Rolling for soil contact",
      "First-weeks watering guidance",
    ],
    planning: [
      {
        t: "Timing",
        d: "Spring through early fall is the best window in Southern Ontario. Summer installs need disciplined watering.",
      },
      {
        t: "Delivery-only option",
        d: "Laying it yourself? Order Kentucky Bluegrass sod delivered through our online portal.",
      },
      {
        t: "Shade",
        d: "Kentucky Bluegrass prefers sun. For heavily shaded areas we will talk through alternatives during the site walk.",
      },
    ],
    process: [
      { t: "Measure", d: "Confirm square footage, grade and access." },
      { t: "Prepare", d: "Remove old turf, grade and add topsoil." },
      { t: "Lay", d: "Install sod, cut edges and roll." },
      { t: "Establish", d: "Watering schedule and first-mow guidance." },
    ],
    faq: [
      {
        q: "Can I just buy sod and install it myself?",
        a: "Yes. Use the Order Sod portal for Kentucky Bluegrass delivered to your property.",
      },
      {
        q: "How soon can I walk on new sod?",
        a: "Keep foot traffic light for the first two to three weeks while roots establish.",
      },
      {
        q: "When should I mow new sod?",
        a: "Usually once the sod has rooted and resists a gentle tug — often two to three weeks after install.",
      },
    ],
    related: ["grading-drainage", "landscaping", "lawn-maintenance"],
    articles: ["how-much-sod-do-i-need", "sod-cost-southern-ontario"],
  },
  {
    slug: "grading-drainage",
    division: "outdoor",
    title: "Grading & Drainage",
    label: "Grading & drainage",
    metaTitle: "Yard Grading & Drainage Solutions — Southern Ontario",
    metaDescription:
      "Regrading, swales and drainage corrections that move water away from your foundation. Serving Guelph, Kitchener, Waterloo, Cambridge and the GTA.",
    tagline:
      "Water moving away from your home — and a yard that dries out after rain.",
    summary:
      "Regrading, swales and drainage corrections that protect your foundation and fix soggy lawns.",
    image: "yard-regrading-swale",
    intro: [
      "Pooling water, soggy lawns and wet basements often trace back to grading. Over time, settling soil and added beds can turn the slope back toward the house.",
      "We assess where water goes, correct the grade, and build the fix into the finished landscape so it looks like part of the yard — not an afterthought.",
    ],
    outcomes: [
      {
        t: "Foundation protection",
        d: "Positive slope away from the house to reduce water against the foundation.",
      },
      { t: "Usable lawn", d: "Fewer puddles and soft spots after heavy rain." },
      {
        t: "A base that lasts",
        d: "Patios, walkways and sod installed on a stable, correctly sloped base.",
      },
    ],
    scope: [
      "Drainage assessment",
      "Regrading around foundations",
      "Swales and surface drainage paths",
      "Downspout extension routing",
      "Topsoil and compaction",
      "Finish grade ready for sod or planting",
    ],
    planning: [
      {
        t: "Neighbouring properties",
        d: "Grading must not push water onto a neighbour's lot. We plan drainage paths that respect lot lines and municipal rules.",
      },
      {
        t: "Clay soils",
        d: "Common across the region, clay drains slowly. Grade and surface paths matter more than buried quick fixes.",
      },
      {
        t: "Basement concerns",
        d: "Grading helps with surface water. Active leaks may also need a foundation specialist — we will tell you if so.",
      },
    ],
    process: [
      {
        t: "Assess",
        d: "Walk the property, note low spots and downspout outlets.",
      },
      { t: "Plan", d: "Target grades and drainage paths in writing." },
      { t: "Regrade", d: "Excavate, reshape and compact." },
      {
        t: "Finish",
        d: "Topsoil and sod or planting to protect the new grade.",
      },
    ],
    faq: [
      {
        q: "How do I know if my yard needs regrading?",
        a: "Water pooling near the foundation, soil sloping toward the house, or a lawn that stays soggy days after rain are common signs.",
      },
      {
        q: "Can grading be combined with new sod?",
        a: "Yes, and it should be. Correcting the grade right before sod gives you a level, well-drained lawn.",
      },
      {
        q: "Do you install French drains?",
        a: "Where surface grading is not enough, we discuss subsurface options during the assessment and include them in the written proposal if appropriate.",
      },
    ],
    related: ["sod-installation", "yard-transformations", "interlocking"],
    articles: ["ontario-climate-landscaping", "what-to-expect-yard-makeover"],
  },
  {
    slug: "decks",
    division: "outdoor",
    title: "Decks",
    label: "Deck",
    metaTitle: "Custom Deck Builders — Guelph, Kitchener-Waterloo & GTA",
    metaDescription:
      "Pressure-treated, cedar and composite decks with railings, stairs and lighting — designed for Ontario weather. Serving Guelph, KW, Cambridge and the GTA.",
    tagline:
      "An outdoor room built to the same standard as the inside of your home.",
    summary:
      "Pressure-treated, cedar and composite decks with railings, stairs and lighting designed around how you entertain.",
    image: "raised-composite-deck",
    intro: [
      "A deck should feel like an extension of the house: the right height off the door, comfortable stairs, railings that do not block the view, and framing that will not move after a few freeze-thaw cycles.",
      "We design the layout with you, confirm permit requirements, and build on footings sized for Ontario frost.",
    ],
    outcomes: [
      {
        t: "More living space",
        d: "Room for dining and lounging sized around your furniture, not leftovers.",
      },
      {
        t: "Built for frost",
        d: "Footings and framing designed for freeze-thaw, so the deck stays level.",
      },
      {
        t: "Lower upkeep options",
        d: "Composite and capped boards that skip the yearly stain cycle.",
      },
    ],
    scope: [
      "Layout and design",
      "Permit drawings and applications where required",
      "Footings and structural framing",
      "Pressure-treated, cedar or composite decking",
      "Aluminum, glass or wood railings",
      "Stairs, landings and multi-level designs",
      "Privacy screens and skirting",
      "Low-voltage step and post lighting",
    ],
    planning: [
      {
        t: "Permits",
        d: 'Ontario decks more than 600 mm (about 24") above grade, or attached to the house, typically need a building permit. We confirm with your municipality.',
      },
      {
        t: "Composite vs wood",
        d: "Composite costs more up front but avoids staining and splinters. Pressure-treated and cedar cost less and need regular maintenance.",
      },
      {
        t: "Deck or patio?",
        d: "If your back door is close to grade, a patio may serve you better. We will tell you honestly.",
      },
    ],
    process: [
      { t: "Design", d: "Size, height, stairs and materials." },
      { t: "Permit", d: "Drawings and municipal approval where required." },
      { t: "Build", d: "Footings, framing, decking and railings." },
      { t: "Finish", d: "Trim, skirting, lighting and final inspection." },
    ],
    faq: [
      {
        q: "Do I need a permit for my deck?",
        a: "Often, yes — particularly for raised or attached decks. Requirements vary by municipality; we confirm before building.",
      },
      {
        q: "Can you replace boards on an existing frame?",
        a: "If the existing framing is sound and to code, resurfacing can be an option. We inspect it first.",
      },
      {
        q: "What railing options are available?",
        a: "Pressure-treated or cedar wood, aluminum pickets, glass panels and cable. We help match the style of the home.",
      },
    ],
    related: ["patios-outdoor-living", "fences", "yard-transformations"],
    articles: ["deck-vs-patio", "how-to-choose-contractor-gta"],
  },
  {
    slug: "fences",
    division: "outdoor",
    title: "Fences",
    label: "Fence",
    metaTitle:
      "Fence Installation — Privacy & Modern Fences | Southern Ontario",
    metaDescription:
      "Privacy, horizontal and modern fences with properly set posts and gates that close. Fence installation in Guelph, Kitchener, Waterloo, Cambridge and the GTA.",
    tagline:
      "Privacy that looks architectural — straight lines, solid posts, gates that close.",
    summary:
      "Privacy, horizontal and modern fences with posts set for frost and gates that keep closing years later.",
    image: "horizontal-privacy-fence",
    intro: [
      "A fence is mostly about the parts you cannot see: post depth, spacing and gate framing. Get those wrong and the fence leans and gates sag within a few winters.",
      "We confirm lot lines and bylaw heights, set posts properly, and finish with clean tops, caps and hardware.",
    ],
    outcomes: [
      {
        t: "Real privacy",
        d: "Board spacing and height chosen for your sightlines.",
      },
      {
        t: "Straight for years",
        d: "Posts set below the frost line and braced gates that do not drag.",
      },
      {
        t: "Designed, not generic",
        d: "Horizontal boards, modern posts and finishes that suit the house.",
      },
    ],
    scope: [
      "Layout and post locations",
      "Horizontal and vertical privacy fencing",
      "Pressure-treated and cedar boards",
      "Aluminum and metal-post systems",
      "Single and double gates with hardware",
      "Removal and disposal of old fencing",
    ],
    planning: [
      {
        t: "Property lines",
        d: "We work from your survey or confirmed lot markers. Shared fences often benefit from a conversation with neighbours first.",
      },
      {
        t: "Height bylaws",
        d: "Most municipalities cap backyard fences at around 6 to 8 feet, with lower limits in front yards. We confirm your local rules.",
      },
      {
        t: "Pools",
        d: "Pool enclosures have specific bylaw requirements for height, gaps and self-closing gates.",
      },
    ],
    process: [
      { t: "Layout", d: "Confirm lines, heights and gate locations." },
      { t: "Posts", d: "Locates, then posts set below frost depth." },
      { t: "Panels", d: "Rails, boards and gates installed." },
      { t: "Finish", d: "Caps, hardware and final adjustments." },
    ],
    faq: [
      {
        q: "How tall can my fence be?",
        a: "It depends on your municipality and whether it is a front or back yard. We confirm the bylaw before quoting.",
      },
      {
        q: "Can you reuse my existing posts?",
        a: "Only if they are sound and plumb. Leaning or rotting posts are almost always replaced.",
      },
      {
        q: "Should I stain a new wood fence?",
        a: "Yes, after the wood has dried — usually later the same season. Stain protects against UV and moisture.",
      },
    ],
    related: ["decks", "landscaping", "custom-exterior"],
    articles: ["how-to-choose-contractor-gta", "what-to-expect-yard-makeover"],
  },
  {
    slug: "interlocking",
    division: "outdoor",
    title: "Interlocking & Pavers",
    label: "Interlocking / pavers",
    metaTitle: "Interlocking Driveways, Walkways & Patios — Southern Ontario",
    metaDescription:
      "Interlocking driveways, walkways, steps and patios built on a properly compacted base. Serving Guelph, Kitchener, Waterloo, Cambridge and the GTA.",
    tagline: "Stonework that stays level through Ontario winters.",
    summary:
      "Driveways, walkways, steps and patios built on a properly excavated, compacted base — the part that decides how long it lasts.",
    image: "herringbone-driveway",
    intro: [
      "Interlocking fails from the bottom up. Shallow excavation, thin or poorly compacted base and missing edge restraint are why pavers heave, sink and spread after a few freeze-thaw cycles.",
      "We excavate to the depth the use calls for — deeper for driveways — compact in lifts, and lock everything in with edge restraint and joint sand.",
    ],
    outcomes: [
      {
        t: "Instant curb appeal",
        d: "A driveway or entry that changes how the whole house reads from the street.",
      },
      {
        t: "Level for years",
        d: "Proper base depth and compaction for vehicle or foot traffic.",
      },
      {
        t: "Repairable",
        d: "Individual pavers can be lifted and reset — unlike cracked concrete.",
      },
    ],
    scope: [
      "Driveway interlocking",
      "Walkways and front entries",
      "Steps and landings",
      "Patios",
      "Borders, banding and inlays",
      "Low retaining and seat walls",
      "Re-leveling and repairs",
    ],
    planning: [
      {
        t: "Freeze-thaw",
        d: "Choose pavers suited to Ontario winters and de-icing. We recommend options suited to your use.",
      },
      {
        t: "Driveway widening",
        d: "Many municipalities regulate driveway width and curb cuts. We check before quoting.",
      },
      {
        t: "Drainage",
        d: "Hard surfaces move water. We slope away from the house and plan where the water goes.",
      },
    ],
    process: [
      { t: "Layout", d: "Pattern, borders and levels confirmed." },
      { t: "Excavate and base", d: "Dig to depth, compact base in lifts." },
      { t: "Lay", d: "Pavers, cuts and edge restraint." },
      { t: "Finish", d: "Joint sand, compaction and cleanup." },
    ],
    faq: [
      {
        q: "Interlocking or concrete for a driveway?",
        a: "Interlocking costs more up front but is repairable piece by piece and does not crack as one slab.",
      },
      {
        q: "Why are some interlocking driveways sinking?",
        a: "Almost always a base problem — insufficient depth, compaction or edge restraint.",
      },
      {
        q: "Do pavers need sealing?",
        a: "Sealing is optional. It can deepen colour and resist stains but needs periodic reapplication.",
      },
    ],
    related: [
      "patios-outdoor-living",
      "grading-drainage",
      "yard-transformations",
    ],
    articles: ["best-interlocking-ontario-weather", "deck-vs-patio"],
  },
  {
    slug: "patios-outdoor-living",
    division: "outdoor",
    title: "Patios & Outdoor Living",
    label: "Patio / outdoor living",
    metaTitle: "Patios & Outdoor Living Spaces — Guelph, KW & GTA",
    metaDescription:
      "Stone and paver patios, seating areas, fire features and outdoor rooms designed around how you entertain. Serving Guelph, Kitchener-Waterloo, Cambridge and the GTA.",
    tagline:
      "Outdoor space planned like a room — for dinners, fires and quiet mornings.",
    summary:
      "Patios, seating walls, fire areas and lighting arranged into outdoor rooms you will use all season.",
    image: "patio-dining-lounge",
    intro: [
      "The best outdoor spaces are planned like interior rooms: a dining zone near the kitchen door, a lounge area with a view, clear paths between them and lighting for the evening.",
      "We lay out the zones around your furniture and routines, then build them on bases that stay level.",
    ],
    outcomes: [
      {
        t: "Room to host",
        d: "Patio sizes based on real furniture and circulation space.",
      },
      {
        t: "Evening use",
        d: "Lighting and fire features that extend the day.",
      },
      {
        t: "A finished frame",
        d: "Planting, walls and screens that make the space feel enclosed and private.",
      },
    ],
    scope: [
      "Paver and natural stone patios",
      "Seat walls and low retaining walls",
      "Fire pit areas",
      "Pathways linking outdoor zones",
      "Pergola and shade structure coordination",
      "Low-voltage lighting coordination",
      "Surrounding planting",
    ],
    planning: [
      {
        t: "Size for furniture",
        d: "A dining set for six needs much more space than the table itself. We plan around your actual pieces.",
      },
      {
        t: "Fire features",
        d: "Open-air fire rules differ by municipality. We confirm what is permitted where you live.",
      },
      {
        t: "Sun and wind",
        d: "Placement relative to afternoon sun and prevailing wind affects how often you use the space.",
      },
    ],
    process: [
      { t: "Zone plan", d: "Dining, lounging, paths and views." },
      { t: "Proposal", d: "Materials, layout and written price." },
      { t: "Build", d: "Base, hardscape, walls and features." },
      { t: "Finish", d: "Planting, lighting and cleanup." },
    ],
    faq: [
      {
        q: "Can a patio connect to an existing deck?",
        a: "Yes. Stepping down from a deck to a patio is a common way to create two distinct zones.",
      },
      {
        q: "Natural stone or pavers?",
        a: "Natural stone has an organic look; pavers offer consistent sizing and colour. Both last when installed on a proper base.",
      },
      {
        q: "Do you install outdoor lighting?",
        a: "We plan and coordinate low-voltage lighting as part of the build. Any line-voltage electrical work is done by a licensed electrician.",
      },
    ],
    related: ["interlocking", "decks", "yard-transformations"],
    articles: ["deck-vs-patio", "best-interlocking-ontario-weather"],
  },
  {
    slug: "lawn-maintenance",
    division: "outdoor",
    title: "Lawn Maintenance & Property Upkeep",
    label: "Lawn maintenance / upkeep",
    metaTitle: "Lawn Maintenance & Seasonal Property Upkeep — Southern Ontario",
    metaDescription:
      "Mowing, edging, spring and fall cleanups, aeration and overseeding to keep your property looking finished. Serving Guelph, KW, Cambridge and the GTA.",
    tagline: "Keep the finished look — without giving up your weekends.",
    summary:
      "Mowing, edging, cleanups, aeration and seasonal care that protect the investment in your property.",
    image: "striped-lawn",
    intro: [
      "A new landscape only stays impressive if it is maintained. Crisp edges, healthy turf and tidy beds are what separate a cared-for property from one that is slowly sliding back.",
      "We offer recurring maintenance and one-time seasonal cleanups, scoped in writing so you know exactly what is included.",
    ],
    outcomes: [
      {
        t: "Consistently sharp",
        d: "Regular mowing and edging keep lines clean all season.",
      },
      {
        t: "Healthier lawn",
        d: "Aeration and overseeding at the right times of year.",
      },
      {
        t: "Protected investment",
        d: "New sod and planting get the care they need to establish.",
      },
    ],
    scope: [
      "Mowing and trimming",
      "Edging and bed maintenance",
      "Spring and fall cleanups",
      "Core aeration and overseeding",
      "Hedge and shrub trimming",
      "Leaf removal",
      "Mulch refresh",
    ],
    planning: [
      {
        t: "Seasonal timing",
        d: "Aeration and overseeding work best in late summer to early fall in Southern Ontario.",
      },
      {
        t: "Mowing height",
        d: "Kentucky Bluegrass does best mowed higher — around 2 to 3 inches — especially in summer heat.",
      },
      {
        t: "Availability",
        d: "Recurring routes depend on location. Ask about availability in your area.",
      },
    ],
    process: [
      { t: "Walkthrough", d: "Property size, priorities and access." },
      { t: "Scope", d: "Frequency and services confirmed in writing." },
      { t: "Maintain", d: "Recurring visits on a set schedule." },
      { t: "Review", d: "Seasonal check-in to adjust the plan." },
    ],
    faq: [
      {
        q: "Do you offer one-time cleanups?",
        a: "Yes. Spring and fall cleanups are available without an ongoing contract, subject to scheduling.",
      },
      {
        q: "Do I need to be home for visits?",
        a: "No, as long as we have gate access and know about pets.",
      },
      {
        q: "Do you apply fertilizer or weed control?",
        a: "Ask us during the walkthrough. Ontario restricts cosmetic pesticide use, and we will explain what is permitted for your lawn.",
      },
    ],
    related: ["landscaping", "sod-installation", "custom-exterior"],
    articles: ["ontario-climate-landscaping", "how-much-sod-do-i-need"],
  },
  {
    slug: "custom-exterior",
    division: "outdoor",
    title: "Custom Exterior Projects",
    label: "Custom exterior project",
    metaTitle: "Custom Exterior & Outdoor Projects — Southern Ontario",
    metaDescription:
      "Custom outdoor work that does not fit a standard category — garden structures, entry upgrades, screens and more. Serving Guelph, KW, Cambridge and the GTA.",
    tagline: "For the project that does not fit neatly in a category.",
    summary:
      "Entry upgrades, garden structures, privacy screens and other custom exterior work, scoped around your property.",
    image: "covered-porch",
    intro: [
      "Not every exterior project fits a standard service. A front entry rebuild, a privacy screen around a hot tub, a garden structure or a combination of small fixes can make a big difference.",
      "Tell us what you have in mind. We will tell you honestly whether it is a fit, and if it is, scope it in writing like any other project.",
    ],
    outcomes: [
      {
        t: "Solved properly",
        d: "Odd-shaped problems planned and built with the same care as a full project.",
      },
      {
        t: "Fits the property",
        d: "Materials and details matched to the home and existing landscape.",
      },
      { t: "One contact", d: "Small multi-part jobs coordinated by one team." },
    ],
    scope: [
      "Front entry and step upgrades",
      "Privacy screens and hot tub surrounds",
      "Garden structures and planters",
      "Side-yard and storage solutions",
      "Small hardscape repairs",
      "Multi-part exterior refreshes",
    ],
    planning: [
      {
        t: "Describe the goal",
        d: "Photos and a short description in the quote form help us prepare for the site walk.",
      },
      {
        t: "Honest fit",
        d: "If a specialist is better suited — roofing or structural work, for example — we will say so.",
      },
      {
        t: "Permits",
        d: "Some structures need permits. We confirm before building.",
      },
    ],
    process: [
      { t: "Conversation", d: "What you want to fix or add." },
      { t: "Site walk", d: "Measure, assess and confirm feasibility." },
      { t: "Proposal", d: "Written scope and price." },
      { t: "Build", d: "Scheduled, completed and cleaned up." },
    ],
    faq: [
      {
        q: "Is there a minimum project size?",
        a: "Tell us about the project and we will let you know whether we can schedule it.",
      },
      {
        q: "Can you combine several small jobs?",
        a: "Yes — grouping small exterior tasks into one visit is often the most efficient approach.",
      },
      {
        q: "Do you do structural or roofing work?",
        a: "No. We focus on landscape, hardscape and exterior carpentry, and will tell you if another trade is the right call.",
      },
    ],
    related: ["fences", "decks", "landscaping"],
    articles: ["how-to-choose-contractor-gta", "project-timelines"],
  },
];

export const INTERIOR: ServiceDetail[] = [
  {
    slug: "flooring",
    division: "interior",
    title: "Flooring Installation",
    label: "Flooring",
    metaTitle:
      "Flooring Installation — Vinyl, Laminate & Tile | Southern Ontario",
    metaDescription:
      "Vinyl plank, laminate and tile flooring installed over properly prepared subfloors, with clean trim and transitions. Guelph, Kitchener-Waterloo, Cambridge and the GTA.",
    tagline:
      "Floors that feel built in — flat, quiet and finished at every edge.",
    summary:
      "Vinyl, laminate and tile installed over a properly prepared subfloor, with trim and transitions that look intentional.",
    image: "living-room-oak-floor",
    intro: [
      "New flooring changes how a home feels more than almost any other single upgrade. It also exposes every shortcut — uneven subfloors telegraph through, and sloppy transitions catch the eye in every doorway.",
      "We start with the subfloor, plan layout and transitions room by room, and finish with trim that makes the floor look like it was always there.",
    ],
    outcomes: [
      {
        t: "One continuous look",
        d: "Consistent flooring and transitions that tie rooms together.",
      },
      {
        t: "Flat and quiet",
        d: "Subfloor prep and underlayment that reduce hollow spots and squeaks.",
      },
      {
        t: "Clean edges",
        d: "Baseboard, quarter-round and transitions finished properly.",
      },
    ],
    scope: [
      "Luxury vinyl plank (LVP) and rigid-core vinyl",
      "Laminate flooring",
      "Porcelain and ceramic tile",
      "Removal of existing flooring",
      "Subfloor leveling and repair",
      "Underlayment",
      "Stairs and nosings",
      "Baseboards, trim and transitions",
    ],
    planning: [
      {
        t: "Choose by room",
        d: "Vinyl for moisture-prone areas, laminate for a realistic wood look in living spaces, tile for bathrooms and entries.",
      },
      {
        t: "Acclimation and lead times",
        d: "Some materials need time in the home before install. We schedule around delivery and acclimation.",
      },
      {
        t: "Moving furniture",
        d: "Tell us what needs moving. We plan room order so the house stays livable.",
      },
    ],
    process: [
      {
        t: "Measure",
        d: "Room measurements, subfloor check and material selection.",
      },
      { t: "Proposal", d: "Material, prep and trim — itemized." },
      { t: "Prepare", d: "Remove old flooring, level and repair subfloor." },
      {
        t: "Install and finish",
        d: "Flooring, trim, transitions and cleanup.",
      },
    ],
    faq: [
      {
        q: "Can new flooring go over my existing floor?",
        a: "Sometimes. It depends on the condition and height of the existing floor. We inspect before recommending.",
      },
      {
        q: "Which flooring is best for basements?",
        a: "Vinyl plank is usually the safest choice below grade because it tolerates moisture well.",
      },
      {
        q: "Do you supply the flooring?",
        a: "We can supply materials or install flooring you have purchased. We will confirm compatibility either way.",
      },
    ],
    related: ["vinyl-laminate", "tile", "bathrooms"],
    articles: ["vinyl-vs-laminate", "tile-vs-vinyl-bathrooms"],
  },
  {
    slug: "vinyl-laminate",
    division: "interior",
    title: "Vinyl & Laminate Flooring",
    label: "Vinyl / laminate flooring",
    metaTitle:
      "Vinyl Plank & Laminate Flooring Installation — Southern Ontario",
    metaDescription:
      "Luxury vinyl plank, rigid-core and laminate flooring installed with proper prep and finishing. Guelph, Kitchener-Waterloo, Cambridge and the GTA.",
    tagline:
      "The look of wood, the durability of modern materials — installed properly.",
    summary:
      "Luxury vinyl plank, rigid-core vinyl and laminate — durable, realistic and installed with proper expansion and trim.",
    image: "vinyl-plank-install",
    intro: [
      "Vinyl plank and laminate have become the practical choice for busy households: realistic wood looks, strong wear layers and much easier upkeep than hardwood.",
      "The difference between a floor that looks premium and one that looks cheap is mostly in the install — subfloor flatness, expansion gaps and how transitions are handled.",
    ],
    outcomes: [
      {
        t: "Family-proof",
        d: "Wear layers built for kids, pets and daily traffic.",
      },
      {
        t: "Moisture confidence",
        d: "Vinyl options suited to kitchens, laundry rooms and basements.",
      },
      {
        t: "Seamless flow",
        d: "Whole-floor installs with consistent direction and minimal transitions.",
      },
    ],
    scope: [
      "Luxury vinyl plank (LVP)",
      "Rigid-core (SPC) vinyl",
      "Laminate flooring",
      "Subfloor leveling",
      "Underlayment",
      "Stair treads and nosings",
      "Trim and transitions",
    ],
    planning: [
      {
        t: "Vinyl or laminate?",
        d: "Vinyl wins on water resistance; laminate often feels more like real wood underfoot. Many homes use both.",
      },
      {
        t: "Flatness matters",
        d: "Click-lock floors need a flat subfloor. High and low spots are corrected before install.",
      },
      {
        t: "Expansion gaps",
        d: "Floating floors move with temperature. Proper gaps hidden under trim prevent buckling.",
      },
    ],
    process: [
      { t: "Select", d: "Product, colour and plank direction." },
      { t: "Prep", d: "Remove old floor, level subfloor." },
      { t: "Install", d: "Underlayment and click-lock planks." },
      { t: "Finish", d: "Trim, transitions and cleanup." },
    ],
    faq: [
      {
        q: "Is vinyl plank waterproof?",
        a: "Many rigid-core vinyl products are highly water-resistant at the surface. Standing water should still be cleaned up promptly.",
      },
      {
        q: "Can laminate go in a kitchen?",
        a: "Some water-resistant laminates can. For areas with frequent spills, vinyl is usually the safer choice.",
      },
      {
        q: "How long does installation take?",
        a: "It depends on square footage, prep and stairs. Your proposal includes an estimated schedule.",
      },
    ],
    related: ["flooring", "tile", "bathrooms"],
    articles: ["vinyl-vs-laminate", "project-timelines"],
  },
  {
    slug: "tile",
    division: "interior",
    title: "Tile Flooring & Tile Work",
    label: "Tile",
    metaTitle:
      "Tile Installation — Floors, Showers & Feature Walls | Southern Ontario",
    metaDescription:
      "Porcelain and ceramic tile for floors, showers, backsplashes and feature walls, with balanced layouts and proper waterproofing. Guelph, KW, Cambridge and the GTA.",
    tagline:
      "Layouts that line up, grout that reads clean, and waterproofing you never think about.",
    summary:
      "Floor and wall tile with planned layouts, flat transitions and proper waterproofing where water is involved.",
    image: "marble-tile-shower",
    intro: [
      "Tile work shows everything. A good layout balances cuts at both walls, centres patterns on focal points, and keeps grout lines straight across the whole room.",
      "In wet areas, the waterproofing behind the tile matters even more than the tile itself. We use proper membranes and details so showers stay sealed.",
    ],
    outcomes: [
      {
        t: "Balanced layouts",
        d: "Cuts planned so no wall ends with a sliver.",
      },
      {
        t: "Flat, lippage-free floors",
        d: "Large-format tile set flat and level.",
      },
      {
        t: "Sealed wet areas",
        d: "Waterproofing done properly behind every shower wall.",
      },
    ],
    scope: [
      "Porcelain and ceramic floor tile",
      "Large-format tile",
      "Shower walls and floors",
      "Backsplashes",
      "Feature and accent walls",
      "Niches and benches",
      "Waterproofing membranes",
      "Electric in-floor heating with licensed electrical connection",
    ],
    planning: [
      {
        t: "Large-format tile",
        d: "Big tiles need a flatter substrate. We plan prep accordingly.",
      },
      {
        t: "Heated floors",
        d: "Electric heating mats go in before tile. The final connection is completed by a licensed electrician.",
      },
      {
        t: "Grout choice",
        d: "Grout colour and type affect how clean the floor reads and how easy it is to maintain.",
      },
    ],
    process: [
      { t: "Layout", d: "Dry layout to balance cuts." },
      { t: "Prep", d: "Substrate, membranes and heating if included." },
      { t: "Set", d: "Tile set flat and aligned." },
      { t: "Grout and seal", d: "Grout, silicone transitions and cleanup." },
    ],
    faq: [
      {
        q: "Do you install heated tile floors?",
        a: "Yes. Electric heating systems are installed under tile; the electrical connection is completed by a licensed electrician.",
      },
      {
        q: "Can tile go over existing tile?",
        a: "Occasionally, if the existing tile is sound and height allows. In most renovations we remove it.",
      },
      {
        q: "Do I need to seal porcelain tile?",
        a: "Porcelain itself typically does not need sealing. Cement-based grout can benefit from sealing.",
      },
    ],
    related: ["bathrooms", "showers-tubs", "flooring"],
    articles: ["tile-vs-vinyl-bathrooms", "bathroom-renovation-cost-guide"],
  },
  {
    slug: "bathrooms",
    division: "interior",
    title: "Bathroom Renovations",
    label: "Bathroom renovation",
    metaTitle: "Bathroom Renovations — Guelph, Kitchener-Waterloo & GTA",
    metaDescription:
      "Full bathroom renovations from demolition to finishing — tile, showers, tubs, vanities, fixtures and flooring — coordinated by one team. Guelph, KW, Cambridge and the GTA.",
    tagline:
      "From demolition to the last bead of silicone — one team, one plan.",
    summary:
      "Full renovations covering demolition, flooring, tile, showers and tubs, vanities, fixtures and finishing.",
    image: "bathroom-floating-vanity",
    intro: [
      "A bathroom renovation involves more trades in less space than any other room. Demolition, plumbing, electrical, waterproofing, tile, fixtures and finishing all need to happen in the right order.",
      "We plan the layout and selections with you up front, coordinate every trade on one schedule, and keep the work area protected from the rest of the home.",
    ],
    outcomes: [
      {
        t: "A room that works",
        d: "Storage, lighting and layout planned around daily routines.",
      },
      {
        t: "Built to stay dry",
        d: "Waterproofing and ventilation done right behind the finishes.",
      },
      {
        t: "One accountable team",
        d: "No juggling a plumber, tiler and finisher yourself.",
      },
    ],
    scope: [
      "Full demolition and disposal",
      "Plumbing and electrical by licensed trades",
      "Waterproofing and membranes",
      "Floor and wall tile",
      "Shower and tub installation or conversion",
      "Vanities, countertops and fixtures",
      "Lighting and ventilation upgrades",
      "Paint, trim, mirrors and accessories",
    ],
    planning: [
      {
        t: "Selections early",
        d: "Choosing tile, vanity and fixtures before demolition keeps the schedule moving and avoids lead-time delays.",
      },
      {
        t: "Layout changes",
        d: "Moving a toilet or drain adds plumbing work. Keeping the layout usually costs less.",
      },
      {
        t: "Second bathroom",
        d: "If this is your only bathroom, we plan the schedule to keep downtime as short as possible.",
      },
    ],
    process: [
      { t: "Design", d: "Layout, selections and itemized proposal." },
      {
        t: "Demolition",
        d: "Protect the home, remove to the studs where needed.",
      },
      { t: "Rough-in", d: "Plumbing, electrical and waterproofing." },
      { t: "Finish", d: "Tile, fixtures, vanity, trim and cleanup." },
    ],
    faq: [
      {
        q: "How long does a bathroom renovation take?",
        a: "It depends on scope, layout changes and material lead times. Your proposal includes a schedule before work starts.",
      },
      {
        q: "Do you handle plumbing and electrical?",
        a: "Yes, coordinated as part of the project and completed by appropriately licensed trades.",
      },
      {
        q: "Can you work with fixtures I have already bought?",
        a: "Usually. We confirm compatibility and rough-in requirements before demolition.",
      },
    ],
    related: ["showers-tubs", "vanities-fixtures", "tile"],
    articles: ["bathroom-renovation-cost-guide", "tile-vs-vinyl-bathrooms"],
  },
  {
    slug: "showers-tubs",
    division: "interior",
    title: "Showers & Tub Conversions",
    label: "Shower / tub",
    metaTitle: "Walk-In Showers & Tub-to-Shower Conversions — Southern Ontario",
    metaDescription:
      "Walk-in tile showers, tub-to-shower conversions and new tub installs with proper waterproofing. Guelph, Kitchener-Waterloo, Cambridge and the GTA.",
    tagline: "A shower or tub you look forward to — and that stays watertight.",
    summary:
      "Walk-in tile showers, tub-to-shower conversions and new tubs, built on proper waterproofing.",
    image: "curbless-shower-tub",
    intro: [
      "Replacing a dated tub surround with a tiled walk-in shower is one of the most noticeable bathroom upgrades — and one of the easiest to get wrong behind the walls.",
      "We handle demolition, drain and valve changes through licensed plumbers, waterproofing, tile and glass coordination as one sequence.",
    ],
    outcomes: [
      {
        t: "Easier daily use",
        d: "Lower or no curbs, built-in niches and benches where they make sense.",
      },
      {
        t: "Waterproof by design",
        d: "Continuous membranes and properly sloped floors.",
      },
      { t: "A cleaner look", d: "Tile, glass and fixtures chosen as a set." },
    ],
    scope: [
      "Tub and surround removal",
      "Tub-to-shower conversions",
      "Walk-in and low-curb showers",
      "Freestanding or alcove tub installation",
      "Waterproofing and sloped shower floors",
      "Niches and benches",
      "Valve and drain updates by licensed plumbers",
      "Glass enclosure coordination",
    ],
    planning: [
      {
        t: "Keep a tub somewhere?",
        d: "If this is the only tub in the home, consider whether you will want one for young children or resale.",
      },
      {
        t: "Glass lead times",
        d: "Custom glass is measured after tile is finished, which adds time at the end of the project.",
      },
      {
        t: "Curbless showers",
        d: "True curbless showers may require floor modification. We assess feasibility on site.",
      },
    ],
    process: [
      { t: "Plan", d: "Size, layout, niches, fixtures and glass." },
      { t: "Remove", d: "Tub or shower removed, walls opened." },
      { t: "Rough-in and waterproof", d: "Valve, drain and membrane." },
      { t: "Finish", d: "Tile, fixtures and glass." },
    ],
    faq: [
      {
        q: "Can my tub become a walk-in shower?",
        a: "In most standard alcoves, yes. The drain location and floor structure determine the details.",
      },
      {
        q: "How long before I can use the new shower?",
        a: "Waterproofing, tile and grout need cure time, and glass is installed last. Your schedule will show the expected date.",
      },
      {
        q: "Do you install glass enclosures?",
        a: "We coordinate measuring and installation of glass as part of the project.",
      },
    ],
    related: ["bathrooms", "tile", "vanities-fixtures"],
    articles: ["bathroom-renovation-cost-guide", "project-timelines"],
  },
  {
    slug: "vanities-fixtures",
    division: "interior",
    title: "Vanities, Fixtures & Finishing",
    label: "Vanity / fixtures / finishing",
    metaTitle:
      "Bathroom Vanity, Fixture & Finishing Upgrades — Southern Ontario",
    metaDescription:
      "Vanity replacement, faucets, toilets, mirrors, lighting and finishing details for bathrooms that need a refresh, not a full gut. Guelph, KW, Cambridge and the GTA.",
    tagline: "A noticeably better bathroom — without a full gut renovation.",
    summary:
      "Vanities, faucets, toilets, mirrors, lighting and trim — the finishing upgrades that change how a bathroom feels.",
    image: "white-oak-vanity",
    intro: [
      "Not every bathroom needs to be taken down to the studs. A new vanity, updated fixtures, better lighting and clean finishing can transform a sound but dated room in far less time.",
      "We help you choose what to change for the biggest difference, then install it with the same attention to detail as a full renovation.",
    ],
    outcomes: [
      {
        t: "Faster refresh",
        d: "Visible improvement with less downtime than a full renovation.",
      },
      {
        t: "Better storage and light",
        d: "Vanity and lighting choices that make the room easier to use.",
      },
      {
        t: "Finished properly",
        d: "Clean caulking, trim and paint at every edge.",
      },
    ],
    scope: [
      "Vanity and countertop replacement",
      "Faucets and shower trim",
      "Toilet replacement",
      "Mirrors and medicine cabinets",
      "Light fixtures (connected by licensed electricians)",
      "Exhaust fan upgrades",
      "Accessories, trim and paint",
    ],
    planning: [
      {
        t: "Check the floor",
        d: "A new vanity with a different footprint can reveal gaps in existing flooring. We check before you buy.",
      },
      {
        t: "Plumbing locations",
        d: "Vanity sizes that match existing supply and drain locations keep costs down.",
      },
      {
        t: "When to go further",
        d: "If tile or waterproofing is failing, a refresh may not be the right investment. We will tell you.",
      },
    ],
    process: [
      { t: "Assess", d: "What stays, what changes." },
      { t: "Select", d: "Vanity, fixtures and finishes." },
      { t: "Install", d: "Remove, install and connect." },
      { t: "Finish", d: "Caulk, trim, paint and cleanup." },
    ],
    faq: [
      {
        q: "Can you install a vanity I bought myself?",
        a: "Usually, yes. We confirm the size and plumbing locations before installation day.",
      },
      {
        q: "Is a fixture refresh worth it?",
        a: "If the tile and shower are in good condition, a refresh can deliver a big visual change for much less than a full renovation.",
      },
      {
        q: "Do you replace bathroom exhaust fans?",
        a: "Yes, with electrical connections completed by a licensed electrician.",
      },
    ],
    related: ["bathrooms", "showers-tubs", "flooring"],
    articles: [
      "bathroom-renovation-cost-guide",
      "how-to-choose-contractor-gta",
    ],
  },
];

export const ALL_SERVICES = [...OUTDOOR, ...INTERIOR];

export function findService(division: Division, slug: string) {
  return (division === "outdoor" ? OUTDOOR : INTERIOR).find(
    (s) => s.slug === slug,
  );
}

export function servicePath(s: Pick<ServiceDetail, "division" | "slug">) {
  return s.division === "outdoor"
    ? `/outdoor-services/${s.slug}`
    : `/interior-renovations/${s.slug}`;
}

export function serviceImage(s: ServiceDetail) {
  return media(s.image);
}
