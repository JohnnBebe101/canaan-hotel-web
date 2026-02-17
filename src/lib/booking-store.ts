import { supabase } from './supabase';
import { offlineStorage } from './offline-storage';
import { Booking } from './models';

// ============================================
// BOOKING STORE (Supabase with Offline Fallback)
// ============================================

export async function getBookings(): Promise<Booking[]> {
  try {
    if (!supabase) throw new Error('Supabase not initialized');
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.warn('[BookingStore] Supabase unavailable, using offline storage');
    return offlineStorage.getBookings();
  }
}

export async function getBookingById(id: string): Promise<Booking | null> {
  try {
    if (!supabase) throw new Error('Supabase not initialized');
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
    console.warn('[BookingStore] Supabase unavailable, using offline storage');
    return offlineStorage.getBooking(id) || null;
  }
}

export async function createBooking(booking: Omit<Booking, 'id' | 'created_at'>): Promise<Booking> {
  try {
    if (!supabase) throw new Error('Supabase not initialized');
    const { data, error } = await supabase
      .from('bookings')
      .insert(booking)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.warn('[BookingStore] Supabase unavailable, using offline storage');
    return offlineStorage.createBooking(booking);
  }
}

export async function updateBooking(id: string, updates: Partial<Booking>): Promise<Booking | null> {
  try {
    if (!supabase) throw new Error('Supabase not initialized');
    const { data, error } = await supabase
      .from('bookings')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.warn('[BookingStore] Supabase unavailable, using offline storage');
    return offlineStorage.updateBooking(id, updates);
  }
}

export async function deleteBooking(id: string): Promise<boolean> {
  try {
    if (!supabase) throw new Error('Supabase not initialized');
    const { error } = await supabase.from('bookings').delete().eq('id', id);
    if (error) throw error;
    return true;
  } catch (error) {
    console.warn('[BookingStore] Supabase unavailable, using offline storage');
    return offlineStorage.deleteBooking(id);
  }
}

export async function getBookingStats() {
  try {
    if (!supabase) throw new Error('Supabase not initialized');
    const { data: totalBookings } = await supabase
      .from('bookings')
      .select('id', { count: 'exact', head: true });

    const { data: confirmedBookings } = await supabase
      .from('bookings')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'confirmed');

    const { data: pendingBookings } = await supabase
      .from('bookings')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'pending');

    const { data: revenueData } = await supabase
      .from('bookings')
      .select('total_price')
      .eq('status', 'confirmed');

    const revenue = revenueData?.reduce((sum, b) => sum + (Number(b.total_price) || 0), 0) || 0;

    const { data: guestData } = await supabase
      .from('bookings')
      .select('number_of_guests')
      .eq('status', 'confirmed');

    const activeGuests = guestData?.reduce((sum, b) => sum + (Number(b.number_of_guests) || 0), 0) || 0;

    return {
      totalBookings: totalBookings?.length || 0,
      confirmedBookings: confirmedBookings?.length || 0,
      pendingBookings: pendingBookings?.length || 0,
      totalRevenue: revenue,
      activeGuests: activeGuests,
      occupancyRate: Math.round(((confirmedBookings?.length || 0) / 10) * 100)
    };
  } catch (error) {
    console.warn('[BookingStore] Using offline storage for stats');
    const stats = offlineStorage.getStats();
    return {
      totalBookings: stats.totalBookings,
      confirmedBookings: stats.confirmedBookings,
      pendingBookings: stats.pendingBookings,
      totalRevenue: 0,
      activeGuests: 0,
      occupancyRate: 0
    };
  }
}
