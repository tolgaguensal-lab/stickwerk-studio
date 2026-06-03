import { NextResponse } from "next/server";
import { db, schema } from "@/lib/db";
import { eq, desc, sql } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (email) {
      // Single customer detail
      const leads = await db.select()
        .from(schema.leads)
        .where(eq(schema.leads.email, email))
        .orderBy(desc(schema.leads.created));

      const orders = await db.select()
        .from(schema.orders)
        .where(eq(schema.orders.customerEmail, email))
        .orderBy(desc(schema.orders.createdAt));

      // Get customer name from most recent lead
      const name = leads.length > 0 ? leads[0].name : "";
      const totalRevenue = orders.reduce((sum, o) => sum + parseFloat(o.totalPrice || "0"), 0);

      return NextResponse.json({
        customer: { email, name, totalLeads: leads.length, totalOrders: orders.length, totalRevenue },
        leads,
        orders,
      });
    }

    // All customers: group leads by email
    const customersRaw = await db.execute(sql`
      SELECT 
        email,
        MAX(name) as name,
        COUNT(*)::int as total_leads,
        COALESCE(
          (SELECT COUNT(*)::int FROM orders WHERE customer_email = leads.email),
          0
        ) as total_orders,
        MAX(created) as last_lead_date
      FROM leads
      WHERE email IS NOT NULL AND email != ''
      GROUP BY email
      ORDER BY last_lead_date DESC
    `);

    const customers = customersRaw.rows.map((row: any) => ({
      email: row.email,
      name: row.name,
      totalLeads: parseInt(row.total_leads, 10),
      totalOrders: parseInt(row.total_orders, 10),
      lastLeadDate: row.last_lead_date,
    }));

    return NextResponse.json({ customers });
  } catch (error) {
    console.error("Error fetching customers:", error);
    return NextResponse.json({ error: "Fehler beim Laden der Kunden" }, { status: 500 });
  }
}
