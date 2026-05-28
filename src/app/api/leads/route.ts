import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    // Handle both FormData and JSON
    let body: Record<string, unknown>;
    const contentType = req.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      body = await req.json();
    } else if (contentType?.includes("multipart/form-data")) {
      const formData = await req.formData();
      body = Object.fromEntries(formData.entries());
    } else {
      // Try JSON first, fall back to FormData
      try {
        body = await req.json();
      } catch {
        const formData = await req.formData();
        body = Object.fromEntries(formData.entries());
      }
    }

    // Parse calculationData if it's a string (from FormData)
    if (body.calculationData && typeof body.calculationData === "string") {
      try {
        body.calculationData = JSON.parse(body.calculationData);
      } catch {
        body.calculationData = {};
      }
    }

    const name = (body.name as string) || "";
    const email = (body.email as string) || "";
    const phone = body.phone as string | undefined;
    const message = body.message as string | undefined;
    const calculationData = body.calculationData as Record<string, unknown> | undefined;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        phone,
        message,
        calculationData: calculationData as object || {},
        status: "NEW",
      },
    });

    return NextResponse.json(
      {
        success: true,
        id: lead.id,
        message: "Lead successfully created. We will contact you within 24-48 hours.",
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Lead creation error:", error);

    // Handle specific database errors
    if (
      error instanceof Error &&
      // @ts-expect-error - accessing code property for Prisma errors
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "A lead with this email already exists." },
        { status: 409 }
      );
    }

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      {
        error: "Internal server error occurred while saving the lead.",
        details:
          process.env.NODE_ENV === "development" ? errorMessage : undefined,
      },
      { status: 500 }
    );
  }
}

// GET endpoint for admin dashboard
export async function GET() {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ leads }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching leads:", error);
    return NextResponse.json(
      { error: "Failed to fetch leads." },
      { status: 500 }
    );
  }
}
