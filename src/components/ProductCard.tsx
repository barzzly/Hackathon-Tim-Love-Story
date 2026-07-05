import { ArrowUpRight } from "lucide-react";
import type { Product } from "../lib/types";
import { formatPrice } from "../lib/format";

const FALLBACK_IMAGE = "/images/sasirangan-teal.svg";

interface Props {
  product: Product;
  onOpen: (product: Product) => void;
}

export default function ProductCard({ product, onOpen }: Props) {
  return (
    <button
      type="button"
      onClick={() => onOpen(product)}
      data-reveal-stagger
      className="group flex flex-col text-left"
    >
      <div className="image-fallback relative aspect-[4/5] overflow-hidden border border-border">
        <img
          src={product.imageUrl || FALLBACK_IMAGE}
          alt={`Kain sasirangan ${product.name}`}
          loading="lazy"
          onError={(event) => {
            if (event.currentTarget.src.endsWith(FALLBACK_IMAGE)) return;
            event.currentTarget.src = FALLBACK_IMAGE;
          }}
          width={900}
          height={1125}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {product.isFeatured && (
          <span className="absolute left-0 top-4 bg-accent px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-on-accent">
            Unggulan
          </span>
        )}
        <span className="absolute bottom-4 right-4 inline-flex h-9 w-9 translate-y-2 items-center justify-center border border-foreground/20 bg-background/70 text-foreground opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </span>
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {product.category}
          </p>
          <h3 className="mt-1.5 truncate font-display text-base font-semibold transition-colors group-hover:text-accent">
            {product.name}
          </h3>
        </div>
        <p className="shrink-0 pt-4 text-sm text-muted-foreground [font-variant-numeric:tabular-nums]">
          {formatPrice(product.price)}
        </p>
      </div>
    </button>
  );
}
