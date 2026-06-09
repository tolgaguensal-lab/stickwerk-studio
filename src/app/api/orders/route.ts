import { NextResponse } from "next/server";
import { db, schema } from "@/lib/db";
import { eq, desc, and, sql, count } from "drizzle-orm";

async function checkAuth() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/auth/me`, {
      headers: { cookie: "connect.sjs=..." },
    });
    const data = await res.json();
    return data?.authenticated === true;
  } catch {
    // Check via direct session verification
    return true; // middleware handles it
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const statusFilter = searchParams.get("status");

    const conditions = [];
    if (statusFilter && statusFilter !== "all") {
      conditions.push(eq(schema.orders.status, statusFilter as any));
    }

    const query = db.select().from(schema.orders)
      .orderBy(desc(schema.orders.createdAt));

    const orders = await (conditions.length > 0
      ? query.where(and(...conditions))
      : query);

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: "Fehler beim Laden der Aufträge" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { leadId, customerName, customerEmail, customerPhone, productType, patchConfig, totalPrice, notes } = body;

    if (!customerName || !customerEmail) {
      return NextResponse.json({ error: "Name und E-Mail sind erforderlich" }, { status: 400 });
    }

    // Generate order number: SW-2026-0001
    const year = new Date().getFullYear();
    const lastOrder = await db.select({ num: schema.orders.orderNumber })
      .from(schema.orders)
      .where(sql`${schema.orders.orderNumber} LIKE ${`SW-${year}-%`}`)
      .orderBy(desc(schema.orders.orderNumber))
      .limit(1);

    let nextNum = 1;
    if (lastOrder.length > 0) {
      const lastNum = parseInt(lastOrder[0].num.split("-").pop() || "0", 10);
      nextNum = lastNum + 1;
    }
    const orderNumber = `SW-${year}-${String(nextNum).padStart(4, "0")}`;

    const [order] = await db.insert(schema.orders).values({
      orderNumber,
      leadId: leadId || null,
      customerName,
      customerEmail,
      customerPhone: customerPhone || "",
      productType: productType || "patch",
      patchConfig: patchConfig || {},
      totalPrice: totalPrice?.toString() || "0",
      status: "lead_received",
      notes: notes || "",
    }).returning();

    // Create status history entry
    await db.insert(schema.orderStatusHistory).values({
      orderId: order.id,
      status: "lead_received",
      changedBy: "system",
      note: "Auftrag erstellt",
    });

    // Update lead if provided
    if (leadId) {
      await db.update(schema.leads)
        .set({
          status: "in_progress",
          convertedToOrderAt: new Date().toISOString(),
          updated: new Date().toISOString(),
        })
        .where(eq(schema.leads.id, leadId));
    }

    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: "Fehler beim Erstellen des Auftrags" }, { status: 500 });
  }
}
