import { NextResponse } from "next/server";
import { createSession, getSessionCookieOptions } from "@/lib/auth/session";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Ungültige E-Mail-Adresse"),
  password: z.string().min(1, "Passwort ist erforderlich"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = loginSchema.safeParse(body);

    if (!result.success) {
      const firstError = result.error.issues[0];
      return NextResponse.json(
        { error: firstError?.message || "Ungültige Eingabe" },
        { status: 400 }
      );
    }

    const { email, password } = result.data;

    // Validate against environment variables
    const adminUser = process.env.ADMIN_USER;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminUser || !adminPassword) {
      return NextResponse.json(
        { error: "Auth nicht konfiguriert." },
        { status: 500 }
      );
    }

    if (email !== adminUser || password !== adminPassword) {
      return NextResponse.json(
        { error: "Ungültige Anmeldedaten." },
        { status: 401 }
      );
    }

    const token = await createSession({
      sub: email,
      role: "admin",
    });

    const cookieOptions = getSessionCookieOptions();
    const response = NextResponse.json(
      { success: true, user: { email, role: "admin" } },
      { status: 200 }
    );

    response.cookies.set(cookieOptions.name, token, {
      httpOnly: cookieOptions.httpOnly,
      secure: cookieOptions.secure,
      sameSite: cookieOptions.sameSite,
      path: cookieOptions.path,
      maxAge: cookieOptions.maxAge,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Interner Serverfehler." },
      { status: 500 }
    );
  }
}
