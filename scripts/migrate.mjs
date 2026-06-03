import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import pg from "pg";

const { Pool } = pg;

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("DATABASE_URL nicht gesetzt — Migration übersprungen");
    return;
  }

  const pool = new Pool({ connectionString: url });

  // Test connection before running migrations
  try {
    const client = await pool.connect();
    await client.query("SELECT 1");
    client.release();
    console.log("Datenbankverbindung hergestellt");
  } catch (err) {
    console.error("Keine Datenbankverbindung — Migration übersprungen:", err.message);
    await pool.end();
    return;
  }

  const db = drizzle(pool);

  console.log("Führe Datenbank-Migrationen aus...");
  await migrate(db, { migrationsFolder: "drizzle" });
  console.log("✅ Migrationen erfolgreich angewendet");

  await pool.end();
}

main().catch((err) => {
  console.error("❌ Migration fehlgeschlagen:", err);
  process.exit(1);
});
