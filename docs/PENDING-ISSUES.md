# ⚠️ Offene Punkte — Stand jetzt

> Diese Datei sammelt alle Punkte, die **noch nicht gelöst** sind.
> Priorität: 🔴 kritisch → 🟡 wichtig → 🟢 nice-to-have

---

## 🔴 1. Rechtliche Platzhalter (muss der User ausfüllen)

Rechtlich problematisch — die Seite ist ohne diese Angaben nicht abmahnungssicher.

### `src/app/impressum/page.tsx` (8 Platzhalter)
- ⚠️ **Vollständige ladungsfähige Anschrift** (§ 5 TMG)
- ⚠️ **Inhaber/Geschäftsführer mit vollständigem Namen** (Zeile 45-46)
- ⚠️ **Telefonnummer** für schnelle elektronische Kontaktaufnahme
- ⚠️ **Handelsregistereintrag** (falls vorhanden): Registergericht + Registernummer
- ⚠️ **Umsatzsteuer-ID** (§ 27a UStG)
- ⚠️ **Verantwortlicher nach § 18 Abs. 2 MStV** (für redaktionelle Inhalte)
- ⚠️ **Berufsbezeichnung** (z.B. Handwerkskammer, falls zutreffend)

### `src/app/datenschutz/page.tsx` (5 Platzhalter)
- ⚠️ **Telefonnummer** ergänzen
- ⚠️ **Datenschutzbeauftragter** (nur falls gesetzlich erforderlich nach Art. 37 DSGVO)
- ⚠️ **Serverstandort/Rechenzentrum präzisieren**
- ⚠️ **Datenschutzerklärung von Google Analytics** verlinken
- ⚠️ **SSL-Zertifikatsanbieter** (Pangolin via Let's Encrypt — bestätigen)

### `src/app/agb/page.tsx` (2 Platzhalter)
- ⚠️ **Widerrufsrecht für individuelle Anfertigungen** rechtlich prüfen (§ 312g Abs. 2 Nr. 1 BGB)
- ⚠️ **Vollständige Widerrufsbelehrung + Muster-Widerrufsformular** einfügen

### `src/components/Footer.tsx` (1 Platzhalter)
- ⚠️ **Social-Media-Links** durch echte Profile ersetzen (aktuell `href="#"`)

---

## 🟡 2. npm Audit — 7 moderate Vulnerabilities

**Aktueller Stand:** 7 moderate, 0 high, 0 critical

### Vulnerabilities
| Paket | Severity | Issue | Fix |
|-------|----------|-------|-----|
| `esbuild` (via `drizzle-kit`) | moderate | Dev-Server kann fremde Requests beantworten | Nur durch `npm audit fix --force` (Breaking: drizzle-kit 0.17→0.18) |
| `postcss` (via `next`) | moderate | XSS via Unescaped `</style>` | Nur durch Next.js Downgrade (Breaking) |

**Risiko-Einschätzung:** Beide sind **Dev-Only** Tools (nicht im Production-Bundle). Es ist **kein akuter Handlungsbedarf** in Production.

**Was tun:**
- 🔄 Wenn drizzle-kit 0.18 stabil ist: `npm audit fix` testen
- 🔄 Wenn Next.js das Issue fixt: `npm update next`

---

## 🟡 3. Lint-Warnungen — 44 Errors / 66 Warnings

**Aktueller Stand:** 44 errors, 66 warnings (vorher: 50/70)

### Was schon gefixt ist ✅
- ✅ `Math.random()` in React-Render → `useId()`
- ✅ `<a href="/">` → `<Link>` (2x)
- ✅ Lint-Parse-Error in `visual-design.spec.ts`
- ✅ `any` types in 3 E2E test files
- ✅ Unused variables

### Was noch offen ist (nach Häufigkeit)

| Regel | Anzahl | Wo hauptsächlich | Risiko |
|-------|--------|------------------|--------|
| `@typescript-eslint/no-explicit-any` | 32 | E2E tests, scripts/seed.ts | Niedrig — `any` ist in Tests ok |
| `react-hooks/purity` (setState in useEffect) | 6 | Verschiedene Komponenten | Mittel — Cascading Renders |
| `react-hooks/rules-of-hooks` | 1 | Unbekannt — könnte Bug sein | Hoch — Bug-Verdacht |
| `react/no-unescaped-entities` | 2 | Tippfehler im Text | Niedrig |

### Empfehlung
- **Nicht-blockierend** — der Build läuft, App funktioniert.
- Beim Aufräumen einfach in Wellen: erst die React-Hooks-Issues, dann die `any` Types.
- Lint läuft **nicht** in CI, blockiert also keine PRs.

---

## 🟢 4. GitHub Actions Status

Letzter Build (nach jedem Push automatisch): prüfen unter
`https://github.com/tolgaguensal-lab/stickwerk-studio/actions`

Manuell triggern: Actions → "Build and Publish Docker Image" → Run workflow

---

## 🟢 5. Sentry / Issue-Tracking

Eingerichtet aber **noch nicht aktiv** (kein DSN gesetzt):
- Account auf https://sentry.io anlegen
- DSN kopieren
- Als `SENTRY_DSN` env var setzen (lokal oder ZimaOS)

Sobald gesetzt: automatisches Error-Tracking für alle 500er.

---

## 🟢 6. Playwright E2E Tests

Geschrieben aber **lokal nicht ausführbar** (Ubuntu 26.04 zu neu für Playwright-Browser):
- 11 E2E test files in `tests/e2e/`
- Ausführen auf Mac/Windows oder ZimaOS:
  ```bash
  npm run test:e2e          # headless
  npm run test:e2e:headed   # Browser sichtbar
  ```

---

**Zuletzt aktualisiert:** nach `fix: Lint-Errors, Math.random React-Purity-Bug, Link statt <a>`
