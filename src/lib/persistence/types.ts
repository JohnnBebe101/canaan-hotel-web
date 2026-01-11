/**
 * V6 Persistence Layer - Type Definitions
 *
 * Contract layer for database records. These interfaces define the structure
 * of persisted data entities aligned with existing in-memory models.
 *
 * NO IMPLEMENTATION - TypeScript contracts only.
 * These types will be used when migrating from in-memory to database storage.
 */

import { PaymentStatus, PaymentProvider } from '../payments/payment-types';

/**
 * Booking Record Interface
 * Aligned with existing Booking model for future database persistence
 */
export interface BookingRecord {
  id: string;
  guestName: string;
  email: string;
  phone?: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  status: 'NEW' | 'REVIEWED' | 'CONFIRMED' | 'INVOICED' | 'CANCELLED' | 'CLOSED';
  notes?: string;
  invoiceRef?: string;
  paymentId?: string;
  paymentStatus?: PaymentStatus;
  paymentRecord?: any; // V5.2.1 Payment link tracking
  createdAt: string;
  updatedAt: string;
}

/**
 * Payment Record Interface
 * Aligned with existing PaymentRecord model for future database persistence
 */
export interface PaymentRecord {
  id: string;
  bookingId: string;
  provider: PaymentProvider;
  status: PaymentStatus;
  amountCents: number;
  currency: string;
  paymentLink?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Room Record Interface
 * Aligned with existing Room model for future database persistence
 */
export interface RoomRecord {
  id: string;
  name: string;
  description: string;
  pricePerNight: number;
  maxGuests: number;
  isActive: boolean;
  createdAt: string;
}

/**
 * Generic record type for partial updates
 * Used in repository update operations
 */
export type PartialBookingRecord = Partial<Omit<BookingRecord, 'id' | 'createdAt'>>;
export type PartialPaymentRecord = Partial<Omit<PaymentRecord, 'id' | 'createdAt'>>;
export type PartialRoomRecord = Partial<Omit<RoomRecord, 'id' | 'createdAt'>>;
