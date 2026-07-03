import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-button)] border border-transparent text-[0.72rem] font-medium uppercase tracking-[0.22em] transition-[color,background-color,border-color,box-shadow,transform] duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-gold text-forest-deep gold-shadow hover:bg-gold-soft hover:-translate-y-0.5",
        destructive:
          "bg-destructive text-destructive-foreground shadow-[var(--shadow-card)] hover:bg-destructive/90 hover:-translate-y-0.5",
        outline:
          "border-cream/28 bg-transparent text-cream hover:border-gold hover:text-gold hover:bg-white/[0.02]",
        secondary:
          "border-cream/14 bg-white/[0.04] text-cream hover:border-cream/28 hover:bg-white/[0.08]",
        ghost: "bg-transparent text-cream/80 hover:text-gold",
        link: "rounded-none border-none bg-transparent px-0 py-0 text-gold shadow-none hover:text-gold-soft",
        forest:
          "bg-forest-deep text-cream shadow-[var(--shadow-card)] hover:bg-forest hover:-translate-y-0.5",
        lightOutline:
          "border-forest-deep/18 bg-transparent text-forest-deep hover:border-forest-deep hover:bg-forest-deep hover:text-cream",
        filter:
          "border-cream/16 bg-transparent text-cream/72 hover:border-cream/34 hover:text-cream",
        filterActive:
          "border-gold bg-gold/8 text-gold shadow-[0_10px_30px_-18px_oklch(0.78_0.12_85_/_0.38)]",
      },
      size: {
        default: "min-h-[3.25rem] px-7 py-3.5",
        sm: "min-h-[2.75rem] px-5 py-2.5 text-[0.68rem] tracking-[0.2em]",
        lg: "min-h-[3.5rem] px-8 py-4",
        icon: "h-11 w-11 px-0 py-0",
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
