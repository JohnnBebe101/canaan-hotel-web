import { isDbPersistenceEnabled } from '../featureFlags';
import { logError } from '../logger';
import { BookingRecordDB, PaymentRecordDB, AuditEventDB } from './types';
import { initializeDatabase, Booking, nanoid } from '../db'; // Import lowdb setup

/**
 * Save booking record to database
 * @param booking Complete booking record to persist
 */
export async function saveBooking(booking: BookingRecordDB): Promise<void> {
  if (!isDbPersistenceEnabled()) {
    // Database persistence disabled - silently return
    return;
  }

  try {
    const db = await initializeDatabase();
    const existingBookingIndex = db.data.bookings.findIndex(b => b.id === booking.id);

    if (existingBookingIndex > -1) {
      // Update existing booking
      db.data.bookings[existingBookingIndex] = { ...db.data.bookings[existingBookingIndex], ...booking as Booking };
    } else {
      // Add new booking
      const newBooking: Booking = {
        id: nanoid(),
        created_at: Date.now(),
        status: 'pending',
        ...booking as Booking,
      };
      db.data.bookings.push(newBooking);
    }
    await db.write();
  } catch (error) {
    logError('DB_ADAPTER', 'Failed to save booking to database', { bookingId: booking.id, error });
    throw new Error('Failed to save booking');
  }
}

/**
 * Save payment record to database
 * @param payment Complete payment record to persist
 */
export async function savePayment(payment: PaymentRecordDB): Promise<void> {
  if (!isDbPersistenceEnabled()) {
    return;
  }
  // Payments not fully implemented in lowdb for now, silently return
  logError('DB_ADAPTER', 'Attempted to save payment to unimplemented database', { paymentId: payment.id, bookingId: payment.bookingId, operation: 'savePayment' });
  return;
}

/**
 * Save audit event to database
 * @param event Complete audit event to persist
 */
export async function saveAuditEvent(event: AuditEventDB): Promise<void> {
  if (!isDbPersistenceEnabled()) {
    return;
  }
  // Audit events not fully implemented in lowdb for now, silently return
  logError('DB_ADAPTER', 'Attempted to save audit event to unimplemented database', { eventId: event.id, resourceType: event.resourceType, resourceId: event.resourceId, operation: 'saveAuditEvent' });
  return;
}

/**
 * Retrieve booking record from database by ID
 * @param id Booking ID to retrieve
 * @returns Booking record or null if not found
 */
export async function getBookingById(id: string): Promise<BookingRecordDB | null> {
  if (!isDbPersistenceEnabled()) {
    return null;
  }

  try {
    const db = await initializeDatabase();
    return db.data.bookings.find(b => b.id === id) as BookingRecordDB || null;
  } catch (error) {
    logError('DB_ADAPTER', 'Failed to retrieve booking from database', { bookingId: id, error });
    throw new Error('Failed to retrieve booking');
  }
}

/**
 * Retrieve payment record from database by ID
 * @param id Payment ID to retrieve
 * @returns Payment record or null if not found
 */
export async function getPaymentById(id: string): Promise<PaymentRecordDB | null> {
  if (!isDbPersistenceEnabled()) {
    return null;
  }
  // Payments not fully implemented in lowdb for now, silently return null
  logError('DB_ADAPTER', 'Attempted to retrieve payment from unimplemented database', { paymentId: id, operation: 'getPaymentById' });
  return null;
}

/**
 * Retrieve payments for a specific booking
 * @param bookingId Booking ID to get payments for
 * @returns Array of payment records
 */
export async function getPaymentsByBookingId(bookingId: string): Promise<PaymentRecordDB[]> {
  if (!isDbPersistenceEnabled()) {
    return [];
  }
  // Payments not fully implemented in lowdb for now, silently return empty array
  logError('DB_ADAPTER', 'Attempted to retrieve booking payments from unimplemented database', { bookingId, operation: 'getPaymentsByBookingId' });
  return [];
}

/**
 * Update booking record in database
 * @param id Booking ID to update
 * @param updates Partial booking data to apply
 * @returns Updated booking record or null if not found
 */
export async function updateBooking(id: string, updates: Partial<BookingRecordDB>): Promise<BookingRecordDB | null> {
  if (!isDbPersistenceEnabled()) {
    return null;
  }

  try {
    const db = await initializeDatabase();
    const bookingIndex = db.data.bookings.findIndex(b => b.id === id);

    if (bookingIndex > -1) {
      db.data.bookings[bookingIndex] = { ...db.data.bookings[bookingIndex], ...updates as Booking };
      await db.write();
      return db.data.bookings[bookingIndex] as BookingRecordDB;
    }
    return null;
  } catch (error) {
    logError('DB_ADAPTER', 'Failed to update booking in database', { bookingId: id, error });
    throw new Error('Failed to update booking');
  }
}

/**
 * Update payment record in database
 * @param id Payment ID to update
 * @param updates Partial payment data to apply
 * @returns Updated payment record or null if not found
 */
export async function updatePayment(id: string, updates: Partial<PaymentRecordDB>): Promise<PaymentRecordDB | null> {
  if (!isDbPersistenceEnabled()) {
    return null;
  }
  // Payments not fully implemented in lowdb for now, silently return null
  logError('DB_ADAPTER', 'Attempted to update payment in unimplemented database', { paymentId: id, operation: 'updatePayment' });
  return null;
}

/**
 * Retrieve all bookings from the database
 * @returns Array of all booking records
 */
export async function getAllBookings(): Promise<BookingRecordDB[]> {
  if (!isDbPersistenceEnabled()) {
    return [];
  }

  try {
    const db = await initializeDatabase();
    return db.data.bookings as BookingRecordDB[];
  } catch (error) {
    logError('DB_ADAPTER', 'Failed to retrieve all bookings from database', { operation: 'getAllBookings', error });
    throw new Error('Failed to retrieve all bookings');
  }
}

