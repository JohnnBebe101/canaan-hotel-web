/**
 * V5 Payment Schema Definition - Foundation Layer Only
 *
 * IMPORTANT: This file defines TypeScript schemas ONLY.
 * It does NOT perform actual payments or API calls.
 *
 * This schema provides type safety for future V5.2+ Stripe integration.
 * Stripe SDK, API keys, and payment processing will be added in V5.2+.
 *
 * Safe to deploy without Stripe credentials or SDK dependencies.
 * Feature flag gated - no runtime impact when disabled.
 */

/**
 * Payment Status Enum
 * Tracks the lifecycle of a payment attempt
 */
export enum PaymentStatus {
  /** Initial state before payment link creation */
  DRAFT = "DRAFT",

  /** Payment link created and ready for customer */
  LINK_CREATED = "LINK_CREATED",

  /** Payment successfully completed */
  PAID = "PAID",

  /** Payment attempt failed */
  FAILED = "FAILED",

  /** Payment cancelled by customer or system */
  CANCELLED = "CANCELLED",
}

/**
 * Payment Provider Enum
 * Currently supports Stripe only (expandable for future providers)
 */
export enum PaymentProvider {
  /** Stripe payment processor */
  STRIPE = "STRIPE",
}

/**
 * Payment Record Interface
 * Core data structure for tracking payment attempts
 */
export interface PaymentRecord {
  /** Unique identifier for this payment attempt */
  id: string;

  /** Associated booking ID */
  bookingId: string;

  /** Payment processor used */
  provider: PaymentProvider;

  /** Current payment status */
  status: PaymentStatus;

  /** Amount in cents (Stripe-compatible format) */
  amountCents: number;

  /** Currency code (e.g., "usd", "eur") */
  currency: string;

  /** Customer-facing payment link (when LINK_CREATED) */
  paymentLink?: string;

  /** ISO timestamp of record creation */
  createdAt: string;

  /** ISO timestamp of last update */
  updatedAt: string;
}

/**
 * Payment Creation Intent Interface
 * Input structure for creating new payment records
 */
export interface PaymentCreateIntent {
  /** Booking to create payment for */
  bookingId: string;

  /** Amount in cents */
  amountCents: number;

  /** Currency code */
  currency: string;
}

/**
 * Payment Feature Active Check
 * Helper function to determine if payments feature is enabled
 *
 * @returns true if payments are enabled, false otherwise
 */
export function isPaymentsFeatureActive(): boolean {
  // Import here to avoid circular dependencies and ensure feature flag safety
  const { isPaymentsEnabled } = require("../featureFlags");

  try {
    return isPaymentsEnabled();
  } catch (error) {
    // Fail closed - payments disabled if feature flags unavailable
    return false;
  }
}
