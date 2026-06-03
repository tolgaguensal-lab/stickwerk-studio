import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "FAQ | Stickwerk-Studio",
  description:
    "Häufig gestellte Fragen zu Bestellung, Produktion, Design und Pflege unserer individuellen Stickpatches.",
};

interface FaqItem {
  question: string;
  answer: string;
}

const categories: { label: string; items: FaqItem[] }[] = [
  {
    label: "Bestellung & Preise",
    items: [
      {
        question: "Wie läuft der Bestellprozess ab?",
        answer:
          "Sie haben zwei Wege: Nutzen Sie unseren Patch-Konfigurator für eine schnelle unverbindliche Anfrage oder senden Sie uns eine Nachricht über das Kontaktformular. Nach Eingang prüfen wir Ihre Angaben, erstellen ein individuelles Angebot und ein digitales Mock-up zur Freigabe. Nach Ihrer Bestätigung startet die Produktion."
      },
      {
        question: "Gibt es Mindestabnahmemengen?",
        answer:
          "Die Mindestabnahmemenge beträgt 10 Stück. Für individuelle Formen oder besondere Materialien kann die Mindestmenge 25 Stück betragen. Ab 20, 50 und 100 Stück gelten attraktive Staffelpreise. Für Großserien ab 500 Stück erstellen wir Ihnen gerne ein individuelles Angebot."
      },
      {
        question: "Was kostet eine Stickerei?",
        answer:
          "Der Preis hängt von Größe, Komplexität, Farbanzahl und Stückzahl ab. Als Richtwert: Kleine Logo-Patches (5×5 cm) starten bei ca. 4-6€ pro Stück, mittlere Patches (8×8 cm) bei 7-10€ und große Rückengestickungen (15×15 cm) bei 12-18€. Je höher die Stückzahl, desto günstiger der Einzelpreis. Nutzen Sie unseren Preisrechner für eine erste Orientierung."
      },
      {
        question: "Welche Zahlungsmethoden akzeptiert ihr?",
        answer:
          "Wir akzeptieren Vorkasse (Banküberweisung), PayPal und Rechnung für Geschäftskunden. Bei Erstbestellungen bitten wir um Vorkasse. Ab der zweiten Bestellung können wir Ihnen auch Zahlung auf Rechnung anbieten."
      },
      {
        question: "Kann ich vor der Bestellung ein Muster erhalten?",
        answer:
          "Ja, wir bieten Muster-Patches an. Die Kosten betragen 15€ pro Stück (voll anrechenbar auf spätere Bestellungen). Die Musterproduktion dauert 5-7 Werktage. Sie erhalten ein Foto vor der Freigabe."
      },
    ],
  },
  {
    label: "Produktion",
    items: [
      {
        question: "Wie lange dauert die Produktion?",
        answer:
          "Die Standardproduktionszeit beträgt 7-10 Werktage nach Freigabe des Stickmotivs. Bei größeren Mengen (ab 100 Stück) planen wir 14-21 Tage ein. Expressproduktion ist auf Anfrage in 3-5 Werktagen möglich."
      },
      {
        question: "Bietet ihr Express-Produktion an?",
        answer:
          "Ja! Gegen einen Aufpreis von 30% produzieren wir Ihre Bestellung in nur 3-5 Werktagen. Bitte geben Sie Ihren Wunschtermin bereits bei der Anfrage an, damit wir die Machbarkeit prüfen können."
      },
      {
        question: "Könnt ihr auch bestehende Patches übersticken?",
        answer:
          "Ja, wir bieten auch Überstickungen auf bestehenden Patches oder Textilien an. Dies ist ideal für Personalisierungen oder Updates von Logos. Bitte senden Sie uns eine Anfrage mit Details zu Material und gewünschtem Design."
      },
      {
        question: "Welche Rückseiten-Optionen gibt es?",
        answer:
          "Wir bieten drei Varianten an: Zum Aufnähen (traditionell, sehr haltbar), zum Aufbügeln (einfache Anwendung, für Textilien geeignet) und mit Klettverschluss (flexibel abnehmbar, ideal für Jacken und Taschen). Klett liefern wir inklusive Gegenstück zum Annähen."
      },
    ],
  },
  {
    label: "Design & Digitalisierung",
    items: [
      {
        question: "Welche Dateiformate akzeptiert ihr für Designs?",
        answer:
          "Wir akzeptieren PNG, JPG, SVG, PDF und AI. Am besten funktionieren vektorbasierte Formate (SVG, AI) für eine optimale Qualität. Bei Rastergrafiken sollte die Auflösung mindestens 300 DPI betragen. Reichen Sie einfach ein — wir prüfen die Umsetzbarkeit kostenlos."
      },
      {
        question: "Bietet ihr auch Digitalisierung von Logos an?",
        answer:
          "Ja, wir digitalisieren Ihre Logos oder Designs für die Stickmaschine. Dabei wird Ihre Vorlage Stich für Stich in ein maschinenlesbares Format umgewandelt. Die Kosten betragen einmalig 15-30€ je nach Komplexität. Diese Gebühr entfällt bei Bestellungen ab 50 Stück."
      },
      {
        question: "Könnt ihr auch Fremdtextilien besticken?",
        answer:
          "Ja, Sie können uns eigene Textilien zusenden, die wir mit Ihrem Motiv besticken. Bitte beachten Sie: Wir übernehmen keine Haftung für Beschädigungen an Fremdtextilien. Wir empfehlen, die Textilien vorab auf Sticktauglichkeit zu prüfen. Der Aufpreis für Fremdbestickung beträgt 3€ pro Stück."
      },
    ],
  },
  {
    label: "Pflege & Versand",
    items: [
      {
        question: "Wie pflege ich meine Stickpatches richtig?",
        answer:
          "Patches zum Aufnähen können bei bis zu 40°C gewaschen werden. Bügelrückseiten sollten nicht gebügelt und schonend gewaschen werden. Klettverschlüsse behalten ihre Haftung bei normaler Pflege. Zum Trocknen immer flach legen, nicht in den Trockner geben."
      },
      {
        question: "Kann ich meine Patches auch nachbestellen?",
        answer:
          "Ja! Wir archivieren jede Stickdatei dauerhaft. Bei Nachbestellungen fallen keine erneuten Digitalisierungskosten an. Sie können jederzeit ab 10 Stück nachbestellen — auch Jahre später. Einzige Ausnahme: Sonderformen, die nur in der Erstauflage wirtschaftlich sind."
      },
      {
        question: "In welche Länder liefert ihr?",
        answer:
          "Wir liefern innerhalb Deutschlands (4,90€), in die EU (ab 7,90€) und weltweit (ab 12,90€). Der Versand erfolgt klimaneutral mit DHL GoGreen. Ab 200€ Bestellwert liefern wir innerhalb Deutschlands versandkostenfrei."
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <main className="relative z-10">
      {/* Hero */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 px-6 bg-gradient-to-b from-background via-background to-surface-muted">
        <div className="max-w-3xl mx-auto">
          <Reveal variant="fade-up" duration={0.6}>
            <div className="text-center space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground tracking-tight">
                Häufig gestellte Fragen
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Alles, was Sie über unsere Patches, Bestellprozess und Produktion wissen müssen.
                Schnelle Antworten auf die wichtigsten Fragen.
              </p>
              <div className="section-divider" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12 md:py-20 px-6 bg-background">
        <div className="max-w-3xl mx-auto space-y-16">
          {categories.map((category) => (
            <div key={category.label}>
              <Reveal variant="fade-up" duration={0.6}>
                <h2 className="text-xl md:text-2xl font-serif text-foreground mb-8 text-center">
                  {category.label}
                </h2>
              </Reveal>
              <Reveal variant="fade-up" duration={0.6}>
                <Accordion type="single" collapsible className="space-y-3">
                  {category.items.map((item, i) => (
                    <AccordionItem
                      key={`${category.label}-${i}`}
                      value={`${category.label}-${i}`}
                      className="rounded-xl border border-border bg-card overflow-hidden"
                    >
                      <AccordionTrigger className="text-base font-medium text-foreground hover:text-accent transition-colors px-6 py-4 text-left">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed px-6 pb-4">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 px-6 bg-surface-muted">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal variant="fade-up" duration={0.6}>
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-serif text-foreground">
                Keine Antwort gefunden?
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Schreiben Sie uns einfach an. Wir antworten innerhalb von 24 Stunden
                und beraten Sie persönlich.
              </p>
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground rounded-full hover:bg-accent/90 transition-all font-medium shadow-sm shadow-accent/20"
              >
                Kontakt aufnehmen
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
