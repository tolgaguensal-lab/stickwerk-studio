import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import Database from "better-sqlite3";

function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("DATABASE_URL nicht gesetzt — Migration übersprungen");
    return;
  }

  const sqlite = new Database(url);

  try {
    sqlite.prepare("SELECT 1").get();
    console.log("Datenbankverbindung hergestellt");
  } catch (err) {
    console.error("Keine Datenbankverbindung — Migration übersprungen:", err.message);
    sqlite.close();
    return;
  }

  const db = drizzle(sqlite);

  console.log("Führe Datenbank-Migrationen aus...");
  migrate(db, { migrationsFolder: "drizzle" });
  console.log("✅ Migrationen erfolgreich angewendet");

  sqlite.close();
}

main();
