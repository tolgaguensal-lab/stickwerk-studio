# 🧵 Stickwerk-Studio

**Fäden, die Marken sichtbar machen.**

> ⚠️ **Legal Notice:** This project is proprietary. All rights reserved. Unauthorized use, reproduction, or distribution of this software is strictly prohibited. See [LICENSE](./LICENSE) for details.

Professionelle Website für Maschinenstickerei und Custom Patches im DACH-Raum. Interaktiver Patch-Kontaktformular, Lead-Verwaltung und Admin-Dashboard.

---

## ✨ Features

### Für Kunden
- **Patch-Kontaktformular** mit 11-Schritte-Konfigurator
- **Preisberechnung** in Echtzeit basierend auf Größe, Komplexität und Menge
- **Kontaktformular** mit Datenschutz-Checkbox
- **Rechtliche Seiten** (Impressum, Datenschutz, AGB)

### Für Administration
- **Admin-Dashboard** zur Lead-Verwaltung
- **Status-Tracking** (new → contacted → quoted → won/lost)
- **PocketBase** als datastore (über ZimaOS App Store)

---

## 🚀 Tech Stack

| Layer | Technologie |
|-------|-------------|
| **Framework** | Next.js 16 (App Router) |
| **Sprache** | TypeScript |
| **Styling** | Tailwind CSS |
| **Animation** | Framer Motion |
| **Datenbank** | PocketBase (ZimaOS App Store) |
| **Deployment** | Docker + ZimaOS + Pangolin |

---

## 🏗️ Projektstruktur

```
stickwerk-studio/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── admin/        # Admin-Dashboard
│   │   ├── api/          # API-Routes
│   │   ├── kontakt/      # Kontaktformular
│   │   ├── impressum/    # Impressum
│   │   ├── datenschutz/  # Datenschutzerklärung
│   │   └── agb/          # AGB
│   ├── components/       # React-Komponenten
│   │   ├── PatchCalculator.tsx
│   │   ├── Navbar.tsx
│   │   └── ui/           # UI-Komponenten
│   └── lib/              # Hilfsfunktionen
│       └── pocketbase/   # PocketBase Client
├── public/
│   ├── images/           # Hintergrundbilder (CC0 lizenziert)
│   └── logo.jpg          # Firmen-Logo
├── deploy/               # Docker Compose für ZimaOS
├── docs/                 # Dokumentation
├── scripts/              # Hilfsscripts
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
# .env编辑ieren
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

### ZimaOS Setup
1. PocketBase über App Store installieren
2. `deploy/zimaos-compose.yml` auf ZimaOS kopieren
3. `.env` mit PocketBase-Zugangsdaten erstellen
4. Container starten:
```bash
docker compose -f zimaos-compose.yml pull
docker compose -f zimaos-compose.yml up -d
```

### Pangolin Resource Target
```
http://<ZIMAOS-IP>:3034
```

Siehe [DEPLOYMENT.md](./DEPLOYMENT.md) für Details.

---

## 🎨 Assets & Lizenzen

### Bilder in `public/images/`
Die Hintergrundbilder sind **CC0-lizenziert** von [Unsplash](https://unsplash.com) und frei für kommerzielle Nutzung
ohne Attribution (Quellenangabe) erforderlich.

| Datei | Beschreibung | Quelle |
|-------|--------------|---------|
| `embroidery-machine.jpg` | Stickmaschine (Process Section Hintergrund) | [Unsplash](https://unsplash.com) CC0 |
| `embroidery-closeup.jpg` | Nahaufnahme Stickerei (Calculator Section Hintergrund) | [Unsplash](https://unsplash.com) CC0 |
| `texture-fabric.jpg` | Textilstuktur (Trust Section Hintergrund) | [Unsplash](https://unsplash.com) CC0 |

** Lizenzbestätigung**: Alle Bilder unterliegen der [Unsplash Lizenz](https://unsplash.com/license), die kostenlose Nutzung für kommerzielle und nicht-kommerzielle Zwecke ohne Attribution erlaubt.

---


## 📄 Dokumentation

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment-Anleitung
- [docs/PANGOLIN-ZIMAOS-DEBUG.md](./docs/PANGOLIN-ZIMAOS-DEBUG.md) - Debug-Dokumentation
- [docs/DSGVO-CHECKLISTE.md](./docs/DSGVO-CHECKLISTE.md) - DSGVO-Checkliste

---

## 📅 Roadmap

- [x] Patch-Kontaktformular (11 Schritte)
- [x] Admin-Dashboard
- [x] Docker Deployment
- [x] Pangolin Integration
- [x] PocketBase Backend
- [ ] E2E Tests vollständig
- [ ] E-Mail-Benachrichtigungen
- [ ] DSGVO finale Prüfung

---

© 2026 Stickwerk-Studio. All rights reserved.
