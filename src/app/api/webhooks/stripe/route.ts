import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { supabase } from '@/lib/supabase';
import { isValidPaymentStatus } from '@/lib/types/booking';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  typescript: true,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get('stripe-signature');

    if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
      console.log('[Stripe Webhook] Missing signature or webhook secret');
      return NextResponse.json(
        { error: 'Missing signature or webhook secret' },
        { status: 400 }
      );
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error('[Stripe Webhook] Signature verification failed:', err);
      return NextResponse.json(
        { error: 'Webhook signature verification failed' },
        { status: 400 }
      );
    }

    console.log(`[Stripe Webhook] Received event: ${event.type}`);

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const bookingId = session.metadata?.bookingId;

        if (!bookingId) {
          console.error('[Stripe Webhook] Missing bookingId in metadata');
          return NextResponse.json(
            { error: 'Invalid metadata' },
            { status: 400 }
          );
        }

        const { data: existingEvent } = await (supabase as any)
          .from('bookings')
          .select('stripe_webhook_event_id')
          .eq('stripe_webhook_event_id', event.id)
          .single();

        if (existingEvent?.stripe_webhook_event_id) {
          console.log('[Stripe Webhook] Duplicate event, skipping:', event.id);
          return NextResponse.json({ received: true });
        }

        const { data: booking } = await (supabase as any)
          .from('bookings')
          .select('*, payment_status')
          .eq('id', bookingId)
          .single();

        if (!booking) {
          console.error('[Stripe Webhook] Booking not found:', bookingId);
          return NextResponse.json(
            { error: 'Booking not found' },
            { status: 404 }
          );
        }

        const amountInCents = (session.amount_total || 0);
        const expectedAmountInCents = (booking.total_price || 0) * 100;

        if (amountInCents !== expectedAmountInCents) {
          console.error('[Stripe Webhook] Amount mismatch:', {
            stripe: amountInCents,
            expected: expectedAmountInCents,
          });
          return NextResponse.json(
            { error: 'Amount mismatch' },
            { status: 400 }
          );
        }

        const { error: updateError } = await (supabase as any)
          .from('bookings')
          .update({
            payment_status: 'paid',
            status: 'confirmed',
            stripe_webhook_event_id: event.id,
            updated_at: new Date().toISOString(),
          })
          .eq('id', bookingId);

        if (updateError) {
          console.error('[Stripe Webhook] Failed to update booking:', updateError);
          return NextResponse.json(
            { error: 'Database error' },
            { status: 500 }
          );
        }

        console.log('[Stripe Webhook] Booking confirmed:', bookingId);
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const bookingId = paymentIntent.metadata?.bookingId;

        if (!bookingId) {
          console.error('[Stripe Webhook] Missing bookingId in payment_intent metadata');
          return NextResponse.json(
            { error: 'Invalid metadata' },
            { status: 400 }
          );
        }

        const { error: updateError } = await (supabase as any)
          .from('bookings')
          .update({
            payment_status: 'failed',
            stripe_webhook_event_id: event.id,
            updated_at: new Date().toISOString(),
          })
          .eq('id', bookingId);

        if (updateError) {
          console.error('[Stripe Webhook] Failed to update booking on payment failure:', updateError);
          return NextResponse.json(
            { error: 'Database error' },
            { status: 500 }
          );
        }

        console.log('[Stripe Webhook] Payment failed for booking:', bookingId, {
          reason: paymentIntent.last_payment_error?.message,
        });
        break;
      }

      default:
        console.log('[Stripe Webhook] Unhandled event type:', event.type);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('[Stripe Webhook] Error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'Stripe webhook endpoint active',
    message: 'POST to receive Stripe events',
  });
}