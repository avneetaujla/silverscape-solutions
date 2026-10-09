import { cn } from "@/lib/utils";

/**
 * Schematic service-area map (not to scale). Positions are projected from
 * real coordinates so relative placement is honest; no map tiles or API key.
 */
const CITIES: {
  slug: string;
  name: string;
  x: number;
  y: number;
  /** Label anchor offset. */
  lx: number;
  ly: number;
  anchor?: "start" | "end" | "middle";
  gta?: boolean;
}[] = [
  {
    slug: "waterloo",
    name: "Waterloo",
    x: 66,
    y: 140,
    lx: 0,
    ly: -14,
    anchor: "middle",
  },
  { slug: "kitchener", name: "Kitchener", x: 78, y: 152, lx: 12, ly: 5 },
  {
    slug: "cambridge",
    name: "Cambridge",
    x: 118,
    y: 178,
    lx: 0,
    ly: 22,
    anchor: "middle",
  },
  { slug: "guelph", name: "Guelph", x: 131, y: 118, lx: 14, ly: -8 },
  {
    slug: "brampton",
    name: "Brampton",
    x: 243,
    y: 62,
    lx: 0,
    ly: -14,
    anchor: "middle",
    gta: true,
  },
  {
    slug: "mississauga",
    name: "Mississauga",
    x: 270,
    y: 106,
    lx: 12,
    ly: -4,
    gta: true,
  },
  {
    slug: "toronto",
    name: "Toronto",
    x: 330,
    y: 87,
    lx: 0,
    ly: -14,
    anchor: "middle",
    gta: true,
  },
];

export function RegionMap({
  active,
  className,
}: {
  /** City slugs to highlight; "gta" highlights the three GTA cities. */
  active: string[];
  className?: string;
}) {
  const isActive = (c: (typeof CITIES)[number]) =>
    active.includes(c.slug) || (c.gta === true && active.includes("gta"));

  return (
    <figure className={cn("card-dark overflow-hidden p-5", className)}>
      <svg
        viewBox="0 0 400 240"
        role="img"
        aria-label={`Schematic map of the SilverScape service area${
          active.length ? `, highlighting ${active.join(", ")}` : ""
        }`}
        className="h-auto w-full"
      >
        <path
          d="M400 34 C372 60 350 82 330 98 C305 112 288 120 279 130 C270 142 266 152 262 162 C252 180 240 194 226 204 C218 209 212 212 210 216 C240 224 270 232 300 240 L400 240 Z"
          className="fill-cream/[0.06]"
        />
        <text
          x="330"
          y="200"
          textAnchor="middle"
          className="fill-cream/45 text-[11px] italic tracking-[0.2em]"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          LAKE ONTARIO
        </text>
        <path
          d="M48 182 C80 176 100 168 131 160 C165 150 195 138 216 130 C238 120 252 100 268 89 C290 76 305 70 325 68 C350 65 375 62 400 60"
          className="fill-none stroke-gold/35"
          strokeWidth="1.5"
          strokeDasharray="5 5"
        />
        <text
          x="182"
          y="162"
          className="fill-gold/70 text-[11px] tracking-[0.18em]"
        >
          401
        </text>
        {CITIES.map((c) => {
          const on = isActive(c);
          const base = c.slug === "guelph";
          return (
            <g key={c.slug}>
              {base && (
                <circle
                  cx={c.x}
                  cy={c.y}
                  r="11"
                  className="fill-none stroke-gold/50"
                  strokeWidth="1"
                />
              )}
              <circle
                cx={c.x}
                cy={c.y}
                r={on ? 5.5 : 3.5}
                className={on ? "fill-gold" : "fill-cream/55"}
              />
              <text
                x={c.x + c.lx}
                y={c.y + c.ly}
                textAnchor={c.anchor ?? "start"}
                className={cn(
                  "text-[14px]",
                  on ? "fill-cream font-semibold" : "fill-cream/70",
                )}
              >
                {c.name}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-cream/70">
        <span className="inline-flex items-center gap-2">
          <span
            aria-hidden
            className="h-3 w-3 rounded-full border border-gold/60"
          />
          Guelph base
        </span>
        <span className="inline-flex items-center gap-2">
          <span
            aria-hidden
            className="h-2 w-5 border-t border-dashed border-gold/60"
          />
          Highway 401
        </span>
        <span>Schematic, not to scale</span>
      </figcaption>
    </figure>
  );
}
