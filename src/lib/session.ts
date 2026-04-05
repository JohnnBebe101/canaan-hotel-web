/**
 * Session management using Web Crypto API (Edge Runtime compatible)
 * Provides secure token signing and verification
 */

const SESSION_MAX_AGE = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

/**
 * Get session secret from environment (lazy initialization)
 */
function getSessionSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error('Missing required environment variable: SESSION_SECRET');
  }
  return secret;
}

/**
 * Get crypto subtle API (works in both Node.js and Edge Runtime)
 */
async function getKey(): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(getSessionSecret());

  return crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

/**
 * Signs a session token using Web Crypto API
 * Creates a signed token with timestamp and signature
 * @returns A signed session token
 */
export async function signSession(): Promise<string> {
  const timestamp = Date.now();
  const expiresAt = timestamp + SESSION_MAX_AGE;
  const payload = `${timestamp}.${expiresAt}`;

  const encoder = new TextEncoder();
  const data = encoder.encode(payload);
  const key = await getKey();

  const signatureBuffer = await crypto.subtle.sign("HMAC", key, data);
  const signatureArray = Array.from(new Uint8Array(signatureBuffer));
  const signature = signatureArray.map(b => b.toString(16).padStart(2, "0")).join("");

  return `${payload}.${signature}`;
}

/**
 * Verifies a session token using Web Crypto API
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

    // Verify signature using Web Crypto API
    const encoder = new TextEncoder();
    const data = encoder.encode(payload);
    const key = await getKey();

    // Convert hex signature to ArrayBuffer
    const signatureBytes = new Uint8Array(
      signature.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16))
    );

    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      signatureBytes,
      data
    );

    if (!isValid) {
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
