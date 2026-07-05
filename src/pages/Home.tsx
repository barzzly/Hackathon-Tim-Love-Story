import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Product } from "../lib/types";
import { getProducts } from "../lib/db";
import { whatsappLink } from "../lib/format";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";
import Lightbox from "../components/Lightbox";

const VALUES = [
  {
    title: "Motif Khas Banjar",
    text: "Gigi Haruan, Kambang Kacang, Ombak Sinapur — naskah motif turun-temurun Banjar.",
  },
  {
    title: "Jelujur Tangan",
    text: "Pola dijahit manual, ditarik kuat, lalu dicelup warna. Tiap helai bernilai seni tinggi.",
  },
  {
    title: "Bahan Premium",
    text: "Katun primissima, sutra alam, dan satin berkilau yang nyaman dipakai.",
  },
  {
    title: "Karya Orisinil",
    text: "Dibuat langsung oleh pengrajin lokal Banjarmasin dengan komitmen kualitas warisan.",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Desain Motif",
    text: "Menggambar pola tradisional Banjar di atas lembaran kain putih polos.",
  },
  {
    step: "02",
    title: "Jelujur & Ikat",
    text: "Menjahit jelujur mengikuti pola lalu ditarik erat hingga kain mengkerut rapat.",
  },
  {
    step: "03",
    title: "Pencelupan Warna",
    text: "Mencelupkan kain ke larutan warna beberapa kali untuk hasil pekat dan dalam.",
  },
  {
    step: "04",
    title: "Buka & Bilas",
    text: "Melepas benang jelujur untuk mengungkap motif putih yang kontras, lalu dibilas.",
  },
];

const HERO_IMAGE = "/images/sasirangan-indigo.svg";

export default function Home() {
  const [featured, setFeatured] = useState<Product[] | null>(null);
  const [active, setActive] = useState<Product | null>(null);

  useEffect(() => {
    document.title = "Galeri Sasirangan — Kain Tradisional Khas Banjar";
    getProducts()
      .then((all) => {
        const f = all.filter((p) => p.isFeatured);
        setFeatured((f.length ? f : all).slice(0, 4));
      })
      .catch(() => setFeatured([]));
  }, []);

  const idx = active ? (featured ?? []).findIndex((p) => p.id === active.id) : -1;

  return (
    <>
      {/* ── Hero .01 ─────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="container-app grid min-h-[92dvh] items-center gap-12 pb-20 pt-32 lg:grid-cols-[1.1fr_0.9fr] lg:pt-36">
          <div>
            <p className="kicker">Galeri Sasirangan Banjar</p>
            <h1 className="mt-6 font-display text-[clamp(2.8rem,8vw,6rem)] font-bold leading-[0.95] tracking-tight">
              Keindahan
              <br />
              Jelujur Tradisi.
            </h1>
            <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground">
              Kain sasirangan buatan tangan dari Banjarmasin. Bahan premium
              berkualitas tinggi, siap dijahit sesuai kreasi busana Anda.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                to="/galeri"
                className="group inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-foreground"
              >
                <span className="border-b border-foreground pb-1 transition-colors group-hover:border-accent group-hover:text-accent">
                  Lihat Galeri Kain
                </span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
              >
                Tanya Pengrajin
              </a>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="image-fallback aspect-[3/4] overflow-hidden border border-border">
              <img
                src={HERO_IMAGE}
                alt="Kain sasirangan khas Banjar"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-px left-0 flex items-end gap-3 bg-background py-3 pr-5">
              <span className="font-display text-4xl font-bold text-foreground">8+</span>
              <span className="max-w-24 pb-1 text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                Motif tradisional ready
              </span>
            </div>
          </div>
        </div>

        <div className="container-app flex items-center justify-between border-t border-border py-4">
          <span className="section-index">.01</span>
          <span className="kicker">Scroll — Warisan Budaya Banjar</span>
        </div>
      </section>

      {/* ── Tentang .02 ──────────────────────────── */}
      <section id="tentang" data-reveal className="container-app scroll-mt-24 py-28">
        <div className="flex items-center justify-between">
          <p className="kicker">Tentang</p>
          <span className="section-index">.02</span>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
          <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
            Galeri kecil untuk
            <br />
            warisan besar.
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Sasirangan bukan sekadar kain. Ia goresan sejarah — rajutan benang
            jelujur, pencelupan warna, dan cerita Banjar. Kami memamerkannya dalam
            detail visual tinggi agar keindahan serat dan warnanya terpancar
            sempurna.
          </p>
        </div>

        <div className="mt-16 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <div key={v.title} className="bg-background p-8">
              <span className="section-index">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-6 font-display text-lg font-semibold">{v.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Proses .03 ───────────────────────────── */}
      <section id="proses" data-reveal className="scroll-mt-24 border-y border-border bg-surface/40 py-28">
        <div className="container-app">
          <div className="flex items-center justify-between">
            <p className="kicker">Proses Pembuatan</p>
            <span className="section-index">.03</span>
          </div>
          <h2 className="mt-10 max-w-2xl font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
            Dari sketsa hingga motif nyata.
          </h2>

          <div className="mt-16 divide-y divide-border border-y border-border">
            {PROCESS.map((item) => (
              <div
                key={item.step}
                className="group grid gap-4 py-8 transition-colors hover:bg-background sm:grid-cols-[auto_1fr] sm:items-baseline sm:gap-10"
              >
                <span className="font-display text-3xl font-medium text-muted-foreground/60 transition-colors group-hover:text-accent sm:w-24">
                  {item.step}
                </span>
                <div className="grid gap-3 sm:grid-cols-[1fr_2fr] sm:items-baseline sm:gap-10">
                  <h3 className="font-display text-xl font-semibold">{item.title}</h3>
                  <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Koleksi ──────────────────────────────── */}
      <section id="koleksi" data-reveal className="container-app scroll-mt-24 py-28">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="kicker">Karya Unggulan</p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
              Koleksi pilihan.
            </h2>
          </div>
          <Link
            to="/galeri"
            className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
          >
            Semua Produk
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featured === null
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
            : featured.map((p) => (
                <ProductCard key={p.id} product={p} onOpen={setActive} />
              ))}
        </div>
      </section>

      {/* ── Kontak / Custom ──────────────────────── */}
      <section id="kontak" data-reveal className="container-app scroll-mt-24 pb-28">
        <div className="border border-border bg-surface/40 p-10 sm:p-16">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              <p className="kicker">Pemesanan Khusus</p>
              <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl">
                Cari motif tertentu untuk seragam atau hadiah?
              </h2>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
                Konsultasikan kebutuhan kain sasirangan Anda lewat WhatsApp. Kami
                bantu memilih bahan, ukuran panjang, hingga rekomendasi motif Banjar.
              </p>
            </div>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 justify-self-start text-xs font-medium uppercase tracking-[0.2em] text-accent lg:justify-self-end"
            >
              <span className="border-b border-accent pb-1 transition-opacity group-hover:opacity-70">
                Tanya Pesanan Kustom
              </span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </a>
          </div>
        </div>
      </section>

      {active && featured && (
        <Lightbox
          product={active}
          hasPrev={idx > 0}
          hasNext={idx < featured.length - 1}
          onClose={() => setActive(null)}
          onPrev={() => setActive(featured[idx - 1])}
          onNext={() => setActive(featured[idx + 1])}
        />
      )}
    </>
  );
}
