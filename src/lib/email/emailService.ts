/**
 * Email Service - Stub Implementation for V4.1
 *
 * Production-safe stub that logs email activity instead of sending real emails.
 * Feature flag controlled to prevent accidental email sending during development.
 */

import { EmailPayload } from "./emailTypes";
import { isEmailEnabled } from "../featureFlags";
import { logInfo, logWarn, logError } from "../logger";

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
    // V4.4 logging: Track disabled email attempts for feature flag monitoring
    logWarn("EMAIL_SERVICE", "Email dispatch blocked by feature flag", {
      recipient: payload.to,
      eventType: "FEATURE_DISABLED",
      bookingId: payload.bookingId,
      invoiceRef: payload.invoiceRef
    });
    return;
  }

  // V4.4 logging: Track email dispatch attempts for operational monitoring
  // Helps diagnose email delivery issues and service reliability
  logInfo("EMAIL_SERVICE", "Email dispatch initiated", {
    recipient: payload.to,
    subject: payload.subject,
    eventType: "DISPATCH_ATTEMPT",
    bookingId: payload.bookingId,
    invoiceRef: payload.invoiceRef
  });

  // Mock successful dispatch for development (V4.1 will implement real email service)
  // In production, this would integrate with SMTP provider
}
