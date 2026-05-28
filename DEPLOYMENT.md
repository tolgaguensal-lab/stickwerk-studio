# Deployment Guide - ZimaOS + Pangolin

## Produktionsroute

```
Internet / Besucher
    ↓
https://sws.guenlab.de
    ↓
VPS mit Pangolin / Traefik / Gerbil
    ↓
Newt Tunnel
    ↓
ZimaOS im Heimnetz
    ↓
Docker-Container stickwerk-app
    ↓
http://<ZIMAOS-IP>:3034
```

## 1. Voraussetzungen

- ZimaOS mit Docker
- **PocketBase** installiert über ZimaOS App Store
- Pangolin auf VPS (Cloud-Anbieter)
- Newt auf ZimaOS

## 2. Docker Image

```
ghcr.io/tolgaguensal-lab/stickwerk-studio:latest
```

## 3. PocketBase Setup (ZimaOS App Store)

1. PocketBase über ZimaOS App Store installieren
2. PocketBase Admin Account erstellen
3. PocketBase URL notieren (z.B. `http://<ZIMAOS-IP>:8090`)

## 4. Environment Variables (.env)

```bash
# PocketBase (installiert über ZimaOS App Store)
NEXT_PUBLIC_POCKETBASE_URL=http://<ZIMAOS-IP>:8090
POCKETBASE_URL=http://127.0.0.1:8090
POCKETBASE_ADMIN_EMAIL=admin@stickwerk-studio.de
POCKETBASE_ADMIN_PASSWORD=your_password_here

# NextAuth
NEXTAUTH_SECRET=your_secret_here
NEXTAUTH_URL=https://sws.guenlab.de
AUTH_TRUST_HOST=true

# Site URLs
NEXT_PUBLIC_SITE_URL=https://sws.guenlab.de
NEXT_PUBLIC_APP_URL=https://sws.guenlab.de
```

## 4. ZimaOS Setup

### 4.1 Dateien kopieren
```bash
# Auf ZimaOS:
mkdir -p /DATA/AppData/stickwerk-studio
cp deploy/zimaos-compose.yml /DATA/AppData/stickwerk-studio/
cp .env /DATA/AppData/stickwerk-studio/
```

### 4.2 Container starten
```bash
cd /DATA/AppData/stickwerk-studio
docker compose -f zimaos-compose.yml pull
docker compose -f zimaos-compose.yml up -d
```

## 5. Tests

### 5.1 App lokal testen
```bash
curl -I http://127.0.0.1:3000
curl http://127.0.0.1:3000/api/health
```

### 5.2 App über ZimaOS-IP testen
```bash
ZIMA_IP=$(hostname -I | awk '{print $1}')
curl -I http://$ZIMA_IP:3000
curl http://$ZIMA_IP:3000/api/health
```

### 5.3 Externe Domain testen
```bash
curl -I https://sws.guenlab.de
curl https://sws.guenlab.de/api/health
```

## 6. Pangolin Konfiguration

### Resource Target
| Setting | Wert |
|---------|------|
| Protocol | HTTP |
| Host/IP | `<ZIMAOS-IP>` |
| Port | 3000 |

**Beispiel:**
```
http://192.168.178.91:3000
```

**NICHT verwenden:**
- `http://localhost:3000`
- `http://127.0.0.1:3000`
- `http://<VPS-IP>:3000`

## 7. Updates

```bash
cd /DATA/AppData/stickwerk-studio
docker compose -f zimaos-compose.yml pull
docker compose -f zimaos-compose.yml up -d
```

## 8. Debugging

### Debug-Script ausführen
```bash
cd /DATA/AppData/stickwerk-studio
./scripts/zimaos-pangolin-debug.sh
```

### Manuelle Debugging-Schritte
1. Container-Status prüfen: `docker ps`
2. App-Logs prüfen: `docker logs stickwerk-app`
3. Newt-Logs prüfen: `docker logs newt`
4. App lokal testen: `curl http://127.0.0.1:3000/api/health`
5. App über ZimaOS-IP testen: `curl http://<ZIMAOS-IP>:3034/api/health`

### Fehlerbilder
- **404:** Pangolin Resource/DNS falsch
- **502:** Target nicht erreichbar (falsche IP/Port)
- **504:** Tunnel-Timeout
- **Login erscheint:** Auth deaktivieren

## 9. Wichtig

- Die App läuft auf ZimaOS
- Der VPS ist nur Pangolin/Traefik/Gerbil
- Newt verbindet ZimaOS mit Pangolin
- Die Ubuntu-VM ist nicht Teil der Produktion
- Keine produktiven localhost-URLs verwenden
