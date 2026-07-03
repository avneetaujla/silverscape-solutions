import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { INTERIOR } from "@/lib/services-data";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHeader } from "@/components/site/Section";
import { CTA } from "@/components/site/CTA";

export const Route = createFileRoute("/interior-renovations/$service")({
  head: ({ params }) => {
    const s = INTERIOR.find((x) => x.slug === params.service);
    return {
      meta: [
        {
          title: `${s?.title ?? "Interior Renovation"} — SilverScape Solutions`,
        },
        { name: "description", content: s?.short ?? "" },
      ],
    };
  },
  loader: ({ params }) => {
    const s = INTERIOR.find((x) => x.slug === params.service);
    if (!s) throw notFound();
    return { service: s };
  },
  component: InteriorPage,
  errorComponent: ({ error }) => (
    <div className="p-20 text-center text-cream">{error.message}</div>
  ),
  notFoundComponent: () => (
    <div className="p-20 text-center text-cream">Service not found</div>
  ),
});

function InteriorPage() {
  const { service } = Route.useLoaderData() as {
    service: import("@/lib/services-data").ServiceDetail;
  };
  return (
    <>
      <PageHero
        eyebrow="Interior Renovations"
        title={service.title}
        description={service.short}
        image={service.hero}
      >
        <CTA to="/contact">Request a Quote</CTA>
        <CTA to="/interior-renovations" variant="outline">
          All Interior Services
        </CTA>
      </PageHero>

      <Section variant="dark">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SectionHeader
              eyebrow="Overview"
              title="What we deliver."
              description={service.intro}
            />
            <ul className="mt-10 grid sm:grid-cols-2 gap-3">
              {service.bullets.map((b) => (
                <li
                  key={b}
                  className="glass-card p-5 flex items-center gap-3 text-sm text-cream/85"
                >
                  <Check className="h-4 w-4 text-gold shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <aside className="glass-card p-7 md:p-8 h-fit">
            <div className="eyebrow">Quick Quote</div>
            <h3 className="font-serif text-2xl text-cream mt-2">
              Get a written estimate
            </h3>
            <p className="text-sm text-cream/65 mt-2">
              Project-managed renovations. Coordinated trades. Clean job sites.
            </p>
            <CTA to="/contact" className="mt-6 w-full">
              Request a Quote
            </CTA>
            <a
              href="tel:+12265004608"
              className="mt-3 block text-center text-sm text-gold"
            >
              (226) 500-4608
            </a>
          </aside>
        </div>
      </Section>

      <Section variant="light">
        <SectionHeader
          variant="light"
          eyebrow="Process"
          title="How we deliver."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {service.process.map((p, i) => (
            <div key={i} className="glass-card-light p-7 md:p-8">
              <div className="font-serif text-5xl text-gold">0{i + 1}</div>
              <div className="mt-3 font-serif text-xl text-forest-deep">
                {p.t}
              </div>
              <p className="mt-2 text-sm text-forest/70">{p.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section variant="deep">
        <SectionHeader eyebrow="FAQ" title="Common questions." />
        <div className="mt-12 grid md:grid-cols-2 gap-6 max-w-5xl">
          {service.faq.map((f, i) => (
            <div key={i} className="premium-faq">
              <div className="font-serif text-xl text-cream">{f.q}</div>
              <p className="mt-2 text-cream/75">{f.a}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section variant="dark">
        <div className="text-center">
          <div className="eyebrow">Other Interior Services</div>
          <h3 className="mt-3 font-serif text-3xl md:text-4xl text-cream">
            Explore the full division
          </h3>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INTERIOR.filter((s) => s.slug !== service.slug).map((s) => (
            <Link
              key={s.slug}
              to="/interior-renovations/$service"
              params={{ service: s.slug }}
              className="group glass-card premium-card-interactive p-6"
            >
              <div className="font-serif text-xl text-cream group-hover:text-gold">
                {s.title}
              </div>
              <div className="text-sm text-cream/60 mt-2">{s.short}</div>
              <div className="premium-link mt-4">
                View <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
