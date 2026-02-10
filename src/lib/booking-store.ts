import { getSupabase } from './supabase';

// ============================================
// BOOKING STORE (Supabase)
// ============================================

export interface Booking {
  id: string;
  guest_name: string;
  email: string;
  phone?: string;
  check_in_date: string;
  check_out_date: string;
  number_of_guests: number;
  room_type: string;
  total_price: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  notes?: string;
  payment_id?: string;
  payment_status?: string;
  payment_record?: any;
  created_at: string;
}

export async function getBookings(): Promise<Booking[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[BookingStore] Error fetching bookings:', error);
    throw new Error('Failed to fetch bookings');
  }

  return data || [];
}

export async function getBookingById(id: string): Promise<Booking | null> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    console.error('[BookingStore] Error fetching booking:', error);
    throw new Error('Failed to fetch booking');
  }

  return data;
}

export async function createBooking(booking: Omit<Booking, 'id' | 'created_at'>): Promise<Booking> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('bookings')
    .insert(booking)
    .select()
    .single();

  if (error) {
    console.error('[BookingStore] Error creating booking:', error);
    throw new Error('Failed to create booking');
  }

  return data;
}

export async function updateBooking(id: string, updates: Partial<Booking>): Promise<Booking | null> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('bookings')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('[BookingStore] Error updating booking:', error);
    throw new Error('Failed to update booking');
  }

  return data;
}
