# 🏗️ Stickwerk-Studio — Architecture Document

**Stand:** 01. Juni 2026 | **Version:** 0.4.0

---

## 1. System-Architektur

### 1.1 High-Level Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Besucher (Browser)                        │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTPS
                           ▼
┌─────────────────────────────────────────────────────────────┐
│              Pangolin / Traefik / Gerbil (VPS)               │
│           https://sws.guenlab.de → Newt Tunnel               │
└──────────────────────────────────┬──────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────┐
│                    ZimaOS (Heimnetz)                         │
│  ┌──────────────────────┐  ┌──────────────────────────────┐ │
│  │  stickwerk-app       │  │  PocketBase                  │ │
│  │  (Next.js 16)        │  │  (Datenbank + Admin UI)      │ │
│  │  Port 3034           │  │  Port 8090                   │ │
│  └────────┬─────────────┘  └────────┬─────────────────────┘ │
│           │ REST API                │                        │
│           └─────────────────────────┘                        │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Komponenten-Architektur (Next.js)

```
src/
├── app/                              # App Router (Next.js 16)
│   ├── layout.tsx                    # Root Layout (Fonts, Meta)
│   ├── page.tsx                      # Landing Page (9 Sections)
│   ├── not-found.tsx                 # 404 Seite
│   ├── error.tsx                     # Error Boundary
│   ├── admin/page.tsx                # Admin Dashboard
│   ├── kontakt/page.tsx              # Kontaktformular
│   ├── impressum/page.tsx            # Impressum (Server-kompatibel)
│   ├── datenschutz/page.tsx          # Datenschutz (Server-kompatibel)
│   ├── agb/page.tsx                  # AGB (Server-kompatibel)
│   └── api/
│       ├── contact/route.ts          # POST: Kontakt-Formular → PocketBase
│       ├── health/route.ts           # GET: Healthcheck
│       └── leads/
│           ├── route.ts              # GET/POST: Leads CRUD
│           └── [id]/route.ts         # PATCH/DELETE: Einzel-Lead
│
├── components/
│   ├── Navbar.tsx                    # Premium Sticky Navbar
│   ├── Scene.tsx                     # Background Gradient
│   ├── SmoothScroll.tsx              # Lenis Smooth Scroll
│   ├── PatchCalculator.tsx           # 11-Step Konfigurator
│   └── ui/
│       ├── button.tsx                # Button (CVA-Varianten)
│       ├── card.tsx                  # Card mit Border + Shadow
│       ├── input.tsx                 # Input mit Focus-States
│       ├── badge.tsx                 # Badge (Status, Gold, etc.)
│       ├── tabs.tsx                  # Radix Tabs
│       ├── accordion.tsx             # Radix Accordion (FAQ)
│       └── sheet.tsx                 # Radix Dialog (Mobile Menu)
│
└── lib/
    └── pocketbase/
        └── client.ts                 # PocketBase SDK Client
```

---

## 2. Datenfluss

### 2.1 Lead-Erstellung (Kontaktformular)

```
User füllt Formular aus
       │
       ▼
Client-seitige Validierung (Zod)
       │
       ▼
POST /api/contact
       │
       ▼
Server validiert + erstellt Lead in PocketBase
       │
       ▼
Response: { success: true, id: "abc123" }
       │
       ▼
Client zeigt Erfolgsmeldung
```

### 2.2 Patch-Konfigurator

```
User durchläuft 11 Schritte (Context + useReducer)
       │
       ▼
Context speichert: Form, Größe, Basis, Rand, Menge, Express, Optionen
       │
       ▼
Echtzeit-Preisberechnung (calculatePrice())
       │
       ▼
Final: Zusammenfassung + Lead-Erstellung
```

---

## 3. Datenmodell

### 3.1 PocketBase Collections

#### `leads` (Hauptsammlung)

| Feld | Typ | Zweck |
|------|-----|-------|
| `name` | Text | Kundenname |
| `email` | Email | Kontakt-E-Mail |
| `phone` | Text (optional) | Telefonnummer |
| `company` | Text (optional) | Unternehmen/Verein |
| `message` | Text (optional) | Freitext-Nachricht |
| `patch_config` | JSON | Komplette Konfiguration |
| `price_range` | Text | Preisrange (z.B. "100-250€") |
| `status` | Select | new → in_progress → completed → cancelled |
| `source` | Text | leads | kontakt |
| `created` | Auto | Timestamp (PocketBase) |

**Historische Notiz:** In PocketBase v0.27+ müssen Base Collections ohne `created`-Feld
mit `sort=-id` statt `sort=-created` sortiert werden (Commit `1c282b3`).

---

## 4. Design System

### 4.1 Token-Struktur (globals.css)

```css
:root {
  /* Farben */
  --color-background: #F5EDE0;
  --color-foreground: #1C1814;
  --color-card: #FCF7EF;
  --color-card-foreground: #1C1814;
  --color-secondary: #EEE5D6;
  --color-muted-foreground: #5C5248;
  --color-accent: #8A6A3F;
  --color-accent-foreground: #FCF7EF;
  --color-border: #D8C7AE;
  --color-success: #1F6B3A;
  --color-destructive: #8B1E1E;

  /* Radii */
  --radius: 10px;
  --radius-cards: 24px;

  /* Section Divider */
  --divider-width: 60px;
  --divider-height: 2px;
  --divider-color: #8A6A3F;
}
```

### 4.2 Typografie-Skala

| Token | Value | Font |
|-------|-------|------|
| `--font-display` (Headlines) | `clamp(2.5rem, 6vw, 72px)` | Playfair Display |
| `--font-heading-lg` | `clamp(1.875rem, 4vw, 42px)` | Playfair Display |
| `--font-heading` | `clamp(1.5rem, 3vw, 30px)` | Playfair Display |
| `--font-heading-sm` | `22px` | Playfair Display |
| `--font-body` | `16px` / 1.7 leading | Inter |
| `--font-body-lg` | `18px` / 1.7 leading | Inter |
| `--font-caption` | `12px` uppercase, 0.06em tracking | Inter |

### 4.3 Dark Mode

Vorbereitet in globals.css via `.dark`-Selektor:
```css
.dark {
  --color-background: #1A1612;
  --color-foreground: #E8E0D8;
  /* ... weitere Dark-Mode-Tokens */
}
```

Aktivierung aktuell via `prefers-color-scheme` (Media-Query).
Option für manuellen Toggle vorhanden (nicht aktiviert).

---

## 5. Technologien & Versionen

### 5.1 Dependencies

| Paket | Version | Zweck |
|-------|---------|-------|
| `next` | 16.2.6 | Framework (App Router) |
| `react` | 19.2.4 | UI-Library |
| `typescript` | ^5 | Sprache |
| `tailwindcss` | ^4 | Utility-CSS |
| `framer-motion` | ^12.40.0 | Animationen |
| `lenis` | ^1.3.23 | Smooth Scrolling |
| `lucide-react` | ^1.16.0 | Icons |
| `pocketbase` | ^0.27.0 | Datenbank-Client |
| `zod` | ^4.4.3 | Validierung |
| `class-variance-authority` | ^0.7.1 | UI-Varianten |
| `tailwind-merge` | ^2.5.5 | Tailwind-Konfliktauflösung |

### 5.2 Radix UI (Headless Components)

| Komponente | Paket | Verwendung |
|------------|-------|------------|
| **Accordion** | `@radix-ui/react-accordion` | FAQ-Sektion |
| **Dialog** | `@radix-ui/react-dialog` | Mobile Menu (Sheet) |
| **Tabs** | `@radix-ui/react-tabs` | Admin Dashboard |
| **Slot** | `@radix-ui/react-slot` | Button asChild |

### 5.3 Dev-Dependencies

| Paket | Version | Zweck |
|-------|---------|-------|
| `@playwright/test` | ^1.49.0 | E2E-Testing |
| `@playwright/mcp` | ^0.0.75 | AI-gestütztes Testing |
| `eslint` | ^9 | Linting |
| `eslint-config-next` | 16.2.6 | Next.js ESLint-Config |
| `@tailwindcss/postcss` | ^4 | PostCSS-Plugin |

---

## 6. CI/CD Pipeline

### 6.1 GitHub Actions (docker-publish.yml)

```yaml
on: push → main
jobs:
  build:
    - npm ci
    - npm run build
    - docker buildx build
    - push to ghcr.io/tolgaguensal-lab/stickwerk-studio:latest
  tag:
    - create git tag v0.x.x
    - create GitHub Release
```

### 6.2 Deployment (ZimaOS)

```yaml
# deploy/zimaos-compose.yml
services:
  app:
    image: ghcr.io/tolgaguensal-lab/stickwerk-studio:latest
    pull_policy: always
    ports:
      - "3034:3000"
    environment:
      - POCKETBASE_URL=http://pocketbase:8090
```

---

## 7. Testing

### 7.1 Test-Strategie

| Typ | Tool | Status |
|-----|------|--------|
| **Linting** | ESLint | ✅ Clean (nur Pre-existing Warnings) |
| **TypeScript** | tsc | ✅ Clean |
| **E2E Tests** | Playwright | ⚠️ In Arbeit |
| **Visual Tests** | Playwright | ⚠️ Syntax-Fix nötig |
| **Unit Tests** | Vitest | ❌ Nicht implementiert |

### 7.2 Test-Skripte

```bash
npm run lint              # ESLint
npm run test:e2e          # Playwright E2E
npm run test:e2e:ui       # Playwright UI Mode
npm run test:visual       # Visuelle Regression
npm run build             # Production Build + TypeCheck
```

---

## 8. Performance & Optimierung

### 8.1 Build-Output

```
Route (app)                    Size
┌ ○ /                          5.3 kB
├ ○ /_not-found                1.2 kB
├ ○ /admin                     2.8 kB
├ ○ /agb                       3.1 kB
├ ○ /datenschutz               3.4 kB
├ ○ /impressum                 2.9 kB
├ ○ /kontakt                   4.1 kB
├ ƒ /api/contact               - (dynamic)
├ ƒ /api/health                - (dynamic)
├ ƒ /api/leads                 - (dynamic)
├ ƒ /api/leads/[id]            - (dynamic)
```

### 8.2 Optimierungen

- ✅ Static Pages (SSG) für alle Content-Seiten
- ✅ Dynamic Routes (SSR) nur für API-Endpoints
- ✅ Turbopack für schnelle Development-Builds
- ✅ Font Loading via `next/font` (Google Fonts, MIT)
- ✅ Lucide Icons (Tree-shakeable)
- ✅ Responsive Images (Next.js Image Optimization)

---

## 9. Bekannte Fehler & Einschränkungen

| Problem | Schwere | Status |
|---------|---------|--------|
| `tests/e2e/visual-design.spec.ts:43` — Parsing Error | Medium | ⏳ Nicht behoben (pre-existing) |
| Lenis Smooth Scroll — Touch auf Mobile | Niedrig | ⚠️ Nicht ausgiebig getestet |
| E-Mail-Benachrichtigungen für Leads | Niedrig | ❌ Nicht implementiert |
| Analytics (DSGVO-konform) | Niedrig | ❌ Nicht implementiert |

---

## 10. Nützliche Kommandos

```bash
# Entwicklung
npm run dev                    # Dev-Server (localhost:3000)
npm run build                  # Production Build
npm run start                  # Production Server

# Testing
npm run lint                   # ESLint
npm run test:e2e               # Playwright E2E
npm run test:visual            # Visuelle Tests

# Deployment
docker build -t stickwerk .    # Docker Image bauen
docker compose -f deploy/zimaos-compose.yml up -d  # Auf ZimaOS deployen

# Git
GIT_MASTER=1 git log --oneline --reverse  # Komplette History anzeigen
```

---

*Letzte Aktualisierung: 01. Juni 2026*  
*Maintainer: Sisyphus (AI Agent)*
