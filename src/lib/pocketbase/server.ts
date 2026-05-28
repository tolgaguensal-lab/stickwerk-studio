import PocketBase from "pocketbase";

const POCKETBASE_URL = process.env.POCKETBASE_URL || "http://127.0.0.1:8090";
const POCKETBASE_ADMIN_EMAIL = process.env.POCKETBASE_ADMIN_EMAIL || "admin@stickwerk-studio.de";
const POCKETBASE_ADMIN_PASSWORD = process.env.POCKETBASE_ADMIN_PASSWORD || "";

let adminPb: PocketBase | null = null;

export async function getAdminPocketBase(): Promise<PocketBase> {
  if (!adminPb) {
    adminPb = new PocketBase(POCKETBASE_URL);
    adminPb.autoCancellation(false);

    try {
      await adminPb.admins.authWithPassword(POCKETBASE_ADMIN_EMAIL, POCKETBASE_ADMIN_PASSWORD);
    } catch (error) {
      console.error("PocketBase admin auth failed:", error);
    }
  }
  return adminPb;
}
