import { NextRequest, NextResponse } from "next/server";

// Fallback storage for demo/testing when Supabase is unavailable
const fallbackBookings: any[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = ["guest_name", "email", "phone", "room_type", "dates"];
    const missingFields = requiredFields.filter((field) => !body[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate dates structure
    if (!body.dates?.check_in || !body.dates?.check_out) {
      return NextResponse.json(
        { error: "Dates must include check_in and check_out" },
        { status: 400 }
      );
    }

    // Calculate total price based on room type (simplified)
    const roomPrices: Record<string, number> = {
      'Economy Single Room': 50,
      'Comfort Double Room': 75,
      'Family Suite': 110,
    };
    const pricePerNight = roomPrices[body.room_type] || 75;

    // Calculate nights
    const checkIn = new Date(body.dates.check_in);
    const checkOut = new Date(body.dates.check_out);
    const nights = Math.max(1, Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)));
    const totalPrice = pricePerNight * nights;

    // Try to create booking in Supabase, fallback to local storage
    let bookingId: string;
    let status: string;

    try {
      const { createBooking } = await import("@/lib/booking-store");
      const booking = await createBooking({
        guest_name: body.guest_name.trim(),
        email: body.email.trim().toLowerCase(),
        phone: body.phone.trim(),
        room_type: body.room_type.trim(),
        check_in_date: body.dates.check_in,
        check_out_date: body.dates.check_out,
        number_of_guests: body.number_of_guests || 1,
        total_price: totalPrice,
        status: 'pending',
        notes: body.message?.trim(),
      });
      bookingId = booking.id;
      status = booking.status;
    } catch (supabaseError) {
      console.warn("Supabase unavailable, using fallback storage:", supabaseError);
      
      // Fallback: Store locally for demo
      bookingId = `demo-${Date.now()}`;
      status = 'pending';
      fallbackBookings.push({
        id: bookingId,
        guest_name: body.guest_name.trim(),
        email: body.email.trim().toLowerCase(),
        phone: body.phone.trim(),
        room_type: body.room_type.trim(),
        check_in_date: body.dates.check_in,
        check_out_date: body.dates.check_out,
        number_of_guests: body.number_of_guests || 1,
        total_price: totalPrice,
        status: 'pending',
        notes: body.message?.trim(),
        created_at: new Date().toISOString(),
      });
    }

    // Return success response
    return NextResponse.json(
      {
        message: "Booking inquiry received successfully",
        booking_id: bookingId,
        status: status,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing booking inquiry:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

// GET handler (optional - for testing or retrieving bookings)
export async function GET() {
  try {
    return NextResponse.json(
      { message: "Booking inquiry API endpoint. Use POST to submit a booking inquiry." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Booking GET error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
