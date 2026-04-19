import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { verifyAdminAuth } from "@/lib/admin-auth";
import { checkRoomAvailability } from "@/lib/availability";
import { generateBookingReference, DEFAULT_BOOKING_VERSION } from "@/lib/types/booking";
import { sendEmail } from "@/lib/email/resend";
import { emailLocalBookingConfirmed } from "@/lib/email/templates";

const ROOM_PRICES: Record<string, number> = {
  'economy-single': 45,
  'economy-double': 75,
  'family-room': 95,
  'comfort-double': 120,
};

function calculateNights(checkIn: string, checkOut: string): number {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
}

export async function POST(request: NextRequest) {
  const authError = verifyAdminAuth(request);
  if (!authError) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    const {
      guest_name,
      email,
      phone,
      check_in_date,
      check_out_date,
      number_of_guests,
      room_type,
      total_price_cents,
      notes,
      payment_received_locally,
    } = body;

    if (!guest_name || !check_in_date || !check_out_date || !room_type) {
      return NextResponse.json(
        { error: "Missing required fields: guest_name, check_in_date, check_out_date, room_type" },
        { status: 400 }
      );
    }

    if (!ROOM_PRICES[room_type]) {
      return NextResponse.json(
        { error: `Invalid room_type. Must be one of: ${Object.keys(ROOM_PRICES).join(', ')}` },
        { status: 400 }
      );
    }

    const nights = calculateNights(check_in_date, check_out_date);
    if (nights <= 0) {
      return NextResponse.json(
        { error: "check_out_date must be after check_in_date" },
        { status: 400 }
      );
    }

    const isAvailable = await checkRoomAvailability(room_type, {
      checkIn: check_in_date,
      checkOut: check_out_date,
    });

    if (!isAvailable) {
      return NextResponse.json(
        { error: "Room not available for selected dates" },
        { status: 409 }
      );
    }

    const supabaseAdmin = getSupabaseAdmin();
    const booking_reference = generateBookingReference();
    const guests = number_of_guests || 1;
    const pricePerNight = ROOM_PRICES[room_type];
    const totalPrice = total_price_cents ? total_price_cents / 100 : pricePerNight * nights;
    const confirmed_at = new Date().toISOString();

    const bookingData = {
      guest_name: guest_name.trim(),
      email: email?.trim().toLowerCase() || null,
      phone: phone?.trim() || null,
      check_in_date,
      check_out_date,
      number_of_guests: guests,
      room_type,
      notes: notes?.trim() || null,
      total_price: totalPrice,
      total_price_cents: total_price_cents || pricePerNight * nights * 100,
      booking_reference,
      booking_origin: "local",
      status: "confirmed",
      payment_status: payment_received_locally ? "paid" : "unpaid",
      confirmation_mode: "local",
      confirmed_at,
      booking_version: DEFAULT_BOOKING_VERSION,
      created_at: confirmed_at,
      updated_at: confirmed_at,
    };

    const { data, error } = await supabaseAdmin
      .from("bookings")
      .insert(bookingData)
      .select()
      .single();

    if (error) {
      console.error("[local-booking] Database error:", error);
      return NextResponse.json({ error: "Booking creation failed" }, { status: 500 });
    }

    if (email) {
      await sendEmail({
        to: email,
        subject: `Booking Confirmed — ${booking_reference}`,
        html: emailLocalBookingConfirmed(data as any),
      });
    }

    console.log(`[local-booking] Created: ${booking_reference}, ${room_type}, $${totalPrice}`);

    return NextResponse.json(
      {
        bookingId: data.id,
        booking_reference,
        total_price_cents: data.total_price_cents,
        currency: "USD",
        status: "confirmed",
        message: "Local booking created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[local-booking] Error:", error);
    return NextResponse.json({ error: "Booking creation failed" }, { status: 500 });
  }
}