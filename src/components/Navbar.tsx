import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "../lib/useTheme";

const LINKS = [
  { to: "/", label: "Beranda", end: true },
  { to: "/galeri", label: "Galeri" },
];

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/80 shadow-soft backdrop-blur-md py-2"
          : "border-b border-transparent bg-background/0 py-4"
      }`}
    >
      <nav className="container-app flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2.5 font-display text-2xl font-black tracking-tight transition-transform duration-300 hover:scale-105"
          onClick={() => setOpen(false)}
        >
          <svg viewBox="0 0 32 32" className="h-8 w-8 drop-shadow-[0_2px_10px_rgba(var(--primary),0.3)] animate-pulse" aria-hidden>
            <rect width="32" height="32" rx="8" className="fill-primary" />
            <g fill="none" className="stroke-accent" strokeWidth="1.8" strokeLinejoin="round">
              <path d="M16 5 L27 16 L16 27 L5 16 Z" />
              <path d="M16 11 L21 16 L16 21 L11 16 Z" />
            </g>
          </svg>
          <span className="bg-gradient-to-r from-foreground via-foreground/90 to-primary bg-clip-text text-transparent">
            Sasirangan
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1.5 md:flex">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `relative rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-primary/10 text-primary shadow-[inset_0_0_0_1px_rgba(var(--primary),0.15)]"
                    : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <div className="ml-2 pl-2 border-l border-border/60">
            <ThemeButton theme={theme} toggle={toggle} />
          </div>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-1.5 md:hidden">
          <ThemeButton theme={theme} toggle={toggle} />
          <button
            onClick={() => setOpen((o) => !o)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-foreground transition-all hover:bg-muted border border-border/40"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border/80 bg-background/95 backdrop-blur-lg md:hidden animate-fade-up">
          <div className="container-app flex flex-col py-3 space-y-1">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-base font-semibold transition-all ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-muted"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function ThemeButton({ theme, toggle }: { theme: string; toggle: () => void }) {
  return (
    <button
      onClick={toggle}
      className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-foreground border border-border/60 shadow-soft bg-card/40 backdrop-blur transition-all duration-300 hover:bg-muted hover:scale-105"
      aria-label={theme === "dark" ? "Ganti ke mode terang" : "Ganti ke mode gelap"}
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4 text-accent" aria-hidden />
      ) : (
        <Moon className="h-4 w-4 text-primary" aria-hidden />
      )}
    </button>
  );
}
