import { legalSeo } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ContactLines,
  LegalPage,
  LegalTable,
  type LegalSection,
} from "@/components/site/LegalPage";
import { CookieSettingsButton } from "@/components/site/CookieSettingsButton";
import { GA_MEASUREMENT_ID, META_PIXEL_ID } from "@/lib/analytics";
import { privacyEmail } from "@/lib/legal";

const PATH = "/cookies";
const TITLE = "Cookie Policy";

export const Route = createFileRoute("/cookies")({
  head: () =>
    legalSeo({
      title: TITLE,
      description:
        "The cookies and browser storage used on the SilverScape Solutions website, what each one does, how long it lasts and how to change your choices.",
      path: PATH,
    }),
  component: CookiesPage,
});

type Item = {
  name: string;
  provider: string;
  purpose: string;
  duration: string;
  party: string;
};

function ItemTable({ label, items }: { label: string; items: Item[] }) {
  return (
    <LegalTable label={label}>
      <caption className="sr-only">{label}</caption>
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Provider</th>
          <th scope="col">Purpose</th>
          <th scope="col">Duration</th>
          <th scope="col">First / third party</th>
        </tr>
      </thead>
      <tbody>
        {items.map((i) => (
          <tr key={i.name}>
            <th scope="row" className="font-mono text-[0.8125rem] font-normal">
              {i.name}
            </th>
            <td>{i.provider}</td>
            <td>{i.purpose}</td>
            <td>{i.duration}</td>
            <td>{i.party}</td>
          </tr>
        ))}
      </tbody>
    </LegalTable>
  );
}

function status(configured: boolean, category: string) {
  return configured
    ? `Used on this site only if you turn on ${category}.`
    : `Not currently active on this site. If we enable it, it will run only if you turn on ${category}.`;
}

function CookiesPage() {
  const sections: LegalSection[] = [
    {
      id: "what-they-are",
      title: "What cookies and browser storage are",
      body: (
        <p>
          Cookies are small files a website saves in your browser. Local and
          session storage are similar browser features. Some are needed for a
          site to work; others are optional and help a business measure use of
          its site or its advertising. On this site, optional tools are off
          until you choose to allow them.
        </p>
      ),
    },
    {
      id: "strictly-necessary",
      title: "Strictly necessary",
      body: (
        <>
          <p>
            These are always on because the site needs them. They are not used
            to track you.
          </p>
          <ItemTable
            label="Strictly necessary storage"
            items={[
              {
                name: "sss_consent",
                provider: "SilverScape (local storage)",
                purpose:
                  "Remembers your cookie choices, the date you made them and the policy version.",
                duration:
                  "Until you change your choice or clear your browser storage",
                party: "First party",
              },
              {
                name: "Stripe Checkout cookies",
                provider: "Stripe",
                purpose:
                  "Set on Stripe's own checkout site when you pay for a sod order, to process the payment securely and prevent fraud.",
                duration: "Set by Stripe; see Stripe's cookie policy",
                party: "Third party (on checkout.stripe.com)",
              },
            ]}
          />
          <p>
            We host our fonts ourselves, so loading them doesn&rsquo;t send
            information about you to a font provider.
          </p>
        </>
      ),
    },
    {
      id: "analytics",
      title: "Analytics",
      body: (
        <>
          <p>
            Google Analytics 4 helps us understand which pages are useful and
            where people leave the quote and order forms.{" "}
            {status(Boolean(GA_MEASUREMENT_ID), "Analytics")} We don&rsquo;t
            send names, email addresses, phone numbers, street addresses or
            project descriptions to Google Analytics, and we turn off Google
            signals and ad personalization.
          </p>
          <ItemTable
            label="Analytics cookies and storage"
            items={[
              {
                name: "_ga",
                provider: "Google Analytics",
                purpose: "Distinguishes one browser from another.",
                duration: "2 years",
                party: "First party (set by Google's script)",
              },
              {
                name: "_ga_<ID>",
                provider: "Google Analytics",
                purpose: "Keeps track of the current visit.",
                duration: "2 years",
                party: "First party (set by Google's script)",
              },
              {
                name: "sss_purchase_<order>",
                provider: "SilverScape (session storage)",
                purpose:
                  "Stops a completed sod order from being counted twice. Set only if you've allowed analytics or marketing.",
                duration: "Until you close the browser tab",
                party: "First party",
              },
            ]}
          />
        </>
      ),
    },
    {
      id: "marketing",
      title: "Marketing and advertising",
      body: (
        <>
          <p>
            The Meta Pixel tells us whether our Facebook and Instagram ads lead
            to quote requests or orders.{" "}
            {status(Boolean(META_PIXEL_ID), "Marketing")} Meta&rsquo;s automatic
            page-scanning features are turned off, and we don&rsquo;t send it
            your contact details.
          </p>
          <ItemTable
            label="Marketing cookies"
            items={[
              {
                name: "_fbp",
                provider: "Meta Platforms",
                purpose: "Identifies the browser for ad measurement.",
                duration: "90 days",
                party: "First party (set by Meta's script)",
              },
              {
                name: "_fbc",
                provider: "Meta Platforms",
                purpose:
                  "Stores the ad-click identifier when you arrive from a Meta ad.",
                duration: "90 days",
                party: "First party (set by Meta's script)",
              },
              {
                name: "Meta cookies (for example fr)",
                provider: "Meta Platforms",
                purpose:
                  "May be read or set on Meta's domains when the pixel loads, for ad delivery and measurement.",
                duration: "Up to 90 days; see Meta's cookie policy",
                party: "Third party (facebook.com)",
              },
            ]}
          />
          <p>
            Durations are the providers&rsquo; published defaults and may
            change. We don&rsquo;t use functional or personalization cookies.
          </p>
        </>
      ),
    },
    {
      id: "your-choices",
      title: "Changing your choices",
      body: (
        <>
          <p>
            You can accept, reject or customize optional cookies at any time.
            Rejecting them doesn&rsquo;t affect quote requests, sod orders or
            any other part of the site. When you turn a category off, we stop
            sending it data and remove its cookies from your browser.
            Information sent before you changed your choice is handled under the
            provider&rsquo;s own policies.
          </p>
          <p>
            <CookieSettingsButton />
          </p>
          <p>
            You can also block or delete cookies in your browser settings. See
            our <Link to="/privacy">Privacy Policy</Link> for more about how we
            handle personal information.
          </p>
        </>
      ),
    },
    {
      id: "contact",
      title: "Contact",
      body: (
        <>
          <p>Questions about cookies or this policy:</p>
          <ContactLines email={privacyEmail()} />
        </>
      ),
    },
  ];

  return (
    <LegalPage
      title={TITLE}
      path={PATH}
      intro={
        <p>
          This policy lists the cookies and browser storage this website uses,
          what each one is for and how long it lasts. Optional analytics and
          marketing tools stay off unless you turn them on.
        </p>
      }
      sections={sections}
    />
  );
}
