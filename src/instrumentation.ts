import * as Sentry from "@sentry/nextjs";

/**
 * Server-side Sentry registration hook.
 *
 * Loads the correct config based on runtime (Node.js server vs. Edge).
 * Auto-registered by Next.js 14.0.4+ (we're on 16.2.6).
 *
 * @see https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#extend-your-instrumentation-file
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config");
  }
}

/**
 * Automatically captures all unhandled server-side request errors.
 * Requires @sentry/nextjs >= 8.28.0 (we're on 10.56.0).
 */
export const onRequestError = Sentry.captureRequestError;
