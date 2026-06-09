import { NextResponse } from "next/server";
import Database from "better-sqlite3";
import { readFileSync } from "fs";
import { join } from "path";

export const dynamic = "force-dynamic";

interface CheckResult {
  status: "ok" | "error";
  message: string;
  detail?: string;
}

interface DebugReport {
  version: { version: string; buildTime: string | null };
  env: {
    nodeEnv: string;
    databaseUrl: CheckResult;
    sessionSecret: CheckResult;
    adminUser: string;
    siteUrl: string;
  };
  database: {
    connection: CheckResult | null;
    tables: CheckResult | null;
  };
}

function checkSecret(value: string | undefined, name: string): CheckResult {
  if (!value) {
    return { status: "error", message: `${name} nicht gesetzt` };
  }
  const isDefault = value.includes("stickwerk-default") || value === "stickwerk-super-secret-key-2026-change-in-production";
  return {
    status: isDefault ? "error" : "ok",
    message: isDefault ? `${name} verwendet Default-Wert` : `${name} gesetzt (${value.length} Zeichen)`,
  };
}

export async function GET() {
  const report: DebugReport = {
    version: { version: "unknown", buildTime: null },
    env: {
      nodeEnv: process.env.NODE_ENV || "nicht gesetzt",
      databaseUrl: { status: "error", message: "nicht geprüft" },
      sessionSecret: checkSecret(process.env.SESSION_SECRET, "SESSION_SECRET"),
      adminUser: process.env.ADMIN_USER || "nicht gesetzt",
      siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "nicht gesetzt",
    },
    database: {
      connection: null,
      tables: null,
    },
  };

  // Read version file
  try {
    const vp = join(process.cwd(), "public", "version.json");
    report.version = JSON.parse(readFileSync(vp, "utf-8"));
  } catch {
    report.version = { version: process.env.APP_VERSION || "development", buildTime: null };
  }

  // Check DATABASE_URL
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    report.env.databaseUrl = { status: "error", message: "DATABASE_URL nicht gesetzt" };
    report.database.connection = { status: "error", message: "Keine Datenbank-URL" };
    return NextResponse.json(report);
  }

  report.env.databaseUrl = {
    status: "ok",
    message: `SQLite: ${dbUrl}`,
  };

  // Test database connection
  let sqlite: Database.Database | null = null;
  try {
    sqlite = new Database(dbUrl);
    sqlite.prepare("SELECT 1").get();
    report.database.connection = { status: "ok", message: "Verbindung erfolgreich" };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    report.database.connection = { status: "error", message: `Verbindung fehlgeschlagen`, detail: msg };
    if (sqlite) sqlite.close();
    return NextResponse.json(report);
  }

  // Check tables exist
  try {
    const result = sqlite
      .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name IN ('leads', 'contact_messages') ORDER BY name")
      .all() as { name: string }[];
    const found = result.map((r) => r.name);
    const expected = ["leads", "contact_messages"];
    const missing = expected.filter((t) => !found.includes(t));

    if (missing.length === 0) {
      report.database.tables = { status: "ok", message: `Alle Tabellen vorhanden: ${found.join(", ")}` };
    } else {
      report.database.tables = {
        status: "error",
        message: `Tabellen fehlen: ${missing.join(", ")}`,
        detail: `Vorhanden: ${found.join(", ") || "keine"}`,
      };
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    report.database.tables = { status: "error", message: "Tabellen-Check fehlgeschlagen", detail: msg };
  }

  sqlite.close();
  return NextResponse.json(report);
}
