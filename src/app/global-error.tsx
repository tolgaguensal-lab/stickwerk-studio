"use client";

import * as Sentry from "@sentry/nextjs";
import React from "react";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            fontFamily: "system-ui, sans-serif",
            color: "#3A332C",
            background: "#F7F1E6",
          }}
        >
          <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
            Ein Fehler ist aufgetreten
          </h1>
          <p style={{ marginBottom: "2rem", color: "#6B5D4F" }}>
            Wir wurden bereits benachrichtigt und arbeiten daran.
          </p>
          <p style={{ fontSize: "0.875rem", color: "#8A6A3F" }}>
            Fehler-ID: {error.digest || "—"}
          </p>
        </div>
      </body>
    </html>
  );
}
