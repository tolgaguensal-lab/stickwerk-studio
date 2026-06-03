import { pgTable, text, timestamp, integer, jsonb, boolean, serial, decimal, pgEnum } from "drizzle-orm/pg-core";

export const orderStatusEnum = pgEnum("order_status", [
  "lead_received",
  "digitizing",
  "digitizing_done",
  "sample_production",
  "sample_approved",
  "embroidery",
  "quality_check",
  "shipping",
  "done",
  "cancelled",
]);

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
  productType: text("product_type").default("patch"),
  estimatedPriceMin: integer("estimated_price_min").default(0),
  estimatedPriceMax: integer("estimated_price_max").default(0),
  status: text("status").default("new").notNull(),
  source: text("source").default("website"),
  adminNotes: text("admin_notes").default(""),
  consentPrivacy: boolean("consent_privacy").notNull(),
  consentTimestamp: text("consent_timestamp"),
  privacyVersion: text("privacy_version").default("1.0"),
  convertedToOrderAt: timestamp("converted_to_order_at"),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  orderNumber: text("order_number").notNull().unique(),
  leadId: integer("lead_id").references(() => leads.id),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone").default(""),
  productType: text("product_type").default("patch"),
  patchConfig: jsonb("patch_config").default({}),
  totalPrice: decimal("total_price", { precision: 10, scale: 2 }).default("0"),
  status: orderStatusEnum("status").default("lead_received").notNull(),
  notes: text("notes").default(""),
  shippingAddress: text("shipping_address").default(""),
  trackingNumber: text("tracking_number").default(""),
});

export const orderStatusHistory = pgTable("order_status_history", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").references(() => orders.id).notNull(),
  status: orderStatusEnum("status").notNull(),
  changedAt: timestamp("changed_at").defaultNow().notNull(),
  changedBy: text("changed_by").default("admin"),
  note: text("note").default(""),
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
export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;
export type OrderStatusHistory = typeof orderStatusHistory.$inferSelect;
export type NewOrderStatusHistory = typeof orderStatusHistory.$inferInsert;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type NewContactMessage = typeof contactMessages.$inferInsert;
