import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const fontDisplay = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const fontSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Pasar Terapung Digital",
    template: "%s — Pasar Terapung Digital",
  },
  description:
    "Platform storytelling imersif yang mengangkat UMKM Kalimantan/Banjar. Berlayar menyusuri sungai, temukan perahu UMKM, dan dukung kemandirian ekonomi lokal.",
  keywords: [
    "UMKM",
    "Banjar",
    "Kalimantan",
    "pasar terapung",
    "digitalisasi UMKM",
  ],
  openGraph: {
    title: "Pasar Terapung Digital",
    description:
      "Inovasi Digital Untuk Kemandirian UMKM Lokal — berlayar menyusuri sungai UMKM Banjar.",
    type: "website",
    locale: "id_ID",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b2545",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${fontDisplay.variable} ${fontSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
