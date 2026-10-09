import { legalSeo } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  LegalPage,
  PrivacyContact,
  type LegalSection,
} from "@/components/site/LegalPage";
import { CookieSettingsButton } from "@/components/site/CookieSettingsButton";
import { GA_MEASUREMENT_ID, META_PIXEL_ID } from "@/lib/analytics";
import { LEGAL, marketingConsentAvailable, privacyEmail } from "@/lib/legal";

const PATH = "/privacy";
const TITLE = "Privacy Policy";

export const Route = createFileRoute("/privacy")({
  head: () =>
    legalSeo({
      title: TITLE,
      description:
        "How SilverScape Solutions collects, uses, shares and protects personal information from quote requests, sod orders and visits to our website.",
      path: PATH,
    }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const email = privacyEmail();
  const marketing = marketingConsentAvailable();
  const sections: LegalSection[] = [
    {
      id: "who-we-are",
      title: "A. Who we are",
      body: (
        <>
          <p>
            This policy explains how {LEGAL.operatingName}
            {LEGAL.legalBusinessName &&
            LEGAL.legalBusinessName !== LEGAL.operatingName
              ? ` (${LEGAL.legalBusinessName})`
              : ""}{" "}
            (&ldquo;SilverScape&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;)
            handles personal information. We provide outdoor and interior
            renovation services and Kentucky Bluegrass sod delivery, and we are
            based in {LEGAL.publicLocality}
            {LEGAL.businessAddress ? ` (${LEGAL.businessAddress})` : ""}.
          </p>
          <p>
            We are responsible for the personal information we collect.
            Questions, requests and concerns about privacy can be sent to our
            Privacy Officer:
          </p>
          <PrivacyContact />
        </>
      ),
    },
    {
      id: "information-we-collect",
      title: "B. Information we collect",
      body: (
        <>
          <h3>When you request a quote</h3>
          <p>
            Your name, phone number, email address, city, the type of project
            and service you&rsquo;re interested in, your preferred timing, your
            project description, and the page you sent the form from.
            {marketing &&
              " If you choose to receive marketing emails, we also record that choice, the date and time, and the wording you agreed to."}
          </p>
          <h3>When you order sod online</h3>
          <p>
            The number of rolls, your delivery street address, city and postal
            code, your name, email address and phone number, and any delivery
            notes you add. Payment card details are entered directly on
            Stripe&rsquo;s checkout page. We do not receive or store your card
            number or security code; Stripe tells us whether the payment
            succeeded and the amount paid.
          </p>
          <h3>When you contact us directly</h3>
          <p>
            Whatever you choose to share when you call or email us, such as your
            contact details and information about your property or project.
          </p>
          <h3>When you visit the website</h3>
          <p>
            Our hosting provider processes technical information such as your IP
            address, browser type and the pages you request, so the site can be
            delivered and protected. We use IP addresses briefly to limit
            repeated form submissions. Analytics and advertising tools run only
            if you allow them (see <a href="#cookies">section I</a>).
          </p>
          <p>
            We don&rsquo;t ask for sensitive information such as health or
            financial details. Please don&rsquo;t include it in a project
            description.
          </p>
        </>
      ),
    },
    {
      id: "why-we-collect-it",
      title: "C. Why we collect it",
      body: (
        <ul>
          <li>
            To respond to your inquiry, prepare a quote or estimate, arrange a
            site visit and provide the services you request.
          </li>
          <li>
            To process a sod order: check your address, calculate the driving
            route and delivery charge, take payment through Stripe, send you a
            copy of your order and arrange delivery.
          </li>
          <li>
            To keep the business, tax and accounting records we are required to
            keep, and to resolve questions or disputes about our work.
          </li>
          <li>To protect the website and our forms from spam and misuse.</li>
          <li>
            Only if you allow it: to understand how the site is used and whether
            our advertising works (see <a href="#cookies">section I</a>).
          </li>
          {marketing && (
            <li>
              Only if you opt in: to send you occasional marketing emails.
            </li>
          )}
        </ul>
      ),
    },
    {
      id: "consent",
      title: "D. Consent",
      body: (
        <>
          <p>
            When you send us a form or place an order, you consent to us using
            your information for the purposes described for that form or order.
            We ask before using your information for anything else.
          </p>
          <p>
            Marketing is always separate and optional. We never require consent
            to marketing emails to request a quote or place an order, and we
            never sign you up automatically. Analytics and marketing cookies
            stay off unless you turn them on.
          </p>
          <p>
            You can withdraw consent at any time, subject to legal or
            contractual limits, by contacting us. If you withdraw consent to
            information we need to provide a service (for example, a delivery
            address), we may not be able to provide that service.
          </p>
        </>
      ),
    },
    {
      id: "third-parties",
      title: "E. Who we share it with",
      body: (
        <>
          <p>
            We do not sell personal information. We share it only with service
            providers that help us run the website and the business, and only as
            needed for the purposes above:
          </p>
          <ul>
            <li>
              <strong>Netlify</strong>: hosts this website and processes website
              requests.
            </li>
            <li>
              <strong>Resend</strong>: delivers quote requests and order
              confirmation emails.
            </li>
            <li>
              <strong>Google (Gmail)</strong>: hosts our business email inbox,
              where quote requests, orders and emails to us are received.
            </li>
            <li>
              <strong>Google Maps Platform</strong>: checks sod delivery
              addresses and calculates the driving route. Your delivery address
              is sent to Google for this purpose.
            </li>
            <li>
              <strong>Stripe</strong>: processes sod payments and keeps a record
              of each order, including your name, email, phone number, delivery
              address and delivery notes.
            </li>
            {LEGAL.leadWebhookProvider && (
              <li>
                <strong>{LEGAL.leadWebhookProvider}</strong>: receives copies of
                quote requests so we can organize and follow up on them.
              </li>
            )}
            {GA_MEASUREMENT_ID && (
              <li>
                <strong>Google Analytics</strong>: only if you allow analytics
                cookies.
              </li>
            )}
            {META_PIXEL_ID && (
              <li>
                <strong>Meta Platforms</strong>: only if you allow marketing
                cookies.
              </li>
            )}
          </ul>
          <p>
            These providers may store or process information in the United
            States or other countries outside Canada. While there, it is subject
            to the laws of those countries and may be accessible to their courts
            and authorities.
          </p>
          <p>
            We may also disclose information where the law requires or allows
            it, for example in response to a valid legal order.
          </p>
        </>
      ),
    },
    {
      id: "retention",
      title: "F. How long we keep it",
      body: (
        <p>
          We keep personal information only as long as reasonably necessary for
          the purposes described in this policy, including to provide our
          services, keep required business, tax and accounting records, resolve
          disputes and meet legal obligations. After that, we delete it or make
          it anonymous.
        </p>
      ),
    },
    {
      id: "safeguards",
      title: "G. How we protect it",
      body: (
        <p>
          We use safeguards appropriate to the sensitivity of the information.
          These include encrypted (HTTPS) connections to the website, limiting
          access to people who need it, and using established service providers.
          Card payments are handled by Stripe. No method of sending or storing
          information is completely secure, so we can&rsquo;t guarantee absolute
          security.
        </p>
      ),
    },
    {
      id: "your-rights",
      title: "H. Access, correction and withdrawing consent",
      body: (
        <>
          <p>
            You can ask to see the personal information we hold about you, ask
            us to correct it, or withdraw your consent. Contact our Privacy
            Officer at <a href={`mailto:${email}`}>{email}</a>. We may need to
            confirm your identity first. We will respond within the time the law
            requires, which is generally 30 days.
          </p>
          <p>
            If you&rsquo;re not satisfied with our response, you can contact the{" "}
            <a
              href="https://www.priv.gc.ca/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Office of the Privacy Commissioner of Canada
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            .
          </p>
        </>
      ),
    },
    {
      id: "cookies",
      title: "I. Cookies and similar technologies",
      body: (
        <p>
          We use strictly necessary browser storage to remember your cookie
          choices. Analytics and marketing tools load only if you allow them.
          Our <Link to="/cookies">Cookie Policy</Link> lists each one. You can
          change your choice at any time in <CookieSettingsButton inline />.
        </p>
      ),
    },
    {
      id: "children",
      title: "J. Children",
      body: (
        <p>
          Our website and services are intended for adults. We do not knowingly
          collect personal information from children. If you believe a child has
          sent us personal information, contact us and we will delete it.
        </p>
      ),
    },
    {
      id: "changes",
      title: "K. Changes to this policy",
      body: (
        <p>
          We may update this policy as our practices or the law change. The
          effective and last-updated dates at the top of this page show when it
          last changed. If we make a material change to how we use personal
          information, we will ask for your consent where the law requires it.
        </p>
      ),
    },
  ];

  return (
    <LegalPage
      title={TITLE}
      path={PATH}
      intro={
        <p>
          We collect only the information we need to answer your questions,
          quote your project and deliver what you order. This policy explains
          what we collect, why, who we share it with and the choices you have.
        </p>
      }
      sections={sections}
    />
  );
}
