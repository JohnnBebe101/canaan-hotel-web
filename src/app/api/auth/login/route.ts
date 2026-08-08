import { NextRequest, NextResponse } from "next/server";
export const dynamic = 'force-dynamic';
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

    // Trim inputs to handle whitespace issues
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    // Debug logging in development mode
    if (process.env.NODE_ENV === "development") {
      console.log("[Login] Attempting login");
      console.log("[Login] Received username:", JSON.stringify(trimmedUsername));
      console.log("[Login] Received password length:", trimmedPassword.length);
      console.log("[Login] Env ADMIN_USERNAME:", JSON.stringify(process.env.ADMIN_USERNAME));
      console.log("[Login] Env ADMIN_PASSWORD length:", process.env.ADMIN_PASSWORD?.length);
      console.log("[Login] All env vars with ADMIN_ prefix:", 
        Object.keys(process.env).filter(k => k.startsWith('ADMIN_')).map(k => `${k}=${JSON.stringify(process.env[k])}`));
    }

    // Validate credentials
    if (!validateCredentials(trimmedUsername, trimmedPassword)) {
      if (process.env.NODE_ENV === "development") {
        console.log("[Login] Authentication failed - credentials mismatch");
      }
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    if (process.env.NODE_ENV === "development") {
      console.log("[Login] Authentication successful");
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

