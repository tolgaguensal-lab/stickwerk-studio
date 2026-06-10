#!/bin/sh
# ──────────────────────────────────────────────
# Stickwerk-Studio — SQLite Backup
# ──────────────────────────────────────────────
# Führt ein tägliches Backup der SQLite-Datenbank durch.
# Auf ZimaOS per Cron einrichten:
#   0 3 * * * /DATA/stickwerk-studio/scripts/backup-db.sh
# ──────────────────────────────────────────────

set -e

BACKUP_DIR="${BACKUP_DIR:-/DATA/backups/stickwerk}"
DB_PATH="${DB_PATH:-/DATA/stickwerk-data/stickwerk.db}"
RETENTION_DAYS="${RETENTION_DAYS:-30}"
TIMESTAMP=$(date +%Y-%m-%d_%H-%M-%S)

mkdir -p "$BACKUP_DIR"

# Mit sqlite3 Backup (sicher — Blockade-frei)
if command -v sqlite3 > /dev/null 2>&1; then
  sqlite3 "$DB_PATH" ".backup '$BACKUP_DIR/stickwerk-$TIMESTAMP.db'"
  STATUS=$?
else
  # Fallback: einfaches Kopieren (Container muss nicht schreiben)
  cp "$DB_PATH" "$BACKUP_DIR/stickwerk-$TIMESTAMP.db"
  STATUS=$?
fi

# Alte Backups löschen
find "$BACKUP_DIR" -name "stickwerk-*.db" -type f -mtime +"$RETENTION_DAYS" -delete 2>/dev/null

echo "[$(date)] Backup: $BACKUP_DIR/stickwerk-$TIMESTAMP.db (exit=$STATUS)"
exit $STATUS
