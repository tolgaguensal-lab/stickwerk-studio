# Deployment Guide - ZimaOS + Pangolin

## Voraussetzungen

- ZimaOS mit Docker
- Pangolin auf VPS (Cloud-Anbieter)
- Newt auf ZimaOS (verbindet ZimaOS mit Pangolin)

## 1. Docker Image

Das offizielle Docker Image ist verfügbar unter:

```
ghcr.io/tolgaguensal-lab/stickwerk-studio:latest
```

Zusätzlich gibt es versionierte Tags:

```
ghcr.io/tolgaguensal-lab/stickwerk-studio:0.2.0
```

## 2. Environment Variables (.env)

Erstelle eine `.env`-Datei im selben Verzeichnis wie `zimaos-compose.yml`:

```bash
# PostgreSQL Passwort
POSTGRES_PASSWORD=DEIN_SICHERES_PASSWORT_HIER

# NextAuth Secret (generieren mit: openssl rand -base64 32)
NEXTAUTH_SECRET=DEIN_NEXTAUTH_SECRET_HIER
```

## 3. ZimaOS Start

```bash
# Verzeichnis wechseln
cd /DATA/AppData/stickwerk-studio

# Images pullen
docker compose -f zimaos-compose.yml pull

# Container starten
docker compose -f zimaos-compose.yml up -d
```

## 4. Tests

```bash
# HTTP-Status prüfen
curl -I http://127.0.0.1:3000

# Healthcheck
curl http://127.0.0.1:3000/api/health

# Logs prüfen
docker logs stickwerk-app
```

## 5. Pangolin Konfiguration

### Wichtig: localhost NICHT verwenden!

Pangolin läuft auf einem VPS und kann nicht auf `localhost` deiner ZimaOS zugreifen.

### Resource Target

Die Pangolin Resource muss auf die **interne IP** deiner ZimaOS zeigen:

```
http://<ZIMAOS-IP>:3000
```

**Beispiel:**

```
http://192.168.178.91:3000
```

### Verbindungskette

```
Internet
    ↓
VPS mit Pangolin/Traefik/Gerbil
    ↓
Newt Tunnel
    ↓
ZimaOS
    ↓
http://<ZIMAOS-IP>:3000
    ↓
stickwerk-app Container
```

### Pangolin Einstellungen

| Setting | Wert |
|---------|------|
| Type | HTTP |
| Target | `http://<ZIMAOS-IP>:3000` |
| Port | 3000 |

## 6. Domain Konfiguration

Falls die Domain `sws.guenlab.de` verwendet wird:

```bash
# In .env oder docker-compose.yml setzen:
NEXTAUTH_URL=https://sws.guenlab.de
NEXT_PUBLIC_SITE_URL=https://sws.guenlab.de
AUTH_TRUST_HOST=true
```

## 7. Updates

```bash
# Neuestes Image ziehen
docker compose -f zimaos-compose.yml pull

# Container neu starten
docker compose -f zimaos-compose.yml up -d

# Alte Images aufräumen
docker image prune -f
```

## 8. Troubleshooting

### Container startet nicht

```bash
# Logs prüfen
docker logs stickwerk-app

# Häufige Fehler:
# - DATABASE_URL nicht erreichbar → Prüfe ob db-Container läuft
# - NEXTAUTH_SECRET fehlt → Prüfe .env
# - Port belegt → Prüfe mit: lsof -i :3000
```

### Healthcheck fehlgeschlagen

```bash
# Manuell testen
docker exec stickwerk-app wget -qO- http://127.0.0.1:3000/api/health

# Erwartete Antwort:
# {"status":"ok","timestamp":"...","service":"stickwerk-studio"}
```

### Pangolin kann nicht verbinden

1. Prüfe ob ZimaOS-IP korrekt ist
2. Prüfe ob Container auf 0.0.0.0 läuft (nicht nur localhost)
3. Prüfe Firewall-Regeln
4. Prüfe Newt-Logs auf ZimaOS
