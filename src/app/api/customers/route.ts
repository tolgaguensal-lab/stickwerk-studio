import { NextResponse } from "next/server";
import { db, schema } from "@/lib/db";
import { eq, desc } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (email) {
      // Single customer detail
      const leads = db.select()
        .from(schema.leads)
        .where(eq(schema.leads.email, email))
        .orderBy(desc(schema.leads.created))
        .all();

      const orders = db.select()
        .from(schema.orders)
        .where(eq(schema.orders.customerEmail, email))
        .orderBy(desc(schema.orders.createdAt))
        .all();

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
    const customersRaw = db.$client
      .prepare(
        `SELECT 
          email,
          MAX(name) as name,
          COUNT(*) as total_leads,
          COALESCE(
            (SELECT COUNT(*) FROM orders WHERE customer_email = leads.email),
            0
          ) as total_orders,
          MAX(created) as last_lead_date
        FROM leads
        WHERE email IS NOT NULL AND email != ''
        GROUP BY email
        ORDER BY last_lead_date DESC`
      )
      .all() as any[];

    const customers = customersRaw.map((row: any) => ({
      email: row.email,
      name: row.name,
      totalLeads: row.total_leads,
      totalOrders: row.total_orders,
      lastLeadDate: row.last_lead_date,
    }));

    return NextResponse.json({ customers });
  } catch (error) {
    console.error("Error fetching customers:", error);
    return NextResponse.json({ error: "Fehler beim Laden der Kunden" }, { status: 500 });
  }
}
