import { NextResponse } from "next/server";
import { db, schema } from "@/lib/db";
import { eq, sql, count, and, gte, lte } from "drizzle-orm";

export async function GET() {
  try {
    // Get all leads for stats
    const allLeads = await db.select().from(schema.leads);
    const allOrders = await db.select().from(schema.orders);

    // Revenue calculations
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    
    const revenueTotal = allOrders
      .filter(o => o.status !== "cancelled")
      .reduce((sum, o) => sum + parseFloat(o.totalPrice || "0"), 0);
    
    const revenueThisMonth = allOrders
      .filter(o => o.status !== "cancelled" && new Date(o.createdAt) >= startOfMonth)
      .reduce((sum, o) => sum + parseFloat(o.totalPrice || "0"), 0);

    // Popular shapes from patchConfig
    const shapeCounts: Record<string, number> = {};
    const sizeCounts: Record<string, number> = {};
    
    for (const lead of allLeads) {
      const config = (lead.patchConfig || {}) as Record<string, unknown>;
      const shape = config.shape as string;
      const size = config.size as string;
      if (shape) shapeCounts[shape] = (shapeCounts[shape] || 0) + 1;
      if (size) sizeCounts[size] = (sizeCounts[size] || 0) + 1;
    }

    const popularShapes = Object.entries(shapeCounts)
      .map(([shape, count]) => ({ shape, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const popularSizes = Object.entries(sizeCounts)
      .map(([size, count]) => ({ size, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Leads per day for last 7 days
    const leadsLast7Days: { date: string; count: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      const dayStart = new Date(dateStr);
      const dayEnd = new Date(dayStart);
      dayEnd.setDate(dayEnd.getDate() + 1);

      const dayLeads = allLeads.filter(l => {
        const ld = new Date(l.created);
        return ld >= dayStart && ld < dayEnd;
      });
      
      leadsLast7Days.push({
        date: d.toLocaleDateString("de-DE", { weekday: "short", day: "numeric" }),
        count: dayLeads.length,
      });
    }

    return NextResponse.json({
      stats: {
        totalLeads: allLeads.length,
        newLeads: allLeads.filter(l => l.status === "new").length,
        inProgressLeads: allLeads.filter(l => l.status === "in_progress").length,
        wonLeads: allLeads.filter(l => l.status === "won").length,
        totalOrders: allOrders.length,
        activeOrders: allOrders.filter(o => !["done", "cancelled"].includes(o.status)).length,
        doneOrders: allOrders.filter(o => o.status === "done").length,
        revenueThisMonth,
        revenueTotal,
        popularShapes,
        popularSizes,
        leadsLast7Days,
      },
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json({ error: "Fehler beim Laden der Statistiken" }, { status: 500 });
  }
}
