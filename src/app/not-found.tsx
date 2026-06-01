"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="max-w-md text-center space-y-8">
        <div className="space-y-2">
          <div className="text-8xl font-serif text-accent/30 tracking-tight">404</div>
          <h1 className="text-3xl md:text-4xl font-serif text-foreground tracking-tight">
            Seite nicht gefunden
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            Die von Ihnen gesuchte Seite existiert nicht oder wurde verschoben.
            Nutzen Sie die Navigation oder kehren Sie zur Startseite zurück.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/">
            <Button variant="default" className="gap-2">
              <Home className="w-4 h-4" />
              Zur Startseite
            </Button>
          </Link>
          <Button variant="outline" onClick={() => window.history.back()} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Zurück
          </Button>
        </div>
      </div>
    </div>
  );
}
