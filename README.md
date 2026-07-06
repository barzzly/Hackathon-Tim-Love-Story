# SASIRA — Inovasi Street Wear Sasirangan

Landing page satu halaman untuk **SASIRA**, sebuah brand UMKM fiktif yang mengangkat
kain batik **sasirangan** khas Kalimantan ke dalam produk streetwear modern —
oversized, berani, dan siap dipakai harian.

Proyek ini dibuat untuk **Hackathon BarzzLy x Putri** dengan tema **UMKM**.
SASIRA adalah studi kasus fiktif: sebuah usaha lokal yang membawa warisan wastra
tradisional ke pasar anak muda urban lewat pendekatan visual dan branding yang kuat.

## Tentang Web Ini

Situs terdiri dari dua bagian utama dalam satu alur scroll:

- **Home** — poster hero sinematik: judul vertikal "SASIRA APPAREL", figur produk
  di tengah panggung, panel kata kunci brand, marquee bertema garis pengaman
  (caution stripe), dan footer tagline.
- **About** — narasi brand (Origin & Vision), tiga kartu keunggulan produk,
  deret angka statistik, marquee kedua, dan tanda tangan visual "BUILT DIFFERENT".

Tema visual: gelap, editorial, dengan aksen emas. Tipografi memadukan Permanent Marker,
Oswald, Outfit, dan JetBrains Mono untuk kontras antara karakter jalanan dan ketegasan grafis.

## Animasi & Interaksi

Seluruh gerak dibangun manual tanpa library animasi, menggunakan CSS dan sedikit
JavaScript berbasis `requestAnimationFrame`. Semua efek dimatikan otomatis saat
pengguna mengaktifkan `prefers-reduced-motion`.

### Home

- **Parallax pointer** — background dan figur produk bergeser halus mengikuti kursor
  (eased, hanya desktop) lewat CSS custom property `--mx` / `--my`.
- **Ink reveal judul** — huruf "SASIRA" dan "APPAREL" muncul dengan clip-path, blur,
  dan skew yang mengurai ke posisi.
- **Figur mengambang** — produk masuk dengan animasi lalu naik-turun perlahan
  (float) disertai bayangan yang ikut bernapas.
- **Kata kunci berurutan** — daftar kata brand muncul satu per satu dengan stagger,
  underline emas saat hover.
- **Scroll choreography (desktop)** — saat menggulir, blok teks kiri dan panel kanan
  bergerak, menyusut, dan memudar mengikuti progres scroll secara real-time.
- **Marquee caution tape** — pita berjalan tanpa henti dengan bintang SVG berputar,
  garis diagonal bergaya garis pengaman, dan tepi yang memudar. Berhenti saat hover.

### Navbar

- **Collapse on scroll** — di paling atas navbar melebar penuh; saat menggulir ia
  menyusut menjadi pill mengambang bergaya kaca (blur, border, bayangan) — meniru
  pola navbar barzzly.
- **Active link pill** — IntersectionObserver menandai section aktif; tautan yang
  sesuai mendapat sorotan pill dan garis emas.
- **Progress bar** — hairline gradasi emas di bawah pill menunjukkan progres scroll.
- **Magnetic logo** — logo tertarik lembut ke arah kursor.
- **Menu mobile** — hamburger membuka overlay layar penuh dengan reveal clip-path
  melingkar dan item menu yang muncul berurutan.

### About

- **Split-text reveal** — heading "ABOUT US" terurai per huruf, tiap glyph naik dari
  balik mask dengan stagger, dipadukan shimmer emas.
- **Kartu 3D tilt** — kartu Origin/Vision dan kartu fitur miring mengikuti kursor
  (`perspective` + `rotateX/rotateY` + `translateZ`), dengan sorotan cahaya emas
  yang mengejar pointer — meniru kartu barzzly. Di perangkat sentuh diganti umpan
  balik tap sederhana.
- **Reveal on scroll** — seluruh elemen masuk dengan fade, translate, dan blur saat
  memasuki viewport, memakai IntersectionObserver.
- **Statistik & tanda tangan** — deret angka dan tagline "BUILT DIFFERENT" dengan
  garis flank dan efek shine.

## Aksesibilitas & Responsif

- Mendukung `prefers-reduced-motion` di seluruh lapisan animasi.
- Target sentuh dan safe-area diperhatikan; navbar menghormati `env(safe-area-inset)`.
- Layout mobile-first: tilt 3D dan efek magnetic dinonaktifkan pada layar sentuh,
  diganti reveal dan umpan balik tap yang lebih ringan agar scroll tetap mulus.

## Teknologi

- React 19
- Vite
- CSS murni (satu stylesheet global, tanpa framework UI)
- oxlint
