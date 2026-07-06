import Link from "next/link";
import { Compass } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";

export default function Home() {
  return (
    <main className="dark relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-river-gradient text-foreground">
      {/* soft glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/3 left-1/2 size-[120vmin] -translate-x-1/2 rounded-full bg-sunrise/10 blur-3xl"
      />
      <Container className="relative z-10 flex flex-col items-center gap-6 text-center">
        <Badge variant="accent">Inovasi Digital untuk UMKM Lokal</Badge>
        <h1 className="text-hero max-w-4xl font-display font-semibold tracking-tight text-balance text-white">
          Pasar Terapung Digital
        </h1>
        <p className="text-lead max-w-xl text-mist/85 text-pretty">
          Berlayar menyusuri sungai, temukan perahu UMKM Banjar, dan dukung
          kemandirian ekonomi lokal.
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <Button variant="primary" size="lg" pill>
            <Compass /> Mulai Berlayar
          </Button>
          <Link
            href="/dev/styleguide"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg", pill: true })
            )}
          >
            Lihat Styleguide
          </Link>
        </div>
      </Container>
    </main>
  );
}
