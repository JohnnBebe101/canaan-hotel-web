import { supabase } from './supabase';
import { offlineStorage } from './offline-storage';
import { Booking } from './models';

// CamelCase input type for bookings (during transition to camelCase API)
export interface BookingCamel {
  guestName: string;
  email: string;
  phone?: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  numberOfGuests?: number;
  totalPrice?: number;
  status?: string;
  notes?: string;
}

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

// Overloads to support both camelCase input and snake_case storage payloads
export async function createBooking(booking: BookingCamel): Promise<Booking>;
export async function createBooking(booking: Omit<Booking, 'id' | 'created_at'>): Promise<Booking>;
export async function createBooking(booking: any): Promise<Booking> {
  // Map camelCase input to snake_case if needed
  const isCamel = booking && (booking as BookingCamel).guestName !== undefined;
  const payload = isCamel ? camelToSnake(booking as BookingCamel) : booking as Omit<Booking, 'id' | 'created_at'>;

  try {
    if (!supabase) throw new Error('Supabase not initialized');
    const { data, error } = await (supabase as any)
      .from('bookings')
      .insert(payload)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.warn('[BookingStore] Supabase unavailable, using offline storage');
    return offlineStorage.createBooking(booking);
  }
}

// Convert camelCase booking input to snake_case for storage
function camelToSnake(b: BookingCamel): Omit<Booking, 'id' | 'created_at'> {
  return {
    guest_name: b.guestName,
    email: b.email,
    phone: b.phone,
    room_type: b.roomType,
    check_in_date: b.checkIn,
    check_out_date: b.checkOut,
    number_of_guests: b.numberOfGuests ?? 1,
    total_price: b.totalPrice ?? 0,
    status: b.status ?? 'pending',
    notes: b.notes,
  } as any;
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

    const revenue = revenueData?.reduce((sum: number, b: { total_price: number | string }) => sum + (Number(b.total_price) || 0), 0) || 0;

    const { data: guestData } = await supabase
      .from('bookings')
      .select('number_of_guests')
      .eq('status', 'confirmed');

    const activeGuests = guestData?.reduce((sum: number, b: { number_of_guests: number | string }) => sum + (Number(b.number_of_guests) || 0), 0) || 0;

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
