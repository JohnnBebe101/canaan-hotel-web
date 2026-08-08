import { NextRequest, NextResponse } from 'next/server';
import { stripe, isStripeConfigured } from '@/lib/stripe';
import { updateBooking } from '@/lib/booking-store';
import { getBookingById } from '@/lib/admin-booking-store';
import { SITE_URL } from '@/lib/site';

export async function POST(req: NextRequest) {
  try {
    if (!isStripeConfigured()) {
      return NextResponse.json(
        { error: 'Stripe is not configured' },
        { status: 503 }
      );
    }

    const body = await req.json();
    const { bookingId } = body;

    if (!bookingId) {
      return NextResponse.json(
        { error: 'Booking ID is required' },
        { status: 400 }
      );
    }

    const booking = await getBookingById(bookingId);

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    if (booking.payment_status === 'paid') {
      return NextResponse.json(
        { error: 'This booking has already been paid.' },
        { status: 409 }
      );
    }

    if (booking.payment_status === 'pending' && booking.stripe_payment_intent) {
      return NextResponse.json(
        { error: 'A payment session is already in progress for this booking. Please complete or wait for it to expire.' },
        { status: 409 }
      );
    }

    if ((booking as any).status === 'held' && (booking as any).hold_expires_at) {
      if (new Date((booking as any).hold_expires_at) < new Date()) {
        return NextResponse.json(
          { error: 'Your booking hold has expired. Please start a new booking.' },
          { status: 410 }
        );
      }
    }

    const amountInCents = booking.total_price_cents || (booking.total_price || 0) * 100;
    
    if (amountInCents <= 0) {
      return NextResponse.json(
        { error: 'Invalid booking amount' },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Room Booking - ${booking.room_type}`,
              description: `Guest: ${booking.guest_name}, Check-in: ${booking.check_in_date}, Check-out: ${booking.check_out_date}`,
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${SITE_URL}/booking/success?ref=${booking.booking_reference}&bookingId=${bookingId}`,
      cancel_url: `${SITE_URL}/booking/cancel?booking_id=${bookingId}`,
      metadata: {
        bookingId,
        bookingReference: booking.booking_reference || '',
        guestName: booking.guest_name,
        roomType: booking.room_type,
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: 'Failed to create checkout session' },
        { status: 500 }
      );
    }

    await updateBooking(bookingId, {
      payment_status: 'pending',
      stripe_payment_intent: session.id,
    } as any);

    return NextResponse.json({
      sessionUrl: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    console.error('[Checkout] Error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}