# 🧵 Stickwerk-Studio

**Fäden, die Marken sichtbar machen.** v0.6.0

> ⚠️ **Legal Notice:** This project is proprietary. All rights reserved. Unauthorized use, reproduction, or distribution of this software is strictly prohibited. See [LICENSE](./LICENSE) for details.

Professionelle Website für Maschinenstickerei und Custom Patches im DACH-Raum. Interaktiver Patch-Konfigurator, Lead-Management und Admin-Dashboard. Läuft produktiv auf **ZimaOS** mit CasaOS-Integration, automatischen Updates und CI/CD.

---

## ✨ Features

### Für Kunden
- **Über-uns-Seite** (`/ueber-uns`) mit Geschichte, Werten, Team und Maschinen-Statistiken
- **FAQ-Seite** (`/faq`) mit 17 Fragen in 4 Kategorien
- **Preisrechner** (`/preise`) — interaktiver Rechner für Kostenschätzung (±20%)
- **Patch-Konfigurator** mit 11-Schritte-Konfigurator und Echtzeit-Preisberechnung
- **Kontaktformular** mit DSGVO-konformer Datenschutz-Checkbox
- **Rechtliche Seiten** (Impressum, Datenschutz, AGB)
- **Warm Cream/Eggshell Design-System** mit warmer Creme-Palette, edlem Goldbraun-Akzent und handwerklicher Ästhetik

### Für Administration
- **Admin-Dashboard** zur Lead-Verwaltung
- **Status-Tracking** (new → in_progress → completed → cancelled)
- **E-Mail-Benachrichtigungen** bei neuen Leads (über SMTP)
- **Health-Endpoint** (`/api/health`) mit SQLite-Check, Migrationen und Container-Healthcheck

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
| **Datenbank** | SQLite (via Drizzle ORM + better-sqlite3) |
| **Deployment** | Docker + ZimaOS + CasaOS |
| **Auto-Updates** | Watchtower (label-basiert) |
| **CI/CD** | GitHub Actions → ghcr.io |
| **Monitoring** | Sentry (Frontend + Backend) |

---

## 🎨 Design-System

Warmes, handwerkliches Farbschema inspiriert von Eierschale, Creme und edlem Braun:

| Token | Wert | Verwendung |
|-------|------|------------|
| **Background** | `#F7F1E6` | Seitenhintergrund (warme Eierschale) |
| **Foreground** | `#111111` | Primärtext (fast Schwarz) |
| **Card** | `#FFF8EC` | Kartenoberflächen (warmes Off-White) |
| **Accent** | `#8A6A3F` | Akzente, Buttons (edles Goldbraun) |
| **Border** | `#D8C7AE` | Rahmenlinien (warmes Beige) |
| **Surface Muted** | `#EFE3D0` | Kontrastierende Abschnitte |
| **Muted Foreground** | `#3A332C` | Sekundärtext (dunkles Espresso) |
| **Success** | `#1F6B3A` | Erfolgsmeldungen (gedecktes Grün) |
| **Destructive** | `#8B1E1E` | Fehlermeldungen (gedecktes Rot) |

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
│   │   ├── ueber-uns/    # Über-uns-Seite
│   │   ├── faq/          # FAQ-Seite
│   │   ├── preise/       # Preisrechner
│   │   ├── datenschutz/  # Datenschutzerklärung
│   │   └── agb/          # AGB
│   ├── components/       # React-Komponenten
│   │   ├── PatchCalculator.tsx
│   │   ├── Navbar.tsx
│   │   ├── Scene.tsx
│   │   ├── SmoothScroll.tsx
│   │   └── ui/           # UI-Komponenten (Button, Card, Input, etc.)
│   └── lib/              # Hilfsfunktionen
│       ├── db/           # Drizzle ORM (SQLite)
│       └── auth/         # Admin JWT Session
├── deploy/               # Deployment-Konfiguration (ZimaOS Docker Compose)
├── docs/                 # Dokumentation
├── scripts/              # Backup-, Migrations- und Debug-Scripts
│   ├── backup-db.sh      # Tägliches SQLite-Backup (Cron)
│   ├── seed.ts           # Demo-Daten (Leads + Orders)
│   └── migrate-pg-to-sqlite.ts
├── .github/workflows/    # CI/CD (Docker Build & Push)
└── tests/                # E2E Tests (Playwright)
```

---

## 🛠️ Entwicklung

### Voraussetzungen
- Node.js 20+

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

### Automatischer Build (CI/CD)
Jeder Push auf `main` triggert eine GitHub Action:
1. Lint + Build (Node.js)
2. Docker-Image bauen
3. Push zu `ghcr.io/tolgaguensal-lab/stickwerk-studio:latest`

### Auf ZimaOS deployen

#### 1. Vorbereitung
```bash
git clone https://github.com/tolgaguensal-lab/stickwerk-studio.git
cd stickwerk-studio/deploy
cp zimaos.env.example zimaos.env
# zimaos.env mit eigenen Secrets füllen
```

`.env`-Variablen (nie im Git — automatisch in `.gitignore`):
```
NODE_ENV=production
PORT=3000
DATABASE_URL=/data/stickwerk.db          # SQLite-DB im Volume
SESSION_SECRET=<random-hex>
ADMIN_USER=<email>
ADMIN_PASSWORD=<password>
SENTRY_DSN=<optional>
SMTP_HOST=<optional>                     # E-Mail-Benachrichtigungen
SMTP_PORT=587
SMTP_USER=<optional>
SMTP_PASS=<optional>
SMTP_FROM=<optional>
```

#### 2. Container starten
```bash
docker compose -f deploy/zimaos-compose.yml pull
docker compose -f deploy/zimaos-compose.yml up -d
```

#### 3. CasaOS-Integration
Die Compose-Datei enthält CasaOS-Labels für die Anzeige im ZimaOS-Dashboard. Für vollständige CasaOS-Verwaltung:
```bash
casaos-cli app-management install -f deploy/zimaos-compose.yml
```

Die App erscheint dann im CasaOS-Dashboard mit Start/Stop/Restart-Buttons.

#### 4. Auto-Updates mit Watchtower
Watchtower läuft als Sidecar-Container und updated `stickwerk-app` automatisch, sobald ein neues Image auf `ghcr.io` erscheint.
- Prüft alle 60 Minuten
- Label-basiert: nur Container mit `com.centurylinklabs.watchtower.enable=true` werden geupdatet
- Alte Images werden automatisch aufgeräumt (`WATCHTOWER_CLEANUP=true`)

#### 5. Datenbank-Backup
Tägliches SQLite-Backup um 03:00 Uhr via Cron:
```bash
# Einrichtung (einmalig):
crontab -e
# Eintrag:
0 3 * * * /DATA/stickwerk-studio/scripts/backup-db.sh
```

Backups landen in `/DATA/backups/stickwerk/` mit 30 Tagen Retention.

### Health-Endpoint
```
GET /api/health
```
Liefert JSON mit App-Status, Datenbank-Verbindung und Tabellen-Status:
```json
{
  "status": "ok",
  "service": "stickwerk-studio",
  "checks": {
    "app": "ok",
    "database_url": "gesetzt",
    "database_reachable": "SQLite-Verbindung OK",
    "database_query": "leads-Tabelle OK (6 Einträge)"
  }
}
```
Wird auch vom Docker-Healthcheck genutzt (intervall: 30s, start_period: 60s, retries: 3).

### Pangolin Resource Target
```
http://<ZIMAOS-IP>:3034
```

---

## 📄 Dokumentation

- [docs/DESIGN-COMPLIANCE.md](./docs/DESIGN-COMPLIANCE.md) — Design-System Compliance
- [docs/DSGVO-CHECKLISTE.md](./docs/DSGVO-CHECKLISTE.md) — DSGVO-Checkliste
- [docs/PANGOLIN-ZIMAOS-DEBUG.md](./docs/PANGOLIN-ZIMAOS-DEBUG.md) — Debug-Dokumentation

---

## 📅 Roadmap

- [x] Patch-Konfigurator (11 Schritte)
- [x] Admin-Dashboard mit Lead-Management
- [x] Docker + ZimaOS Deployment (CasaOS-integriert)
- [x] Pangolin Reverse-Proxy
- [x] ~~PostgreSQL~~ → **SQLite** (Port-Konflikt gelöst)
- [x] Originäres Design-System
- [x] Über-uns-Seite, FAQ, Preisrechner
- [x] Auto-Migration + Health-Endpoint
- [x] E-Mail-Benachrichtigungen (SMTP)
- [x] **CI/CD Pipeline** (GitHub Actions → ghcr.io)
- [x] **Watchtower Auto-Updates** (label-basiert)
- [x] **SQLite-Backup** (täglich per Cron)
- [x] **Demo-Data-Seeding** (Leads + Orders)
- [ ] E2E Tests vollständig
- [ ] DSGVO finale Prüfung
- [ ] Admin: Lead-Detail-Ansicht
- [ ] SMTP-Konfiguration über Admin-UI

---

## 🧪 Demo-Daten

```bash
# 6 Leads + 2 Orders in die Datenbank einspielen:
npx tsx scripts/seed.ts
```

---

© 2026 Stickwerk-Studio. All rights reserved.
