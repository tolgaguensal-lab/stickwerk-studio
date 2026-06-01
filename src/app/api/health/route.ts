import { NextResponse } from "next/server";
import { getAdminPocketBase } from "@/lib/pocketbase/server";

export async function GET() {
  const checks: Record<string, string | null> = {
    app: "ok",
    pocketbase: null,
    pocketbase_auth: null,
    leads_collection: null,
  };

  // 1. Test PocketBase reachability
  try {
    const pb = await getAdminPocketBase();
    checks.pocketbase = `${pb.baseUrl} — verbunden`;

    // 2. Test auth (admin credentials)
    checks.pocketbase_auth = "Admin-Authentifizierung OK";

    // 3. Test leads collection exists
    try {
      const result = await pb.collection("leads").getList(1, 1);
      checks.leads_collection = `Collection 'leads' OK (${result.totalItems} Einträge)`;
    } catch {
      checks.leads_collection =
        "Collection 'leads' nicht gefunden — im PocketBase Admin-UI anlegen!";
    }
  } catch (error) {
    checks.pocketbase =
      error instanceof Error ? error.message : "Unbekannter Fehler";
    checks.pocketbase_auth = "Nicht erreicht (siehe pocketbase)";
    checks.leads_collection = "Nicht erreichbar (siehe pocketbase)";
  }

  const allOk = Object.values(checks).every((v) => v !== null && !v.startsWith("Collection 'leads' nicht"));

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
