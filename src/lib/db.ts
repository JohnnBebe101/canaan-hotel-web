import { getSupabase, type Booking, type Payment, type Room, type Attraction } from './supabase';
import { offlineStorage } from './offline-storage';

// Flag to track if Supabase is connected
let isConnected = false;

/**
 * Initialize database connection
 * Returns true if Supabase is connected, false otherwise
 */
export async function initializeDatabase(): Promise<boolean> {
  if (isConnected) {
    return true;
  }

  try {
    const supabase = getSupabase();
    const { error } = await supabase.from('rooms').select('count').limit(1);

    if (error) {
      console.error('[Database] Connection failed:', error.message);
      return false;
    }

    isConnected = true;
    console.log('[Database] Connected to Supabase successfully');
    return true;
  } catch (error) {
    console.error('[Database] Connection error:', error);
    return false;
  }
}

export function isDatabaseAvailable(): boolean {
  return isConnected;
}

// ============================================
// BOOKINGS OPERATIONS (with Offline Fallback)
// ============================================

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
    console.warn('[Database] Using offline storage for bookings');
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
    console.warn('[Database] Using offline storage for booking');
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
    console.warn('[Database] Using offline storage for createBooking');
    return offlineStorage.createBooking(booking);
  }
}

export async function updateBooking(id: string, updates: Partial<Booking>): Promise<Booking> {
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
    console.warn('[Database] Using offline storage for updateBooking');
    const result = offlineStorage.updateBooking(id, updates);
    if (!result) throw new Error('Booking not found');
    return result;
  }
}

export async function deleteBooking(id: string): Promise<boolean> {
  try {
    const supabase = getSupabase();
    const { error } = await supabase.from('bookings').delete().eq('id', id);
    if (error) throw error;
    return true;
  } catch (error) {
    console.warn('[Database] Using offline storage for deleteBooking');
    return offlineStorage.deleteBooking(id);
  }
}

// ============================================
// ROOMS OPERATIONS (with Offline Fallback)
// ============================================

export async function getRooms(): Promise<Room[]> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('rooms')
      .select('*')
      .eq('is_active', true)
      .order('price_per_night', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.warn('[Database] Using offline storage for rooms');
    return offlineStorage.getRooms();
  }
}

export async function getRoomById(id: string): Promise<Room | null> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('rooms')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return data;
  } catch (error) {
    console.warn('[Database] Using offline storage for room');
    const rooms = offlineStorage.getRooms();
    return rooms.find(r => r.id === id) || null;
  }
}

export async function getRoomBySlug(slug: string): Promise<Room | null> {
  try {
    const supabase = getSupabase();
    const slugToName: Record<string, string> = {
      'standard-room': 'Standard Room',
      'deluxe-room': 'Deluxe Room',
      'family-room': 'Family Room',
      'suite': 'Luxury Suite',
    };

    const roomName = slugToName[slug.toLowerCase()] || slug;

    const { data, error } = await supabase
      .from('rooms')
      .select('*')
      .ilike('name', roomName)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return data;
  } catch (error) {
    console.warn('[Database] Using offline storage for room by slug');
    const rooms = offlineStorage.getRooms();
    return rooms.find(r => 
      r.name.toLowerCase().replace(/\s+/g, '-') === slug.toLowerCase()
    ) || null;
  }
}

export async function createRoom(room: Omit<Room, 'id' | 'created_at'>): Promise<Room> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('rooms')
      .insert(room)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.warn('[Database] Using offline storage for createRoom');
    return offlineStorage.createRoom(room);
  }
}

export async function updateRoom(id: string, updates: Partial<Room>): Promise<Room> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('rooms')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.warn('[Database] Using offline storage for updateRoom');
    const result = offlineStorage.updateRoom(id, updates);
    if (!result) throw new Error('Room not found');
    return result;
  }
}

export async function deleteRoom(id: string): Promise<boolean> {
  try {
    const supabase = getSupabase();
    const { error } = await supabase.from('rooms').delete().eq('id', id);
    if (error) throw error;
    return true;
  } catch (error) {
    console.warn('[Database] Using offline storage for deleteRoom');
    return offlineStorage.deleteRoom(id);
  }
}

// ============================================
// ATTRACTIONS OPERATIONS (with Offline Fallback)
// ============================================

export async function getAttractions(): Promise<Attraction[]> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('attractions')
      .select('*')
      .eq('is_active', true)
      .order('name');

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.warn('[Database] Using offline storage for attractions');
    return offlineStorage.getAttractions();
  }
}

export async function getAttractionById(id: string): Promise<Attraction | null> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('attractions')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return data;
  } catch (error) {
    console.warn('[Database] Using offline storage for attraction');
    const attractions = offlineStorage.getAttractions();
    return attractions.find(a => a.id === id) || null;
  }
}

export async function createAttraction(attraction: Omit<Attraction, 'id' | 'created_at'>): Promise<Attraction> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('attractions')
      .insert(attraction)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.warn('[Database] Using offline storage for createAttraction');
    return offlineStorage.createAttraction(attraction);
  }
}

export async function updateAttraction(id: string, updates: Partial<Attraction>): Promise<Attraction> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('attractions')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.warn('[Database] Using offline storage for updateAttraction');
    const result = offlineStorage.updateAttraction(id, updates);
    if (!result) throw new Error('Attraction not found');
    return result;
  }
}

export async function deleteAttraction(id: string): Promise<boolean> {
  try {
    const supabase = getSupabase();
    const { error } = await supabase.from('attractions').delete().eq('id', id);
    if (error) throw error;
    return true;
  } catch (error) {
    console.warn('[Database] Using offline storage for deleteAttraction');
    return offlineStorage.deleteAttraction(id);
  }
}

// ============================================
// PAYMENTS OPERATIONS (with Offline Fallback)
// ============================================

export async function getPayments(): Promise<Payment[]> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.warn('[Database] Using offline storage for payments');
    return offlineStorage.getPayments();
  }
}

export async function createPayment(payment: Omit<Payment, 'id' | 'created_at'>): Promise<Payment> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('payments')
      .insert(payment)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.warn('[Database] Using offline storage for createPayment');
    return offlineStorage.createPayment(payment);
  }
}

// ============================================
// UTILITY FUNCTIONS (with Offline Fallback)
// ============================================

export async function getBookingStats() {
  try {
    const supabase = getSupabase();

    const { data: totalBookings } = await supabase
      .from('bookings')
      .select('count', { count: 'exact' });

    const { data: confirmedBookings } = await supabase
      .from('bookings')
      .select('count', { count: 'exact' })
      .eq('status', 'confirmed');

    const { data: pendingBookings } = await supabase
      .from('bookings')
      .select('count', { count: 'exact' })
      .eq('status', 'pending');

    const { data: revenueData } = await supabase
      .from('bookings')
      .select('total_price')
      .eq('status', 'confirmed');

    const revenue = revenueData?.reduce((sum, b) => sum + (b.total_price || 0), 0) || 0;

    return {
      totalBookings: totalBookings?.[0]?.count || 0,
      confirmedBookings: confirmedBookings?.[0]?.count || 0,
      pendingBookings: pendingBookings?.[0]?.count || 0,
      totalRevenue: revenue,
    };
  } catch (error) {
    console.warn('[Database] Using offline storage for stats');
    const stats = offlineStorage.getStats();
    return {
      totalBookings: stats.totalBookings,
      confirmedBookings: stats.confirmedBookings,
      pendingBookings: stats.pendingBookings,
      totalRevenue: 0,
    };
  }
}
