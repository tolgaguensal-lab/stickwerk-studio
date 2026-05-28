# Changelog

Alle bemerkenswerten Änderungen an diesem Projekt werden in dieser Datei dokumentiert.

Das Format basiert auf [Keep a Changelog](https://keepachangelog.com/de/1.0.0/),
und dieses Projekt hält sich an [Semantic Versioning](https://semver.org/de/).

## [0.2.1] - 2026-05-28

### Added
- Healthcheck-Route `/api/health` für Docker und Pangolin
- ZimaOS Compose-Datei (`deploy/zimaos-compose.yml`) mit Healthcheck
- DEPLOYMENT.md mit Pangolin-Dokumentation
- Standalone-Output für Next.js Docker

### Changed
- Start-Script: `next start -H 0.0.0.0 -p 3000` ( bindet auf alle Interfaces)
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

### Changed
- Keine vorherigen Versionen

## [Unreleased]

### Geplant
- Prisma-Migrationen für Produktionsdatenbank
- E2E-Tests mit Playwright
- Performance-Optimierung
