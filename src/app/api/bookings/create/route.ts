import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { FEATURED_ROOMS } from '@/lib/featuredRooms';
import { checkRoomAvailability } from '@/lib/availability';
import {
  DEFAULT_PAYMENT_STATUS,
  DEFAULT_BOOKING_STATUS,
  DEFAULT_BOOKING_VERSION,
} from '@/lib/types/booking';

const ROOM_PRICES: Record<string, number> = {
  'economy-single': 45,
  'economy-double': 75,
  'family-room': 95,
  'comfort-double': 120,
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
      status: 'pending',
      version: 'v2-hybrid-confirmation',
      stripe_webhook_event_id: null,
      created_at: new Date().toISOString(),
    };

    const { data, error } = await (supabase as any)
      .from('bookings')
      .insert(bookingData)
      .select()
      .single();

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
        total_price_cents,
        currency: 'USD',
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