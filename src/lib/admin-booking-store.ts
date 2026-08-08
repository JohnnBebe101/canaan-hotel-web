import { getSupabaseAdmin } from './supabase-admin';

export async function getBookings() {
  const { data, error } = await getSupabaseAdmin()
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getBookingById(id: string) {
  const { data, error } = await getSupabaseAdmin()
    .from('bookings')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }
  return data;
}

export async function updateBooking(id: string, updates: any) {
  const { data, error } = await getSupabaseAdmin()
    .from('bookings')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteBooking(id: string) {
  const { error } = await getSupabaseAdmin().from('bookings').delete().eq('id', id);
  if (error) throw error;
  return true;
}

const TOTAL_ROOMS = 24;

export async function getBookingStats() {
  const today = new Date().toISOString().split('T')[0];

  const { data: totalBookings } = await getSupabaseAdmin()
    .from('bookings')
    .select('id', { count: 'exact', head: true });

  const { data: confirmedBookings } = await getSupabaseAdmin()
    .from('bookings')
    .select('id', { count: 'exact', head: true })
    .eq('status', 'confirmed');

  const { data: pendingBookings } = await getSupabaseAdmin()
    .from('bookings')
    .select('id', { count: 'exact', head: true })
    .in('status', ['held', 'hold_pending_confirmation', 'booking_created']);

  const { data: revenueData } = await getSupabaseAdmin()
    .from('bookings')
    .select('total_price_cents')
    .eq('status', 'confirmed')
    .eq('payment_status', 'paid');

  const confirmedRevenueCents = (revenueData ?? []).reduce(
    (sum: number, b: any) => sum + (b.total_price_cents ?? 0),
    0
  );

  const { data: activeGuestsData } = await getSupabaseAdmin()
    .from('bookings')
    .select('number_of_guests')
    .eq('status', 'confirmed')
    .eq('payment_status', 'paid');

  const activeGuests = (activeGuestsData ?? []).reduce(
    (sum: number, b: any) => sum + (Number(b.number_of_guests) || 0),
    0
  );

  const { count: occupiedToday } = await getSupabaseAdmin()
    .from('bookings')
    .select('id', { count: 'exact', head: true })
    .in('status', ['confirmed', 'checked_in'])
    .eq('payment_status', 'paid')
    .lte('check_in_date', today)
    .gt('check_out_date', today);

  const { count: checkedInToday } = await getSupabaseAdmin()
    .from('bookings')
    .select('id', { count: 'exact', head: true })
    .eq('status', 'checked_in')
    .eq('check_in_date', today);

  const occupancyRate = TOTAL_ROOMS > 0
    ? Math.round(((occupiedToday ?? 0) / TOTAL_ROOMS) * 100)
    : 0;

  return {
    totalBookings: totalBookings?.length || 0,
    confirmedBookings: confirmedBookings?.length || 0,
    pendingBookings: pendingBookings?.length || 0,
    totalRevenue: confirmedRevenueCents / 100,
    confirmedRevenueCents,
    activeGuests,
    occupancyRate,
    availableRooms: TOTAL_ROOMS - (occupiedToday ?? 0),
    checkedInGuests: checkedInToday ?? 0,
    checkedInToday: checkedInToday ?? 0,
  };
}
