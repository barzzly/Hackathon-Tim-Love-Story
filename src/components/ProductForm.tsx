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
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <div className="animate-fade-up relative z-10 flex max-h-[92dvh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card">
        <div className="flex items-center justify-between border-b border-border p-5">
          <h2 className="font-display text-xl font-bold">
            {initial ? "Edit Produk" : "Tambah Produk"}
          </h2>
          <button
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Tutup"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={submit} className="flex-1 space-y-5 overflow-y-auto p-5" noValidate>
          {/* Foto */}
          <div>
            <span className="mb-1.5 block text-sm font-medium">
              Foto Produk <span className="text-destructive">*</span>
            </span>
            <div className="flex items-start gap-4">
              <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-xl border border-border bg-muted">
                {imageUrl ? (
                  <img src={imageUrl} alt="Pratinjau" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    <ImageIcon className="h-8 w-8" aria-hidden />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <label className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted">
                  {uploading ? (
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                  ) : (
                    <Upload className="h-4 w-4" aria-hidden />
                  )}
                  {uploading ? "Mengunggah..." : imageUrl ? "Ganti foto" : "Pilih foto"}
                  <input
                    type="file"
                    accept={ACCEPT.join(",")}
                    onChange={onPickFile}
                    disabled={uploading}
                    className="sr-only"
                  />
                </label>
                <p className="mt-1.5 text-xs text-muted-foreground">
                  JPG, PNG, WebP. Maks {MAX_MB}MB.
                </p>
                {errors.image && (
                  <p role="alert" className="mt-1 text-sm font-medium text-destructive">
                    {errors.image}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Nama */}
          <div>
            <label htmlFor="pf-name" className="mb-1.5 block text-sm font-medium">
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
              className="h-12 w-full rounded-xl border border-border bg-background px-4 outline-none transition-colors focus:border-primary"
              placeholder="Kain Sasirangan Gigi Haruan"
            />
            {errors.name && (
              <p role="alert" className="mt-1 text-sm font-medium text-destructive">
                {errors.name}
              </p>
            )}
          </div>

          {/* Deskripsi */}
          <div>
            <label htmlFor="pf-desc" className="mb-1.5 block text-sm font-medium">
              Deskripsi
            </label>
            <textarea
              id="pf-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none transition-colors focus:border-primary"
              placeholder="Motif, bahan, ukuran..."
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {/* Harga */}
            <div>
              <label htmlFor="pf-price" className="mb-1.5 block text-sm font-medium">
                Harga (Rp)
              </label>
              <input
                id="pf-price"
                type="number"
                min={0}
                inputMode="numeric"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="h-12 w-full rounded-xl border border-border bg-background px-4 outline-none transition-colors focus:border-primary"
                placeholder="Kosongkan = Hubungi"
              />
            </div>

            {/* Kategori */}
            <div>
              <label htmlFor="pf-cat" className="mb-1.5 block text-sm font-medium">
                Kategori
              </label>
              <select
                id="pf-cat"
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="h-12 w-full rounded-xl border border-border bg-background px-3 outline-none transition-colors focus:border-primary"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
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
              className="h-5 w-5 rounded border-border text-primary focus:ring-primary"
            />
            <span className="text-sm font-medium">
              Tandai sebagai produk unggulan (tampil di beranda)
            </span>
          </label>
        </form>

        <div className="flex flex-col-reverse gap-2 border-t border-border p-5 sm:flex-row sm:justify-end">
          <button
            onClick={onClose}
            disabled={busy}
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-border px-5 font-medium transition-colors hover:bg-muted disabled:opacity-50"
          >
            Batal
          </button>
          <button
            onClick={submit}
            disabled={busy || uploading}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-primary px-5 font-semibold text-on-primary transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
            {busy ? "Menyimpan..." : initial ? "Simpan Perubahan" : "Tambah Produk"}
          </button>
        </div>
      </div>
    </div>
  );
}
