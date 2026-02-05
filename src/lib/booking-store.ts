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
import { saveBooking, getBookingById, getAllBookings, updateBooking } from "./persistence/dbAdapter";
import { readBookingById } from "./persistence/dbReader";
import { compareMemoryVsDB } from "./persistence/shadowCompare";

// CRM Core: Operational booking management
// REMOVED: In-memory bookings array, now using database persistence

export async function getBookings(): Promise<Booking[]> {
  if (!isDbPersistenceEnabled()) {
    logWarn("DB_DISABLED", "Database persistence is disabled, returning empty array for getBookings");
    return [];
  }
  try {
    const allBookings = await getAllBookings();
    return allBookings as Booking[];
  } catch (error) {
    logError("DB_FETCH_FAILED", "Failed to retrieve all bookings from database", { error });
    throw new Error("Failed to retrieve bookings");
  }
}

export async function getBooking(id: string): Promise<Booking | undefined> {
  // V6.5 Cutover: DB primary read with runtime guards
  if (isDbReadPrimaryEnabled()) {
    if (!isDbPersistenceEnabled()) {
      logWarn("DB_CUTOVER_GUARD", "DB_READ_PRIMARY_ENABLED=true but DB_PERSISTENCE_ENABLED=false, falling back to memory (now effectively empty)", {
        operation: "getBooking",
        bookingId: id,
      });
      return undefined; // No memory fallback data anymore
    } else {
      try {
        const dbBooking = await getBookingById(id);
        if (dbBooking) {
          logInfo("DB_CUTOVER_SUCCESS", "DB primary read succeeded", {
            operation: "getBooking",
            bookingId: id,
          });
          return dbBooking as Booking;
        }
        return undefined; // DB returned null
      } catch (error) {
        logError("DB_CUTOVER_FALLBACK", "DB read failed, no memory fallback", {
          operation: "getBooking",
          bookingId: id,
          error: error instanceof Error ? error.message : String(error),
        });
        return undefined; // DB read failed, no memory fallback
      }
    }
  }

  // Old memory fallback path (now effectively empty/unused if DB is primary)
  // In a full cutover, this block would be removed.
  return undefined;
}

export async function createBooking(data: Omit<Booking, "id" | "status" | "createdAt" | "updatedAt">): Promise<Booking> {
  if (!isDbPersistenceEnabled()) {
    logError("DB_DISABLED_CREATE", "Database persistence is disabled, cannot create booking.");
    throw new Error("Database not enabled for booking creation.");
  }

  const newBooking: Booking = {
    ...data,
    id: crypto.randomUUID(), // Will be overwritten by lowdb nanoid if passed to saveBooking
    status: "NEW", // All bookings start as NEW in the DB
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  try {
    await saveBooking(newBooking);
    logInfo("CRM_BOOKING_DB", `New booking created and persisted to DB: ${newBooking.id}`, {
      bookingId: newBooking.id,
      guestName: newBooking.guestName,
      roomType: newBooking.roomType,
      status: newBooking.status,
    });
  } catch (error) {
    logError("DB_CREATE_FAILED", "Failed to persist new booking to database", {
      bookingId: newBooking.id,
      operation: "createBooking",
      error: error instanceof Error ? error.message : String(error),
    });
    throw new Error("Failed to create booking in database.");
  }

  safeAsync(
    () => Promise.all([
      dispatchBookingReceivedEmail(newBooking),
      dispatchHotelAlertEmail(newBooking)
    ]).then(() => undefined),
    "BOOKING_CREATION_EMAILS"
  );

  return newBooking;
}

export async function updateBookingStatus(id: string, status: BookingStatus): Promise<Booking | null> {
  if (!isDbPersistenceEnabled()) {
    logWarn("DB_DISABLED_UPDATE_STATUS", "Database persistence is disabled, cannot update booking status.");
    return null;
  }

  const bookingToUpdate = await getBooking(id);
  if (!bookingToUpdate) return null;

  if (bookingToUpdate.status === "CLOSED") {
    return null;
  }

  const previousStatus = bookingToUpdate.status;
  bookingToUpdate.status = status;
  bookingToUpdate.updatedAt = new Date().toISOString();

  if (status === "INVOICED" && !bookingToUpdate.invoiceRef) {
    bookingToUpdate.invoiceRef = `INV-${Date.now()}`;
  }

  try {
    const updated = await updateBooking(id, bookingToUpdate);
    logInfo("CRM_STATUS_TRANSITION_DB", `Booking status changed and persisted to DB: ${previousStatus} → ${status}`, {
      bookingId: id,
      previousStatus,
      newStatus: status,
      guestName: bookingToUpdate.guestName,
      invoiceRef: bookingToUpdate.invoiceRef,
    });
    safeAsync(
      () => Promise.all([
        dispatchBookingStatusUpdateEmail(bookingToUpdate),
        ...(status === "INVOICED" ? [dispatchInvoiceIssuedEmail(bookingToUpdate)] : [])
      ]).then(() => undefined),
      "BOOKING_STATUS_UPDATE_EMAILS"
    );
    return updated as Booking;
  } catch (error) {
    logError("DB_UPDATE_STATUS_FAILED", "Failed to persist booking status update to database", {
      bookingId: id,
      operation: "updateBookingStatus",
      previousStatus,
      newStatus: status,
      error: error instanceof Error ? error.message : String(error),
    });
    throw new Error("Failed to update booking status in database.");
  }
}

export async function updateBookingNotes(id: string, notes: string): Promise<Booking | null> {
  if (!isDbPersistenceEnabled()) {
    logWarn("DB_DISABLED_UPDATE_NOTES", "Database persistence is disabled, cannot update booking notes.");
    return null;
  }

  const bookingToUpdate = await getBooking(id);
  if (!bookingToUpdate) return null;

  bookingToUpdate.notes = notes;
  bookingToUpdate.updatedAt = new Date().toISOString();

  try {
    const updated = await updateBooking(id, bookingToUpdate);
    logInfo("CRM_NOTES_UPDATE_DB", `Booking notes updated and persisted to DB for: ${id}`, {
      bookingId: id,
      guestName: bookingToUpdate.guestName,
    });
    return updated as Booking;
  } catch (error) {
    logError("DB_UPDATE_NOTES_FAILED", "Failed to persist booking notes update to database", {
      bookingId: id,
      operation: "updateBookingNotes",
      error: error instanceof Error ? error.message : String(error),
    });
    throw new Error("Failed to update booking notes in database.");
  }
}

export async function updateBookingPayment(id: string, paymentId: string, paymentRecord: any): Promise<Booking | null> {
  if (!isDbPersistenceEnabled()) {
    logWarn("DB_DISABLED_UPDATE_PAYMENT", "Database persistence is disabled, cannot update booking payment.");
    return null;
  }

  try {
    const bookingToUpdate = await getBooking(id);
    if (!bookingToUpdate) return null;

    bookingToUpdate.paymentId = paymentId;
    bookingToUpdate.paymentRecord = paymentRecord;
    bookingToUpdate.updatedAt = new Date().toISOString();

    const updated = await updateBooking(id, bookingToUpdate);
    logInfo("CRM_PAYMENT_LINK_STORED_DB", `Payment reference stored and persisted to DB for booking: ${id}`, {
      bookingId: id,
      paymentId,
      status: paymentRecord?.status,
      amount: paymentRecord?.amountCents,
    });
    return updated as Booking;
  } catch (error) {
    logError("CRM_PAYMENT_UPDATE_FAILED_DB", "Failed to store payment reference to database", {
      bookingId: id,
      paymentId,
      error: error instanceof Error ? error.message : String(error),
    });
    throw new Error("Failed to update booking payment in database.");
  }
}

// Analytics helpers for dashboard
export async function getBookingsByStatus(status: BookingStatus): Promise<Booking[]> {
  if (!isDbPersistenceEnabled()) {
    return [];
  }
  const allBookings = await getBookings();
  return allBookings.filter(b => b.status === status);
}

export async function getRecentBookings(limit: number = 10): Promise<Booking[]> {
  if (!isDbPersistenceEnabled()) {
    return [];
  }
  const allBookings = await getBookings();
  // Sort by createdAt timestamp in descending order for most recent
  return allBookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, limit);
}
