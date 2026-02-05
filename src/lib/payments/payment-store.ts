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
