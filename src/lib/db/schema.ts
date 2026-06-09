import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const leads = sqliteTable("leads", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  created: text("created").default("(datetime('now'))").notNull(),
  updated: text("updated").default("(datetime('now'))").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").default(""),
  company: text("company").default(""),
  message: text("message").default(""),
  patchConfig: text("patch_config").default("{}"),
  productType: text("product_type").default("patch"),
  estimatedPriceMin: integer("estimated_price_min").default(0),
  estimatedPriceMax: integer("estimated_price_max").default(0),
  status: text("status").default("new").notNull(),
  source: text("source").default("website"),
  adminNotes: text("admin_notes").default(""),
  consentPrivacy: integer("consent_privacy", { mode: "boolean" }).notNull(),
  consentTimestamp: text("consent_timestamp"),
  privacyVersion: text("privacy_version").default("1.0"),
  convertedToOrderAt: text("converted_to_order_at"),
});

export const orders = sqliteTable("orders", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  createdAt: text("created_at").default("(datetime('now'))").notNull(),
  updatedAt: text("updated_at").default("(datetime('now'))").notNull(),
  orderNumber: text("order_number").notNull().unique(),
  leadId: integer("lead_id").references(() => leads.id),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone").default(""),
  productType: text("product_type").default("patch"),
  patchConfig: text("patch_config").default("{}"),
  totalPrice: text("total_price").default("0"),
  status: text("status").default("lead_received").notNull(),
  notes: text("notes").default(""),
  shippingAddress: text("shipping_address").default(""),
  trackingNumber: text("tracking_number").default(""),
});

export const orderStatusHistory = sqliteTable("order_status_history", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  orderId: integer("order_id").references(() => orders.id).notNull(),
  status: text("status").notNull(),
  changedAt: text("changed_at").default("(datetime('now'))").notNull(),
  changedBy: text("changed_by").default("admin"),
  note: text("note").default(""),
});

export const contactMessages = sqliteTable("contact_messages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  created: text("created").default("(datetime('now'))").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").default(""),
  subject: text("subject").default(""),
  message: text("message").notNull(),
  status: text("status").default("new").notNull(),
  consentPrivacy: integer("consent_privacy", { mode: "boolean" }).notNull(),
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
