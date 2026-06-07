import * as Sentry from "@sentry/nextjs";

const dsn = process.env.SENTRY_DSN;

if (dsn) {
  Sentry.init({
    dsn,

    environment: process.env.NODE_ENV || "development",

    // 100% in dev, 10% in production (per Sentry skill recommendation)
    tracesSampleRate: process.env.NODE_ENV === "development" ? 1.0 : 0.1,

    // Attach local variable values to stack frames (server-side only)
    includeLocalVariables: true,

    // Sentry Logs product (structured logs)
    enableLogs: true,

    // Include IP, request headers in events
    sendDefaultPii: true,
  });
}
