/**
 * Session management using signed JWTs stored in httpOnly cookies.
 *
 * Uses Web Crypto API — no external auth libraries needed.
 *
 * Cookie payload:
 *   { sub: string, role: "admin" | "viewer", iat: number, exp: number }
 */

const SESSION_COOKIE_NAME = "sws_admin_session";
const SESSION_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

/* ---------- helpers ---------- */

function toArrayBuffer(input: Uint8Array): ArrayBuffer {
  const { buffer, byteOffset, byteLength } = input;
  return (buffer as ArrayBuffer).slice(byteOffset, byteOffset + byteLength);
}

function base64UrlEncode(buf: Uint8Array): string {
  return btoa(String.fromCharCode(...buf))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function base64UrlDecode(str: string): Uint8Array {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  while (str.length % 4) str += "=";
  return Uint8Array.from(atob(str), (c) => c.charCodeAt(0));
}

async function getSigningKey(): Promise<CryptoKey> {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("SESSION_SECRET must be set and at least 32 characters");
  }
  const enc = new TextEncoder();
  const keyData = enc.encode(secret).slice(0, 32);
  return crypto.subtle.importKey(
    "raw",
    toArrayBuffer(keyData),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

/* ---------- sign / verify ---------- */

async function sign(payload: Record<string, unknown>): Promise<string> {
  const key = await getSigningKey();
  const header = { alg: "HS256", typ: "JWT" };
  const enc = new TextEncoder();

  const headerB64 = base64UrlEncode(enc.encode(JSON.stringify(header)));
  const payloadB64 = base64UrlEncode(enc.encode(JSON.stringify(payload)));
  const data = `${headerB64}.${payloadB64}`;

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    toArrayBuffer(enc.encode(data))
  );
  return `${data}.${base64UrlEncode(new Uint8Array(signature))}`;
}

async function verify<T = Record<string, unknown>>(
  token: string
): Promise<T | null> {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const key = await getSigningKey();
    const enc = new TextEncoder();
    const data = `${parts[0]}.${parts[1]}`;
    const sig = base64UrlDecode(parts[2]);

    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      toArrayBuffer(sig),
      toArrayBuffer(enc.encode(data))
    );
    if (!valid) return null;

    const payload = JSON.parse(
      new TextDecoder().decode(base64UrlDecode(parts[1]))
    );

    // Check expiration
    if (payload.exp && payload.exp * 1000 < Date.now()) return null;

    return payload as T;
  } catch {
    return null;
  }
}

/* ---------- session helpers ---------- */

export interface SessionPayload {
  sub: string;
  role: "admin" | "viewer";
}

export async function createSession(
  payload: SessionPayload
): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  return sign({
    ...payload,
    iat: now,
    exp: now + Math.floor(SESSION_DURATION_MS / 1000),
  });
}

export async function verifySession(
  token: string
): Promise<SessionPayload | null> {
  return verify<SessionPayload>(token);
}

export function getSessionCookieName(): string {
  return SESSION_COOKIE_NAME;
}

export function getSessionCookieOptions(): {
  name: string;
  value: string;
  httpOnly: boolean;
  secure: boolean;
  sameSite: "lax";
  path: string;
  maxAge: number;
} {
  return {
    name: SESSION_COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: SESSION_DURATION_MS / 1000,
  };
}
