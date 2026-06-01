"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="max-w-md text-center space-y-8">
        <div className="w-20 h-20 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center mx-auto">
          <AlertTriangle className="w-10 h-10" />
        </div>
        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-serif text-foreground tracking-tight">
            Etwas ist schiefgelaufen
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut
            oder kontaktieren Sie uns, falls das Problem bestehen bleibt.
          </p>
          {error.digest && (
            <p className="text-xs text-muted-foreground/60 font-mono">
              Fehler-ID: {error.digest}
            </p>
          )}
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            variant="default"
            onClick={() => reset()}
            className="gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Erneut versuchen
          </Button>
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <Home className="w-4 h-4" />
              Zur Startseite
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
