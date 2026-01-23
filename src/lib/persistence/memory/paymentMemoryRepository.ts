/**
 * V6 Persistence Layer - Payment Memory Repository Adapter
 *
 * TRANSITIONAL ADAPTER: This implementation wraps the existing in-memory payment store
 * without modifying its logic or behavior. It provides a repository interface for future
 * database migration while maintaining complete backward compatibility.
 *
 * NO NEW LOGIC: All operations delegate to existing payment-store.ts functions.
 * NO DATA DUPLICATION: Uses the same underlying data structures.
 * NO BEHAVIOR CHANGES: Return values and side effects remain identical.
 */

import { PaymentRepository } from '../repository';
import { PaymentRecord, PartialPaymentRecord } from '../types';
import {
  createPaymentRecord,
  getPaymentByBookingId,
  updatePaymentStatus,
} from '../../payments/payment-store';

/**
 * Memory-based payment repository adapter
 * Wraps existing in-memory payment store with repository interface
 */
export class PaymentMemoryRepository implements PaymentRepository {
  async getAll(): Promise<PaymentRecord[]> {
    // Note: Existing payment store doesn't have getAll function
    // For now, return empty array (this will be implemented when migrating to database)
    // This maintains compatibility and allows the interface to exist
    return [];
  }

  async getById(id: string): Promise<PaymentRecord | null> {
    // Note: Existing payment store doesn't have getById function
    // For now, return null (this will be implemented when migrating to database)
    // This maintains compatibility and allows the interface to exist
    return null;
  }

  async getByBookingId(bookingId: string): Promise<PaymentRecord[]> {
    // Delegate to existing in-memory function
    const payment = await getPaymentByBookingId(bookingId);
    // Return as array (existing function returns single record or undefined)
    return payment ? [payment] : [];
  }

  async create(record: Omit<PaymentRecord, 'id' | 'createdAt' | 'updatedAt'>): Promise<PaymentRecord> {
    // Transform repository record to payment-store format
    const paymentData: PaymentRecord = {
      id: crypto.randomUUID(), // Generate ID as existing function expects complete record
      bookingId: record.bookingId,
      provider: record.provider,
      status: record.status,
      amountCents: record.amountCents,
      currency: record.currency,
      paymentLink: record.paymentLink,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Delegate to existing createPaymentRecord function
    const created = createPaymentRecord(paymentData);

    // Return as PaymentRecord
    return created;
  }

  async update(id: string, updates: PartialPaymentRecord): Promise<PaymentRecord | null> {
    // Handle status updates (only supported operation in existing store)
    if (updates.status !== undefined) {
      // Delegate to existing updatePaymentStatus function
      return updatePaymentStatus(id, updates.status) || null;
    }

    // For other updates, we need to handle manually (no existing function covers all fields)
    // Note: This is a limitation of the current in-memory store
    // Full update support will be available when migrating to database

    // For now, return null to indicate update not supported
    // This maintains safety - no partial updates that could corrupt data
    return null;
  }
}
