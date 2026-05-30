import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function AGB() {
  return (
    <div className="min-h-screen bg-canvas-white py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-midnight-ink mb-4">
            Allgemeine Gesch&auml;ftsbedingungen (AGB)
          </h1>
          <p className="text-midnight-ink/70">
            Stand: Mai 2026
          </p>
        </div>

        <div className="flex justify-start">
          <Link href="/" className="text-midnight-ink hover:text-signal-green transition-colors flex items-center gap-2">
            &larr; Zur&uuml;ck zur Startseite
          </Link>
        </div>

        <Card className="bg-canvas-white backdrop-blur-sm border-deep-charcoal/10">
          <CardHeader>
            <CardTitle className="text-2xl text-midnight-ink">
              Allgemeine Gesch&auml;ftsbedingungen
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 text-midnight-ink/80">
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-midnight-ink">
                &sect; 1 Gegenstand und Geltungsbereich
              </h2>
              <p>
                (1) Stickwerk-Studio bietet &uuml;ber diese Website die
                M&ouml;glichkeit, individuelle Patches und Stickereien zu
                konfigurieren und anzufragen.
              </p>
              <p>
                (2) Diese Allgemeinen Gesch&auml;ftsbedingungen (AGB) gelten
                f&uuml;r alle Gesch&auml;ftsbeziehungen zwischen uns und unseren
                Kunden.
              </p>
              <p>
                (3) Abweichende Bedingungen des Kunden erkennen wir nicht an,
                es sei denn, wir stimmen ihrer Geltung ausdr&uuml;cklich zu.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-midnight-ink">
                &sect; 2 Angebot und Vertragsschluss
              </h2>
              <p>
                (1) Die Darstellung der Produkte auf unserer Website stellt kein
                verbindliches Angebot dar, sondern eine unverbindliche
                Aufforderung an den Kunden, ein Angebot abzugeben.
              </p>
              <p>
                (2) Der Kunde gibt ein verbindliches Angebot durch das
                Ausf&uuml;llen und Absenden des Patch-Konfigurators ab.
              </p>
              <p>
                (3) Wir best&auml;tigen den Eingang Ihrer Anfrage unverz&uuml;glich
                per E-Mail. Diese Best&auml;tigung stellt noch keine
                Annahme Ihres Angebots dar, sondern dient nur zur Information
                &uuml;ber den Eingang.
              </p>
              <p>
                (4) Der Vertrag kommt erst durch unsere schriftliche
                Auftragsbest&auml;tigung per E-Mail zustande.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-midnight-ink">
                &sect; 3 Preise und Zahlungsbedingungen
              </h2>
              <p>
                (1) Die auf unserer Website angezeigten Preise sind unverbindliche
                Richtpreise. Der endg&uuml;ltige Preis wird in unserem Angebot
                genannt und kann je nach Komplexit&auml;t des Designs und
                Materialaufwand abweichen.
              </p>
              <p>
                (2) Alle Preise verstehen sich inklusive gesetzlicher
                Mehrwertsteuer.
              </p>
              <p>
                (3) Die Zahlung erfolgt nach Rechnungserhalt innerhalb von 14
                Tagen. Bei Erstbestellungen kann Vorkasse vereinbart werden.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-midnight-ink">
                &sect; 4 Lieferung
              </h2>
              <p>
                (1) Die Lieferzeit betr&auml;gt in der Regel 7-10 Werktage nach
                Freigabe des Stickmotivs. Bei Express-Auftr&auml;gen kann die
                Lieferzeit verk&uuml;rzt werden.
              </p>
              <p>
                (2) Der Versand erfolgt mit DHL oder einem anderen
                Paketdienstleister. Die Versandkosten werden separat in Rechnung
                gestellt.
              </p>
              <p>
                (3) Bei Mengenrabatten kann die Lieferzeit verl&auml;ngert sein.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-midnight-ink">
                &sect; 5 Eigenbeschaftung des Kunden
              </h2>
              <p>
                (1) Der Kunde stellt sicher, dass die von ihm &uuml;bermittelten
                Designs und Logos keine Rechte Dritter verletzen.
              </p>
              <p>
                (2) Der Kunde freistellt uns von allen Anspr&uuml;chen Dritter frei,
                die aufgrund der Verletzung von Rechten durch die von ihm
                &uuml;bermittelten Daten geltend gemacht werden.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-midnight-ink">
                &sect; 6 R&uuml;cktritt und Stornierung
              </h2>
              <p>
                (1) Der Kunde kann seine Anfrage jederzeit vor Annahme durch uns
                kostenlos stornieren.
              </p>
              <p>
                (2) Nach Annahme des Angebots durch uns kann der Kunde nur noch
                gegen Berechnung einer Stornogeb&uuml;hr von 30% des
                Auftragswerts vom Vertrag zur&uuml;cktreten.
              </p>
              <p>
                (3) Bei bereits begonnener Produktion ist ein R&uuml;cktritt nicht
                mehr m&ouml;glich.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-midnight-ink">
                &sect; 7 Gew&auml;hrleistung
              </h2>
              <p>
                (1) Die Gew&auml;hrleistung betr&auml;gt 24 Monate ab Lieferung der
                Ware.
              </p>
              <p>
                (2) Die Gew&auml;hrleistung umfasst M&auml;ngel, die bereits bei
                &Uuml;bergabe der Ware vorhanden waren.
              </p>
              <p>
                (3) Bei berechtigter M&auml;ngelr&uuml;ge k&ouml;nnen wir
                Nachbesserung oder Ersatzlieferung w&auml;hlen.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-midnight-ink">
                &sect; 8 Anwendbares Recht und Gerichtsstand
              </h2>
              <p>
                (1) Es gilt ausschlie&szlig;lich deutsches Recht.
              </p>
              <p>
                (2) Gerichtsstand f&uuml;r alle Streitigkeiten aus dem
                Vertragsverh&auml;ltnis ist unser Firmensitz, sofern der Kunde
                Vollkaufmann, juristische Person des &ouml;ffentlichen Rechts oder
                &ouml;ffentlich-rechtliches Sonderverm&ouml;gen ist.
              </p>
              <p>
                (3) Verdebrauchern steht das Recht zu, sich an die f&uuml;r
                ihren Wohnsitz zust&auml;ndige Verbraucherschlichtungsstelle zu
                wenden.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
