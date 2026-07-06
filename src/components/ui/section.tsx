"use client";

import { useScrollReveal } from "@/lib/hooks/use-scroll-reveal";
import { cn } from "@/lib/utils";

type SectionProps = React.ComponentProps<"section"> & {
  /** Enable built-in scroll-reveal on the section. Default true. */
  reveal?: boolean;
  /** Vertical padding tier. */
  spacing?: "sm" | "md" | "lg" | "none";
};

const spacingMap: Record<NonNullable<SectionProps["spacing"]>, string> = {
  none: "",
  sm: "py-14 md:py-20",
  md: "py-20 md:py-28",
  lg: "py-24 md:py-32",
};

/**
 * Semantic <section> wrapper with optional built-in scroll reveal.
 * When `reveal` is on, applies the `.reveal` utility and toggles visibility
 * via IntersectionObserver (reduced-motion safe).
 */
export function Section({
  className,
  reveal = true,
  spacing = "lg",
  children,
  ...props
}: SectionProps) {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={reveal ? ref : undefined}
      className={cn(spacingMap[spacing], reveal && "reveal", className)}
      {...props}
    >
      {children}
    </section>
  );
}
