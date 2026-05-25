import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-background font-sans text-foreground">
      <main className="flex flex-col items-center justify-center py-20 px-6 text-center max-w-4xl w-full">
        
        {/* Logo Section */}
        <div className="mb-12 transition-transform hover:scale-105 duration-500">
          <Image
            src="/logo.jpg"
            alt="Stickwerk-Studio Logo"
            width={280}
            height={280}
            className="rounded-full shadow-2xl border-4 border-primary"
            priority
          />
        </div>

        {/* Hero Section */}
        <div className="flex flex-col items-center gap-6 mb-16">
          <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight tracking-tight text-primary">
            Fäden, die Marken <span className="text-accent">sichtbar machen</span>
          </h1>
          <p className="max-w-2xl text-lg md:text-xl leading-relaxed text-foreground/80 italic">
            Professionelle Stickereien, hochwertige Patches und textile Veredelung 
            für Unternehmen, die Wert auf Detail und Qualität legen.
          </p>
        </div>

        {/* Call to Action Section */}
        <div className="flex flex-col sm:flex-row gap-6 w-full justify-center items-center">
          <a
            className="flex h-14 w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-primary px-8 text-background font-semibold text-lg transition-all hover:bg-primary/90 hover:shadow-lg active:scale-95"
            href="#calculator"
          >
            <span>Patch-Kalkulator starten</span>
            <span className="text-accent">→</span>
          </a>
          <a
            className="flex h-14 w-full sm:w-auto items-center justify-center rounded-full border-2 border-primary px-8 text-primary font-semibold text-lg transition-all hover:bg-primary/5 active:scale-95"
            href="#contact"
          >
            Anfrage senden
          </a>
        </div>

        {/* Brand Statement */}
        <div className="mt-24 pt-12 border-t border-primary/10 w-full max-w-2xl">
          <p className="text-sm uppercase tracking-widest text-accent font-bold mb-4">
            Stickwerk-Studio
          </p>
          <p className="text-foreground/60 text-sm italic">
            Modernes Handwerk trifft auf digitale Präzision. 
            Spezialisiert auf die DACH-Region.
          </p>
        </div>
      </main>
    </div>
  );
}
