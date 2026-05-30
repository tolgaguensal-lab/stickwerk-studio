# 🧵 Stickwerk-Studio

**Fäden, die Marken sichtbar machen.** v0.4.0

> ⚠️ **Legal Notice:** This project is proprietary. All rights reserved. Unauthorized use, reproduction, or distribution of this software is strictly prohibited. See [LICENSE](./LICENSE) for details.

Professionelle Website für Maschinenstickerei und Custom Patches im DACH-Raum. Interaktiver Patch-Konfigurator, Lead-Verwaltung und Admin-Dashboard.

---

## ✨ Features

### Für Kunden
- **Patch-Konfigurator** mit 11-Schritte-Konfigurator und Echtzeit-Preisberechnung
- **Kontaktformular** mit DSGVO-konformer Datenschutz-Checkbox
- **Rechtliche Seiten** (Impressum, Datenschutz, AGB)
- **Claude Type-inspiriertes Design-System** mit Midnight Ink, Canvas White und Signal Green

### Für Administration
- **Admin-Dashboard** zur Lead-Verwaltung
- **Status-Tracking** (new → in_progress → completed → cancelled)
- **PocketBase** als datastore (über ZimaOS App Store)

---

## 🚀 Tech Stack

| Layer | Technologie |
|-------|-------------|
| **Framework** | Next.js 16 (App Router) |
| **Sprache** | TypeScript |
| **Styling** | Tailwind CSS + Originäres Design-System |
| **Animation** | Framer Motion |
| **Icons** | Lucide React (MIT) |
| **Fonts** | Inter + Playfair Display (Google Fonts, MIT) |
| **Datenbank** | PocketBase (ZimaOS App Store) |
| **Deployment** | Docker + ZimaOS + Pangolin |

---

## 🎨 Design-System

Eigenständiges, originäres Design (keine Elemente aus externen Referenzen kopiert):

| Token | Wert | Verwendung |
|-------|------|------------|
| **Canvas White** | `#FAF8F5` | Seitenhintergrund, Karten |
| **Midnight Ink** | `#1A1A2E` | Primärtext, Überschriften |
| **Deep Charcoal** | `#2D2D2D` | Sekundärtext, Icons, Akzente |
| **Paper Gray** | `#F0EDE8` | Kontrasthintergrund |
| **Ghost Fill** | `#F5F3F0` | Leichte Füllungen, Hover |
| **Signal Green** | `#2E8B57` | CTA-Buttons, Highlights |
| **Pure White** | `#FFFFFF` | Text auf dunklen Flächen |

Siehe [DESIGN-COMPLIANCE.md](./docs/DESIGN-COMPLIANCE.md) für vollständige Compliance-Dokumentation.

---

## 🏗️ Projektstruktur

```
stickwerk-studio/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── admin/        # Admin-Dashboard
│   │   ├── api/          # API-Routes (contact, health, leads)
│   │   ├── kontakt/      # Kontaktformular
│   │   ├── impressum/    # Impressum
│   │   ├── datenschutz/  # Datenschutzerklärung
│   │   └── agb/          # AGB
│   ├── components/       # React-Komponenten
│   │   ├── PatchCalculator.tsx
│   │   ├── Navbar.tsx
│   │   ├── Scene.tsx
│   │   ├── SmoothScroll.tsx
│   │   └── ui/           # UI-Komponenten (Button, Card, Input, etc.)
│   └── lib/              # Hilfsfunktionen
│       └── pocketbase/   # PocketBase Client
├── deploy/               # ZimaOS Docker Compose
├── docs/                 # Dokumentation
├── scripts/              # Debug-Script für ZimaOS
└── tests/                # E2E Tests (Playwright)
```

---

## 🛠️ Entwicklung

### Voraussetzungen
- Node.js 20+
- PocketBase (lokal oder über ZimaOS App Store)

### Installation
```bash
git clone https://github.com/tolgaguensal-lab/stickwerk-studio.git
cd stickwerk-studio
npm install
```

### Environment Variables
```bash
cp .env.example .env
# .env mit eigenen Werten ausfüllen
```

### Entwicklungsserver
```bash
npm run dev
```

### Build
```bash
npm run build
npm run start
```

### Tests
```bash
npm run lint        # ESLint
npm run test:e2e    # Playwright E2E Tests
```

---

## 🐳 Deployment

### Docker Image
```
ghcr.io/tolgaguensal-lab/stickwerk-studio:latest
```

### Auf ZimaOS deployen
```bash
# 1. zimaos-compose.yml und .env auf ZimaOS kopieren
# 2. Container starten:
docker compose -f deploy/zimaos-compose.yml pull
docker compose -f deploy/zimaos-compose.yml up -d
```

### Pangolin Resource Target
```
http://<ZIMAOS-IP>:3034
```

Siehe [DEPLOYMENT.md](./DEPLOYMENT.md) für detaillierte Deployment-Anleitung.

---

## 📄 Dokumentation

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Vollständige Deployment-Anleitung
- [docs/DESIGN-COMPLIANCE.md](./docs/DESIGN-COMPLIANCE.md) - Design-System Compliance
- [docs/DSGVO-CHECKLISTE.md](./docs/DSGVO-CHECKLISTE.md) - DSGVO-Checkliste
- [docs/PANGOLIN-ZIMAOS-DEBUG.md](./docs/PANGOLIN-ZIMAOS-DEBUG.md) - Debug-Dokumentation

---

## 📅 Roadmap

- [x] Patch-Konfigurator (11 Schritte)
- [x] Admin-Dashboard
- [x] Docker Deployment
- [x] Pangolin Integration
- [x] PocketBase Backend
- [x] Originäres Design-System
- [ ] E2E Tests vollständig
- [ ] E-Mail-Benachrichtigungen
- [ ] DSGVO finale Prüfung

---

© 2026 Stickwerk-Studio. All rights reserved.
