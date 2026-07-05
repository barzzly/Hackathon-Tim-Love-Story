import { Link } from "react-router-dom";
import { whatsappLink } from "../lib/format";

export default function Footer() {
  return (
    <footer className="mt-32 border-t border-border">
      <div className="container-app grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <p className="font-display text-sm font-bold uppercase tracking-[0.3em]">
            Sasirangan
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Galeri kain sasirangan handmade khas Banjarmasin. Motif tradisional,
            warna alami, tiap helai dibuat dengan tangan.
          </p>
        </div>

        <div>
          <p className="kicker">Jelajah</p>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            <li>
              <Link to="/" className="transition-colors hover:text-foreground">
                Beranda
              </Link>
            </li>
            <li>
              <Link to="/galeri" className="transition-colors hover:text-foreground">
                Galeri Produk
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="kicker">Kontak</p>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-foreground"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-foreground"
              >
                Instagram
              </a>
            </li>
            <li>Banjarmasin, Kalimantan Selatan</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border py-6">
        <p className="container-app text-center text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          © {new Date().getFullYear()} Galeri Sasirangan
        </p>
      </div>
    </footer>
  );
}
