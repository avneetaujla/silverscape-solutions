import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { LEGAL, LEGAL_DOCS } from "@/lib/legal";

export type LegalSection = { id: string; title: string; body: ReactNode };

const dateFmt = new Intl.DateTimeFormat("en-CA", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});
const fmt = (iso: string) => dateFmt.format(new Date(`${iso}T00:00:00Z`));

/** Shared layout for the legal pages: compact header, dates, contents list, readable prose. */
export function LegalPage({
  title,
  path,
  intro,
  sections,
  showEffective = true,
}: {
  title: string;
  path: string;
  intro: ReactNode;
  sections: LegalSection[];
  showEffective?: boolean;
}) {
  return (
    <>
      <header className="legal-header surface-contour pb-10 pt-[calc(var(--header-h)+2.5rem)] md:pb-12">
        <div className="container-site">
          <div className="mx-auto max-w-3xl">
            <Breadcrumbs
              items={[
                { name: "Home", path: "/" },
                { name: title, path },
              ]}
            />
            <h1 className="type-h2 mt-6 text-cream">{title}</h1>
            <p className="mt-4 text-sm text-cream/75">
              {showEffective && (
                <>
                  Effective{" "}
                  <time dateTime={LEGAL_DOCS.effectiveDate}>
                    {fmt(LEGAL_DOCS.effectiveDate)}
                  </time>{" "}
                  ·{" "}
                </>
              )}
              Last updated{" "}
              <time dateTime={LEGAL_DOCS.lastUpdated}>
                {fmt(LEGAL_DOCS.lastUpdated)}
              </time>
            </p>
          </div>
        </div>
      </header>

      <div className="surface-paper on-light section-sm">
        <div className="container-site">
          <div className="mx-auto max-w-3xl">
            <div className="prose-legal type-lead !text-[1.0625rem] text-forest-deep">
              {intro}
            </div>

            {sections.length > 3 && (
              <nav
                aria-labelledby="legal-toc"
                className="legal-toc card-stone mt-10 p-6"
              >
                <h2
                  id="legal-toc"
                  className="text-xs font-semibold uppercase tracking-[0.16em] text-bronze font-sans"
                >
                  On this page
                </h2>
                <ol className="mt-4 grid gap-x-8 gap-y-1.5 text-[0.9375rem] sm:grid-cols-2">
                  {sections.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="inline-flex min-h-8 items-center text-forest underline-offset-4 hover:underline"
                      >
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            <div className="prose-legal mt-12">
              {sections.map((s) => (
                <section key={s.id} aria-labelledby={s.id}>
                  <h2 id={s.id}>{s.title}</h2>
                  {s.body}
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/** Contact block reused at the end of each legal page. */
export function ContactLines({ email }: { email: string }) {
  return (
    <ul>
      <li>
        Email: <a href={`mailto:${email}`}>{email}</a>
      </li>
      <li>
        Phone: <a href={LEGAL.businessPhoneHref}>{LEGAL.businessPhone}</a>
      </li>
      {LEGAL.mailingAddress && <li>Mail: {LEGAL.mailingAddress}</li>}
      {LEGAL.businessHours && <li>Hours: {LEGAL.businessHours}</li>}
    </ul>
  );
}

/** Privacy Officer contact block for the Privacy Policy. */
export function PrivacyContact() {
  return (
    <address className="not-italic">
      {LEGAL.privacyContactNameOrTitle}
      <br />
      {LEGAL.operatingName}
      <br />
      <a href={`mailto:${LEGAL.privacyContactEmail}`}>
        {LEGAL.privacyContactEmail}
      </a>
      <br />
      <a href={LEGAL.businessPhoneHref}>{LEGAL.businessPhone}</a>
    </address>
  );
}

/** Horizontally scrollable table wrapper that keyboard users can scroll. */
export function LegalTable({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="legal-table" role="region" aria-label={label} tabIndex={0}>
      <table>{children}</table>
    </div>
  );
}
