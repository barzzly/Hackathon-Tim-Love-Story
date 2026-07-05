import { supabase, hasSupabase, STORAGE_BUCKET } from "./supabase";
import type { Product, ProductInput } from "./types";
import { SEED_PRODUCTS } from "../data/seed";

/*
 * Data layer dual-mode:
 *  - Supabase terisi  → pakai tabel `products` + storage bucket.
 *  - Kosong (demo)    → pakai localStorage, di-seed dari SEED_PRODUCTS.
 * Semua halaman hanya memanggil fungsi di file ini; tidak tahu mode mana.
 */

const LS_KEY = "sasirangan.products.v2";

function lsRead(): Product[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) {
      localStorage.setItem(LS_KEY, JSON.stringify(SEED_PRODUCTS));
      return [...SEED_PRODUCTS];
    }
    return JSON.parse(raw) as Product[];
  } catch {
    return [...SEED_PRODUCTS];
  }
}

function lsWrite(items: Product[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(items));
}

function genId(): string {
  return `p-${Date.now().toString(36)}-${Math.floor(Math.random() * 1e6).toString(36)}`;
}

// Supabase row (snake_case) <-> Product (camelCase)
type Row = {
  id: string;
  name: string;
  description: string;
  price: number | null;
  image_url: string;
  category: string;
  is_featured: boolean;
  created_at: string;
};

const fromRow = (r: Row): Product => ({
  id: r.id,
  name: r.name,
  description: r.description,
  price: r.price,
  imageUrl: r.image_url,
  category: r.category as Product["category"],
  isFeatured: r.is_featured,
  createdAt: r.created_at,
});

const toRow = (p: ProductInput) => ({
  name: p.name,
  description: p.description,
  price: p.price,
  image_url: p.imageUrl,
  category: p.category,
  is_featured: p.isFeatured,
});

export async function getProducts(): Promise<Product[]> {
  if (hasSupabase && supabase) {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data as Row[]).map(fromRow);
  }
  await tick();
  return lsRead().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getProduct(id: string): Promise<Product | null> {
  if (hasSupabase && supabase) {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (error) throw error;
    return data ? fromRow(data as Row) : null;
  }
  await tick();
  return lsRead().find((p) => p.id === id) ?? null;
}

export async function createProduct(input: ProductInput): Promise<Product> {
  if (hasSupabase && supabase) {
    const { data, error } = await supabase
      .from("products")
      .insert(toRow(input))
      .select("*")
      .single();
    if (error) throw error;
    return fromRow(data as Row);
  }
  await tick();
  const items = lsRead();
  const product: Product = {
    ...input,
    id: genId(),
    createdAt: new Date().toISOString(),
  };
  lsWrite([product, ...items]);
  return product;
}

export async function updateProduct(
  id: string,
  input: ProductInput,
): Promise<Product> {
  if (hasSupabase && supabase) {
    const { data, error } = await supabase
      .from("products")
      .update(toRow(input))
      .eq("id", id)
      .select("*")
      .single();
    if (error) throw error;
    return fromRow(data as Row);
  }
  await tick();
  const items = lsRead();
  const idx = items.findIndex((p) => p.id === id);
  if (idx === -1) throw new Error("Produk tidak ditemukan");
  const updated: Product = { ...items[idx], ...input };
  items[idx] = updated;
  lsWrite(items);
  return updated;
}

export async function deleteProduct(id: string): Promise<void> {
  if (hasSupabase && supabase) {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) throw error;
    return;
  }
  await tick();
  lsWrite(lsRead().filter((p) => p.id !== id));
}

/**
 * Upload foto. Supabase mode → storage bucket, return public URL.
 * Demo mode → data URL (base64) supaya preview tetap tampil.
 */
export async function uploadImage(file: File): Promise<string> {
  if (hasSupabase && supabase) {
    const ext = file.name.split(".").pop() || "jpg";
    const path = `${genId()}.${ext}`;
    const { error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(path, file, { cacheControl: "3600", upsert: false });
    if (error) throw error;
    const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
    return data.publicUrl;
  }
  return fileToDataUrl(file);
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Gagal membaca file"));
    reader.readAsDataURL(file);
  });
}

// Small delay so skeleton/loading states are visible in demo mode.
function tick(ms = 350) {
  return new Promise((r) => setTimeout(r, ms));
}
