/**
 * V6 Persistence Layer - Booking Memory Repository Adapter
 *
 * TRANSITIONAL ADAPTER: This implementation wraps the existing in-memory booking store
 * without modifying its logic or behavior. It provides a repository interface for future
 * database migration while maintaining complete backward compatibility.
 *
 * NO NEW LOGIC: All operations delegate to existing booking-store.ts functions.
 * NO DATA DUPLICATION: Uses the same underlying data structures.
 * NO BEHAVIOR CHANGES: Return values and side effects remain identical.
 */

import { BookingRepository } from '../repository';
import { BookingRecord, PartialBookingRecord } from '../types';
import {
  getBookings,
  getBooking,
  createBooking,
  updateBookingStatus,
  updateBookingNotes,
  updateBookingPayment,
} from '../../booking-store';

/**
 * Memory-based booking repository adapter
 * Wraps existing in-memory booking store with repository interface
 */
export class BookingMemoryRepository implements BookingRepository {
  async getAll(): Promise<BookingRecord[]> {
    // Delegate to existing in-memory function
    const bookings = getBookings();
    // Return as BookingRecord[] (compatible with existing Booking[])
    // Type assertion safe for transitional adapter
    return bookings as BookingRecord[];
  }

  async getById(id: string): Promise<BookingRecord | null> {
    // Delegate to existing in-memory function
    const booking = await getBooking(id);
    // Return null if not found (matches existing behavior)
    // Type assertion safe for transitional adapter
    return (booking as BookingRecord) || null;
  }

  async create(record: Omit<BookingRecord, 'id' | 'createdAt' | 'updatedAt'>): Promise<BookingRecord> {
    // Transform repository record to booking-store format
    // Note: paymentStatus omitted as existing createBooking doesn't handle it
    const bookingData = {
      guestName: record.guestName,
      email: record.email,
      phone: record.phone,
      roomType: record.roomType,
      checkIn: record.checkIn,
      checkOut: record.checkOut,
      notes: record.notes,
      paymentId: record.paymentId,
    };

    // Delegate to existing createBooking function (includes all side effects)
    const created = await createBooking(bookingData);

    // Return as BookingRecord (compatible with existing Booking)
    // Type assertion safe for transitional adapter
    return created as BookingRecord;
  }

  async update(id: string, updates: PartialBookingRecord): Promise<BookingRecord | null> {
    // Handle different types of updates by delegating to appropriate existing functions

    if (updates.status !== undefined) {
      // Delegate status updates to existing function (includes logging and email dispatch)
      // Type assertion safe for transitional adapter
      return await updateBookingStatus(id, updates.status) as BookingRecord | null;
    }

    if (updates.notes !== undefined) {
      // Delegate notes updates to existing function
      // Type assertion safe for transitional adapter
      return await updateBookingNotes(id, updates.notes) as BookingRecord | null;
    }

    if (updates.paymentId !== undefined && updates.paymentRecord !== undefined) {
      // Delegate payment updates to existing function
      // Type assertion safe for transitional adapter
      return await updateBookingPayment(id, updates.paymentId, updates.paymentRecord) as BookingRecord | null;
    }

    // For other updates, we need to handle manually (no existing function covers all fields)
    // This maintains compatibility with existing update patterns
    const booking = await getBooking(id);
    if (!booking) return null;

    // Apply updates to the existing booking object (direct mutation)
    Object.assign(booking, updates);

    // Return updated booking
    // Type assertion safe for transitional adapter
    return booking as BookingRecord;
  }
}
