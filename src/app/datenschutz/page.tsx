import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Datenschutz() {
  return (
    <div className="min-h-screen bg-canvas-white py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-midnight-ink mb-4">
            Datenschutzerkl&auml;rung
          </h1>
          <p className="text-midnight-ink/70">
            Informationen &uuml;ber die Erhebung personenbezogener Daten
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
              Datenschutzerkl&auml;rung
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 text-midnight-ink/80">
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-midnight-ink">
                1. Verantwortlicher und Kontaktdaten
              </h2>
              <div className="space-y-2">
                <p className="font-semibold">Stickwerk-Studio</p>
                <p>Musterstra&szlig;e 123, 10115 Berlin</p>
                <p>E-Mail: datenschutz@stickwerk-studio.de</p>
                <p>Telefon: +49 (0) 123 456789</p>
              </div>
              <p>
                Unser Datenschutzbeauftragter ist unter der o.g. E-Mail-Adresse
                erreichbar.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-midnight-ink">
                2. Erhebung und Speicherung personenbezogener Daten sowie Art und
                Zweck von deren Verwendung
              </h2>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-midnight-ink">
                  a) Beim Besuch der Website
                </h3>
                <p>
                  Beim Aufrufen unserer Website werden durch den auf Ihrem
                  Endger&auml;t zum Einsatz kommenden Browser automatisch
                  Informationen an den Server unserer Website gesendet. Diese
                  Informationen werden tempor&auml;r in einem Logfile gespeichert.
                  Folgende Informationen werden dabei ohne Ihr Zutun erfasst und
                  bis zur automatisierten L&ouml;schung gespeichert:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>IP-Adresse des anfragenden Rechners,</li>
                  <li>Datum und Uhrzeit des Zugangs,</li>
                  <li>Name und URL der abgerufenen Datei,</li>
                  <li>Website, von welcher aus der Zugriff erfolgt (Referrer-URL),</li>
                  <li>verwendeter Browser und ggf. das Betriebssystem Ihres Rechners.</li>
                </ul>
                <p>
                  Die Verarbeitung dieser Daten erfolgt gem&auml;&szlig; Art. 6 Abs.
                  1 lit. f DSGVO auf Basis unseres berechtigten Interesses an der
                  Darstellung und der technisch einwandfreien Bereitstellung unserer
                  Website.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-midnight-ink">
                  b) Bei Nutzung unseres Patch-Konfigurators
                </h3>
                <p>
                  Wenn Sie unseren Patch-Konfigurator nutzen und eine Anfrage
                  senden, werden folgende Daten von uns verarbeitet:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Name (_Pflichtangabe_)</li>
                  <li>E-Mail-Adresse (_Pflichtangabe_)</li>
                  <li>Telefonnummer (_freiwillig_)</li>
                  <li>Nachricht/W&uuml;nsche (_freiwillig_)</li>
                  <li>
                    Konfigurationsdaten (Form, Gr&ouml;&szlig;e, Komplexit&auml;t,
                    Farben, Material, Randart, R&uuml;ckseite, Menge, Express-Option)
                  </li>
                  <li>Design-Datei (_freiwillig, falls hochgeladen_)
                  </li>
                </ul>
                <p>
                  Die Verarbeitung erfolgt gem&auml;&szlig; Art. 6 Abs. 1 lit. b
                  DSGVO zur Abwicklung Ihrer Anfrage und zur Bereitstellung unserer
                  Leistungen.
                </p>
                <p>
                  Die von Ihnen bereitgestellten Daten werden von uns
                  ausschließlich zur Bearbeitung Ihrer Anfrage verwendet und nicht
                  an Dritte weitergegeben.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-midnight-ink">
                3. Weitergabe von Daten
              </h2>
              <p>
                Eine &Uuml;bermittlung Ihrer personenbezogenen Daten an Dritte zu
                anderen als den im Folgenden aufgef&uuml;hrten Zwecken findet nicht
                statt.
              </p>
              <p>
                Wir geben Ihre personenbezogenen Daten nur an Dritte weiter, wenn:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>
                  Sie Ihre nach Art. 6 Abs. 1 lit. a DSGVO ausdr&uuml;ckliche
                  Einwilligung dazu erteilt haben,
                </li>
                <li>
                  die Weitergabe nach Art. 6 Abs. 1 lit. f DSGVO zur
                  Geltendmachung, Aus&uuml;bung oder Verteidigung von
                  Rechtsanspr&uuml;chen erforderlich ist und kein Grund zur Annahme
                  besteht, dass Sie ein &uuml;berwiegendes schutzw&uuml;rdiges
                  Interesse an der Nichtweitergabe Ihrer Daten haben,
                </li>
                <li>
                  f&uuml;r den Fall, dass f&uuml;r die Weitergabe nach Art. 6 Abs. 1
                  lit. c DSGVO eine gesetzliche Verpflichtung besteht, sowie
                </li>
                <li>
                  dies gesetzlich zul&auml;ssig und nach Art. 6 Abs. 1 lit. b
                  DSGVO f&uuml;r die Abwicklung von Vertragsverh&auml;ltnissen mit
                  Ihnen erforderlich ist.
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-midnight-ink">
                4. Betroffenenrechte
              </h2>
              <p>Sie haben das Recht:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>
                  gem&auml;&szlig; Art. 15 DSGVO Auskunft &uuml;ber Ihre von uns
                  verarbeiteten personenbezogenen Daten zu verlangen. Insbesondere
                  k&ouml;nnen Sie Auskunft &uuml;ber die Verarbeitungszwecke, die
                  Kategorie der personenbezogenen Daten, die Kategorien von
                  Empf&auml;ngern, die geplante Speicherdauer sowie &uuml;ber die
                  Herkunft Ihrer Daten verlangen.
                </li>
                <li>
                  gem&auml;&szlig; Art. 16 DSGVO unverz&uuml;glich die Berichtung
                  unrichtiger oder Vervollst&auml;ndigung Ihrer bei uns
                  gespeicherten personenbezogenen Daten zu verlangen.
                </li>
                <li>
                  gem&auml;&szlig; Art. 17 DSGVO die L&ouml;schung Ihrer bei uns
                  gespeicherten personenbezogenen Daten zu verlangen, soweit die
                  Verarbeitung zur Aus&uuml;bung des Rechts auf freie
                  Meinungs&auml;u&szlig;erung und Information, zur Erf&uuml;llung einer
                  rechtlichen Verpflichtung, aus Gr&uuml;nden des &ouml;ffentlichen
                  Interesses oder zur Geltendmachung, Aus&uuml;bung oder Verteidigung
                  von Rechtsanspr&uuml;chen erforderlich ist.
                </li>
                <li>
                  gem&auml;&szlig; Art. 18 DSGVO die Einschr&auml;nkung der
                  Verarbeitung Ihrer personenbezogenen Daten zu verlangen, soweit
                  die Richtigkeit der Daten von Ihnen bestritten wird, die
                  Verarbeitung unrechtm&auml;&szlig;ig ist, Sie aber deren
                  L&ouml;schung ablehnen und wir die Daten nicht mehr ben&ouml;tigen,
                  Sie aber diese zur Geltendmachung, Aus&uuml;bung oder Verteidigung
                  von Rechtsanspr&uuml;chen ben&ouml;tigen oder Sie gem&auml;&szlig; Art.
                  21 DSGVO Widerspruch gegen die Verarbeitung eingelegt haben.
                </li>
                <li>
                  gem&auml;&szlig; Art. 20 DSGVO Ihre personenbezogenen Daten in
                  einem strukturierten, g&auml;ngigen und maschinell lesbaren Format
                  zu erhalten oder die &Uuml;bermittlung an einen anderen
                  Verantwortlichen zu verlangen.
                </li>
                <li>
                  gem&auml;&szlig; Art. 7 Abs. 3 DSGVO Ihre einmal erteilte
                  Einwilligung jederzeit gegen&uuml;ber uns zu widerrufen. Durch den
                  Widerruf wird die Rechtm&auml;&szlig;igkeit der auf Grund der
                  Einwilligung bis zum Widerruf erfolgten Verarbeitung nicht
                  ber&uuml;hrt.
                </li>
                <li>
                  gem&auml;&szlig; Art. 77 DSGVO sich bei einer Aufsichtsbeh&ouml;rde
                  zu beschweren. In der Regel k&ouml;nnen Sie sich hierzu an die
                  Aufsichtsbeh&ouml;rde Ihres gew&ouml;hnlichen Aufenthaltsortes
                  oder Arbeitsplatzes oder unseres Firmensitzes wenden.
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-midnight-ink">
                5. Speicherdauer
              </h2>
              <p>
                Sofern nicht speziell angegeben, werden Ihre personenbezogenen
                Daten nur so lange gespeichert, wie dies zur Erf&uuml;llung des
                jeweiligen Zwecks oder aufgrund gesetzlicher Vorschriften
                erforderlich ist. Nach Wegfall des Zwecks bzw. Ablauf der
                gesetzlichen Fristen werden die entsprechenden Daten routinem&auml;&szlig;ig
                und entsprechend den gesetzlichen Vorschriften gel&ouml;scht.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-midnight-ink">
                6. Aktualit&auml;t und &Auml;nderung dieser
                Datenschutzerkl&auml;rung
              </h2>
              <p>
                Diese Datenschutzerkl&auml;rung ist aktuell und steht mit Datum
                Mai 2026.
              </p>
              <p>
                Durch die Weiterentwicklung unserer Website und Angebote &ouml;der
                aufgrund ge&auml;nderter gesetzlicher bebzw. beh&ouml;rdlicher
                Vorgaben kann es notwendig werden, diese Datenschutzerkl&auml;rung zu
                &auml;ndern. Die jeweils aktuelle Datenschutzerkl&auml;rung kann
                jederzeit auf unserer Website unter dieser URL eingesehen und
                ausgedruckt werden.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
