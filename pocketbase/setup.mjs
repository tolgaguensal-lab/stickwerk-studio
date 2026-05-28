#!/usr/bin/env node

/**
 * PocketBase Setup Script
 * 
 * Run this after starting PocketBase to create the required collections.
 * Usage: node pocketbase/setup.mjs
 */

import PocketBase from "pocketbase";

const POCKETBASE_URL = process.env.POCKETBASE_URL || "http://127.0.0.1:8090";
const ADMIN_EMAIL = process.env.POCKETBASE_ADMIN_EMAIL || "admin@stickwerk-studio.de";
const ADMIN_PASSWORD = process.env.POCKETBASE_ADMIN_PASSWORD || "admin12345678";

async function setup() {
  const pb = new PocketBase(POCKETBASE_URL);

  console.log("Connecting to PocketBase:", POCKETBASE_URL);

  // Authenticate as admin
  try {
    await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
    console.log("Authenticated as admin");
  } catch (error) {
    console.error("Admin auth failed. Make sure PocketBase is running and admin account exists.");
    console.error("Error:", error.message);
    process.exit(1);
  }

  // Create leads collection
  try {
    await pb.collections.create({
      name: "leads",
      type: "base",
      fields: [
        { name: "name", type: "text", required: true },
        { name: "email", type: "email", required: true },
        { name: "phone", type: "text" },
        { name: "company", type: "text" },
        { name: "message", type: "editor" },
        { name: "patch_config", type: "json" },
        { name: "estimated_price_min", type: "number" },
        { name: "estimated_price_max", type: "number" },
        { name: "status", type: "select", options: { values: ["new", "contacted", "quoted", "won", "lost", "archived"] } },
        { name: "source", type: "text" },
        { name: "consent_privacy", type: "bool" },
        { name: "consent_timestamp", type: "date" },
        { name: "privacy_version", type: "text" },
        { name: "admin_notes", type: "editor" },
      ],
      indexes: [
        "CREATE INDEX idx_leads_email ON leads (email)",
        "CREATE INDEX idx_leads_status ON leads (status)",
        "CREATE INDEX idx_leads_created ON leads (created DESC)",
      ],
    });
    console.log("Created 'leads' collection");
  } catch (error) {
    if (error.message?.includes("already exists")) {
      console.log("'leads' collection already exists");
    } else {
      console.error("Failed to create 'leads':", error.message);
    }
  }

  // Create contact_messages collection
  try {
    await pb.collections.create({
      name: "contact_messages",
      type: "base",
      fields: [
        { name: "name", type: "text", required: true },
        { name: "email", type: "email", required: true },
        { name: "phone", type: "text" },
        { name: "subject", type: "text" },
        { name: "message", type: "editor", required: true },
        { name: "status", type: "select", options: { values: ["new", "read", "replied", "archived"] } },
        { name: "consent_privacy", type: "bool" },
        { name: "consent_timestamp", type: "date" },
        { name: "privacy_version", type: "text" },
      ],
      indexes: [
        "CREATE INDEX idx_contact_email ON contact_messages (email)",
        "CREATE INDEX idx_contact_status ON contact_messages (status)",
      ],
    });
    console.log("Created 'contact_messages' collection");
  } catch (error) {
    if (error.message?.includes("already exists")) {
      console.log("'contact_messages' collection already exists");
    } else {
      console.error("Failed to create 'contact_messages':", error.message);
    }
  }

  console.log("\nSetup complete!");
  console.log("PocketBase Admin: http://127.0.0.1:8090/_/");
}

setup().catch(console.error);
