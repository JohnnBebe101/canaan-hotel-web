import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { signSession, verifySession } from "./session";

/**
 * Authentication utility functions for admin authentication
 * Uses cookie-based session management
 */

const SESSION_COOKIE_NAME = "admin_session";
// Trim and use defaults if empty or undefined
const ADMIN_USERNAME = (process.env.ADMIN_USERNAME?.trim() || "admin").trim();
const ADMIN_PASSWORD = (process.env.ADMIN_PASSWORD?.trim() || "admin").trim();

// Log loaded credentials at module load (development only)
if (process.env.NODE_ENV === "development") {
  // Credentials logging removed for production safety even in dev-mode logs
}

/**
 * Session expiration time in milliseconds (24 hours)
 */
const SESSION_MAX_AGE = 24 * 60 * 60 * 1000;

/**
 * Validates admin credentials against environment variables
 * @param username - Username to validate
 * @param password - Password to validate
 * @returns boolean indicating if credentials are valid
 */
export function validateCredentials(
  username: string,
  password: string
): boolean {
  // Trim inputs to handle any whitespace issues
  const trimmedUsername = username.trim();
  const trimmedPassword = password.trim();

  // Debug logging in development mode
  if (process.env.NODE_ENV === "development") {
    console.log("[Auth] Comparing credentials:");
    console.log("[Auth]   Received username:", JSON.stringify(trimmedUsername));
    console.log("[Auth]   Expected username:", JSON.stringify(ADMIN_USERNAME));
    console.log("[Auth]   Username match:", trimmedUsername === ADMIN_USERNAME);
    console.log("[Auth]   Received password length:", trimmedPassword.length);
    console.log("[Auth]   Expected password length:", ADMIN_PASSWORD.length);
    console.log("[Auth]   Password match:", trimmedPassword === ADMIN_PASSWORD);
    console.log("[Auth]   Received username char codes:", [...trimmedUsername].map(c => c.charCodeAt(0)));
    console.log("[Auth]   Expected username char codes:", [...ADMIN_USERNAME].map(c => c.charCodeAt(0)));
  }

  return trimmedUsername === ADMIN_USERNAME && trimmedPassword === ADMIN_PASSWORD;
}

/**
 * Creates a new admin session by setting a session cookie
 * @param response - NextResponse object to set cookie on
 * @returns Updated NextResponse with session cookie
 */
export async function createSession(response: NextResponse): Promise<NextResponse> {
  const sessionToken = await signSession();

  if (process.env.NODE_ENV === "development") {
    console.log("[Auth] Creating session cookie:", SESSION_COOKIE_NAME);
  }

  response.cookies.set(SESSION_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE / 1000, // Convert to seconds
    path: "/",
  });

  if (process.env.NODE_ENV === "development") {
    console.log("[Auth] Session cookie set successfully");
  }

  return response;
}

/**
 * Destroys the admin session by removing the session cookie
 * @param response - NextResponse object to clear cookie from
 * @returns Updated NextResponse with cleared cookie
 */
export function destroySession(response: NextResponse): NextResponse {
  response.cookies.delete(SESSION_COOKIE_NAME);
  return response;
}

/**
 * Checks if the current request has a valid admin session
 * @param request - NextRequest object to check
 * @returns boolean indicating if user is authenticated
 */
export async function isAuthenticated(
  request: NextRequest
): Promise<boolean> {
  const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  if (process.env.NODE_ENV === "development") {
    console.log("[Auth] Checking authentication for path:", request.nextUrl.pathname);
    console.log("[Auth] Session cookie present:", !!sessionToken);
    if (sessionToken) {
      console.log("[Auth] Session token length:", sessionToken.length);
    }
  }

  if (!sessionToken) {
    if (process.env.NODE_ENV === "development") {
      console.log("[Auth] No session token found");
    }
    return false;
  }

  const isValid = await verifySession(sessionToken);

  if (process.env.NODE_ENV === "development") {
    console.log("[Auth] Session token valid:", isValid);
  }

  return isValid;
}

/**
 * Server-side authentication check using cookies()
 * Use this in Server Components and Server Actions
 * @returns boolean indicating if user is authenticated
 */
export async function checkAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionToken) {
    return false;
  }

  return await verifySession(sessionToken);
}

/**
 * Redirects unauthenticated users to login page
 * Use this in middleware or API routes
 * @param request - NextRequest object
 * @returns NextResponse redirect to login if not authenticated, null if authenticated
 */
export async function requireAuth(
  request: NextRequest
): Promise<NextResponse | null> {
  const authenticated = await isAuthenticated(request);

  if (!authenticated) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    url.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return null;
}

