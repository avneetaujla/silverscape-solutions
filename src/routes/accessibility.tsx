import { legalSeo } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import {
  ContactLines,
  LegalPage,
  type LegalSection,
} from "@/components/site/LegalPage";
import { serviceEmail } from "@/lib/legal";

const PATH = "/accessibility";
const TITLE = "Accessibility";

export const Route = createFileRoute("/accessibility")({
  head: () =>
    legalSeo({
      title: TITLE,
      description:
        "SilverScape Solutions' approach to website accessibility, known limitations and how to get information in another format or give feedback.",
      path: PATH,
    }),
  component: AccessibilityPage,
});

function AccessibilityPage() {
  const sections: LegalSection[] = [
    {
      id: "our-approach",
      title: "Our approach",
      body: (
        <>
          <p>
            We want everyone to be able to learn about our services, request a
            quote and order sod on this website, including people who use
            assistive technology. We aim to meet the Web Content Accessibility
            Guidelines (WCAG) 2.2 at Level AA, and to provide our services in a
            way that respects the dignity and independence of people with
            disabilities, consistent with Ontario&rsquo;s Accessibility for
            Ontarians with Disabilities Act, 2005.
          </p>
          <p>
            This is a goal we work toward, not a certification. We have not had
            the site audited by an independent accessibility assessor.
          </p>
        </>
      ),
    },
    {
      id: "what-we-do",
      title: "What we have done",
      body: (
        <ul>
          <li>
            Structured pages with headings, landmarks and a &ldquo;Skip to
            content&rdquo; link.
          </li>
          <li>
            Built menus, forms, dialogs and the sod order steps from standard
            controls that work with a keyboard, with a visible focus indicator.
          </li>
          <li>
            Labelled every form field, marked optional fields, and linked error
            messages to the fields they describe.
          </li>
          <li>
            Written text alternatives for informative images and hidden purely
            decorative ones from screen readers.
          </li>
          <li>Chosen text and control colours for sufficient contrast.</li>
          <li>Reduced animation for people who turn on reduced motion.</li>
          <li>Checked key pages with an automated accessibility tool (axe).</li>
        </ul>
      ),
    },
    {
      id: "known-limitations",
      title: "Known limitations",
      body: (
        <ul>
          <li>
            Payment for sod orders takes place on Stripe&rsquo;s checkout page,
            which Stripe designs and maintains. If you have trouble paying
            there, call us and we will help you complete your order.
          </li>
          <li>
            Automated tools can&rsquo;t find every barrier, and we haven&rsquo;t
            tested with every combination of browser and assistive technology.
          </li>
        </ul>
      ),
    },
    {
      id: "feedback",
      title: "Feedback and other formats",
      body: (
        <>
          <p>
            If something on this site is hard to use, or you&rsquo;d like
            information in another format (for example, by phone or in a
            plain-text email), please tell us. Let us know the page and what you
            were trying to do, and how you&rsquo;d like us to respond.
          </p>
          <ContactLines email={serviceEmail()} />
          <p>
            You can also request a quote or place a sod order by phone instead
            of using the online forms.
          </p>
        </>
      ),
    },
  ];

  return (
    <LegalPage
      title={TITLE}
      path={PATH}
      showEffective={false}
      intro={
        <p>
          This page describes how we&rsquo;ve built this website to be
          accessible, what we know still needs work, and how to reach us if
          something gets in your way.
        </p>
      }
      sections={sections}
    />
  );
}
