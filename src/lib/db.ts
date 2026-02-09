import { supabase, type Booking, type Payment, type Room, type Attraction } from './supabase';

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
// BOOKINGS OPERATIONS
// ============================================

export async function getBookings(): Promise<Booking[]> {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[Database] Error fetching bookings:', error);
    throw new Error('Failed to fetch bookings');
  }

  return data || [];
}

export async function getBookingById(id: string): Promise<Booking | null> {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    console.error('[Database] Error fetching booking:', error);
    throw new Error('Failed to fetch booking');
  }

  return data;
}

export async function createBooking(booking: Omit<Booking, 'id' | 'created_at'>): Promise<Booking> {
  const { data, error } = await supabase
    .from('bookings')
    .insert(booking)
    .select()
    .single();

  if (error) {
    console.error('[Database] Error creating booking:', error);
    throw new Error('Failed to create booking');
  }

  return data;
}

export async function updateBooking(id: string, updates: Partial<Booking>): Promise<Booking> {
  const { data, error } = await supabase
    .from('bookings')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('[Database] Error updating booking:', error);
    throw new Error('Failed to update booking');
  }

  return data;
}

export async function deleteBooking(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('bookings')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('[Database] Error deleting booking:', error);
    throw new Error('Failed to delete booking');
  }

  return true;
}

// ============================================
// ROOMS OPERATIONS
// ============================================

export async function getRooms(): Promise<Room[]> {
  const { data, error } = await supabase
    .from('rooms')
    .select('*')
    .eq('is_active', true)
    .order('price_per_night', { ascending: true });

  if (error) {
    console.error('[Database] Error fetching rooms:', error);
    throw new Error('Failed to fetch rooms');
  }

  return data || [];
}

export async function getRoomById(id: string): Promise<Room | null> {
  const { data, error } = await supabase
    .from('rooms')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    console.error('[Database] Error fetching room:', error);
    throw new Error('Failed to fetch room');
  }

  return data;
}

export async function getRoomBySlug(slug: string): Promise<Room | null> {
  const slugToName: Record<string, string> = {
    'economy-single': 'Economy Single Room',
    'comfort-double': 'Comfort Double Room',
    'family-suite': 'Family Suite',
    'deluxe': 'Deluxe Ocean Suite',
    'executive': 'Executive Garden Room',
  };

  const roomName = slugToName[slug.toLowerCase()] || slug;

  const { data, error } = await supabase
    .from('rooms')
    .select('*')
    .ilike('name', roomName)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    console.error('[Database] Error fetching room by slug:', error);
    throw new Error('Failed to fetch room');
  }

  return data;
}

export async function createRoom(room: Omit<Room, 'id' | 'created_at'>): Promise<Room> {
  const { data, error } = await supabase
    .from('rooms')
    .insert(room)
    .select()
    .single();

  if (error) {
    console.error('[Database] Error creating room:', error);
    throw new Error('Failed to create room');
  }

  return data;
}

export async function updateRoom(id: string, updates: Partial<Room>): Promise<Room> {
  const { data, error } = await supabase
    .from('rooms')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('[Database] Error updating room:', error);
    throw new Error('Failed to update room');
  }

  return data;
}

export async function deleteRoom(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('rooms')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('[Database] Error deleting room:', error);
    throw new Error('Failed to delete room');
  }

  return true;
}

// ============================================
// ATTRACTIONS OPERATIONS
// ============================================

export async function getAttractions(): Promise<Attraction[]> {
  const { data, error } = await supabase
    .from('attractions')
    .select('*')
    .eq('is_active', true)
    .order('name');

  if (error) {
    console.error('[Database] Error fetching attractions:', error);
    throw new Error('Failed to fetch attractions');
  }

  return data || [];
}

export async function getAttractionById(id: string): Promise<Attraction | null> {
  const { data, error } = await supabase
    .from('attractions')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    console.error('[Database] Error fetching attraction:', error);
    throw new Error('Failed to fetch attraction');
  }

  return data;
}

export async function createAttraction(attraction: Omit<Attraction, 'id' | 'created_at'>): Promise<Attraction> {
  const { data, error } = await supabase
    .from('attractions')
    .insert(attraction)
    .select()
    .single();

  if (error) {
    console.error('[Database] Error creating attraction:', error);
    throw new Error('Failed to create attraction');
  }

  return data;
}

export async function updateAttraction(id: string, updates: Partial<Attraction>): Promise<Attraction> {
  const { data, error } = await supabase
    .from('attractions')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('[Database] Error updating attraction:', error);
    throw new Error('Failed to update attraction');
  }

  return data;
}

export async function deleteAttraction(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('attractions')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('[Database] Error deleting attraction:', error);
    throw new Error('Failed to delete attraction');
  }

  return true;
}

// ============================================
// PAYMENTS OPERATIONS
// ============================================

export async function getPayments(): Promise<Payment[]> {
  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[Database] Error fetching payments:', error);
    throw new Error('Failed to fetch payments');
  }

  return data || [];
}

export async function createPayment(payment: Omit<Payment, 'id' | 'created_at'>): Promise<Payment> {
  const { data, error } = await supabase
    .from('payments')
    .insert(payment)
    .select()
    .single();

  if (error) {
    console.error('[Database] Error creating payment:', error);
    throw new Error('Failed to create payment');
  }

  return data;
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

export async function getBookingStats() {
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
}
