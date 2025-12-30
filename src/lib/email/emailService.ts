/**
 * Email Service - Stub Implementation for V4.1
 *
 * Production-safe stub that logs email activity instead of sending real emails.
 * Feature flag controlled to prevent accidental email sending during development.
 */

import { EmailPayload } from "./emailTypes";
import { isEmailEnabled } from "../featureFlags";

/**
 * Send Email Function
 *
 * Checks email feature flag before processing.
 * In development: Logs email content for testing.
 * In production: Would integrate with email service provider.
 *
 * @param payload Email payload containing recipient, subject, and body
 */
export function sendEmail(payload: EmailPayload): void {
  if (!isEmailEnabled()) {
    console.log("[EMAIL DISABLED]", {
      to: payload.to,
      subject: payload.subject,
      body: payload.body.substring(0, 100) + "...",
      bookingId: payload.bookingId,
      invoiceRef: payload.invoiceRef,
    });
    return;
  }

  // Feature enabled - log successful send (stub for actual email service)
  console.log("[EMAIL SENT]", {
    to: payload.to,
    subject: payload.subject,
    body: payload.body.substring(0, 100) + "...",
    bookingId: payload.bookingId,
    invoiceRef: payload.invoiceRef,
  });
}
