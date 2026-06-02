import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Datenschutz() {
  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-4">
            Datenschutzerklärung
          </h1>
          <p className="text-foreground/70">
            Informationen über die Erhebung personenbezogener Daten
          </p>
        </div>

        <div className="flex justify-start">
          <Link href="/" className="text-foreground hover:text-accent transition-colors flex items-center gap-2">
            &larr; Zurück zur Startseite
          </Link>
        </div>

        <Card className="bg-background backdrop-blur-sm border-border/30">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">
              Datenschutzerklärung
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 text-foreground/80">
            {/* 1. Verantwortlicher */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">
                1. Verantwortlicher
              </h2>
              <div className="space-y-2">
                <p className="font-semibold">Stickwerk-Studio</p>
                <p>Adresse wird ergänzt</p>
                <p>Deutschland</p>
                <p>E-Mail: datenschutz@stickwerk-studio.de</p>
                <p>Telefon: [TODO: Telefonnummer ergänzen]</p>
              </div>
              {/* TODO: Datenschutzbeauftragten ergänzen, falls gesetzlich erforderlich (nach Art. 37 DSGVO) */}
              <p className="text-sm text-foreground/60">
                [TODO: Datenschutzbeauftragter – Sofern gesetzlich erforderlich,
                wird ein Datenschutzbeauftragter bestellt. Aktuell sind wir
                der Auffassung, dass nach Art. 37 DSGVO keine Pflicht zur
                Bestellung besteht. Bitte rechtlich prüfen.]
              </p>
            </section>

            {/* 2. Begriffe und Rechtsgrundlagen */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">
                2. Begriffe und Rechtsgrundlagen
              </h2>
              <p>
                Diese Datenschutzerklärung orientiert sich an den Begrifflichkeiten
                der Datenschutz-Grundverordnung (DSGVO). Wir verarbeiten
                personenbezogene Daten auf Grundlage folgender Rechtsgrundlagen:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>
                  <strong>Art. 6 Abs. 1 lit. a DSGVO:</strong> Einwilligung der
                  betroffenen Person
                </li>
                <li>
                  <strong>Art. 6 Abs. 1 lit. b DSGVO:</strong> Erfüllung eines
                  Vertrags oder vorvertraglicher Maßnahmen
                </li>
                <li>
                  <strong>Art. 6 Abs. 1 lit. c DSGVO:</strong> Erfüllung einer
                  rechtlichen Verpflichtung
                </li>
                <li>
                  <strong>Art. 6 Abs. 1 lit. f DSGVO:</strong> Berechtigte
                  Interessen (z. B. Sicherheit, Betrieb der Website)
                </li>
              </ul>
            </section>

            {/* 3. Hosting */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">
                3. Hosting
              </h2>
              <p>
                Unsere Website wird auf eigenen Servern in Deutschland
                (ZimaOS / Pangolin) betrieben. Der Serverstandort ist:
              </p>
              {/* TODO: Genaue Angabe zum Serverstandort prüfen und ergänzen */}
              <p>[TODO: Serverstandort / Rechenzentrum präzisieren]</p>
              <p>
                Der Server wird im eigenen Haushalt / auf Privatgelände
                betrieben. Alternativ könnte ein externer Hoster beauftragt
                werden. Sollte ein externer Hoster zum Einsatz kommen, wird
                ein Auftragsverarbeitungsvertrag (AVV) gemäß Art. 28 DSGVO
                geschlossen.
              </p>
              <p>
                <strong>Hosting-Leistungen umfassen:</strong> Bereitstellung der
                Website, Auslieferung von Inhalten, Speicherung von Datenbanken
                (PostgreSQL), Sicherheit und Wartung.
              </p>
            </section>

            {/* 4. Server-Logfiles */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">
                4. Server-Logfiles
              </h2>
              <p>
                Bei jedem Zugriff auf unsere Website erfasst unser System
                automatisch Daten und Informationen, die Ihr Browser an uns
                übermittelt. Folgende Daten werden temporär in Logfiles
                gespeichert:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>IP-Adresse des anfragenden Rechners</li>
                <li>Datum und Uhrzeit des Zugriffs</li>
                <li>Name und URL der abgerufenen Datei</li>
                <li>Website, von der aus der Zugriff erfolgt (Referrer-URL)</li>
                <li>Verwendeter Browser und Betriebssystem</li>
              </ul>
              <p>
                Die Verarbeitung erfolgt gemäß Art. 6 Abs. 1 lit. f DSGVO auf
                Basis unseres berechtigten Interesses an der technisch
                einwandfreien Bereitstellung und Sicherheit unserer Website.
                Die Logfiles werden nach spätestens 7 Tagen gelöscht, sofern
                keine Aufbewahrung zu Sicherheitszwecken (z. B. bei Angriffen)
                erforderlich ist.
              </p>
            </section>

            {/* 5. Kontaktformular */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">
                5. Kontaktformular
              </h2>
              <p>
                Auf unserer Website bieten wir ein Kontaktformular an, über das
                Sie uns kontaktieren können. Bei der Nutzung des
                Kontaktformulars werden folgende Daten von uns erhoben:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Name (Pflichtangabe)</li>
                <li>E-Mail-Adresse (Pflichtangabe)</li>
                <li>Telefonnummer (freiwillig)</li>
                <li>Betreff (freiwillig)</li>
                <li>Nachricht (Pflichtangabe)</li>
              </ul>
              <p>
                Die Verarbeitung erfolgt gemäß Art. 6 Abs. 1 lit. b DSGVO zur
                Bearbeitung Ihrer Anfrage. Die Daten werden in unserer
                Datenbank (PostgreSQL) gespeichert und nach Erledigung der
                Anfrage gelöscht, sofern keine gesetzlichen
                Aufbewahrungspflichten bestehen.
              </p>
              <p>
                Rechtsgrundlage für die Verarbeitung Ihrer Daten im Rahmen des
                Kontaktformulars ist Ihre Einwilligung (Art. 6 Abs. 1 lit. a
                DSGVO) sowie die Durchführung vorvertraglicher Maßnahmen
                (Art. 6 Abs. 1 lit. b DSGVO).
              </p>
            </section>

            {/* 6. Patch-Konfigurator / Lead-Formular */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">
                6. Patch-Konfigurator (Angebotsanfrage)
              </h2>
              <p>
                Wenn Sie unseren Patch-Konfigurator nutzen und eine
                Angebotsanfrage senden, werden folgende Daten von uns
                verarbeitet:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Name (Pflichtangabe)</li>
                <li>E-Mail-Adresse (Pflichtangabe)</li>
                <li>Telefonnummer (freiwillig)</li>
                <li>Nachricht / Wünsche (freiwillig)</li>
                <li>
                  Konfigurationsdaten: Form, Größe, Komplexität, Farben,
                  Material, Randart, Rückseite, Menge, Express-Option
                </li>
                <li>Design-Datei (freiwillig, falls hochgeladen)</li>
              </ul>
              <p>
                Die Verarbeitung erfolgt gemäß Art. 6 Abs. 1 lit. b DSGVO zur
                Abwicklung Ihrer Angebotsanfrage und zur Bereitstellung unserer
                Leistungen. Die von Ihnen bereitgestellten Daten werden
                ausschließlich zur Bearbeitung Ihrer Anfrage verwendet.
              </p>
              <p className="text-sm text-foreground/60">
                Hinweis: Hochgeladene Design-Dateien werden nur temporär zur
                Prüfung gespeichert und nach Angebotserstellung gelöscht, sofern
                kein Auftrag zustande kommt.
              </p>
            </section>

            {/* 7. E-Mail-Kontakt */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">
                7. Kontaktaufnahme per E-Mail
              </h2>
              <p>
                Wenn Sie uns per E-Mail kontaktieren, verarbeiten wir die von
                Ihnen übermittelten Daten (E-Mail-Adresse, Name,
                Nachrichteninhalt) ausschließlich zur Bearbeitung Ihrer Anfrage.
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO.
              </p>
            </section>

            {/* 8. Google Fonts */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">
                8. Google Fonts (lokale Einbindung)
              </h2>
              <p>
                Auf dieser Website werden die Schriftarten Inter, Playfair
                Display und JetBrains Mono von Google Fonts verwendet. Die
                Einbindung erfolgt über die Next.js Font-Optimierung (next/font),
                wodurch die Schriftarten beim Seitenaufruf von Googles Servern
                geladen werden.
              </p>
              <p>
                Beim Aufruf der Website wird eine Verbindung zu Googles Servern
                hergestellt, um die Schriftarten zu laden. Dabei wird Ihre
                IP-Adresse an Google übermittelt. Dies dient der einheitlichen
                und ansprechenden Darstellung unserer Website.
              </p>
              <p>
                <strong>Dienstanbieter:</strong> Google LLC (bzw. Google Ireland
                Limited für Nutzer im EWR)
              </p>
              <p>
                <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO
                (berechtigtes Interesse an einer konsistenten Darstellung)
              </p>
              <p>
                <strong>Drittlandtransfer:</strong> Google kann Daten in die USA
                übermitteln. Die Übermittlung erfolgt auf Basis des
                Angemessenheitsbeschlusses der EU (EU-US Data Privacy
                Framework).
              </p>
              {/* TODO: Datenschutzerklärung von Google verlinken, sobald final */}
              <p className="text-sm">
                Weitere Informationen finden Sie in der
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline ml-1"
                >
                  Datenschutzerklärung von Google
                </a>.
              </p>
            </section>

            {/* 9. Three.js / 3D-Szene */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">
                9. 3D-Darstellung (Three.js)
              </h2>
              <p>
                Diese Website verwendet Three.js für die Darstellung von
                3D-Animationen. Die 3D-Darstellung erfolgt vollständig
                clientseitig im Browser. Es werden keine personenbezogenen
                Daten an Dritte übermittelt. Es werden keine Cookies gesetzt
                und keine Tracking-Funktionen von Three.js genutzt.
              </p>
            </section>

            {/* 10. Cookies */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">
                10. Cookies und LocalStorage
              </h2>
              <p>
                Diese Website verwendet Cookies und lokale Speichertechnologien
                (LocalStorage), um die Funktionalität der Website zu
                gewährleisten und auf Basis Ihrer Einwilligung Analysen
                durchzuführen.
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-6">
                10.1 Technisch notwendige Cookies
              </h3>
              <p>
                Folgende Cookies sind für den Betrieb der Website technisch
                erforderlich und werden ohne Ihre Einwilligung gesetzt (Art. 6
                Abs. 1 lit. f DSGVO, § 25 Abs. 2 Nr. 2 TTDSG):
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border/30">
                      <th className="text-left py-2 pr-4 font-semibold">Name</th>
                      <th className="text-left py-2 pr-4 font-semibold">Zweck</th>
                      <th className="text-left py-2 pr-4 font-semibold">Speicherdauer</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/20">
                      <td className="py-2 pr-4 font-mono text-xs">sws_admin_session</td>
                      <td className="py-2 pr-4">Session-Cookie für den Admin-Login (httpOnly, auf /admin beschränkt)</td>
                      <td className="py-2 pr-4">24 Stunden</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-lg font-semibold text-foreground mt-6">
                10.2 Einwilligungspflichtige Cookies
              </h3>
              <p>
                Für die folgenden Kategorien holen wir Ihre aktive Einwilligung
                über unser Cookie-Consent-Banner ein (Art. 6 Abs. 1 lit. a DSGVO,
                § 25 Abs. 1 TTDSG):
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>
                  <strong>Analytics:</strong> Wir nutzen Plausible Analytics,
                  ein datenschutzfreundliches, cookieloses Analysetool, um zu
                  verstehen, wie unsere Website genutzt wird. Es werden keine
                  personenbezogenen Daten gespeichert und keine Cookies gesetzt.
                  Die Einwilligung ist dennoch erforderlich, da eine
                  Verbindung zu externen Servern hergestellt wird.
                </li>
                <li>
                  <strong>Marketing & Tracking:</strong> Ermöglicht die
                  Einbindung von Drittanbieter-Diensten wie Google Ads oder
                  Meta Pixel für Conversion-Tracking und personalisierte
                  Werbung. Aktuell sind keine Marketing-Dienste aktiv.
                </li>
              </ul>
              <p>
                Ihre einmal erteilte Einwilligung können Sie jederzeit mit
                Wirkung für die Zukunft widerrufen, indem Sie die
                Cookie-Einstellungen über den Link im Footer anpassen.
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-6">
                10.3 LocalStorage
              </h3>
              <p>
                Zusätzlich speichern wir folgende Daten im LocalStorage Ihres
                Browsers:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>
                  <strong>sws_consent:</strong> Speichert Ihre Cookie-Einwilligung
                  (Kategorien, Zeitpunkt). Wird nicht an Dritte übermittelt.
                </li>
                <li>
                  <strong>Konfigurationsdaten des Patch-Konfigurators:</strong>
                  Zwischenspeicherung Ihrer Auswahl im Konfigurator, damit diese
                  bei einem Seitenwechsel nicht verloren gehen.
                </li>
              </ul>
            </section>

            {/* 11. Auftragsverarbeitung */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">
                11. Auftragsverarbeitung
              </h2>
              <p>
                Zur Bereitstellung unserer Dienste setzen wir folgende
                Dienstleister ein, die im Rahmen einer
        Auftragsverarbeitung gemäß Art. 28 DSGVO personenbezogene
        Daten verarbeiten können:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>
                  <strong>PostgreSQL (ZimaOS App Store):</strong> Datenbank zur
                  Speicherung von Kontaktanfragen und Leads.
                  Selbst gehostet auf eigener Infrastruktur.
                </li>
                <li>
                  <strong>Next.js / Node.js:</strong> Webserver und
                  Anwendungslogik, betrieben auf eigener Infrastruktur.
                </li>
              </ul>
              <p>
                Sofern wir in Zukunft Cloud-Dienstleister (z. B. Vercel,
                Supabase) einsetzen, werden wir vorher einen
                Auftragsverarbeitungsvertrag mit dem jeweiligen Anbieter
                schließen.
              </p>
            </section>

            {/* 12. Drittlandtransfers */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">
                12. Drittlandtransfers
              </h2>
              <p>
                Eine Übermittlung Ihrer Daten in Länder außerhalb der EU/des
                EWR findet nur statt, soweit dies gesetzlich vorgesehen ist
                oder Sie eingewilligt haben. Aktuell erfolgt die Datenverarbeitung
                ausschließlich in Deutschland / der EU.
              </p>
              <p>
                Ausnahme: Beim Laden der Google Fonts kann eine Verbindung zu
                Servern von Google in den USA aufgebaut werden (s. Punkt 8).
                Google ist nach dem EU-US Data Privacy Framework zertifiziert.
              </p>
            </section>

            {/* 13. Speicherdauer */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">
                13. Speicherdauer
              </h2>
              <p>
                Wir speichern Ihre personenbezogenen Daten nur so lange, wie
                dies für die Erfüllung des jeweiligen Zwecks erforderlich ist
                oder gesetzliche Aufbewahrungsfristen dies vorschreiben:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>
                  <strong>Kontaktanfragen und Leads:</strong> 3 Jahre nach
                  letzter Kontaktaufnahme, danach Löschung
                </li>
                <li>
                  <strong>Server-Logfiles:</strong> 7 Tage
                </li>
                <li>
                  <strong>Cookie-Einwilligungsnachweise (Consent):</strong> 3 Jahre
                  (Nachweispflicht nach Art. 7 Abs. 1 DSGVO)
                </li>
                <li>
                  <strong>Admin-Session-Cookies:</strong> 24 Stunden (Session-Ende)
                </li>
                <li>
                  <strong>Vertragsdaten:</strong> 6 Jahre (gesetzliche
                  Aufbewahrungsfrist nach § 257 HGB, § 147 AO)
                </li>
              </ul>
            </section>

            {/* 14. SSL/TLS-Verschlüsselung */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">
                14. SSL/TLS-Verschlüsselung
              </h2>
              <p>
                Diese Website nutzt aus Sicherheitsgründen und zum Schutz der
                Übertragung vertraulicher Inhalte eine SSL-bzw.
                TLS-Verschlüsselung. Wenn die Verschlüsselung aktiv ist, kann
                die von Ihnen an uns übermittelte Seite nicht von Dritten
                mitgelesen werden.
              </p>
              {/* TODO: SSL-Zertifikatsanbieter und Konfiguration prüfen (Pangolin stellt SSL via Let's Encrypt bereit) */}
            </section>

            {/* 15. Betroffenenrechte */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">
                15. Ihre Rechte als betroffene Person
              </h2>
              <p>Sie haben das Recht:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>
                  gemäß Art. 15 DSGVO Auskunft über Ihre von uns verarbeiteten
                  personenbezogenen Daten zu verlangen
                </li>
                <li>
                  gemäß Art. 16 DSGVO unverzüglich die Berichtigung
                  unrichtiger oder Vervollständigung Ihrer bei uns
                  gespeicherten personenbezogenen Daten zu verlangen
                </li>
                <li>
                  gemäß Art. 17 DSGVO die Löschung Ihrer bei uns gespeicherten
                  personenbezogenen Daten zu verlangen, soweit nicht die
                  Verarbeitung zur Ausübung des Rechts auf freie
                  Meinungsäußerung, zur Erfüllung einer rechtlichen
                  Verpflichtung oder zur Geltendmachung von Rechtsansprüchen
                  erforderlich ist
                </li>
                <li>
                  gemäß Art. 18 DSGVO die Einschränkung der Verarbeitung zu
                  verlangen
                </li>
                <li>
                  gemäß Art. 20 DSGVO Ihre Daten in einem strukturierten,
                  gängigen und maschinell lesbaren Format zu erhalten oder die
                  Übermittlung an einen anderen Verantwortlichen zu verlangen
                </li>
                <li>
                  gemäß Art. 7 Abs. 3 DSGVO Ihre einmal erteilte Einwilligung
                  jederzeit zu widerrufen
                </li>
                <li>
                  gemäß Art. 77 DSGVO sich bei einer Aufsichtsbehörde zu
                  beschweren. In der Regel können Sie sich hierfür an die
                  Aufsichtsbehörde Ihres üblichen Aufenthaltsortes oder
                  Arbeitsplatzes wenden
                </li>
              </ul>
            </section>

            {/* 16. Widerspruchsrecht */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">
                16. Widerspruchsrecht
              </h2>
              <p>
                Sofern wir Ihre personenbezogenen Daten auf Basis eines
                berechtigten Interesses (Art. 6 Abs. 1 lit. f DSGVO)
                verarbeiten, haben Sie das Recht, gemäß Art. 21 DSGVO
                Widerspruch gegen die Verarbeitung einzulegen. Wir werden
                die Verarbeitung dann einstellen, es sei denn, wir können
                zwingende schutzwürdige Gründe nachweisen, die Ihre
                Interessen überwiegen.
              </p>
            </section>

            {/* 17. Social Media */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">
                17. Social Media (Verlinkungen)
              </h2>
              <p>
                Auf unserer Website finden Sie Verlinkungen zu unseren
                Social-Media-Profilen (Instagram, Facebook, X/Twitter). Diese
                sind als einfache Textlinks ohne Einbindung von Social-Media-
                Plugins umgesetzt. Es werden keine Daten an die sozialen
                Netzwerke übermittelt, solange Sie den Link nicht aktiv
                anklicken.
              </p>
            </section>

            {/* 18. Datensicherheit */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">
                18. Datensicherheit
              </h2>
              <p>
                Wir treffen angemessene technische und organisatorische
                Sicherheitsmaßnahmen, um Ihre personenbezogenen Daten gegen
                unbeabsichtigte oder unrechtmäßige Löschung, Veränderung oder
                gegen Verlust und unbefugte Weitergabe oder Zugriff zu
                schützen:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>SSL/TLS-Verschlüsselung für die gesamte Website</li>
                <li>Basic-Auth-Schutz für den Admin-Bereich</li>
                <li>Rate-Limiting für API-Endpunkte</li>
                <li>Eingabevalidierung (Zod) für alle Formulardaten</li>
                <li>Keine Speicherung von Passwörtern im Frontend-Code</li>
              </ul>
            </section>

            {/* 19. Änderungen */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">
                19. Aktualität und Änderung dieser Datenschutzerklärung
              </h2>
              <p>
                Diese Datenschutzerklärung ist aktuell und hat den Stand
                Juni 2026.
              </p>
              <p>
                Durch die Weiterentwicklung unserer Website oder aufgrund
                geänderter gesetzlicher Vorgaben kann es notwendig werden,
                diese Datenschutzerklärung zu ändern. Die jeweils aktuelle
                Datenschutzerklärung kann jederzeit auf unserer Website unter
                dieser URL eingesehen und ausgedruckt werden.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
