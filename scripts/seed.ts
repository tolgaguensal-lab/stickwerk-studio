/**
 * Seed-Script: Erzeugt Demo-Daten (Leads + Orders) für die Entwicklung.
 *
 * Usage:
 *   npx tsx scripts/seed.ts
 *
 * Voraussetzung: DATABASE_URL in .env muss auf die SQLite-Datenbank zeigen.
 */

import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { eq } from "drizzle-orm";
import * as schema from "../src/lib/db/schema";

const sqlite = new Database(process.env.DATABASE_URL || "./stickwerk.db");
const db = drizzle(sqlite, { schema });

function isoNow(): string {
  return new Date().toISOString().replace("T", " ").slice(0, 19);
}

function isoDaysAgo(days: number): string {
  const d = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  return d.toISOString().replace("T", " ").slice(0, 19);
}

function main() {
  console.log("🌱 Seeding database...\n");

  // ---- Leads ----
  const leadData = [
    {
      name: "Thomas Wagner",
      email: "thomas.wagner@feuerwehr-musterstadt.de",
      phone: "+49 176 12345678",
      company: "Freiwillige Feuerwehr Musterstadt",
      message:
        "Hallo, wir brauchen 120 Patches für unsere Einsatzjacken. Bevorzugt mit Klett-Rückseite, oval, ca. 10x8cm. Können Sie uns ein Angebot machen?",
      patchConfig: JSON.stringify({ shape: "oval", size: "large", complexity: "moderate", edge: "merrow", quantity: "120", colors: "4", backing: "velcro" }),
      productType: "patch",
      status: "in_progress",
      source: "website",
      consentPrivacy: true,
      consentTimestamp: isoNow(),
    },
    {
      name: "Sandra Klein",
      email: "s.klein@hundeschule-bellheim.de",
      phone: "+49 172 98765432",
      company: "Hundeschule Bellheim",
      message:
        "Ich möchte Patches für unsere Hundeschule bestellen. Ca. 50 Stück, runde Patches mit Logo, einfarbig. Bitte um Preisangebot.",
      patchConfig: JSON.stringify({ shape: "circle", size: "medium", complexity: "simple", edge: "merrow", quantity: "50", colors: "1", backing: "iron_on" }),
      productType: "patch",
      status: "quoted",
      source: "website",
      consentPrivacy: true,
      consentTimestamp: isoNow(),
    },
    {
      name: "Michael Brandt",
      email: "michael@brandt-design.de",
      phone: "+49 151 55512345",
      company: "Brandt Design Agentur",
      message:
        "Für ein Kundenprojekt benötigen wir 500 Patches in zwei verschiedenen Ausführungen. Komplexes Design mit vielen Farben. Bitte kontaktieren Sie mich für die Details.",
      patchConfig: JSON.stringify({ shape: "shield", size: "large", complexity: "complex", edge: "merrow", quantity: "500", colors: "8", backing: "velcro" }),
      productType: "patch",
      status: "new",
      source: "configurator",
      consentPrivacy: true,
      consentTimestamp: isoNow(),
    },
    {
      name: "Julia Hoffmann",
      email: "julia.hoffmann@vfl-sport.de",
      phone: "+49 160 33344455",
      company: "VfL Sportverein 1892",
      message:
        "Wir brauchen 200 Patches für unsere Vereinsjacken. Das Design ist beigefügt. Rechteckig, mittlere Größe, mit Klett. Bitte um Angebot inkl. Digitalisierung.",
      patchConfig: JSON.stringify({ shape: "rectangle", size: "medium", complexity: "moderate", edge: "merrow", quantity: "200", colors: "3", backing: "velcro" }),
      productType: "patch",
      status: "won",
      source: "website",
      consentPrivacy: true,
      consentTimestamp: isoNow(),
    },
    {
      name: "Christian Weber",
      email: "c.weber@bergwacht-sachsen.de",
      phone: "",
      company: "Bergwacht Sachsen",
      message:
        "Hallo, ich habe über den Konfigurator ein Design erstellt, bekomme aber keine genaue Preisangabe. Können Sie mir einen Kostenvoranschlag für 80 Patches machen?",
      patchConfig: JSON.stringify({ shape: "diamond", size: "small", complexity: "moderate", edge: "merrow", quantity: "80", colors: "2", backing: "velcro" }),
      productType: "patch",
      status: "archived",
      source: "configurator",
      consentPrivacy: true,
      consentTimestamp: isoNow(),
    },
    {
      name: "Laura Schmidt",
      email: "laura@pfadfinder-stamm-berlin.de",
      phone: "+49 176 99988776",
      company: "Pfadfinderstamm Berlin-Spandau",
      message:
        "Wir sind eine Pfadfindergruppe und wollen Aufnäher für unser diesjähriges Sommerlager. 30 Stück, mit unserem Lager-Motiv. Danke!",
      patchConfig: JSON.stringify({ shape: "rectangle", size: "small", complexity: "moderate", edge: "merrow", quantity: "30", colors: "4", backing: "sew_on" }),
      productType: "patch",
      status: "lost",
      source: "website",
      consentPrivacy: true,
      consentTimestamp: isoNow(),
    },
  ];

  console.log(`  Inserting ${leadData.length} leads...`);
  const insertLead = sqlite.prepare(
    `INSERT INTO leads (created, updated, name, email, phone, company, message, patch_config, product_type, status, source, consent_privacy, consent_timestamp, privacy_version)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, '1.0')`
  );

  const insertMany = sqlite.transaction(() => {
    for (const lead of leadData) {
      const daysAgo = Math.floor(Math.random() * 30);
      const created = isoDaysAgo(daysAgo);
      const updated = isoDaysAgo(daysAgo - Math.floor(Math.random() * 2));
      insertLead.run(
        created,
        updated,
        lead.name,
        lead.email,
        lead.phone,
        lead.company,
        lead.message,
        lead.patchConfig,
        lead.productType,
        lead.status,
        lead.source,
        lead.consentPrivacy ? 1 : 0,
        lead.consentTimestamp
      );
    }
  });

  insertMany();
  console.log("  ✓ Leads inserted.\n");

  // ---- Orders ----
  const demoNames = ["Thomas Wagner", "Sandra Klein"];
  const demoEmails = ["thomas.wagner@feuerwehr-musterstadt.de", "s.klein@hundeschule-bellheim.de"];
  const orderStatuses = ["lead_received", "digitizing", "embroidery", "quality_check", "shipping", "done"];

  const allLeads = sqlite.prepare("SELECT * FROM leads").all() as any[];

  console.log(`  Inserting ${demoNames.length} orders...`);
  const insertOrder = sqlite.prepare(
    `INSERT INTO orders (created_at, updated_at, order_number, lead_id, customer_name, customer_email, customer_phone, product_type, patch_config, total_price, status, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  );
  const insertHistory = sqlite.prepare(
    `INSERT INTO order_status_history (order_id, status, changed_at, changed_by, note)
     VALUES (?, ?, ?, ?, ?)`
  );
  const updateLead = sqlite.prepare("UPDATE leads SET converted_to_order_at = ? WHERE id = ?");

  const orderTransaction = sqlite.transaction(() => {
    for (let i = 0; i < demoNames.length; i++) {
      const lead = allLeads.find((l: any) => l.email === demoEmails[i]);
      const daysAgo = Math.floor(Math.random() * 14);
      const createdAt = isoDaysAgo(daysAgo);

      const result = insertOrder.run(
        createdAt,
        createdAt,
        `SW-2026-${String(1001 + i).padStart(4, "0")}`,
        lead?.id || null,
        demoNames[i],
        demoEmails[i],
        lead?.phone || "",
        "patch",
        lead?.patch_config || "{}",
        i === 0 ? "480.00" : "175.00",
        i === 0 ? "embroidery" : "done",
        lead?.message || ""
      );

      const orderId = result.lastInsertRowid as number;

      // Create status history
      let statusDate = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);
      for (const status of orderStatuses) {
        if (status === "lead_received") {
          insertHistory.run(
            orderId,
            status,
            statusDate.toISOString().replace("T", " ").slice(0, 19),
            "system",
            "Auftrag erstellt"
          );
          statusDate.setHours(statusDate.getHours() + 2);
          continue;
        }
        const currentOrderStatus = i === 0 ? "embroidery" : "done";
        if (status === currentOrderStatus) break;

        insertHistory.run(
          orderId,
          status,
          statusDate.toISOString().replace("T", " ").slice(0, 19),
          "admin",
          `Status geändert zu ${status}`
        );
        statusDate.setDate(statusDate.getDate() + 1);
      }
    }

    // Update "won" lead
    const won = allLeads.find((l: any) => l.status === "won");
    if (won) {
      updateLead.run(isoNow(), won.id);
    }
  });

  orderTransaction();
  console.log("  ✓ Orders inserted.\n");

  console.log("✅ Seeding complete!");
  console.log(`   Leads: ${leadData.length}`);
  console.log(`   Orders: ${demoNames.length}`);
  console.log("\nYou can now log in to /admin and view the demo data.");
  console.log("Login credentials are configured via ADMIN_USER / ADMIN_PASS in .env\n");

  sqlite.close();
}

main();
