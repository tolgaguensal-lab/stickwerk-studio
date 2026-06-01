# Changelog

Alle bemerkenswerten Änderungen an diesem Projekt werden in dieser Datei dokumentiert.

Das Format basiert auf [Keep a Changelog](https://keepachangelog.com/de/1.0.0/),
und dieses Projekt hält sich an [Semantic Versioning](https://semver.org/de/).

## [0.4.0] - 2026-06-01

### Added
- Komplett originäres Design-System für Stickwerk-Studio (100% Eigenentwicklung)
- Neue Farbpalette: Industry Gray, Machinery Silver, Precision Blue, Craft Gold
- Warme Creme/Gold-Palette (`#F5EDE0`, `#FCF7EF`, `#8A6A3F`) als finales Branding
- Eigene Typografie: Playfair Display (Serif) + Inter (Sans-Serif) via Google Fonts
- DESIGN-COMPLIANCE.md mit vollständiger Compliance-Dokumentation und Audit-Trail
- Neue Button-Varianten: gold, primary, destructive, outline, secondary
- Neue Badge-Varianten: default, gold, secondary, outline
- Error-Boundary-Seite (`error.tsx`) für bessere UX bei Laufzeitfehlern
- 404-Seite (`not-found.tsx`) mit Navigation zurück
- Dark-Mode CSS-Variablen in globals.css vorbereitet

### Premium Refresh (v0.4.0 — Juni 2026)
- **Globals.css:** Komplett überarbeitet — warme Creme-Palette, Gold-Akzente, Section-Spacing, Premium Card-Shadows, Section-Divider
- **Navbar:** Premium sticky mit backdrop-blur, dynamischer Border beim Scrollen, Gold Active-Indikator mit Spring-Animation, mobiles Sheet-Menü (Radix Dialog)
- **Landing Page:** Alle 9 Sektionen (Hero, Features, Zielgruppen, Prozess, Trust, FAQ, CTA, Footer) mit premium Cards, Framer Motion Scroll-Reveals, warmen CTA-Gradient statt schwarzem Block
- **CTA-Bereich:** Warmer Braun-Gradient (`from-[#3A332C] via-[#4A3F36] to-[#2D2823]`) statt schwarz
- **Footer:** Warmer Dunkelbraun (`#2D2823`) statt schwarz
- **Hero:** Logo-Container mit Card-Border, zwei CTAs, gestaffelte Animationen
- **PatchCalculator:** Premium-Styling mit Gold-Preis, 11 animierten Schritten, Staffelpreisen
- **Prozess-Sektion:** 5 Cards mit Icons in Gold-Akzent-Boxen, connectoren auf Desktop
- **Zielgruppen-Sektion:** 4 Cards mit goldenem Top-Border
- **Vertrauens-Sektion:** Framer Motion Scroll Reveals, Trust-Facts-Statistiken

### Changed
- **Version 0.3.0 → 0.4.0**
- Alle UI-Komponenten auf neues Design-System migriert (Button, Card, Input, Tabs, Sheet, Accordion, Badge)
- Alle Seiten aktualisiert: page.tsx, kontakt, impressum, datenschutz, agb
- Docker-Publish Workflow: YAML-Indentation korrigiert
- `.gitignore`: Alte Prisma-Referenz entfernt, Build-Artifacts hinzugefügt
- Farbpalette finalisiert: warme Creme/Gold statt kühlem Industrie-Grau/Blau
- README.md auf v0.4.0 Premium Refresh aktualisiert
- CHANGELOG.md auf 1. Juni 2026 aktualisiert

### Removed
- Alte `accent`-Varianten aus Button/Badge (ersetzt durch `gold`)
- `prisma/` Verzeichnis (wird nicht mehr verwendet, PocketBase stattdessen)
- `opencode.json` Backup/Fehler-Dateien
- `update.sh` (veraltetes Script, neues `:latest`-Schema)
- Schwarze Farbe aus CTA-Bereich und Footer

### Fixed
- CSS-Syntaxfehler in globals.css (`--color primary` → entfernt)
- TypeScript-Fehler: `getStatusBadge` in admin/page.tsx auf `gold` aktualisiert
- Inkonsistente YAML-Einrückung in docker-publish.yml
- Doppelter Build-Schritt in auto-deploy.yml entfernt
- Fehlende `"use client"` Directives in UI-Komponenten (Button, Card, Input, Badge, Accordion, Tabs, not-found.tsx)
- Logo-SVGs: `#111111` → `currentColor` für Dark Mode Kompatibilität
- Kontaktseite: Border/Background-Tokens an Design-System angeglichen
- Doppelter Icon-Eintrag in Trust Facts (page.tsx)
- Section-Divider von inline auf zentrale CSS-Klasse umgestellt
- Framer Motion `textContainer` → `layout` Prop (API-Änderung)

## [0.3.0] - 2026-05-29

### Added
- Git-Tag-Erstellung im Docker-Publish Workflow (v<version>.<run-number>)
- Optimierte ZimaOS-Compose mit `:latest` Tag

### Changed
- Healthcheck von `/` auf `/api/health` geändert (Pangolin-Kompatibilität)
- CTA-Buttons mit scrollToSection/mailto-Funktionalität

### Fixed
- 503 "no available server" durch korrekten Pangolin-Healthcheck

## [0.2.1] - 2026-05-28

### Added
- Healthcheck-Route `/api/health` für Docker und Pangolin
- ZimaOS Compose-Datei (`deploy/zimaos-compose.yml`) mit Healthcheck
- DEPLOYMENT.md mit Pangolin-Dokumentation
- Standalone-Output für Next.js Docker

### Changed
- Start-Script: `next start -H 0.0.0.0 -p 3000` (bindet auf alle Interfaces)
- Dockerfile: Nutzt `npm ci` statt `npm install`
- Dockerfile: Eigener HEALTHCHECK-Befehl
- Dockerfile: Server startet mit `node server.js` (Standalone)

### Fixed
- Container war nur über localhost erreichbar (jetzt 0.0.0.0)
- Kein Healthcheck für Docker/Pangolin verfügbar

## [0.2.0] - 2026-05-28

### Added
- Semantische Versionierung mit automatischen Git-Tags
- GitHub Actions Workflow erstellt Version-Tags bei Push auf main
- Auto-Update-Script (`update.sh`) für ZimaOS Deployment
- Custom SVG-Favicon passend zum Logo
- Metadata in Layout.tsx für SEO und Favicon-Referenzen

### Changed
- Docker-Compose nutzt versionierte Image-Tags (z.B. `v0.2.0`)
- GitHub Actions Workflow erstellt jetzt automatisch Tags
- `.env.example` mit allen benötigten Variablen für Pangolin

### Fixed
- Docker Build-Fehler durch entfernte Sentry-Konfigurationsdateien
- Docker GHA Cache Backend Fehler in CI/CD
- Hardcodierte Secrets in docker-compose.zima.yml durch Env-Vars ersetzt

### Removed
- Sentry-Konfigurationsdateien (nicht mehr benötigt)
- Watchtower (durch `pull_policy: always` ersetzt)
- Veraltete `version: '3.8'` aus docker-compose

## [0.1.0] - 2026-05-27

### Added
- Initiale Projektstruktur mit Next.js 16
- PatchCalculator mit 11 Schritten
- Admin-Dashboard für Lead-Verwaltung
- API-Endpoints für Leads (CRUD)
- Rechtliche Seiten (Impressum, Datenschutz, AGB)
- Kontakt-Seite mit Formular
- Docker-Compose für ZimaOS
