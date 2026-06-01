import { NextResponse } from "next/server";
import { getAdminPocketBase } from "@/lib/pocketbase/server";
import { z } from "zod";

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
    const body = await req.json();
    const result = updateLeadSchema.safeParse(body);

    if (!result.success) {
      const firstError = result.error.issues[0];
      return NextResponse.json(
        { error: firstError?.message || "Ungültige Eingabe" },
        { status: 400 }
      );
    }

    const pb = await getAdminPocketBase();

    const record = await pb.collection("leads").update(id, {
      status: result.data.status,
      admin_notes: result.data.adminNotes || "",
    });

    return NextResponse.json({ success: true, lead: record }, { status: 200 });
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
    const pb = await getAdminPocketBase();

    await pb.collection("leads").delete(id);

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
    const pb = await getAdminPocketBase();

    const record = await pb.collection("leads").getOne(id);

    return NextResponse.json({ lead: record }, { status: 200 });
  } catch (error) {
    console.error("Error fetching lead:", error);
    return NextResponse.json(
      { error: "Lead konnte nicht geladen werden." },
      { status: 500 }
    );
  }
}
