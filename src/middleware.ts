import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware to protect /admin routes with HTTP Basic Authentication.
 *
 * Required ENV vars:
 *   ADMIN_USER     – Username for Basic Auth
 *   ADMIN_PASSWORD – Password for Basic Auth
 *
 * If either variable is missing the middleware lets the request through
 * (fail-open) so the site does not break in development.
 */

function basicAuthRequired(): boolean {
  return !!(process.env.ADMIN_USER && process.env.ADMIN_PASSWORD);
}

function unauthorizedResponse(): NextResponse {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Admin Area"' },
  });
}

export function middleware(request: NextRequest): NextResponse | undefined {
  const { pathname } = request.nextUrl;

  // Only protect /admin routes
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // If env vars are not set, fail-open (no auth required)
  if (!basicAuthRequired()) {
    return NextResponse.next();
  }

  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return unauthorizedResponse();
  }

  // Decode and verify credentials
  const base64Credentials = authHeader.split(" ")[1];
  const decoded = atob(base64Credentials);
  const [username, password] = decoded.split(":");

  if (
    username === process.env.ADMIN_USER &&
    password === process.env.ADMIN_PASSWORD
  ) {
    return NextResponse.next();
  }

  return unauthorizedResponse();
}

export const config = {
  matcher: ["/admin/:path*"],
};
