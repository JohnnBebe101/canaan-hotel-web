import { NextRequest, NextResponse } from "next/server";

// Booking inquiry data structure based on CMS_SCHEMA.md
interface BookingInquiry {
  guest_name: string;
  email: string;
  phone: string;
  room_type: string;
  dates: {
    check_in: string;
    check_out: string;
  };
  message?: string;
  status?: string;
}

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

    // Construct booking inquiry object
    const bookingInquiry: BookingInquiry = {
      guest_name: body.guest_name.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone.trim(),
      room_type: body.room_type.trim(),
      dates: {
        check_in: body.dates.check_in,
        check_out: body.dates.check_out,
      },
      message: body.message?.trim() || "",
      status: "pending", // Default status
    };

    // TODO: Store booking inquiry in database/JSON file
    // This is where the booking data would be saved for admin dashboard access
    // Example: await saveBookingInquiry(bookingInquiry);

    // Return success response
    return NextResponse.json(
      {
        message: "Booking inquiry received successfully",
        booking_id: `temp_${Date.now()}`, // Temporary ID until DB is implemented
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

