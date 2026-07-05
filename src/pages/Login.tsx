import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, ChevronLeft } from "lucide-react";
import { signIn, isAuthenticated, isDemoAuth } from "../lib/auth";
import { useToast } from "../components/Toast";

export default function Login() {
  const nav = useNavigate();
  const toast = useToast();
  const [email, setEmail] = useState(isDemoAuth ? "admin@sasirangan.local" : "");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const pwRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.title = "Login Admin — Sasirangan";
    isAuthenticated().then((ok) => ok && nav("/admin", { replace: true }));
  }, [nav]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await signIn(email, password);
      toast.success("Berhasil masuk.");
      nav("/admin", { replace: true });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Gagal masuk.";
      setError(msg);
      pwRef.current?.focus();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-[90dvh] items-center justify-center px-5 pt-24 pb-16">
      <div className="w-full max-w-sm">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" /> Beranda
        </Link>

        <div className="mt-8">
          <p className="kicker">Area Terbatas</p>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight">
            Login Admin
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Masuk untuk mengelola galeri produk sasirangan.
          </p>
        </div>

        {isDemoAuth && (
          <div className="mt-6 border border-border bg-surface/50 p-4 text-xs leading-relaxed text-muted-foreground">
            Mode demo aktif (tanpa Supabase). Gunakan email bawaan dan password:{" "}
            <code className="text-accent">admin123</code>
          </div>
        )}

        <form onSubmit={onSubmit} className="mt-8 space-y-6" noValidate>
          <div>
            <label htmlFor="email" className="kicker mb-2 block">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border-b border-border bg-transparent py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
              placeholder="admin@sasirangan.local"
            />
          </div>

          <div>
            <label htmlFor="password" className="kicker mb-2 block">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                ref={pwRef}
                type={show ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "pw-error" : undefined}
                className="w-full border-b border-border bg-transparent py-2.5 pr-10 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                className="absolute right-0 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                aria-label={show ? "Sembunyikan password" : "Tampilkan password"}
              >
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {error && (
              <p id="pw-error" role="alert" className="mt-3 text-xs text-destructive">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={busy}
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 bg-foreground text-xs font-medium uppercase tracking-[0.2em] text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
            {busy ? "Memproses" : "Masuk"}
          </button>
        </form>
      </div>
    </div>
  );
}
