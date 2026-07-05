import { ArrowUpRight, Sparkles } from "lucide-react";
import type { Product } from "../lib/types";
import { formatPrice } from "../lib/format";

interface Props {
  product: Product;
  onOpen: (product: Product) => void;
}

export default function ProductCard({ product, onOpen }: Props) {
  return (
    <button
      type="button"
      onClick={() => onOpen(product)}
      className="product-card group relative flex min-h-full flex-col overflow-hidden rounded-2xl border border-border bg-card text-left shadow-soft transition-all duration-500 hover:-translate-y-2 hover:rotate-[0.35deg] hover:border-primary/40 hover:shadow-card focus-visible:shadow-card"
    >
      <span className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <span className="absolute -left-1/2 top-0 h-full w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-[260%]" />
      </span>

      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <img
          src={product.imageUrl}
          alt={`Kain sasirangan ${product.name}`}
          loading="lazy"
          width={900}
          height={1125}
          className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110 group-hover:saturate-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/0 to-foreground/10 opacity-80 transition-opacity duration-500 group-hover:opacity-95" />
        <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-xs font-medium text-foreground shadow-soft backdrop-blur transition-transform duration-300 group-hover:-translate-y-0.5">
          {product.category}
        </span>
        {product.isFeatured && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-on-accent shadow-soft transition-transform duration-300 group-hover:-translate-y-0.5">
            <Sparkles className="h-3.5 w-3.5" aria-hidden /> Unggulan
          </span>
        )}
        <span className="absolute bottom-3 right-3 inline-flex h-11 w-11 translate-y-3 items-center justify-center rounded-full bg-background text-primary opacity-0 shadow-card transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="h-5 w-5" aria-hidden />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-lg font-bold leading-snug transition-colors duration-300 group-hover:text-primary">
          {product.name}
        </h3>
        <p className="mt-1 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {product.description}
        </p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="font-semibold text-primary [font-variant-numeric:tabular-nums]">
            {formatPrice(product.price)}
          </p>
          <span className="text-xs font-semibold uppercase text-muted-foreground transition-colors duration-300 group-hover:text-accent">
            Detail
          </span>
        </div>
      </div>
    </button>
  );
}
