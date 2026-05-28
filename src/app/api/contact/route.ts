import { NextResponse } from "next/server";
import { getAdminPocketBase } from "@/lib/pocketbase/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "Name ist erforderlich"),
  email: z.string().email("Ungültige E-Mail-Adresse"),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(1, "Nachricht ist erforderlich"),
  consentPrivacy: z.boolean().refine((val) => val === true, {
    message: "Datenschutz-Einwilligung erforderlich",
  }),
});

export async function POST(req: Request) {
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

    const { name, email, phone, subject, message, consentPrivacy } = result.data;
    const pb = await getAdminPocketBase();

    await pb.collection("contact_messages").create({
      name,
      email,
      phone: phone || "",
      subject: subject || "",
      message,
      status: "new",
      consent_privacy: consentPrivacy,
      consent_timestamp: new Date().toISOString(),
      privacy_version: "1.0",
    });

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
