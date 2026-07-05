import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Pencil, Trash2, LogOut, Loader2 } from "lucide-react";
import type { Product, ProductInput } from "../lib/types";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../lib/db";
import { signOut, isDemoAuth } from "../lib/auth";
import { formatPrice } from "../lib/format";
import { useToast } from "../components/Toast";
import ProductForm from "../components/ProductForm";
import ConfirmDialog from "../components/ConfirmDialog";

export default function Admin() {
  const nav = useNavigate();
  const toast = useToast();
  const [products, setProducts] = useState<Product[] | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [toDelete, setToDelete] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    document.title = "Dashboard Admin — Sasirangan";
    load();
  }, []);

  function load() {
    getProducts()
      .then(setProducts)
      .catch(() => {
        setProducts([]);
        toast.error("Gagal memuat produk.");
      });
  }

  async function onLogout() {
    await signOut();
    toast.success("Berhasil keluar.");
    nav("/login", { replace: true });
  }

  function openCreate() {
    setEditing(null);
    setFormOpen(true);
  }
  function openEdit(p: Product) {
    setEditing(p);
    setFormOpen(true);
  }

  async function onSubmit(input: ProductInput) {
    try {
      if (editing) {
        await updateProduct(editing.id, input);
        toast.success("Produk diperbarui.");
      } else {
        await createProduct(input);
        toast.success("Produk ditambahkan.");
      }
      setFormOpen(false);
      setEditing(null);
      load();
    } catch {
      toast.error("Gagal menyimpan produk.");
    }
  }

  async function confirmDelete() {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await deleteProduct(toDelete.id);
      toast.success("Produk dihapus.");
      setToDelete(null);
      load();
    } catch {
      toast.error("Gagal menghapus produk.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="container-app pt-32 pb-24">
      <div className="flex flex-col gap-6 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="kicker">Dashboard</p>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Kelola Produk
          </h1>
          {isDemoAuth && (
            <p className="mt-3 text-xs text-muted-foreground">
              Mode demo — data tersimpan di browser ini.
            </p>
          )}
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={openCreate}
            className="group inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-foreground"
          >
            <Plus className="h-4 w-4 transition-transform group-hover:rotate-90" aria-hidden />
            <span className="border-b border-foreground pb-1 transition-colors group-hover:border-accent group-hover:text-accent">
              Tambah Produk
            </span>
          </button>
          <button
            onClick={onLogout}
            className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <LogOut className="h-4 w-4" aria-hidden /> Keluar
          </button>
        </div>
      </div>

      <div className="mt-12">
        {products === null ? (
          <div className="flex min-h-[40dvh] items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-accent" aria-label="Memuat" />
          </div>
        ) : products.length === 0 ? (
          <div className="border border-dashed border-border py-24 text-center">
            <p className="section-index">—</p>
            <h2 className="mt-4 font-display text-xl font-semibold">Belum ada produk</h2>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
              Klik “Tambah Produk” untuk mengunggah produk pertama.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border border-y border-border">
            {products.map((p) => (
              <div key={p.id} className="flex items-center gap-5 py-4">
                <img
                  src={p.imageUrl}
                  alt=""
                  onError={(event) => {
                    event.currentTarget.src = "/images/sasirangan-teal.svg";
                  }}
                  className="image-fallback h-20 w-16 shrink-0 border border-border object-cover"
                  aria-hidden
                />
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {p.category}
                    {p.isFeatured && <span className="ml-2 text-accent">Unggulan</span>}
                  </p>
                  <h3 className="mt-1 truncate font-display font-semibold">{p.name}</h3>
                  <p className="mt-0.5 text-sm text-muted-foreground [font-variant-numeric:tabular-nums]">
                    {formatPrice(p.price)}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-4">
                  <button
                    onClick={() => openEdit(p)}
                    className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Pencil className="h-4 w-4" aria-hidden /> Edit
                  </button>
                  <button
                    onClick={() => setToDelete(p)}
                    className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden /> Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {formOpen && (
        <ProductForm
          initial={editing}
          onSubmit={onSubmit}
          onClose={() => {
            setFormOpen(false);
            setEditing(null);
          }}
        />
      )}

      {toDelete && (
        <ConfirmDialog
          title="Hapus produk?"
          message={`"${toDelete.name}" akan dihapus permanen. Tindakan ini tidak bisa dibatalkan.`}
          busy={deleting}
          onConfirm={confirmDelete}
          onCancel={() => setToDelete(null)}
        />
      )}
    </div>
  );
}
