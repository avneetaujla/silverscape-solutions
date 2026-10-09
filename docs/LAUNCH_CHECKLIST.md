# SilverScape — launch checklist

Everything that still needs a real-world input before (or soon after) launch:
content, credentials and owner confirmations.

**Legal and compliance blockers are tracked separately in
`docs/COMPLIANCE_CHECKLIST.md` §0.** For live paid sod checkout only, they
include the business premises address, accountant HST confirmation,
undecided sod delivery rules, and Stripe/Resend production setup. The code
refuses a live Stripe key while they're open. They don't block the public
site, quote requests or contact forms.

## 1. Launch blockers

| # | Item | Why it blocks | Where |
|---|------|---------------|-------|
| 0 | Everything in `docs/COMPLIANCE_CHECKLIST.md` §0 (live paid sod checkout only) | Legal and consumer-protection requirements | `src/lib/legal.ts` |
| 1 | `GOOGLE_MAPS_API_KEY` | Without it the sod portal can't price delivery; customers see "call us". | Netlify env |
| 2 | `STRIPE_SECRET_KEY` (live) | Without it online sod payment is disabled. | Netlify env |
| 3 | `RESEND_API_KEY` + `LEAD_FROM_EMAIL` on a verified domain, and/or `LEAD_WEBHOOK_URL` | Without a delivery channel the quote form shows an error instead of accepting leads. | Netlify env |
| 4 | `VITE_SITE_URL` | Canonical URLs, sitemap and social tags use it. | Netlify env |
| 5 | Confirm the sod farm pickup address | The brief named "Greenhorizons Sod Farms, Kitchener". Greenhorizons' nearest location is **1625 Kossuth Road, Cambridge** (519-653-7494); no Kitchener site was found. The default is the Cambridge address. Set `SOD_FARM_ADDRESS` if it's different. | Netlify env |
| 6 | Confirm trust statements (section 6) | They are factual claims made on SilverScape's behalf. | Copy |
| 7 | Replace the P1 photos (section 3) | Not a current blocker, per the owner (2026-10-09). The homepage and sod portal use reference imagery, which is never presented as SilverScape work. | `media-src/` |

## 2. Environment variables

Set these in **Netlify → Site configuration → Environment variables**.
`VITE_*` values are public; everything else is server-only. See `.env.example`.

| Variable | Required | Notes |
|----------|----------|-------|
| `VITE_SITE_URL` | Yes | `https://www.yourdomain.ca`, no trailing slash. |
| `GOOGLE_MAPS_API_KEY` | Yes (sod) | Server-only. See section 4. |
| `SOD_BASE_ADDRESS` | No | Default `189 Stephanie Drive, Guelph, ON, Canada`. |
| `SOD_FARM_ADDRESS` | No | Default Greenhorizons, Cambridge (see blocker 5). |
| `SOD_MAX_ROUTE_KM` | No | Refuses online orders above this total route length. |
| `STRIPE_SECRET_KEY` | Yes (sod) | `sk_test_…` on deploy previews, `sk_live_…` in production. A live key is refused while compliance blockers remain. |
| `STRIPE_WEBHOOK_SECRET` | Yes (live sod) | Signing secret of the `/api/stripe-webhook` endpoint (section 5). Required for the order confirmation email; live checkout is refused without it. |
| `RESEND_API_KEY` | One of email/webhook; required for live sod | Lead email delivery and sod order confirmations. |
| `LEAD_NOTIFICATION_EMAIL` | With Resend | Comma-separated recipients. Also receives a copy of each sod order. |
| `LEAD_FROM_EMAIL` | With Resend | Must be on a Resend-verified domain. Also the sender of order confirmations. |
| `LEAD_WEBHOOK_URL` / `LEAD_WEBHOOK_SECRET` | One of email/webhook | JSON POST to a CRM, Zapier or Make. |
| `VITE_GA4_MEASUREMENT_ID` | No | Analytics loads only when set **and** the visitor allows analytics cookies. Setting it shows the cookie banner. |
| `VITE_META_PIXEL_ID` | No | Pixel loads only when set **and** the visitor allows marketing cookies. In Meta Events Manager, turn **off** Automatic Advanced Matching. |

## 3. Image replacement checklist

Every image on the site is currently **temporary reference imagery**
(`isPlaceholder: true`): AI-generated renders or CC0 / public-domain stock.
None of it is presented as SilverScape work. The homepage shows no portfolio
items, the hubs only show non-placeholder projects, and the portfolio carries a
section note.

**How to replace one image**

1. Put the real photo in `media-src/` using the same id as the filename
   (e.g. `media-src/backyard-deck-patio.jpg`). Remove the old file.
2. Run `npm run media`. This generates the responsive sizes and updates the
   manifest. It never upscales, so supply at least the minimum width below.
3. In `src/content/mediaCatalog.ts` update the entry: accurate `alt`,
   `isPlaceholder: false`, `source: "silverscape"`, remove `attribution`,
   and adjust `objectPosition` if the subject isn't centred.
4. Run `npm run audit:media` against the dev server to confirm no image
   repeats on a page.

**Minimum sizes:** full-width heroes need landscape 3:2 or wider at
**≥ 2400 px**. Cards and portfolio images need 4:3 at **≥ 1600 px**.
Current temporary files are only 960–1600 px wide.

**Priority:** P1 = before launch · P2 = within the first weeks · P3 = as case studies are published.

| Id | Used on | Current source · size | Real photo needed | Ratio | Priority |
|----|---------|----------------------|-------------------|-------|----------|
| `backyard-deck-patio` | Homepage hero, default share image | AI · 1280 | A finished SilverScape backyard: deck or patio with lawn, wide shot | 16:9 ≥ 2400 | P1 |
| `brick-patio-dining` | Homepage division card: Outdoor | CC0 · 1024 | Finished patio or yard, daylight | 4:3 | P1 |
| `bathroom-glass-shower` | Homepage division card: Interior | CC0 · 1024 | Finished bathroom, bright | 4:3 | P1 |
| `sod-pallets-driveway` | Homepage division card: Sod | AI · 1152 | Real delivery: pallets of rolls on a customer driveway | 4:3 | P1 |
| `sod-roll-closeup` | Homepage sod section | AI · 1152 | Close-up of an actual Kentucky Bluegrass roll | 4:3 | P1 |
| `sod-farm-field` | Sod portal hero, portal share image | AI · 1280 | Farm field or a loaded truck at pickup | 16:9 ≥ 2400 | P1 |
| `front-yard-walkway` | Outdoor hub hero | AI · 1280 | Finished front yard or walkway | 16:9 ≥ 2400 | P2 |
| `main-floor-oak` | Interior hub hero | AI · 1280 | Finished main-floor flooring | 16:9 ≥ 2400 | P2 |
| `front-yard-garden-beds` | Service hero: Landscaping | AI · 1280 | Planted beds, edging, mulch | 16:9 ≥ 2400 | P2 |
| `backyard-firepit-pergola` | Service hero: Yard Transformations (and homepage card) | AI · 1280 | Whole-yard result | 16:9 ≥ 2400 | P2 |
| `yard-regrading-swale` | Service hero: Grading & Drainage | AI · 1280 | Regraded yard or swale in progress | 16:9 ≥ 2400 | P2 |
| `raised-composite-deck` | Service hero: Decks (and homepage card) | AI · 1280 | Finished deck | 16:9 ≥ 2400 | P2 |
| `horizontal-privacy-fence` | Service hero: Fences | AI · 1280 | Finished fence run | 16:9 ≥ 2400 | P2 |
| `herringbone-driveway` | Service hero: Interlocking (and homepage card) | AI · 1280 | Finished driveway or walkway | 16:9 ≥ 2400 | P2 |
| `patio-dining-lounge` | Service hero: Patios & Outdoor Living | CC0 · 960 | Finished patio | 16:9 ≥ 2400 | P2 |
| `striped-lawn` | Service hero: Lawn Maintenance | CC0 · 1024 | Maintained client lawn | 16:9 ≥ 2400 | P2 |
| `covered-porch` | Service hero: Custom Exterior | CC0 · 960 | Custom exterior build | 16:9 ≥ 2400 | P2 |
| `sod-laying` | Service hero: Sod Installation | AI · 1280 | Crew laying sod rolls | 16:9 ≥ 2400 | P2 |
| `living-room-oak-floor` | Service hero: Flooring (and homepage card) | CC0 · 1024 | Finished floor | 16:9 ≥ 2400 | P2 |
| `vinyl-plank-install` | Service hero: Vinyl & Laminate | AI · 1280 | Vinyl or laminate install | 16:9 ≥ 2400 | P2 |
| `marble-tile-shower` | Service hero: Tile (and homepage card) | AI · 1280 | Finished tile work | 16:9 ≥ 2400 | P2 |
| `bathroom-floating-vanity` | Service hero: Bathrooms (and homepage card) | AI · 1280 | Finished bathroom | 16:9 ≥ 2400 | P2 |
| `curbless-shower-tub` | Service hero: Showers & Tubs | AI · 1280 | Shower or tub conversion | 16:9 ≥ 2400 | P2 |
| `white-oak-vanity` | Service hero: Vanities & Fixtures | AI · 1280 | Installed vanity and fixtures | 16:9 ≥ 2400 | P2 |
| `side-yard-walkway` | Portfolio: Landscaping | CC0 · 960 | Real job photo | 4:3 ≥ 1600 | P3 |
| `sod-new-lawn` | Portfolio: Sod | AI · 1152 | Real job photo | 4:3 ≥ 1600 | P3 |
| `cedar-deck-steps` | Portfolio: Decks | AI · 1152 | Real job photo | 4:3 ≥ 1600 | P3 |
| `cedar-fence-gate` | Portfolio: Fences | AI · 1152 | Real job photo | 4:3 ≥ 1600 | P3 |
| `slab-patio-seating` | Portfolio: Interlocking | CC0 · 960 | Real job photo | 4:3 ≥ 1600 | P3 |
| `spa-bathroom-tub` | Portfolio: Bathrooms | AI · 1600 | Real job photo | 4:3 ≥ 1600 | P3 |
| `hardwood-empty-room` | Portfolio: Flooring | CC0 · 1024 | Real job photo | 4:3 ≥ 1600 | P3 |
| `sage-tile-shower` | Portfolio: Tile | AI · 1152 | Real job photo | 4:3 ≥ 1600 | P3 |

Also needed: **a real crew or owner photo for About**. That page is
intentionally imageless until one exists.

### CC0 / public-domain attributions

Not legally required, but recorded in each catalog entry's `attribution`:
`brick-patio-dining`, `bathroom-glass-shower`, `living-room-oak-floor`,
`striped-lawn`, `hardwood-empty-room` (rawpixel, CC0);
`patio-dining-lounge`, `side-yard-walkway` (Jay Mantri, StockSnap, CC0);
`covered-porch` (Joshua Ness, StockSnap, CC0);
`slab-patio-seating` (Matt Bango, StockSnap, CC0).

## 4. Google Maps requirements

- One server-only API key in `GOOGLE_MAPS_API_KEY`. It is never sent to the browser.
- Enable **Geocoding API** (validates the customer address is in Ontario) and
  **Routes API** (`directions/v2:computeRoutes`: real driving distance for the
  base → farm → customer → base loop; no straight-line maths).
- Restrict the key **by API** (those two only). Don't restrict by HTTP
  referrer, because calls come from the Netlify function.
- Set a billing account and a daily quota cap. Each quote makes about 1 geocode
  and 1 route request.

## 5. Stripe requirements

- `STRIPE_SECRET_KEY` only. No publishable key is needed: the site redirects
  to **Stripe Checkout** and never handles card data.
- The total is recalculated on the server at checkout. If it differs from what
  the customer reviewed, checkout is refused and the summary refreshes.
- Line items: sod (`rolls × $4.20 + 13% HST`) and delivery (`route km × $1.50`).
- Success returns to `/sod-ordering/confirmation?session_id=…`, which reads the
  session from Stripe. Cancel returns to `/sod-ordering?checkout=cancelled`.
- **Webhook (required for live payments).** In Stripe → Developers →
  Webhooks, add `https://<your-domain>/api/stripe-webhook` with the events
  `checkout.session.completed` and `checkout.session.async_payment_succeeded`.
  Copy its signing secret into `STRIPE_WEBHOOK_SECRET`. The webhook emails the
  customer a written copy of the order (CPA internet-agreement requirement)
  and sends a copy to `LEAD_NOTIFICATION_EMAIL`. Do this once for test mode
  and once for live mode; each has its own secret.
- Also **enable Stripe's customer receipts** and the owner's "Successful
  payments" notifications as a backup record.
- Before going live, run a full test order with `sk_test_…` on a deploy
  preview. Confirm both emails arrive and the confirmation page shows the
  order reference.

## 6. Trust statements to confirm with the owner

Remove or reword any that aren't accurate.

- Electrical and plumbing work "by licensed electricians / licensed plumbers /
  licensed trades" (`src/lib/services-data.ts`: bathrooms, showers, vanities,
  heated floors, lighting).
- "Deck footings and fence posts go to frost depth — about 1.2 m here"
  (`src/components/site/ServiceDetailPage.tsx`). Confirm this matches local
  practice and building code for each municipality.
- The process steps (site walk, written itemized proposal, utility locates
  arranged before digging) on the homepage, About and city pages.
- Phone `226-500-4608` and email `silverscapesolutions@gmail.com` (confirmed 2026-10-09), and "Based in
  Guelph, Ontario" (`src/lib/site.ts`).

No testimonials, ratings, years in business, project counts, certifications or
guarantees are claimed anywhere. Keep it that way until they're real.

## 7. Publishing a real case study

1. Add the photos to `media-src/` with new ids and catalog entries
   (`isPlaceholder: false`, `source: "silverscape"`). Run `npm run media`.
2. In `src/lib/portfolio-data.ts`, add the project (or replace the concept for
   that category) with `isPlaceholder: false`, its real `location` (city only),
   and the real scope.
3. Once any project has `isPlaceholder: false`, the homepage "Recent work"
   section and the hub project rows appear automatically. CTAs change from
   "See Project Types" to "View Our Work".
4. While any concept entries remain alongside real ones, they're badged
   "Project type" and the portfolio note explains what that means. The note
   disappears once every concept is replaced.

## 8. Follow-ups (not blockers)

- Main client chunk is ~518 kB (~164 kB gzip). Consider splitting the router
  bundle or deferring analytics.
- `src/assets/logo.png` is unreferenced (kept as the brand original).
- Several `@radix-ui/*` packages in `package.json` are no longer imported
  after the unused shadcn components were removed. Prune them with a quick
  `npm uninstall` pass and a rebuild.
- CSP still allows `'unsafe-inline'` scripts (TanStack hydration data and
  JSON-LD). Moving to nonces would tighten it.
- Rate limiting is in memory per function instance. For stronger protection,
  add Netlify's rate-limiting rules or a WAF.
