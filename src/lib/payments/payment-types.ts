/**
 * V5.3.1 Payment Schema Definition - Manual Confirmation Lifecycle
 *
 * IMPORTANT: This file defines TypeScript schemas ONLY for manual payment processing.
 * It does NOT perform actual payments, API calls, or automatic status changes.
 *
 * MANUAL CONFIRMATION DESIGN PRINCIPLES:
 * - All payment lifecycle transitions are ADMIN-INITIATED ONLY
 * - No webhooks, automatic detection, or external triggers
 * - Payment confirmation requires explicit admin verification
 * - Booking ↔ Payment relationship is strictly controlled
 *
 * Lifecycle: DRAFT → LINK_CREATED → AWAITING_CONFIRMATION → PAID → CLOSED
 *
 * This schema provides type safety for V5.2+ Stripe integration.
 * Stripe SDK, API keys, and payment processing will be added in future versions.
 *
 * Safe to deploy without Stripe credentials or SDK dependencies.
 * Feature flag gated - no runtime impact when disabled.
 */

/**
 * V5.3.1 Payment Status Enum - Manual Confirmation Lifecycle
 *
 * IMPORTANT: All status transitions are ADMIN-INITIATED ONLY.
 * No automatic status changes, webhooks, or external triggers.
 *
 * Lifecycle: DRAFT → LINK_CREATED → AWAITING_CONFIRMATION → PAID → CLOSED
 */
export enum PaymentStatus {
  /** Initial state before payment link creation */
  DRAFT = "DRAFT",

  /** Payment link created and ready for customer */
  LINK_CREATED = "LINK_CREATED",

  /**
   * V5.3.1: Payment link sent to customer, awaiting completion
   * Admin must manually confirm payment receipt
   */
  AWAITING_CONFIRMATION = "AWAITING_CONFIRMATION",

  /** Payment successfully received and manually confirmed by admin */
  PAID = "PAID",

  /** Payment attempt failed */
  FAILED = "FAILED",

  /** Payment cancelled by customer or system */
  CANCELLED = "CANCELLED",

  /**
   * V5.3.1: Payment lifecycle complete (future: automatic on booking closure)
   * TODO: Implement automatic transition from PAID → CLOSED on booking closure
   */
  CLOSED = "CLOSED",
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
 * V5.3.1 Payment Record Interface - Manual Confirmation Design
 *
 * Core data structure for tracking payment attempts with admin-controlled lifecycle.
 *
 * IMPORTANT DESIGN PRINCIPLES:
 * - No automatic status changes (admin-initiated only)
 * - Payment confirmation requires external verification
 * - Booking ↔ Payment relationship is 1:1
 * - Status transitions trigger booking workflow updates
 */
export interface PaymentRecord {
  /** Unique identifier for this payment attempt */
  id: string;

  /** Associated booking ID (must match Booking.id) */
  bookingId: string;

  /** Payment processor used */
  provider: PaymentProvider;

  /**
   * Current payment status in manual confirmation lifecycle
   * See PaymentStatus enum for valid transitions
   */
  status: PaymentStatus;

  /** Amount in cents (must match calculated booking total) */
  amountCents: number;

  /** Currency code (consistent with hotel settings) */
  currency: string;

  /** Customer-facing payment link (available when LINK_CREATED or later) */
  paymentLink?: string;

  /** ISO timestamp of record creation */
  createdAt: string;

  /** ISO timestamp of last status update */
  updatedAt: string;

  /**
   * V5.3.1 Manual Confirmation Fields
   * TODO: Add admin confirmation timestamp
   * TODO: Add admin user ID who confirmed payment
   * TODO: Add external payment reference (bank transfer ID, etc.)
   * TODO: Add admin notes for confirmation justification
   */
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
 * V5.3.1 Manual Payment Confirmation Interface
 *
 * Defines the structure for admin-initiated payment confirmations.
 * Admin must verify payment receipt through external means before confirming.
 */
export interface PaymentConfirmationIntent {
  /** Payment record to confirm */
  paymentId: string;

  /** Admin verification notes (optional) */
  adminNotes?: string;

  /**
   * TODO: Add confirmation timestamp
   * TODO: Add admin user ID for audit trail
   * TODO: Add external reference (bank transfer ID, etc.)
   */
}

/**
 * V5.3.1 Payment Lifecycle Transition Rules
 *
 * Defines valid admin-initiated status transitions.
 * All transitions require explicit admin approval.
 */
export enum PaymentLifecycleTransition {
  /** Generate payment link: DRAFT → LINK_CREATED */
  GENERATE_LINK = "GENERATE_LINK",

  /** Mark as sent to customer: LINK_CREATED → AWAITING_CONFIRMATION */
  MARK_SENT = "MARK_SENT",

  /** Confirm payment received: AWAITING_CONFIRMATION → PAID */
  CONFIRM_RECEIVED = "CONFIRM_RECEIVED",

  /** Mark as failed: Any active status → FAILED */
  MARK_FAILED = "MARK_FAILED",

  /** Cancel payment: Any status → CANCELLED */
  CANCEL_PAYMENT = "CANCEL_PAYMENT",

  /**
   * TODO: Close payment lifecycle: PAID → CLOSED (automatic on booking closure)
   */
  CLOSE_LIFECYCLE = "CLOSE_LIFECYCLE",
}

/**
 * V5.3.1 Payment Admin Action Interface
 *
 * Structure for tracking admin actions on payment records.
 * Used for audit logging and admin UI display.
 */
export interface PaymentAdminAction {
  /** Type of action performed */
  action: PaymentLifecycleTransition;

  /** Payment record affected */
  paymentId: string;

  /** Admin notes or justification */
  notes?: string;

  /** Timestamp of action */
  timestamp: string;

  /**
   * TODO: Add admin user ID
   * TODO: Add IP address for security audit
   * TODO: Add action metadata (amount changes, etc.)
   */
}

import { isPaymentsEnabled } from "../featureFlags";

/**
 * Payment Feature Active Check
 * Helper function to determine if payments feature is enabled
 *
 * @returns true if payments are enabled, false otherwise
 */
export function isPaymentsFeatureActive(): boolean {
  try {
    return isPaymentsEnabled();
  } catch (error) {
    // Fail closed - payments disabled if feature flags unavailable
    return false;
  }
}
