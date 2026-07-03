import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[9rem] w-full rounded-[var(--radius-button)] border border-input bg-white/[0.03] px-4 py-3 text-base shadow-none placeholder:text-muted-foreground/70 transition-[border-color,box-shadow,background-color] focus-visible:outline-none focus-visible:ring-0 focus-visible:border-gold focus-visible:shadow-[var(--shadow-focus)] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
