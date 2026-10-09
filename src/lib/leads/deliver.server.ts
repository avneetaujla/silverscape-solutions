import type { Lead } from "@/lib/leads/lead-schema";

const escapeHtml = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );

function leadRows(lead: Lead) {
  return [
    ["Name", lead.name],
    ["Phone", lead.phone],
    ["Email", lead.email],
    ["City", lead.city],
    ["Division", lead.division === "outdoor" ? "Outdoor" : "Interior"],
    ["Service", lead.service],
    ["Timing", lead.timing],
    ["Submitted from", lead.pagePath],
  ] as const;
}

async function sendEmail(lead: Lead) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.LEAD_NOTIFICATION_EMAIL?.trim();
  if (!apiKey || !to) return null;
  const from =
    process.env.LEAD_FROM_EMAIL?.trim() ||
    "SilverScape Website <onboarding@resend.dev>";
  const rows = leadRows(lead);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: to.split(",").map((s) => s.trim()),
      reply_to: lead.email,
      subject: `New quote request — ${lead.service} in ${lead.city}`,
      text: `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nProject details:\n${lead.description}`,
      html: `<table cellpadding="6" style="font-family:sans-serif;font-size:14px">${rows
        .map(
          ([k, v]) =>
            `<tr><td><strong>${k}</strong></td><td>${escapeHtml(v)}</td></tr>`,
        )
        .join(
          "",
        )}</table><p style="font-family:sans-serif;font-size:14px"><strong>Project details</strong><br>${escapeHtml(
        lead.description,
      ).replace(/\n/g, "<br>")}</p>`,
    }),
  });
  if (!res.ok)
    throw new Error(
      `Resend ${res.status}: ${await res.text().catch(() => "")}`,
    );
  return "email";
}

async function sendWebhook(lead: Lead) {
  const url = process.env.LEAD_WEBHOOK_URL?.trim();
  if (!url) return null;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  const secret = process.env.LEAD_WEBHOOK_SECRET?.trim();
  if (secret) headers["X-Webhook-Secret"] = secret;
  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({
      type: "quote_request",
      submittedAt: new Date().toISOString(),
      ...Object.fromEntries(
        leadRows(lead).map(([k, v]) => [
          k.toLowerCase().replace(/\s+/g, "_"),
          v,
        ]),
      ),
      description: lead.description,
    }),
  });
  if (!res.ok) throw new Error(`Webhook ${res.status}`);
  return "webhook";
}

/** Delivers a lead to every configured channel. Succeeds if at least one channel accepts it. */
export async function deliverLead(lead: Lead) {
  const attempts: PromiseSettledResult<string | null>[] =
    await Promise.allSettled([sendEmail(lead), sendWebhook(lead)]);
  const delivered = attempts
    .filter(
      (a): a is PromiseFulfilledResult<string | null> =>
        a.status === "fulfilled",
    )
    .map((a) => a.value)
    .filter(Boolean);
  attempts
    .filter((a): a is PromiseRejectedResult => a.status === "rejected")
    .forEach((a) => console.error("[lead] delivery channel failed", a.reason));
  const configured = attempts.some(
    (a) =>
      a.status === "rejected" || (a.status === "fulfilled" && a.value !== null),
  );
  return { configured, delivered: delivered.length > 0 };
}
