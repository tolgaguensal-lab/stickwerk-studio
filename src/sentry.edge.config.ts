import * as Sentry from "@sentry/nextjs";

/**
 * Edge runtime config — runs in proxy.ts and edge API routes.
 * Required for capturing errors from middleware/proxy and edge functions.
 */
const dsn = process.env.SENTRY_DSN;

if (dsn) {
  Sentry.init({
    dsn,

    environment: process.env.NODE_ENV || "development",

    // 100% in dev, 10% in production (per Sentry skill recommendation)
    tracesSampleRate: process.env.NODE_ENV === "development" ? 1.0 : 0.1,

    // Sentry Logs product
    enableLogs: true,

    // Include IP, request headers in events
    sendDefaultPii: true,
  });
}
