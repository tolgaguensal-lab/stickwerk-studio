"use client";

import * as Sentry from "@sentry/nextjs";

export default function SentryExamplePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        fontFamily: "system-ui, sans-serif",
        background: "#F7F1E6",
        color: "#3A332C",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
        Sentry Test Page
      </h1>
      <p style={{ marginBottom: "2rem", color: "#6B5D4F", textAlign: "center", maxWidth: "32rem" }}>
        Klicke einen Button, um einen Test-Fehler an Sentry zu senden. Danach
        sollte der Fehler innerhalb von 30 Sekunden in deinem
        <a
          href="https://sentry.io/issues/"
          target="_blank"
          rel="noreferrer"
          style={{ color: "#8A6A3F", textDecoration: "underline", marginLeft: "0.25rem" }}
        >
          Sentry Issues Dashboard
        </a>{" "}
        erscheinen.
      </p>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
        <button
          type="button"
          onClick={() => {
            throw new Error("Sentry Frontend Test Error (Button-Click)");
          }}
          style={{
            padding: "0.75rem 1.5rem",
            background: "#8A6A3F",
            color: "#FFF8EC",
            border: "none",
            borderRadius: "0.5rem",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Client-Fehler auslösen
        </button>

        <button
          type="button"
          onClick={async () => {
            await Sentry.startSpan(
              { name: "Example Frontend Span", op: "test" },
              async () => {
                await fetch("/api/sentry-example-api");
              }
            );
          }}
          style={{
            padding: "0.75rem 1.5rem",
            background: "transparent",
            color: "#8A6A3F",
            border: "1px solid #8A6A3F",
            borderRadius: "0.5rem",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Server-Fehler via API auslösen
        </button>
      </div>

      <p style={{ marginTop: "2rem", fontSize: "0.875rem", color: "#8A6A3F" }}>
        Diese Seite nur in Dev / Staging benutzen — in Production entfernen.
      </p>
    </main>
  );
}
