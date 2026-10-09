import { legalSeo } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ContactLines,
  LegalPage,
  type LegalSection,
} from "@/components/site/LegalPage";
import {
  SOD_FINAL_SALE_STATEMENT,
  SOD_POLICY,
  serviceEmail,
} from "@/lib/legal";

const PATH = "/refunds";
const TITLE = "Refund & Cancellation Policy";

export const Route = createFileRoute("/refunds")({
  head: () =>
    legalSeo({
      title: TITLE,
      description:
        "How cancellations, changes and refunds work for SilverScape Solutions project services and online Kentucky Bluegrass sod orders.",
      path: PATH,
    }),
  component: RefundsPage,
});

const SOD_RULES: { key: keyof typeof SOD_POLICY; title: string }[] = [
  { key: "deliveryArrangements", title: "Delivery date" },
  { key: "reschedulingRules", title: "Rescheduling a delivery" },
  { key: "failedDeliveryRules", title: "If delivery can't be completed" },
  {
    key: "customerAddressErrorRules",
    title: "If the delivery address is wrong or incomplete",
  },
  {
    key: "damagedOrIncorrectOrderClaimWindow",
    title: "Damaged, short or incorrect orders",
  },
];

function RefundsPage() {
  const defined = SOD_RULES.filter((r) => SOD_POLICY[r.key] !== null);
  const complete = defined.length === SOD_RULES.length;

  const sections: LegalSection[] = [
    {
      id: "project-services",
      title: "A. Project and renovation work",
      body: (
        <>
          <p>
            This section covers landscaping, hardscaping, construction,
            installation and renovation work. The sod final-sale policy in
            section B does not apply to this work or to its deposits.
          </p>
          <h3>Quotes</h3>
          <p>
            Requesting a quote or estimate is free of obligation. You
            don&rsquo;t have to pay anything or go ahead with the work.
          </p>
          <h3>Deposits, cancellations and changes</h3>
          <p>
            For renovation, landscaping and installation work, deposits,
            cancellations, refunds and change orders follow the written
            agreement we sign with you. Please read those terms before you sign,
            and ask us about anything that isn&rsquo;t clear.
          </p>
          <h3>Your statutory rights</h3>
          <p>
            Ontario&rsquo;s Consumer Protection Act, 2002 gives consumers
            cancellation rights that a contract cannot take away. For example,
            if an agreement is negotiated or signed in person somewhere other
            than our place of business, such as at your home, it is generally a
            &ldquo;direct agreement&rdquo;, and you may cancel it for any reason
            within 10 days after receiving your written copy. Nothing in this
            policy or in our agreements limits those rights.
          </p>
        </>
      ),
    },
    {
      id: "sod-orders",
      title: "B. Sod orders",
      body: (
        <>
          <p>
            This section covers Kentucky Bluegrass sod ordered for delivery,
            including online orders.
          </p>
          <h3>Sod orders are final</h3>
          <p>{SOD_FINAL_SALE_STATEMENT}</p>
          <ul>
            <li>
              <strong>Cancellations:</strong> {SOD_POLICY.sodCancellationRules}
            </li>
            <li>
              <strong>Refunds:</strong> {SOD_POLICY.sodRefundRules}
            </li>
            <li>
              <strong>Exchanges:</strong> {SOD_POLICY.sodExchangeRules}
            </li>
          </ul>
          {defined.map((r) => (
            <div key={r.key}>
              <h3>{r.title}</h3>
              <p>{SOD_POLICY[r.key]}</p>
            </div>
          ))}
          {!complete && (
            <>
              <h3>Delivery, address and order problems</h3>
              <p>
                If delivery can&rsquo;t be completed, the delivery address was
                entered incorrectly, the order arrives damaged, short or
                incorrect, or you need to discuss your delivery date, contact us
                as soon as possible. Sod is a perishable, living product, so
                calling is fastest.
              </p>
            </>
          )}
          <h3>Your statutory rights</h3>
          <p>
            The Consumer Protection Act, 2002 gives consumers specific rights to
            cancel an online (internet) agreement in some situations, for
            example if required information wasn&rsquo;t disclosed before the
            order or goods aren&rsquo;t delivered within the time the Act
            allows. If you cancel under the Act and a refund owed to you
            isn&rsquo;t paid, you may in some circumstances ask your credit card
            issuer to reverse the charge. Nothing in this policy limits those
            rights.
          </p>
        </>
      ),
    },
    {
      id: "how-to-contact",
      title: "C. How to contact us",
      body: (
        <>
          <p>
            For questions about a project agreement, a sod order or your rights,
            contact us by phone or email with your name and, for sod orders, the
            order reference from your confirmation email. For anything that
            affects a delivery, calling is fastest.
          </p>
          <ContactLines email={serviceEmail()} />
          <p>
            See also our <Link to="/terms">Terms &amp; Conditions</Link>.
          </p>
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
          This policy covers cancellations, changes and refunds. Project and
          renovation work (section A) and sod orders (section B) are handled
          differently. Your rights under Ontario consumer protection law always
          apply.
        </p>
      }
      sections={sections}
    />
  );
}
