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
            Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz)
          </p>
        </div>

        <div className="flex justify-start">
          <Link
            href="/"
            className="text-foreground hover:text-accent transition-colors flex items-center gap-2"
          >
            &larr; Zurück zur Startseite
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
                Anbieterkennzeichnung nach § 5 DDG
              </h2>
              <p className="font-semibold">Stickwerk-Studio</p>
              {/* TODO: Vollständige ladungsfähige Anschrift ergänzen */}
              <p>Adresse wird ergänzt</p>
              <p>Deutschland</p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-foreground">Vertreten durch:</h2>
              {/* TODO: Inhaber/Geschäftsführer mit vollständigem Namen ergänzen */}
              <p>Inhaber: [TODO: Vor- und Nachname des Inhabers ergänzen]</p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-foreground">Kontaktdaten:</h2>
              <p>E-Mail: info@stickwerk-studio.de</p>
              {/* TODO: Telefonnummer ergänzen (für schnelle elektronische Kontaktaufnahme erforderlich) */}
              <p>Telefon: [TODO: Telefonnummer ergänzen]</p>
            </div>

            {/* TODO: Wenn vorhanden, Handelsregistereintrag ergänzen */}
            {/* <div className="space-y-2">
              <h2 className="text-xl font-bold text-foreground">Handelsregister:</h2>
              <p>Registergericht: [TODO]</p>
              <p>Registernummer: [TODO]</p>
            </div> */}

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-foreground">
                Umsatzsteuer-ID:
              </h2>
              <p>
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a
                Umsatzsteuergesetz:
              </p>
              {/* TODO: Umsatzsteuer-ID ergänzen, falls vorhanden */}
              <p>[TODO: Umsatzsteuer-ID ergänzen]</p>
            </div>

            {/* TODO: Falls redaktionelle Inhalte vorhanden sind, Verantwortlichen nach § 18 Abs. 2 MStV ergänzen */}
            {/* <div className="space-y-2">
              <h2 className="text-xl font-bold text-foreground">
                Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV:
              </h2>
              <p>[TODO: Name, Anschrift]</p>
            </div> */}

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-foreground">
                Berufsbezeichnung und berufsrechtliche Regelungen:
              </h2>
              {/* TODO: Genaue Berufsbezeichnung ergänzen, falls zutreffend (z. B. Handwerkskammer) */}
              <p>[TODO: Berufsbezeichnung ergänzen, falls zutreffend]</p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-foreground">
                Streitschlichtung:
              </h2>
              <p>
                Die Europäische Kommission stellt eine Plattform zur
                Online-Streitbeilegung (OS) bereit, die Sie unter
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline ml-1"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
                finden.
              </p>
              <p>
                Wir sind nicht bereit und nicht verpflichtet, an
                Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-foreground">Haftungshinweise:</h2>
              <h3 className="text-lg font-semibold text-foreground">Haftung für Inhalte</h3>
              <p className="text-sm text-foreground/60">
                Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene
                Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
                verantwortlich. Nach §§ 8 bis 10 DDG sind wir als
                Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
                gespeicherte fremde Informationen zu überwachen oder nach
                Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
                hinweisen.
              </p>
              <h3 className="text-lg font-semibold text-foreground mt-4">Haftung für Links</h3>
              <p className="text-sm text-foreground/60">
                Unser Angebot enthält Links zu externen Websites Dritter, auf
                deren Inhalte wir keinen Einfluss haben. Deshalb können wir für
                diese fremden Inhalte auch keine Gewähr übernehmen. Für die
                Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
                oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten
                wurden zum Zeitpunkt der Verlinkung auf mögliche
                Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum
                Zeitpunkt der Verlinkung nicht erkennbar.
              </p>
              <h3 className="text-lg font-semibold text-foreground mt-4">Urheberrecht</h3>
              <p className="text-sm text-foreground/60">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
                diesen Seiten unterliegen dem deutschen Urheberrecht. Die
                Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
                Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen
                der schriftlichen Zustimmung des jeweiligen Autors bzw.
                Erstellers.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
