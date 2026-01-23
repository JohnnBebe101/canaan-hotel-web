/**
 * Minimal In-Memory Payment Store - V5 Foundation
 *
 * IMPORTANT: This is data storage ONLY.
 * No Stripe SDK, no API routes, no side effects.
 *
 * Stores PaymentRecord objects for booking payment tracking.
 * In production, this will be replaced with a proper database.
 */

import { PaymentRecord, PaymentStatus } from "./payment-types";
import { isDbShadowReadEnabled } from "../featureFlags";
import { readPaymentById } from "../persistence/dbReader";
import { compareMemoryVsDB } from "../persistence/shadowCompare";
import { logError } from "../logger";

// In-memory storage for payment records
// Future: Replace with database persistence
let paymentRecords: PaymentRecord[] = [];

/**
 * Creates a new payment record in memory
 * @param record Complete PaymentRecord to store
 * @returns The stored payment record
 */
export function createPaymentRecord(record: PaymentRecord): PaymentRecord {
  paymentRecords.push(record);
  return record;
}

/**
 * Retrieves payment record by booking ID
 * @param bookingId Booking identifier
 * @returns PaymentRecord if found, undefined otherwise
 */
export async function getPaymentByBookingId(bookingId: string): Promise<PaymentRecord | undefined> {
  // Get payment from memory (source of truth)
  const payment = paymentRecords.find(record => record.bookingId === bookingId);

  // V6.4 Shadow reading: Compare memory vs DB without affecting behavior
  try {
    if (isDbShadowReadEnabled() && payment) {
      // Attempt to read same payment from database using payment ID
      const dbPayment = await readPaymentById(payment.id);

      // Compare memory vs database data
      const comparison = compareMemoryVsDB(payment, dbPayment);

      // Log mismatch if detected (no action taken)
      if (comparison.mismatch) {
        // Logging handled by compareMemoryVsDB function
      }
    }
  } catch (error) {
    // V6.4: Shadow read failure - log but never affect payment retrieval
    logError("SHADOW_READ_PAYMENT_FAILED", "Failed to perform shadow read for payment", {
      bookingId,
      paymentId: payment?.id,
      operation: "getPaymentByBookingId",
      error: error instanceof Error ? error.message : String(error),
    });
    // Memory result unchanged - continue with payment retrieval
  }

  return payment;
}

/**
 * Updates the status of an existing payment record
 * @param id Payment record ID
 * @param status New payment status
 * @returns Updated PaymentRecord if found, undefined otherwise
 */
export function updatePaymentStatus(id: string, status: PaymentStatus): PaymentRecord | undefined {
  const record = paymentRecords.find(r => r.id === id);
  if (record) {
    record.status = status;
    record.updatedAt = new Date().toISOString();
    return record;
  }
  return undefined;
}
