import { serviceImage, type ServiceDetail } from "@/lib/services-data";
import { breadcrumbSchema, faqSchema, seo, serviceSchema } from "@/lib/seo";

export const DIVISION_META = {
  outdoor: {
    name: "Outdoor Transformations",
    hub: "/outdoor-services",
    crumb: "Outdoor",
  },
  interior: {
    name: "Interior Renovations",
    hub: "/interior-renovations",
    crumb: "Interior",
  },
} as const;

export function serviceHead(service: ServiceDetail, path: string) {
  const d = DIVISION_META[service.division];
  const crumbs = [
    { name: "Home", path: "/" },
    { name: d.crumb, path: d.hub },
    { name: service.title, path },
  ];
  return seo({
    title: `${service.metaTitle} | SilverScape`,
    description: service.metaDescription,
    path,
    image: serviceImage(service).src,
    jsonLd: [
      serviceSchema({
        name: service.title,
        description: service.metaDescription,
        path,
        serviceType: service.title,
      }),
      breadcrumbSchema(crumbs),
      faqSchema(service.faq),
    ],
  });
}
