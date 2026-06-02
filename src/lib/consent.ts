/**
 * Cookie-Consent-Management
 *
 * Speichert die Einwilligung des Nutzers im localStorage.
 * Kategorien:
 *   - necessary (immer aktiv, keine Einwilligung nötig)
 *   - analytics  (optional, z.B. Plausible)
 *   - marketing  (optional, z.B. Google Analytics, Meta Pixel)
 */

const STORAGE_KEY = "sws_consent";
const CONSENT_VERSION = 2;

export type ConsentCategory = "analytics" | "marketing";

export interface ConsentState {
  version: number;
  accepted: boolean;
  categories: Record<ConsentCategory, boolean>;
  updatedAt: string;
}

const DEFAULT_CONSENT: ConsentState = {
  version: CONSENT_VERSION,
  accepted: false,
  categories: {
    analytics: false,
    marketing: false,
  },
  updatedAt: "",
};

/** Einwilligung aus localStorage lesen */
export function getConsent(): ConsentState {
  if (typeof window === "undefined") return { ...DEFAULT_CONSENT, accepted: true, categories: { analytics: false, marketing: false } };

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_CONSENT };

    const parsed = JSON.parse(raw) as ConsentState;

    // Bei Versionswechsel oder fehlenden Feldern → zurücksetzen
    if (parsed.version !== CONSENT_VERSION) {
      return { ...DEFAULT_CONSENT };
    }

    return parsed;
  } catch {
    return { ...DEFAULT_CONSENT };
  }
}

/** Einwilligung speichern */
export function setConsent(
  accepted: boolean,
  categories: Record<ConsentCategory, boolean>
): void {
  if (typeof window === "undefined") return;

  const state: ConsentState = {
    version: CONSENT_VERSION,
    accepted,
    categories,
    updatedAt: new Date().toISOString(),
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

  // Custom-Event feuern, damit andere Skripte reagieren können
  window.dispatchEvent(new CustomEvent("sws:consent", { detail: state }));
}

/** Wurde bereits eine Einwilligung gegeben? */
export function hasConsented(): boolean {
  return getConsent().accepted;
}

/** Ist eine bestimmte Kategorie erlaubt? */
export function isCategoryAllowed(category: ConsentCategory): boolean {
  const consent = getConsent();
  return consent.accepted && consent.categories[category] === true;
}

/** Alle Kategorien akzeptieren */
export function acceptAll(): void {
  setConsent(true, { analytics: true, marketing: true });
}

/** Nur notwendige Cookies akzeptieren */
export function acceptNecessary(): void {
  setConsent(true, { analytics: false, marketing: false });
}

/** Individuelle Auswahl speichern */
export function savePreferences(categories: Record<ConsentCategory, boolean>): void {
  setConsent(true, categories);
}
