import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-md)] border border-transparent font-sans text-[0.9375rem] font-semibold tracking-[0.005em] transition-[color,background-color,border-color,box-shadow,transform] duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-3 disabled:pointer-events-none disabled:opacity-55 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        /** Champagne fill — the primary action on dark surfaces. */
        default:
          "bg-gold text-forest-deep shadow-[0_8px_18px_-12px_oklch(0.8_0.075_82/0.7)] hover:bg-gold-soft focus-visible:outline-gold",
        /** Muted-gold outline — same size and weight as the fill, on dark surfaces. */
        outline:
          "border-gold/85 bg-transparent text-cream hover:border-gold hover:bg-gold/12 focus-visible:outline-gold",
        /** Forest fill — the primary action on light surfaces. */
        forest:
          "bg-forest-deep text-cream shadow-[0_8px_18px_-12px_oklch(0.185_0.022_158/0.7)] hover:bg-forest focus-visible:outline-forest",
        /** Forest outline — same size and weight as the fill, on light surfaces. */
        lightOutline:
          "border-forest-deep/80 bg-transparent text-forest-deep hover:border-forest-deep hover:bg-forest-deep/[0.06] focus-visible:outline-forest",
        ghost:
          "bg-transparent text-cream hover:bg-cream/[0.06] hover:text-cream",
        link: "h-auto rounded-none border-none bg-transparent px-0 py-0 text-gold underline-offset-4 hover:underline",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        secondary: "bg-forest-panel text-cream hover:bg-forest-panel/80",
        filter:
          "border-cream/30 bg-transparent text-cream/90 hover:border-gold/70 hover:text-cream",
        filterActive: "border-gold bg-gold/15 text-cream",
      },
      size: {
        default: "min-h-12 px-6 py-3",
        sm: "min-h-11 px-4 py-2 text-sm",
        lg: "min-h-14 px-8 py-3.5 text-base",
        icon: "h-11 w-11 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
