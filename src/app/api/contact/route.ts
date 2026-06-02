import { NextResponse } from "next/server";
import { db, schema } from "@/lib/db";
import { createRateLimiter, getRateLimitKey } from "@/lib/rate-limit";
import { sendNotificationEmail, formatLeadNotification } from "@/lib/email";
import { z } from "zod";

// Rate limit: 10 requests per minute per IP
const limiter = createRateLimiter({ windowMs: 60_000, max: 10 });

const contactSchema = z.object({
  name: z.string().min(1, "Name ist erforderlich"),
  email: z.string().email("Ungültige E-Mail-Adresse"),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(1, "Nachricht ist erforderlich"),
  consentPrivacy: z.boolean().refine((val) => val === true, {
    message: "Datenschutz-Einwilligung erforderlich",
  }),
  honeypot: z.string().optional(),
});

export async function POST(req: Request) {
  const key = getRateLimitKey(req, "contact");
  if (!limiter.check(key)) {
    return NextResponse.json(
      { error: "Zu viele Anfragen. Bitte versuchen Sie es in einer Minute erneut." },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      const firstError = result.error.issues[0];
      return NextResponse.json(
        { error: firstError?.message || "Ungültige Eingabe" },
        { status: 400 }
      );
    }

    // Honeypot check — silently accept if filled (bot detected)
    if (result.data.honeypot) {
      return NextResponse.json(
        {
          success: true,
          message:
            "Ihre Nachricht wurde erfolgreich gespeichert. Wir melden uns bei Ihnen.",
        },
        { status: 201 }
      );
    }

    const { name, email, phone, subject, message, consentPrivacy } = result.data;

    await db.insert(schema.contactMessages).values({
      name,
      email,
      phone: phone || "",
      subject: subject || "",
      message,
      status: "new",
      consentPrivacy,
      consentTimestamp: new Date().toISOString(),
      privacyVersion: "1.0",
    });

    // Send email notification (async, non-blocking)
    sendNotificationEmail(
      `Neue Kontaktanfrage von ${name}`,
      formatLeadNotification({ name, email, phone: phone || undefined, message, source: subject || "Kontaktformular" })
    );

    return NextResponse.json(
      {
        success: true,
        message: "Ihre Nachricht wurde erfolgreich gespeichert. Wir melden uns bei Ihnen.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Interner Serverfehler." },
      { status: 500 }
    );
  }
}
