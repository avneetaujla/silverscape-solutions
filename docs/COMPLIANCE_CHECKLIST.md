# Compliance checklist (internal)

**Internal document. Do not publish, link or deploy publicly.** Keep the
GitHub repository **private**: this file and the code contain operational
details.

This is the owner's operating checklist for privacy, consumer protection,
anti-spam, accessibility and copyright. It isn't legal advice. Items marked
⚖ should be confirmed with an Ontario lawyer, and items marked 🧾 with an
accountant.

Findings are in `docs/COMPLIANCE_AUDIT.md` and image rights in
`docs/IMAGE_LICENSES.md`. Business facts used by the site live in one place:
`src/lib/legal.ts`.

---

## 0. LAUNCH BLOCKERS

These items block **live paid sod checkout only**. They do not block the
public website, quote requests, contact forms, portfolio browsing or service
pages. Test-mode (`sk_test_…`) checkout is also unaffected.

The code enforces items 1–4: a live Stripe key is refused while any of them is
open.

### Resolved (owner-confirmed 2026-10-09)

| Item | Value | Where |
|------|-------|-------|
| Business / legal name | SilverScape Solutions | `LEGAL.legalBusinessName`, `operatingName` |
| Phone | 226-500-4608 | `BUSINESS.phoneDisplay` |
| Public and customer-service email | silverscapesolutions@gmail.com | `LEGAL.businessEmail`, `customerServiceEmail` |
| Privacy contact | Privacy Officer, SilverScape Solutions, silverscapesolutions@gmail.com, 226-500-4608 | `privacyContactNameOrTitle`, `privacyContactEmail` |
| Voluntary sod cancellation, refund and exchange policy | Final once submitted; no voluntary cancellations, refunds or exchanges, except where required by law; statutory rights preserved | `SOD_FINAL_SALE_STATEMENT`, `SOD_POLICY` |

### Unresolved: live paid sod checkout

These are open business decisions or setup steps, not code failures.

| # | Blocker | Owner action | Where |
|---|---------|--------------|-------|
| 1 | **BUSINESS PREMISES ADDRESS REQUIRED FOR ONTARIO INTERNET-AGREEMENT DISCLOSURE BEFORE LIVE PAID SOD CHECKOUT.** | Decide the public business address. **Don't use the sod route's base address or a home address unless you've decided it's the public address.** Get advice on whether a PO box or virtual office meets the requirement ⚖ | `LEGAL.businessAddress` |
| 2 | **ACCOUNTANT TO CONFIRM HST TREATMENT OF SOD + DELIVERY BEFORE PAID CHECKOUT GOES LIVE.** The current formula is `4.20 × 1.13 × rolls + 1.50 × km`: HST on sod, none on delivery. | Get written confirmation 🧾. If it changes, update `src/lib/sod/pricing.ts`, the review-step note and Stripe line-item text. Then set `hstTreatmentConfirmedByAccountant: true` | `TAX_REVIEW`, `pricing.ts` |
| 3 | **Sod order rules: BUSINESS DECISION REQUIRED.** These are still undecided: the failed-delivery rule (`failedDeliveryRules`), the incorrect-address rule (`customerAddressErrorRules`), the damaged or incorrect order procedure and claim window (`damagedOrIncorrectOrderClaimWindow`), the rescheduling rule (`reschedulingRules`) and the delivery-date rule (`deliveryArrangements`). The refund page shows neutral "contact us" wording until they're set. | Decide each rule ⚖. They must not contradict statutory rights, for example for goods that are damaged or not delivered | `SOD_POLICY` |
| 4 | Stripe and Resend production configuration | Set `STRIPE_WEBHOOK_SECRET`, `RESEND_API_KEY` and `LEAD_FROM_EMAIL` (verified domain). Add the webhook endpoint in Stripe. Run a test order end to end | `docs/LAUNCH_CHECKLIST.md` §5 |

### Unresolved: general (not enforced by code)

| # | Item | Owner action | Where |
|---|------|--------------|-------|
| 5 | Public claims | Confirm or remove every NEEDS VERIFICATION claim | `docs/COMPLIANCE_AUDIT.md` §6 |
| 6 | Repository visibility | Confirm the GitHub repo is private, or remove the default `SOD_BASE_ADDRESS` from `src/lib/sod/route.server.ts` and set it only in Netlify env | GitHub settings |
| 7 | Legal pages review | Have the Privacy Policy, Terms, Cookie Policy and Refund Policy reviewed ⚖ | `/privacy`, `/terms`, `/cookies`, `/refunds` |
| 8 | Image records | The owner has said image provenance isn't a current implementation blocker. Keep `docs/IMAGE_LICENSES.md` up to date, and never present temporary or AI imagery as SilverScape customer projects | `docs/IMAGE_LICENSES.md` |

Also recommended: `mailingAddress` (required before marketing emails),
`businessHours`, `hstNumber` (if registered) and `leadWebhookProvider` (if a
CRM is used).

---

## 1. Privacy officer (PIPEDA Principle 1: accountability)

- [x] Name a Privacy Officer: "Privacy Officer, SilverScape Solutions"
      (`LEGAL.privacyContactNameOrTitle`).
- [ ] Decide internally who fills the Privacy Officer role. No name needs to be
      published.
- [ ] Make sure the privacy inbox (silverscapesolutions@gmail.com) is
      monitored.
- [ ] Write a one-page internal privacy procedure: who can access what, how
      requests are handled, and how breaches are handled (sections 3–5 below).

## 2. Retention and deletion

The Privacy Policy says information is kept "as long as reasonably
necessary". Set the actual periods internally; don't publish invented ones.

- [ ] Decide retention periods for:
  - **Quote requests that didn't become jobs** (Gmail and CRM). For example,
    delete after N months of inactivity.
  - **Customer project records**: as long as tax law and warranty or dispute
    needs require. CRA generally requires books and records to be kept for
    6 years 🧾.
  - **Sod orders**: Stripe records and confirmation emails, on the same tax
    basis.
  - **Marketing consent records**: as long as you email the person, plus a
    buffer to prove consent (CASL puts the burden of proof on the sender).
- [ ] Put a recurring calendar reminder in place to delete expired records
      in Gmail, the CRM and Stripe exports.
- [ ] Delete or anonymize records when they're no longer needed, not just
      archive them.

## 3. Access restriction

- [ ] Turn on 2-step verification for Gmail, Netlify, Stripe, Resend, Google
      Cloud (Maps), GitHub and any CRM.
- [ ] Limit who has access to each. Remove ex-staff the same day they leave.
- [ ] Don't forward quote or order emails to personal accounts.
- [ ] Restrict the Google Maps key to the Geocoding and Routes APIs, with a
      quota cap.
- [ ] Use restricted Stripe keys (`rk_live_…`) with only Checkout Sessions
      write and read permissions, if possible.
- [ ] Rotate keys if anyone with access leaves, or if a key may have leaked.

## 4. Privacy requests (access, correction, withdrawal)

- [ ] Respond within **30 days** (PIPEDA). Extensions are possible only in
      limited cases, with notice.
- [ ] Verify identity before disclosing anything, for example by replying
      from the email on file.
- [ ] Search Gmail, the CRM, Stripe and any spreadsheets.
- [ ] Log every request: date received, what was asked, what was done, date
      closed.
- [ ] Withdrawal of marketing consent: see section 9.

## 5. Breach response (PIPEDA breach-of-security-safeguards rules)

- [ ] If a breach creates a **real risk of significant harm**, report it to
      the Office of the Privacy Commissioner of Canada and notify affected
      individuals as soon as feasible. Notify other organizations that can
      reduce the harm.
- [ ] Keep a record of **every** breach, even those not reported, for
      **24 months**.
- [ ] Steps: contain (rotate keys, revoke access), assess (what, whose, how
      sensitive, risk of harm), notify, record, then fix the cause.
- [ ] Keep the OPC breach report form link in the procedure.

## 6. Consent records

- **Cookies:** stored in each visitor's browser (`sss_consent`: categories,
  timestamp, version). Visitors change them with "Cookie Settings" in the
  footer.
- **Marketing email** (when switched on): each quote email and webhook
  carries a `marketing_consent` record. It holds granted yes/no, server
  timestamp, wording version, exact wording, channel and source page.
  - [ ] Keep these records for as long as you email that person, plus a
        buffer.
  - [ ] Bump `MARKETING_CONSENT.version` whenever the wording changes.
- **Sod checkout:** the Terms version and acceptance timestamp are stored on
  the Stripe session (`terms_version`, `terms_accepted_at`).
  - [ ] Bump `LEGAL_DOCS.version` and `lastUpdated` whenever the Terms or
        Refund Policy change.

## 7. Image licences

- [ ] Clear every row in `docs/IMAGE_LICENSES.md`.
- [ ] Save a screenshot of each CC0 source page.
- [ ] Get written permission for any photo of a customer's property, and
      from any photographer who isn't an employee.
- [ ] Never label stock or AI images as SilverScape work.

## 8. Vendor terms

For each vendor, accept its terms and note where its data-processing terms
(DPA) are. Confirm that processing outside Canada (mainly in the US) is
acceptable; the Privacy Policy discloses it.

- [ ] Netlify: hosting and logs.
- [ ] Resend: email delivery.
- [ ] Google Workspace or Gmail: business inbox. A free personal Gmail account
      isn't intended for business data; consider Google Workspace.
- [ ] Google Maps Platform: the terms limit how API results can be stored and
      displayed. The site shows distances only and stores nothing.
- [ ] Stripe: Services Agreement. Turn on Stripe receipts and "successful
      payment" emails as a backup record.
- [ ] Webhook CRM (if used): set `LEGAL.leadWebhookProvider` so the Privacy
      Policy names it.
- [ ] Google Analytics 4 (if used): accept the data-processing terms; turn
      **off** Google Signals and ads personalization in GA (the site already
      sends `allow_google_signals: false`).
- [ ] Meta Pixel (if used): accept the Business Tools terms; turn **off**
      "Automatic Advanced Matching" in Events Manager. The site sends no
      personal data, and that setting would make the pixel collect some.

## 9. CASL: service vs marketing email

**Service messages**: quote replies, order confirmations, delivery
scheduling, warranty follow-up about work done.

- No marketing consent is needed for these (CASL s.6(6)), but they must
  stay purely transactional.
- Don't add promotions to an order confirmation.
- [ ] ⚖ Confirm whether the order confirmation must also carry CASL sender
      identification and an unsubscribe mechanism. Once `mailingAddress` is
      set, add it to the email footer.

**Marketing messages**: newsletters, seasonal offers, "book your spring
cleanup". Send only with **express consent** (the unchecked opt-in) or
**implied consent**:

- an existing business relationship: a purchase or contract within the last
  2 years, or an inquiry within the last 6 months
- or another CASL exception.

The opt-in is **switched off** (`MARKETING_CONSENT.enabled: false`). It also
needs `LEGAL.mailingAddress` before it shows. Before turning it on:

- [ ] Choose an email tool with built-in one-click unsubscribe, such as
      Mailchimp or Resend Broadcasts.
- [ ] Every marketing email must include:
  - the sender's name (SilverScape Solutions, plus the legal name if
    different)
  - a mailing address
  - a phone number, email or web address valid for at least 60 days
  - an unsubscribe link that works without a login and stays valid for at
    least 60 days
- [ ] Process unsubscribes within **10 business days**, and preferably at
      once.
- [ ] Keep the suppression list forever. Never re-add someone who
      unsubscribed without new express consent.
- [ ] Import only people who have a consent record. Never buy lists.
- [ ] Track the 2-year and 6-month implied-consent expiry dates.

## 10. Tracker audits

Every quarter, and after adding any script:

- [ ] In a private window, load the site and reject everything. In DevTools →
      Network, confirm no `googletagmanager`, `google-analytics` or
      `facebook` requests are made and no `_ga` or `_fbp` cookies are set.
- [ ] Accept analytics only and confirm Meta doesn't load.
- [ ] Update `/cookies` if any cookie, provider or duration changes.
- [ ] Any new third-party script must be gated in `src/lib/analytics.ts` and
      allowed in the CSP (`src/lib/security-headers.ts`).
- [ ] If the consent categories change, bump `CONSENT_VERSION` in
      `src/lib/consent.ts`; visitors will be asked again.

## 11. Legal page reviews

- [ ] Have a lawyer review all legal pages before paid launch ⚖. Review them
      again every year, and whenever you add a service, vendor, tracker,
      payment method or marketing email.
- [ ] Update `LEGAL_DOCS.lastUpdated` (and `effectiveDate` for material
      changes).
- [ ] Watch for the Ontario **Consumer Protection Act, 2023** commencement
      date. It isn't in force as of October 2026. When proclaimed, review
      the Terms, Refunds and checkout disclosure.
- [ ] Watch for federal privacy reform replacing PIPEDA.

## 12. Projects (offline contracts)

- [ ] ⚖ Use a written contract that meets CPA 2002 requirements:
  - **Direct agreements** (signed at the customer's home) over $50 need
    specific disclosures and the **10-day cooling-off** notice.
  - **Future-performance agreements** need a description, an itemized price,
    a start and completion date, and so on.
- [ ] Estimates: under the CPA, the final price can't exceed the estimate by
      more than 10% unless the customer agrees to the new price.
- [ ] Deposits: decide and document the refund terms in the contract.

## 13. Accessibility (AODA)

- [ ] Keep the Accessibility page's feedback process working: monitor the
      phone and email, and respond.
- [ ] Before launch, do one manual keyboard-only pass (Tab, Shift+Tab, Enter,
      Space, Escape) through the quote form and sod order, and one VoiceOver
      or NVDA pass.
- [ ] Re-run axe after design changes.
- [ ] Customer Service Standard: train anyone answering customers to
      communicate in ways that suit a person's disability, and offer
      alternatives such as a phone order instead of the web form.
