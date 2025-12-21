import { NextRequest, NextResponse } from "next/server";
import { createBooking } from "@/lib/booking-store";

// POST handler for booking inquiries
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
    if (!body.dates.check_in || !body.dates.check_out) {
      return NextResponse.json(
        { error: "Dates must include check_in and check_out" },
        { status: 400 }
      );
    }

    // Create operational booking record for CRM
    const booking = createBooking({
      guestName: body.guest_name.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone.trim(),
      roomType: body.room_type.trim(),
      checkIn: body.dates.check_in,
      checkOut: body.dates.check_out,
      notes: body.message?.trim() || undefined,
    });

    // Return success response with booking details
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
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET handler (optional - for testing or retrieving bookings)
export async function GET() {
  return NextResponse.json(
    { message: "Booking inquiry API endpoint. Use POST to submit a booking inquiry." },
    { status: 200 }
  );
}

