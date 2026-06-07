import * as Sentry from "@sentry/nextjs";

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN;

if (dsn) {
  Sentry.init({
    dsn,

    environment: process.env.NODE_ENV || "development",

    // 100% in dev, 10% in production (per Sentry skill recommendation)
    tracesSampleRate: process.env.NODE_ENV === "development" ? 1.0 : 0.1,

    // Session Replay: 10% of all sessions, 100% of sessions with errors
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,

    // Sentry Logs product
    enableLogs: true,

    // Include IP, request headers in events
    sendDefaultPii: true,

    integrations: [
      Sentry.replayIntegration(),
    ],
  });
}

/**
 * Hook into App Router navigation transitions.
 * Sends a span for every client-side route change.
 */
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
