# 📜 Stickwerk-Studio — Complete Project History

**Von der ersten Idee bis zum Premium-Redesign.**
*Stand: 01. Juni 2026 | Version 0.4.0*

---

## Überblick

Dieses Dokument beschreibt die vollständige Entwicklungsreise von Stickwerk-Studio
von Sekunde 1 bis heute. Es dient als zentrale Referenz, um alle Entscheidungen,
Architekturwechsel und Meilensteine nachvollziehen zu können.

---

## 📦 Phase 0: Projekt-Setup (v0.0.0 → v0.1.0)

*Zeitraum: 27. Mai 2026*

### Initiale Entscheidungen

| Entscheidung | Gewählt | Begründung |
|-------------|---------|------------|
| **Framework** | Next.js 16 (App Router) | Modernstes React-Framework, optimiert für SEO und DX |
| **Sprache** | TypeScript | Typsicherheit für Produktionscode |
| **Styling** | Tailwind CSS + eigenes Design-System | Maximale Flexibilität ohne CSS-in-JS Overhead |
| **Datenbank** | Prisma (initial) → PocketBase (später) | Einfaches Schema, später auf PocketBase gewechselt |
| **Deployment** | Docker + ZimaOS | Zielplattform ist das Heim-Server-Setup |
| **Reverse Proxy** | Pangolin | Tunnel-Lösung für ZimaOS im Heimnetz |

### Erste Commits

```
833c531 Initial commit: Stickwerk-Studio project setup
2bcc8fb docs: update README with modern professional layout
5af6c74 ci: add github action for docker publish
```

**Key-Dateien beim Setup:**
- `package.json` mit Next.js 16, React 19, TypeScript
- `next.config.ts` — Turbopack, MDX
- `Dockerfile` — Multi-Stage Build für optimierte Images
- `deploy/zimaos-compose.yml` — Docker-Compose für ZimaOS

---

## 🎨 Phase 1: Erstes Design & Layout (v0.1.0)

*Zeitraum: 27. Mai 2026*

### Design-Richtung

Das erste Design setzte auf eine **Forest-Green & Gold-Palette**:
- Waldgrün (`#2D5016`) als Primärfarbe — Natur, Handwerk, Nachhaltigkeit
- Gold (`#C5A059`) als Akzent — Wertigkeit, Premium
- Helle Hintergründe für Lesbarkeit

### Wichtige Commits

```
c869cbb style: integrate brand logo and update theme colors to forest-green and gold
4032590 feat: redesign landing page with brand identity and logo
2ba758b feat: redesign landing page with high-end branding, animations and new DB schema
6574e80 feat: implement interactive patch calculator and integrate into home page
```

### Gebaut in dieser Phase

| Feature | Details |
|---------|---------|
| **Landing Page** | Hero, Services, Zielgruppen, Prozess, Vertrauen, FAQ, CTA, Footer |
| **Patch Calculator** | 11-Schritte-Konfigurator mit Preisberechnung (useReducer + Context) |
| **Admin Dashboard** | Lead-Verwaltung mit Status-Tracking |
| **API Routes** | `/api/contact`, `/api/health`, `/api/leads`, `/api/leads/[id]` |
| **Rechtliche Seiten** | Impressum, Datenschutz, AGB |
| **Kontaktseite** | Formular mit Validierung |

### Animations-Stack (Holy Trinity)

```
8019f9f feat: implement holy trinity (lenis, r3f, framer)
```

- **Lenis** — Smooth Scrolling
- **React Three Fiber (r3f)** — 3D-Elemente
- **Framer Motion** — UI-Animationen

---

## 🐳 Phase 2: Docker & Deployment (v0.2.0)

*Zeitraum: 28. Mai 2026*

### Deployment-Architektur

```
Internet / Besucher
    ↓
https://sws.guenlab.de
    ↓
VPS mit Pangolin / Traefik / Gerbil
    ↓
Newt Tunnel (reverse Tunnel)
    ↓
ZimaOS im Heimnetz
    ↓
Docker-Container stickwerk-app auf ZimaOS
    ↓
Interne App-Adresse: http://<ZIMAOS-IP>:3034
```

### GitHub Actions Pipeline

| Stage | Aktion |
|-------|--------|
| **Build** | `npm ci`, `npm run build` |
| **Docker** | `docker buildx` mit GHCR |
| **Tag** | Auto-Release-Tag bei Push auf `main` |
| **Deploy** | ZimaOS pullt `:latest` via Watchtower/pull_policy |

### Wichtige Meilensteine

```
6b65f81 chore: release version 0.2.0
4326f03 feat: semantic versioning with auto-update
c56d606 feat: add custom SVG favicon matching logo design
```

**Key-Entscheidungen:**
- ✅ Versionierte Tags (`v0.2.0`) für reproduzierbare Deployments
- ✅ `pull_policy: always` für Auto-Updates (statt Watchtower)
- ✅ Standalone Next.js Output für optimierte Docker-Images
- ✅ Healthcheck unter `/api/health` für Pangolin-Kompatibilität

---

## 🗄️ Phase 3: PocketBase Backend (v0.3.0)

*Zeitraum: 28. Mai 2026*

### Migration: Prisma → PocketBase

| Aspekt | Prisma (alt) | PocketBase (neu) |
|--------|-------------|-------------------|
| **DB-Engine** | SQLite (embedded) | SQLite (eigener Service) |
| **Hosting** | Im Docker-Container | ZimaOS App Store |
| **API** | Prisma Client | REST + SDK |
| **Auth** | NEXTAUTH_URL | Integriert (optional) |
| **Admin UI** | Prisma Studio | PocketBase Admin (`/_/`) |
| **Setup** | `npx prisma generate` | App Store installieren |

**Warum PocketBase?**
- ZimaOS App Store bietet 1-Click-Installation
- Eingebautes Admin-UI für Lead-Management
- Weniger Code im Next.js-Container
- Echtzeit-Features (optional)

### Wichtige Commits

```
9e44165 feat: pocketbase backend and zimaos pangolin deployment
5a9365a chore: release version 0.3.0 - PocketBase backend
b29897e refactor: remove pocketbase from docker
```

### CI/CD-Anpassungen

```
3af340e fix(ci): remove unnecessary prisma validate step from docker workflow
7315eb0 fix(ci): simplify flows - use latest tag
```

**Gelernt:** Prisma `validate`-Schritt nicht nötig wenn kein Prisma verwendet wird.

---

## 🖌️ Phase 4: Originäres Design-System (v0.4.0)

*Zeitraum: 29. Mai 2026*

### Ausgangslage

Das erste Design-System war von einem Hochzeits-Design (`DESIGN.md`) inspiriert.  
Nach einer Compliance-Prüfung wurde ein **100% originäres Design-System** entwickelt.

### Erster Versuch: Industrial Theme

| Token | Wert | Bedeutung |
|-------|------|-----------|
| **Industry Gray** | `#1E1E1E` | Primär, Text — Professionalität |
| **Machinery Silver** | `#F5F5F5` | Hintergrund — Sauberkeit |
| **Precision Blue** | `#0066CC` | Akzente — Vertrauen, Technologie |
| **Craft Gold** | `#C5A059` | CTA — Handwerkskunst, Wert |

**Probleme:**
- Zu kalt, zu industriell
- Precision Blue passte nicht zum Handwerk
- Fehlende Wärme für eine Manufaktur

### Zweiter Versuch: Warm Cream/Eggshell Palette

Der Durchbruch kam mit der Entscheidung für Wärme statt Industrie:

| Token | Wert | Rolle |
|-------|------|-------|
| **Background** | `#F7F1E6` | Seitenhintergrund (warme Eierschale) |
| **Foreground** | `#111111` | Primärtext (fast Schwarz) |
| **Card** | `#FFF8EC` | Kartenoberflächen (warmes Off-White) |
| **Accent** | `#8A6A3F` | Akzente, Buttons (edles Goldbraun) |
| **Border** | `#D8C7AE` | Rahmenlinien (warmes Beige) |
| **Surface Muted** | `#EFE3D0` | Kontrastierende Abschnitte |
| **Muted Foreground** | `#3A332C` | Sekundärtext (dunkles Espresso) |
| **Success** | `#1F6B3A` | Erfolgsmeldungen (gedecktes Grün) |
| **Destructive** | `#8B1E1E` | Fehlermeldungen (gedecktes Rot) |

### Typografie

| Font | Einsatz | Lizenz |
|------|---------|--------|
| **Playfair Display** | Headlines, Logo (Serif) | MIT (Google Fonts) |
| **Inter** | Body, UI (Sans-Serif) | MIT (Google Fonts) |

### Changelog der Design-Entwicklung

```
f9e50b6 Redesign: Claude Type-inspired design system (Midnight Ink, Canvas White, Signal Green)
cf5c2b4 feat: warm cream/eggshell palette with semantic CSS variables
a04a208 feat: Button, Badge, Input auf semantische Farben umgestellt
a4de6ab feat: Tabs, Sheet, Accordion auf semantische Farben umgestellt
ffe8c03 feat: Layout, Navbar und Scene an warme Palette angepasst
1134aca feat: Homepage mit warmen Gold/Braun-Akzenten statt Grün
6f2ad62 feat: Kontakt, Impressum, Datenschutz, AGB an warme Palette angepasst
517f907 feat: UI-Verfeinerungen — Typografie, Abstände, Kartenstyling
82cdcf4 fix: Primary-Farbe von Schwarz #111111 auf Gold/Braun #8A6A3F geändert
```

### Laufende Optimierungen

```
8eb4229 fix: Button-Design — transparente Buttons, Gold Step-Kreise
77e80a3 feat: Navbar-Redesign — größeres Logo, aktive Indikatoren, Scroll-Transparenz
c4fcff7 fix: define design system sizes and visual standards
bd7e5af fix: Produktions-Qualität — Icons, Typografie, Design-Tokens
```

---

## ✨ Phase 5: Premium Refresh (v0.4.0 - aktuell)

*Zeitraum: 31. Mai — 01. Juni 2026*

### Umfang

Dieses Update war das bisher größte visuelle Redesign:

| Bereich | Umfang | Status |
|---------|--------|--------|
| **Design System** | Komplette Überarbeitung globals.css | ✅ |
| **Navbar** | Premium sticky mit backdrop-blur, mobile Sheet | ✅ |
| **Landing Page** | Alle 9 Sektionen überarbeitet | ✅ |
| **PatchCalculator** | Premium Configurator mit Staffelpreisen | ✅ |
| **Kontaktseite** | An Design-System angeglichen | ✅ |
| **Error Pages** | 404 und Error-Boundary hinzugefügt | ✅ |
| **Dark Mode** | CSS-Variablen in globals.css vorbereitet | ✅ |
| **Logos** | currentColor für Dark-Mode-Kompatibilität | ✅ |
| **Build** | Lint-Errors behoben, Build sauber | ✅ |

### Detail: Neue visuelle Sprache

Das Premium-Refresh setzte auf diese Prinzipien:

1. **Warme Creme-Palette** — Keine harten schwarzen Balken mehr
   - CTA-Bereich: `from-[#3A332C] via-[#4A3F36] to-[#2D2823]` (warmer Braun-Gradient)
   - Footer: `#2D2823` (warmer Dunkelbraun statt Schwarz)

2. **Goldbraun (#8A6A3F) als primärer Akzent**
   - Buttons (primary), Badges (active), Section-Indikatoren
   - Kein Schwarz mehr als Primary

3. **Playfair Display als Headline-Font**
   - Edle Serif für Überschriften (clamp-basiert responsive)
   - Moderne Sans-Serif (Inter) für Body-Text

4. **Premium Card-Design**
   - 24px Border-Radius, sanfte Schatten
   - Card-Hover: Lift-Effekt + Shadow-Boost
   - Section-Divider: Goldener Strich (60px × 2px)

5. **Framer Motion Scroll-Reveals**
   - whileInView mit einmaliger Animation
   - Gestaffelte Animation für Cards und Sektionen
   - prefers-reduced-motion: deaktiviert alle Animationen

6. **Backdrop-Blur-Navbar**
   - Fixiert mit dynamischer Border beim Scrollen
   - Mobile: Sheet von rechts (Radix Dialog)
   - Active-Indikator mit Framer Motion Spring-Animation

### Build-Fixes

Während der Entwicklung aufgetretene Fehler und deren Behebung:

| Problem | Ursache | Lösung |
|---------|---------|--------|
| `'textContainer' is not a valid Layout prop` | Framer Motion API geändert | Auf `layout` reduziert |
| `Event handlers cannot be passed to Client Component props` | Fehlendes `"use client"` | Zu allen UI-Komponenten + not-found.tsx hinzugefügt |
| `Parsing error: ')' expected` | Syntaxfehler in visual-design.spec.ts | Pre-existing (nicht behoben) |

### Letzte Commits

```
9b3e7b4 chore: ignore build artifacts and session files
8d46e38 feat: warm cream/gold design system mit Playfair Display
b3799cc fix: logo-SVGs auf currentColor für Dark-Mode-Kompatibilität
3a906d1 fix: 'use client' zu UI-Komponenten hinzugefügt
628ba5a feat: premium sticky navbar mit backdrop-blur und mobilem Sheet
4742fe8 feat: redesign aller Landing-Page-Sektionen und Error-Pages
74a9fef fix: Kontaktseite an Design-System-Tokens angeglichen
d263961 chore: Konfiguration und README aktualisiert
```

---

## 🔮 Roadmap & Ausblick

### Abgeschlossen ✅

- [x] Projekt-Setup mit Next.js 16 + TypeScript
- [x] Interaktiver Patch-Konfigurator (11 Schritte)
- [x] Admin-Dashboard mit Lead-Verwaltung
- [x] Docker + ZimaOS Deployment Pipeline
- [x] Pangolin Reverse Proxy Integration
- [x] PocketBase Backend
- [x] Originäres, warmes Design-System (Creme/Gold)
- [x] Premium Visual Refresh mit Playfair Display
- [x] DSGVO-konforme rechtliche Seiten

### Noch offen ⏳

- [ ] E2E Tests vollständig (visual-design.spec.ts hat Syntaxfehler)
- [ ] E-Mail-Benachrichtigungen für neue Leads
- [ ] DSGVO finale rechtliche Prüfung
- [ ] Analytics DSGVO-konform integrieren
- [ ] Social Media Meta Tags optimieren (Open Graph)
- [ ] Datei-Upload im Patch-Konfigurator (Server-seitig)

---

## 📊 Projekt-Statistiken

| Metrik | Wert |
|--------|------|
| **Erster Commit** | 27. Mai 2026 |
| **Gesamt-Commits** | 72+ |
| **Versionen** | v0.0.0 → v0.4.0 |
| **Aktive Branches** | `main` (Trunk-based) |
| **PHP (nein)** | Next.js Fullstack |
| **Datenbank** | PocketBase (extern) |
| **Deployment** | Docker + GHCR + ZimaOS |
| **Lines of Code** | ~10.000+ (TypeScript) |

---

## 👥 Team

- **Tolga Günsal** — Projekt-Inhaber, Produktmanagement
- **Sisyphus (AI Agent)** — Entwicklung, Architektur, Design

---

*Dieses Dokument wird mit jeder Version aktualisiert.*  
*Letzte Aktualisierung: 01. Juni 2026*
