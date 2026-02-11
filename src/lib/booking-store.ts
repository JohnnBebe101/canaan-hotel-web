import { getSupabase } from './supabase';
import { offlineStorage } from './offline-storage';

// ============================================
// BOOKING STORE (Supabase with Offline Fallback)
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
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.warn('[BookingStore] Using offline storage');
    return offlineStorage.getBookings();
  }
}

export async function getBookingById(id: string): Promise<Booking | null> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return data;
  } catch (error) {
    console.warn('[BookingStore] Using offline storage');
    return offlineStorage.getBooking(id);
  }
}

export async function createBooking(booking: Omit<Booking, 'id' | 'created_at'>): Promise<Booking> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('bookings')
      .insert(booking)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.warn('[BookingStore] Using offline storage');
    return offlineStorage.createBooking(booking);
  }
}

export async function updateBooking(id: string, updates: Partial<Booking>): Promise<Booking | null> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('bookings')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.warn('[BookingStore] Using offline storage');
    return offlineStorage.updateBooking(id, updates);
  }
}

export async function deleteBooking(id: string): Promise<boolean> {
  try {
    const supabase = getSupabase();
    const { error } = await supabase.from('bookings').delete().eq('id', id);
    if (error) throw error;
    return true;
  } catch (error) {
    console.warn('[BookingStore] Using offline storage');
    return offlineStorage.deleteBooking(id);
  }
}
