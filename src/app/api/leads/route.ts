import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, message, calculationData } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        phone,
        message,
        calculationData,
        status: "NEW",
      },
    });

    return NextResponse.json({ success: true, id: lead.id }, { status: 201 });
  } catch (error) {
    console.error("Lead creation error:", error);
    return NextResponse.json(
      { error: "Internal server error occurred while saving the lead." },
      { status: 500 }
    );
  }
}
