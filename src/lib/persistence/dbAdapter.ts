/**
 * V6.1+ Database Adapter Skeleton
 *
 * This is a PLACEHOLDER ADAPTER for future database persistence.
 * It provides the function signatures and control flow for database operations,
 * but does not implement actual database connectivity.
 *
 * When DB_PERSISTENCE_ENABLED=true, this will integrate with a real database.
 * Currently throws NotImplementedError to prevent accidental usage.
 *
 * NO DATABASE IMPORTS - No Prisma, Drizzle, or SQL drivers.
 * NO SIDE EFFECTS - Pure function calls with feature flag control.
 */

import { isDbPersistenceEnabled } from '../featureFlags';
import { logError } from '../logger';
import { BookingRecordDB, PaymentRecordDB, AuditEventDB } from './types';

/**
 * Error thrown when database operations are attempted but not implemented yet
 */
class NotImplementedError extends Error {
  constructor(operation: string) {
    super(`Database operation '${operation}' is not implemented yet. Enable DB_PERSISTENCE_ENABLED only when database layer is complete.`);
    this.name = 'NotImplementedError';
  }
}

/**
 * Save booking record to database
 * @param booking Complete booking record to persist
 */
export async function saveBooking(booking: BookingRecordDB): Promise<void> {
  if (!isDbPersistenceEnabled()) {
    // Database persistence disabled - silently return
    return;
  }

  // Database persistence enabled but not implemented yet
  logError('DB_ADAPTER', 'Attempted to save booking to unimplemented database', {
    bookingId: booking.id,
    operation: 'saveBooking'
  });

  throw new NotImplementedError('saveBooking');
}

/**
 * Save payment record to database
 * @param payment Complete payment record to persist
 */
export async function savePayment(payment: PaymentRecordDB): Promise<void> {
  if (!isDbPersistenceEnabled()) {
    // Database persistence disabled - silently return
    return;
  }

  // Database persistence enabled but not implemented yet
  logError('DB_ADAPTER', 'Attempted to save payment to unimplemented database', {
    paymentId: payment.id,
    bookingId: payment.bookingId,
    operation: 'savePayment'
  });

  throw new NotImplementedError('savePayment');
}

/**
 * Save audit event to database
 * @param event Complete audit event to persist
 */
export async function saveAuditEvent(event: AuditEventDB): Promise<void> {
  if (!isDbPersistenceEnabled()) {
    // Database persistence disabled - silently return
    return;
  }

  // Database persistence enabled but not implemented yet
  logError('DB_ADAPTER', 'Attempted to save audit event to unimplemented database', {
    eventId: event.id,
    resourceType: event.resourceType,
    resourceId: event.resourceId,
    operation: 'saveAuditEvent'
  });

  throw new NotImplementedError('saveAuditEvent');
}

/**
 * Retrieve booking record from database by ID
 * @param id Booking ID to retrieve
 * @returns Booking record or null if not found
 */
export async function getBookingById(id: string): Promise<BookingRecordDB | null> {
  if (!isDbPersistenceEnabled()) {
    // Database persistence disabled - return null
    return null;
  }

  // Database persistence enabled but not implemented yet
  logError('DB_ADAPTER', 'Attempted to retrieve booking from unimplemented database', {
    bookingId: id,
    operation: 'getBookingById'
  });

  throw new NotImplementedError('getBookingById');
}

/**
 * Retrieve payment record from database by ID
 * @param id Payment ID to retrieve
 * @returns Payment record or null if not found
 */
export async function getPaymentById(id: string): Promise<PaymentRecordDB | null> {
  if (!isDbPersistenceEnabled()) {
    // Database persistence disabled - return null
    return null;
  }

  // Database persistence enabled but not implemented yet
  logError('DB_ADAPTER', 'Attempted to retrieve payment from unimplemented database', {
    paymentId: id,
    operation: 'getPaymentById'
  });

  throw new NotImplementedError('getPaymentById');
}

/**
 * Retrieve payments for a specific booking
 * @param bookingId Booking ID to get payments for
 * @returns Array of payment records
 */
export async function getPaymentsByBookingId(bookingId: string): Promise<PaymentRecordDB[]> {
  if (!isDbPersistenceEnabled()) {
    // Database persistence disabled - return empty array
    return [];
  }

  // Database persistence enabled but not implemented yet
  logError('DB_ADAPTER', 'Attempted to retrieve booking payments from unimplemented database', {
    bookingId,
    operation: 'getPaymentsByBookingId'
  });

  throw new NotImplementedError('getPaymentsByBookingId');
}

/**
 * Update booking record in database
 * @param id Booking ID to update
 * @param updates Partial booking data to apply
 * @returns Updated booking record or null if not found
 */
export async function updateBooking(id: string, updates: Partial<BookingRecordDB>): Promise<BookingRecordDB | null> {
  if (!isDbPersistenceEnabled()) {
    // Database persistence disabled - return null
    return null;
  }

  // Database persistence enabled but not implemented yet
  logError('DB_ADAPTER', 'Attempted to update booking in unimplemented database', {
    bookingId: id,
    operation: 'updateBooking'
  });

  throw new NotImplementedError('updateBooking');
}

/**
 * Update payment record in database
 * @param id Payment ID to update
 * @param updates Partial payment data to apply
 * @returns Updated payment record or null if not found
 */
export async function updatePayment(id: string, updates: Partial<PaymentRecordDB>): Promise<PaymentRecordDB | null> {
  if (!isDbPersistenceEnabled()) {
    // Database persistence disabled - return null
    return null;
  }

  // Database persistence enabled but not implemented yet
  logError('DB_ADAPTER', 'Attempted to update payment in unimplemented database', {
    paymentId: id,
    operation: 'updatePayment'
  });

  throw new NotImplementedError('updatePayment');
}

