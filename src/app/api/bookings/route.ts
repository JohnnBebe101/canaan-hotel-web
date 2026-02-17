import { NextRequest, NextResponse } from "next/server";
import { createBooking, getBookings } from "@/lib/booking-store";

// POST - Create a new booking inquiry
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = ["guest_name", "email", "phone", "room_type", "dates"];
    const missingFields = requiredFields.filter((field) => !body[field]);

    if (missingFields.length > 0) {
      const errorMsg = `Missing required fields: ${missingFields.join(", ")}`;
      return NextResponse.json(
        { error: errorMsg, message: errorMsg },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      const errorMsg = "Invalid email format";
      return NextResponse.json(
        { error: errorMsg, message: errorMsg },
        { status: 400 }
      );
    }

    // Validate dates
    if (!body.dates?.check_in || !body.dates?.check_out) {
      const errorMsg = "Dates must include check_in and check_out";
      return NextResponse.json(
        { error: errorMsg, message: errorMsg },
        { status: 400 }
      );
    }

    // Calculate price (simplified)
    const roomPrices: Record<string, number> = {
      'Standard Room': 45,
      'Deluxe Room': 75,
      'Family Room': 95,
      'Luxury Suite': 120,
      'Economy Single Room': 50,
      'Comfort Double Room': 75,
      'Family Suite': 110,
    };
    const pricePerNight = roomPrices[body.room_type] || 75;

    const checkIn = new Date(body.dates.check_in);
    const checkOut = new Date(body.dates.check_out);
    const nights = Math.max(1, Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)));
    const totalPrice = pricePerNight * nights;

    // Create booking using BookingStore
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

    return NextResponse.json(
      {
        message: "Booking inquiry received successfully",
        booking_id: booking.id,
        status: booking.status,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing booking inquiry:", error);
    const errorMsg = "Internal server error";
    return NextResponse.json(
      { error: errorMsg, message: errorMsg },
      { status: 500 }
    );
  }
}

// GET - List all bookings
export async function GET() {
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
