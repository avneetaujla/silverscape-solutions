import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function FAQList({
  items,
  className,
}: {
  items: { q: string; a: string }[];
  className?: string;
}) {
  return (
    <div className={cn("faq-list", className)}>
      {items.map((item) => (
        <details key={item.q} className="group">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
            <h3 className="type-h4">{item.q}</h3>
            <Plus
              aria-hidden
              className="mt-1 h-5 w-5 shrink-0 transition-transform duration-200 group-open:rotate-45"
            />
          </summary>
          <p className="measure pb-6 pr-10 text-muted-dark [.on-light_&]:text-muted-light">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}
