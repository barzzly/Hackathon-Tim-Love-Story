import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import type { Product, Category } from "../lib/types";
import { CATEGORIES } from "../lib/types";
import { getProducts } from "../lib/db";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";
import Lightbox from "../components/Lightbox";

type Filter = "Semua" | Category;
const FILTERS: Filter[] = ["Semua", ...CATEGORIES];

export default function Gallery() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [filter, setFilter] = useState<Filter>("Semua");
  const [query, setQuery] = useState("");
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    document.title = "Galeri Produk — Sasirangan";
    getProducts()
      .then(setProducts)
      .catch(() => setProducts([]));
  }, []);

  const activeId = params.get("produk");
  const active = useMemo(
    () => (products && activeId ? products.find((p) => p.id === activeId) ?? null : null),
    [products, activeId],
  );

  const filtered = useMemo(() => {
    if (!products) return [];
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const okCat = filter === "Semua" || p.category === filter;
      const okQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      return okCat && okQuery;
    });
  }, [products, filter, query]);

  const idx = active ? filtered.findIndex((p) => p.id === active.id) : -1;

  function open(p: Product) {
    params.set("produk", p.id);
    setParams(params, { replace: true });
  }
  function close() {
    params.delete("produk");
    setParams(params, { replace: true });
  }
  function goto(p: Product) {
    params.set("produk", p.id);
    setParams(params, { replace: true });
  }

  return (
    <div className="container-app pt-32 pb-24">
      <header className="flex items-end justify-between border-b border-border pb-8">
        <div>
          <p className="kicker">Koleksi</p>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-6xl">
            Galeri Produk
          </h1>
        </div>
        <span className="section-index hidden sm:block">
          {products ? String(filtered.length).padStart(2, "0") : "—"} Item
        </span>
      </header>

      {/* Controls */}
      <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-x-6 gap-y-3" role="group" aria-label="Filter kategori">
          {FILTERS.map((f) => {
            const on = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                aria-pressed={on}
                className={`border-b pb-1 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors ${
                  on
                    ? "border-accent text-accent"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>

        <div className="relative lg:w-72">
          <Search
            className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari nama atau motif..."
            aria-label="Cari produk"
            className="w-full border-b border-border bg-transparent py-2 pl-6 pr-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
          />
        </div>
      </div>

      {/* Grid / states */}
      <div className="mt-14">
        {products === null ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <EmptyState
            title="Belum ada produk"
            text="Galeri masih kosong. Produk akan tampil di sini setelah admin menambahkannya."
          />
        ) : filtered.length === 0 ? (
          <EmptyState
            title="Tidak ada hasil"
            text="Coba ubah kata kunci atau pilih kategori lain."
          />
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} onOpen={open} />
            ))}
          </div>
        )}
      </div>

      {active && (
        <Lightbox
          product={active}
          hasPrev={idx > 0}
          hasNext={idx >= 0 && idx < filtered.length - 1}
          onClose={close}
          onPrev={() => goto(filtered[idx - 1])}
          onNext={() => goto(filtered[idx + 1])}
        />
      )}
    </div>
  );
}

function EmptyState({ title, text }: { title: string; text: string }) {
  return (
    <div className="border border-dashed border-border py-24 text-center">
      <p className="section-index">—</p>
      <h2 className="mt-4 font-display text-xl font-semibold">{title}</h2>
      <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">{text}</p>
    </div>
  );
}
