import type { Metadata } from "next";
import { MapPin, Compass, Waves } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const metadata: Metadata = {
  title: "Styleguide (dev)",
  robots: { index: false, follow: false },
};

const swatches = [
  { name: "river-deep", cls: "bg-river-deep", fg: "text-white" },
  { name: "river-mid", cls: "bg-river-mid", fg: "text-white" },
  { name: "river-teal", cls: "bg-river-teal", fg: "text-white" },
  { name: "mist", cls: "bg-mist", fg: "text-ink" },
  { name: "sand", cls: "bg-sand", fg: "text-ink" },
  { name: "wood", cls: "bg-wood", fg: "text-white" },
  { name: "sunrise", cls: "bg-sunrise", fg: "text-ink" },
  { name: "gold", cls: "bg-gold", fg: "text-ink" },
  { name: "ink", cls: "bg-ink", fg: "text-white" },
];

export default function StyleguidePage() {
  return (
    <main className="min-h-dvh bg-background py-16">
      <Container className="space-y-16">
        <header className="space-y-3">
          <Badge variant="accent">
            <Waves /> Design System
          </Badge>
          <h1 className="text-hero font-display font-semibold tracking-tight text-balance">
            Pasar Terapung Digital
          </h1>
          <p className="text-lead max-w-2xl text-muted-foreground text-pretty">
            Visual reference untuk semua token & primitive. Hapus route ini
            sebelum submit.
          </p>
        </header>

        {/* Colors */}
        <section className="space-y-4">
          <h2 className="text-h2 font-display font-semibold">Palette</h2>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-9">
            {swatches.map((s) => (
              <div
                key={s.name}
                className={`flex aspect-square flex-col justify-end rounded-xl p-2.5 shadow-[var(--shadow-soft)] ${s.cls}`}
              >
                <span className={`text-[0.7rem] font-medium ${s.fg}`}>
                  {s.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section className="space-y-4">
          <h2 className="text-h2 font-display font-semibold">Typography</h2>
          <div className="space-y-3 rounded-2xl border border-border bg-card p-6">
            <p className="text-hero font-display font-semibold">Hero display</p>
            <p className="text-display font-display font-semibold">
              Display heading
            </p>
            <p className="text-h2 font-display font-semibold">Heading level 2</p>
            <p className="text-h3 font-display font-medium">Heading level 3</p>
            <p className="text-lead text-muted-foreground">
              Lead paragraph — Inter, dipakai untuk intro section dan subheading
              hero.
            </p>
            <p className="text-body max-w-prose">
              Body text — soto banjar, kain sasirangan, wadai tradisional.
              Menyusuri sungai menemukan perahu UMKM yang menjajakan warisan
              kuliner dan kerajinan Banjar.
            </p>
          </div>
        </section>

        {/* Buttons */}
        <section className="space-y-4">
          <h2 className="text-h2 font-display font-semibold">Buttons</h2>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary" size="lg">
              <Compass /> Mulai Berlayar
            </Button>
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Hapus</Button>
            <Button variant="link">Link</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary" size="sm">
              Small
            </Button>
            <Button variant="primary" size="md">
              Medium
            </Button>
            <Button variant="primary" size="lg" pill>
              Large Pill
            </Button>
            <Button variant="outline" size="icon" aria-label="Lokasi">
              <MapPin />
            </Button>
            <Button variant="primary" disabled>
              Disabled
            </Button>
          </div>
        </section>

        {/* Badges */}
        <section className="space-y-4">
          <h2 className="text-h2 font-display font-semibold">Badges</h2>
          <div className="flex flex-wrap gap-3">
            <Badge>Default</Badge>
            <Badge variant="location">
              <MapPin /> Banjarmasin
            </Badge>
            <Badge variant="accent">Unggulan</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        </section>

        {/* Cards */}
        <section className="space-y-4">
          <h2 className="text-h2 font-display font-semibold">Cards</h2>
          <div className="grid gap-5 md:grid-cols-3">
            <Card variant="solid" interactive>
              <CardHeader>
                <Badge variant="location">
                  <MapPin /> Martapura
                </Badge>
                <CardTitle>Solid + interactive</CardTitle>
                <CardDescription>
                  Hover: lift + shadow. Dipakai untuk UmkmCard.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="outline" size="sm">
                  Lihat
                </Button>
              </CardFooter>
            </Card>

            <Card variant="glass" interactive className="bg-river-gradient/0">
              <CardHeader>
                <CardTitle>Glass</CardTitle>
                <CardDescription>
                  Liquid-glass surface, backdrop blur.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Paling jelas di atas background bergambar.
                </p>
              </CardContent>
            </Card>

            <Card variant="outline">
              <CardHeader>
                <CardTitle>Outline</CardTitle>
                <CardDescription>Minimal, tanpa fill.</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Form primitives */}
        <section className="space-y-4">
          <h2 className="text-h2 font-display font-semibold">Form</h2>
          <div className="grid max-w-md gap-4 rounded-2xl border border-border bg-card p-6">
            <div className="grid gap-2">
              <Label htmlFor="sg-name">Nama UMKM</Label>
              <Input id="sg-name" placeholder="mis. Warung Soto Bang Amat" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="sg-desc">Deskripsi</Label>
              <Textarea id="sg-desc" placeholder="Cerita singkat UMKM..." />
            </div>
            <Button variant="primary">Simpan</Button>
          </div>
        </section>
      </Container>
    </main>
  );
}
