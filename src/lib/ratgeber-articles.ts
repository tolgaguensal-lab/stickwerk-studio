export interface Article {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: string;
  content: string[];
}

export const articles: Article[] = [
  {
    slug: "pflege-von-stickpatches",
    title: "So pflegen Sie Ihre Stickpatches richtig",
    description:
      "Die richtige Pflege verlängert die Lebensdauer Ihrer Patches erheblich. Wir erklären, worauf es ankommt.",
    excerpt:
      "Damit Ihre Stickpatches lange schön bleiben, ist die richtige Pflege entscheidend. Wir zeigen Ihnen, wie Sie Bügel- und Klettpatches waschen, bügeln und lagern.",
    category: "Pflege",
    date: "2026-05-15",
    readingTime: "4 Min.",
    content: [
      "Stickpatches sind kleine Kunstwerke aus Garn und Trägermaterial. Mit der richtigen Pflege behalten sie über Jahre ihre Farbintensität und Form. Besonders bei Patches auf Arbeitskleidung oder häufig getragenen Textilien lohnt sich die Aufmerksamkeit.",
      "Bügelpatches sollten vor dem Waschen möglichst fest aufgebügelt sein. Wir empfehlen, das Kleidungsstück auf links zu drehen und bei maximal 40°C zu waschen. Der Schongang ist ideal, da er die mechanische Belastung reduziert. Trockner sind tabu – die Hitze kann den Kleber angreifen und den Patch lösen.",
      "Klettpatches sind pflegeleichter: Sie werden vor dem Waschen einfach abgenommen. Das Klettband auf der Kleidung hält viele Waschgänge aus, wenn Sie es vorher verschließen (also das Gegenstück aufsetzen). So sammeln sich keine Flusen in den Häkchen.",
      "Zum Bügeln: Legen Sie ein dünnes Tuch über den Patch und bügeln Sie auf mittlerer Stufe ohne Dampf. Direkte Hitze kann das Garn zum Glänzen bringen oder Kunstfasern beschädigen.",
      "Lagern Sie Patches flach und trocken. Feuchtigkeit kann den Trägerstoff verformen und bei Bügelpatches die Klebekraft schwächen. Ein Tipp: Zwischen zwei Lagen Pergamentpapier aufbewahren – so bleiben auch empfindliche Stickdetails geschützt.",
    ],
  },
  {
    slug: "digitalisierung-was-ist-das",
    title: "Digitalisierung: Vom Logo zum Stickbild",
    description:
      "Was bedeutet Digitalisierung eigentlich? Und warum ist sie der wichtigste Schritt vor der Produktion?",
    excerpt:
      "Bevor Ihre Maschine auch nur einen Stich setzt, muss Ihr Design digitalisiert werden. Wir erklären den Prozess und warum dieser Schritt über Qualität und Haltbarkeit entscheidet.",
    category: "Wissen",
    date: "2026-05-10",
    readingTime: "5 Min.",
    content: [
      "Digitalisierung klingt technisch – und das ist sie auch. Gemeint ist die Umwandlung eines Bildes (Logo, Schriftzug, Illustration) in eine Maschinensprache, die die Stickmaschine versteht. Eine Stickdatei ist kein simpler Export aus Photoshop oder Illustrator.",
      "Jeder Stich wird einzeln geplant: Stichrichtung, Stichdichte, Unterlage, Sprünge zwischen Farbflächen. Ein guter Digitalisierer denkt in Garnen, nicht in Pixeln. Er weiß, wie sich verschiedene Stoffe verhalten, wo ein Zugfaden nötig ist und wo man mit weniger Stichen mehr Wirkung erzielt.",
      "Die größte Herausforderung: feine Details. Was am Bildschirm elegant aussieht, kann in der Stickerei verschwimmen. Schriften unter 6 mm werden schnell unleserlich. Enge Radien und feine Linien brauchen Erfahrung und Fingerspitzengefühl.",
      "Bei Stickwerk-Studio prüfen wir jedes Design vor der Digitalisierung auf Stickbarkeit. Zu dichte Bereiche werden entschärft, zu filigrane Elemente vergrößert – immer in Absprache mit Ihnen. Das Ergebnis: ein Patch, der nicht nur gut aussieht, sondern auch hält.",
      "Eine professionelle Digitalisierung kostet einmalig 15–30 € je nach Komplexität. Dieser Betrag entfällt bei Bestellungen ab 50 Stück. Ein lohnender Schritt für ein sauberes, langlebiges Ergebnis.",
    ],
  },
  {
    slug: "buegelpatch-vs-klett",
    title: "Bügelpatch oder Klett? Der große Vergleich",
    description:
      "Die Wahl der Befestigung beeinflusst Haltbarkeit und Einsatzbereich. Wir helfen Ihnen bei der Entscheidung.",
    excerpt:
      "Bügelpatch oder Klettverschluss? Beide haben ihre Stärken. Wir vergleichen Haltbarkeit, Flexibilität, Kosten und Einsatzmöglichkeiten – damit Sie die richtige Wahl treffen.",
    category: "Ratgeber",
    date: "2026-04-28",
    readingTime: "4 Min.",
    content: [
      "Die Frage nach der Befestigungsart ist eine der häufigsten, die uns erreicht. Die Antwort hängt stark vom Einsatzzweck ab. Beide Varianten haben ihre Berechtigung – wir stellen sie Ihnen gegenüber.",
      "Bügelpatches werden mit einem hitzeaktivierbaren Kleber auf dem Textil fixiert. Der große Vorteil: Sie sitzen bombenfest. Ein einmal richtig aufgebügelter Patch löst sich nicht von allein. Ideal für Kleidungsstücke, die regelmäßig getragen und gewaschen werden. Der Nachteil: Die Befestigung ist dauerhaft. Einmal aufgebügelt, lässt sich der Patch nur schwer wieder lösen.",
      "Klettpatches bestehen aus zwei Teilen: dem Patch mit Klett-Haken und dem Gegenstück (Flauschseite), das auf das Textil aufgebracht wird. Der Vorteil: maximale Flexibilität. Sie können Patches tauschen, abnehmen zum Waschen oder verschiedene Patches auf derselben Fläche nutzen. Ideal für Jacken, Caps und Taschen.",
      "In der Haltbarkeit liegen beide Varianten gleichauf. Wichtig ist die Qualität des Klettmaterials: Günstige Kletts verlieren nach 20–30 Öffnungen an Haftkraft. Wir verwenden Industriequalität, die hunderte Zyklen übersteht.",
      "Unser Tipp: Für dauerhafte Anwendungen (Vereinsjacken, Arbeitskleidung) empfehlen wir Bügelpatches. Für flexible Nutzung (Merch, Caps, Sammler) sind Klettpatches die bessere Wahl. Beides können wir in jeder Form und Größe fertigen.",
    ],
  },
  {
    slug: "mindestmengen-und-staffelpreise",
    title: "Mindestmengen & Staffelpreise: Was Sie wissen müssen",
    description:
      "Ab welcher Menge lohnt sich die Produktion? Und wie stark fallen die Preise bei größeren Auflagen?",
    excerpt:
      "Patch-Produktion wird mit der Menge günstiger. Wir erklären unsere Mindestmengen, Staffelpreise und ab wann sich die Digitalisierung lohnt.",
    category: "Preise",
    date: "2026-04-20",
    readingTime: "3 Min.",
    content: [
      "Patches sind ein Handwerksprodukt. Jeder Patch durchläuft mehrere Schritte: Digitalisierung, Einrichten der Maschine, Probestichen, Produktion und Qualitätskontrolle. Die Rüstkosten sind unabhängig von der Stückzahl – deshalb wird der Stückpreis mit steigender Menge günstiger.",
      "Unsere Mindestbestellmenge liegt bei 10 Stück. Das ist die Untergrenze, ab der sich der Produktionsaufwand wirtschaftlich darstellen lässt. Für Einzelstücke oder Kleinstmengen empfehlen wir unsere Muster-Option: 15 € pro Muster-Patch, anrechenbar auf die erste Bestellung.",
      "Die Staffelpreise sehen so aus: 10–19 Stück zum Basispreis, 20–49 Stück mit etwa 15 % Rabatt, 50–99 Stück mit circa 25 % Rabatt, ab 100 Stück mit bis zu 35 % Rabatt. Die genauen Preise hängen von Größe, Farbanzahl und Komplexität des Designs ab.",
      "Die Digitalisierungsgebühr (15–30 € einmalig) entfällt ab 50 Stück. Das ist oft der Punkt, an dem sich die erste professionelle Digitalisierung besonders lohnt.",
      "Planen Sie eine größere Auflage? Wir beraten Sie gern zu den optimalen Stückzahlen und helfen Ihnen, das beste Preis-Leistungs-Verhältnis zu finden. Sprechen Sie uns einfach an.",
    ],
  },
];

export const articleCategories = [
  { slug: "pflege", label: "Pflege" },
  { slug: "wissen", label: "Wissen" },
  { slug: "ratgeber", label: "Ratgeber" },
  { slug: "preise", label: "Preise" },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
