import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// PATCH endpoint for updating a specific lead
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json(
        { error: "Status is required." },
        { status: 400 }
      );
    }

    // Validate status value
    const validStatuses = ["NEW", "IN_PROGRESS", "COMPLETED", "CANCELLED"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${validStatuses.join(", ")}` },
        { status: 400 }
      );
    }

    const updatedLead = await prisma.lead.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(
      { success: true, lead: updatedLead },
      { status: 200 }
    );
   } catch (error: unknown) {
    console.error("Error updating lead status:", error);
    
    if (error instanceof Error && error.name === "PrismaClientKnownRequestError" && (error as { code?: string }).code === "P2025") {
      return NextResponse.json(
        { error: "Lead not found." },
        { status: 404 }
      );
    }
    
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { 
        error: "Internal server error occurred while updating the lead.",
        details: process.env.NODE_ENV === "development" ? errorMessage : undefined
      },
      { status: 500 }
    );
  }
}

// DELETE endpoint for removing a lead
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.lead.delete({
      where: { id },
    });

    return NextResponse.json(
      { success: true, message: "Lead successfully deleted." },
      { status: 200 }
    );
   } catch (error: unknown) {
    console.error("Error deleting lead:", error);
    
    if (error instanceof Error && error.name === "PrismaClientKnownRequestError" && (error as { code?: string }).code === "P2025") {
      return NextResponse.json(
        { error: "Lead not found." },
        { status: 404 }
      );
    }
    
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { 
        error: "Internal server error occurred while deleting the lead.",
        details: process.env.NODE_ENV === "development" ? errorMessage : undefined
      },
      { status: 500 }
    );
  }
}

// GET endpoint for fetching a specific lead
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const lead = await prisma.lead.findUnique({
      where: { id },
    });

    if (!lead) {
      return NextResponse.json(
        { error: "Lead not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ lead }, { status: 200 });
    } catch (error: unknown) {
    console.error("Error fetching lead:", error);
    return NextResponse.json(
      { error: "Failed to fetch lead." },
      { status: 500 }
    );
  }
}
