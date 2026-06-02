# Deployment Guide - ZimaOS + Pangolin

**Aktuelle Version:** `ghcr.io/tolgaguensal-lab/stickwerk-studio:latest`

---

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
Docker-Container stickwerk-app (Port 3034)
```

## 1. Voraussetzungen

- ZimaOS mit Docker
- **PostgreSQL** installiert über ZimaOS App Store (Port 5432)
- Pangolin auf VPS (Cloud-Anbieter)
- Newt auf ZimaOS

## 2. Ersteinrichtung

### 2.1 Verzeichnis erstellen
```bash
mkdir -p /DATA/AppData/stickwerk-studio
```

### 2.2 Dateien von GitHub holen
```bash
cd /DATA/AppData/stickwerk-studio
# Entweder via git clone:
git clone https://github.com/tolgaguensal-lab/stickwerk-studio.git .
# Oder nur die benötigten Dateien kopieren von deinem lokalen Rechner:
# - deploy/zimaos-compose.yml
# - .env
```

### 2.3 .env-Datei erstellen
```bash
# .env im gleichen Verzeichnis wie zimaos-compose.yml anlegen
cat > .env << 'EOF'
DATABASE_URL=postgresql://stickwerk:stickwerk@host.docker.internal:5432/stickwerk
SESSION_SECRET=dein_random_secret_mit_mindestens_32_zeichen
ADMIN_USER=admin@stickwerk-studio.de
ADMIN_PASSWORD=dein_sicheres_admin_passwort
NEXT_PUBLIC_SITE_URL=https://sws.guenlab.de
NEXT_PUBLIC_APP_URL=https://sws.guenlab.de
EOF
```

### 2.4 Container starten
```bash
docker compose pull
docker compose up -d
```

## 3. Updates (neue Version installieren)

```bash
cd /DATA/AppData/stickwerk-studio
docker compose pull
docker compose up -d
```

> **Hinweis:** Das Image verwendet den `:latest` Tag. Bei jedem Push auf `main` wird automatisch ein neues Image gebaut und auf GHCR gepusht.

## 4. Überprüfung

### 4.1 Container-Status
```bash
docker ps | grep stickwerk-app
```

### 4.2 App lokal testen
```bash
curl -I http://127.0.0.1:3000
curl http://127.0.0.1:3000/api/health
```

### 4.3 App über ZimaOS-IP testen
```bash
ZIMA_IP=$(hostname -I | awk '{print $1}')
curl -I http://$ZIMA_IP:3034
curl http://$ZIMA_IP:3034/api/health
```

### 4.4 Externe Domain testen
```bash
curl -I https://sws.guenlab.de
curl https://sws.guenlab.de/api/health
```

## 5. Pangolin Konfiguration

### Resource Target
| Setting | Wert |
|---------|------|
| Protocol | HTTP |
| Host/IP | `<ZIMAOS-IP>` |
| Port | **3034** |

**Beispiel:**
```
http://192.168.178.91:3034
```

**NICHT verwenden:**
- `http://localhost:3000` ❌
- `http://127.0.0.1:3000` ❌
- `http://<VPS-IP>:3034` ❌

## 6. Debugging

### Debug-Script ausführen
```bash
# Von ZimaOS aus:
curl -s https://raw.githubusercontent.com/tolgaguensal-lab/stickwerk-studio/main/scripts/zimaos-pangolin-debug.sh | bash
```
Oder nach lokalem Download:
```bash
bash scripts/zimaos-pangolin-debug.sh
```

### Manuelle Debugging-Schritte
1. Container-Status prüfen: `docker ps`
2. App-Logs prüfen: `docker logs stickwerk-app`
3. Newt-Logs prüfen: `docker logs newt`
4. App lokal testen: `curl http://127.0.0.1:3000/api/health`
5. App über ZimaOS-IP testen: `curl http://<ZIMAOS-IP>:3034/api/health`

### Fehlerbilder
| Symptom | Ursache | Lösung |
|---------|---------|--------|
| **404** | Pangolin Resource/DNS falsch | Pangolin Dashboard prüfen |
| **502** | Target nicht erreichbar | Falsche IP/Port in Pangolin |
| **504** | Tunnel-Timeout | Newt-Container prüfen |
| **Login erscheint** | Auth aktiviert | Auth in Pangolin deaktivieren |
| **503** | Healthcheck schlägt fehl | Port 3034 + `/api/health` prüfen |

## 7. Wichtig

- Die App läuft auf **ZimaOS** im Heimnetz
- Der **VPS** ist nur für Pangolin/Traefik/Gerbil
- **Newt** verbindet ZimaOS mit Pangolin
- Die **Ubuntu-VM** ist nicht Teil der Produktion
- Der Container läuft auf **Port 3034** (intern 3000)
- **`latest` Tag** wird automatisch bei jedem Push aktualisiert
