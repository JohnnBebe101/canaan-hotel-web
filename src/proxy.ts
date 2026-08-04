import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

const RATE_LIMITS = {
  "/api/bookings/create": { maxRequests: 5, windowMs: 60 * 1000 },
  "/api/checkout/create": { maxRequests: 10, windowMs: 60 * 1000 },
  "/api/webhooks/stripe": { maxRequests: 50, windowMs: 60 * 1000 },
};

function getClientKey(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded ? forwarded.split(",")[0].trim() : "unknown";
}

function cleanExpiredEntries() {
  const now = Date.now();
  for (const [key, entry] of rateLimitMap.entries()) {
    if (entry.resetTime < now) {
      rateLimitMap.delete(key);
    }
  }
}

setInterval(cleanExpiredEntries, 60 * 1000);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname === "/auth/login" ||
    pathname.startsWith("/api/auth/")
  ) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    const authRedirect = await requireAuth(request);
    if (authRedirect) {
      return authRedirect;
    }
  }

  const routeLimit = RATE_LIMITS[pathname as keyof typeof RATE_LIMITS];

  if (!routeLimit) {
    return NextResponse.next();
  }

  const clientKey = getClientKey(request);
  const now = Date.now();

  let entry = rateLimitMap.get(clientKey);

  if (!entry || entry.resetTime < now) {
    entry = {
      count: 0,
      resetTime: now + routeLimit.windowMs,
    };
    rateLimitMap.set(clientKey, entry);
  }

  entry.count++;

  if (entry.count > routeLimit.maxRequests) {
    console.log(`[RateLimit] Too many requests from ${clientKey} on ${pathname}`);
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  const response = NextResponse.next();
  response.headers.set("X-RateLimit-Remaining", String(routeLimit.maxRequests - entry.count));
  response.headers.set("X-RateLimit-Limit", String(routeLimit.maxRequests));
  response.headers.set("X-RateLimit-Reset", String(entry.resetTime));

  return response;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
    "/api/auth/:path*",
    "/api/bookings/create",
    "/api/checkout/create",
    "/api/webhooks/stripe",
  ],
};
