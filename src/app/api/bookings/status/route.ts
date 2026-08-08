import { NextRequest, NextResponse } from 'next/server';
import { getBookingById, getBookingByReference } from '@/lib/booking-store';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const ref = searchParams.get('ref');
    const bookingId = searchParams.get('bookingId');

    if (!ref && !bookingId) {
      return NextResponse.json(
        { error: 'Either ref or bookingId is required' },
        { status: 400 }
      );
    }

    let booking;
    if (ref) {
      booking = await getBookingByReference(ref);
    } else if (bookingId) {
      booking = await getBookingById(bookingId);
    }

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: booking.status,
      payment_status: booking.payment_status,
      booking_reference: booking.booking_reference,
      guest_name: booking.guest_name,
    });
  } catch (error) {
    console.error('[bookings/status] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch booking status' },
      { status: 500 }
    );
  }
}