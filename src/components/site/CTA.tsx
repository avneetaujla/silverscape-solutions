import { Link, type LinkProps } from "@tanstack/react-router";
import type { MouseEventHandler, ReactNode } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "forest" | "light-outline" | "ghost";

const VARIANT_MAP = {
  primary: "default",
  outline: "outline",
  forest: "forest",
  "light-outline": "lightOutline",
  ghost: "ghost",
} as const;

type Props = {
  children: ReactNode;
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  className?: string;
  icon?: ReactNode;
  iconAfter?: ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  /** Analytics event name picked up by the delegated click tracker. */
  track?: "request_quote_click";
  trackLabel?: string;
} & (
  | {
      to: LinkProps["to"];
      params?: LinkProps["params"];
      search?: LinkProps["search"];
      hash?: string;
      href?: never;
    }
  | { href: string; to?: never; params?: never; search?: never; hash?: never }
);

export function CTA(props: Props) {
  const {
    children,
    variant = "primary",
    size = "md",
    className,
    icon,
    iconAfter,
    onClick,
    track,
    trackLabel,
  } = props;
  const cls = cn(
    buttonVariants({
      variant: VARIANT_MAP[variant],
      size: size === "md" ? "default" : size,
    }),
    className,
  );
  const content = (
    <>
      {icon}
      {children}
      {iconAfter}
    </>
  );
  const data = track
    ? { "data-track": track, "data-track-label": trackLabel }
    : {};
  if (props.href !== undefined) {
    return (
      <a href={props.href} className={cls} onClick={onClick} {...data}>
        {content}
      </a>
    );
  }
  return (
    <Link
      to={props.to}
      params={props.params as never}
      search={props.search as never}
      hash={props.hash}
      className={cls}
      onClick={onClick}
      {...data}
    >
      {content}
    </Link>
  );
}
