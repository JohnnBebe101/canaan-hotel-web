import { NextRequest, NextResponse } from "next/server";
import { destroySession } from "@/lib/auth";

/**
 * POST /api/auth/logout
 * Handles admin logout requests
 * 
 * Response:
 * - 200: Logout successful
 */
export async function POST(request: NextRequest) {
  const response = NextResponse.json(
    { message: "Logout successful" },
    { status: 200 }
  );

  return destroySession(response);
}

/**
 * GET /api/auth/logout
 * Alternative logout method via GET request
 */
export async function GET(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/admin/login", request.url));
  return destroySession(response);
}

