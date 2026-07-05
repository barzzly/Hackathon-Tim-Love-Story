export default function SkeletonCard() {
  return (
    <div>
      <div className="relative aspect-[4/5] overflow-hidden border border-border bg-surface">
        <Shimmer />
      </div>
      <div className="mt-4 space-y-2.5">
        <div className="relative h-3 w-1/3 overflow-hidden bg-surface">
          <Shimmer />
        </div>
        <div className="relative h-4 w-3/4 overflow-hidden bg-surface">
          <Shimmer />
        </div>
      </div>
    </div>
  );
}

function Shimmer() {
  return (
    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-foreground/5 to-transparent [animation:shimmer_1.5s_infinite] motion-reduce:animate-none" />
  );
}
