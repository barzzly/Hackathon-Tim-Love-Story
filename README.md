# 🛶 Pasar Terapung Digital

> **Tema Hackathon:** Inovasi Digital Untuk Kemandirian UMKM Lokal

Platform storytelling imersif yang mengangkat UMKM Kalimantan/Banjar melalui
pengalaman "berlayar" menyusuri sungai. Setiap UMKM adalah perahu terapung yang
bisa dieksplorasi.

## Tech Stack

| Layer         | Tools                                |
| ------------- | ------------------------------------ |
| Framework     | Next.js 16 (App Router)              |
| Language      | TypeScript (strict)                  |
| Styling       | Tailwind CSS v4                      |
| Components    | shadcn/ui (Radix primitives)         |
| Animation     | Framer Motion + GSAP (ScrollTrigger) |
| Smooth Scroll | Lenis                                |
| Backend/DB    | Supabase (Postgres + Auth + Storage) |
| Forms         | React Hook Form + Zod                |
| Deploy        | Vercel                               |

## Cara Run

```bash
# 1. Install deps
npm install

# 2. Salin env, isi kredensial Supabase
cp .env.example .env.local

# 3. Jalankan dev server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable                        | Keterangan                          |
| ------------------------------- | ----------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | URL project Supabase                |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon/public key project Supabase    |

## Scripts

| Command             | Fungsi                     |
| ------------------- | -------------------------- |
| `npm run dev`       | Dev server                 |
| `npm run build`     | Production build           |
| `npm run start`     | Serve production build     |
| `npm run lint`      | ESLint                     |
| `npm run typecheck` | `tsc --noEmit` type check  |

## Struktur

Lihat `TODO.md` untuk roadmap lengkap dan target folder structure.
