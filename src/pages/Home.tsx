import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  Brush,
  HeartHandshake,
  Leaf,
  MessageCircle,
  Palette,
  Scissors,
  Sparkles,
  Star,
} from "lucide-react";
import type { Product } from "../lib/types";
import { getProducts } from "../lib/db";
import { whatsappLink } from "../lib/format";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";
import Lightbox from "../components/Lightbox";
import { useScrollReveal } from "../lib/useScrollReveal";

const WHY = [
  {
    icon: Palette,
    title: "Motif Khas Banjar",
    text: "Gigi Haruan, Kambang Kacang, Ombak Sinapur, dan naskah motif turun-temurun Banjar.",
  },
  {
    icon: Scissors,
    title: "Jelujur Tangan",
    text: "Pola dijahit manual, ditarik kuat, lalu dicelup warna. Setiap helai kain bernilai seni tinggi.",
  },
  {
    icon: Leaf,
    title: "Bahan Premium",
    text: "Pilihan kain katun primissima, sutra alam, dan satin berkilau yang nyaman dipakai.",
  },
  {
    icon: BadgeCheck,
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
    text: "Menjahit jelujur mengikuti pola gambar lalu ditarik erat hingga kain mengkerut rapat.",
  },
  {
    step: "03",
    title: "Pencelupan Warna",
    text: "Mencelupkan kain ke larutan warna beberapa kali untuk hasil warna yang pekat dan dalam.",
  },
  {
    step: "04",
    title: "Buka & Bilas",
    text: "Melepas benang jelujur untuk mengungkap motif putih yang kontras, lalu dibilas bersih.",
  },
];

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1618005198143-e5283b519a7f?auto=format&fit=crop&w=900&q=80",
];

const MARQUEE = [
  "Kain Katun",
  "Kain Sutra",
  "Kain Satin",
  "Selendang",
  "Handmade Banjar",
  "Pewarna Alami",
  "Khas Kalimantan Selatan",
];

export default function Home() {
  const [featured, setFeatured] = useState<Product[] | null>(null);
  const [active, setActive] = useState<Product | null>(null);

  useScrollReveal();

  useEffect(() => {
    document.title = "Galeri Sasirangan - Kain Tradisional Khas Banjar";
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
      <section className="hero-stage relative isolate overflow-hidden bg-background">
        <div className="absolute inset-0 -z-20">
          <img
            src="https://images.unsplash.com/photo-1618005198143-e5283b519a7f?auto=format&fit=crop&w=1920&q=80"
            alt=""
            className="h-full w-full object-cover opacity-80 dark:opacity-40"
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/85 to-background dark:from-background/10 dark:via-background/70 dark:to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgb(var(--primary)/0.18),transparent_50%)]" />
          <div className="absolute inset-0 motif-grid opacity-15 dark:opacity-25" aria-hidden />
        </div>

        <div className="container-app grid min-h-[85dvh] items-center gap-12 py-16 text-foreground lg:grid-cols-[1fr_450px] lg:py-24">
          <div className="relative z-10">
            <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary backdrop-blur-md">
              <Sparkles className="h-4 w-4 text-accent animate-pulse" aria-hidden />
              Koleksi Autentik Sasirangan Banjar
            </div>
            <h1 className="animate-fade-up mt-6 max-w-5xl font-display text-[clamp(2.5rem,7vw,6rem)] font-black leading-[0.95] tracking-tight">
              Keindahan <span className="text-primary">Jelujur</span> Tradisi.
            </h1>
            <p className="animate-fade-up mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Galeri kain Sasirangan buatan tangan dari Banjarmasin. Menghadirkan kain premium berkualitas tinggi untuk dijahit sesuai kreasi busana Anda.
            </p>
            <div className="animate-fade-up mt-9 flex flex-wrap gap-4">
              <Link
                to="/galeri"
                className="magnetic-btn inline-flex min-h-[52px] items-center gap-2.5 rounded-xl bg-primary px-7 py-3.5 font-bold text-on-primary shadow-card transition-all hover:bg-primary/95 hover:-translate-y-0.5 border border-primary/10"
              >
                Lihat Galeri Kain <ArrowRight className="h-5 w-5" aria-hidden />
              </Link>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="magnetic-btn inline-flex min-h-[52px] items-center gap-2.5 rounded-xl border border-border bg-card/65 px-7 py-3.5 font-semibold text-foreground backdrop-blur-md transition-all hover:bg-muted hover:-translate-y-0.5"
              >
                <MessageCircle className="h-5 w-5 text-primary" aria-hidden /> Tanya Pengrajin
              </a>
            </div>
          </div>

          <div className="relative hidden min-h-[500px] lg:block" aria-hidden>
            {HERO_IMAGES.map((src, i) => (
              <div
                key={src}
                className={`fabric-float absolute overflow-hidden rounded-2xl border border-border/80 bg-card/85 p-2 shadow-card backdrop-blur-sm ${
                  i === 0
                    ? "left-0 top-6 h-72 w-56 rotate-[-8deg]"
                    : i === 1
                      ? "right-0 top-28 h-80 w-60 rotate-[7deg] [animation-delay:0.8s]"
                      : "bottom-4 left-20 h-64 w-52 rotate-[3deg] [animation-delay:1.4s]"
                }`}
              >
                <img src={src} alt="" className="h-full w-full rounded-xl object-cover" />
              </div>
            ))}
            <div className="absolute bottom-20 right-12 rounded-2xl border border-border bg-card/90 p-5 text-foreground shadow-card backdrop-blur-md">
              <p className="font-display text-4xl font-black text-primary">8+</p>
              <p className="mt-1 max-w-32 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Motif Tradisional Ready
              </p>
            </div>
          </div>
        </div>

        <div className="border-y border-border/50 bg-card/45 py-4 text-foreground/80 backdrop-blur-sm">
          <div className="marquee-track flex min-w-max gap-12 text-sm font-bold uppercase tracking-wider">
            {[...MARQUEE, ...MARQUEE].map((item, index) => (
              <span key={`${item}-${index}`} className="inline-flex items-center gap-3.5">
                <Star className="h-4 w-4 fill-accent text-accent animate-spin-slow" aria-hidden />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="kenapa" data-reveal className="container-app scroll-mt-20 py-24">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary">Warisan Budaya Banjar</p>
            <h2 className="mt-3 font-display text-4xl font-black leading-none sm:text-5xl tracking-tight">
              Galeri kecil untuk warisan besar.
            </h2>
          </div>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Sasirangan bukan sekadar kain. Ia adalah goresan sejarah, rajutan benang jelujur, pencelupan warna, dan cerita Banjar. Kami memamerkan kain tradisional ini dalam detail visual tinggi agar keindahan serat dan warnanya terpancar sempurna.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map((w) => (
            <div
              key={w.title}
              className="group rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:border-primary/20 hover:shadow-card"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 text-primary border border-primary/10 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                <w.icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold">{w.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section data-reveal className="overflow-hidden bg-muted/40 py-24 border-y border-border/40">
        <div className="container-app grid gap-12 lg:grid-cols-[450px_1fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary">Proses Pembuatan</p>
            <h2 className="mt-3 font-display text-4xl font-black leading-none sm:text-5xl tracking-tight">
              Dari sketsa hingga motif nyata.
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Setiap helai kain Sasirangan melewati empat tahapan penting yang menuntut ketelitian tinggi. Keterampilan tangan pengrajin memastikan kualitas warna tetap awet dan motif tetap bersih.
            </p>
            <Link
              to="/galeri"
              className="mt-8 inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-on-primary shadow-soft transition-transform hover:-translate-y-0.5"
            >
              Jelajah Galeri Kain <ArrowRight className="h-5 w-5" aria-hidden />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {PROCESS.map((item) => (
              <div
                key={item.step}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:border-primary/20 hover:shadow-card"
              >
                <div className="absolute -right-3 -top-5 font-display text-8xl font-black text-primary/5 transition-all duration-500 group-hover:scale-110 group-hover:text-primary/10">
                  {item.step}
                </div>
                <Brush className="h-6 w-6 text-primary" aria-hidden />
                <h3 className="mt-5 font-display text-xl font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section data-reveal className="container-app py-24">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary">Karya Unggulan</p>
            <h2 className="mt-3 font-display text-4xl font-black leading-none sm:text-5xl tracking-tight">
              Koleksi paling mencuri mata.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Arahkan kursor Anda untuk melihat kilau pendaran cahaya, zoom detail, dan kualitas kain Sasirangan.
            </p>
          </div>
          <Link
            to="/galeri"
            className="inline-flex shrink-0 items-center gap-1.5 font-bold text-primary transition-colors hover:text-accent"
          >
            Semua produk <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured === null
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
            : featured.map((p) => (
                <ProductCard key={p.id} product={p} onOpen={setActive} />
              ))}
        </div>
      </section>

      <section data-reveal className="container-app py-16">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card/50 px-6 py-16 text-foreground shadow-card sm:px-10 lg:px-16">
          <div className="absolute inset-0 -z-10 aurora-bg opacity-30" aria-hidden />
          <div className="absolute inset-0 -z-10 grid-bg-overlay [mask-image:radial-gradient(ellipse_at_center,white,transparent_80%)] opacity-30" aria-hidden />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary">Pemesanan Khusus / Custom</p>
              <h2 className="mt-3 max-w-3xl font-display text-4xl font-black leading-none sm:text-5xl tracking-tight">
                Cari motif tertentu untuk seragam atau hadiah?
              </h2>
              <p className="mt-4 max-w-2xl text-muted-foreground">
                Konsultasikan kebutuhan kain Sasirangan Anda langsung lewat WhatsApp. Admin kami siap membantu Anda memilih bahan kain, ukuran panjang, hingga rekomendasi motif Banjar yang cocok.
              </p>
            </div>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              className="magnetic-btn relative inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 font-semibold text-on-accent shadow-card transition-all hover:bg-accent/95 hover:-translate-y-0.5"
            >
              <HeartHandshake className="h-5 w-5" aria-hidden /> Tanya Pesanan Kustom
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
