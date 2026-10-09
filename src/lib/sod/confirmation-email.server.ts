import {
  LEGAL,
  SOD_FINAL_SALE_STATEMENT,
  SOD_POLICY,
  serviceEmail,
} from "@/lib/legal";
import { SITE_URL } from "@/lib/site";
import { HST_PERCENT, SOD_PRODUCT, formatCents } from "@/lib/sod/pricing";
import type { CheckoutSession } from "@/lib/sod/stripe.server";

const escapeHtml = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );

export function confirmationEmailConfigured() {
  return Boolean(
    process.env.STRIPE_WEBHOOK_SECRET?.trim() &&
    process.env.RESEND_API_KEY?.trim() &&
    process.env.LEAD_FROM_EMAIL?.trim(),
  );
}

function siteOrigin() {
  return SITE_URL || process.env.URL?.trim() || "";
}

async function sendResend(input: {
  to: string[];
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
  idempotencyKey: string;
}) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY!.trim()}`,
      "Content-Type": "application/json",
      "Idempotency-Key": input.idempotencyKey,
    },
    body: JSON.stringify({
      from: process.env.LEAD_FROM_EMAIL!.trim(),
      to: input.to,
      reply_to: input.replyTo,
      subject: input.subject,
      text: input.text,
      html: input.html,
    }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}`);
}

type Row = [string, string];

function orderRows(s: CheckoutSession): Row[] {
  const m = s.metadata;
  const cents = (k: string) => formatCents(Number(m[k] ?? 0));
  const rolls = Number(m.rolls);
  return [
    ["Order reference", s.id],
    [
      "Order date",
      new Date((s.created ?? Date.now() / 1000) * 1000).toLocaleString(
        "en-CA",
        { timeZone: "America/Toronto" },
      ),
    ],
    [
      "Product",
      `${SOD_PRODUCT.name}, ${SOD_PRODUCT.rollDimensions} rolls (about ${SOD_PRODUCT.rollSqFt} sq ft each)`,
    ],
    [
      "Quantity",
      `${rolls.toLocaleString("en-CA")} rolls, about ${(rolls * SOD_PRODUCT.rollSqFt).toLocaleString("en-CA")} sq ft`,
    ],
    ["Sod subtotal", cents("sod_subtotal_cents")],
    [`HST on sod (${HST_PERCENT}%)`, cents("sod_hst_cents")],
    [`Delivery (${m.route_km} km route)`, cents("delivery_cents")],
    ["Total paid (CAD)", formatCents(s.amount_total ?? Number(m.total_cents))],
    ["Payment method", "Paid online through Stripe Checkout"],
    ["Delivery address", m.delivery_address ?? ""],
    [
      "Delivery arrangements",
      SOD_POLICY.deliveryArrangements ??
        "We will contact you to confirm your delivery date.",
    ],
    [
      "Terms accepted",
      `Terms & Conditions and Refund & Cancellation Policy, version ${m.terms_version}, at ${m.terms_accepted_at}`,
    ],
  ];
}

function supplierLines() {
  return [
    LEGAL.legalBusinessName && LEGAL.legalBusinessName !== LEGAL.operatingName
      ? `${LEGAL.legalBusinessName}, operating as ${LEGAL.operatingName}`
      : LEGAL.operatingName,
    LEGAL.businessAddress,
    `Phone: ${LEGAL.businessPhone}`,
    `Email: ${serviceEmail()}`,
    LEGAL.hstNumber ? `HST registration: ${LEGAL.hstNumber}` : null,
  ].filter(Boolean) as string[];
}

function render(rows: Row[], intro: string, extra: string[]) {
  const origin = siteOrigin();
  const links = origin
    ? [
        `Terms & Conditions: ${origin}/terms`,
        `Refund & Cancellation Policy: ${origin}/refunds`,
        `Privacy Policy: ${origin}/privacy`,
      ]
    : [];
  const text = [
    intro,
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    ...extra,
    "",
    "Supplier",
    ...supplierLines(),
    "",
    ...links,
  ].join("\n");
  const html = `<div style="font-family:sans-serif;font-size:14px;line-height:1.5;color:#1b2a22">
<p>${escapeHtml(intro)}</p>
<table cellpadding="6" style="border-collapse:collapse">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="vertical-align:top"><strong>${escapeHtml(k)}</strong></td><td>${escapeHtml(v)}</td></tr>`,
    )
    .join("")}</table>
${extra.map((p) => `<p>${escapeHtml(p)}</p>`).join("")}
<p><strong>Supplier</strong><br>${supplierLines().map(escapeHtml).join("<br>")}</p>
${links.length ? `<p>${links.map((l) => escapeHtml(l)).join("<br>")}</p>` : ""}
</div>`;
  return { text, html };
}

/**
 * Sends the customer a written copy of their sod order (the durable record of
 * the internet agreement) and notifies the business. Idempotent per session,
 * so Stripe webhook retries don't send duplicates.
 */
export async function sendSodOrderEmails(session: CheckoutSession) {
  const rows = orderRows(session);
  const customer = session.customer_details?.email;
  const m = session.metadata;

  if (customer) {
    const { text, html } = render(
      rows,
      `Thank you for your order. This email is your copy of your ${SOD_PRODUCT.name} order with ${LEGAL.operatingName}. Please keep it for your records.`,
      [
        SOD_FINAL_SALE_STATEMENT,
        "Delivery questions and problems are handled under our Refund & Cancellation Policy (link below).",
        `Questions? Call ${LEGAL.businessPhone} or reply to this email.`,
      ],
    );
    await sendResend({
      to: [customer],
      subject: `Your ${SOD_PRODUCT.name} order — ${LEGAL.operatingName}`,
      text,
      html,
      replyTo: serviceEmail(),
      idempotencyKey: `sod-order-customer/${session.id}`,
    });
  }

  const notify = process.env.LEAD_NOTIFICATION_EMAIL?.trim();
  if (notify) {
    const { text, html } = render(
      [
        ["Customer", m.customer_name ?? ""],
        ["Phone", m.customer_phone ?? ""],
        ["Email", customer ?? ""],
        ["Delivery notes", m.notes || "None"],
        ...rows,
      ],
      "New paid sod order.",
      [],
    );
    await sendResend({
      to: notify.split(",").map((s) => s.trim()),
      subject: `Paid sod order — ${m.rolls} rolls`,
      text,
      html,
      replyTo: customer ?? undefined,
      idempotencyKey: `sod-order-business/${session.id}`,
    });
  }
}
