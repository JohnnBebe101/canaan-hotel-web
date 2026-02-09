import { supabase } from './supabase';

// ============================================
// ROOM STORE (Supabase)
// ============================================

export interface Room {
  id: string;
  name: string;
  description: string;
  price_per_night: number;
  max_guests: number;
  is_active: boolean;
  image_src?: string;
  image_alt?: string;
  price_label?: string;
  badges?: string[];
  rating?: number;
  created_at: string;
}

export async function getRooms(): Promise<Room[]> {
  const { data, error } = await supabase
    .from('rooms')
    .select('*')
    .eq('is_active', true)
    .order('price_per_night', { ascending: true });

  if (error) {
    console.error('[RoomStore] Error fetching rooms:', error);
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
    if (error.code === 'PGRST116') return null;
    console.error('[RoomStore] Error fetching room:', error);
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
    console.error('[RoomStore] Error creating room:', error);
    throw new Error('Failed to create room');
  }

  return data;
}

export async function updateRoom(id: string, updates: Partial<Room>): Promise<Room | null> {
  const { data, error } = await supabase
    .from('rooms')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('[RoomStore] Error updating room:', error);
    throw new Error('Failed to update room');
  }

  return data;
}

export async function deleteRoom(id: string): Promise<boolean> {
  // Soft delete - set is_active to false
  const { error } = await supabase
    .from('rooms')
    .update({ is_active: false })
    .eq('id', id);

  if (error) {
    console.error('[RoomStore] Error deleting room:', error);
    throw new Error('Failed to delete room');
  }

  return true;
}
