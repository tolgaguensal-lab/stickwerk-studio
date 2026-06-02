CREATE TABLE "contact_messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"created" timestamp DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text DEFAULT '',
	"subject" text DEFAULT '',
	"message" text NOT NULL,
	"status" text DEFAULT 'new' NOT NULL,
	"consent_privacy" boolean NOT NULL,
	"consent_timestamp" text,
	"privacy_version" text DEFAULT '1.0'
);
--> statement-breakpoint
CREATE TABLE "leads" (
	"id" serial PRIMARY KEY NOT NULL,
	"created" timestamp DEFAULT now() NOT NULL,
	"updated" timestamp DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text DEFAULT '',
	"company" text DEFAULT '',
	"message" text DEFAULT '',
	"patch_config" jsonb DEFAULT '{}'::jsonb,
	"estimated_price_min" integer DEFAULT 0,
	"estimated_price_max" integer DEFAULT 0,
	"status" text DEFAULT 'new' NOT NULL,
	"source" text DEFAULT 'website',
	"admin_notes" text DEFAULT '',
	"consent_privacy" boolean NOT NULL,
	"consent_timestamp" text,
	"privacy_version" text DEFAULT '1.0'
);
