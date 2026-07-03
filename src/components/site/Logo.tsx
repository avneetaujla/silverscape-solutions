import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-3 group ${className}`}>
      <span className="font-serif text-2xl tracking-tight text-cream">
        SilverScape
      </span>
      <span className="premium-kicker hidden text-gold sm:inline">
        Solutions
      </span>
    </Link>
  );
}
