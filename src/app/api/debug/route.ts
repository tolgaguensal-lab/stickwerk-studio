import { NextResponse } from "next/server";
import { Pool } from "pg";
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

  // Sanitize URL for display
  try {
    const url = new URL(dbUrl);
    report.env.databaseUrl = {
      status: "ok",
      message: `postgresql://${url.username}:****@${url.hostname}:${url.port}${url.pathname}`,
    };
  } catch {
    report.env.databaseUrl = { status: "error", message: "DATABASE_URL ist ungültig" };
  }

  // Test database connection
  const pool = new Pool({ connectionString: dbUrl, connectionTimeoutMillis: 5000 });

  try {
    const client = await pool.connect();
    await client.query("SELECT 1");
    client.release();
    report.database.connection = { status: "ok", message: "Verbindung erfolgreich" };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    report.database.connection = { status: "error", message: `Verbindung fehlgeschlagen`, detail: msg };
    await pool.end().catch(() => {});
    return NextResponse.json(report);
  }

  // Check tables exist
  try {
    const result = await pool.query(`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name IN ('leads', 'contact_messages')
      ORDER BY table_name
    `);
    const found = result.rows.map((r: { table_name: string }) => r.table_name);
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

  await pool.end().catch(() => {});
  return NextResponse.json(report);
}
