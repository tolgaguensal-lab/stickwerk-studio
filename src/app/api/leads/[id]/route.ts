import { NextResponse } from "next/server";
import { db, schema } from "@/lib/db";
import { z } from "zod";
import { eq } from "drizzle-orm";

const updateLeadSchema = z.object({
  status: z.enum(["new", "in_progress", "quoted", "won", "lost", "archived"]),
  adminNotes: z.string().optional(),
});

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const idNum = parseInt(id, 10);
    if (isNaN(idNum)) {
      return NextResponse.json({ error: "Ungültige ID." }, { status: 400 });
    }

    const body = await req.json();
    const result = updateLeadSchema.safeParse(body);

    if (!result.success) {
      const firstError = result.error.issues[0];
      return NextResponse.json(
        { error: firstError?.message || "Ungültige Eingabe" },
        { status: 400 }
      );
    }

    const [record] = await db
      .update(schema.leads)
      .set({
        status: result.data.status,
        adminNotes: result.data.adminNotes || "",
        updated: new Date().toISOString(),
      })
      .where(eq(schema.leads.id, idNum))
      .returning();

    if (!record) {
      return NextResponse.json(
        { error: "Lead nicht gefunden." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, lead: { ...record, id: String(record.id) } },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating lead:", error);
    return NextResponse.json(
      { error: "Lead konnte nicht aktualisiert werden." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const idNum = parseInt(id, 10);
    if (isNaN(idNum)) {
      return NextResponse.json({ error: "Ungültige ID." }, { status: 400 });
    }

    await db.delete(schema.leads).where(eq(schema.leads.id, idNum));

    return NextResponse.json(
      { success: true, message: "Lead erfolgreich gelöscht." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting lead:", error);
    return NextResponse.json(
      { error: "Lead konnte nicht gelöscht werden." },
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const idNum = parseInt(id, 10);
    if (isNaN(idNum)) {
      return NextResponse.json({ error: "Ungültige ID." }, { status: 400 });
    }

    const [record] = await db
      .select()
      .from(schema.leads)
      .where(eq(schema.leads.id, idNum))
      .limit(1);

    if (!record) {
      return NextResponse.json(
        { error: "Lead nicht gefunden." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { lead: { ...record, id: String(record.id) } },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching lead:", error);
    return NextResponse.json(
      { error: "Lead konnte nicht geladen werden." },
      { status: 500 }
    );
  }
}
