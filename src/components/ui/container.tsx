import { cn } from "@/lib/utils";

type ContainerProps = React.ComponentProps<"div"> & {
  /** Max width tier. Default `default` = 1200px. */
  width?: "default" | "wide" | "narrow" | "prose";
};

const widthMap: Record<NonNullable<ContainerProps["width"]>, string> = {
  narrow: "max-w-3xl",
  prose: "max-w-2xl",
  default: "max-w-[1200px]",
  wide: "max-w-[1440px]",
};

/** Centered, responsively-padded content wrapper. */
export function Container({
  className,
  width = "default",
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-6 lg:px-8",
        widthMap[width],
        className
      )}
      {...props}
    />
  );
}
