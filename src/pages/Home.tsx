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

const WHY = [
  {
    icon: Palette,
    title: "Motif Banjar",
    text: "Gigi Haruan, Ombak Sinapur, Naga Balimbur, dan motif turun-temurun lain.",
  },
  {
    icon: Scissors,
    title: "Jelujur Manual",
    text: "Pola dijahit, ditarik, lalu dicelup. Tiap helai punya detail unik.",
  },
  {
    icon: Leaf,
    title: "Warna Hangat",
    text: "Palet terracotta, emas, dan warna bumi yang dekat dengan budaya Banjar.",
  },
  {
    icon: BadgeCheck,
    title: "Siap Pakai",
    text: "Koleksi dipilih untuk acara formal, hadiah, seragam, dan busana harian.",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Pilih Motif",
    text: "Motif disesuaikan dengan fungsi kain dan karakter pemakai.",
  },
  {
    step: "02",
    title: "Jelujur",
    text: "Kain dijahit mengikuti pola agar warna membentuk garis khas sasirangan.",
  },
  {
    step: "03",
    title: "Celup Warna",
    text: "Warna dibuat berlapis supaya motif punya kedalaman dan hidup.",
  },
  {
    step: "04",
    title: "Finishing",
    text: "Kain dicuci, dikeringkan, lalu dikurasi sebelum masuk galeri.",
  },
];

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=900&q=80",
];

const MARQUEE = [
  "Kemeja",
  "Selendang",
  "Kain Lembaran",
  "Aksesori",
  "Outer",
  "Handmade Banjar",
];

export default function Home() {
  const [featured, setFeatured] = useState<Product[] | null>(null);
  const [active, setActive] = useState<Product | null>(null);

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
      <section className="hero-stage relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-20">
          <img
            src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1920&q=80"
            alt=""
            className="h-full w-full object-cover"
            aria-hidden
          />
          <div className="absolute inset-0 bg-[linear-gradient(100deg,rgb(var(--foreground)/0.88),rgb(var(--primary)/0.68)_52%,rgb(var(--foreground)/0.32))]" />
          <div className="absolute inset-0 motif-grid opacity-35" aria-hidden />
        </div>

        <div className="container-app grid min-h-[84dvh] items-center gap-10 py-16 text-on-primary lg:grid-cols-[minmax(0,1fr)_420px] lg:py-20">
          <div>
            <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-on-primary/25 bg-on-primary/10 px-4 py-2 text-sm font-semibold text-on-primary backdrop-blur">
              <Sparkles className="h-4 w-4 text-accent" aria-hidden />
              Authentic Sasirangan Banjar
            </div>
            <h1 className="animate-fade-up mt-5 max-w-5xl font-display text-[clamp(3rem,8vw,6.8rem)] font-black leading-[0.9]">
              Kain tradisi, tampil berani.
            </h1>
            <p className="animate-fade-up mt-6 max-w-2xl text-lg leading-relaxed text-on-primary/90 sm:text-xl">
              Galeri sasirangan handmade dari Banjarmasin. Motif warisan Banjar
              dikemas modern untuk seragam, hadiah, acara resmi, dan koleksi personal.
            </p>
            <div className="animate-fade-up mt-9 flex flex-wrap gap-3">
              <Link
                to="/galeri"
                className="magnetic-btn inline-flex min-h-[52px] items-center gap-2 rounded-xl bg-background px-6 py-3 font-semibold text-primary shadow-card transition-transform hover:-translate-y-1"
              >
                Lihat Koleksi <ArrowRight className="h-5 w-5" aria-hidden />
              </Link>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="magnetic-btn inline-flex min-h-[52px] items-center gap-2 rounded-xl border border-on-primary/40 px-6 py-3 font-semibold text-on-primary backdrop-blur transition-colors hover:bg-on-primary/10"
              >
                <MessageCircle className="h-5 w-5" aria-hidden /> Konsultasi
              </a>
            </div>
          </div>

          <div className="relative hidden min-h-[520px] lg:block" aria-hidden>
            {HERO_IMAGES.map((src, i) => (
              <div
                key={src}
                className={`fabric-float absolute overflow-hidden rounded-2xl border border-on-primary/20 bg-on-primary/10 p-2 shadow-card backdrop-blur ${
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
            <div className="absolute bottom-20 right-12 rounded-2xl border border-on-primary/25 bg-background/95 p-5 text-foreground shadow-card">
              <p className="font-display text-4xl font-black text-primary">8+</p>
              <p className="mt-1 max-w-36 text-sm text-muted-foreground">
                koleksi contoh siap jelajah
              </p>
            </div>
          </div>
        </div>

        <div className="border-y border-on-primary/15 bg-foreground/30 py-3 text-on-primary backdrop-blur">
          <div className="marquee-track flex min-w-max gap-10 text-sm font-semibold uppercase">
            {[...MARQUEE, ...MARQUEE].map((item, index) => (
              <span key={`${item}-${index}`} className="inline-flex items-center gap-3">
                <Star className="h-4 w-4 fill-accent text-accent" aria-hidden />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="kenapa" className="container-app scroll-mt-20 py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase text-primary">Who We Are</p>
            <h2 className="mt-3 font-display text-4xl font-black leading-none sm:text-5xl">
              Galeri kecil untuk warisan besar.
            </h2>
          </div>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Sasirangan bukan sekadar kain. Ia lahir dari jahitan, ikatan, warna, dan
            cerita. Website ini menaruh foto sebagai pusat pengalaman agar pengunjung
            cepat melihat karakter tiap produk.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map((w, index) => (
            <div
              key={w.title}
              className="motion-card group rounded-2xl border border-border bg-card p-6 shadow-soft"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                <w.icon className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold">{w.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="overflow-hidden bg-muted/50 py-20">
        <div className="container-app grid gap-12 lg:grid-cols-[420px_1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase text-primary">Craft Process</p>
            <h2 className="mt-3 font-display text-4xl font-black leading-none sm:text-5xl">
              Dari pola sampai siap dikenakan.
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Alur dibuat singkat, visual, dan mudah dipahami seperti landing brand
              modern, tapi tetap membawa identitas kain Banjar.
            </p>
            <Link
              to="/galeri"
              className="mt-7 inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-on-primary shadow-soft transition-transform hover:-translate-y-1"
            >
              Jelajah Produk <ArrowRight className="h-5 w-5" aria-hidden />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {PROCESS.map((item, index) => (
              <div
                key={item.step}
                className="motion-card group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-soft"
                style={{ animationDelay: `${index * 110}ms` }}
              >
                <div className="absolute -right-4 -top-5 font-display text-8xl font-black text-primary/10 transition-transform duration-500 group-hover:scale-125">
                  {item.step}
                </div>
                <Brush className="h-7 w-7 text-primary" aria-hidden />
                <h3 className="mt-5 font-display text-xl font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-app py-20">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase text-primary">Featured Works</p>
            <h2 className="mt-3 font-display text-4xl font-black leading-none sm:text-5xl">
              Koleksi yang paling mencuri mata.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Hover tiap kartu untuk lihat gerak foto, glow, dan detail produk.
            </p>
          </div>
          <Link
            to="/galeri"
            className="inline-flex shrink-0 items-center gap-1.5 font-semibold text-primary transition-colors hover:text-accent"
          >
            Semua produk <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured === null
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
            : featured.map((p) => (
                <ProductCard key={p.id} product={p} onOpen={setActive} />
              ))}
        </div>
      </section>

      <section className="container-app py-12">
        <div className="relative overflow-hidden rounded-2xl bg-foreground px-6 py-14 text-background shadow-card sm:px-10 lg:px-14">
          <div className="absolute inset-0 motif-grid opacity-20" aria-hidden />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase text-accent">Custom Order</p>
              <h2 className="mt-3 max-w-3xl font-display text-4xl font-black leading-none sm:text-5xl">
                Cari motif untuk acara, kantor, atau hadiah?
              </h2>
              <p className="mt-4 max-w-2xl text-background/75">
                Tanya langsung lewat WhatsApp. Admin bisa bantu pilih kategori,
                warna, dan produk yang cocok.
              </p>
            </div>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              className="magnetic-btn relative inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 font-semibold text-on-accent shadow-card transition-transform hover:-translate-y-1"
            >
              <HeartHandshake className="h-5 w-5" aria-hidden /> Tanya Produk
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
