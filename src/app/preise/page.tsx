"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator, ArrowRight, Info } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Reveal } from "@/components/Reveal";

const sizes = [
  { value: 3, label: "3×3 cm", price: 3 },
  { value: 5, label: "5×5 cm", price: 5 },
  { value: 8, label: "8×8 cm", price: 8 },
  { value: 10, label: "10×10 cm", price: 12 },
  { value: 15, label: "15×15 cm", price: 18 },
] as const;

const quantities = [
  { value: "1-9", multiplier: 1.0, label: "1–9 Stück" },
  { value: "10-49", multiplier: 0.85, label: "10–49 Stück" },
  { value: "50-199", multiplier: 0.7, label: "50–199 Stück" },
  { value: "200+", multiplier: 0.6, label: "200+ Stück" },
] as const;

const complexities = [
  { value: "simple", multiplier: 1.0, label: "Einfach", desc: "Logo, Schriftzug, klare Linien" },
  { value: "medium", multiplier: 1.5, label: "Mittel", desc: "Logo mit Details, Verläufe" },
  { value: "complex", multiplier: 2.0, label: "Komplex", desc: "Fotorealistisch, viele Farben" },
] as const;

const backings = [
  { value: "sew", label: "Zum Aufnähen", price: 0 },
  { value: "iron", label: "Zum Aufbügeln", price: 1 },
  { value: "velcro", label: "Klettverschluss", price: 2 },
] as const;

export default function PreisePage() {
  const [size, setSize] = useState<number>(8);
  const [quantity, setQuantity] = useState<string>("10-49");
  const [complexity, setComplexity] = useState<string>("medium");
  const [backing, setBacking] = useState<string>("sew");

  const result = useMemo(() => {
    const sizeData = sizes.find((s) => s.value === size) || sizes[2];
    const quantityData = quantities.find((q) => q.value === quantity) || quantities[1];
    const complexityData = complexities.find((c) => c.value === complexity) || complexities[1];
    const backingData = backings.find((b) => b.value === backing) || backings[0];

    const baseSingle = sizeData.price;
    const withComplexity = baseSingle * complexityData.multiplier;
    const withQuantity = withComplexity * quantityData.multiplier;
    const withBacking = withQuantity + backingData.price;

    const variance = 0.2; // ±20% Schwankung
    const singleMin = Math.round(withBacking * (1 - variance) * 100) / 100;
    const singleMax = Math.round(withBacking * (1 + variance) * 100) / 100;

    // Determine actual quantity number for total calculation
    let qty = 25;
    if (quantity === "1-9") qty = 5;
    else if (quantity === "10-49") qty = 25;
    else if (quantity === "50-199") qty = 100;
    else qty = 300;

    const totalMin = Math.round(singleMin * qty * 100) / 100;
    const totalMax = Math.round(singleMax * qty * 100) / 100;

    return {
      singleMin,
      singleMax,
      totalMin,
      totalMax,
      qty,
    };
  }, [size, quantity, complexity, backing]);

  return (
    <main className="relative z-10">
      {/* Hero */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 px-6 bg-gradient-to-b from-background via-background to-surface-muted">
        <div className="max-w-3xl mx-auto">
          <Reveal variant="fade-up" duration={0.6}>
            <div className="text-center space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground tracking-tight">
                Preise & Kalkulator
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Transparente Preise für Ihre individuellen Stickpatches. Der endgültige Preis hängt
                von der genauen Stichzahl und dem Aufwand ab — hier erhalten Sie eine erste Orientierung.
              </p>
              <div className="section-divider" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Kalkulator */}
      <section className="py-12 md:py-16 px-6 bg-background">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3">
            <Reveal variant="fade-up" duration={0.6}>
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg font-serif flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-accent" />
                    Konfigurieren Sie Ihren Patch
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Größe */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">
                      Patch-Größe
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      {sizes.map((s) => (
                        <button
                          key={s.value}
                          onClick={() => setSize(s.value)}
                          className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                            size === s.value
                              ? "bg-accent text-accent-foreground shadow-sm shadow-accent/20"
                              : "bg-card text-muted-foreground hover:text-foreground border border-border hover:border-accent/40"
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Menge */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">
                      Stückzahl
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {quantities.map((q) => (
                        <button
                          key={q.value}
                          onClick={() => setQuantity(q.value)}
                          className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                            quantity === q.value
                              ? "bg-accent text-accent-foreground shadow-sm shadow-accent/20"
                              : "bg-card text-muted-foreground hover:text-foreground border border-border hover:border-accent/40"
                          }`}
                        >
                          {q.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Komplexität */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">
                      Komplexität des Motivs
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {complexities.map((c) => (
                        <button
                          key={c.value}
                          onClick={() => setComplexity(c.value)}
                          className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-left ${
                            complexity === c.value
                              ? "bg-accent text-accent-foreground shadow-sm shadow-accent/20"
                              : "bg-card text-muted-foreground hover:text-foreground border border-border hover:border-accent/40"
                          }`}
                        >
                          <div className="font-medium">{c.label}</div>
                          <div className="text-xs opacity-70 mt-0.5">{c.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Rückseite */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">
                      Rückseite / Befestigung
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {backings.map((b) => (
                        <button
                          key={b.value}
                          onClick={() => setBacking(b.value)}
                          className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                            backing === b.value
                              ? "bg-accent text-accent-foreground shadow-sm shadow-accent/20"
                              : "bg-card text-muted-foreground hover:text-foreground border border-border hover:border-accent/40"
                          }`}
                        >
                          {b.label}
                          {b.price > 0 && (
                            <span className="text-xs opacity-70 ml-1">(+{b.price}€)</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          </div>

          {/* Ergebnis */}
          <div className="lg:col-span-2">
            <div className="sticky top-28">
              <Reveal variant="fade-up" duration={0.6}>
                <Card className="border-accent/30 bg-accent/5">
                  <CardHeader>
                    <CardTitle className="text-lg font-serif text-foreground">
                      Geschätzter Preis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Preis pro Stück */}
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-1">Pro Stück</p>
                      <motion.p
                        key={`single-${result.singleMin}-${result.singleMax}`}
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-3xl md:text-4xl font-bold text-accent"
                      >
                        {result.singleMin.toFixed(2)}€ – {result.singleMax.toFixed(2)}€
                      </motion.p>
                    </div>

                    <div className="border-t border-accent/20 pt-4">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-1">
                          Gesamt ({result.qty} Stück)
                        </p>
                        <motion.p
                          key={`total-${result.totalMin}-${result.totalMax}`}
                          initial={{ scale: 1.1, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="text-2xl font-bold text-foreground"
                        >
                          {result.totalMin.toFixed(2)}€ – {result.totalMax.toFixed(2)}€
                        </motion.p>
                      </div>
                    </div>

                    <div className="bg-accent/10 rounded-xl p-4 flex items-start gap-3 text-sm text-muted-foreground">
                      <Info className="w-4 h-4 shrink-0 mt-0.5 text-accent" />
                      <p>
                        Das ist ein Richtwert. Der endgültige Preis hängt von der exakten Stichzahl,
                        Materialauswahl und Designkomplexität ab. Für ein verbindliches Angebot
                        nutzen Sie bitte unseren Konfigurator oder kontaktieren Sie uns direkt.
                      </p>
                    </div>

                    <Link href="/#calculator">
                      <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 py-5 h-auto rounded-full gap-2">
                        Jetzt anfragen
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Preistabelle */}
      <section className="py-12 md:py-20 px-6 bg-surface-muted">
        <div className="max-w-5xl mx-auto">
          <Reveal variant="fade-up" duration={0.6}>
            <div className="text-center mb-12 space-y-4">
              <h2 className="text-2xl md:text-3xl font-serif text-foreground">
                Preisübersicht (Richtwerte)
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Die folgenden Preise dienen der Orientierung. Der tatsächliche Preis wird
                individuell kalkuliert.
              </p>
              <div className="section-divider" />
            </div>
          </Reveal>

          <Reveal variant="fade-up" duration={0.6}>
            <Card className="border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-accent/10 border-b border-border">
                      <th className="text-left px-6 py-4 font-medium text-foreground">Größe</th>
                      <th className="text-left px-6 py-4 font-medium text-foreground">10–49 Stück</th>
                      <th className="text-left px-6 py-4 font-medium text-foreground">50–199 Stück</th>
                      <th className="text-left px-6 py-4 font-medium text-foreground">200+ Stück</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {[
                      { size: "3×3 cm", small: "3–5€", mid: "2–4€", large: "1,50–3€" },
                      { size: "5×5 cm", small: "4–6€", mid: "3–5€", large: "2,50–4€" },
                      { size: "8×8 cm", small: "7–10€", mid: "5–8€", large: "4–7€" },
                      { size: "10×10 cm", small: "10–15€", mid: "8–12€", large: "6–10€" },
                      { size: "15×15 cm", small: "15–22€", mid: "12–18€", large: "10–15€" },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-accent/5 transition-colors">
                        <td className="px-6 py-4 font-medium text-foreground">{row.size}</td>
                        <td className="px-6 py-4 text-muted-foreground">{row.small}</td>
                        <td className="px-6 py-4 text-muted-foreground">{row.mid}</td>
                        <td className="px-6 py-4 text-muted-foreground">{row.large}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </Reveal>

          <Reveal variant="fade-up" duration={0.6}>
            <p className="text-sm text-muted-foreground mt-4 text-center">
              Alle Preise zzgl. Digitalisierung (15–30€ einmalig, entfällt ab 50 Stück) und
              Versand (DE: 4,90€, EU: ab 7,90€, weltweit: ab 12,90€). Preise verstehen sich
              zzgl. MwSt.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 px-6 bg-background">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal variant="fade-up" duration={0.6}>
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-serif text-foreground">
                Jetzt verbindliches Angebot erhalten
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Nutzen Sie unseren Konfigurator für eine detaillierte Anfrage oder schreiben
                Sie uns direkt. Wir erstellen Ihnen innerhalb von 24 Stunden ein individuelles
                Angebot.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/#calculator"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground rounded-full hover:bg-accent/90 transition-all font-medium shadow-sm shadow-accent/20"
                >
                  Jetzt konfigurieren
                </Link>
                <Link
                  href="/kontakt"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-card text-foreground rounded-full hover:bg-card/80 transition-all font-medium border border-border"
                >
                  Kontakt aufnehmen
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
