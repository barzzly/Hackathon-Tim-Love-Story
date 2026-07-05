import { useEffect, useRef, useState } from "react";
import { X, Upload, Loader2, ImageIcon } from "lucide-react";
import type { Product, ProductInput, Category } from "../lib/types";
import { CATEGORIES } from "../lib/types";
import { uploadImage } from "../lib/db";
import { useToast } from "./Toast";

interface Props {
  initial?: Product | null;
  onSubmit: (input: ProductInput) => Promise<void>;
  onClose: () => void;
}

const MAX_MB = 5;
const ACCEPT = ["image/jpeg", "image/png", "image/webp"];

const inputClass =
  "w-full border-b border-border bg-transparent py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-accent";

export default function ProductForm({ initial, onSubmit, onClose }: Props) {
  const toast = useToast();
  const [name, setName] = useState(initial?.name ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [price, setPrice] = useState<string>(
    initial?.price != null ? String(initial.price) : "",
  );
  const [category, setCategory] = useState<Category>(
    initial?.category ?? CATEGORIES[0],
  );
  const [isFeatured, setIsFeatured] = useState(initial?.isFeatured ?? false);
  const [imageUrl, setImageUrl] = useState(initial?.imageUrl ?? "");
  const [uploading, setUploading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; image?: string }>({});
  const firstRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    firstRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  async function onPickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!ACCEPT.includes(file.type)) {
      toast.error("Format harus JPG, PNG, atau WebP.");
      return;
    }
    if (file.size > MAX_MB * 1024 * 1024) {
      toast.error(`Ukuran maksimal ${MAX_MB}MB.`);
      return;
    }
    setUploading(true);
    try {
      const url = await uploadImage(file);
      setImageUrl(url);
      setErrors((x) => ({ ...x, image: undefined }));
    } catch {
      toast.error("Gagal mengunggah foto. Coba lagi.");
    } finally {
      setUploading(false);
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    if (!name.trim()) next.name = "Nama produk wajib diisi.";
    if (!imageUrl) next.image = "Foto produk wajib diunggah.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setBusy(true);
    try {
      await onSubmit({
        name: name.trim(),
        description: description.trim(),
        price: price.trim() === "" ? null : Math.max(0, Number(price)),
        imageUrl,
        category,
        isFeatured,
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[900] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={initial ? "Edit produk" : "Tambah produk"}
    >
      <div className="absolute inset-0 bg-background/90 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <div className="animate-fade-up relative z-10 flex max-h-[92dvh] w-full max-w-lg flex-col overflow-hidden border border-border bg-background">
        <div className="flex items-center justify-between border-b border-border p-6">
          <div>
            <p className="kicker">{initial ? "Ubah" : "Baru"}</p>
            <h2 className="mt-1.5 font-display text-lg font-semibold">
              {initial ? "Edit Produk" : "Tambah Produk"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Tutup"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={submit} className="flex-1 space-y-6 overflow-y-auto p-6" noValidate>
          {/* Foto */}
          <div>
            <span className="kicker mb-3 block">
              Foto Produk <span className="text-destructive">*</span>
            </span>
            <div className="flex items-start gap-4">
              <div className="image-fallback relative h-28 w-24 shrink-0 overflow-hidden border border-border">
                {imageUrl ? (
                  <img src={imageUrl} alt="Pratinjau" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    <ImageIcon className="h-7 w-7" aria-hidden />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <label className="inline-flex cursor-pointer items-center gap-2 border border-border px-4 py-2 text-[11px] font-medium uppercase tracking-[0.15em] transition-colors hover:border-accent hover:text-accent">
                  {uploading ? (
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                  ) : (
                    <Upload className="h-4 w-4" aria-hidden />
                  )}
                  {uploading ? "Mengunggah" : imageUrl ? "Ganti Foto" : "Pilih Foto"}
                  <input
                    type="file"
                    accept={ACCEPT.join(",")}
                    onChange={onPickFile}
                    disabled={uploading}
                    className="sr-only"
                  />
                </label>
                <p className="mt-2 text-xs text-muted-foreground">
                  JPG, PNG, WebP. Maks {MAX_MB}MB.
                </p>
                {errors.image && (
                  <p role="alert" className="mt-1.5 text-xs text-destructive">
                    {errors.image}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Nama */}
          <div>
            <label htmlFor="pf-name" className="kicker mb-2 block">
              Nama <span className="text-destructive">*</span>
            </label>
            <input
              id="pf-name"
              ref={firstRef}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((x) => ({ ...x, name: undefined }));
              }}
              aria-invalid={Boolean(errors.name)}
              className={inputClass}
              placeholder="Kain Sasirangan Gigi Haruan"
            />
            {errors.name && (
              <p role="alert" className="mt-1.5 text-xs text-destructive">
                {errors.name}
              </p>
            )}
          </div>

          {/* Deskripsi */}
          <div>
            <label htmlFor="pf-desc" className="kicker mb-2 block">
              Deskripsi
            </label>
            <textarea
              id="pf-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full resize-none border-b border-border bg-transparent py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
              placeholder="Motif, bahan, ukuran..."
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {/* Harga */}
            <div>
              <label htmlFor="pf-price" className="kicker mb-2 block">
                Harga (Rp)
              </label>
              <input
                id="pf-price"
                type="number"
                min={0}
                inputMode="numeric"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className={inputClass}
                placeholder="Kosong = Hubungi"
              />
            </div>

            {/* Kategori */}
            <div>
              <label htmlFor="pf-cat" className="kicker mb-2 block">
                Kategori
              </label>
              <select
                id="pf-cat"
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full border-b border-border bg-transparent py-2.5 text-sm outline-none transition-colors focus:border-accent"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c} className="bg-background">
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Unggulan */}
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="h-4 w-4 border-border bg-transparent text-accent focus:ring-accent"
            />
            <span className="text-sm text-muted-foreground">
              Tandai sebagai produk unggulan (tampil di beranda)
            </span>
          </label>
        </form>

        <div className="flex items-center justify-end gap-6 border-t border-border p-6">
          <button
            onClick={onClose}
            disabled={busy}
            className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50"
          >
            Batal
          </button>
          <button
            onClick={submit}
            disabled={busy || uploading}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 bg-foreground px-6 text-[11px] font-medium uppercase tracking-[0.2em] text-background transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
            {busy ? "Menyimpan" : initial ? "Simpan" : "Tambah"}
          </button>
        </div>
      </div>
    </div>
  );
}
