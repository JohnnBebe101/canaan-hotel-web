/**
 * V6.4 Database Reader - Shadow Read Accessors
 *
 * Read-only database access for shadow reading during migration.
 * Compares memory vs database state without affecting application behavior.
 *
 * SAFETY FIRST:
 * - No writes or mutations
 * - Feature-flag gated (both DB_PERSISTENCE_ENABLED and DB_SHADOW_READ_ENABLED)
 * - Graceful degradation on DB unavailability
 * - Never throws errors - always returns null on failure
 */

import { isDbPersistenceEnabled, isDbShadowReadEnabled } from '../featureFlags';
import { getBookingById, getPaymentById } from './dbAdapter';
import { logError } from '../logger';
import { BookingRecordDB, PaymentRecordDB } from './types';

/**
 * Read booking from database for shadow comparison
 *
 * @param id Booking ID to retrieve
 * @returns BookingRecordDB if available, null if DB disabled or unavailable
 */
export async function readBookingById(id: string): Promise<BookingRecordDB | null> {
  // Both flags must be enabled for shadow reads
  if (!isDbPersistenceEnabled() || !isDbShadowReadEnabled()) {
    return null;
  }

  try {
    // Attempt database read
    return await getBookingById(id);
  } catch (error) {
    // V6.4: DB read failure during shadow reading
    logError('DB_SHADOW_READ_FAILED', 'Failed to read booking from database during shadow read', {
      bookingId: id,
      operation: 'readBookingById',
      error: error instanceof Error ? error.message : String(error),
    });
    // Return null on any DB error - shadow read should not break functionality
    return null;
  }
}

/**
 * Read payment from database for shadow comparison
 *
 * @param id Payment ID to retrieve
 * @returns PaymentRecordDB if available, null if DB disabled or unavailable
 */
export async function readPaymentById(id: string): Promise<PaymentRecordDB | null> {
  // Both flags must be enabled for shadow reads
  if (!isDbPersistenceEnabled() || !isDbShadowReadEnabled()) {
    return null;
  }

  try {
    // Attempt database read
    return await getPaymentById(id);
  } catch (error) {
    // V6.4: DB read failure during shadow reading
    logError('DB_SHADOW_READ_FAILED', 'Failed to read payment from database during shadow read', {
      paymentId: id,
      operation: 'readPaymentById',
      error: error instanceof Error ? error.message : String(error),
    });
    // Return null on any DB error - shadow read should not break functionality
    return null;
  }
}