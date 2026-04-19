import { getSupabaseAdmin } from './supabase-admin';

export type Room = {
  id: string;
  name: string;
  description?: string;
  price_per_night: number;
  max_guests: number;
  is_active: boolean;
  image_src?: string;
  image_alt?: string;
  price_label?: string;
  badges?: string[];
  images?: string[];
  created_at?: string;
};

export async function getRooms() {
  const { data, error } = await getSupabaseAdmin()
    .from('rooms')
    .select('*')
    .order('name');

  if (error) throw error;
  return data || [];
}

export async function getRoomById(id: string) {
  const { data, error } = await getSupabaseAdmin()
    .from('rooms')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }
  return data;
}

export async function createRoom(room: Omit<Room, 'id'>) {
  const { data, error } = await getSupabaseAdmin()
    .from('rooms')
    .insert(room)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateRoom(id: string, updates: Partial<Room>) {
  const { data, error } = await getSupabaseAdmin()
    .from('rooms')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteRoom(id: string) {
  const { error } = await getSupabaseAdmin().from('rooms').delete().eq('id', id);
  if (error) throw error;
  return true;
}