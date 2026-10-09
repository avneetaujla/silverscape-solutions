import { createFileRoute } from "@tanstack/react-router";
import { DivisionHub } from "@/components/site/DivisionHub";
import { media } from "@/content/mediaCatalog";
import { INTERIOR } from "@/lib/services-data";
import { breadcrumbSchema, seo, serviceSchema } from "@/lib/seo";

const PATH = "/interior-renovations";

export const Route = createFileRoute("/interior-renovations/")({
  head: () =>
    seo({
      title: "Interior Renovations — Flooring, Tile & Bathrooms | SilverScape",
      description:
        "Vinyl, laminate and tile flooring, full bathroom renovations, showers, tubs, vanities and finishing for homes in Guelph, Kitchener-Waterloo, Cambridge and the GTA.",
      path: PATH,
      image: media("main-floor-oak").src,
      jsonLd: [
        serviceSchema({
          name: "Interior Renovations",
          serviceType: "Residential renovation",
          description:
            "Flooring installation, tile work and bathroom renovations for residential properties.",
          path: PATH,
        }),
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Interior", path: PATH },
        ]),
      ],
    }),
  component: InteriorHub,
});

function InteriorHub() {
  return (
    <DivisionHub
      division="interior"
      image={media("main-floor-oak")}
      eyebrow="Interior Renovations"
      title={
        <>
          Interiors that feel{" "}
          <span className="accent-serif">calm, considered and complete.</span>
        </>
      }
      description="Flooring that runs flat and quiet from room to room. Bathrooms rebuilt from the studs out. Every detail coordinated by one team."
      services={INTERIOR}
      approach={[
        {
          t: "Prep you never see",
          d: "Subfloor leveling, waterproofing and rough-in done properly, so finishes stay right for years.",
        },
        {
          t: "Selections up front",
          d: "Tile, flooring and fixtures chosen before demolition, so lead times never stall the project.",
        },
        {
          t: "A livable home",
          d: "Dust protection, daily cleanup and scheduling that keeps the rest of the house usable.",
        },
      ]}
      articleSlugs={[
        "bathroom-renovation-cost-guide",
        "vinyl-vs-laminate",
        "tile-vs-vinyl-bathrooms",
      ]}
      path={PATH}
      crumb="Interior"
    />
  );
}
