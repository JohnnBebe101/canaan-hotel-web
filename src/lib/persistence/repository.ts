/**
 * V6 Persistence Layer - Repository Interfaces
 *
 * Contract layer defining data access patterns for future database implementation.
 *
 * NO IMPLEMENTATION - TypeScript interfaces only.
 * These contracts establish the API that concrete repository implementations
 * will fulfill when migrating from in-memory to database storage.
 */

import {
  BookingRecord,
  PaymentRecord,
  RoomRecord,
  PartialBookingRecord,
  PartialPaymentRecord,
  PartialRoomRecord,
} from './types';

/**
 * Booking Repository Interface
 * Defines operations for booking data persistence
 */
export interface BookingRepository {
  /**
   * Retrieve all booking records
   */
  getAll(): Promise<BookingRecord[]>;

  /**
   * Retrieve a single booking by ID
   */
  getById(id: string): Promise<BookingRecord | null>;

  /**
   * Create a new booking record
   */
  create(record: Omit<BookingRecord, 'id' | 'createdAt' | 'updatedAt'>): Promise<BookingRecord>;

  /**
   * Update an existing booking record
   */
  update(id: string, updates: PartialBookingRecord): Promise<BookingRecord | null>;
}

/**
 * Payment Repository Interface
 * Defines operations for payment data persistence
 */
export interface PaymentRepository {
  /**
   * Retrieve all payment records
   */
  getAll(): Promise<PaymentRecord[]>;

  /**
   * Retrieve a single payment by ID
   */
  getById(id: string): Promise<PaymentRecord | null>;

  /**
   * Retrieve payments for a specific booking
   */
  getByBookingId(bookingId: string): Promise<PaymentRecord[]>;

  /**
   * Create a new payment record
   */
  create(record: Omit<PaymentRecord, 'id' | 'createdAt' | 'updatedAt'>): Promise<PaymentRecord>;

  /**
   * Update an existing payment record
   */
  update(id: string, updates: PartialPaymentRecord): Promise<PaymentRecord | null>;
}

/**
 * Room Repository Interface
 * Defines operations for room data persistence
 */
export interface RoomRepository {
  /**
   * Retrieve all room records
   */
  getAll(): Promise<RoomRecord[]>;

  /**
   * Retrieve a single room by ID
   */
  getById(id: string): Promise<RoomRecord | null>;

  /**
   * Retrieve only active rooms
   */
  getActive(): Promise<RoomRecord[]>;

  /**
   * Create a new room record
   */
  create(record: Omit<RoomRecord, 'id' | 'createdAt'>): Promise<RoomRecord>;

  /**
   * Update an existing room record
   */
  update(id: string, updates: PartialRoomRecord): Promise<RoomRecord | null>;
}
