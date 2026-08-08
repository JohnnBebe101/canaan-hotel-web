import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getSupabaseAdmin } from '@/lib/supabase-admin';
import { FEATURED_ROOMS } from '@/lib/featuredRooms';
import { checkRoomAvailability } from '@/lib/availability';
import {
  DEFAULT_PAYMENT_STATUS,
  DEFAULT_BOOKING_STATUS,
  DEFAULT_BOOKING_VERSION,
  DEFAULT_BOOKING_ORIGIN,
  HOLD_WINDOW_MINUTES,
  generateBookingReference,
  BookingStatus,
  BookingVersion,
  PaymentStatus,
} from '@/lib/types/booking';

const ROOM_PRICES: Record<string, number> = {
  'standard': 25,
  'delux': 32,
  'king': 40,
  'twin': 45,
  'semi-suit': 50,
  'suit': 55,
};

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidRoomType(roomType: string): boolean {
  return Object.keys(ROOM_PRICES).includes(roomType);
}

function calculateNights(checkIn: string, checkOut: string): number {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
}

async function insertBookingWithReference(payload: Record<string, unknown>) {
  const MAX_RETRIES = 3;
  const supabaseAdmin = getSupabaseAdmin();

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    const ref = generateBookingReference();
    const { data, error } = await supabaseAdmin
      .from('bookings')
      .insert({ ...payload, booking_reference: ref })
      .select()
      .single();

    if (!error) return { data, error: null };

    if (error.code !== '23505') {
      return { data: null, error };
    }

    console.warn(`[bookings/create] Reference collision on attempt ${attempt + 1}, retrying...`);
  }

  return { data: null, error: new Error('Failed to generate unique booking reference after 3 attempts') };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      guest_name,
      email,
      phone,
      check_in_date,
      check_out_date,
      number_of_guests,
      room_type,
      notes,
    } = body;

    if (!guest_name || !email || !check_in_date || !check_out_date || !room_type) {
      return NextResponse.json(
        { error: 'Missing required fields: guest_name, email, check_in_date, check_out_date, room_type' },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const nights = calculateNights(check_in_date, check_out_date);
    if (nights <= 0) {
      return NextResponse.json(
        { error: 'check_out_date must be after check_in_date' },
        { status: 400 }
      );
    }

    if (!isValidRoomType(room_type)) {
      return NextResponse.json(
        { error: `Invalid room_type. Must be one of: ${Object.keys(ROOM_PRICES).join(', ')}` },
        { status: 400 }
      );
    }

    const isAvailable = await checkRoomAvailability(room_type, {
      checkIn: check_in_date,
      checkOut: check_out_date,
    });

    if (!isAvailable) {
      return NextResponse.json(
        { error: 'Room not available for selected dates' },
        { status: 409 }
      );
    }

    const guests = number_of_guests || 1;
    if (guests < 1) {
      return NextResponse.json(
        { error: 'number_of_guests must be at least 1' },
        { status: 400 }
      );
    }

    const pricePerNight = ROOM_PRICES[room_type];
    const total_price_cents = pricePerNight * nights * 100;

    if (total_price_cents <= 0) {
      return NextResponse.json(
        { error: 'Invalid booking amount' },
        { status: 400 }
      );
    }

    const hold_expires_at = new Date(Date.now() + HOLD_WINDOW_MINUTES * 60 * 1000).toISOString();

    const bookingData = {
      guest_name: guest_name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || null,
      check_in_date,
      check_out_date,
      number_of_guests: guests,
      room_type,
      notes: notes?.trim() || null,
      total_price: pricePerNight * nights,
      total_price_cents,
      status: 'held' as BookingStatus,
      hold_expires_at,
      booking_origin: DEFAULT_BOOKING_ORIGIN,
      booking_version: DEFAULT_BOOKING_VERSION as BookingVersion,
      payment_status: 'unpaid' as PaymentStatus,
      stripe_webhook_event_id: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await insertBookingWithReference(bookingData);

    if (error) {
      console.error('[bookings/create] Database error:', error);
      return NextResponse.json(
        { error: 'Booking creation failed' },
        { status: 500 }
      );
    }

    console.log(
      `[bookings/create] New booking created: ${data.id}, ${room_type}, $${pricePerNight} x ${nights} nights = ${total_price_cents} cents`
    );

    return NextResponse.json(
      {
        bookingId: data.id,
        booking_reference: data.booking_reference,
        total_price_cents,
        currency: 'USD',
        hold_expires_at: data.hold_expires_at,
        message: 'Booking created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[bookings/create] Error:', error);
    return NextResponse.json(
      { error: 'Booking creation failed' },
      { status: 500 }
    );
  }
}