/**
 * Simple in-memory rate limiter for Next.js API routes.
 *
 * No external dependencies – uses a Map with automatic cleanup.
 *
 * Usage:
 *   const limiter = createRateLimiter({ windowMs: 60_000, max: 10 });
 *   if (!limiter.check(key)) {
 *     return NextResponse.json({ error: "Zu viele Anfragen" }, { status: 429 });
 *   }
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

interface RateLimiterOptions {
  /** Time window in milliseconds (default: 60 000 = 1 minute) */
  windowMs?: number;
  /** Max requests per window (default: 10) */
  max?: number;
}

export function createRateLimiter(options: RateLimiterOptions = {}) {
  const windowMs = options.windowMs ?? 60_000;
  const max = options.max ?? 10;

  const store = new Map<string, RateLimitEntry>();

  // Periodic cleanup every 5 minutes to prevent memory leaks
  const cleanupInterval = setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of store) {
      if (now > entry.resetAt) {
        store.delete(key);
      }
    }
  }, 5 * 60_000);

  // Allow cleanup to not keep the process alive
  if (cleanupInterval.unref) {
    cleanupInterval.unref();
  }

  return {
    /**
     * Check if the request is allowed.
     * Returns true if allowed, false if rate limit exceeded.
     */
    check(key: string): boolean {
      const now = Date.now();
      const entry = store.get(key);

      if (!entry || now > entry.resetAt) {
        // New window
        store.set(key, { count: 1, resetAt: now + windowMs });
        return true;
      }

      if (entry.count >= max) {
        return false;
      }

      entry.count++;
      return true;
    },

    /**
     * Get remaining requests and reset time for response headers.
     */
    getStatus(key: string): { remaining: number; resetAt: number } {
      const entry = store.get(key);
      if (!entry || Date.now() > entry.resetAt) {
        return { remaining: max, resetAt: Date.now() + windowMs };
      }
      return { remaining: Math.max(0, max - entry.count), resetAt: entry.resetAt };
    },
  };
}

/**
 * Extract a rate-limit key from a request.
 * Uses x-forwarded-for header (proxied) or falls back to a default key.
 */
export function getRateLimitKey(request: Request, prefix: string): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() ?? "unknown";
  return `${prefix}:${ip}`;
}
