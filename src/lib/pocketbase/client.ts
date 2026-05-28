import PocketBase from "pocketbase";

const POCKETBASE_URL = process.env.NEXT_PUBLIC_POCKETBASE_URL || "http://127.0.0.1:8090";

let pb: PocketBase | null = null;

export function getPocketBase(): PocketBase {
  if (!pb) {
    pb = new PocketBase(POCKETBASE_URL);
    pb.autoCancellation(false);
  }
  return pb;
}

export { POCKETBASE_URL };
