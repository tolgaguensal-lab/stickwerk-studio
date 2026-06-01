import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySession, getSessionCookieName } from "@/lib/auth/session";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const cookieName = getSessionCookieName();
    const token = cookieStore.get(cookieName)?.value;

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const session = await verifySession(token);

    if (!session) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json(
      {
        authenticated: true,
        user: {
          email: session.sub,
          role: session.role,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Session check error:", error);
    return NextResponse.json(
      { authenticated: false, error: "Interner Serverfehler." },
      { status: 500 }
    );
  }
}
