"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { Sparkles } from "lucide-react";

const MockupProvider = dynamic(
  () => import("@/components/patch-mockup/mockup-provider").then((m) => m.MockupProvider),
  { ssr: false },
);

const MockupUploader = dynamic(
  () => import("@/components/patch-mockup/mockup-uploader"),
  { ssr: false },
);

const MockupPreview = dynamic(
  () => import("@/components/patch-mockup/mockup-preview"),
  { ssr: false },
);

const MockupConfigSidebar = dynamic(
  () => import("@/components/patch-mockup/mockup-config-sidebar"),
  { ssr: false },
);

const MockupShareButton = dynamic(
  () => import("@/components/patch-mockup/mockup-share-button"),
  { ssr: false },
);

export default function PatchBuilderPage() {
  return (
    <MockupProvider>
      <main className="min-h-screen bg-background pt-28 pb-16 px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <section className="max-w-7xl mx-auto mb-10">
          <Reveal variant="fade-up" duration={0.5}>
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium tracking-wide uppercase">
                Neu
              </span>
              <span className="text-xs text-muted-foreground/60">3D Patch-Vorschau</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground tracking-tight mb-4">
              Patch-Mockup{" "}
              <span className="text-accent">Generator</span>
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed">
              Lade dein Design hoch und sieh sofort, wie dein individueller Patch aussehen wird.
              Wähle Form, Rand, Material und Größe — alles in Echtzeit.
            </p>
          </Reveal>
        </section>

        {/* Builder Grid */}
        <section className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Left: Upload + Preview */}
            <div className="lg:col-span-2 space-y-6">
              <Reveal variant="fade-up" duration={0.5} delay={0.1}>
                <MockupUploader />
              </Reveal>

              <Reveal variant="fade-up" duration={0.5} delay={0.2}>
                <MockupPreview />
              </Reveal>

              <Reveal variant="fade-up" duration={0.5} delay={0.25}>
                <MockupShareButton />
              </Reveal>
            </div>

            {/* Right: Config Sidebar */}
            <div className="lg:col-span-1">
              <Reveal variant="fade-up" duration={0.5} delay={0.15}>
                <div className="sticky top-28 p-5 rounded-2xl border border-border bg-card/80 backdrop-blur-sm">
                  <MockupConfigSidebar />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Footer Note */}
        <section className="max-w-7xl mx-auto mt-16 text-center">
          <Reveal variant="fade-up" duration={0.5}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/5 border border-accent/20 text-sm text-muted-foreground">
              <Sparkles className="w-4 h-4 text-accent" />
              Die 3D-Vorschau ist eine erste Orientierung — das finale Ergebnis kann leicht abweichen.
            </div>
          </Reveal>
        </section>
      </main>
    </MockupProvider>
  );
}
