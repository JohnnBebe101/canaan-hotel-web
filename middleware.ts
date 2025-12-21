import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { requireAuth } from "./src/lib/auth";

/**
 * Next.js Middleware
 * Protects admin routes from unauthenticated access
 *
 * Protected routes: /admin/*, /api/admin/*
 * Excluded from protection: /auth/login, /api/auth/*
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip authentication check for login page and auth API routes
  if (
    pathname === "/auth/login" ||
    pathname.startsWith("/api/auth/")
  ) {
    return NextResponse.next();
  }

  // Protect all admin routes
  if (pathname.startsWith("/admin")) {
    const authRedirect = await requireAuth(request);
    if (authRedirect) {
      return authRedirect;
    }
  }

  return NextResponse.next();
}

/**
 * Configure which routes the middleware should run on
 */
export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
    "/api/auth/:path*",
  ],
};

