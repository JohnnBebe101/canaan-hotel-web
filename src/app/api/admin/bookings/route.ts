import { NextRequest, NextResponse } from "next/server";
import { getBookings, updateBookingStatus, updateBookingNotes } from "@/lib/booking-store";

// CRM Workflow API - Admin Protected
// Handles operational booking management (status changes, notes, etc.)

// GET /api/admin/bookings - List all bookings for CRM dashboard
export async function GET() {
  try {
    const bookings = getBookings();
    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
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

    // Handle status updates
    if (body.status) {
      const updated = updateBookingStatus(body.id, body.status);
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
      const updated = updateBookingNotes(body.id, body.notes);
      if (!updated) {
        return NextResponse.json(
          { error: "Booking not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(updated);
    }

    return NextResponse.json(
      { error: "Invalid request: specify status or notes to update" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error updating booking:", error);
    return NextResponse.json(
      { error: "Failed to update booking" },
      { status: 500 }
    );
  }
}
