import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-app flex min-h-[80dvh] flex-col items-center justify-center text-center">
      <p className="font-display text-[clamp(5rem,20vw,12rem)] font-bold leading-none tracking-tight">
        404
      </p>
      <p className="kicker mt-4">Halaman tidak ditemukan</p>
      <p className="mt-6 max-w-sm text-sm text-muted-foreground">
        Maaf, halaman yang kamu cari tidak ada atau sudah dipindahkan.
      </p>
      <Link
        to="/"
        className="group mt-10 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-foreground"
      >
        <span className="border-b border-foreground pb-1 transition-colors group-hover:border-accent group-hover:text-accent">
          Kembali ke Beranda
        </span>
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
      </Link>
    </div>
  );
}
