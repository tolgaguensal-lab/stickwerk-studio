import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { articles, getArticle } from "@/lib/ratgeber-articles";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const article = getArticle(slug);
  if (!article) return {};

  return {
    title: `${article.title} | Stickwerk-Studio`,
    description: article.description,
    openGraph: {
      title: `${article.title} | Stickwerk-Studio`,
      description: article.description,
      type: "article",
      publishedTime: article.date,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const slug = (await params).slug;
  const article = getArticle(slug);

  if (!article) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    author: {
      "@type": "Organization",
      name: "Stickwerk-Studio",
    },
  };

  return (
    <main className="relative z-10">
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 px-6 bg-gradient-to-b from-background via-background to-surface-muted">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link
            href="/ratgeber"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Alle Artikel
          </Link>

          {/* Meta */}
          <div className="flex items-center gap-3 text-sm mb-4">
            <span className="text-accent font-medium">{article.category}</span>
            <span className="text-muted-foreground/50">·</span>
            <span className="text-muted-foreground">{article.date}</span>
            <span className="text-muted-foreground/50">·</span>
            <span className="text-muted-foreground">{article.readingTime}</span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground tracking-tight mb-6">
            {article.title}
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed">
            {article.description}
          </p>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 md:py-16 px-6 bg-background">
        <div className="max-w-3xl mx-auto">
          <article className="prose-custom space-y-5">
            {article.content.map((paragraph, i) => (
              <p
                key={i}
                className="text-foreground leading-[1.8] text-[1.05rem]"
              >
                {paragraph}
              </p>
            ))}
          </article>

          <div className="mt-12 pt-8 border-t border-border">
            <Link
              href="/ratgeber"
              className="inline-flex items-center gap-1.5 text-accent hover:text-accent/80 transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Zurück zum Ratgeber
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 px-6 bg-surface-muted">
        <div className="max-w-3xl mx-auto text-center">
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-serif text-foreground">
              Haben Sie Fragen zu diesem Thema?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Wir beraten Sie gern persönlich – unverbindlich und kostenlos.
            </p>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground rounded-full hover:bg-accent/90 transition-all font-medium shadow-sm shadow-accent/20"
            >
              Jetzt anfragen
            </Link>
          </div>
        </div>

        {/* Article JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleJsonLd),
          }}
        />
      </section>
    </main>
  );
}
