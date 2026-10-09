# Compliance audit (internal)

**Internal document. Do not publish or link from the website.**
Audit date: 2026-10-09. Scope: the code in this repository as deployed to
Netlify. This is an engineering audit, not legal advice. Items marked
"counsel" should be confirmed by an Ontario lawyer or accountant.

## 1. Legal framework considered

| Law | Applies to | How the site responds |
|-----|-----------|-----------------------|
| **PIPEDA** (federal private-sector privacy) | Personal information collected in commercial activity | Privacy Policy; collection limited to what forms need; consent for optional tracking; access, correction and withdrawal process; safeguards; privacy contact (to be named) |
| **CASL** (anti-spam) | Commercial electronic messages | Marketing consent is separate, unchecked and **switched off** until a mailing address and unsubscribe process exist; see the checklist |
| **Copyright Act** | Site photos, logo, text | `docs/IMAGE_LICENSES.md`; nothing presented as SilverScape work that isn't |
| **Excise Tax Act** (GST/HST) | Sod and delivery charges | The formula is unchanged and server-calculated. **Accountant must confirm it** before paid checkout |
| **Ontario Consumer Protection Act, 2002** and O. Reg. 17/05 | Internet agreements (sod orders), direct and future-performance agreements (projects), false or misleading representations | Pre-checkout disclosure, express accept/decline, ability to correct, written copy by email, refund page that preserves statutory rights, claims audit below |
| Ontario CPA, **2023** | Not in force as of October 2026 | Not relied on. Re-review when a commencement date is proclaimed |
| **AODA** (Integrated Accessibility Standards Regulation) | Customer Service Standard (feedback process) for all providers. The website standard (IASR s.14) applies to organizations with 50+ employees | WCAG 2.2 AA is the voluntary target; the Accessibility page has a feedback process; no certification is claimed |

## 2. Data inventory

### What is collected, why, and where it goes

| Source | Data | Purpose | Sent to | Stored by SilverScape |
|--------|------|---------|---------|-----------------------|
| Quote form (`LeadForm`) | Name, phone, email, city, division, service, timing, project description, page path. Server-side: timestamp. Marketing choice (only when the opt-in is switched on) | Respond to the inquiry, quote and provide the service | Resend → `LEAD_NOTIFICATION_EMAIL` (Gmail); optionally `LEAD_WEBHOOK_URL` | In the Gmail inbox and/or the webhook CRM. The site has no database |
| Quote form, anti-spam | Honeypot field, fill time, client IP (in memory only) | Block bots and rate-limit (5 per 10 min) | Nowhere | IP is held in server memory for at most 10 minutes; never written to disk |
| Sod order form | Rolls, street, city, postal code, name, email, phone, notes | Price the route, take payment, deliver | Google Maps Platform (address only); Stripe (all fields, as Checkout `customer_email` and metadata) | In Stripe's dashboard; in the Gmail confirmation copy once the webhook is configured |
| Sod checkout acknowledgement | Terms version and accepted-at timestamp | Record that the customer accepted the Terms and Refund Policy | Stripe metadata | In Stripe |
| Stripe Checkout (Stripe's site) | Card details, billing details | Payment | Stripe only | **Never**: SilverScape receives no card number or CVV |
| Order confirmation webhook | Stripe session (order details) | Send the customer a written copy (CPA s.39) and notify the business | Resend → customer and `LEAD_NOTIFICATION_EMAIL` | In the Gmail inbox |
| Hosting | IP address, user agent, requested URL | Serve and protect the site | Netlify | In Netlify's logs, per Netlify's retention |
| Consent manager | `{necessary, analytics, marketing, version, timestamp}` | Remember the cookie choice | Nowhere | In the visitor's browser (`localStorage.sss_consent`) |
| GA4 (only if configured **and** consented) | Pseudonymous client ID, page path (query and hash stripped), events | Usage statistics | Google | In Google Analytics |
| Meta Pixel (only if configured **and** consented) | `_fbp` cookie, page view, Lead / Contact / InitiateCheckout / Purchase events | Ad measurement | Meta | In Meta |

**Not collected:** card numbers, CVV, passwords or accounts, government ID,
health or financial details, precise geolocation, or children's data.
Analytics events carry no name, email, phone, address or free text. The
`quote_submitted` event sends only division, service and form location.

### Third parties

Netlify (hosting), Resend (email delivery), Google Workspace/Gmail (inbox),
Google Maps Platform (geocoding and routes), Stripe (payments), and an optional
webhook CRM. GA4 and Meta load only if configured and consented. All of them
may process data outside Canada, mainly in the US. The Privacy Policy says so
(section E).

### Cookies and storage

- **Strictly necessary:** `sss_consent` (localStorage, first party, until
  changed or cleared). Stripe's own cookies on `checkout.stripe.com` are set
  by Stripe on its own domain.
- **Analytics (consent):** `_ga`, `_ga_<ID>` (first party, set by Google,
  up to 2 years); `sss_purchase_<order>` (sessionStorage, stops a duplicate
  purchase event).
- **Marketing (consent):** `_fbp`, `_fbc` (first party, set by Meta, about
  90 days); Meta's `fr` (third party, on facebook.com).
- No functional cookies exist, so none are listed.

Verified 2026-10-09 in a production build with test IDs:

- **Before consent:** no third-party requests, no cookies, and `gtag` and
  `fbq` undefined.
- **Analytics only:** gtag.js and GA collect load; Meta does not.
- **Accept all:** fbevents.js loads.
- **Reject after accepting:** `_ga*` cookies deleted, `ga-disable-<ID>` set,
  and a later phone click sends nothing.
- **Reload:** stored choices are re-applied without showing the banner again.

### Embeds and fonts

No iframes, video, map embeds, CAPTCHA or third-party widgets. Fonts are
self-hosted (`@fontsource/inter`, `@fontsource/cormorant-garamond`), and no
Google Fonts request is made. Google Maps is called **server-side** only; the
key never reaches the browser.

## 3. Security review

| Control | Status |
|---------|--------|
| HTTPS | Netlify, plus `Strict-Transport-Security: max-age=31536000` |
| Secrets | `GOOGLE_MAPS_API_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `RESEND_API_KEY` and `LEAD_WEBHOOK_SECRET` are read only in `*.server.ts` and server functions. The client bundle was checked and contains none of them |
| Server validation | Zod schemas on every server function; totals recalculated on the server at checkout; the `acceptedTerms` literal is required |
| Rate limiting | In memory, per function instance: lead 5 per 10 min, quote 20 per 10 min, checkout 10 per 10 min. Best effort only, not a substitute for a WAF |
| Errors | Users see plain messages. Stack traces go only to server logs, never to the browser (verified with an invalid Stripe key) |
| Headers | CSP (`default-src 'self'`, `object-src 'none'`, `frame-ancestors 'none'`, allow-listed GA and Meta hosts), `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (camera, mic, geolocation, payment, usb off), `X-Frame-Options: DENY`. Verified with curl; framing was blocked in the browser |
| CSP caveat | `script-src` includes `'unsafe-inline'` because TanStack Start inlines hydration data and JSON-LD. Moving to nonces is a follow-up |
| CSRF | TanStack `createCsrfMiddleware` on server functions; the webhook is authenticated by Stripe signature |
| Webhook | HMAC-SHA256 checked against `STRIPE_WEBHOOK_SECRET` with a 300 s tolerance and constant-time compare. Verified: no, wrong, stale or tampered signature → 400; valid irrelevant event → 200; email failure → 500 (Stripe retries; Resend idempotency keys prevent duplicates) |
| Live-payment gate | With an `sk_live_` or `rk_live_` key, checkout is refused while `launchBlockers()` is non-empty or confirmation email isn't configured |
| Repository | `src/lib/sod/route.server.ts` contains a default `SOD_BASE_ADDRESS` (a street address in Guelph, probably residential). It isn't in the client bundle, but **if the GitHub repo is public it's exposed**. Confirm the repo is private, or move the value to Netlify env only and remove the default |
| Internal docs | `docs/` is not served by the site, but it is in the repo. Same caveat: keep the repo private |

## 4. Accessibility review (WCAG 2.2 AA target)

Done in this pass:

- **Forms:** labels, `autocomplete`, required and optional marking, errors
  linked with `aria-describedby` and `aria-invalid`, focus moved to the first
  error, live-region status, and the privacy notice linked to the submit
  button.
- **Consent dialog:** focus trap, Escape closes it, focus returns, switches
  are named.
- **Mobile menu:** focus moves in, Escape closes it, focus returns.
- **Structure:** skip link targets `#main`, one H1 per page, and landmarks.
- **Logo link:** its accessible name now includes its visible text (WCAG
  2.5.3).
- **Contrast:** the resource-card "min read" label was 3.79:1; it now uses
  the full bronze colour.

axe-core 4.14 (WCAG 2.0, 2.1 and 2.2 A/AA plus best practice) on `/`,
`/contact`, `/sod-ordering`, `/privacy`, `/terms`, `/cookies`, `/refunds`
and `/accessibility` (desktop; `/accessibility` also at 375 px): **0
violations** after the fixes above.

Remaining risks and limits:

- axe can't measure cream text on the dark gradient headers ("incomplete").
  It's visually high contrast, but a manual check is recommended.
- Real-keystroke testing wasn't possible in the test browser. Keyboard
  behaviour was checked through focus and key-event handlers. Do one manual
  pass with Tab, Shift+Tab, Enter, Space and Escape before launch.
- No screen-reader testing (VoiceOver or NVDA) has been done.
- Stripe's checkout page is outside SilverScape's control.

## 5. Checkout risk review (CPA 2002, internet agreements)

Disclosed before payment, on the review step:

- Supplier name, phone and email.
- Product description, roll size and quantity.
- Delivery address, delivery arrangements, and the delivery charge
  (km × rate, leg by leg).
- Sod subtotal, HST, total, and that amounts are in CAD.
- Payment method and its limits.
- The final-sale cancellation, refund and exchange policy (statutory rights
  preserved), with a link to the full policy.
- Back and Edit controls, so errors can be corrected.
- An unchecked acknowledgement linking the Terms & Conditions and the Refund &
  Cancellation Policy. Marketing consent is not required.
- The button reads "Place Order & Pay $X CAD".

Declining is possible: leave, or go Back. The written copy, including the
final-sale statement, is emailed by the webhook after payment.

**Resolved 2026-10-09:**

- Business name (SilverScape Solutions), phone (226-500-4608), public,
  customer-service and privacy email, and the Privacy Officer contact.
- The voluntary sod cancellation, refund and exchange policy: final once
  submitted, except where required by law. The project/renovation section
  says the sod rule doesn't apply to project work or deposits.

**Still open (LAUNCH BLOCKERS for live paid sod checkout only).** These are
business decisions and setup steps, not code failures:

1. **BUSINESS PREMISES ADDRESS REQUIRED FOR ONTARIO INTERNET-AGREEMENT
   DISCLOSURE BEFORE LIVE PAID SOD CHECKOUT.** O. Reg. 17/05 requires the
   supplier's address in the disclosure. The sod route's base address is not
   used for this.
2. HST treatment isn't confirmed by an accountant.
3. BUSINESS DECISION REQUIRED: failed-delivery rule, incorrect-address rule,
   damaged or incorrect order procedure, rescheduling rule, and delivery-date
   rule. Delivery dates aren't fixed at order time. The CPA lets consumers
   cancel an internet agreement when delivery doesn't occur within 30 days of
   the specified date (or of the agreement if none), and the final-sale
   policy can't override that ⚖.
4. Stripe and Resend production setup: the `STRIPE_WEBHOOK_SECRET`,
   `RESEND_API_KEY` and `LEAD_FROM_EMAIL` env vars and the webhook endpoint in
   Stripe.

None of these affect the public site, quote requests or contact forms.

## 6. Public claims audit

Status key: **VERIFIED** (true by code or public fact), **NEEDS VERIFICATION**
(the owner must confirm), **REMOVE/REPLACE** (changed in this pass, or must
change).

| Claim | Where | Status | Notes |
|-------|-------|--------|-------|
| "Sod priced on real driving distance" / delivery shown leg by leg | Home, sod portal | VERIFIED | Google Routes API, server-side |
| "Itemized total before you pay" / "There are no other fees" | Sod portal | VERIFIED | Only two Stripe line items; the server recomputes |
| "We never see your card" / "nothing is charged until you confirm" | Sod portal, Privacy | VERIFIED | Stripe-hosted Checkout |
| "HST (13%) is charged on the sod; no tax is added to the delivery charge" | Sod review | NEEDS VERIFICATION | Describes the formula accurately; **tax correctness is unconfirmed** (blocker) |
| "Ontario delivery addresses only, up to 2,000 rolls" | Sod review | VERIFIED | Enforced in schema and geocode |
| "After payment we'll contact you to confirm your delivery date" | Sod review | NEEDS VERIFICATION | Operational promise |
| "fresh Kentucky Bluegrass" / "picked up from the farm on your delivery route" | Home, sod portal, About | NEEDS VERIFICATION | Confirm supplier, product and handling. The farm address is unconfirmed (launch checklist item 5) |
| City sod notes ("close to the sod farm", "relatively low") | Kitchener, Waterloo, Cambridge, GTA pages | NEEDS VERIFICATION | Depends on the real farm location |
| "Guelph addresses … delivery … typically at its lowest here" | Guelph page | REMOVE/REPLACE (done) | Not supported by the route formula. Replaced with a neutral statement |
| "on a base that stays level through winter" / "Stonework that stays level through Ontario winters" / "so the deck stays level" / "gates that keep closing years later" / "gates that do not drag" | Home, services | REMOVE/REPLACE (done) | Outcome guarantees. Reworded to describe method ("built for freeze-thaw") |
| "Written, itemized proposals" / "Every proposal includes …" (scope, materials, exclusions, permits and locates, schedule, itemized price) | Home, About | NEEDS VERIFICATION | Every proposal must actually include these |
| "Outdoor and interior, one team" | Home | NEEDS VERIFICATION | True if SilverScape staff do both; disclose subcontracting where used |
| Electrical and plumbing "by licensed electricians / plumbers / trades" | Interior services | NEEDS VERIFICATION | Must be true on every job (ESA and licensed plumbers) |
| "Deck footings … frost depth — about 1.2 m here" | Service detail | NEEDS VERIFICATION | Confirm against the Ontario Building Code and local practice |
| "We confirm permit requirements with your municipality" | Services, city pages | NEEDS VERIFICATION | Operational promise |
| "free Ontario One Call locate … we arrange it before work begins" | Services, city pages | NEEDS VERIFICATION | Locates are free to request (public fact); the "we arrange it" promise is operational |
| Toronto tree-protection (30 cm) and deck-permit (600 mm) statements | City pages, articles | NEEDS VERIFICATION | Regulatory facts. Re-check against current by-laws and OBC; consider adding "check with your municipality" |
| Service areas (Guelph, KW, Cambridge, GTA) | Site-wide | NEEDS VERIFICATION | |
| Phone 226-500-4608, email silverscapesolutions@gmail.com | Site-wide | VERIFIED | Owner-confirmed 2026-10-09 |
| "Based in Guelph, Ontario" | Site-wide | NEEDS VERIFICATION | Locality only; no street address is published |
| "Sod orders are final once submitted … except where required by applicable law" | Refunds, Terms, sod review, confirmation email | VERIFIED | Owner-confirmed policy; statutory rights preserved |
| Article cost and seasonal guidance | Resources | NEEDS VERIFICATION | Educational; no fixed prices are quoted |
| Portfolio "Project type" concepts | Portfolio | VERIFIED | Labelled as concepts; no locations or customer names |
| Accessibility page measures | /accessibility | VERIFIED | Matches this audit; the "keyboard-only testing" claim was narrowed to what was tested |
| Testimonials, ratings, awards, certifications, years in business, project counts, guarantees, insurance or WSIB status | Nowhere | VERIFIED (absent) | Keep it that way until true and documented |
