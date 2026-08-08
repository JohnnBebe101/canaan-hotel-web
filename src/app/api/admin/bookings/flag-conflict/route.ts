import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { verifyAdminAuth } from "@/lib/admin-auth";
import { stripe } from "@/lib/stripe";
import { sendEmail } from "@/lib/email/resend";
import { emailConflictRefund } from "@/lib/email/templates";

export async function POST(request: NextRequest) {
  const authError = verifyAdminAuth(request);
  if (!authError) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { bookingId, reason } = body;

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

    let refundStatus: string | null = null;

    if (booking.stripe_payment_intent && booking.payment_status === "paid") {
      try {
        const refund = await stripe.refunds.create({
          payment_intent: booking.stripe_payment_intent,
          reason: "duplicate",
        });

        if (refund.status === "succeeded") {
          refundStatus = "succeeded";
        } else {
          console.log("[flag-conflict] Refund in progress:", refund.status);
          refundStatus = refund.status;
        }
      } catch (refundError) {
        console.error("[flag-conflict] Refund failed:", refundError);
      }
    }

    const status = refundStatus === "succeeded" ? "conflict_flagged" : "cancelled";
    const payment_status = refundStatus === "succeeded" ? "refunded" : booking.payment_status;

    const { error: updateError } = await supabaseAdmin
      .from("bookings")
      .update({
        status,
        payment_status,
        notes: reason ? `${booking.notes || ""}\n\nConflict flagged: ${reason}`.trim() : booking.notes,
        updated_at: new Date().toISOString(),
      })
      .eq("id", bookingId);

    if (updateError) {
      console.error("[flag-conflict] Failed to update booking:", updateError);
      return NextResponse.json({ error: "Failed to flag conflict" }, { status: 500 });
    }

    if (booking.email && refundStatus === "succeeded") {
      await sendEmail({
        to: booking.email,
        subject: `Booking Update — ${booking.booking_reference || bookingId}`,
        html: emailConflictRefund(booking as any),
      });
    }

    console.log("[flag-conflict] Booking flagged:", booking.booking_reference, "| refund:", refundStatus);

    return NextResponse.json({
      success: true,
      bookingId,
      status,
      payment_status,
      refund_status: refundStatus,
    });
  } catch (error) {
    console.error("[flag-conflict] Error:", error);
    return NextResponse.json({ error: "Failed to flag conflict" }, { status: 500 });
  }
}