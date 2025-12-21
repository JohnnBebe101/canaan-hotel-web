import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { signSession, verifySession } from "./session";

/**
 * Authentication utility functions for admin authentication
 * Uses cookie-based session management
 */

const SESSION_COOKIE_NAME = "admin_session";
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin";

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
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

/**
 * Creates a new admin session by setting a session cookie
 * @param response - NextResponse object to set cookie on
 * @returns Updated NextResponse with session cookie
 */
export async function createSession(response: NextResponse): Promise<NextResponse> {
  const sessionToken = await signSession();
  
  response.cookies.set(SESSION_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE / 1000, // Convert to seconds
    path: "/",
  });

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
  
  if (!sessionToken) {
    return false;
  }

  return await verifySession(sessionToken);
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
    url.pathname = "/admin/login";
    url.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return null;
}

