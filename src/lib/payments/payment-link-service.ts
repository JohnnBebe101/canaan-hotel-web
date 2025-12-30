/**
 * V5.2.1 Payment Link Service - Design Implementation
 *
 * IMPORTANT: This is a DESIGN-ONLY implementation.
 * No Stripe SDK or API calls are made.
 *
 * This service generates placeholder payment links for demonstration.
 * Real Stripe integration will be added in V5.3+ with actual API calls.
 *
 * Feature flag gated - safe to deploy without Stripe credentials.
 */

import { PaymentCreateIntent, PaymentRecord, PaymentStatus, PaymentProvider, isPaymentsFeatureActive } from "./payment-types";
import { logInfo, logWarn, logError } from "../logger";

/**
 * Creates a Stripe Payment Link for an invoiced booking
 *
 * DESIGN IMPLEMENTATION NOTES:
 * - No actual Stripe API calls
 * - Generates realistic-looking placeholder URLs
 * - Returns structured PaymentRecord for UI display
 * - Feature flag gated for safety
 *
 * @param input Payment creation parameters
 * @returns Promise<PaymentRecord> with generated payment link
 * @throws Error if payments feature is disabled
 */
export async function createStripePaymentLink(input: PaymentCreateIntent): Promise<PaymentRecord> {
  // V5.2.1 safety: Feature flag gate prevents accidental execution
  if (!isPaymentsFeatureActive()) {
    logWarn("PAYMENT_LINK_SERVICE", "Payment link creation blocked by feature flag", {
      bookingId: input.bookingId,
      reason: "FEATURE_DISABLED"
    });
    throw new Error("Payments feature is not enabled");
  }

  const now = new Date().toISOString();

  try {
    // DESIGN: Generate realistic-looking Stripe payment link
    // In V5.3+, this will be replaced with actual Stripe API call
    const fakeStripeId = `pl_${Math.random().toString(36).substring(2, 15)}`;
    const paymentLink = `https://buy.stripe.com/test_${fakeStripeId}`;

    const paymentRecord: PaymentRecord = {
      id: `payment_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
      bookingId: input.bookingId,
      provider: PaymentProvider.STRIPE,
      status: PaymentStatus.LINK_CREATED,
      amountCents: input.amountCents,
      currency: input.currency,
      paymentLink,
      createdAt: now,
      updatedAt: now,
    };

    logInfo("PAYMENT_LINK_SERVICE", "Payment link generated successfully", {
      bookingId: input.bookingId,
      paymentId: paymentRecord.id,
      amountCents: input.amountCents,
      currency: input.currency,
      linkType: "DESIGN_PLACEHOLDER"
    });

    return paymentRecord;

  } catch (error) {
    logError("PAYMENT_LINK_SERVICE", "Failed to generate payment link", {
      bookingId: input.bookingId,
      error: error instanceof Error ? error.message : String(error),
      amountCents: input.amountCents,
      currency: input.currency
    });
    throw error;
  }
}
