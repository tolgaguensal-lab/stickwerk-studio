import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Impressum() {
  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-4">
            Impressum
          </h1>
          <p className="text-foreground/70">
            Angaben gem&auml;&szlig; &sect; 5 TMG
          </p>
        </div>

        <div className="flex justify-start">
          <Link
            href="/"
            className="text-foreground hover:text-accent transition-colors flex items-center gap-2"
          >
            &larr; Zur&uuml;ck zur Startseite
          </Link>
        </div>

        <Card className="bg-background backdrop-blur-sm border-border/30">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">
              Stickwerk-Studio
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-foreground/80">
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-foreground">
                Verantwortlich f&uuml;r den Inhalt:
              </h2>
              <p className="font-semibold">Stickwerk-Studio</p>
              <p>Musterstra&szlig;e 123</p>
              <p>10115 Berlin</p>
              <p>Deutschland</p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-foreground">Kontaktdaten:</h2>
              <p>E-Mail: info@stickwerk-studio.de</p>
              <p>Telefon: +49 (0) 123 456789</p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-foreground">Vertreten durch:</h2>
              <p>Max Mustermann (Inhaber)</p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-foreground">
                Umsatzsteuer-ID:
              </h2>
              <p>
                Umsatzsteuer-Identifikationsnummer gem&auml;&szlig; &sect; 27 a
                Umsatzsteuergesetz: DE123456789
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-foreground">
                Berufsbezeichnung:
              </h2>
              <p>
                Stickerei-Meister (verliehen in Deutschland)
              </p>
              <p className="text-sm text-foreground/60">
                <em>
                  Zum F&uuml;hren der Berufsbezeichnung berechtigt durch den
                  erfolgreichen Abschluss der Meisterpr&uuml;fung.
                </em>
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-foreground">Haftungshinweis:</h2>
              <p className="text-sm text-foreground/60">
                Trotz sorgf&auml;ltiger inhaltlicher Kontrolle &uuml;bernehmen wir keine
                Haftung f&uuml;r die Inhalte externer Links. F&uuml;r den Inhalt der
                verlinkten Seiten sind ausschlie&szlig;lich deren Betreiber
                verantwortlich.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
