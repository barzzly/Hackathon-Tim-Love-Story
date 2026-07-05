export type Category =
  | "Kain Katun"
  | "Kain Sutra"
  | "Kain Satin"
  | "Selendang";

export const CATEGORIES: Category[] = [
  "Kain Katun",
  "Kain Sutra",
  "Kain Satin",
  "Selendang",
];

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number | null; // rupiah; null = "Hubungi"
  imageUrl: string;
  category: Category;
  isFeatured: boolean;
  createdAt: string; // ISO
}

export type ProductInput = Omit<Product, "id" | "createdAt">;
