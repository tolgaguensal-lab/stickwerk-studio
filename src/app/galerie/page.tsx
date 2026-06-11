"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/StaggerContainer";

type Category = "Alle" | "Logo-Patches" | "Textil" | "Merch" | "Sonderanfertigungen";

interface PortfolioItem {
  title: string;
  category: Exclude<Category, "Alle">;
  description: string;
  image: string;
  accent: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    title: "Vereinswappen FC Bayern Fanclub",
    category: "Logo-Patches",
    description: "Aufwändig gearbeitetes Vereinswappen mit 15.000 Stichen. Jeder detailreiche Verlauf wurde exakt auf den Stickrahmen übertragen.",
    image: "/images/gallery/galerie-01.jpg",
    accent: "#8A6A3F",
  },
  {
    title: "Firmenlogo TechStartup München",
    category: "Logo-Patches",
    description: "Modernes, reduziertes Logo als Bügelpatch für Mitarbeiter-Hoodies. 8.000 Stiche, zweifarbig auf schwarzem Grund.",
    image: "/images/gallery/galerie-02.jpg",
    accent: "#5C5248",
  },
  {
    title: "Merch-Kollektion YouTuber",
    category: "Merch",
    description: "Limitierte Auflage von 200 Patches für einen Gaming-Streamer. Mit Klettverschluss und individuelle Sticknummer.",
    image: "/images/gallery/galerie-03.jpg",
    accent: "#8B1E1E",
  },
  {
    title: "Corporate Fashion Agentur",
    category: "Textil",
    description: "Gestickte Logo-Ärmelpatches für ein 50-köpfiges Kreativteam. Angenehme Haptik trotz dichtem Stickbild.",
    image: "/images/gallery/galerie-04.jpg",
    accent: "#1F6B3A",
  },
  {
    title: "Sonderform Motorrad-Club",
    category: "Sonderanfertigungen",
    description: "Freigeschnittener Patch in spezieller Wappenform mit Metallstickgarn. Inklusive Musterfertigung und 3 Anpassungsrunden.",
    image: "/images/gallery/galerie-05.jpg",
    accent: "#5C4B6B",
  },
  {
    title: "Streetwear Brand Berlin",
    category: "Merch",
    description: "Großformatiger Rückenteil-Patch für eine limited Edition. Kontraststickgarn auf schwerem Baumwollstoff.",
    image: "/images/gallery/galerie-06.jpg",
    accent: "#6B4F2E",
  },
  {
    title: "Vereinsjacken THW Kiel Fanclub",
    category: "Textil",
    description: "150 Sätze Textil-Patches für Vereinsjacken in 4 Größen. Einheitliche Qualität bei maximaler Detailtreue.",
    image: "/images/gallery/galerie-07.jpg",
    accent: "#2D5F8A",
  },
  {
    title: "Crossover-Patch: Logo + Text",
    category: "Sonderanfertigungen",
    description: "Kombination aus Schriftzug und Logo in einem Patch. Zwei Sticktechniken auf einer Fläche vereint.",
    image: "/images/gallery/galerie-08.jpg",
    accent: "#5C5248",
  },
  {
    title: "Event-Merch Konferenz 2026",
    category: "Merch",
    description: "Erinnerungspatch für eine Tech-Konferenz mit QR-Code (gestickt!) und Event-Datum. 500 Stück Auflage.",
    image: "/images/gallery/galerie-09.jpg",
    accent: "#3A332C",
  },
  {
    title: "Feuerwehr Ehrenabzeichen",
    category: "Sonderanfertigungen",
    description: "Hochdetailiertes Abzeichen mit Goldstickgarn, Eichenlaubkranz und mehrzeiligem Schriftzug. Handwerkskunst vom Feinsten.",
    image: "/images/gallery/galerie-10.jpg",
    accent: "#8A6A3F",
  },
  {
    title: "Kunstprojekt: Stickerei auf Denim",
    category: "Sonderanfertigungen",
    description: "Künstlerische Stickerei direkt auf Jeansjacke. Filigrane Linienführung und weiche Farbverläufe als textile Zeichnung.",
    image: "/images/gallery/galerie-11.jpg",
    accent: "#3A6B8A",
  },
  {
    title: "Startup-Branding Paket",
    category: "Logo-Patches",
    description: "Komplettes Branding-Paket aus 4 verschiedenen Patch-Formaten: klein für Cap, mittel für Hoodie, groß für Rucksack.",
    image: "/images/gallery/galerie-12.jpg",
    accent: "#6B4028",
  },
];

const categories: Category[] = ["Alle", "Logo-Patches", "Textil", "Merch", "Sonderanfertigungen"];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("Alle");

  const filtered =
    activeCategory === "Alle"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory);

  return (
    <main className="relative z-10">
      {/* Hero */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 px-6 bg-gradient-to-b from-background via-background to-surface-muted">
        <div className="max-w-7xl mx-auto">
          <Reveal variant="fade-up" duration={0.6}>
            <div className="text-center space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground tracking-tight">
                Unsere Arbeiten
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Jeder Patch erzählt eine Geschichte. Hier zeigen wir eine Auswahl unserer
                Projekte — von Einzelstücken bis zur Serienproduktion.
              </p>
              <div className="section-divider" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Filter */}
      <section className="pb-8 px-6 bg-surface-muted">
        <div className="max-w-7xl mx-auto">
          <Reveal variant="fade-up" duration={0.4}>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-accent text-accent-foreground shadow-sm shadow-accent/20"
                      : "bg-card text-muted-foreground hover:text-foreground hover:bg-card/80 border border-border"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 md:py-16 px-6 bg-surface-muted">
        <div className="max-w-7xl mx-auto">
          <StaggerContainer staggerDelay={0.06}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filtered.map((item, i) => (
                <StaggerItem key={i}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    className="card bg-card rounded-2xl border border-border overflow-hidden group cursor-pointer"
                  >
                    {/* Patch Image */}
                    <div className="relative h-52 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {/* Dark overlay for readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      {/* Decorative stitch border */}
                      <div className="absolute inset-3 border border-white/15 rounded-xl pointer-events-none" />
                      <div className="absolute inset-6 border border-white/10 rounded-lg pointer-events-none" />
                    </div>

                    {/* Content */}
                    <div className="p-5 md:p-6">
                      <span
                        className="inline-block text-[11px] font-medium tracking-wider uppercase px-2.5 py-1 rounded-full mb-3"
                        style={{
                          backgroundColor: `${item.accent}15`,
                          color: item.accent,
                        }}
                      >
                        {item.category}
                      </span>
                      <h3 className="font-serif text-lg text-foreground mb-2 group-hover:text-accent transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">
                Keine Arbeiten in dieser Kategorie gefunden.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 px-6 bg-background">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal variant="fade-up" duration={0.6}>
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-serif text-foreground">
                Ihr Projekt könnte hier das nächste sein
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Lassen Sie auch Ihr Motiv von uns in hochwertige Stickarbeit verwandeln.
                Wir beraten Sie persönlich und unverbindlich.
              </p>
              <a
                href="/kontakt"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground rounded-full hover:bg-accent/90 transition-all font-medium shadow-sm shadow-accent/20"
              >
                Jetzt anfragen
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
