# Build Stage
FROM node:20-alpine AS builder
ARG APP_VERSION=0.0.0
ENV NEXT_PUBLIC_APP_VERSION=${APP_VERSION}
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .

# Write version file (accessible runtime via /version.json)
RUN mkdir -p public && \
    echo "{\"version\":\"${APP_VERSION}\",\"buildTime\":\"$(date -u +%Y-%m-%dT%H:%M:%SZ)\"}" > public/version.json

RUN npm run build

# Production Stage
FROM node:20-alpine AS runner
ARG APP_VERSION=0.0.0
ENV APP_VERSION=${APP_VERSION}
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

WORKDIR /app

# Copy drizzle migration files
COPY --from=builder /app/drizzle ./drizzle

# Copy built app
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/package.json ./

# Copy migration script
COPY scripts/migrate.mjs ./scripts/migrate.mjs

# Create startup script that runs migrations then starts Next.js
RUN { \
      echo '#!/bin/sh'; \
      echo ''; \
      echo 'echo ""'; \
      echo 'echo "========================================"'; \
      echo "echo \"  Stickwerk-Studio ${APP_VERSION}\""; \
      echo "echo \"  $(date -u +%Y-%m-%dT%H:%M:%SZ)\""; \
      echo 'echo "========================================"'; \
      echo 'echo ""'; \
      echo ''; \
      echo '# Run database migrations'; \
      echo 'node scripts/migrate.mjs'; \
      echo 'echo ""'; \
      echo ''; \
      echo '# Start Next.js'; \
      echo 'exec node server.js'; \
    } > /start.sh && \
    chmod +x /start.sh

# Expose port
EXPOSE 3000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/api/health || exit 1

# Start application
CMD ["/start.sh"]
