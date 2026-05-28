# Pangolin/ZimaOS Debug-Dokumentation

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
Docker-Container stickwerk-app auf ZimaOS
    ↓
Interne App-Adresse: http://<ZIMAOS-IP>:3034
```

## Klare Rollen

| Komponente | Rolle |
|------------|-------|
| **Ubuntu-VM** | Nur Entwicklung (nicht Teil der Produktion) |
| **GitHub/GHCR** | Liefert nur das Docker-Image |
| **VPS** | Nur Reverse Proxy / Tunnel-Endpunkt (Pangolin/Traefik/Gerbil) |
| **ZimaOS** | Hostet die App als Docker-Container |
| **Newt** | Verbindet ZimaOS mit Pangolin auf dem VPS |

## Pangolin Resource Target

| Setting | Wert |
|---------|------|
| Protocol | HTTP |
| Host/IP | `<ZIMAOS-IP>` |
| Port | 3034 |

**Beispiel:**
```
http://192.168.178.91:3034
```

**NICHT verwenden:**
- `http://localhost:3034`
- `http://127.0.0.1:3034`
- `http://<VPS-IP>:3034`
- `http://<Ubuntu-VM-IP>:3034`

## Öffentliche Domain

```
https://sws.guenlab.de
```

## Fehlerbilder

### 404 - Not Found

**Ursache:**
- Pangolin Resource/Subdomain/Traefik Router falsch konfiguriert
- DNS/Hostname passt nicht
- Resource nicht korrekt veröffentlicht

**Lösung:**
1. Pangolin Dashboard prüfen
2. Resource-Name und Subdomain prüfen
3. DNS-Eintrag prüfen

### 502 - Bad Gateway

**Ursache:**
- Pangolin/Newt erreicht Target nicht
- Falsche IP im Resource Target
- Falscher Port
- App nicht erreichbar
- Container down

**Lösung:**
1. ZimaOS-IP prüfen (`hostname -I`)
2. Container-Status prüfen (`docker ps`)
3. App lokal testen (`curl http://<ZIMAOS-IP>:3034`)
4. Newt-Logs prüfen

### 504 - Gateway Timeout

**Ursache:**
- Newt/Site offline
- Tunnel-Timeout
- Target antwortet nicht

**Lösung:**
1. Newt-Container prüfen
2. Newt-Logs prüfen
3. App-Container prüfen

### Pangolin Login erscheint

**Ursache:**
- Resource funktioniert grundsätzlich
- Authentication/SSO ist aktiv

**Lösung:**
- Für öffentliche Website Auth deaktivieren
- Oder Policy im Pangolin Dashboard anpassen

## Debugging-Schritte

### 1. App-Container prüfen
```bash
docker ps | grep stickwerk-app
docker logs stickwerk-app
```

### 2. App lokal testen
```bash
curl -I http://127.0.0.1:3000
curl http://127.0.0.1:3000/api/health
```

### 3. App über ZimaOS-IP testen
```bash
ZIMA_IP=$(hostname -I | awk '{print $1}')
curl -I http://$ZIMA_IP:3000
curl http://$ZIMA_IP:3000/api/health
```

### 4. Newt-Container prüfen
```bash
docker ps | grep newt
docker logs newt
```

### 5. Externe Domain testen
```bash
curl -I https://sws.guenlab.de
curl https://sws.guenlab.de/api/health
```

### 6. Pangolin Resource Target
```
http://<ZIMAOS-IP>:3034
```

## Häufige Fehler

| Symptom | Ursache | Lösung |
|---------|---------|--------|
| App nicht erreichbar | Container down | `docker compose up -d` |
| Port belegt | Anderer Service auf 3000 | Port ändern oder Konflikt lösen |
| PocketBase nicht erreichbar | Container down | `docker compose up -d pocketbase` |
| 502 über Pangolin | Falsche IP/Port | Resource Target prüfen |
| 404 über Pangolin | DNS/Resource falsch | Pangolin Dashboard prüfen |
