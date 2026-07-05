# Galeri Sasirangan

Website galeri produk sasirangan khas Banjar. Publik bisa melihat landing page dan galeri produk, sedangkan admin bisa login untuk menambah, mengubah, dan menghapus produk.

App dibuat untuk tetap bisa jalan tanpa backend. Jika konfigurasi Supabase kosong, app masuk mode demo memakai seed data dan `localStorage`. Jika Supabase diisi, app memakai Postgres, Storage, dan Auth dari Supabase.

## Fitur

- Landing page dengan hero, nilai produk, dan koleksi unggulan.
- Galeri produk responsif dengan pencarian dan filter kategori.
- Lightbox foto produk dengan navigasi sebelumnya/berikutnya.
- Deep link produk lewat query `?produk=<id>`.
- Dark mode toggle dengan preferensi tersimpan.
- Dashboard admin untuk CRUD produk.
- Upload foto produk.
- Toast notifikasi dan dialog konfirmasi hapus.
- Skeleton loading, empty state, dan halaman 404.
- Mode demo lokal tanpa Supabase.

## Tech Stack

- Vite
- React
- TypeScript
- React Router
- Tailwind CSS
- lucide-react
- Supabase
- Vercel

## Struktur Folder

```txt
src/
  components/   Komponen UI reusable
  data/         Seed produk demo
  lib/          Auth, database, Supabase client, formatter, theme
  pages/        Halaman utama app
  App.tsx       Routing aplikasi
  main.tsx      Entry React
  styles.css    Tailwind dan design tokens

supabase/
  schema.sql    Skema tabel, policy, dan storage bucket
```

## Rute

- `/` - beranda.
- `/galeri` - galeri produk.
- `/galeri?produk=<id>` - buka produk tertentu di lightbox.
- `/login` - login admin.
- `/admin` - dashboard admin, butuh login.
- `/404` - halaman tidak ditemukan.

## Instalasi

Pastikan Node.js sudah terpasang.

```bash
npm install
npm run dev
```

Server dev berjalan lewat Vite. Buka URL yang muncul di terminal.

## Environment

Salin `.env.example` menjadi `.env.local`.

```bash
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_ADMIN_PASSWORD=admin123
```

### Mode Demo

Kosongkan `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY`.

- Data produk diambil dari `src/data/seed.ts`.
- Perubahan produk tersimpan di browser lewat `localStorage`.
- Email admin bebas.
- Password default: `admin123`.
- Password bisa diganti lewat `VITE_ADMIN_PASSWORD`.

Mode ini cocok untuk presentasi cepat atau penilaian hackathon.

### Mode Supabase

Isi:

```bash
VITE_SUPABASE_URL=isi_url_project_supabase
VITE_SUPABASE_ANON_KEY=isi_anon_key_supabase
```

Lalu di Supabase:

1. Jalankan `supabase/schema.sql` di SQL Editor.
2. Buat user admin di Authentication.
3. Pastikan bucket `product-images` sudah ada dan public.
4. Login admin memakai email dan password user Supabase.

## Script

```bash
npm run dev
```

Menjalankan dev server.

```bash
npm run build
```

Menjalankan TypeScript check dan membuat build produksi.

```bash
npm run preview
```

Preview hasil build produksi.

## Deploy

Project siap deploy ke Vercel.

`vercel.json` sudah mengarahkan semua route SPA ke `index.html`, jadi deep link seperti `/galeri` dan `/admin` tetap aman saat refresh.

Untuk mode Supabase di production, tambahkan environment variable ini di Vercel:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_ADMIN_PASSWORD` jika masih memakai mode demo

## Catatan Admin

Produk punya field:

- nama
- deskripsi
- harga, bisa kosong untuk status "Hubungi"
- foto
- kategori
- status unggulan

Kategori tersedia:

- Kemeja
- Selendang
- Kain Lembaran
- Aksesori
- Outer

## Build Check

Sebelum deploy, jalankan:

```bash
npm run build
```

Jika sukses, folder `dist/` siap dipakai untuk hosting statis atau Vercel.
