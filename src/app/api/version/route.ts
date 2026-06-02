import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

export const dynamic = "force-dynamic";

interface VersionInfo {
  version: string;
  buildTime: string | null;
}

export async function GET() {
  const fallback: VersionInfo = {
    version: process.env.APP_VERSION || "development",
    buildTime: null,
  };

  try {
    const versionPath = join(process.cwd(), "public", "version.json");
    const data = JSON.parse(readFileSync(versionPath, "utf-8")) as VersionInfo;
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(fallback);
  }
}
