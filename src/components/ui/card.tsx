import { cn } from "@/lib/utils";

type CardProps = React.ComponentProps<"div"> & {
  /** Visual treatment. `glass` = liquid-glass surface. */
  variant?: "solid" | "glass" | "outline";
  /** Enable hover lift + glow. Default false (opt-in for interactive cards). */
  interactive?: boolean;
};

const variantMap: Record<NonNullable<CardProps["variant"]>, string> = {
  solid: "bg-card text-card-foreground border border-border shadow-[var(--shadow-soft)]",
  glass: "glass text-card-foreground shadow-[var(--shadow-soft)]",
  outline: "border border-border bg-transparent",
};

export function Card({
  className,
  variant = "solid",
  interactive = false,
  ...props
}: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn(
        "rounded-2xl",
        variantMap[variant],
        interactive &&
          "cursor-pointer transition-all duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-1.5 p-6", className)} {...props} />
  );
}

export function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      className={cn(
        "font-display text-xl leading-tight font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      className={cn("text-sm leading-relaxed text-muted-foreground", className)}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("p-6 pt-0", className)} {...props} />;
}

export function CardFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex items-center gap-3 p-6 pt-0", className)}
      {...props}
    />
  );
}
