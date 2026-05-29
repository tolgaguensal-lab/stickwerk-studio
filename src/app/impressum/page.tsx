import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Impressum() {
  return (
    <div className="min-h-screen bg-machinery-silver py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-industry-gray mb-4">
            Impressum
          </h1>
          <p className="text-industry-gray/70">
            Angaben gem&auml;&szlig; &sect; 5 TMG
          </p>
        </div>

        <div className="flex justify-start">
          <Link
            href="/"
            className="text-industry-gray hover:text-craft-gold transition-colors flex items-center gap-2"
          >
            &larr; Zur&uuml;ck zur Startseite
          </Link>
        </div>

        <Card className="bg-soft-white backdrop-blur-sm border-industry-gray/10">
          <CardHeader>
            <CardTitle className="text-2xl text-industry-gray">
              Stickwerk-Studio
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-industry-gray/80">
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-industry-gray">
                Verantwortlich f&uuml;r den Inhalt:
              </h2>
              <p className="font-semibold">Stickwerk-Studio</p>
              <p>Musterstra&szlig;e 123</p>
              <p>10115 Berlin</p>
              <p>Deutschland</p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-industry-gray">Kontaktdaten:</h2>
              <p>E-Mail: info@stickwerk-studio.de</p>
              <p>Telefon: +49 (0) 123 456789</p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-industry-gray">Vertreten durch:</h2>
              <p>Max Mustermann (Inhaber)</p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-industry-gray">
                Umsatzsteuer-ID:
              </h2>
              <p>
                Umsatzsteuer-Identifikationsnummer gem&auml;&szlig; &sect; 27 a
                Umsatzsteuergesetz: DE123456789
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-industry-gray">
                Berufsbezeichnung:
              </h2>
              <p>
                Stickerei-Meister (verliehen in Deutschland)
              </p>
              <p className="text-sm text-industry-gray/60">
                <em>
                  Zum F&uuml;hren der Berufsbezeichnung berechtigt durch den
                  erfolgreichen Abschluss der Meisterpr&uuml;fung.
                </em>
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-industry-gray">Haftungshinweis:</h2>
              <p className="text-sm text-industry-gray/60">
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
