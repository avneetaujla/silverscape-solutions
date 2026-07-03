import { Link } from "@tanstack/react-router";
import type { AnchorHTMLAttributes, MouseEventHandler, ReactNode } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  to?: string;
  href?: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost" | "forest" | "light-outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  icon?: ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
  rel?: AnchorHTMLAttributes<HTMLAnchorElement>["rel"];
};

export function CTA({
  to,
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  icon,
  onClick,
  target,
  rel,
}: Props) {
  const buttonVariant =
    variant === "primary"
      ? "default"
      : variant === "light-outline"
        ? "lightOutline"
        : variant;
  const buttonSize = size === "md" ? "default" : size;
  const cls = cn(
    buttonVariants({ variant: buttonVariant, size: buttonSize }),
    "group",
    className,
  );
  const content = (
    <>
      {icon}
      {children}
    </>
  );
  if (href) {
    return (
      <a
        href={href}
        className={cls}
        onClick={onClick}
        target={target}
        rel={rel}
      >
        {content}
      </a>
    );
  }
  return (
    <Link to={to as string} className={cls} onClick={onClick}>
      {content}
    </Link>
  );
}
