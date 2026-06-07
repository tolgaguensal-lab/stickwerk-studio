# Environment-Variablen — Referenz

> **Kopieren:** `cp .env.example .env`
>
> **Docker Compose:** `docker compose --env-file .env up -d`
>
> **ZimaOS:** Env-Vars in der Web UI setzen (siehe deploy/zimaos-compose.yml)

---

## 1. Datenbank (PostgreSQL)

| Variable | Pflicht? | Standard | Beschreibung |
|----------|----------|----------|--------------|
| `DATABASE_URL` | ✅ Ja | — | Vollständige PostgreSQL-Verbindung. Format: `postgresql://user:pass@host:5432/dbname` |
| `POSTGRES_PASSWORD` | ⚪ Nur Compose | `stickwerk_secret_2026` | Wird im docker-compose Stack für den PostgreSQL-Container verwendet. **In Produktion ändern!** |

**Kommentar:** `DATABASE_URL` ist die einzige Variable die die App wirklich braucht.  
`POSTGRES_PASSWORD` wird nur im Docker Compose Stack verwendet — beide Container lesen sie automatisch.

**Beispiele:**
```
# Docker Compose (PostgreSQL läuft im Stack)
DATABASE_URL=postgresql://stickwerk:stickwerk_secret_2026@db:5432/stickwerk

# Externe PostgreSQL (ZimaOS App Store, VPS, managed)
DATABASE_URL=postgresql://user:password@host:5432/dbname

# Supabase / Neon / Cloud SQL
DATABASE_URL=postgresql://postgres:pass@aws-0-eu-west-1.pooler.supabase.com:6543/postgres
```

---

## 2. Admin-Zugang (Pflicht)

| Variable | Pflicht? | Standard | Beschreibung |
|----------|----------|----------|--------------|
| `SESSION_SECRET` | ✅ **Ja** | — | Mindestens 32 Zeichen, zufällig! JWT-Signierung. **Niemals den Default verwenden!** |
| `ADMIN_USER` | ✅ Ja | `admin@stickwerk-studio.de` | E-Mail für den Admin-Login |
| `ADMIN_PASSWORD` | ✅ **Ja** | — | Passwort für den Admin-Login. **In Produktion ein sicheres Passwort wählen!** |

**SESSION_SECRET generieren:**
```bash
# Linux/Mac
openssl rand -hex 32

# Oder:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 3. Öffentliche URLs

| Variable | Pflicht? | Standard | Beschreibung |
|----------|----------|----------|--------------|
| `SITE_URL` | ⚪ Optional | `http://localhost:3034` | Wird für SEO, Sitemap und E-Mail-Links verwendet |
| `NEXT_PUBLIC_BASE_URL` | ⚪ Optional | `http://localhost:3000` | Interne API-URL (nur für server-seitige Fetch-Calls). Meist gleich wie SITE_URL |

**Produktion:**
```
SITE_URL=https://sws.guenlab.de
NEXT_PUBLIC_BASE_URL=https://sws.guenlab.de
```

---

## 4. Docker Compose (nur für docker-compose.yml)

| Variable | Pflicht? | Standard | Beschreibung |
|----------|----------|----------|--------------|
| `PORT` | ⚪ Optional | `3034` | Externer Port für die App (Host -> Container) |

**ZimaOS-Custom:** Der Port ist in `deploy/zimaos-compose.yml` fest auf `3034` gesetzt (keine Variable).

---

## 5. SMTP / E-Mail (optional)

Für Benachrichtigungen bei neuen Kontaktanfragen.

| Variable | Pflicht? | Standard | Beschreibung |
|----------|----------|----------|--------------|
| `SMTP_HOST` | ❌ Nein | `""` (deaktiviert) | SMTP-Server (z.B. `smtp.gmail.com`, `smtp.mailtrap.io`) |
| `SMTP_PORT` | ❌ Nein | `587` | SMTP-Port (587 = STARTTLS, 465 = SSL) |
| `SMTP_USER` | ❌ Nein | `""` | SMTP-Benutzername (meist die E-Mail-Adresse) |
| `SMTP_PASS` | ❌ Nein | `""` | SMTP-Passwort oder App-Passwort |
| `SMTP_FROM` | ❌ Nein | `SMTP_USER` | Absender-E-Mail (wenn nicht gesetzt = SMTP_USER) |
| `NOTIFY_EMAIL` | ❌ Nein | `""` | Empfänger für Benachrichtigungen |

**Aktivieren:** Einfach die Werte setzen — beim nächsten Kontaktformular-Eintrag wird eine E-Mail gesendet.  
**Deaktivieren:** Leer lassen (keine E-Mails, App läuft trotzdem).

**Beispiel Gmail:**
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=deine@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx   (Google App-Passwort, nicht dein normales Passwort!)
SMTP_FROM=deine@gmail.com
NOTIFY_EMAIL=admin@stickwerk-studio.de
```

> **Gmail App-Passwort:** https://support.google.com/accounts/answer/185833

---

## 6. Sentry (optional, Error Tracking)

| Variable | Pflicht? | Standard | Beschreibung |
|----------|----------|----------|--------------|
| `SENTRY_DSN` | ❌ Nein | `""` (deaktiviert) | Sentry DSN für Server + Edge. Einmal in Sentry-Projekt generieren |
| `NEXT_PUBLIC_SENTRY_DSN` | ❌ Nein | Wert von `SENTRY_DSN` | Sentry DSN für Browser. Meist identisch mit `SENTRY_DSN` |
| `SENTRY_AUTH_TOKEN` | ⚪ Build-time | — | Auth-Token für Source-Map-Upload. Nie im Runtime-Container nötig |
| `SENTRY_ORG` | ⚪ Build-time | — | Sentry-Org-Slug (für Source-Map-Upload) |
| `SENTRY_PROJECT` | ⚪ Build-time | — | Sentry-Projekt-Slug (für Source-Map-Upload) |

**Einrichtung (Runtime, im Container / .env):**
1. Account auf https://sentry.io (kostenlos)
2. Neues **Next.js**-Projekt anlegen
3. DSN aus den Projekt-Einstellungen kopieren
4. Hier eintragen:

```
SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/12345
NEXT_PUBLIC_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/12345
```

**Einrichtung (Build-time, in GitHub Actions Secrets):**
Für lesbare Production-Stack-Traces (Source Maps):
1. https://sentry.io/settings/auth-tokens/ → **Create New Token**
2. Scopes: `project:releases` + `org:read`
3. Token in GitHub als Secret `SENTRY_AUTH_TOKEN` speichern
4. Org-Slug in Secret `SENTRY_ORG` speichern (z.B. `tolga-guensal`)
5. Projekt-Slug in Secret `SENTRY_PROJECT` speichern (z.B. `stickwerk-studio`)

Die Build-Args werden im Docker-Build per **BuildKit secrets** übergeben — sie landen **nicht** im finalen Image.

**Was passiert dann automatisch:**
- Jeder 500er / jede Exception wird an Sentry gesendet (Browser, Server, Edge)
- Session Replays (10% Sampling, 100% bei Fehlern) — sieht was der User vor dem Fehler gemacht hat
- Performance-Tracing (100% Dev, 10% Prod) für Server + Client
- `global-error.tsx` fängt alle Root-Layout-Errors
- `onRequestError` fängt alle unhandled Server-Side-Errors
- `onRouterTransitionStart` sendet Spans für App-Router-Navigation

---

## 7. Build-Args (nur für Docker-Build)

Diese Variablen werden beim Erstellen des Docker-Images gesetzt.  
Im GitHub Actions Workflow (`.github/workflows/docker-publish.yml`) automatisch konfiguriert.

| Variable | Pflicht? | Im Workflow | Beschreibung |
|----------|----------|-------------|--------------|
| `APP_VERSION` | Nein | `v{package.json}.{run_number}` | Wird ins public/version.json geschrieben und unter /api/version angezeigt |
| `NEXT_PUBLIC_SITE_URL` | Empfohlen | `vars.NEXT_PUBLIC_SITE_URL` | Wird zur Build-Zeit in SEO-Meta und Sitemap eingebacken |
| `NEXT_PUBLIC_APP_URL` | Empfohlen | `vars.NEXT_PUBLIC_APP_URL` | Gleicher Wert wie SITE_URL |

**Kein Build-Arg nötig:** Build-Args sind nur für Werte die zur **Build-Zeit** feststehen müssen.    
`DATABASE_URL`, `SESSION_SECRET`, `ADMIN_*` etc. werden zur **Laufzeit** gesetzt — dafür reichen die Env-Vars.

---

## 8. Interne Variablen (automatisch gesetzt)

Diese Variablen müssen **nicht** ins .env — sie werden vom System gesetzt:

| Variable | Gesetzt durch | Beispiel |
|----------|--------------|----------|
| `NODE_ENV` | Node.js / Docker | `production`, `development` |
| `HOSTNAME` | Dockerfile / Docker | `0.0.0.0` |
| `PORT` | Dockerfile | `3000` (Container-intern, nicht der Host-Port) |
| `NEXT_PUBLIC_APP_VERSION` | Docker Build-Arg | `v0.6.0.3` |

---

## 9. Vollständige Minimal-Konfiguration

**Was du für einen lokalen Dev-Server mindestens brauchst:**

```bash
# Datenbank
DATABASE_URL=postgresql://casaos:casaos@192.168.178.91:5432/casaos

# Admin
SESSION_SECRET=einen-zufaelligen-session-key-hier-eintragen
ADMIN_USER=admin@stickwerk-studio.de
ADMIN_PASSWORD=test123

# Site
SITE_URL=http://localhost:3000
```

**Was du für den Docker-Container mindestens brauchst:**

```bash
SESSION_SECRET=dein-zufaelliger-32-zeichen-key!!!!
ADMIN_PASSWORD=ein-sicheres-produktions-passwort
```

(Der Rest hat sinnvolle Defaults in docker-compose.yml)

---

## 10. Prüfen ob alles richtig ist

Nach dem Start: `http://deine-domain:3034/admin/debug`

Dort siehst du den Status aller wichtigen Variablen:
- ✅ SESSION_SECRET gesetzt/nicht gesetzt
- ✅ DATABASE_URL gesetzt/nicht gesetzt  
- ✅ Admin-Zugang konfiguriert
- ✅ Sentry aktiv/inaktiv
