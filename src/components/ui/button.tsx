import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button relative inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-transparent bg-clip-padding font-medium whitespace-nowrap transition-all duration-200 ease-[var(--ease-out-soft)] outline-none select-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/30 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-[1.1em]",
  {
    variants: {
      variant: {
        // Sunrise gradient CTA — the headline action
        primary:
          "bg-sunrise-gradient text-[#2a1608] shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-glow)] hover:brightness-[1.04] active:brightness-100",
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline:
          "border-border bg-background/60 backdrop-blur-sm hover:bg-muted hover:text-foreground dark:border-input dark:bg-input/20 dark:hover:bg-input/40",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_6%)]",
        ghost:
          "hover:bg-muted hover:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        // Heights sized for comfortable touch (md = 44px min target)
        sm: "h-9 rounded-lg px-3.5 text-sm [&_svg:not([class*='size-'])]:size-4",
        md: "h-11 rounded-xl px-5 text-[0.95rem] [&_svg:not([class*='size-'])]:size-4",
        lg: "h-[3.25rem] rounded-xl px-7 text-base [&_svg:not([class*='size-'])]:size-5",
        icon: "size-11 rounded-xl",
        "icon-sm": "size-9 rounded-lg",
      },
      pill: {
        true: "rounded-[var(--radius-pill)]",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      pill: false,
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "md",
  pill = false,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, pill, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
