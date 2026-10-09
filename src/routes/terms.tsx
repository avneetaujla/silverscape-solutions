import { legalSeo } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ContactLines,
  LegalPage,
  type LegalSection,
} from "@/components/site/LegalPage";
import { LEGAL, serviceEmail } from "@/lib/legal";
import { MAX_ROLLS } from "@/lib/sod/pricing";

const PATH = "/terms";
const TITLE = "Terms & Conditions";

export const Route = createFileRoute("/terms")({
  head: () =>
    legalSeo({
      title: TITLE,
      description:
        "Terms for using the SilverScape Solutions website, requesting quotes and ordering Kentucky Bluegrass sod online in Ontario.",
      path: PATH,
    }),
  component: TermsPage,
});

function TermsPage() {
  const name =
    LEGAL.legalBusinessName && LEGAL.legalBusinessName !== LEGAL.operatingName
      ? `${LEGAL.legalBusinessName}, operating as ${LEGAL.operatingName}`
      : LEGAL.operatingName;

  const sections: LegalSection[] = [
    {
      id: "agreement",
      title: "1. About these Terms",
      body: (
        <>
          <p>
            These Terms apply when you use this website, request a quote or
            place a sod order online. By using the site you agree to them. If
            you don&rsquo;t agree, please don&rsquo;t use the site.
          </p>
          <p>
            <strong>
              Nothing in these Terms limits rights or remedies that cannot
              legally be excluded under applicable consumer protection law.
            </strong>{" "}
            That includes the Consumer Protection Act, 2002 (Ontario).
          </p>
        </>
      ),
    },
    {
      id: "who-we-are",
      title: "2. Who we are",
      body: (
        <>
          <p>
            This website is operated by {name} (&ldquo;SilverScape&rdquo;,
            &ldquo;we&rdquo;, &ldquo;us&rdquo;), based in {LEGAL.publicLocality}
            {LEGAL.businessAddress ? ` at ${LEGAL.businessAddress}` : ""}.
            {LEGAL.hstNumber ? ` HST registration: ${LEGAL.hstNumber}.` : ""}
          </p>
          <ContactLines email={serviceEmail()} />
        </>
      ),
    },
    {
      id: "information",
      title: "3. Information on this website",
      body: (
        <p>
          The content on this site, including service descriptions, guides and
          coverage calculators, is general information to help you plan. It is
          not professional, engineering or legal advice for your property. Some
          photographs are illustrative and are not photos of projects we have
          completed. Portfolio entries marked as concept projects describe
          typical scopes of work, not specific jobs.
        </p>
      ),
    },
    {
      id: "website-use",
      title: "4. Using the website",
      body: (
        <p>
          You may use this site for your own personal, non-commercial purposes:
          to learn about our services, request a quote or order sod. Please give
          accurate information in forms, since we rely on it to respond, price
          and deliver.
        </p>
      ),
    },
    {
      id: "prohibited",
      title: "5. Prohibited use",
      body: (
        <>
          <p>You agree not to:</p>
          <ul>
            <li>
              submit false, misleading or someone else&rsquo;s information;
            </li>
            <li>
              send spam, automated submissions or content that is unlawful,
              abusive or harmful;
            </li>
            <li>
              try to interfere with the site, its security, or the pricing and
              payment process;
            </li>
            <li>
              scrape or copy the site&rsquo;s content in bulk, or use it to
              build a competing service.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "ip",
      title: "6. Intellectual property",
      body: (
        <p>
          The SilverScape name, logo, text and site design are owned by or
          licensed to us. Some images are used under licence from third parties.
          You may not copy, reproduce or reuse them without permission, except
          as the law allows (for example, viewing the site or sharing a link).
        </p>
      ),
    },
    {
      id: "third-party",
      title: "7. Third-party links and services",
      body: (
        <p>
          Some parts of the site rely on other companies, such as Stripe for
          payments and Google Maps Platform for delivery routing, and we may
          link to other websites. Their own terms and privacy policies apply to
          their services. We aren&rsquo;t responsible for the content of
          websites we don&rsquo;t control.
        </p>
      ),
    },
    {
      id: "quotes",
      title: "8. Quotes and estimates",
      body: (
        <p>
          A form submitted through this site is a request for information or a
          quote. It is not an order or a contract, and it does not oblige you to
          pay or to go ahead with any work. Any price we give you will be in
          writing and will state what it includes. Unless it says otherwise, an
          estimate is based on the information available at the time and may
          change if the scope or site conditions turn out to be different.
        </p>
      ),
    },
    {
      id: "project-agreements",
      title: "9. Project agreements",
      body: (
        <p>
          Renovation, landscaping and installation work is governed by the
          written agreement we sign with you. That agreement sets out the scope,
          price, schedule, payments, deposits, changes and any warranty. If it
          conflicts with these Terms, the signed agreement controls, to the
          extent permitted by law.
        </p>
      ),
    },
    {
      id: "sod-orders",
      title: "10. Sod orders",
      body: (
        <>
          <p>
            We sell one product online: Kentucky Bluegrass sod, delivered to
            Ontario addresses. Online orders are limited to{" "}
            {MAX_ROLLS.toLocaleString("en-CA")} rolls, and we may decline
            addresses outside our delivery area.
          </p>
          <p>
            Before you pay, the review step shows the product, the number of
            rolls, the delivery address, the itemized price, tax and total. You
            can go back and correct any detail, or leave without ordering. Your
            order is placed when you check the acknowledgement box, select
            &ldquo;Place Order &amp; Pay&rdquo; and complete payment on
            Stripe&rsquo;s checkout page. We then email you a copy of your
            order.
          </p>
          <p>
            If we can&rsquo;t fulfil an order, we will contact you, and you will
            have the remedies available under applicable law, including a refund
            for anything not delivered.
          </p>
        </>
      ),
    },
    {
      id: "pricing",
      title: "11. Pricing",
      body: (
        <p>
          Prices are in Canadian dollars. The sod price is per roll, and the
          delivery charge is calculated from the full driving route for your
          order: from our base, through the designated pickup stop, to your
          address and back. Our server calculates the total from your roll count
          and address at the time you order. The total on the review step is the
          amount you&rsquo;ll be charged, with no other fees.
        </p>
      ),
    },
    {
      id: "taxes",
      title: "12. Taxes",
      body: (
        <p>
          Applicable taxes are shown as a separate line on the review step and
          in your order copy before you pay.
        </p>
      ),
    },
    {
      id: "payment",
      title: "13. Payment",
      body: (
        <p>
          Online sod orders are paid in full at the time of ordering, through
          Stripe Checkout. Stripe processes your payment details. We never
          receive or store your full card number or security code.
        </p>
      ),
    },
    {
      id: "delivery",
      title: "14. Delivery",
      body: (
        <p>
          After your order is placed, we will contact you to arrange the
          delivery date. Delivery depends on access to the drop-off location and
          on weather and supply conditions. Delivery, cancellation, rescheduling
          and problem reports are covered in our{" "}
          <Link to="/refunds">Refund &amp; Cancellation Policy</Link>.
        </p>
      ),
    },
    {
      id: "customer-responsibilities",
      title: "15. Your responsibilities",
      body: (
        <ul>
          <li>
            Give a complete, correct delivery address and contact details, and
            tell us about access limits such as gates, slopes or narrow
            driveways.
          </li>
          <li>
            Make sure the drop-off area is safe and accessible on the delivery
            day.
          </li>
          <li>
            Sod is a living, perishable product. Have your soil prepared and
            plan to lay it the day it arrives.
          </li>
          <li>
            For project work, follow the responsibilities set out in your
            written agreement.
          </li>
        </ul>
      ),
    },
    {
      id: "cancellations",
      title: "16. Cancellations and refunds",
      body: (
        <>
          <p>
            Sod orders are final once submitted. We do not offer voluntary
            cancellations, refunds or exchanges for sod orders after an order
            has been placed, except where required by applicable law. Project
            and renovation work, including deposits, follows your written
            agreement instead.
          </p>
          <p>
            Details are in our{" "}
            <Link to="/refunds">Refund &amp; Cancellation Policy</Link>. Neither
            that policy nor these Terms limits any cancellation, refund or other
            rights or remedies you have that cannot legally be excluded,
            including under the Consumer Protection Act, 2002.
          </p>
        </>
      ),
    },
    {
      id: "warranties",
      title: "17. Warranties",
      body: (
        <p>
          We don&rsquo;t offer warranties through this website. Any warranty for
          project work will be stated in your written agreement. This does not
          affect warranties or conditions that the law implies and that cannot
          be excluded, including those under the Consumer Protection Act, 2002
          and the Sale of Goods Act (Ontario).
        </p>
      ),
    },
    {
      id: "liability",
      title: "18. Limitation of liability",
      body: (
        <>
          <p>
            TO THE EXTENT PERMITTED BY LAW, we are not liable for indirect,
            incidental or consequential loss arising from your use of this
            website or reliance on its general information, or for temporary
            unavailability of the site.
          </p>
          <p>
            Nothing in these Terms limits rights or remedies that cannot legally
            be excluded under applicable consumer protection law, or limits our
            liability where the law does not allow it to be limited.
          </p>
        </>
      ),
    },
    {
      id: "indemnity",
      title: "19. Misuse of the website",
      body: (
        <p>
          To the extent permitted by law, if you misuse the website in breach of
          section 5 (for example, by submitting someone else&rsquo;s details or
          attacking the site) you are responsible for the reasonable costs that
          misuse directly causes us. This does not apply to normal use of the
          site or to your rights as a consumer.
        </p>
      ),
    },
    {
      id: "law",
      title: "20. Governing law",
      body: (
        <p>
          These Terms are governed by the laws of Ontario and the federal laws
          of Canada that apply there. Disputes may be brought in the courts of
          Ontario. Nothing in this section limits your right as a consumer to
          bring a proceeding that consumer protection law allows.
        </p>
      ),
    },
    {
      id: "severability",
      title: "21. Severability",
      body: (
        <p>
          If any part of these Terms is found invalid or unenforceable, the rest
          continues to apply.
        </p>
      ),
    },
    {
      id: "changes",
      title: "22. Changes to these Terms",
      body: (
        <p>
          We may update these Terms. Changes apply from the date shown at the
          top of this page and do not change the terms of an order you have
          already placed. The version you accepted is recorded with your order.
        </p>
      ),
    },
    {
      id: "contact",
      title: "23. Contact",
      body: <ContactLines email={serviceEmail()} />,
    },
  ];

  return (
    <LegalPage
      title={TITLE}
      path={PATH}
      intro={
        <p>
          These Terms explain how you can use our website, what a quote request
          means, and the terms that apply to online sod orders. Please read them
          before placing an order.
        </p>
      }
      sections={sections}
    />
  );
}
