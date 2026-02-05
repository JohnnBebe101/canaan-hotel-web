import { NextRequest, NextResponse } from "next/server";
import { getBookings, updateBookingStatus, updateBookingNotes, updateBookingPayment } from "@/lib/booking-store";
import { updatePaymentStatus } from "@/lib/payments/payment-store";
import { logError } from "@/lib/logger";

// CRM Workflow API - Admin Protected
// Handles operational booking management (status changes, notes, etc.)

// GET /api/admin/bookings - List all bookings for CRM dashboard
export async function GET() {
  try {
    const bookings = await getBookings();
    return NextResponse.json(bookings);
  } catch (error) {
    // V4.4 logging: Track API failures for operational monitoring
    // Helps diagnose CRM data access issues and service reliability
    logError("API_BOOKINGS_GET", "Failed to fetch bookings", {
      error: error instanceof Error ? error.message : String(error),
      endpoint: "/api/admin/bookings",
      method: "GET"
    });
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/bookings - Update booking status or notes
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.id) {
      return NextResponse.json(
        { error: "Booking ID is required" },
        { status: 400 }
      );
    }

    // V5.2.2 Handle combined status and payment updates (manual payment confirmation)
    if (body.status && body.paymentStatus) {
      try {
        // Update booking status to CONFIRMED
        const bookingUpdated = await updateBookingStatus(body.id, body.status);
        if (!bookingUpdated) {
          return NextResponse.json(
            { error: "Booking not found or status update not allowed" },
            { status: 404 }
          );
        }

        // Update payment status to PAID (if payment record exists)
        if (bookingUpdated.paymentId) {
          const paymentUpdated = updatePaymentStatus(bookingUpdated.paymentId, body.paymentStatus);
          // Note: Payment store update is optional - don't fail if payment record not found
        }

        return NextResponse.json(bookingUpdated);
      } catch (error) {
        // V5.2.2 logging: Track payment confirmation failures
        logError("API_BOOKINGS_MANUAL_PAYMENT", "Failed to confirm manual payment", {
          bookingId: body.id,
          targetStatus: body.status,
          paymentStatus: body.paymentStatus,
          error: error instanceof Error ? error.message : String(error),
        });
        return NextResponse.json(
          { error: "Failed to confirm payment" },
          { status: 500 }
        );
      }
    }

    // Handle status updates
    if (body.status) {
      const updated = await updateBookingStatus(body.id, body.status);
      if (!updated) {
        return NextResponse.json(
          { error: "Booking not found or status update not allowed" },
          { status: 404 }
        );
      }
      return NextResponse.json(updated);
    }

    // Handle notes updates
    if (body.notes !== undefined) {
      const updated = await updateBookingNotes(body.id, body.notes);
      if (!updated) {
        return NextResponse.json(
          { error: "Booking not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(updated);
    }

    // V5.2.1 Handle payment updates (safe reference storage)
    if (body.paymentId && body.paymentRecord) {
      const updated = await updateBookingPayment(body.id, body.paymentId, body.paymentRecord);
      if (!updated) {
        return NextResponse.json(
          { error: "Booking not found or payment update failed" },
          { status: 404 }
        );
      }
      return NextResponse.json(updated);
    }

    return NextResponse.json(
      { error: "Invalid request: specify status, notes, or payment data to update" },
      { status: 400 }
    );
  } catch (error) {
    // V4.4 logging: Track booking update failures for audit trail
    // Helps identify CRM operational issues and data consistency problems
    logError("API_BOOKINGS_PATCH", "Failed to update booking", {
      error: error instanceof Error ? error.message : String(error),
      endpoint: "/api/admin/bookings",
      method: "PATCH"
    });
    return NextResponse.json(
      { error: "Failed to update booking" },
      { status: 500 }
    );
  }
}
