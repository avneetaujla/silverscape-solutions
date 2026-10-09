import { Link } from "@tanstack/react-router";
import { ArrowRight, Phone } from "lucide-react";
import { CTA } from "@/components/site/CTA";
import { BUSINESS } from "@/lib/site";
import { typeset } from "@/lib/typeset";

export function FinalCTA({
  title = "Ready to see what your property could become?",
  description = "Tell us about the space and what you want to change. We'll walk the property, put the plan in writing, and show you exactly what it takes.",
  showSod = true,
}: {
  title?: string;
  description?: string;
  showSod?: boolean;
}) {
  return (
    <section
      className="relative isolate overflow-hidden surface-contour"
      aria-labelledby="final-cta"
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent"
      />
      <div className="container-site section text-center">
        <p className="eyebrow eyebrow-plain">Start your project</p>
        <h2 id="final-cta" className="type-h2 mx-auto mt-4 max-w-[62rem]">
          {typeset(title)}
        </h2>
        <p className="type-lead mx-auto mt-5 measure text-cream/85">
          {description}
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-x-3 gap-y-4">
          <CTA
            to="/contact"
            size="lg"
            iconAfter={<ArrowRight aria-hidden />}
            track="request_quote_click"
            trackLabel="final_cta"
          >
            Request a Quote
          </CTA>
          <CTA
            href={BUSINESS.phoneHref}
            variant="outline"
            size="lg"
            icon={<Phone aria-hidden />}
          >
            {BUSINESS.phoneDisplay}
          </CTA>
          {showSod && (
            <Link to="/sod-ordering" className="link-arrow min-h-14 px-3">
              Order sod online <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
