import type { Metadata } from "next";
import { Shield, Award, HeartHandshake, Cog, Users, Sparkles } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/StaggerContainer";

export const metadata: Metadata = {
  title: "Über uns | Stickwerk-Studio",
  description:
    "Seit über 10 Jahren fertigen wir hochwertige Stickpatches und Textilveredelung in Deutschland. Lernen Sie unser Team und unsere Philosophie kennen.",
};

const values = [
  {
    icon: Cog,
    title: "Handwerkskunst",
    description:
      "Jeder Stich wird mit Präzision gesetzt. Unsere erfahrenen Stickermeister überwachen jeden Produktionsschritt — von der Digitalisierung bis zur Endkontrolle.",
  },
  {
    icon: Award,
    title: "Qualitätsversprechen",
    description:
      "Wir verwenden ausschließlich hochwertige Garne und Materialien. Doppelte Qualitätskontrolle vor dem Versand garantiert langlebige, waschbeständige Ergebnisse.",
  },
  {
    icon: HeartHandshake,
    title: "Persönliche Beratung",
    description:
      "Kein Chat-Bot, kein automatisiertes Formular. Sie sprechen mit echten Menschen, die sich Zeit für Ihr Projekt nehmen — von der Idee bis zur Auslieferung.",
  },
  {
    icon: Sparkles,
    title: "Innovation & Tradition",
    description:
      "Modernste ZSK-Stickmaschinen treffen auf jahrzehntelanges handwerkliches Know-how. So entstehen Patches, die Maßstäbe setzen.",
  },
];

const team = [
  { name: "Tolgahan Günsal", role: "Gründer & Geschäftsführer", description: "Visionär mit Leidenschaft für textile Handwerkskunst. Von der ersten Idee bis zur fertigen Stickerei — er treibt jedes Projekt mit Herzblut voran." },
  { name: "Unser Team", role: "Stickermeister & Digitalisierer", description: "Ein erfahrenes Team aus Stickereifachleuten, Grafikdesignern und Produktionsprofis. Jeder bringt jahrelange Expertise in seinem Bereich mit." },
];

const machines = [
  { stat: "1.200", unit: "Stiche/min", label: "Maschinenleistung" },
  { stat: "18", unit: "Farben", label: "Pro Motiv möglich" },
  { stat: "10+", unit: "Jahre", label: "Erfahrung" },
  { stat: "50.000+", unit: "Patches", label: "Bereits produziert" },
];

export default function UeberUnsPage() {
  return (
    <main className="relative z-10">
      {/* Hero */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 px-6 bg-gradient-to-b from-background via-background to-surface-muted">
        <div className="max-w-7xl mx-auto">
          <Reveal variant="fade-up" duration={0.6}>
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground tracking-tight">
                Über Stickwerk-Studio
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Wir sind ein Familienbetrieb mit Leidenschaft für textile Handwerkskunst.
                Was als kleine Stickerei begann, ist heute eine professionelle
                Manufaktur für Custom Patches und Textilveredelung.
              </p>
              <div className="section-divider" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="py-12 md:py-20 px-6 bg-surface-muted">
        <div className="max-w-4xl mx-auto">
          <Reveal variant="fade-up" duration={0.6}>
            <div className="space-y-6 text-center">
              <h2 className="text-2xl md:text-3xl font-serif text-foreground">Unsere Geschichte</h2>
              <div className="prose prose-stone mx-auto space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Stickwerk-Studio entstand aus der Überzeugung, dass textile Werbung mehr sein kann
                  als ein aufgedrucktes Logo. Ein gestickter Patch ist ein Statement — er fühlt sich
                  hochwertig an, hält jahrelang und macht Ihre Marke im wahrsten Sinne des Wortes
                  begreifbar.
                </p>
                <p>
                  Was mit einer einzigen Stickmaschine in einer Münchner Garage begann, ist heute
                  eine professionelle Manufaktur mit modernsten ZSK-Stickmaschinen. Wir produzieren
                  für Vereine, Unternehmen, Musiker, Veranstalter und Kreative aus ganz Europa.
                </p>
                <p>
                  Unser Anspruch: Jeder Patch, der unsere Werkstatt verlässt, muss unseren hohen
                  Qualitätsstandards genügen. Deshalb digitalisieren wir jedes Motiv selbst,
                  wählen Garne und Materialien sorgfältig aus und prüfen jede Lieferung
                  persönlich.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 md:py-16 px-6 bg-background">
        <div className="max-w-5xl mx-auto">
          <StaggerContainer>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
              {machines.map((m) => (
                <StaggerItem key={m.label}>
                  <div className="text-center p-6 bg-card rounded-2xl border border-border">
                    <div className="text-3xl md:text-4xl font-bold text-accent">{m.stat}</div>
                    <div className="text-sm text-muted-foreground mt-1">{m.unit}</div>
                    <div className="text-xs text-muted-foreground/60 mt-1">{m.label}</div>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 md:py-20 px-6 bg-surface-muted">
        <div className="max-w-7xl mx-auto">
          <Reveal variant="fade-up" duration={0.6}>
            <div className="text-center mb-14 space-y-4">
              <h2 className="text-2xl md:text-3xl font-serif text-foreground">Unsere Werte</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Was uns antreibt und jeden Patch besonders macht.
              </p>
              <div className="section-divider" />
            </div>
          </Reveal>
          <StaggerContainer>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {values.map((v) => {
                const Icon = v.icon;
                return (
                  <StaggerItem key={v.title}>
                    <div className="h-full bg-card rounded-2xl border border-border p-6 md:p-8">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                      <h3 className="text-xl font-serif text-foreground mb-3">{v.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{v.description}</p>
                    </div>
                  </StaggerItem>
                );
              })}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Team */}
      <section className="py-12 md:py-20 px-6 bg-background">
        <div className="max-w-5xl mx-auto">
          <Reveal variant="fade-up" duration={0.6}>
            <div className="text-center mb-14 space-y-4">
              <h2 className="text-2xl md:text-3xl font-serif text-foreground">Unser Team</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Bei uns sind Sie in guten Händen.
              </p>
              <div className="section-divider" />
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {team.map((member) => (
              <Reveal key={member.name} variant="fade-up" duration={0.6}>
                <div className="bg-card rounded-2xl border border-border p-6 md:p-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Users className="w-10 h-10 text-accent" />
                  </div>
                  <h3 className="text-xl font-serif text-foreground">{member.name}</h3>
                  <p className="text-sm text-accent font-medium mt-1">{member.role}</p>
                  <p className="text-muted-foreground text-sm mt-4 leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 px-6 bg-surface-muted">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal variant="fade-up" duration={0.6}>
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-serif text-foreground">
                Bereit für Ihr Projekt?
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Lassen Sie uns gemeinsam Ihre Idee verwirklichen. Starten Sie mit einer
                unverbindlichen Anfrage oder nutzen Sie unseren Konfigurator.
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
