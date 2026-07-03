import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Phone,
  FileText,
  MapPin,
  ShieldCheck,
  Sparkles,
  Hammer,
  Trees,
  Home as HomeIcon,
  Truck,
  ChevronRight,
} from "lucide-react";
import heroImg from "@/assets/hero-outdoor.jpg";
import interiorImg from "@/assets/hero-interior.jpg";
import sodImg from "@/assets/hero-sod.jpg";
import deckImg from "@/assets/proj-deck.jpg";
import paversImg from "@/assets/proj-pavers.jpg";
import landscapeImg from "@/assets/proj-landscape.jpg";
import bathroomImg from "@/assets/proj-bathroom.jpg";
import flooringImg from "@/assets/proj-flooring.jpg";
import { CTA } from "@/components/site/CTA";
import { Section, SectionHeader } from "@/components/site/Section";
import { LeadForm } from "@/components/site/LeadForm";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "SilverScape Solutions — Southern Ontario Property Transformations",
      },
      {
        name: "description",
        content:
          "A premium residential property transformation company serving Guelph, Kitchener, Waterloo, Cambridge and the GTA — outdoor landscapes, interior renovations and Kentucky Bluegrass sod delivery.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-end overflow-hidden">
        <img
          src={heroImg}
          alt="Luxury landscaped backyard at twilight"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute inset-0 bg-forest-deep/40" />
        <div className="relative section-shell pt-40 pb-16 md:pb-24">
          <div className="max-w-4xl">
            <div className="eyebrow mb-6">
              Southern Ontario · Property Transformations
            </div>
            <h1 className="font-serif text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] text-cream leading-[0.98]">
              We transform the way homeowners
              <span className="italic text-gold/95">
                {" "}
                experience their property.
              </span>
            </h1>
            <p className="mt-7 text-lg md:text-xl text-cream/80 max-w-2xl leading-relaxed">
              SilverScape Solutions is a premium residential transformation
              company — designing and building beautiful outdoor spaces and
              elevated interior renovations across Guelph, Kitchener, Waterloo,
              Cambridge and the GTA.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <CTA to="/contact" icon={<ArrowRight className="w-3.5 h-3.5" />}>
                Start Your Project
              </CTA>
              <CTA to="/portfolio" variant="outline">
                View Our Work
              </CTA>
              <CTA
                to="/sod-ordering"
                variant="ghost"
                icon={<Truck className="w-3.5 h-3.5" />}
              >
                Order Sod
              </CTA>
            </div>
          </div>

          {/* Trust band */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl">
            {[
              { icon: Hammer, label: "Two Divisions", v: "Outdoor & Interior" },
              { icon: ShieldCheck, label: "850+ Properties", v: "Transformed" },
              {
                icon: FileText,
                label: "Every Project",
                v: "Written scope & pricing",
              },
              {
                icon: MapPin,
                label: "Southern Ontario",
                v: "Guelph · KW · GTA",
              },
            ].map((b, i) => (
              <div
                key={i}
                className="glass-card premium-card-interactive p-6 flex items-start gap-4"
              >
                <b.icon className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                <div>
                  <div className="premium-kicker text-gold">{b.label}</div>
                  <div className="text-sm text-cream/85 mt-1">{b.v}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TWO DIVISIONS */}
      <Section variant="dark">
        <SectionHeader
          eyebrow="Two Divisions · One Brand"
          title={
            <>
              One trusted team for{" "}
              <em className="text-gold not-italic font-serif italic">
                your entire property
              </em>
              .
            </>
          }
          description="From the curb to the primary bath — SilverScape is organized into two specialized divisions so every project, indoors or out, receives the same level of planning and craftsmanship."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {[
            {
              img: heroImg,
              title: "Outdoor Transformations",
              body: "Landscape design, decks, fences, interlocking, patios, sod and seasonal property care — built for the way you live outdoors.",
              to: "/outdoor-services",
              icon: Trees,
              tag: "Division 01",
            },
            {
              img: interiorImg,
              title: "Interior Renovations",
              body: "Flooring, tile, vinyl & laminate, and complete bathroom renovations — finished to a standard you can run your hand along.",
              to: "/interior-renovations",
              icon: HomeIcon,
              tag: "Division 02",
            },
            {
              img: sodImg,
              title: "Sod Ordering",
              body: "Premium Kentucky Bluegrass sod delivered fresh across Southern Ontario — order direct, no quotes required.",
              to: "/sod-ordering",
              icon: Truck,
              tag: "Direct Order",
            },
          ].map((c) => (
            <Link
              key={c.to}
              to={c.to}
              className="group premium-card premium-card-interactive relative block"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={c.img}
                  alt={c.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/30 to-transparent" />
              </div>
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="premium-kicker text-gold/90 mb-3">{c.tag}</div>
                <c.icon className="h-6 w-6 text-gold mb-3" />
                <h3 className="font-serif text-3xl text-cream">{c.title}</h3>
                <p className="mt-2 text-sm text-cream/80 max-w-sm leading-relaxed">
                  {c.body}
                </p>
                <div className="premium-link mt-5">
                  Explore{" "}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* OUTDOOR OVERVIEW */}
      <Section variant="deep">
        <div className="grid items-center gap-12 lg:grid-cols-2 xl:gap-16">
          <div>
            <SectionHeader
              eyebrow="Division 01 · Outdoor Transformations"
              title={
                <>
                  Outdoor spaces designed to be{" "}
                  <em className="italic text-gold">lived in</em>.
                </>
              }
              description="Backyard gatherings, quiet mornings on the deck, the way your home reads from the street — we design and build outdoor environments that elevate the way you experience your property."
            />
            <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-cream/80">
              {[
                "Landscape Design & Build",
                "Backyard Transformations",
                "Custom Decks",
                "Privacy & Modern Fences",
                "Interlocking & Stonework",
                "Outdoor Living Spaces",
                "Sod Installation",
                "Seasonal Property Care",
              ].map((i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="w-1 h-1 bg-gold rounded-full" />
                  {i}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex gap-3">
              <CTA to="/outdoor-services">Explore Outdoor Division</CTA>
              <CTA to="/portfolio" variant="outline">
                See Recent Work
              </CTA>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src={deckImg}
              alt="Modern deck"
              className="aspect-[4/5] w-full rounded-[var(--radius-card)] object-cover luxe-shadow"
              loading="lazy"
            />
            <img
              src={paversImg}
              alt="Interlocking pavers"
              className="mt-10 aspect-[4/5] w-full rounded-[var(--radius-card)] object-cover luxe-shadow"
              loading="lazy"
            />
          </div>
        </div>
      </Section>

      {/* INTERIOR OVERVIEW */}
      <Section variant="light">
        <div className="grid items-center gap-12 lg:grid-cols-2 xl:gap-16">
          <div className="grid grid-cols-2 gap-4 order-2 lg:order-1">
            <img
              src={bathroomImg}
              alt="Bathroom renovation"
              className="mt-10 aspect-[4/5] w-full rounded-[var(--radius-card)] object-cover luxe-shadow"
              loading="lazy"
            />
            <img
              src={flooringImg}
              alt="Flooring installation"
              className="aspect-[4/5] w-full rounded-[var(--radius-card)] object-cover luxe-shadow"
              loading="lazy"
            />
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeader
              variant="light"
              eyebrow="Division 02 · Interior Renovations"
              title={
                <>
                  Interiors that feel{" "}
                  <em className="italic text-forest">composed</em>.
                </>
              }
              description="Flooring you walk across without thinking. Bathrooms that feel like a retreat. Our interior division is built around organized project management, premium materials, and trades that treat your home like their own."
            />
            <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-forest/80">
              {[
                "Hardwood & Engineered Flooring",
                "Luxury Vinyl & Laminate",
                "Custom Tile Work",
                "Full Bathroom Renovations",
                "Curbless Walk-In Showers",
                "Vanity & Fixture Upgrades",
              ].map((i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="w-1 h-1 bg-forest rounded-full" />
                  {i}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex gap-3">
              <CTA to="/interior-renovations" variant="forest">
                Explore Interior Division
              </CTA>
              <CTA to="/contact" variant="light-outline">
                Start Your Project
              </CTA>
            </div>
          </div>
        </div>
      </Section>

      {/* SOD PORTAL PREVIEW */}
      <section className="relative overflow-hidden bg-forest-deep">
        <img
          src={sodImg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-25"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-deep via-forest-deep/85 to-forest-deep/40" />
        <div className="relative section-shell section-space grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="eyebrow">Direct Order · Kentucky Bluegrass</div>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl lg:text-6xl text-cream leading-[1.05]">
              The same sod we lay on our own projects —{" "}
              <em className="italic text-gold">at your door</em>.
            </h2>
            <p className="mt-6 text-lg text-cream/80 max-w-xl">
              A single, premium Kentucky Bluegrass blend — harvested fresh and
              delivered across Southern Ontario. No quote, no back-and-forth.
              Just professional sod, when you need it.
            </p>
            <div className="mt-8 flex gap-3">
              <CTA
                to="/sod-ordering"
                icon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Open Ordering Portal
              </CTA>
              <CTA
                href="tel:+12265004608"
                variant="outline"
                icon={<Phone className="w-3.5 h-3.5" />}
              >
                Call to Order
              </CTA>
            </div>
          </div>
          <div className="glass-card p-8 md:p-9">
            <div className="eyebrow">Featured Product</div>
            <h3 className="mt-2 font-serif text-3xl text-cream">
              Kentucky Bluegrass Sod
            </h3>
            <div className="mt-2 text-gold font-serif text-2xl">
              $0.85{" "}
              <span className="text-cream/55 text-sm font-sans">per sq ft</span>
            </div>
            <p className="mt-4 text-sm text-cream/75 leading-relaxed">
              A dense, deep-green Ontario-hardy blend with a strong root system
              — the standard we install on our own premium landscape projects.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-cream/80">
              {[
                "Fresh-cut, same-week delivery",
                "Hardy Southern Ontario blend",
                "Transparent pricing — no quote needed",
                "Optional professional installation",
              ].map((a) => (
                <li key={a} className="flex items-start gap-3">
                  <span className="w-1 h-1 bg-gold rounded-full mt-2 shrink-0" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <Section variant="dark">
        <SectionHeader
          eyebrow="The SilverScape Process"
          title={
            <>
              Quietly organized, from{" "}
              <em className="italic text-gold">first call to handover</em>.
            </>
          }
          description="Every project — indoor or out — moves through the same four-stage process. It's why our homeowners trust us with the spaces they actually live in."
        />
        <div className="mt-14 grid md:grid-cols-4 gap-6">
          {[
            {
              n: "01",
              t: "Consultation",
              d: "We listen first. Understand the property, the goals, and how you actually want to use the space.",
            },
            {
              n: "02",
              t: "On-Site Assessment",
              d: "We measure, photograph and confirm scope on-site — before anything is priced.",
            },
            {
              n: "03",
              t: "Written Proposal",
              d: "Itemized scope, material specs, timing and pricing. No verbal estimates, no surprises.",
            },
            {
              n: "04",
              t: "Quiet Execution",
              d: "Organized crews, daily site cleanup, and a finished property handed back the way you'd want.",
            },
          ].map((s) => (
            <div key={s.n} className="glass-card p-7 md:p-8">
              <div className="font-serif text-5xl text-gold/80">{s.n}</div>
              <div className="mt-4 font-serif text-xl text-cream">{s.t}</div>
              <p className="mt-2 text-sm text-cream/65 leading-relaxed">
                {s.d}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* PORTFOLIO PREVIEW */}
      <Section variant="deep">
        <div className="flex items-end justify-between flex-wrap gap-6">
          <SectionHeader
            eyebrow="Recent Work"
            title={
              <>
                Real projects,{" "}
                <em className="italic text-gold">finished cleanly</em>.
              </>
            }
          />
          <Link to="/portfolio" className="premium-link">
            View All Work <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              img: landscapeImg,
              t: "Front Yard Reset",
              c: "Guelph · Landscaping",
            },
            { img: deckImg, t: "Composite Deck Build", c: "Waterloo · Decks" },
            {
              img: paversImg,
              t: "Driveway Interlocking",
              c: "Kitchener · Pavers",
            },
            {
              img: bathroomImg,
              t: "Primary Bath Renovation",
              c: "Cambridge · Interior",
            },
            {
              img: flooringImg,
              t: "Engineered Plank Flooring",
              c: "Mississauga · Interior",
            },
            { img: sodImg, t: "Premium Sod Install", c: "Brampton · Sod" },
          ].map((p, i) => (
            <div
              key={i}
              className="group premium-card premium-card-interactive relative"
            >
              <img
                src={p.img}
                alt={p.t}
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/40 to-transparent opacity-90" />
              <div className="absolute bottom-0 left-0 p-6">
                <div className="premium-kicker text-gold">{p.c}</div>
                <div className="font-serif text-xl text-cream mt-1">{p.t}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* WHY US */}
      <Section variant="dark">
        <SectionHeader
          eyebrow="Why Homeowners Trust SilverScape"
          title={
            <>
              Built for properties that{" "}
              <em className="italic text-gold">deserve better</em>.
            </>
          }
          description="We're not the cheapest contractor on the quote sheet — and we're not trying to be. What we are is the company you call when the property matters."
        />
        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {[
            {
              icon: ShieldCheck,
              t: "One team, full accountability",
              d: "Two specialized divisions — one project manager, one number to call, one standard from start to handover.",
            },
            {
              icon: FileText,
              t: "Written, transparent proposals",
              d: "Itemized scope, material specifications, schedule and price. The same document you'd expect from a high-end builder.",
            },
            {
              icon: Sparkles,
              t: "Finish-first craftsmanship",
              d: "We obsess over the details most contractors overlook — the trims, the transitions, the way it reads up close.",
            },
            {
              icon: MapPin,
              t: "Local Southern Ontario team",
              d: "Based in the Guelph–KW corridor, working in the GTA. We know the neighbourhoods and the standard they expect.",
            },
            {
              icon: Hammer,
              t: "850+ properties transformed",
              d: "A decade of pattern recognition working in your favour — every measurement, every material, every install.",
            },
            {
              icon: Truck,
              t: "Premium sod, on demand",
              d: "Need just sod? Order Kentucky Bluegrass direct. Need it installed? Our outdoor division handles it end-to-end.",
            },
          ].map((b, i) => (
            <div key={i} className="glass-card p-7 md:p-8">
              <b.icon className="h-6 w-6 text-gold" />
              <div className="mt-4 font-serif text-xl text-cream">{b.t}</div>
              <p className="mt-2 text-sm text-cream/70 leading-relaxed">
                {b.d}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section variant="light">
        <SectionHeader
          variant="light"
          eyebrow="From Homeowners"
          title={
            <>
              Word travels in the{" "}
              <em className="italic">right neighbourhoods</em>.
            </>
          }
        />
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {[
            {
              q: "Our backyard went from neglected to magazine-worthy. Crew was clean, organized, and on schedule.",
              n: "Marisa K.",
              c: "Guelph",
            },
            {
              q: "Bathroom renovation finished a day early and the tile work is unreal. Already booked them for the kitchen flooring.",
              n: "Daniel R.",
              c: "Waterloo",
            },
            {
              q: "Interlocking driveway looks better than the showroom photos. Worth every dollar.",
              n: "Anita P.",
              c: "Mississauga",
            },
          ].map((t, i) => (
            <div key={i} className="glass-card-light p-8 md:p-9">
              <div className="text-4xl text-gold font-serif leading-none">
                "
              </div>
              <p className="mt-3 text-forest-deep leading-relaxed">{t.q}</p>
              <div className="mt-6 text-sm text-forest/70">
                — {t.n}, {t.c}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* SERVICE AREAS */}
      <Section variant="deep">
        <div className="grid lg:grid-cols-3 gap-12">
          <div>
            <SectionHeader
              eyebrow="Service Areas"
              title={
                <>
                  Built for Southern{" "}
                  <em className="italic text-gold">Ontario homes</em>.
                </>
              }
              description="We work across Guelph, Kitchener, Waterloo, Cambridge and the Greater Toronto Area — including Toronto, Mississauga and Brampton."
            />
            <Link to="/service-areas" className="premium-link mt-6">
              View all areas <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              "Guelph",
              "Kitchener",
              "Waterloo",
              "Cambridge",
              "Toronto",
              "Mississauga",
              "Brampton",
              "GTA",
            ].map((c) => (
              <Link
                key={c}
                to={`/service-areas/${c.toLowerCase()}` as string}
                className="glass-card premium-card-interactive p-6"
              >
                <MapPin className="h-4 w-4 text-gold" />
                <div className="mt-2 font-serif text-lg text-cream">{c}</div>
                <div className="mt-1 inline-flex items-center gap-1 text-xs text-cream/55">
                  View page <ChevronRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      {/* RESOURCES PREVIEW */}
      <Section variant="dark">
        <div className="flex items-end justify-between flex-wrap gap-6">
          <SectionHeader
            eyebrow="Resources"
            title={
              <>
                Plan smarter{" "}
                <em className="italic text-gold">before you build</em>.
              </>
            }
          />
          <Link to="/resources" className="premium-link">
            All articles <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {[
            {
              c: "Cost Guides",
              t: "Landscaping cost guide for Guelph homeowners",
              s: "landscaping-cost-guide-guelph",
            },
            {
              c: "Sod & Lawn Care",
              t: "Standard vs premium sod: which should you choose?",
              s: "standard-vs-premium-sod",
            },
            {
              c: "Bathrooms",
              t: "Bathroom renovation cost guide for Southern Ontario",
              s: "bathroom-renovation-cost-guide",
            },
          ].map((a) => (
            <Link
              key={a.s}
              to={`/resources/${a.s}` as string}
              className="group block glass-card premium-card-interactive p-7 md:p-8"
            >
              <div className="premium-kicker text-gold">{a.c}</div>
              <div className="mt-3 font-serif text-xl text-cream group-hover:text-gold transition-colors">
                {a.t}
              </div>
              <div className="mt-6 inline-flex items-center gap-1 text-xs tracking-[0.22em] uppercase text-cream/55">
                Read article <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section variant="light">
        <SectionHeader
          variant="light"
          eyebrow="Frequently Asked"
          title="Answers before you ask."
        />
        <div className="mt-12 grid md:grid-cols-2 gap-6 max-w-5xl">
          {[
            {
              q: "Do you handle both outdoor and interior projects?",
              a: "Yes — SilverScape Solutions runs as two coordinated divisions: outdoor improvements and interior renovations. One contact, one accountability.",
            },
            {
              q: "What areas do you serve?",
              a: "Guelph, Kitchener, Waterloo, Cambridge and the GTA — including Toronto, Mississauga and Brampton.",
            },
            {
              q: "How does the sod ordering portal work?",
              a: "Choose your sod quality, enter delivery address, see your total in real time, and proceed to secure checkout.",
            },
            {
              q: "Are quotes really written and transparent?",
              a: "Every proposal includes scope, materials, timing and pricing — no vague line items.",
            },
          ].map((f, i) => (
            <div key={i} className="premium-faq premium-faq-light">
              <div className="font-serif text-xl text-forest-deep">{f.q}</div>
              <p className="mt-2 text-forest/75 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* LEAD CAPTURE */}
      <Section variant="deep" id="quote">
        <div className="grid gap-12 lg:grid-cols-2 xl:gap-16">
          <div>
            <SectionHeader
              eyebrow="Start Your Project"
              title={
                <>
                  Tell us about your{" "}
                  <em className="italic text-gold">property</em>.
                </>
              }
              description="One short form. We'll respond within one business day with the next steps."
            />
            <div className="mt-10 space-y-4 text-sm text-cream/75">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold" />
                <a href="tel:+12265004608" className="hover:text-gold">
                  (226) 500-4608
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-gold" />
                <a
                  href="mailto:silverscapesolutions@gmail.com"
                  className="hover:text-gold"
                >
                  silverscapesolutions@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-gold" />
                Guelph · Kitchener · Waterloo · GTA
              </div>
            </div>
          </div>
          <div className="glass-card p-8 md:p-9">
            <LeadForm />
          </div>
        </div>
      </Section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-forest-deep">
        <img
          src={heroImg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/85 to-forest-deep/60" />
        <div className="relative section-shell section-space text-center">
          <div className="eyebrow">Ready When You Are</div>
          <h2 className="mt-4 font-serif text-4xl md:text-6xl text-cream max-w-3xl mx-auto leading-[1.05]">
            Let's make your property{" "}
            <em className="italic text-gold">feel finished</em>.
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <CTA to="/contact">Request a Quote</CTA>
            <CTA to="/sod-ordering" variant="outline">
              Order Sod
            </CTA>
          </div>
        </div>
      </section>
    </>
  );
}
