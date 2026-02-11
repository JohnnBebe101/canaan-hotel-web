import { supabase } from './supabase';
import { offlineStorage } from './offline-storage';

// ============================================
// ROOM STORE (Supabase with Offline Fallback)
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
  try {
    const { data, error } = await supabase
      .from('rooms')
      .select('*')
      .eq('is_active', true)
      .order('price_per_night', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.warn('[RoomStore] Supabase unavailable, using offline storage');
    return offlineStorage.getRooms();
  }
}

export async function getRoomById(id: string): Promise<Room | null> {
  try {
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
    console.warn('[RoomStore] Supabase unavailable, using offline storage');
    const rooms = offlineStorage.getRooms();
    return rooms.find(r => r.id === id) || null;
  }
}

export async function createRoom(room: Omit<Room, 'id' | 'created_at'>): Promise<Room> {
  try {
    const { data, error } = await supabase
      .from('rooms')
      .insert(room)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.warn('[RoomStore] Supabase unavailable, using offline storage');
    return offlineStorage.createRoom(room);
  }
}

export async function updateRoom(id: string, updates: Partial<Room>): Promise<Room | null> {
  try {
    const { data, error } = await supabase
      .from('rooms')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.warn('[RoomStore] Supabase unavailable, using offline storage');
    return offlineStorage.updateRoom(id, updates);
  }
}

export async function deleteRoom(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('rooms')
      .update({ is_active: false })
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.warn('[RoomStore] Supabase unavailable, using offline storage');
    return offlineStorage.deleteRoom(id);
  }
}
