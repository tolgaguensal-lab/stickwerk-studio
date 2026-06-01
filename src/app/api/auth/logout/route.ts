import { NextResponse } from "next/server";
import { getSessionCookieOptions } from "@/lib/auth/session";

export async function POST() {
  const cookieOptions = getSessionCookieOptions();
  const response = NextResponse.json(
    { success: true, message: "Erfolgreich ausgeloggt." },
    { status: 200 }
  );

  response.cookies.set(cookieOptions.name, "", {
    httpOnly: cookieOptions.httpOnly,
    secure: cookieOptions.secure,
    sameSite: cookieOptions.sameSite,
    path: cookieOptions.path,
    maxAge: 0, // Delete immediately
  });

  return response;
}
