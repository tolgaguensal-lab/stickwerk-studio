import PocketBase from "pocketbase";

const POCKETBASE_URL = process.env.POCKETBASE_URL || "http://127.0.0.1:8090";
const POCKETBASE_ADMIN_EMAIL = process.env.POCKETBASE_ADMIN_EMAIL || "";
const POCKETBASE_ADMIN_PASSWORD = process.env.POCKETBASE_ADMIN_PASSWORD || "";

let adminPb: PocketBase | null = null;
let lastAuthCheck = 0;
const AUTH_REFRESH_INTERVAL = 10 * 60 * 1000; // 10 minutes

async function authenticate(pb: PocketBase): Promise<void> {
  await pb.admins.authWithPassword(POCKETBASE_ADMIN_EMAIL, POCKETBASE_ADMIN_PASSWORD);
  lastAuthCheck = Date.now();
}

async function ensureValidSession(pb: PocketBase): Promise<void> {
  const isStale = Date.now() - lastAuthCheck > AUTH_REFRESH_INTERVAL;
  if (!isStale) return;

  try {
    if (pb.authStore.isValid) {
      await pb.collection("_superusers").authRefresh();
      lastAuthCheck = Date.now();
    } else {
      await authenticate(pb);
    }
  } catch {
    await authenticate(pb);
  }
}

export async function getAdminPocketBase(): Promise<PocketBase> {
  if (!adminPb) {
    adminPb = new PocketBase(POCKETBASE_URL);
    adminPb.autoCancellation(false);
  }

  try {
    await ensureValidSession(adminPb);
  } catch (error) {
    console.error("PocketBase admin auth failed:", error);
    // Reset so next call retries
    adminPb = null;
    throw error;
  }

  return adminPb;
}
