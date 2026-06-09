CREATE TABLE `contact_messages` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created` text DEFAULT '(datetime(''now''))' NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text DEFAULT '',
	`subject` text DEFAULT '',
	`message` text NOT NULL,
	`status` text DEFAULT 'new' NOT NULL,
	`consent_privacy` integer NOT NULL,
	`consent_timestamp` text,
	`privacy_version` text DEFAULT '1.0'
);
--> statement-breakpoint
CREATE TABLE `leads` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created` text DEFAULT '(datetime(''now''))' NOT NULL,
	`updated` text DEFAULT '(datetime(''now''))' NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text DEFAULT '',
	`company` text DEFAULT '',
	`message` text DEFAULT '',
	`patch_config` text DEFAULT '{}',
	`product_type` text DEFAULT 'patch',
	`estimated_price_min` integer DEFAULT 0,
	`estimated_price_max` integer DEFAULT 0,
	`status` text DEFAULT 'new' NOT NULL,
	`source` text DEFAULT 'website',
	`admin_notes` text DEFAULT '',
	`consent_privacy` integer NOT NULL,
	`consent_timestamp` text,
	`privacy_version` text DEFAULT '1.0',
	`converted_to_order_at` text
);
--> statement-breakpoint
CREATE TABLE `order_status_history` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`order_id` integer NOT NULL,
	`status` text NOT NULL,
	`changed_at` text DEFAULT '(datetime(''now''))' NOT NULL,
	`changed_by` text DEFAULT 'admin',
	`note` text DEFAULT '',
	FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` text DEFAULT '(datetime(''now''))' NOT NULL,
	`updated_at` text DEFAULT '(datetime(''now''))' NOT NULL,
	`order_number` text NOT NULL,
	`lead_id` integer,
	`customer_name` text NOT NULL,
	`customer_email` text NOT NULL,
	`customer_phone` text DEFAULT '',
	`product_type` text DEFAULT 'patch',
	`patch_config` text DEFAULT '{}',
	`total_price` text DEFAULT '0',
	`status` text DEFAULT 'lead_received' NOT NULL,
	`notes` text DEFAULT '',
	`shipping_address` text DEFAULT '',
	`tracking_number` text DEFAULT '',
	FOREIGN KEY (`lead_id`) REFERENCES `leads`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `orders_order_number_unique` ON `orders` (`order_number`);