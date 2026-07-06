# 🛶 Pasar Terapung Digital — TODO & Development Roadmap

> **Tema Hackathon:** Inovasi Digital Untuk Kemandirian UMKM Lokal
> **Konsep:** Platform storytelling imersif yang mengangkat UMKM Kalimantan/Banjar melalui pengalaman "berlayar" menyusuri sungai. Setiap UMKM = perahu terapung yang bisa dieksplorasi.
> **Prioritas Menang:** UI/UX premium > Storytelling > Mobile experience > First impression visual > Kompleksitas fitur.

---

## 📌 Aturan Eksekusi untuk Codex Agent

- Setiap task adalah checklist actionable. Kerjakan berurutan per Phase kecuali disebut paralel.
- **Mobile-first selalu.** Tulis style untuk mobile dulu, baru `md:`/`lg:` untuk desktop.
- **TypeScript penuh.** Tidak ada `any` tanpa alasan. Semua props, data, dan API response bertipe.
- **Tidak ada template jadi.** Semua komponen ditulis manual. shadcn/ui hanya sebagai primitive dasar (bukan template halaman).
- **Commit tiap selesai satu Phase** dengan format Conventional Commits (`feat:`, `chore:`, `style:`).
- **Respect `prefers-reduced-motion`** di semua animasi.
- Deploy ke Vercel harus berhasil sebelum Phase 13.

---

## 🧱 Tech Stack (WAJIB)

| Layer         | Tools                                |
| ------------- | ------------------------------------ |
| Framework     | Next.js 15 (App Router)              |
| Language      | TypeScript (strict)                  |
| Styling       | Tailwind CSS                         |
| Components    | shadcn/ui (Radix primitives)         |
| Animation     | Framer Motion + GSAP (ScrollTrigger) |
| Smooth Scroll | Lenis                                |
| Backend/DB    | Supabase (Postgres + Auth + Storage) |
| Forms         | React Hook Form + Zod                |
| Deploy        | Vercel                               |

---

## 📁 Folder Structure (Target)

```
pasar-terapung-digital/
├── src/
│   ├── app/
│   │   ├── (marketing)/              # grup rute publik
│   │   │   ├── page.tsx              # Landing / River Journey
│   │   │   ├── umkm/
│   │   │   │   ├── page.tsx          # UMKM Showcase (grid)
│   │   │   │   └── [slug]/page.tsx   # Detail UMKM + produk
│   │   │   ├── produk/page.tsx       # Product Showcase + filter
│   │   │   ├── cerita/page.tsx       # Story Section
│   │   │   └── tentang/page.tsx      # About Project
│   │   ├── (admin)/
│   │   │   ├── login/page.tsx        # Login admin
│   │   │   └── dashboard/
│   │   │       ├── page.tsx          # Overview
│   │   │       ├── umkm/page.tsx     # CRUD UMKM
│   │   │       └── produk/page.tsx   # CRUD Produk
│   │   ├── layout.tsx                # Root layout (fonts, Lenis, providers)
│   │   ├── globals.css               # Tailwind + design tokens
│   │   ├── not-found.tsx
│   │   └── loading.tsx
│   ├── components/
│   │   ├── ui/                       # shadcn primitives
│   │   ├── layout/                   # Navbar, Footer, MobileMenu
│   │   ├── sections/                 # Hero, RiverJourney, StorySection, dll
│   │   ├── umkm/                     # UmkmCard, UmkmGrid, BoatMarker
│   │   ├── product/                  # ProductCard, ProductModal, ProductFilter
│   │   ├── admin/                    # UmkmForm, ProductForm, DataTable, DeleteDialog
│   │   └── motion/                   # Reveal, Parallax, FloatingBoat, SmoothScroll
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts             # browser client
│   │   │   ├── server.ts             # server client (cookies)
│   │   │   └── middleware.ts         # session refresh
│   │   ├── validations/              # Zod schemas
│   │   ├── queries/                  # data fetching functions
│   │   ├── hooks/                    # useLenis, useScrollReveal, useMediaQuery
│   │   ├── utils.ts                  # cn(), formatRupiah()
│   │   └── constants.ts
│   ├── types/
│   │   └── database.ts               # generated Supabase types
│   └── middleware.ts                 # protect /dashboard
├── public/
│   ├── images/                       # SVG river layers, boats, textures
│   └── fonts/
├── supabase/
│   ├── schema.sql
│   └── seed.sql
├── .env.local
├── .env.example
├── tailwind.config.ts
├── tsconfig.json
├── next.config.ts
└── README.md
```

---

## 🗄️ Database Schema (Supabase)

```sql
-- supabase/schema.sql

-- UMKM
create table umkms (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  slug        text not null unique,
  description text,
  image_url   text,
  location    text,
  created_at  timestamptz default now()
);

-- Products
create table products (
  id          uuid primary key default gen_random_uuid(),
  umkm_id     uuid not null references umkms(id) on delete cascade,
  name        text not null,
  description text,
  price       numeric(12,2) not null default 0,
  image_url   text,
  created_at  timestamptz default now()
);

create index idx_products_umkm on products(umkm_id);

-- Row Level Security
alter table umkms enable row level security;
alter table products enable row level security;

-- Public read
create policy "public read umkms"    on umkms    for select using (true);
create policy "public read products" on products for select using (true);

-- Authenticated write (admin only)
create policy "auth write umkms"    on umkms    for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "auth write products" on products for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
```

> **admin_users:** gunakan Supabase Auth (email/password). Tidak perlu tabel custom. Buat 1 user admin lewat dashboard Supabase.
> **Storage:** buat bucket `images` (public read) untuk upload gambar UMKM & produk.

---

## 🎨 Design System

### Konsep Visual

Gabungan Apple × Stripe × Linear × Awwwards. Premium, minimal, immersive, storytelling-driven. **Bukan** tampilan dashboard CRUD.

### Color System (river & sunset palette)

```css
/* globals.css @theme / :root */
--river-deep: #0b2545; /* biru sungai dalam */
--river-mid: #134074; /* biru sungai */
--river-teal: #3a7ca5; /* teal air */
--mist: #e8f1f2; /* kabut pagi / bg terang */
--sand: #f5ebdd; /* warm neutral */
--wood: #8d6748; /* kayu perahu */
--sunrise: #ff8c42; /* aksen sunrise / CTA */
--gold: #f2c94c; /* highlight */
--ink: #0a1626; /* teks gelap */
```

- Dark-first hero, section terang untuk konten.
- Rasio kontras WCAG AA (≥4.5:1 teks normal).

### Typography Scale

- Display font: serif elegan (mis. `Fraunces` / `Instrument Serif`) untuk heading hero.
- Body font: sans modern (`Inter` / `Geist`).
- Skala fluid: gunakan `clamp()`.
  - `--fs-hero: clamp(2.5rem, 8vw, 6rem)`
  - `--fs-h2: clamp(1.75rem, 4vw, 3rem)`
  - `--fs-body: clamp(1rem, 1.2vw, 1.125rem)`

### Tokens lain

- Radius: `--radius-sm 8px`, `--radius 16px`, `--radius-lg 24px`, pill untuk button.
- Shadow: soft layered (`0 4px 24px rgba(11,37,69,.12)`), glow untuk hover card.
- Spacing: skala 4px (Tailwind default), section padding `py-24 md:py-32`.

### Component tasks

- [ ] `Button` — variants: `primary` (sunrise gradient), `ghost`, `outline`. Sizes: sm/md/lg. Focus ring visible.
- [ ] `Card` — glassmorphism ringan, border subtle, hover lift+glow.
- [ ] `Input` / `Textarea` / `Select` — konsisten, label + error state (dari RHF).
- [ ] `Badge` — untuk lokasi UMKM.
- [ ] `Container` — max-width `1200px`, padding responsif.
- [ ] `Section` wrapper — dengan scroll-reveal built-in.

---

# ✅ DEVELOPMENT ROADMAP

## Phase 1 — Project Setup

- [x] `npx create-next-app@latest` — TypeScript, App Router, Tailwind, `src/`, alias `@/*`. (Next 16, Tailwind v4)
- [x] Set `tsconfig.json` ke `"strict": true`. (default on)
- [x] Install deps: `framer-motion gsap lenis @supabase/supabase-js @supabase/ssr react-hook-form zod @hookform/resolvers`.
- [x] Init shadcn/ui: `npx shadcn@latest init`. Tambah komponen dasar: `button input textarea label select dialog dropdown-menu sonner`.
- [x] Setup fonts via `next/font` (Fraunces display + Inter body).
- [x] Buat `.env.example` + `.env.local` (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
- [x] Konfigurasi `next.config.ts`: `images.remotePatterns` untuk Supabase storage domain.
- [x] Buat folder structure sesuai target di atas.
- [x] Setup ESLint + `.gitignore`. (Prettier: skip — ESLint flat config cukup)
- [x] `README.md` awal (nama, konsep, cara run).
- [x] Commit: `chore: initial project setup`. (825ab06)

## Phase 2 — Design System

- [x] Definisikan CSS variables (color, typography, radius, shadow) di `globals.css`. (river/sunset palette, fluid type, glass utils)
- [x] Extend token warna & fontFamily. (Tailwind v4 CSS-first `@theme inline` — no `tailwind.config.ts`)
- [x] Buat util `cn()` di `lib/utils.ts`.
- [x] Buat `formatRupiah(n: number)` di `lib/utils.ts`. (+ `slugify`)
- [x] Build primitive components (Button, Card, Input, Badge, Container, Section) sesuai spec.
- [x] Buat halaman `/dev/styleguide` (opsional, hapus sebelum submit) untuk cek visual semua komponen.
- [x] Setup `Toaster` (sonner) di root layout. (Phase 1: layout.tsx)
- [x] Commit: `feat: design system & base components`.

## Phase 3 — Landing Page (Hero Cinematic)

> **Target: kesan wow dalam 5 detik.**

- [ ] Layout root: pasang `<SmoothScroll>` (Lenis) wrapper + Navbar + Footer.
- [ ] Buat `Navbar` — transparan di hero, solid+blur saat scroll. Logo kiri, nav links, CTA kanan.
- [ ] Buat Hero fullscreen (`100dvh`):
  - [ ] Layered SVG background sungai (langit, gunung/hutan jauh, tepi sungai, air) — minimal 3-4 layer untuk parallax.
  - [ ] Perahu terapung SVG dengan animasi float (naik-turun + sway halus, GSAP/Framer loop).
  - [ ] Heading display + subheading + CTA "Mulai Berlayar" (scroll ke River Journey).
  - [ ] Reduced-motion fallback: static, no float.
- [ ] Parallax background mengikuti mouse (desktop) + scroll (semua device).
- [ ] Smooth reveal on load (stagger: heading → sub → CTA).
- [ ] Scroll indicator animasi (chevron/ripple) di bawah hero.
- [ ] Test mobile: hero tidak terpotong, teks terbaca, CTA thumb-reachable.
- [ ] Commit: `feat: cinematic hero landing`.

## Phase 4 — River Journey Experience

> **Scroll = menyusuri sungai.**

- [ ] Buat `RiverJourney` section panjang dengan GSAP ScrollTrigger.
- [ ] Layered parallax: layer air/tepi/objek bergerak beda kecepatan saat scroll (depth illusion).
- [ ] Floating objects (daun, riak, perahu kecil) muncul-hilang saat scroll.
- [ ] Storytelling transition: 3-4 "beat" naratif muncul progresif ("Selamat datang di sungai...", "Temukan perahu UMKM...", dst) dengan fade/slide.
- [ ] Progress indikator perjalanan (garis sungai / titik) opsional.
- [ ] Pin section + horizontal/vertical scroll effect untuk transisi ke UMKM Showcase.
- [ ] Optimasi: `will-change`, hindari layout thrash, gunakan transform saja.
- [ ] Reduced-motion: ganti jadi fade sederhana antar beat.
- [ ] Test mobile: parallax lebih ringan (kurangi layer), scroll tetap smooth 60fps.
- [ ] Commit: `feat: river journey scroll experience`.

## Phase 5 — UMKM Showcase

- [ ] `lib/queries/umkm.ts`: `getUmkms()`, `getUmkmBySlug(slug)`.
- [ ] Halaman `/umkm`: grid modern responsif (1 col mobile → 2 → 3 desktop).
- [ ] `UmkmCard`: gambar, nama, lokasi (badge), deskripsi singkat. Hover: lift + glow + image zoom.
- [ ] Entrance animation: stagger reveal on scroll (Framer `whileInView`).
- [ ] Mobile interaction: tap → detail, kartu cukup besar untuk thumb.
- [ ] Halaman detail `/umkm/[slug]`:
  - [ ] Hero UMKM (gambar besar + nama + lokasi + cerita).
  - [ ] Grid produk milik UMKM tsb.
  - [ ] Tombol kembali "ke sungai".
- [ ] Loading & empty state.
- [ ] Commit: `feat: umkm showcase & detail`.

## Phase 6 — Product Showcase

- [ ] `lib/queries/product.ts`: `getProducts()`, `getProductsByUmkm(id)`.
- [ ] Halaman `/produk`: grid product cards responsif.
- [ ] `ProductCard`: gambar, nama, harga (`formatRupiah`), nama UMKM. Hover lift.
- [ ] Filter sederhana: by UMKM + search by nama (client-side, no reload).
- [ ] `ProductModal` (shadcn Dialog): detail produk — gambar besar, deskripsi, harga, UMKM asal. Animasi buka/tutup (Framer).
- [ ] Responsive: modal fullscreen di mobile, centered di desktop.
- [ ] Commit: `feat: product showcase & filter`.

## Phase 7 — Supabase Integration

- [ ] Buat project Supabase, jalankan `schema.sql`.
- [ ] Buat bucket storage `images` (public).
- [ ] `lib/supabase/client.ts`, `server.ts`, `middleware.ts` (pakai `@supabase/ssr`).
- [ ] Generate types: `supabase gen types typescript` → `types/database.ts`.
- [ ] `supabase/seed.sql`: 5-6 UMKM + 3-4 produk masing-masing (data Banjar realistis: soto banjar, wadai, kain sasirangan, dll).
- [ ] Ganti data statis di showcase dengan query real (Server Components).
- [ ] Setup image upload helper ke bucket `images`.
- [ ] Commit: `feat: supabase integration & seed data`.

## Phase 8 — Authentication

- [ ] Halaman `/login`: form email+password (RHF + Zod), desain premium (bukan default).
- [ ] `signInWithPassword` via Supabase; error handling + toast.
- [ ] `src/middleware.ts`: protect `/dashboard/*`, redirect ke `/login` jika belum auth.
- [ ] Logout action + tombol di dashboard.
- [ ] Buat 1 akun admin di Supabase dashboard, dokumentasikan di README (kredensial demo).
- [ ] Test: akses `/dashboard` tanpa login → redirect. Login → masuk. Logout → keluar.
- [ ] Commit: `feat: supabase auth & protected routes`.

## Phase 9 — CRUD Dashboard

> **Simpel. Jangan enterprise. Jangan dominan.**

- [ ] Layout dashboard: sidebar minimal (UMKM / Produk / Logout), clean.
- [ ] Zod schemas: `umkmSchema`, `productSchema` di `lib/validations/`.
- [ ] **CRUD UMKM** (`/dashboard/umkm`):
  - [ ] `DataTable` list UMKM (nama, lokasi, jumlah produk).
  - [ ] `UmkmForm` (RHF+Zod): nama, deskripsi, lokasi, upload gambar. Auto-generate slug dari nama.
  - [ ] Create / Update (dialog atau halaman).
  - [ ] Delete dengan `ConfirmDialog`.
- [ ] **CRUD Produk** (`/dashboard/produk`):
  - [ ] `DataTable` list produk (nama, harga, UMKM).
  - [ ] `ProductForm`: nama, deskripsi, harga, gambar, pilih UMKM (select).
  - [ ] Create / Update / Delete + konfirmasi.
- [ ] Semua mutation → revalidate / refresh data. Toast sukses/gagal.
- [ ] Server Actions untuk write (validasi Zod di server juga).
- [ ] Commit: `feat: admin crud dashboard`.

## Phase 10 — Animation Polish

- [ ] Hero: finalisasi reveal, float boat, parallax, fade transition ke section berikut.
- [ ] Scroll: audit semua ScrollTrigger, pastikan smooth, no jank.
- [ ] Card: hover lift + glow + scale konsisten di semua kartu.
- [ ] Navigation: mobile menu slide/fade animation; page transition antar rute (Framer `AnimatePresence` / template.tsx).
- [ ] Loading: custom loader bertema (perahu/ripple) + skeleton states untuk showcase.
- [ ] Micro-interactions: button press, link underline, ripple air pada CTA.
- [ ] Cek semua animasi hormati `prefers-reduced-motion`.
- [ ] Commit: `style: animation polish`.

## Phase 11 — Mobile Optimization

- [ ] Audit tiap halaman di 360px, 390px, 768px, 1024px, 1440px.
- [ ] Thumb-friendly: nav & CTA di zona jangkauan ibu jari, target tap ≥44px.
- [ ] Typography & spacing fluid (`clamp`) tervalidasi.
- [ ] Kurangi berat animasi di mobile (deteksi via `useMediaQuery` / matchMedia).
- [ ] Touch interactions: swipe di modal produk (opsional), no hover-only feature.
- [ ] Test scroll smooth di device fisik / DevTools throttle.
- [ ] Fix overflow horizontal (audit `overflow-x`).
- [ ] Commit: `fix: mobile responsive optimization`.

## Phase 12 — Performance Optimization

- [ ] `next/image` untuk semua gambar, `sizes` benar, `priority` hanya hero.
- [ ] Lazy load section berat + `dynamic()` import untuk GSAP-heavy & modal.
- [ ] Optimasi SVG river layers (minify, reuse).
- [ ] Font: `display: swap`, subset, preload display font.
- [ ] Audit bundle: hapus unused, tree-shake GSAP plugin.
- [ ] Cek Lighthouse mobile — target **90+** (Performance, Accessibility, Best Practices, SEO).
- [ ] Tambah metadata SEO + Open Graph image per halaman.
- [ ] Commit: `perf: performance optimization`.

## Phase 13 — Final Presentation Preparation

- [ ] Deploy ke Vercel, hubungkan env vars, verifikasi build sukses.
- [ ] Test URL production di HP asli (juri akan buka di HP).
- [ ] Isi seed data final yang meyakinkan (foto bagus, deskripsi rapi).
- [ ] Halaman `/cerita` (Story) & `/tentang` (About) selesai & nyambung ke tema hackathon.
- [ ] Buat OG image + favicon bertema.
- [ ] Finalisasi README: konsep, tech stack, cara run, kredensial demo admin, link live.
- [ ] Siapkan alur demo 3 menit: Hero → River Journey → UMKM → Produk → (singkat) Admin CRUD.
- [ ] Cek terakhir: no console error, no broken link, loading cepat.
- [ ] Commit + tag: `chore: final presentation build`.

---

## 🌊 Story Section (`/cerita`) — Konten

- [ ] Narasi: kondisi UMKM lokal Banjar/Kalimantan hari ini.
- [ ] Dampak digitalisasi: jangkauan pasar lebih luas, kemandirian ekonomi.
- [ ] Data/statistik ringan (visual) untuk kredibilitas.
- [ ] Sambungkan langsung ke tema: "Inovasi Digital Untuk Kemandirian UMKM Lokal".
- [ ] Animasi scroll-reveal naratif.

## 📖 About Project (`/tentang`) — Konten

- [ ] Tujuan website (kenapa "pasar terapung digital").
- [ ] Solusi yang ditawarkan untuk UMKM.
- [ ] Dampak yang diharapkan.
- [ ] Info tim (opsional).

---

## ♿ Accessibility Checklist

- [ ] Semantic HTML (`header`, `nav`, `main`, `section`, `footer`, heading berurutan).
- [ ] Semua gambar `alt` bermakna.
- [ ] Keyboard navigation penuh (tab order, focus visible, modal focus trap).
- [ ] Kontras warna WCAG AA.
- [ ] `prefers-reduced-motion` di seluruh animasi.
- [ ] ARIA label untuk ikon-only button.
- [ ] Screen reader test pada nav & form.

---

## 🎬 Animation System — Ringkasan Task

| Kategori   | Task                                                                               |
| ---------- | ---------------------------------------------------------------------------------- |
| Hero       | initial reveal (stagger), floating boat loop, background parallax, fade transition |
| Scroll     | ScrollTrigger sections, progressive reveal, parallax layers, section transition    |
| Card       | hover lift, hover glow, scale, entrance stagger                                    |
| Navigation | mobile menu animation, page transition                                             |
| Loading    | custom themed loader, skeleton states                                              |

---

## ✅ Definition of Done (per fitur)

- Bertipe penuh (no `any`), lolos `tsc` & ESLint.
- Responsif 360px→1440px, no overflow-x.
- Animasi smooth + reduced-motion fallback.
- Loading & empty/error state ada.
- Accessible (keyboard + kontras + alt).
- Ter-deploy dan berjalan di Vercel.
