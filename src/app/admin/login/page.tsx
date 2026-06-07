"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import {
  LogIn,
  Loader2,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Anmeldung fehlgeschlagen.");
        setLoading(false);
        return;
      }

      router.push(redirect);
    } catch {
      setError("Verbindungsfehler zum Server.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm space-y-8">
      {/* Logo / Header */}
      <div className="text-center space-y-3">
        <div className="flex justify-center">
          <Image
            src="/brand/logo-mark.svg"
            alt="Stickwerk-Studio"
            width={48}
            height={48}
            className="opacity-80"
          />
        </div>
        <div>
          <h1 className="text-2xl font-serif text-foreground tracking-tight">
            Admin Login
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Stickwerk-Studio Verwaltung
          </p>
        </div>
      </div>

      {/* Login Form */}
      <Card className="border-border shadow-lg">
        <CardContent className="p-6 space-y-6">
          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-xl flex items-center gap-2 text-destructive text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-muted-foreground"
              >
                E-Mail
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@stickwerk-studio.de"
                required
                autoFocus
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-muted-foreground"
              >
                Passwort
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={
                    showPassword ? "Passwort verbergen" : "Passwort anzeigen"
                  }
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="default"
              size="lg"
              disabled={loading || !email || !password}
              className="w-full gap-2"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <LogIn className="w-5 h-5" />
              )}
              Anmelden
            </Button>
          </form>

          <p className="text-xs text-muted-foreground text-center">
            Geschützter Bereich — nur für autorisierte Administratoren.
          </p>
        </CardContent>
      </Card>

      {/* Back to website */}
      <div className="text-center">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-accent transition-colors"
        >
          ← Zurück zur Website
        </Link>
      </div>
    </div>
  );
}

export default function AdminLogin() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Suspense
        fallback={
          <div className="flex items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
