import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySession, getSessionCookieName } from "@/lib/auth/session";

/**
 * Proxy to protect /admin routes with session-based authentication.
 *
 * Uses a signed JWT stored in an httpOnly cookie.
 * - /admin/login is public (for the login page)
 * - All other /admin/* routes require a valid session
 *
 * Required ENV vars:
 *   SESSION_SECRET  – At least 32 chars for signing session cookies
 *   ADMIN_USER      – Email for login
 *   ADMIN_PASSWORD  – Password for login
 *
 * If ADMIN_USER/ADMIN_PASSWORD are missing, the proxy fail-opens.
 */

function isAuthConfigured(): boolean {
  return !!(
    process.env.SESSION_SECRET &&
    process.env.ADMIN_USER &&
    process.env.ADMIN_PASSWORD
  );
}

function redirectToLogin(request: NextRequest): NextResponse {
  const loginUrl = new URL("/admin/login", request.url);
  loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export async function proxy(
  request: NextRequest
): Promise<NextResponse | undefined> {
  const { pathname } = request.nextUrl;

  // Only protect /admin routes
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // Allow login page (static assets + page itself)
  if (
    pathname === "/admin/login" ||
    pathname.startsWith("/admin/login/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/brand/")
  ) {
    return NextResponse.next();
  }

  // Allow API auth routes
  if (pathname.startsWith("/api/auth/")) {
    return NextResponse.next();
  }

  // If auth is not configured, fail-open (dev mode)
  if (!isAuthConfigured()) {
    return NextResponse.next();
  }

  // Check session cookie
  const cookieName = getSessionCookieName();
  const token = request.cookies.get(cookieName)?.value;

  if (!token) {
    return redirectToLogin(request);
  }

  const session = await verifySession(token);

  if (!session) {
    return redirectToLogin(request);
  }

  // Viewer role restriction: can only access leads pages, not dashboard
  if (
    session.role === "viewer" &&
    !pathname.startsWith("/admin/leads")
  ) {
    return redirectToLogin(request);
  }

  // Forward user info to the app via header (for server components)
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-user-role", session.role);
  requestHeaders.set("x-user-email", session.sub);

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ["/admin/:path*"],
};
