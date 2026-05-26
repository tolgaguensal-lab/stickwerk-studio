import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://ad95119dd03a4d0fbc011660debbecc5@app.glitchtip.com/23979",
  tracesSampleRate: 1.0,
  debug: false,
});
