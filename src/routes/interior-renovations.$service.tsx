import { createFileRoute, notFound } from "@tanstack/react-router";
import { findService } from "@/lib/services-data";
import { serviceHead } from "@/lib/service-head";
import { ServiceDetailPage } from "@/components/site/ServiceDetailPage";

export const Route = createFileRoute("/interior-renovations/$service")({
  loader: ({ params }) => {
    const service = findService("interior", params.service);
    if (!service) throw notFound();
    return { slug: service.slug };
  },
  head: ({ params }) => {
    const service = findService("interior", params.service);
    return service
      ? serviceHead(service, `/interior-renovations/${service.slug}`)
      : {};
  },
  component: InteriorServicePage,
});

function InteriorServicePage() {
  const { slug } = Route.useLoaderData();
  const service = findService("interior", slug)!;
  return (
    <ServiceDetailPage
      service={service}
      path={`/interior-renovations/${slug}`}
    />
  );
}
