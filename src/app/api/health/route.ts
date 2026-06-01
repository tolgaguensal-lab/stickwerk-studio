import { NextResponse } from "next/server";
import { getAdminPocketBase } from "@/lib/pocketbase/server";

export async function GET() {
  const checks: Record<string, string | null> = {
    app: "ok",
    pocketbase_url: process.env.POCKETBASE_URL || "nicht gesetzt",
    pocketbase_reachable: null,
    pocketbase_auth: null,
    leads_collection: null,
  };

  // 1. Test basic reachability (Ping PocketBase)
  try {
    const url = process.env.POCKETBASE_URL || "http://127.0.0.1:8090";
    const pingRes = await fetch(`${url}/api/health`, {
      signal: AbortSignal.timeout(5000),
    });
    const pingData = await pingRes.json();
    checks.pocketbase_reachable = `HTTP ${pingRes.status} — ${JSON.stringify(pingData)}`;
  } catch (error) {
    checks.pocketbase_reachable = `FEHLER: ${error instanceof Error ? error.message : String(error)}`;
  }

  // 2. Test admin auth
  try {
    const pb = await getAdminPocketBase();
    checks.pocketbase_auth = "Admin-Authentifizierung OK";

    // 3. Test leads collection
    try {
      const result = await pb.collection("leads").getList(1, 1);
      checks.leads_collection = `Collection 'leads' OK (${result.totalItems} Einträge)`;
    } catch (error) {
      if (error instanceof Error) {
        checks.leads_collection = `Fehler: ${error.message}`;
      } else {
        checks.leads_collection = "Collection 'leads' nicht gefunden";
      }
    }
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    checks.pocketbase_auth = `FEHLER: ${msg}`;
    checks.leads_collection = "Nicht erreichbar (siehe pocketbase_auth)";
  }

  const allOk = Object.values(checks).every(
    (v) => v !== null && !v.startsWith("FEHLER") && !v.startsWith("Fehler:")
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
