import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin } from "lucide-react";
import { CTA } from "./CTA";

export function Footer() {
  return (
    <footer className="bg-forest-deep border-t border-cream/10">
      <div className="section-shell py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="font-serif text-2xl text-cream">SilverScape</div>
          <div className="premium-kicker mt-1 text-gold">Solutions</div>
          <p className="mt-5 text-sm text-cream/65 leading-relaxed max-w-xs">
            Premium outdoor and interior renovations across Southern Ontario.
            Clear pricing. Cleaner execution.
          </p>
        </div>

        <div>
          <h4 className="eyebrow mb-4">Outdoor</h4>
          <ul className="space-y-2.5 text-sm text-cream/75">
            <li>
              <Link
                to="/outdoor-services/landscaping"
                className="hover:text-gold"
              >
                Landscaping
              </Link>
            </li>
            <li>
              <Link
                to="/outdoor-services/sod-installation"
                className="hover:text-gold"
              >
                Sod Installation
              </Link>
            </li>
            <li>
              <Link to="/outdoor-services/decks" className="hover:text-gold">
                Decks
              </Link>
            </li>
            <li>
              <Link to="/outdoor-services/fences" className="hover:text-gold">
                Fences
              </Link>
            </li>
            <li>
              <Link
                to="/outdoor-services/interlocking"
                className="hover:text-gold"
              >
                Interlocking
              </Link>
            </li>
            <li>
              <Link
                to="/outdoor-services/lawn-maintenance"
                className="hover:text-gold"
              >
                Lawn Maintenance
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="eyebrow mb-4">Interior</h4>
          <ul className="space-y-2.5 text-sm text-cream/75">
            <li>
              <Link
                to="/interior-renovations/flooring"
                className="hover:text-gold"
              >
                Flooring
              </Link>
            </li>
            <li>
              <Link
                to="/interior-renovations/vinyl-laminate"
                className="hover:text-gold"
              >
                Vinyl & Laminate
              </Link>
            </li>
            <li>
              <Link to="/interior-renovations/tile" className="hover:text-gold">
                Tile
              </Link>
            </li>
            <li>
              <Link
                to="/interior-renovations/bathrooms"
                className="hover:text-gold"
              >
                Bathrooms
              </Link>
            </li>
            <li>
              <Link to="/sod-ordering" className="hover:text-gold">
                Order Sod →
              </Link>
            </li>
            <li>
              <Link to="/portfolio" className="hover:text-gold">
                Portfolio
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="eyebrow mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-cream/75">
            <li className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-gold mt-0.5" />
              <a href="tel:+12265004608" className="hover:text-gold">
                (226) 500-4608
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-gold mt-0.5" />
              <a
                href="mailto:silverscapesolutions@gmail.com"
                className="hover:text-gold break-all"
              >
                silverscapesolutions@gmail.com
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-gold mt-0.5" />
              Guelph · Kitchener · Waterloo · GTA
            </li>
          </ul>
          <CTA to="/contact" variant="outline" size="sm" className="mt-6">
            Request a Quote
          </CTA>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="section-shell py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream/50">
          <span>
            © {new Date().getFullYear()} SilverScape Solutions. All rights
            reserved.
          </span>
          <span>Southern Ontario Residential Projects</span>
        </div>
      </div>
    </footer>
  );
}
