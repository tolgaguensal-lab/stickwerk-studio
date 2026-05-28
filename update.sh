#!/bin/bash
# Stickwerk-Studio Auto-Update Script
# Füge this to crontab: 0 */6 * * * /path/to/update.sh >> /var/log/stickwerk-update.log 2>&1

set -e

COMPOSE_DIR="/DATA/AppData/stickwerk-studio"
IMAGE="ghcr.io/tolgaguensal-lab/stickwerk-studio:latest"
CONTAINER="stickwerk-app"

echo "=== Stickwerk Update $(date) ==="

# Pull new image
echo "Pulling latest image..."
docker pull $IMAGE

# Check if image changed
CURRENT=$(docker inspect --format='{{.Image}}' $CONTAINER 2>/dev/null || echo "none")
NEW=$(docker inspect --format='{{.Image}}' $IMAGE 2>/dev/null || echo "none")

if [ "$CURRENT" = "$NEW" ]; then
    echo "No update needed. Container is up to date."
    exit 0
fi

# Restart container
echo "New version found! Restarting..."
cd $COMPOSE_DIR
docker compose -f docker-compose.zima.yml up -d app

echo "Update complete!"
