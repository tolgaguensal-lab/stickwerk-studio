import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/lib/ratgeber-articles";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Ratgeber | Stickwerk-Studio",
  description:
    "Wissenswertes rund um Stickpatches: Pflege, Digitalisierung, Bügelpatch vs. Klett und Staffelpreise.",
  openGraph: {
    title: "Ratgeber | Stickwerk-Studio",
    description:
      "Wissenswertes rund um Stickpatches: Pflege, Digitalisierung, Bügelpatch vs. Klett und Staffelpreise.",
  },
};

export default function RatgeberPage() {
  return (
    <main className="relative z-10">
      {/* Hero */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 px-6 bg-gradient-to-b from-background via-background to-surface-muted">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground tracking-tight">
              Ratgeber
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Alles, was Sie über Stickpatches wissen müssen – von der Pflege über die
              Digitalisierung bis zu Preisen und Materialien.
            </p>
            <div className="section-divider" />
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="py-12 md:py-16 px-6 bg-surface-muted">
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6 md:gap-8">
            {articles.map((article, i) => (
              <Link
                key={article.slug}
                href={`/ratgeber/${article.slug}`}
                className="card bg-card rounded-2xl border border-border p-6 md:p-8 group hover:border-accent/30 transition-all hover:shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-accent font-medium">{article.category}</span>
                      <span className="text-muted-foreground/50">·</span>
                      <span className="text-muted-foreground">{article.date}</span>
                      <span className="text-muted-foreground/50">·</span>
                      <span className="text-muted-foreground">{article.readingTime}</span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-serif text-foreground group-hover:text-accent transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-accent shrink-0 mt-2 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 px-6 bg-background">
        <div className="max-w-3xl mx-auto text-center">
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-serif text-foreground">
              Haben Sie weitere Fragen?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Unser Ratgeber wird stetig erweitert. Falls Sie ein bestimmtes Thema vermissen,
              sprechen Sie uns einfach an – wir beantworten Ihre Frage gern persönlich.
            </p>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground rounded-full hover:bg-accent/90 transition-all font-medium shadow-sm shadow-accent/20"
            >
              Kontakt aufnehmen
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
