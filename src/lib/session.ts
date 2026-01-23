import { createHmac, timingSafeEqual } from "crypto";

const SESSION_SECRET = process.env.SESSION_SECRET || "change-me-in-production";
const SESSION_MAX_AGE = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

/**
 * Signs a session token
 * Creates a signed token with timestamp and signature
 * @returns A signed session token
 */
export async function signSession(): Promise<string> {
  const timestamp = Date.now();
  const expiresAt = timestamp + SESSION_MAX_AGE;
  const payload = `${timestamp}.${expiresAt}`;
  
  const signature = createHmac("sha256", SESSION_SECRET)
    .update(payload)
    .digest("hex");
  
  return `${payload}.${signature}`;
}

/**
 * Verifies a session token
 * Validates the signature and checks expiration
 * @param token - The session token to verify
 * @returns true if token is valid, false otherwise
 */
export async function verifySession(token: string): Promise<boolean> {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      return false;
    }

    const [timestamp, expiresAt, signature] = parts;
    const payload = `${timestamp}.${expiresAt}`;

    // Verify signature
    const expectedSignature = createHmac("sha256", SESSION_SECRET)
      .update(payload)
      .digest("hex");

    // Use timing-safe comparison to prevent timing attacks
    const signatureBuffer = Buffer.from(signature, "hex");
    const expectedBuffer = Buffer.from(expectedSignature, "hex");
    
    if (signatureBuffer.length !== expectedBuffer.length) {
      return false;
    }

    if (!timingSafeEqual(signatureBuffer, expectedBuffer)) {
      return false;
    }

    // Check expiration
    const expiresTimestamp = parseInt(expiresAt, 10);
    if (isNaN(expiresTimestamp)) {
      return false;
    }

    if (Date.now() > expiresTimestamp) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
}
