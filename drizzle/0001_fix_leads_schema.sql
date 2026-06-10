-- Fix PostgreSQL leads table to match SQLite schema
-- Run this on ZimaOS: docker exec -i stickwerk-db psql -U stickwerk -d stickwerk < this-file.sql

-- Add missing columns to leads table
ALTER TABLE "leads" 
ADD COLUMN IF NOT EXISTS "product_type" text DEFAULT 'patch' NOT NULL,
ADD COLUMN IF NOT EXISTS "converted_to_order_at" timestamp NULL;

-- Verify the schema
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'leads' 
ORDER BY ordinal_position;
