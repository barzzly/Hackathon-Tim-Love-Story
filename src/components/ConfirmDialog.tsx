import { useEffect, useRef } from "react";
import { AlertTriangle, Loader2 } from "lucide-react";

interface Props {
  title: string;
  message: string;
  confirmLabel?: string;
  busy?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  title,
  message,
  confirmLabel = "Hapus",
  busy = false,
  onConfirm,
  onCancel,
}: Props) {
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    cancelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !busy) onCancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onCancel, busy]);

  return (
    <div
      className="fixed inset-0 z-[950] flex items-center justify-center p-4"
      role="alertdialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="absolute inset-0 bg-background/90 backdrop-blur-sm" onClick={busy ? undefined : onCancel} aria-hidden />
      <div className="animate-fade-up relative z-10 w-full max-w-sm border border-border bg-background p-8 shadow-card">
        <div className="inline-flex h-11 w-11 items-center justify-center border border-destructive/40 text-destructive">
          <AlertTriangle className="h-5 w-5" aria-hidden />
        </div>
        <h2 className="mt-5 font-display text-lg font-semibold">{title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{message}</p>
        <div className="mt-8 flex items-center justify-end gap-6">
          <button
            ref={cancelRef}
            onClick={onCancel}
            disabled={busy}
            className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            disabled={busy}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 bg-destructive px-6 text-[11px] font-medium uppercase tracking-[0.2em] text-on-destructive transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
