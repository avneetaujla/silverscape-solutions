import { BUSINESS } from "@/lib/site";

/**
 * Business, legal and policy facts used by the legal pages, checkout and
 * confirmation emails. `null` means the owner has not supplied the value yet.
 * Never replace a `null` with a guess: public pages fall back to neutral
 * wording, and `LAUNCH_BLOCKERS` below keeps paid checkout switched off.
 *
 * See docs/COMPLIANCE_CHECKLIST.md for who must confirm each item.
 */
export const LEGAL = {
  /** Legal/business name as confirmed by the owner for the website. */
  legalBusinessName: "SilverScape Solutions" as string | null,
  operatingName: BUSINESS.name,
  /**
   * Public business-premises address for legal pages, the checkout disclosure
   * and CASL sender identification. UNRESOLVED: not supplied by the owner.
   * Never fill this with the sod route's base address or any residential
   * address unless the owner decides that is the public address.
   * BLOCKER: BUSINESS PREMISES ADDRESS REQUIRED FOR ONTARIO INTERNET-AGREEMENT
   * DISCLOSURE BEFORE LIVE PAID SOD CHECKOUT.
   */
  businessAddress: null as string | null,
  /** Mailing address (CASL requires one in marketing emails). UNRESOLVED: not supplied. */
  mailingAddress: null as string | null,
  businessPhone: BUSINESS.phoneDisplay,
  businessPhoneHref: BUSINESS.phoneHref,
  businessEmail: BUSINESS.email,
  /** Title accountable for privacy under PIPEDA; shown with operatingName. */
  privacyContactNameOrTitle: "Privacy Officer",
  privacyContactEmail: BUSINESS.email,
  customerServiceEmail: BUSINESS.email,
  /** e.g. "Monday to Friday, 8 a.m. to 5 p.m. ET". TODO(owner). */
  businessHours: null as string | null,
  /** GST/HST registration number, if registered. TODO(owner/accountant). */
  hstNumber: null as string | null,
  /** Name of the CRM or automation tool receiving LEAD_WEBHOOK_URL posts, if any. TODO(owner). */
  leadWebhookProvider: null as string | null,
  jurisdiction: "Ontario, Canada",
  publicLocality: "Guelph, Ontario",
} as const;

export const privacyEmail = () => LEGAL.privacyContactEmail;
export const serviceEmail = () => LEGAL.customerServiceEmail;

/** Version and dates of the published legal documents. Bump on every material change. */
export const LEGAL_DOCS = {
  version: "2026-10-09",
  effectiveDate: "2026-10-09",
  lastUpdated: "2026-10-09",
} as const;

/**
 * Owner-confirmed sod policy: orders are final once submitted, except where
 * applicable law requires otherwise. Statutory rights are always preserved.
 */
export const SOD_FINAL_SALE_STATEMENT =
  "Sod orders are final once submitted. SilverScape Solutions does not offer voluntary cancellations, refunds, or exchanges for sod orders after an order has been placed, except where required by applicable law. Nothing in this policy limits any rights or remedies that cannot legally be excluded under applicable consumer protection legislation.";

/**
 * Sod order rules. `null` = BUSINESS DECISION REQUIRED: the owner has not
 * decided the rule, public pages show neutral interim wording, and live paid
 * checkout stays off (see launchBlockers).
 */
export const SOD_POLICY = {
  sodCancellationRules:
    "No voluntary cancellation after the order is submitted, except where required by law." as
      string | null,
  sodRefundRules:
    "No voluntary refunds after the order is submitted, except where required by law." as
      string | null,
  sodExchangeRules:
    "No voluntary exchanges after the order is submitted, except where required by law." as
      string | null,
  /** BUSINESS DECISION REQUIRED: delivery can't be completed (no access, nobody home, weather). */
  failedDeliveryRules: null as string | null,
  /** BUSINESS DECISION REQUIRED: customer entered a wrong or incomplete address. */
  customerAddressErrorRules: null as string | null,
  /** BUSINESS DECISION REQUIRED: how and how fast to report damaged, short or incorrect orders. */
  damagedOrIncorrectOrderClaimWindow: null as string | null,
  /** BUSINESS DECISION REQUIRED: whether and how a delivery date can be moved. */
  reschedulingRules: null as string | null,
  /** BUSINESS DECISION REQUIRED: how the delivery date is chosen and drop-off arranged. */
  deliveryArrangements: null as string | null,
};

/**
 * BLOCKER: ACCOUNTANT TO CONFIRM HST TREATMENT OF SOD + DELIVERY BEFORE PAID
 * CHECKOUT GOES LIVE. The pricing formula in src/lib/sod/pricing.ts is the
 * owner's formula and is not changed here; this flag only records whether an
 * accountant has confirmed it.
 */
export const TAX_REVIEW = {
  hstTreatmentConfirmedByAccountant: false,
};

/**
 * Optional marketing-email consent on the quote form. Off until the owner runs
 * an email-marketing programme with a working unsubscribe, and a mailing
 * address exists for CASL sender identification.
 */
export const MARKETING_CONSENT = {
  enabled: false,
  version: "2026-10-09",
  channel: "email",
  wording:
    "Optional: send me occasional emails from SilverScape Solutions about seasonal services and offers. I can unsubscribe at any time.",
} as const;

export const marketingConsentAvailable = () =>
  MARKETING_CONSENT.enabled && LEGAL.mailingAddress !== null;

/** Wording of the checkout acknowledgement, stored with each order. */
export const CHECKOUT_ACKNOWLEDGEMENT = {
  version: LEGAL_DOCS.version,
  text: "I have reviewed my order and agree to the Terms & Conditions and Refund & Cancellation Policy.",
} as const;

/**
 * Unresolved items that block live (real-money) sod checkout only. They do not
 * affect the public site, quote requests, contact or test-mode checkout.
 */
export function launchBlockers(): string[] {
  const blockers: string[] = [];
  const undecided = Object.entries(SOD_POLICY)
    .filter(([, v]) => v === null)
    .map(([k]) => k);
  if (undecided.length)
    blockers.push(
      `SOD ORDER RULES: BUSINESS DECISION REQUIRED (${undecided.join(", ")})`,
    );
  if (!TAX_REVIEW.hstTreatmentConfirmedByAccountant)
    blockers.push(
      "ACCOUNTANT TO CONFIRM HST TREATMENT OF SOD + DELIVERY BEFORE PAID CHECKOUT GOES LIVE",
    );
  if (!LEGAL.legalBusinessName)
    blockers.push(
      "Legal business name missing (internet agreement disclosure)",
    );
  if (!LEGAL.businessAddress)
    blockers.push(
      "BUSINESS PREMISES ADDRESS REQUIRED FOR ONTARIO INTERNET-AGREEMENT DISCLOSURE BEFORE LIVE PAID SOD CHECKOUT",
    );
  return blockers;
}
