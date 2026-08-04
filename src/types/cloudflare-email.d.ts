// Ambient type declarations for the Cloudflare Email Worker
// (src/email-forwarder.ts). These globals are provided by the
// Cloudflare Workers runtime but not available to the Next.js build.
// Netlify runs `next build` (type-checks all src/**/*.ts), so without
// these declarations the build fails. Wrangler ignores TS types at
// build time, so this file does not affect the Cloudflare deploy.

interface EmailMessage {
  forward(address: string): Promise<void>;
  reply(address: string): Promise<void>;
  setReject(reason: string): void;
}

interface Env {
  [key: string]: unknown;
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}
