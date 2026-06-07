# =============================================================================
# Stickwerk-Studio — Multi-Stage Docker Build
# =============================================================================
# Build:
#   docker build --build-arg APP_VERSION=0.5.0 \
#     --build-arg NEXT_PUBLIC_SITE_URL=https://example.com \
#     -t ghcr.io/tolgaguensal-lab/stickwerk-studio:latest .
#
# Run with docker-compose (empfohlen):
#   docker compose up -d
#
# Manuell mit externer DB:
#   docker run -p 3034:3000 \
#     -e DATABASE_URL=postgresql://user:pass@host:5432/db \
#     -e SESSION_SECRET="mindestens-32-zeichen-lang!!!" \
#     -e ADMIN_USER=admin@example.com \
#     -e ADMIN_PASSWORD=sicheres-passwort \
#     ghcr.io/tolgaguensal-lab/stickwerk-studio:latest
# =============================================================================

# ---- Build Stage ----
FROM node:20-alpine AS builder

ARG APP_VERSION=0.0.0
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_APP_URL

ENV NEXT_PUBLIC_APP_VERSION=${APP_VERSION}
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
ENV NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}
ENV NODE_ENV=production

WORKDIR /app

COPY package*.json ./

# Install ALL deps (including devDependencies needed for build tools like @tailwindcss/postcss)
# NODE_ENV=production above would otherwise cause npm to skip devDependencies
RUN npm ci --include=dev

# Source code
COPY . .

# Version file
RUN mkdir -p public && \
    echo "{\"version\":\"${APP_VERSION}\",\"buildTime\":\"$(date -u +%Y-%m-%dT%H:%M:%SZ)\"}" > public/version.json

# Next.js Standalone-Build
RUN npm run build

# ---- Production Stage ----
FROM node:20-alpine AS runner

ARG APP_VERSION=0.0.0
ENV APP_VERSION=${APP_VERSION}
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

WORKDIR /app

# Security: non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# 1. Standalone-App (server.js + node_modules + .next/server)
COPY --from=builder /app/.next/standalone/stickwerk-studio/ ./

# 2. Static Assets (CSS, JS chunks, Medien)
COPY --from=builder /app/.next/static ./.next/static

# 3. Public Assets (Bilder, Icons, version.json)
COPY --from=builder /app/public ./public

# 4. Drizzle-Migrationen (Auto-Migration beim Container-Start)
COPY --from=builder /app/drizzle ./drizzle
COPY --from=builder /app/scripts/migrate.mjs ./scripts/migrate.mjs

# Besitzer setzen
RUN chown -R nextjs:nodejs /app

# Startup-Script: Migration (tolerant) → Next.js starten
RUN { \
      echo '#!/bin/sh'; \
      echo 'set -e'; \
      echo ''; \
      echo 'echo "========================================"'; \
      echo "echo \"  Stickwerk-Studio v${APP_VERSION}\""; \
      echo 'echo "========================================"'; \
      echo 'echo ""'; \
      echo ''; \
      echo 'echo "→ Datenbank-Migration..."'; \
      echo 'if node scripts/migrate.mjs; then'; \
      echo '  echo "✅ Migration erfolgreich"'; \
      echo 'else'; \
      echo '  echo "⚠️  Migration fehlgeschlagen — Tabellen existieren evtl. bereits"'; \
      echo '  echo "   App startet trotzdem (Schema muss bereits aktuell sein)"'; \
      echo 'fi'; \
      echo 'echo ""'; \
      echo ''; \
      echo 'exec node server.js'; \
    } > /start.sh && \
    chmod +x /start.sh

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/api/health || exit 1

CMD ["/start.sh"]
