"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Settings, Check, Shield } from "lucide-react";
import {
  getConsent,
  acceptAll,
  acceptNecessary,
  savePreferences,
  hasConsented,
  type ConsentCategory,
} from "@/lib/consent";

const CATEGORY_LABELS: Record<ConsentCategory, { title: string; desc: string }> = {
  analytics: {
    title: "Analytics",
    desc: "Wir nutzen cookieloses Analytics (Plausible), um zu verstehen, wie die Website genutzt wird. Keine personenbezogenen Daten.",
  },
  marketing: {
    title: "Marketing & Tracking",
    desc: "Ermöglicht Conversion-Tracking und personalisierte Werbung über Drittanbieter (z. B. Google Ads, Meta Pixel).",
  },
};

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [prefs, setPrefs] = useState<Record<ConsentCategory, boolean>>({
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Nur anzeigen, wenn noch keine Einwilligung gegeben wurde
    if (!hasConsented()) {
      // Kurzer Delay, damit die Seite zuerst lädt
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    acceptAll();
    setVisible(false);
  };

  const handleAcceptNecessary = () => {
    acceptNecessary();
    setVisible(false);
  };

  const handleSavePreferences = () => {
    savePreferences(prefs);
    setVisible(false);
    setShowSettings(false);
  };

  const togglePref = (category: ConsentCategory) => {
    setPrefs((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
        >
          {/* Backdrop-Overlay */}
          <div className="absolute inset-0 bg-[#1C1814]/60 backdrop-blur-sm -z-10" />

          <div className="mx-auto max-w-3xl">
            <div className="relative rounded-2xl border border-[#D8C7AE] bg-[#FFF8EC] p-6 shadow-2xl sm:p-8">
              {/* Close (nur notwendige) */}
              <button
                onClick={handleAcceptNecessary}
                className="absolute right-4 top-4 text-[#5C5248] hover:text-[#1C1814] transition-colors"
                aria-label="Schließen (nur notwendige Cookies)"
              >
                <X size={20} />
              </button>

              {/* Icon + Überschrift */}
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8A6A3F]/10">
                  <Shield size={20} className="text-[#8A6A3F]" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-[#1C1814]">
                    Cookie-Einstellungen
                  </h3>
                  <p className="text-sm text-[#5C5248]">
                    Diese Website verwendet Cookies zu Analyse- und Marketingzwecken.
                  </p>
                </div>
              </div>

              {/* Settings Panel */}
              {showSettings ? (
                <div className="mb-6 space-y-3">
                  {/* Technisch notwendig (immer aktiv) */}
                  <div className="flex items-start gap-3 rounded-xl border border-[#D8C7AE]/50 bg-[#F7F1E6]/50 p-4">
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#8A6A3F]/20">
                      <Check size={14} className="text-[#8A6A3F]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-[#1C1814]">Technisch notwendig</span>
                        <span className="rounded-full bg-[#8A6A3F]/10 px-2.5 py-0.5 text-xs text-[#8A6A3F]">
                          Immer aktiv
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-[#5C5248]">
                        Notwendig für den Betrieb der Website, z. B. Admin-Session-Cookie.
                      </p>
                    </div>
                  </div>

                  {/* Kategorien */}
                  {(Object.keys(CATEGORY_LABELS) as ConsentCategory[]).map((cat) => (
                    <label
                      key={cat}
                      className="flex cursor-pointer items-start gap-3 rounded-xl border border-[#D8C7AE]/50 bg-[#F7F1E6]/50 p-4 transition-colors hover:bg-[#EFE3D0]/50"
                    >
                      <input
                        type="checkbox"
                        checked={prefs[cat]}
                        onChange={() => togglePref(cat)}
                        className="mt-0.5 h-5 w-5 rounded border-[#D8C7AE] text-[#8A6A3F] focus:ring-[#8A6A3F]/30"
                      />
                      <div className="flex-1">
                        <span className="font-medium text-[#1C1814]">
                          {CATEGORY_LABELS[cat].title}
                        </span>
                        <p className="mt-0.5 text-sm text-[#5C5248]">
                          {CATEGORY_LABELS[cat].desc}
                        </p>
                      </div>
                    </label>
                  ))}

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={handleSavePreferences}
                      className="flex-1 rounded-xl bg-[#8A6A3F] px-5 py-2.5 font-medium text-white transition-colors hover:bg-[#7A5D35]"
                    >
                      Auswahl speichern
                    </button>
                    <button
                      onClick={handleAcceptAll}
                      className="rounded-xl border border-[#D8C7AE] px-5 py-2.5 font-medium text-[#1C1814] transition-colors hover:bg-[#EFE3D0]"
                    >
                      Alle akzeptieren
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Kurztext */}
                  <p className="mb-6 text-sm leading-relaxed text-[#5C5248]">
                    Wir verwenden Cookies, um dir die bestmögliche Erfahrung zu bieten.
                    Technisch notwendige Cookies sind immer aktiv. Über{" "}
                    <strong>Einstellungen</strong> kannst du Analytics- und Marketing-Cookies
                    separat verwalten. Details in unserer{" "}
                    <a
                      href="/datenschutz"
                      className="text-[#8A6A3F] underline underline-offset-2 hover:text-[#7A5D35]"
                    >
                      Datenschutzerklärung
                    </a>
                    .
                  </p>

                  {/* Buttons */}
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                      onClick={handleAcceptAll}
                      className="flex-1 rounded-xl bg-[#8A6A3F] px-5 py-3 font-medium text-white transition-colors hover:bg-[#7A5D35]"
                    >
                      Alle akzeptieren
                    </button>
                    <button
                      onClick={handleAcceptNecessary}
                      className="flex-1 rounded-xl border border-[#D8C7AE] px-5 py-3 font-medium text-[#1C1814] transition-colors hover:bg-[#EFE3D0]"
                    >
                      Nur notwendige
                    </button>
                    <button
                      onClick={() => setShowSettings(true)}
                      className="flex items-center justify-center gap-2 rounded-xl border border-[#D8C7AE] px-5 py-3 font-medium text-[#5C5248] transition-colors hover:bg-[#EFE3D0]"
                    >
                      <Settings size={16} />
                      Einstellungen
                    </button>
                  </div>
                </>
              )}

              {/* Rechtlicher Hinweis */}
              <p className="mt-4 text-xs text-[#5C5248]/70">
                Mit Klick auf "Alle akzeptieren" stimmst du der Verarbeitung deiner Daten
                zu Analyse- und Marketingzwecken zu. Die Einwilligung kann jederzeit in den
                Cookie-Einstellungen widerrufen werden.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
