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
 * ============================================================================
 * DATABASE MIRROR SHAPES - V6.1+ Database Schema Interfaces
 * ============================================================================
 *
 * These interfaces define the exact structure of data as stored in the database.
 * They mirror the in-memory models but include database-specific fields and constraints.
 * Used by ORM/Repository implementations when DB_PERSISTENCE_ENABLED=true.
 */

/**
 * Booking Record - Database Schema Mirror
 * Maps 1:1 with existing Booking model, optimized for database storage
 */
export interface BookingRecordDB {
  /** UUID primary key */
  id: string;

  /** Guest information */
  guestName: string;
  email: string;
  phone?: string;

  /** Booking details */
  roomType: string;
  checkIn: string;
  checkOut: string;

  /** Status in CRM workflow */
  status: 'NEW' | 'REVIEWED' | 'CONFIRMED' | 'INVOICED' | 'CANCELLED' | 'CLOSED';

  /** Optional fields */
  notes?: string;
  invoiceRef?: string;
  paymentId?: string;
  paymentStatus?: PaymentStatus;
  paymentRecord?: any; // V5.2.1 Payment link tracking

  /** Audit timestamps */
  createdAt: string;
  updatedAt: string;
}

/**
 * Payment Record - Database Schema Mirror
 * Maps 1:1 with existing PaymentRecord model, optimized for database storage
 */
export interface PaymentRecordDB {
  /** UUID primary key */
  id: string;

  /** Foreign key relationship */
  bookingId: string;

  /** Payment processing details */
  provider: PaymentProvider;
  status: PaymentStatus;
  amountCents: number;
  currency: string;
  paymentLink?: string;

  /** Audit timestamps */
  createdAt: string;
  updatedAt: string;
}

/**
 * Audit Event - Database Schema Mirror
 * Tracks all admin actions and system events for compliance and debugging
 */
export interface AuditEventDB {
  /** UUID primary key */
  id: string;

  /** What was affected */
  resourceType: 'booking' | 'payment' | 'room' | 'admin';
  resourceId: string;

  /** Action details */
  actionType: string;
  oldValues?: any; // JSONB in PostgreSQL
  newValues?: any; // JSONB in PostgreSQL

  /** Admin context */
  adminId?: string;
  adminEmail?: string;
  notes?: string;

  /** Security tracking */
  ipAddress?: string;
  userAgent?: string;

  /** Audit timestamp */
  createdAt: string;
}

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
 * Room Record - Database Schema Mirror
 */
export interface RoomRecordDB {
  id: string;
  name: string;
  description: string;
  pricePerNight: number;
  maxGuests: number;
  isActive: boolean;
  createdAt: string;
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
 * Attraction Record - Database Schema Mirror
 */
export interface AttractionRecordDB {
  id: string;
  name: string;
  description: string;
  category: string;
  distance: string;
  image?: string;
  active: boolean;
}

export interface AttractionRecord {
  id: string;
  name: string;
  description: string;
  category: string;
  distance: string;
  image?: string;
  active: boolean;
}

/**
 * Generic record type for partial updates
 * Used in repository update operations
 */
export type PartialBookingRecord = Partial<Omit<BookingRecord, 'id' | 'createdAt'>>;
export type PartialPaymentRecord = Partial<Omit<PaymentRecord, 'id' | 'createdAt'>>;
export type PartialRoomRecord = Partial<Omit<RoomRecord, 'id' | 'createdAt'>>;
export type PartialAttractionRecord = Partial<Omit<AttractionRecord, 'id'>>;
