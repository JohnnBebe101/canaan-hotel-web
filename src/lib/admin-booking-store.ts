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

export async function getBookingStats() {
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
    .eq('status', 'pending');

  const { data: revenueData } = await getSupabaseAdmin()
    .from('bookings')
    .select('total_price')
    .eq('status', 'confirmed');

  const revenue = revenueData?.reduce(
    (sum: number, b: any) => sum + (Number(b.total_price) || 0),
    0
  ) || 0;

  const { data: guestData } = await getSupabaseAdmin()
    .from('bookings')
    .select('number_of_guests')
    .eq('status', 'confirmed');

  const activeGuests = guestData?.reduce(
    (sum: number, b: any) => sum + (Number(b.number_of_guests) || 0),
    0
  ) || 0;

  return {
    totalBookings: totalBookings?.length || 0,
    confirmedBookings: confirmedBookings?.length || 0,
    pendingBookings: pendingBookings?.length || 0,
    totalRevenue: revenue,
    activeGuests,
    occupancyRate: Math.round(((confirmedBookings?.length || 0) / 10) * 100),
  };
}