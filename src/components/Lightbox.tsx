import { useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight, ArrowRight, Share2 } from "lucide-react";
import type { Product } from "../lib/types";
import { formatPrice, whatsappLink } from "../lib/format";
import { useToast } from "./Toast";

const FALLBACK_IMAGE = "/images/sasirangan-teal.svg";

interface Props {
  product: Product;
  hasPrev: boolean;
  hasNext: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({
  product,
  hasPrev,
  hasNext,
  onClose,
  onPrev,
  onNext,
}: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const toast = useToast();

  useEffect(() => {
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft" && hasPrev) onPrev();
      else if (e.key === "ArrowRight" && hasNext) onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  async function share() {
    const url = `${window.location.origin}/galeri?produk=${product.id}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: product.name, url });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Link produk disalin ke clipboard.");
      }
    } catch {
      // User cancelled sharing.
    }
  }

  return (
    <div
      className="fixed inset-0 z-[900] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
    >
      <div className="absolute inset-0 bg-background/90 backdrop-blur-sm" onClick={onClose} aria-hidden />

      <div className="animate-fade-up relative z-10 flex max-h-[90dvh] w-full max-w-4xl flex-col overflow-hidden border border-border bg-background md:flex-row">
        <div className="image-fallback relative bg-surface md:w-3/5">
          <img
            src={product.imageUrl || FALLBACK_IMAGE}
            alt={`Kain sasirangan ${product.name}`}
            onError={(event) => {
              if (event.currentTarget.src.endsWith(FALLBACK_IMAGE)) return;
              event.currentTarget.src = FALLBACK_IMAGE;
            }}
            className="max-h-[45dvh] w-full object-cover md:h-full md:max-h-[90dvh]"
          />
          {hasPrev && <NavArrow side="left" onClick={onPrev} label="Produk sebelumnya" />}
          {hasNext && <NavArrow side="right" onClick={onNext} label="Produk berikutnya" />}
        </div>

        <div className="flex flex-1 flex-col overflow-y-auto p-8">
          <div className="flex items-start justify-between gap-3">
            <span className="kicker pt-1">{product.category}</span>
            <button
              ref={closeRef}
              onClick={onClose}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Tutup"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <h2 className="mt-5 font-display text-2xl font-bold leading-tight">
            {product.name}
          </h2>
          <p className="mt-2 text-lg text-accent [font-variant-numeric:tabular-nums]">
            {formatPrice(product.price)}
          </p>
          <p className="mt-6 flex-1 text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
            <a
              href={whatsappLink(product.name)}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-foreground"
            >
              <span className="border-b border-foreground pb-1 transition-colors group-hover:border-accent group-hover:text-accent">
                Tanya Produk
              </span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </a>
            <button
              onClick={share}
              className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
            >
              <Share2 className="h-4 w-4" aria-hidden /> Bagikan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavArrow({
  side,
  onClick,
  label,
}: {
  side: "left" | "right";
  onClick: () => void;
  label: string;
}) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`absolute top-1/2 -translate-y-1/2 ${
        side === "left" ? "left-3" : "right-3"
      } inline-flex h-10 w-10 items-center justify-center border border-border bg-background/70 text-foreground backdrop-blur transition-colors hover:border-accent hover:text-accent`}
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}
