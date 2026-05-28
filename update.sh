#!/bin/bash
# Stickwerk-Studio Auto-Update Script
# Prüft auf neue Versionen und aktualisiert docker-compose.yml

set -e

COMPOSE_DIR="/DATA/AppData/stickwerk-studio"
COMPOSE_FILE="$COMPOSE_DIR/docker-compose.zima.yml"
IMAGE_BASE="ghcr.io/tolgaguensal-lab/stickwerk-studio"
LOG="/var/log/stickwerk-update.log"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a $LOG
}

# Aktuelle Version aus docker-compose.yml auslesen
CURRENT_VERSION=$(grep -oP "image: $IMAGE_BASE:v\K[0-9.]+" $COMPOSE_FILE 2>/dev/null || echo "0.0.0")
log "Current version: v$CURRENT_VERSION"

# Neuestes Tag von GitHub holen
LATEST_TAG=$(curl -s "https://api.github.com/repos/tolgaguensal-lab/stickwerk-studio/tags" | grep -oP '"name": "v\K[0-9.]+' | head -1)

if [ -z "$LATEST_TAG" ]; then
    log "Could not fetch latest tag from GitHub"
    exit 1
fi

log "Latest version: v$LATEST_TAG"

# Vergleichen
if [ "$CURRENT_VERSION" = "$LATEST_TAG" ]; then
    log "Already up to date!"
    exit 0
fi

# Update durchführen
log "Updating from v$CURRENT_VERSION to v$LATEST_TAG..."

# Image pullen
docker pull $IMAGE_BASE:v$LATEST_TAG

# docker-compose.yml aktualisieren
sed -i "s|image: $IMAGE_BASE:v[0-9.]*|image: $IMAGE_BASE:v$LATEST_TAG|g" $COMPOSE_FILE

# Container neustarten
cd $COMPOSE_DIR
docker compose -f docker-compose.zima.yml up -d app

log "Update complete! Now running v$LATEST_TAG"
