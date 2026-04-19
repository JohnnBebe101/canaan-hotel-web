// ============================================================
// BOOKING & PAYMENT STATE MACHINE
// Phase 2 - Domain-level type definitions
// ============================================================

// --------------------------------------------------------
// BOOKING LIFECYCLE STATUS (separate from payment)
// --------------------------------------------------------

export type BookingStatus =
  | "inquiry"          // Initial inquiry, no commitment yet
  | "booking_created"  // Booking intent created, awaiting confirmation
  | "held"            // Hold placed, awaiting payment
  | "hold_pending_confirmation"  // Payment received, verifying availability
  | "confirmed"       // Confirmed by hotel staff
  | "cancelled";      // Cancelled (by guest or hotel)

// Payment status - tracks Stripe/payment lifecycle
export type PaymentStatus =
  | "unpaid"       // Booking created, no payment attempt made
  | "pending"     // Checkout session started / payment in progress
  | "paid"        // Payment confirmed by Stripe/provider
  | "failed"      // Payment failed or was cancelled
  | "refunded";   // Payment was refunded

// --------------------------------------------------------
// BOOKING VERSION (for migrations)
// --------------------------------------------------------

export type BookingVersion = "v1-pre-stripe" | "v2-hybrid-confirmation";

export type BookingOrigin = "online" | "local";

// --------------------------------------------------------
// DEFAULT VALUES (for new bookings)
// These should be set explicitly at creation time
// --------------------------------------------------------

export const DEFAULT_BOOKING_VERSION: BookingVersion = "v2-hybrid-confirmation";
export const DEFAULT_PAYMENT_STATUS: PaymentStatus = "unpaid";
export const DEFAULT_BOOKING_STATUS: BookingStatus = "booking_created";
export const DEFAULT_BOOKING_ORIGIN: BookingOrigin = "online";
export const HOLD_WINDOW_MINUTES = 30;
export const CONFIRMATION_WINDOW_HOURS = 2;

export function generateBookingReference(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `CAN-${year}-${month}${day}-${random}`;
}

// --------------------------------------------------------
// LEGACY STATUS MAPPING
// Keeping backward compatibility with existing status field
// --------------------------------------------------------

// Legacy booking status (current system - DO NOT change)
export type LegacyBookingStatus = "pending" | "confirmed" | "cancelled";

// Map new PaymentStatus to legacy for migration future
export const PAYMENT_TO_BOOKING_STATUS: Record<PaymentStatus, BookingStatus> = {
  unpaid: "inquiry",
  pending: "booking_created",
  paid: "confirmed",
  failed: "cancelled",
  refunded: "cancelled",
};

// --------------------------------------------------------
// STRIPE WEBHOOK ID TYPE
// Used for webhook idempotency - prevents duplicate booking creation
// --------------------------------------------------------

export type StripeWebhookEventId = string;

export function isValidStripeWebhookEventId(id: string | null | undefined): id is StripeWebhookEventId {
  return typeof id === "string" && id.length > 0;
}

// --------------------------------------------------------
// ADMIN CLIENT TYPE
// Service role client for admin operations (bypasses RLS)
// --------------------------------------------------------

export type AdminClient = import("@supabase/supabase-js").SupabaseClient;

// --------------------------------------------------------
// TYPE GUARDS (optional - for defensive coding)
// --------------------------------------------------------

export function isValidBookingVersion(version: string): version is BookingVersion {
  return ["v1-pre-stripe", "v2-hybrid-confirmation"].includes(version);
}

export function isValidBookingStatus(status: string): status is BookingStatus {
  return ["inquiry", "booking_created", "confirmed", "cancelled"].includes(status);
}

export function isValidPaymentStatus(status: string): status is PaymentStatus {
  return ["unpaid", "pending", "paid", "failed", "refunded"].includes(status);
}

export function isValidLegacyStatus(status: string): status is LegacyBookingStatus {
  return ["pending", "confirmed", "cancelled"].includes(status);
}

// --------------------------------------------------------
// EXPORTS FOR CONVENIENCE
// --------------------------------------------------------

export const BOOKING_STATUS_VALUES: BookingStatus[] = [
  "inquiry",
  "booking_created",
  "confirmed",
  "cancelled",
];

export const PAYMENT_STATUS_VALUES: PaymentStatus[] = [
  "unpaid",
  "pending",
  "paid",
  "failed",
  "refunded",
];

export const LEGACY_STATUS_VALUES: LegacyBookingStatus[] = [
  "pending",
  "confirmed",
  "cancelled",
];