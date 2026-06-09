import { NextResponse } from "next/server";
import { db, schema } from "@/lib/db";
import { eq, desc } from "drizzle-orm";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const orderId = parseInt(id, 10);
    if (isNaN(orderId)) {
      return NextResponse.json({ error: "Ungültige ID" }, { status: 400 });
    }

    const [order] = await db.select().from(schema.orders).where(eq(schema.orders.id, orderId));
    if (!order) {
      return NextResponse.json({ error: "Auftrag nicht gefunden" }, { status: 404 });
    }

    const statusHistory = await db.select()
      .from(schema.orderStatusHistory)
      .where(eq(schema.orderStatusHistory.orderId, orderId))
      .orderBy(desc(schema.orderStatusHistory.changedAt));

    return NextResponse.json({ order, statusHistory });
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json({ error: "Fehler beim Laden des Auftrags" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const orderId = parseInt(id, 10);
    if (isNaN(orderId)) {
      return NextResponse.json({ error: "Ungültige ID" }, { status: 400 });
    }

    const body = await req.json();
    const { status, notes, shippingAddress, trackingNumber, totalPrice } = body;

    const [existing] = await db.select().from(schema.orders).where(eq(schema.orders.id, orderId));
    if (!existing) {
      return NextResponse.json({ error: "Auftrag nicht gefunden" }, { status: 404 });
    }

    const updateData: Record<string, unknown> = { updatedAt: new Date().toISOString() };
    if (status !== undefined) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;
    if (shippingAddress !== undefined) updateData.shippingAddress = shippingAddress;
    if (trackingNumber !== undefined) updateData.trackingNumber = trackingNumber;
    if (totalPrice !== undefined) updateData.totalPrice = totalPrice.toString();

    const [updated] = await db.update(schema.orders)
      .set(updateData)
      .where(eq(schema.orders.id, orderId))
      .returning();

    // Record status change in history
    if (status && status !== existing.status) {
      await db.insert(schema.orderStatusHistory).values({
        orderId,
        status,
        changedBy: "admin",
        note: body.statusNote || "",
      });
    }

    return NextResponse.json({ order: updated });
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json({ error: "Fehler beim Aktualisieren des Auftrags" }, { status: 500 });
  }
}
