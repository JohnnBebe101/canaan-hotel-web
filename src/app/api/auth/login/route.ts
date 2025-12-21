import { NextRequest, NextResponse } from "next/server";
import { validateCredentials, createSession, isAuthenticated } from "@/lib/auth";

/**
 * POST /api/auth/login
 * Handles admin login requests
 * 
 * Request body:
 * - username: string
 * - password: string
 * 
 * Response:
 * - 200: Login successful
 * - 401: Invalid credentials
 * - 400: Missing credentials
 */
export async function POST(request: NextRequest) {
  try {
    // Check if already authenticated
    const authenticated = await isAuthenticated(request);
    if (authenticated) {
      return NextResponse.json(
        { message: "Already authenticated" },
        { status: 200 }
      );
    }

    const body = await request.json();
    const { username, password } = body;

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    // Validate credentials
    if (!validateCredentials(username.trim(), password)) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Create session
    const response = NextResponse.json(
      { message: "Login successful" },
      { status: 200 }
    );

    return await createSession(response);
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

