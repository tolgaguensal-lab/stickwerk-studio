import { NextResponse } from "next/server";
import { z } from "zod";

const ALLOWED_TYPES = [
  "image/png",
  "image/jpeg",
  "image/gif",
  "image/svg+xml",
  "image/webp",
  "application/pdf",
  "application/postscript", // .ai / .eps
];
const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

const uploadSchema = z.object({
  name: z.string().min(1),
  type: z.string(),
  size: z.number().max(MAX_SIZE),
  data: z.string().min(1), // base64-encoded file content
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = uploadSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Ungültige Datei." },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(result.data.type)) {
      return NextResponse.json(
        { error: "Dateityp nicht erlaubt. Erlaubt: PNG, JPG, GIF, SVG, WEBP, PDF, AI, EPS." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        file: {
          name: result.data.name,
          type: result.data.type,
          size: result.data.size,
          data: result.data.data,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Upload fehlgeschlagen." },
      { status: 500 }
    );
  }
}
