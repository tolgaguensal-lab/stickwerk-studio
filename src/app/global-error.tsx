"use client";

import * as Sentry from "@sentry/nextjs";
import NextError from "next/error";
import { useEffect } from "react";

/**
 * Root error boundary — catches errors in the root layout
 * and any React render errors not caught by nested boundaries.
 *
 * Per Sentry Next.js SDK skill: uses `next/error` to render
 * the default error page, then captures the exception.
 */
export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <NextError statusCode={0} />
      </body>
    </html>
  );
}
