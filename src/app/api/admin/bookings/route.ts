import { NextRequest, NextResponse } from "next/server";
export const dynamic = 'force-dynamic';
import { getBookings, updateBooking, deleteBooking } from "@/lib/admin-booking-store";
import { LEGACY_STATUS_VALUES, isValidLegacyStatus } from "@/lib/types/booking";
import { verifyAdminAuth } from "@/lib/admin-auth";

function adminAuthCheck(request: NextRequest) {
  if (!verifyAdminAuth(request)) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
  return null;
}

// GET - List all bookings
export async function GET(request: NextRequest) {
  const authError = adminAuthCheck(request);
  if (authError) return authError;

  try {
    const bookings = await getBookings();
    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}

// PATCH - Update booking status or notes
export async function PATCH(request: NextRequest) {
  const authError = adminAuthCheck(request);
  if (authError) return authError;

  try {
    const body = await request.json();

    if (!body.id) {
      return NextResponse.json(
        { error: "Booking ID is required" },
        { status: 400 }
      );
    }

    const updates: any = {};
    if (body.status) {
      // Use centralized type for validation (Phase 2)
      if (!isValidLegacyStatus(body.status)) {
        return NextResponse.json(
          { error: "Invalid status. Must be one of: " + LEGACY_STATUS_VALUES.join(", ") },
          { status: 400 }
        );
      }
      updates.status = body.status;
    }

    if (body.notes !== undefined) {
      updates.notes = body.notes;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: "No valid updates provided" },
        { status: 400 }
      );
    }

    const updated = await updateBooking(body.id, updates);
    if (!updated) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating booking:", error);
    return NextResponse.json(
      { error: "Failed to update booking" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a booking
export async function DELETE(request: NextRequest) {
  const authError = adminAuthCheck(request);
  if (authError) return authError;

  try {
    const body = await request.json();

    if (!body.id) {
      return NextResponse.json(
        { error: "Booking ID is required" },
        { status: 400 }
      );
    }

    const success = await deleteBooking(body.id);
    if (!success) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting booking:", error);
    return NextResponse.json(
      { error: "Failed to delete booking" },
      { status: 500 }
    );
  }
}
