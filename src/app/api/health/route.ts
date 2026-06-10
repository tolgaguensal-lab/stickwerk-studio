import { NextResponse } from "next/server";
import { db, schema } from "@/lib/db";
import { count as drizzleCount } from "drizzle-orm";

export async function GET() {
  const checks: Record<string, string | null> = {
    app: "ok",
    database_url: process.env.DATABASE_URL ? "gesetzt" : "nicht gesetzt",
    database_reachable: null,
    database_query: null,
  };

  // Test database connectivity
  try {
    const result = await db.select({ total: drizzleCount() }).from(schema.leads);
    checks.database_reachable = "SQLite-Verbindung OK";
    checks.database_query = `leads-Tabelle OK (${result[0]?.total ?? 0} Einträge)`;
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    checks.database_reachable = `FEHLER: ${msg}`;
    checks.database_query = "Nicht erreichbar (siehe database_reachable)";
  }

  const allOk = Object.values(checks).every(
    (v) => v !== null && !v.startsWith("FEHLER")
  );

  return NextResponse.json(
    {
      status: allOk ? "ok" : "degraded",
      timestamp: new Date().toISOString(),
      service: "stickwerk-studio",
      checks,
    },
    { status: allOk ? 200 : 503 }
  );
}
