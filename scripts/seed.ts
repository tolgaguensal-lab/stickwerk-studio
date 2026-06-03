/**
 * Seed-Script: Erzeugt Demo-Daten (Leads + Orders) für die Entwicklung.
 *
 * Usage:
 *   npx tsx scripts/seed.ts
 *
 * Voraussetzung: DATABASE_URL in .env muss auf eine laufende PostgreSQL zeigen.
 */

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { eq } from "drizzle-orm";
import * as schema from "../src/lib/db/schema";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool, { schema });

async function main() {
  console.log("🌱 Seeding database...\n");

  // ---- Leads ----
  const leadData = [
    {
      name: "Thomas Wagner",
      email: "thomas.wagner@feuerwehr-musterstadt.de",
      phone: "+49 176 12345678",
      company: "Freiwillige Feuerwehr Musterstadt",
      message: "Hallo, wir brauchen 120 Patches für unsere Einsatzjacken. Bevorzugt mit Klett-Rückseite, oval, ca. 10x8cm. Können Sie uns ein Angebot machen?",
      patchConfig: { shape: "oval", size: "large", complexity: "moderate", edge: "merrow", quantity: "120", colors: "4", backing: "velcro" },
      productType: "patch",
      status: "in_progress",
      source: "website",
      consentPrivacy: true,
      consentTimestamp: new Date().toISOString(),
    },
    {
      name: "Sandra Klein",
      email: "s.klein@hundeschule-bellheim.de",
      phone: "+49 172 98765432",
      company: "Hundeschule Bellheim",
      message: "Ich möchte Patches für unsere Hundeschule bestellen. Ca. 50 Stück, runde Patches mit Logo, einfarbig. Bitte um Preisangebot.",
      patchConfig: { shape: "circle", size: "medium", complexity: "simple", edge: "merrow", quantity: "50", colors: "1", backing: "iron_on" },
      productType: "patch",
      status: "quoted",
      source: "website",
      consentPrivacy: true,
      consentTimestamp: new Date().toISOString(),
    },
    {
      name: "Michael Brandt",
      email: "michael@brandt-design.de",
      phone: "+49 151 55512345",
      company: "Brandt Design Agentur",
      message: "Für ein Kundenprojekt benötigen wir 500 Patches in zwei verschiedenen Ausführungen. Komplexes Design mit vielen Farben. Bitte kontaktieren Sie mich für die Details.",
      patchConfig: { shape: "shield", size: "large", complexity: "complex", edge: "merrow", quantity: "500", colors: "8", backing: "velcro" },
      productType: "patch",
      status: "new",
      source: "configurator",
      consentPrivacy: true,
      consentTimestamp: new Date().toISOString(),
    },
    {
      name: "Julia Hoffmann",
      email: "julia.hoffmann@vfl-sport.de",
      phone: "+49 160 33344455",
      company: "VfL Sportverein 1892",
      message: "Wir brauchen 200 Patches für unsere Vereinsjacken. Das Design ist beigefügt. Rechteckig, mittlere Größe, mit Klett. Bitte um Angebot inkl. Digitalisierung.",
      patchConfig: { shape: "rectangle", size: "medium", complexity: "moderate", edge: "merrow", quantity: "200", colors: "3", backing: "velcro" },
      productType: "patch",
      status: "won",
      source: "website",
      consentPrivacy: true,
      consentTimestamp: new Date().toISOString(),
    },
    {
      name: "Christian Weber",
      email: "c.weber@bergwacht-sachsen.de",
      phone: "",
      company: "Bergwacht Sachsen",
      message: "Hallo, ich habe über den Konfigurator ein Design erstellt, bekomme aber keine genaue Preisangabe. Können Sie mir einen Kostenvoranschlag für 80 Patches machen?",
      patchConfig: { shape: "diamond", size: "small", complexity: "moderate", edge: "merrow", quantity: "80", colors: "2", backing: "velcro" },
      productType: "patch",
      status: "archived",
      source: "configurator",
      consentPrivacy: true,
      consentTimestamp: new Date().toISOString(),
    },
    {
      name: "Laura Schmidt",
      email: "laura@pfadfinder-stamm-berlin.de",
      phone: "+49 176 99988776",
      company: "Pfadfinderstamm Berlin-Spandau",
      message: "Wir sind eine Pfadfindergruppe und wollen Aufnäher für unser diesjähriges Sommerlager. 30 Stück, mit unserem Lager-Motiv. Danke!",
      patchConfig: { shape: "rectangle", size: "small", complexity: "moderate", edge: "merrow", quantity: "30", colors: "4", backing: "sew_on" },
      productType: "patch",
      status: "lost",
      source: "website",
      consentPrivacy: true,
      consentTimestamp: new Date().toISOString(),
    },
  ];

  console.log(`  Inserting ${leadData.length} leads...`);
  for (const lead of leadData) {
    // Use raw SQL to insert with fixed timestamps spreading across last 30 days
    const daysAgo = Math.floor(Math.random() * 30);
    const created = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);
    const updated = new Date(created.getTime() + Math.random() * 24 * 60 * 60 * 1000);

    await db.insert(schema.leads).values({
      ...lead,
      created,
      updated,
    } as any);
  }
  console.log("  ✓ Leads inserted.\n");

  // ---- Orders ----
  const demoNames = ["Thomas Wagner", "Sandra Klein"];
  const demoEmails = ["thomas.wagner@feuerwehr-musterstadt.de", "s.klein@hundeschule-bellheim.de"];
  const orderStatuses = ["lead_received", "digitizing", "embroidery", "quality_check", "shipping", "done"];

  // Fetch inserted leads to get their IDs
  const allLeads = await db.select().from(schema.leads);

  console.log(`  Inserting ${demoNames.length} orders...`);
  for (let i = 0; i < demoNames.length; i++) {
    const lead = allLeads.find((l) => l.email === demoEmails[i]);
    const daysAgo = Math.floor(Math.random() * 14);
    const createdAt = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);

    const [order] = await db.insert(schema.orders).values({
      orderNumber: `SW-2026-${String(1001 + i).padStart(4, "0")}`,
      leadId: lead?.id,
      customerName: demoNames[i],
      customerEmail: demoEmails[i],
      customerPhone: lead?.phone || "",
      productType: "patch",
      patchConfig: lead?.patchConfig || {},
      totalPrice: i === 0 ? "480.00" : "175.00",
      status: i === 0 ? "embroidery" : "done",
      notes: lead?.message || "",
      createdAt,
      updatedAt: new Date(createdAt.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000),
    } as any).returning();

    // Create status history
    const statusDate = new Date(createdAt);
    for (const status of orderStatuses) {
      if (status === "lead_received") {
        await db.insert(schema.orderStatusHistory).values({
          orderId: order.id,
          status,
          changedBy: "system",
          note: "Auftrag erstellt",
          changedAt: statusDate,
        } as any);
        statusDate.setHours(statusDate.getHours() + 2);
        continue;
      }
      // Stop at current status
      const currentOrderStatus = i === 0 ? "embroidery" : "done";
      if (status === currentOrderStatus) break;

      await db.insert(schema.orderStatusHistory).values({
        orderId: order.id,
        status,
        changedBy: "admin",
        note: `Status geändert zu ${status}`,
        changedAt: new Date(statusDate),
      } as any);
      statusDate.setDate(statusDate.getDate() + 1);
    }
  }
  console.log("  ✓ Orders inserted.\n");

  // Update "won" lead to have convertedToOrderAt
  const wonLead = allLeads.find((l) => l.status === "won");
  if (wonLead) {
    await db.update(schema.leads)
      .set({ convertedToOrderAt: new Date() } as any)
      .where(eq(schema.leads.id, wonLead.id));
  }

  console.log("✅ Seeding complete!");
  console.log(`   Leads: ${leadData.length}`);
  console.log(`   Orders: ${demoNames.length}`);
  console.log("\nYou can now log in to /admin and view the demo data.");
  console.log("Login credentials are configured via ADMIN_USER / ADMIN_PASS in .env\n");

  await pool.end();
}

main().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
