import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind class names with conflict resolution. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const rupiahFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

/**
 * Format a number as Indonesian Rupiah, e.g. `formatRupiah(15000)` -> "Rp 15.000".
 * Uses a regular space between symbol and value for cleaner wrapping.
 */
export function formatRupiah(value: number): string {
  if (!Number.isFinite(value)) return "Rp 0";
  return rupiahFormatter.format(value).replace(/^Rp\s?/, "Rp ");
}

// Combining diacritical marks (U+0300–U+036F) stripped after NFKD normalize.
const COMBINING_MARKS = /[̀-ͯ]/g;

/**
 * Convert a string to a URL-safe slug.
 * Strips diacritics, lowercases, and collapses whitespace/punctuation to dashes.
 */
export function slugify(input: string): string {
  return input
    .normalize("NFKD")
    .replace(COMBINING_MARKS, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
