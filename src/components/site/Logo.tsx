import { Link } from "@tanstack/react-router";
import mark from "@/assets/brand-mark.png";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className={cn("flex items-center gap-3", className)}
    >
      <span className="grid h-10 w-10 place-items-center rounded-[var(--radius-lg)] bg-cream">
        <img src={mark} alt="" width={96} height={96} className="h-8 w-8" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-serif text-[1.45rem] font-medium tracking-tight text-cream">
          SilverScape
        </span>{" "}
        <span className="mt-1 text-[0.625rem] font-semibold uppercase tracking-[0.32em] text-gold">
          Solutions
        </span>
      </span>
      <span className="sr-only"> — home</span>
    </Link>
  );
}
