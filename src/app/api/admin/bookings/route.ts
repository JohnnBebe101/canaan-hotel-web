import { NextRequest, NextResponse } from "next/server";

// Fallback storage (mirrors the one in /api/bookings)
const fallbackBookings: any[] = [];

// CRM Workflow API - Admin Protected
// Handles operational booking management (status changes, notes, etc.)

// GET /api/admin/bookings - List all bookings for CRM dashboard
export async function GET() {
  try {
    let bookings: any[] = [];
    
    try {
      const { getBookings } = await import("@/lib/booking-store");
      bookings = await getBookings();
    } catch (supabaseError) {
      console.warn("Supabase unavailable, using fallback storage");
      bookings = fallbackBookings;
    }
    
    return NextResponse.json(bookings);
  } catch (error) {
    console.error("API_BOOKINGS_GET: Failed to fetch bookings:", error);
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
      const validStatuses = ['pending', 'confirmed', 'cancelled'];
      if (!validStatuses.includes(body.status)) {
        return NextResponse.json(
          { error: "Invalid status. Must be: pending, confirmed, or cancelled" },
          { status: 400 }
        );
      }

      try {
        const { updateBooking } = await import("@/lib/booking-store");
        const updated = await updateBooking(body.id, { status: body.status });
        if (!updated) {
          return NextResponse.json(
            { error: "Booking not found" },
            { status: 404 }
          );
        }
        return NextResponse.json(updated);
      } catch {
        // Fallback: update in local storage
        const index = fallbackBookings.findIndex(b => b.id === body.id);
        if (index === -1) {
          return NextResponse.json({ error: "Booking not found" }, { status: 404 });
        }
        fallbackBookings[index].status = body.status;
        return NextResponse.json(fallbackBookings[index]);
      }
    }

    // Handle notes updates
    if (body.notes !== undefined) {
      try {
        const { updateBooking } = await import("@/lib/booking-store");
        const updated = await updateBooking(body.id, { notes: body.notes });
        if (!updated) {
          return NextResponse.json(
            { error: "Booking not found" },
            { status: 404 }
          );
        }
        return NextResponse.json(updated);
      } catch {
        // Fallback: update in local storage
        const index = fallbackBookings.findIndex(b => b.id === body.id);
        if (index === -1) {
          return NextResponse.json({ error: "Booking not found" }, { status: 404 });
        }
        fallbackBookings[index].notes = body.notes;
        return NextResponse.json(fallbackBookings[index]);
      }
    }

    return NextResponse.json(
      { error: "Invalid request: specify status or notes to update" },
      { status: 400 }
    );
  } catch (error) {
    console.error("API_BOOKINGS_PATCH: Failed to update booking:", error);
    return NextResponse.json(
      { error: "Failed to update booking" },
      { status: 500 }
    );
  }
}
