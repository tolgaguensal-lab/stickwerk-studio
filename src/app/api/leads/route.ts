import { NextResponse } from "next/server";
import { getAdminPocketBase } from "@/lib/pocketbase/server";
import { createRateLimiter, getRateLimitKey } from "@/lib/rate-limit";
import { sendNotificationEmail, formatLeadNotification } from "@/lib/email";
import { z } from "zod";

const limiter = createRateLimiter({ windowMs: 60_000, max: 10 });

const leadSchema = z.object({
  name: z.string().min(1, "Name ist erforderlich"),
  email: z.string().email("Ungültige E-Mail-Adresse"),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().optional(),
  patchConfig: z.object({}).passthrough().optional(),
  estimatedPriceMin: z.number().optional(),
  estimatedPriceMax: z.number().optional(),
  consentPrivacy: z.boolean().refine((val) => val === true, {
    message: "Datenschutz-Einwilligung erforderlich",
  }),
  honeypot: z.string().optional(),
});

export async function POST(req: Request) {
  const key = getRateLimitKey(req, "leads");
  if (!limiter.check(key)) {
    return NextResponse.json(
      { error: "Zu viele Anfragen. Bitte versuchen Sie es in einer Minute erneut." },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const result = leadSchema.safeParse(body);

    if (!result.success) {
      const firstError = result.error.issues[0];
      return NextResponse.json(
        { error: firstError?.message || "Ungültige Eingabe" },
        { status: 400 }
      );
    }

    // Honeypot check — if filled, silently accept (bot detected)
    if (result.data.honeypot) {
      return NextResponse.json(
        {
          success: true,
          id: "fake",
          message:
            "Ihre Anfrage wurde erfolgreich gespeichert. Wir melden uns innerhalb von 24-48 Stunden.",
        },
        { status: 201 }
      );
    }

    const { name, email, phone, company, message, patchConfig, estimatedPriceMin, estimatedPriceMax, consentPrivacy } = result.data;
    const pb = await getAdminPocketBase();

    const record = await pb.collection("leads").create({
      name,
      email,
      phone: phone || "",
      company: company || "",
      message: message || "",
      patch_config: patchConfig || {},
      estimated_price_min: estimatedPriceMin || 0,
      estimated_price_max: estimatedPriceMax || 0,
      status: "new",
      source: "website",
      consent_privacy: consentPrivacy,
      consent_timestamp: new Date().toISOString(),
      privacy_version: "1.0",
    });

    // Send email notification (async, non-blocking)
    sendNotificationEmail(
      `Neue Anfrage von ${name}`,
      formatLeadNotification({ name, email, phone: phone || undefined, message: message || undefined, source: "Patch-Konfigurator" })
    );

    return NextResponse.json(
      {
        success: true,
        id: record.id,
        message: "Ihre Anfrage wurde erfolgreich gespeichert. Wir melden uns innerhalb von 24-48 Stunden.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Lead creation error:", error);
    return NextResponse.json(
      { error: "Interner Serverfehler." },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const perPage = Math.min(100, Math.max(1, parseInt(searchParams.get("perPage") || "20", 10)));

    const pb = await getAdminPocketBase();

    const result = await pb.collection("leads").getList(page, perPage, {
      sort: "-created",
    });

    return NextResponse.json(
      {
        leads: result.items,
        total: result.totalItems,
        page: result.page,
        perPage: result.perPage,
        totalPages: result.totalPages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching leads:", error);
    return NextResponse.json(
      { error: "Leads konnten nicht geladen werden." },
      { status: 500 }
    );
  }
}
