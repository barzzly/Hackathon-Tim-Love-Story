import { useRef } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import type { Product } from "../lib/types";
import { formatPrice } from "../lib/format";

interface Props {
  product: Product;
  onOpen: (product: Product) => void;
}

export default function ProductCard({ product, onOpen }: Props) {
  const cardRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <button
      ref={cardRef}
      type="button"
      onClick={() => onOpen(product)}
      onMouseMove={handleMouseMove}
      className="glow-card glow-border tilt-card group relative flex min-h-full flex-col overflow-hidden rounded-2xl border border-border bg-card text-left shadow-soft focus-visible:shadow-card"
    >
      <span className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <span className="absolute -left-1/2 top-0 h-full w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-[260%]" />
      </span>

      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <img
          src={product.imageUrl}
          alt={`Kain sasirangan ${product.name}`}
          loading="lazy"
          width={900}
          height={1125}
          className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:saturate-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/0 to-background/20 opacity-80 transition-opacity duration-500 group-hover:opacity-95" />
        <span className="absolute left-3 top-3 rounded-xl bg-background/85 px-3 py-1.5 text-xs font-semibold text-foreground shadow-soft backdrop-blur transition-all duration-300 group-hover:-translate-y-0.5 border border-border/40">
          {product.category}
        </span>
        {product.isFeatured && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-xl bg-accent px-3 py-1.5 text-xs font-bold text-on-accent shadow-soft transition-all duration-300 group-hover:-translate-y-0.5 border border-accent/20">
            <Sparkles className="h-3.5 w-3.5" aria-hidden /> Unggulan
          </span>
        )}
        <span className="absolute bottom-3.5 right-3.5 inline-flex h-10 w-10 translate-y-3 items-center justify-center rounded-xl bg-primary text-on-primary opacity-0 shadow-card transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 border border-primary/20">
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 relative z-10">
        <h3 className="font-display text-xl font-bold leading-snug transition-colors duration-300 group-hover:text-primary">
          {product.name}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {product.description}
        </p>
        <div className="mt-5 flex items-center justify-between gap-3 pt-3 border-t border-border/40">
          <p className="font-semibold text-primary [font-variant-numeric:tabular-nums]">
            {formatPrice(product.price)}
          </p>
          <span className="text-xs font-bold uppercase text-muted-foreground transition-colors duration-300 group-hover:text-accent">
            Detail →
          </span>
        </div>
      </div>
    </button>
  );
}
