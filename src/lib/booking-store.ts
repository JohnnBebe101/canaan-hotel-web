import { Booking, BookingStatus } from "./models";
import { safeAsync } from "./asyncGuards";
import { logInfo, logWarn, logError } from "./logger";
import {
  dispatchBookingReceivedEmail,
  dispatchBookingStatusUpdateEmail,
  dispatchInvoiceIssuedEmail,
  dispatchHotelAlertEmail,
} from "./email/emailDispatcher";
import { isDbPersistenceEnabled, isDbShadowReadEnabled, isDbReadPrimaryEnabled } from "./featureFlags";
import { saveBooking, getBookingById } from "./persistence/dbAdapter";
import { readBookingById } from "./persistence/dbReader";
import { compareMemoryVsDB } from "./persistence/shadowCompare";

// CRM Core: Operational booking management
// Future: Replace with database, but this gives full workflow control
let bookings: Booking[] = [];

export function getBookings(): Booking[] {
  return bookings;
}

export async function getBooking(id: string): Promise<Booking | undefined> {
  // V6.5 Cutover: DB primary read with runtime guards
  if (isDbReadPrimaryEnabled()) {
    // Runtime guard: Check if DB persistence is actually enabled
    if (!isDbPersistenceEnabled()) {
      // DB_READ_PRIMARY_ENABLED is true but DB_PERSISTENCE_ENABLED is false
      logWarn("DB_CUTOVER_GUARD", "DB_READ_PRIMARY_ENABLED=true but DB_PERSISTENCE_ENABLED=false, falling back to memory", {
        operation: "getBooking",
        bookingId: id,
      });
      // Continue to memory fallback - never throw in production paths
    } else {
      // DB is enabled, attempt primary read
      try {
        const dbBooking = await getBookingById(id);
        if (dbBooking) {
          // DB primary read succeeded
          logInfo("DB_CUTOVER_SUCCESS", "DB primary read succeeded", {
            operation: "getBooking",
            bookingId: id,
          });
          return dbBooking as Booking;
        }
        // DB returned null - fallback to memory
      } catch (error) {
        // DB read failed, falling back to memory
        logWarn("DB_CUTOVER_FALLBACK", "DB read failed, falling back to memory", {
          operation: "getBooking",
          bookingId: id,
          error: error instanceof Error ? error.message : String(error),
        });
        // Continue to memory fallback - never throw fatal errors
      }
    }
  }

  // Memory fallback (when DB disabled or DB read failed)
  const booking = bookings.find((b) => b.id === id);

  // V6.4 Shadow reading: Compare memory vs DB without affecting behavior
  try {
    if (isDbShadowReadEnabled() && booking) {
      // Attempt to read same booking from database
      const dbBooking = await readBookingById(id);

      // Compare memory vs database data
      const comparison = compareMemoryVsDB(booking, dbBooking);

      // Log mismatch if detected (no action taken)
      if (comparison.mismatch) {
        // Logging handled by compareMemoryVsDB function
      }
    }
  } catch (error) {
    // V6.4: Shadow read failure - log but never affect booking retrieval
    logError("SHADOW_READ_BOOKING_FAILED", "Failed to perform shadow read for booking", {
      bookingId: id,
      operation: "getBooking",
      error: error instanceof Error ? error.message : String(error),
    });
    // Memory result unchanged - continue with booking retrieval
  }

  return booking;
}

export async function createBooking(data: Omit<Booking, "id" | "status" | "createdAt" | "updatedAt">): Promise<Booking> {
  const booking: Booking = {
    ...data,
    id: crypto.randomUUID(),
    status: "NEW",  // All bookings start as NEW
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  bookings.unshift(booking); // New bookings at top

  // V6.3 dual-write: memory-first, DB optional
  // Attempt database persistence after memory write succeeds
  try {
    if (isDbPersistenceEnabled()) {
      // Convert memory booking to database format and save
      const dbRecord = {
        id: booking.id,
        guestName: booking.guestName,
        email: booking.email,
        phone: booking.phone,
        roomType: booking.roomType,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        status: booking.status,
        notes: booking.notes,
        invoiceRef: booking.invoiceRef,
        paymentId: booking.paymentId,
        paymentStatus: booking.paymentStatus,
        paymentRecord: booking.paymentRecord,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt,
      };
      await saveBooking(dbRecord);
    }
  } catch (error) {
    // V6.3: DB write failure - log but never break execution
    logError("DB_DUAL_WRITE_FAILED", "Failed to persist booking to database", {
      bookingId: booking.id,
      operation: "createBooking",
      error: error instanceof Error ? error.message : String(error),
    });
    // Memory remains source of truth - continue execution
  }

  // V4.4 logging: Track booking lifecycle for CRM audit trail
  logInfo("CRM_BOOKING", `New booking created: ${booking.id}`, {
    bookingId: booking.id,
    guestName: booking.guestName,
    roomType: booking.roomType,
    status: booking.status
  });

  // Dispatch email notifications (non-blocking, V4.4 async guard)
  // Prevents silent email failures and app hangs during booking creation
  safeAsync(
    () => Promise.all([
      dispatchBookingReceivedEmail(booking),
      dispatchHotelAlertEmail(booking)
    ]).then(() => undefined),
    "BOOKING_CREATION_EMAILS"
  );

  return booking;
}

export async function updateBookingStatus(id: string, status: BookingStatus): Promise<Booking | null> {
  const booking = await getBooking(id);
  if (!booking) return null;

  // Business rule: Can't change status of closed bookings
  if (booking.status === "CLOSED") {
    return null;
  }

  const previousStatus = booking.status;
  booking.status = status;
  booking.updatedAt = new Date().toISOString();

  // Auto-generate invoice reference when moving to INVOICED
  if (status === "INVOICED" && !booking.invoiceRef) {
    booking.invoiceRef = `INV-${Date.now()}`;
  }

  // V6.3 dual-write: memory-first, DB optional
  // Attempt database persistence after memory write succeeds
  try {
    if (isDbPersistenceEnabled()) {
      // Convert memory booking to database format and save
      const dbRecord = {
        id: booking.id,
        guestName: booking.guestName,
        email: booking.email,
        phone: booking.phone,
        roomType: booking.roomType,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        status: booking.status,
        notes: booking.notes,
        invoiceRef: booking.invoiceRef,
        paymentId: booking.paymentId,
        paymentStatus: booking.paymentStatus,
        paymentRecord: booking.paymentRecord,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt,
      };
      await saveBooking(dbRecord);
    }
  } catch (error) {
    // V6.3: DB write failure - log but never break execution
    logError("DB_DUAL_WRITE_FAILED", "Failed to persist booking status update to database", {
      bookingId: id,
      operation: "updateBookingStatus",
      previousStatus,
      newStatus: status,
      error: error instanceof Error ? error.message : String(error),
    });
    // Memory remains source of truth - continue execution
  }

  // V4.4 logging: Track status transitions for CRM audit trail and operations
  logInfo("CRM_STATUS_TRANSITION", `Booking status changed: ${previousStatus} → ${status}`, {
    bookingId: id,
    previousStatus,
    newStatus: status,
    guestName: booking.guestName,
    invoiceRef: booking.invoiceRef
  });

  // Dispatch email notifications (non-blocking, V4.4 async guard)
  // Prevents silent email failures and app hangs during status transitions
  safeAsync(
    () => Promise.all([
      dispatchBookingStatusUpdateEmail(booking),
      ...(status === "INVOICED" ? [dispatchInvoiceIssuedEmail(booking)] : [])
    ]).then(() => undefined),
    "BOOKING_STATUS_UPDATE_EMAILS"
  );

  return booking;
}

export async function updateBookingNotes(id: string, notes: string): Promise<Booking | null> {
  const booking = await getBooking(id);
  if (!booking) return null;

  booking.notes = notes;
  booking.updatedAt = new Date().toISOString();

  // V6.3 dual-write: memory-first, DB optional
  // Attempt database persistence after memory write succeeds
  try {
    if (isDbPersistenceEnabled()) {
      // Convert memory booking to database format and save
      const dbRecord = {
        id: booking.id,
        guestName: booking.guestName,
        email: booking.email,
        phone: booking.phone,
        roomType: booking.roomType,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        status: booking.status,
        notes: booking.notes,
        invoiceRef: booking.invoiceRef,
        paymentId: booking.paymentId,
        paymentStatus: booking.paymentStatus,
        paymentRecord: booking.paymentRecord,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt,
      };
      await saveBooking(dbRecord);
    }
  } catch (error) {
    // V6.3: DB write failure - log but never break execution
    logError("DB_DUAL_WRITE_FAILED", "Failed to persist booking notes update to database", {
      bookingId: id,
      operation: "updateBookingNotes",
      error: error instanceof Error ? error.message : String(error),
    });
    // Memory remains source of truth - continue execution
  }

  return booking;
}

// V5.2.1 Payment Integration - Safe payment reference storage
// Stores payment ID and record without changing booking lifecycle
export async function updateBookingPayment(id: string, paymentId: string, paymentRecord: any): Promise<Booking | null> {
  try {
    const booking = await getBooking(id);
    if (!booking) return null;

    // Safe update: only store payment references, never change status automatically
    booking.paymentId = paymentId;
    booking.paymentRecord = paymentRecord;
    booking.updatedAt = new Date().toISOString();

    // V6.3 dual-write: memory-first, DB optional
    // Attempt database persistence after memory write succeeds
    try {
      if (isDbPersistenceEnabled()) {
        // Convert memory booking to database format and save
        const dbRecord = {
          id: booking.id,
          guestName: booking.guestName,
          email: booking.email,
          phone: booking.phone,
          roomType: booking.roomType,
          checkIn: booking.checkIn,
          checkOut: booking.checkOut,
          status: booking.status,
          notes: booking.notes,
          invoiceRef: booking.invoiceRef,
          paymentId: booking.paymentId,
          paymentStatus: booking.paymentStatus,
          paymentRecord: booking.paymentRecord,
          createdAt: booking.createdAt,
          updatedAt: booking.updatedAt,
        };
        await saveBooking(dbRecord);
      }
    } catch (error) {
      // V6.3: DB write failure - log but never break execution
      logError("DB_DUAL_WRITE_FAILED", "Failed to persist payment update to database", {
        bookingId: id,
        paymentId,
        operation: "updateBookingPayment",
        error: error instanceof Error ? error.message : String(error),
      });
      // Memory remains source of truth - continue execution
    }

    // V5.2.1 logging: Track payment link generation for audit trail
    logInfo("CRM_PAYMENT_LINK_STORED", `Payment reference stored for booking: ${id}`, {
      bookingId: id,
      paymentId,
      status: paymentRecord?.status,
      amount: paymentRecord?.amountCents,
    });

    return booking;
  } catch (error) {
    // Safe failure: Log but don't crash booking flow
    logError("CRM_PAYMENT_UPDATE_FAILED", "Failed to store payment reference", {
      bookingId: id,
      paymentId,
      error: error instanceof Error ? error.message : String(error),
    });
    return null;
  }
}

// Analytics helpers for dashboard
export function getBookingsByStatus(status: BookingStatus): Booking[] {
  return bookings.filter(b => b.status === status);
}

export function getRecentBookings(limit: number = 10): Booking[] {
  return bookings.slice(0, limit);
}
