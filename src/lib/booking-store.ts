import { Booking, BookingStatus } from "./models";
import { safeAsync } from "./asyncGuards";
import { logInfo, logError } from "./logger";
import {
  dispatchBookingReceivedEmail,
  dispatchBookingStatusUpdateEmail,
  dispatchInvoiceIssuedEmail,
  dispatchHotelAlertEmail,
} from "./email/emailDispatcher";

// CRM Core: Operational booking management
// Future: Replace with database, but this gives full workflow control
let bookings: Booking[] = [];

export function getBookings(): Booking[] {
  return bookings;
}

export function getBooking(id: string): Booking | undefined {
  return bookings.find((b) => b.id === id);
}

export function createBooking(data: Omit<Booking, "id" | "status" | "createdAt" | "updatedAt">): Booking {
  const booking: Booking = {
    ...data,
    id: crypto.randomUUID(),
    status: "NEW",  // All bookings start as NEW
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  bookings.unshift(booking); // New bookings at top

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

export function updateBookingStatus(id: string, status: BookingStatus): Booking | null {
  const booking = getBooking(id);
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

export function updateBookingNotes(id: string, notes: string): Booking | null {
  const booking = getBooking(id);
  if (!booking) return null;

  booking.notes = notes;
  booking.updatedAt = new Date().toISOString();
  return booking;
}

// V5.2.1 Payment Integration - Safe payment reference storage
// Stores payment ID and record without changing booking lifecycle
export function updateBookingPayment(id: string, paymentId: string, paymentRecord: any): Booking | null {
  try {
    const booking = getBooking(id);
    if (!booking) return null;

    // Safe update: only store payment references, never change status automatically
    booking.paymentId = paymentId;
    booking.paymentRecord = paymentRecord;
    booking.updatedAt = new Date().toISOString();

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
