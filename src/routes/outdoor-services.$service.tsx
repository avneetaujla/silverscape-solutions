import { createFileRoute, notFound } from "@tanstack/react-router";
import { findService } from "@/lib/services-data";
import { serviceHead } from "@/lib/service-head";
import { ServiceDetailPage } from "@/components/site/ServiceDetailPage";

export const Route = createFileRoute("/outdoor-services/$service")({
  loader: ({ params }) => {
    const service = findService("outdoor", params.service);
    if (!service) throw notFound();
    return { slug: service.slug };
  },
  head: ({ params }) => {
    const service = findService("outdoor", params.service);
    return service
      ? serviceHead(service, `/outdoor-services/${service.slug}`)
      : {};
  },
  component: OutdoorServicePage,
});

function OutdoorServicePage() {
  const { slug } = Route.useLoaderData();
  const service = findService("outdoor", slug)!;
  return (
    <ServiceDetailPage service={service} path={`/outdoor-services/${slug}`} />
  );
}
