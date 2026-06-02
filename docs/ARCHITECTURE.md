# 🏗️ Stickwerk-Studio — Architecture Document

**Stand:** 02. Juni 2026 | **Version:** 0.5.0

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
│  │  stickwerk-app       │  │  PostgreSQL                  │ │
│  │  (Next.js 16)        │  │  (Datenbank via Drizzle ORM) │ │
│  │  Port 3034           │  │  Port 5432                   │ │
│  └────────┬─────────────┘  └────────┬─────────────────────┘ │
│           │ Drizzle ORM              │                        │
│           └──────────────────────────┘                        │
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
│       ├── contact/route.ts          # POST: Kontakt-Formular → PostgreSQL
│       ├── health/route.ts           # GET: Healthcheck (mit DB-Test)
│       ├── upload/route.ts           # POST: Datei-Upload (unabhängig von DB)
│       └── leads/
│           ├── route.ts              # GET/POST: Leads CRUD
│           ├── [id]/route.ts         # PATCH/DELETE/GET: Einzel-Lead
│           └── export/route.ts       # GET: CSV-Export
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
    ├── db/
    │   ├── index.ts                  # Drizzle ORM Client (PostgreSQL)
    │   └── schema.ts                 # DB-Schema: leads, contact_messages
    ├── auth/
    │   └── session.ts                # Admin JWT Session (unabhängig)
    ├── email.ts                      # E-Mail-Benachrichtigungen (nodemailer)
    └── rate-limit.ts                 # Rate Limiting (in-memory)
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
Server validiert + erstellt Lead in PostgreSQL (via Drizzle)
       │
       ▼
Response: { success: true, id: 42 }
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
Final: Zusammenfassung + Lead-Erstellung über /api/leads
```

---

## 3. Datenmodell

### 3.1 PostgreSQL Tabellen (Drizzle ORM)

#### `leads` (Haupttabelle)

| Feld | Typ | Zweck |
|------|-----|-------|
| `id` | serial (PK) | Auto-Increment ID |
| `name` | text | Kundenname |
| `email` | text | Kontakt-E-Mail |
| `phone` | text (default '') | Telefonnummer |
| `company` | text (default '') | Unternehmen/Verein |
| `message` | text (default '') | Freitext-Nachricht |
| `patch_config` | jsonb | Komplette Konfiguration |
| `estimated_price_min` | integer (default 0) | Untere Preisspanne |
| `estimated_price_max` | integer (default 0) | Obere Preisspanne |
| `status` | text (default 'new') | new → in_progress → quoted → won → lost → archived |
| `source` | text (default 'website') | website \| kontakt |
| `admin_notes` | text (default '') | Interne Notizen |
| `consent_privacy` | boolean | DSGVO-Einwilligung |
| `consent_timestamp` | text | Zeitpunkt der Einwilligung |
| `privacy_version` | text (default '1.0') | Version der Datenschutzerklärung |
| `created` | timestamp (default now()) | Erstellungszeitpunkt |
| `updated` | timestamp (default now()) | Letzte Aktualisierung |

#### `contact_messages`

| Feld | Typ | Zweck |
|------|-----|-------|
| `id` | serial (PK) | Auto-Increment ID |
| `name` | text | Absender-Name |
| `email` | text | Absender-E-Mail |
| `phone` | text (default '') | Telefonnummer |
| `subject` | text (default '') | Betreff |
| `message` | text | Nachrichtentext |
| `status` | text (default 'new') | new \| read \| replied \| archived |
| `consent_privacy` | boolean | DSGVO-Einwilligung |
| `consent_timestamp` | text | Zeitpunkt der Einwilligung |
| `privacy_version` | text (default '1.0') | Version der Datenschutzerklärung |
| `created` | timestamp (default now()) | Erstellungszeitpunkt |

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
| `drizzle-orm` | ^0.45.2 | Drizzle ORM (Datenbankzugriff) |
| `pg` | ^8.21.0 | PostgreSQL Client |
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
| `drizzle-kit` | ^0.31.10 | Migrationen generieren & pushen |
| `@types/pg` | ^8.20.0 | Typdefinitionen für PostgreSQL |
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
      - DATABASE_URL=postgresql://stickwerk:stickwerk@host.docker.internal:5432/stickwerk
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

# Datenbank
npm run db:generate            # Migration generieren
npm run db:push                # Schema auf PostgreSQL pushen
npm run db:studio              # Drizzle Studio (GUI)

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

*Letzte Aktualisierung: 02. Juni 2026*  
*Maintainer: Sisyphus (AI Agent)*
