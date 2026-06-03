CREATE TYPE "public"."order_status" AS ENUM('lead_received', 'digitizing', 'digitizing_done', 'sample_production', 'sample_approved', 'embroidery', 'quality_check', 'shipping', 'done', 'cancelled');--> statement-breakpoint
CREATE TABLE "order_status_history" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" integer NOT NULL,
	"status" "order_status" NOT NULL,
	"changed_at" timestamp DEFAULT now() NOT NULL,
	"changed_by" text DEFAULT 'admin',
	"note" text DEFAULT ''
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"order_number" text NOT NULL,
	"lead_id" integer,
	"customer_name" text NOT NULL,
	"customer_email" text NOT NULL,
	"customer_phone" text DEFAULT '',
	"product_type" text DEFAULT 'patch',
	"patch_config" jsonb DEFAULT '{}'::jsonb,
	"total_price" numeric(10, 2) DEFAULT '0',
	"status" "order_status" DEFAULT 'lead_received' NOT NULL,
	"notes" text DEFAULT '',
	"shipping_address" text DEFAULT '',
	"tracking_number" text DEFAULT '',
	CONSTRAINT "orders_order_number_unique" UNIQUE("order_number")
);
--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "product_type" text DEFAULT 'patch';--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "converted_to_order_at" timestamp;--> statement-breakpoint
ALTER TABLE "order_status_history" ADD CONSTRAINT "order_status_history_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_lead_id_leads_id_fk" FOREIGN KEY ("lead_id") REFERENCES "public"."leads"("id") ON DELETE no action ON UPDATE no action;