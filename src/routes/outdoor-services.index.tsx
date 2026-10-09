import { createFileRoute } from "@tanstack/react-router";
import { DivisionHub } from "@/components/site/DivisionHub";
import { media } from "@/content/mediaCatalog";
import { OUTDOOR } from "@/lib/services-data";
import { breadcrumbSchema, seo, serviceSchema } from "@/lib/seo";

const PATH = "/outdoor-services";

export const Route = createFileRoute("/outdoor-services/")({
  head: () =>
    seo({
      title:
        "Outdoor Transformations — Landscaping, Hardscape, Decks & Lawns | SilverScape",
      description:
        "Landscaping, full yard transformations, interlocking, patios, decks, fences, grading and sod across Guelph, Kitchener, Waterloo, Cambridge and the GTA.",
      path: PATH,
      image: media("front-yard-walkway").src,
      jsonLd: [
        serviceSchema({
          name: "Outdoor Transformations",
          serviceType: "Landscaping and outdoor construction",
          description:
            "Landscaping, hardscape, decks, fences, grading and lawn services for residential properties.",
          path: PATH,
        }),
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Outdoor", path: PATH },
        ]),
      ],
    }),
  component: OutdoorHub,
});

function OutdoorHub() {
  return (
    <DivisionHub
      division="outdoor"
      image={media("front-yard-walkway")}
      eyebrow="Outdoor Transformations"
      title={
        <>
          Outdoor space that works{" "}
          <span className="accent-serif">as hard as your home.</span>
        </>
      }
      description="From a front-yard reset to a complete backyard rebuild — grading, hardscape, structures, planting and lawn, planned as one property."
      services={OUTDOOR}
      approach={[
        {
          t: "Whole-property thinking",
          d: "Even a single project is planned with the rest of the yard in mind, so future phases fit.",
        },
        {
          t: "The right build order",
          d: "Grading, drainage and base work come first. Finishes go in last, where they cannot be damaged.",
        },
        {
          t: "Built for Ontario",
          d: "Foundations, bases and plant choices planned for freeze-thaw and clay soils.",
        },
      ]}
      articleSlugs={[
        "what-to-expect-yard-makeover",
        "deck-vs-patio",
        "best-interlocking-ontario-weather",
      ]}
      path={PATH}
      crumb="Outdoor"
    />
  );
}
