#!/usr/bin/env node
/**
 * Migrate data from PostgreSQL to SQLite
 * Run this on ZimaOS to transfer existing data
 */

const { Client } = require("pg");
const Database = require("better-sqlite3");

async function main() {
  console.log("🔄 Starting PostgreSQL → SQLite migration...\n");

  // PostgreSQL connection
  const pgClient = new Client({
    host: process.env.POSTGRES_HOST || "stickwerk-db",
    port: parseInt(process.env.POSTGRES_PORT || "5432"),
    database: process.env.POSTGRES_DATABASE || "stickwerk",
    user: process.env.POSTGRES_USER || "stickwerk",
    password: process.env.POSTGRES_PASSWORD || "stickwerk",
  });

  // SQLite database
  const sqlite = new Database(process.env.DATABASE_URL || "/data/stickwerk.db");
  sqlite.pragma("journal_mode = WAL");
  sqlite.pragma("foreign_keys = ON");

  try {
    await pgClient.connect();
    console.log("✓ Connected to PostgreSQL");

    // ---- Export leads ----
    console.log("\n📤 Exporting leads from PostgreSQL...");
    const leadsResult = await pgClient.query(`
      SELECT id, created, updated, name, email, phone, company, message, 
             patch_config, product_type, estimated_price_min, estimated_price_max,
             status, source, admin_notes, consent_privacy, consent_timestamp,
             privacy_version, converted_to_order_at
      FROM leads
      ORDER BY created DESC
    `);
    console.log(`  Found ${leadsResult.rows.length} leads`);

    // Insert into SQLite
    if (leadsResult.rows.length > 0) {
      const insertLead = sqlite.prepare(`
        INSERT INTO leads (id, created, updated, name, email, phone, company, message,
                           patch_config, product_type, estimated_price_min, estimated_price_max,
                           status, source, admin_notes, consent_privacy, consent_timestamp,
                           privacy_version, converted_to_order_at)
        VALUES (@id, @created, @updated, @name, @email, @phone, @company, @message,
                @patch_config, @product_type, @estimated_price_min, @estimated_price_max,
                @status, @source, @admin_notes, @consent_privacy, @consent_timestamp,
                @privacy_version, @converted_to_order_at)
      `);

      sqlite.transaction(() => {
        for (const row of leadsResult.rows) {
          insertLead.run({
            ...row,
            consent_privacy: row.consent_privacy ? 1 : 0,
          });
        }
      })();
      console.log("  ✓ Leads migrated to SQLite");
    }

    // ---- Export contact_messages ----
    console.log("\n📤 Exporting contact messages from PostgreSQL...");
    const messagesResult = await pgClient.query(`
      SELECT id, created, name, email, phone, subject, message, status,
             consent_privacy, consent_timestamp, privacy_version
      FROM contact_messages
      ORDER BY created DESC
    `);
    console.log(`  Found ${messagesResult.rows.length} contact messages`);

    if (messagesResult.rows.length > 0) {
      const insertMessage = sqlite.prepare(`
        INSERT INTO contact_messages (id, created, name, email, phone, subject, message,
                                      status, consent_privacy, consent_timestamp, privacy_version)
        VALUES (@id, @created, @name, @email, @phone, @subject, @message,
                @status, @consent_privacy, @consent_timestamp, @privacy_version)
      `);

      sqlite.transaction(() => {
        for (const row of messagesResult.rows) {
          insertMessage.run({
            ...row,
            consent_privacy: row.consent_privacy ? 1 : 0,
          });
        }
      })();
      console.log("  ✓ Contact messages migrated to SQLite");
    }

    console.log("\n✅ Migration complete!");
    console.log(`   Leads: ${leadsResult.rows.length}`);
    console.log(`   Contact Messages: ${messagesResult.rows.length}`);

  } finally {
    await pgClient.end();
    sqlite.close();
    console.log("\n👋 Databases closed.\n");
  }
}

main().catch((err) => {
  console.error("❌ Migration failed:", err.message);
  process.exit(1);
});
