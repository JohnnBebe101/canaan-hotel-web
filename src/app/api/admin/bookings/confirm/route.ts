import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { verifyAdminAuth } from "@/lib/admin-auth";
import { sendEmail } from "@/lib/email/resend";
import { emailBookingConfirmed } from "@/lib/email/templates";

export async function POST(request: NextRequest) {
  const isAuthed = verifyAdminAuth(request);
  if (!isAuthed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { bookingId, mode } = body;

    if (!bookingId) {
      return NextResponse.json({ error: "Booking ID is required" }, { status: 400 });
    }

    const supabaseAdmin = getSupabaseAdmin();

    const { data: booking, error: fetchError } = await supabaseAdmin
      .from("bookings")
      .select("*")
      .eq("id", bookingId)
      .single();

    if (fetchError || !booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    const confirmation_mode = mode === "auto" ? "auto" : "manual";
    const confirmed_at = new Date().toISOString();

    const { error: updateError } = await supabaseAdmin
      .from("bookings")
      .update({
        status: "confirmed",
        confirmation_mode,
        confirmed_at,
        updated_at: confirmed_at,
      })
      .eq("id", bookingId);

    if (updateError) {
      console.error("[confirm] Failed to update booking:", updateError);
      return NextResponse.json({ error: "Failed to confirm booking" }, { status: 500 });
    }

    if (booking.email) {
      await sendEmail({
        to: booking.email,
        subject: `Booking Confirmed — ${booking.booking_reference || bookingId}`,
        html: emailBookingConfirmed(booking as any),
      });
    }

    console.log("[confirm] Booking confirmed:", booking.booking_reference, "| mode:", confirmation_mode);

    return NextResponse.json({
      success: true,
      bookingId,
      status: "confirmed",
      confirmation_mode,
      confirmed_at,
    });
  } catch (error) {
    console.error("[confirm] Error:", error);
    return NextResponse.json({ error: "Failed to confirm booking" }, { status: 500 });
  }
}