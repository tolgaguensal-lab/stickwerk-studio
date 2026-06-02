"use client";

import { useEffect } from "react";
import { isCategoryAllowed } from "@/lib/consent";

/**
 * Lädt externe Analytics/Tracking-Skripte basierend auf Cookie-Consent.
 * Plausible wird nur geladen, wenn analytics consent erteilt wurde.
 */
export default function AnalyticsLoader() {
  useEffect(() => {
    const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
    if (!domain) return;

    const checkAndLoad = () => {
      if (isCategoryAllowed("analytics") && !document.querySelector('script[data-domain="' + domain + '"]')) {
        const script = document.createElement("script");
        script.defer = true;
        script.dataset.domain = domain;
        script.src = "https://plausible.io/js/script.js";
        document.head.appendChild(script);
      }
    };

    // Initial prüfen
    checkAndLoad();

    // Auf Consent-Änderungen lauschen
    window.addEventListener("sws:consent", checkAndLoad);
    return () => window.removeEventListener("sws:consent", checkAndLoad);
  }, []);

  return null;
}
