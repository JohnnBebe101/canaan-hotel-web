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

// Analytics helpers for dashboard
export function getBookingsByStatus(status: BookingStatus): Booking[] {
  return bookings.filter(b => b.status === status);
}

export function getRecentBookings(limit: number = 10): Booking[] {
  return bookings.slice(0, limit);
}
