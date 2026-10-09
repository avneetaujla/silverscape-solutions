import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export type Crumb = { name: string; path: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-cream/75">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="text-cream">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link
                    to={item.path}
                    className="hover:text-cream underline-offset-4 hover:underline"
                  >
                    {item.name}
                  </Link>
                  <ChevronRight
                    aria-hidden
                    className="h-3.5 w-3.5 text-cream/50"
                  />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
