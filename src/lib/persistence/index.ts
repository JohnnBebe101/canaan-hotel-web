/**
 * V6 Persistence Layer - Repository Factory
 *
 * Factory functions for obtaining repository instances.
 * Currently defaults to in-memory implementations for safety.
 *
 * NO DATABASE SUPPORT YET - DB support added in V6.2+
 * This ensures the application remains fully functional during transition.
 */

import { BookingRepository } from './repository';
import { PaymentRepository } from './repository';
import { RoomRepository } from './repository';

import { BookingMemoryRepository } from './memory/bookingMemoryRepository';
import { PaymentMemoryRepository } from './memory/paymentMemoryRepository';
import { RoomMemoryRepository } from './memory/roomMemoryRepository';

/**
 * Get booking repository instance
 * Currently returns memory-based implementation for safety
 *
 * @returns BookingRepository instance
 */
export function getBookingRepository(): BookingRepository {
  // DB support added in V6.2+
  // For now, always use memory implementation
  return new BookingMemoryRepository();
}

/**
 * Get payment repository instance
 * Currently returns memory-based implementation for safety
 *
 * @returns PaymentRepository instance
 */
export function getPaymentRepository(): PaymentRepository {
  // DB support added in V6.2+
  // For now, always use memory implementation
  return new PaymentMemoryRepository();
}

/**
 * Get room repository instance
 * Currently returns memory-based implementation for safety
 *
 * @returns RoomRepository instance
 */
export function getRoomRepository(): RoomRepository {
  // DB support added in V6.2+
  // For now, always use memory implementation
  return new RoomMemoryRepository();
}