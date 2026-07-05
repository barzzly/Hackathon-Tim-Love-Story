import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Lock, Eye, EyeOff, Loader2, Info, ChevronLeft } from "lucide-react";
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
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "Login Admin — Sasirangan";
    isAuthenticated().then((ok) => ok && nav("/admin", { replace: true }));
  }, [nav]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

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
    <div className="relative isolate flex min-h-[85dvh] items-center justify-center py-16 overflow-hidden bg-background">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 aurora-bg opacity-40" />
      <div className="absolute inset-0 -z-10 grid-bg-overlay [mask-image:radial-gradient(circle_at_center,white_30%,transparent_75%)] opacity-30" />

      <div className="w-full max-w-md p-4">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors mb-6 ml-1"
        >
          <ChevronLeft className="h-4 w-4" /> Kembali ke Beranda
        </Link>

        {/* Glow Card */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          className="glow-card glow-border rounded-3xl border border-border bg-card/60 p-8 shadow-card backdrop-blur-md relative z-10"
        >
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20 shadow-soft">
            <Lock className="h-5 w-5" aria-hidden />
          </div>
          <h1 className="mt-5 font-display text-3xl font-black tracking-tight">Login Admin</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Masuk untuk mengelola galeri produk Sasirangan.
          </p>

          {isDemoAuth && (
            <div className="mt-5 flex items-start gap-2.5 rounded-2xl bg-primary/5 border border-primary/10 p-4 text-xs text-muted-foreground leading-relaxed shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
              <span>
                Mode demo aktif (tanpa Supabase). Gunakan email bawaan dan password:{" "}
                <code className="rounded bg-primary/10 px-1.5 py-0.5 font-mono font-bold text-primary">admin123</code>
              </span>
            </div>
          )}

          <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 w-full rounded-xl border border-border bg-background/50 px-4 outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 focus:bg-background text-sm"
                placeholder="admin@sasirangan.local"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
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
                  className="h-12 w-full rounded-xl border border-border bg-background/50 px-4 pr-12 outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 focus:bg-background text-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  className="absolute right-1 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
                  aria-label={show ? "Sembunyikan password" : "Tampilkan password"}
                >
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {error && (
                <p
                  id="pw-error"
                  role="alert"
                  className="mt-2.5 text-xs font-bold text-destructive"
                >
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={busy}
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 font-bold text-on-primary shadow-soft transition-all hover:bg-primary/95 hover:shadow-card hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 mt-2 border border-primary/10"
            >
              {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
              {busy ? "Memproses..." : "Masuk"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
