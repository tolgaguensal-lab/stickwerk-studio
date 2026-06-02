import { pgTable, text, timestamp, integer, jsonb, boolean, serial } from "drizzle-orm/pg-core";

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  created: timestamp("created").defaultNow().notNull(),
  updated: timestamp("updated").defaultNow().notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").default(""),
  company: text("company").default(""),
  message: text("message").default(""),
  patchConfig: jsonb("patch_config").default({}),
  estimatedPriceMin: integer("estimated_price_min").default(0),
  estimatedPriceMax: integer("estimated_price_max").default(0),
  status: text("status").default("new").notNull(),
  source: text("source").default("website"),
  adminNotes: text("admin_notes").default(""),
  consentPrivacy: boolean("consent_privacy").notNull(),
  consentTimestamp: text("consent_timestamp"),
  privacyVersion: text("privacy_version").default("1.0"),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  created: timestamp("created").defaultNow().notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").default(""),
  subject: text("subject").default(""),
  message: text("message").notNull(),
  status: text("status").default("new").notNull(),
  consentPrivacy: boolean("consent_privacy").notNull(),
  consentTimestamp: text("consent_timestamp"),
  privacyVersion: text("privacy_version").default("1.0"),
});

export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type NewContactMessage = typeof contactMessages.$inferInsert;
