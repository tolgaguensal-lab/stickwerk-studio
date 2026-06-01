import { NextResponse } from "next/server";
import { getAdminPocketBase } from "@/lib/pocketbase/server";

const STATUS_MAP: Record<string, string> = {
  new: "Neu",
  in_progress: "In Bearbeitung",
  quoted: "Angebot",
  won: "Gewonnen",
  lost: "Verloren",
  archived: "Archiviert",
};

function escapeCSV(value: unknown): string {
  const str = String(value ?? "");
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export async function GET() {
  try {
    const pb = await getAdminPocketBase();
    const records = await pb.collection("leads").getFullList({ sort: "-id" });

    const header = "ID,Datum,Name,E-Mail,Telefon,Firma,Status,Nachricht,Quelle";
    const rows = records.map((r: Record<string, unknown>) =>
      [
        escapeCSV(r.id),
        escapeCSV(formatDate(String(r.created || ""))),
        escapeCSV(r.name),
        escapeCSV(r.email),
        escapeCSV(r.phone),
        escapeCSV(r.company),
        escapeCSV(STATUS_MAP[String(r.status)] || r.status),
        escapeCSV(r.message),
        escapeCSV(r.source),
      ].join(",")
    );

    const csv = "\uFEFF" + header + "\n" + rows.join("\n");
    const dateStr = new Date().toISOString().slice(0, 10);

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="leads-export-${dateStr}.csv"`,
      },
    });
  } catch (error) {
    console.error("CSV export error:", error);
    return NextResponse.json(
      { error: "Export konnte nicht erstellt werden." },
      { status: 500 }
    );
  }
}
