import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    viewTransition: true,
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.googleapis.com https://*.sentry.io",
              "style-src 'self' 'unsafe-inline' https://*.googleapis.com https://*.gstatic.com",
              "connect-src 'self' https://*.sentry.io",
              "font-src 'self' https://*.gstatic.com",
              "img-src 'self' data: blob:",
              "frame-ancestors 'none'",
              "form-action 'self'",
              "base-uri 'self'",
            ].join("; "),
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
    ];
  },
};

/**
 * Sentry build-time configuration.
 *
 * Source map upload is enabled when SENTRY_AUTH_TOKEN is set.
 * Org/project slugs read from env vars (fall back to env-injected values).
 *
 * @see https://docs.sentry.io/platforms/javascript/guides/nextjs/
 */
export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG || "stickwerk-studio-uw",
  project: process.env.SENTRY_PROJECT || "sws",

  // Source map upload auth token (reads from .env.sentry-build-plugin or CI env)
  authToken: process.env.SENTRY_AUTH_TOKEN,

  // Upload wider set of client source files for better stack trace resolution
  widenClientFileUpload: true,

  // Tunnel route: bypass ad-blockers by proxying events through our own domain
  tunnelRoute: "/monitoring",

  // Suppress non-CI output noise
  silent: !process.env.CI,
});
