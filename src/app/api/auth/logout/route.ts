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
  try {
    const response = NextResponse.json(
      { message: "Logout successful" },
      { status: 200 }
    );

    return destroySession(response);
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "Logout failed" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/auth/logout
 * Alternative logout method via GET request
 */
export async function GET(request: NextRequest) {
  try {
    const response = NextResponse.redirect(new URL("/admin/login", request.url));
    return destroySession(response);
  } catch (error) {
    console.error("Logout GET error:", error);
    return NextResponse.json(
      { error: "Logout failed" },
      { status: 500 }
    );
  }
}

