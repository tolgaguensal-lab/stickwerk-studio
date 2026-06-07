import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, Clock } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#2D2823] text-[#E8E0D8] py-16 md:py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <Image
                src="/brand/logo-mark.svg"
                alt="Stickwerk-Studio Logo"
                width={40}
                height={40}
              />
              <span className="text-xl font-serif">Stickwerk-Studio</span>
            </div>
            <p className="text-card/70 leading-relaxed">
              Professionelle Maschinenstickerei für Patches, Logos und
              Textilbranding in Premium-Handwerksqualität. Hergestellt in
              Deutschland.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-5">
            <h4 className="font-semibold text-lg">Navigation</h4>
            <div className="space-y-3">
              <Link
                href="/"
                className="block text-card/70 hover:text-accent transition-colors nav-link"
              >
                Startseite
              </Link>
              <Link
                href="/ueber-uns"
                className="block text-card/70 hover:text-accent transition-colors nav-link"
              >
                Über uns
              </Link>
              <Link
                href="/galerie"
                className="block text-card/70 hover:text-accent transition-colors nav-link"
              >
                Galerie
              </Link>

              <Link
                href="/#calculator"
                className="block text-card/70 hover:text-accent transition-colors nav-link"
              >
                Konfigurator
              </Link>
              <Link
                href="/faq"
                className="block text-card/70 hover:text-accent transition-colors nav-link"
              >
                FAQ
              </Link>
              <Link
                href="/kontakt"
                className="block text-card/70 hover:text-accent transition-colors nav-link"
              >
                Kontakt
              </Link>
            </div>
          </div>

          {/* Kontakt */}
          <div className="space-y-5">
            <h4 className="font-semibold text-lg">Kontakt</h4>
            <div className="space-y-3 text-card/70">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" />
                <a
                  href="mailto:info@stickwerk-studio.de"
                  className="hover:text-accent transition-colors"
                >
                  info@stickwerk-studio.de
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0" />
                <span>Telefon wird ergänzt</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 shrink-0" />
                <span>Mo-Fr: 9:00 - 18:00 Uhr</span>
              </div>
            </div>
          </div>

          {/* Rechtliches */}
          <div className="space-y-5">
            <h4 className="font-semibold text-lg">Rechtliches</h4>
            <div className="space-y-3 text-card/70">
              <Link
                href="/impressum"
                className="block hover:text-accent transition-colors nav-link"
              >
                Impressum
              </Link>
              <Link
                href="/datenschutz"
                className="block hover:text-accent transition-colors nav-link"
              >
                Datenschutz
              </Link>
              <Link
                href="/agb"
                className="block hover:text-accent transition-colors nav-link"
              >
                AGB
              </Link>
              <Link
                href="/kontakt"
                className="block hover:text-accent transition-colors nav-link"
              >
                Kontakt
              </Link>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3 pt-2">
              <a
                href="#"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-card/10 flex items-center justify-center text-card/70 hover:bg-card/20 hover:text-card transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-foreground"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-card/10 flex items-center justify-center text-card/70 hover:bg-card/20 hover:text-card transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-foreground"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="X (Twitter)"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-card/10 flex items-center justify-center text-card/70 hover:bg-card/20 hover:text-card transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-foreground"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4l11.733 16h4.267l-11.733 -16h-4.267z" />
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-card/20 text-center text-sm text-card/60">
          <p>
            &copy; {currentYear} Stickwerk-Studio. Alle Rechte vorbehalten. |
            DSGVO konform | Made in Germany
          </p>
          {/* TODO: Social-Media-Links durch tatsächliche Profile ersetzen (href="#") */}
        </div>
      </div>
    </footer>
  );
}
