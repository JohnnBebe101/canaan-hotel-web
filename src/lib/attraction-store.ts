import { supabase } from './supabase';
import { offlineStorage } from './offline-storage';
import { Attraction } from './models';

// ============================================
// ATTRACTION STORE (Supabase with Offline Fallback)
// ============================================

export async function getAttractions(): Promise<Attraction[]> {
  try {
    const { data, error } = await supabase
      .from('attractions')
      .select('*')
      .order('name', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.warn('[AttractionStore] Supabase unavailable, using offline storage');
    return offlineStorage.getAttractions();
  }
}

export async function getAttractionById(id: string): Promise<Attraction | null> {
  try {
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
    console.warn('[AttractionStore] Supabase unavailable, using offline storage');
    return offlineStorage.getAttraction(id) || null;
  }
}

export async function createAttraction(attraction: Omit<Attraction, 'id' | 'created_at'>): Promise<Attraction> {
  try {
    const { data, error } = await supabase
      .from('attractions')
      .insert(attraction)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.warn('[AttractionStore] Supabase unavailable, using offline storage');
    return offlineStorage.createAttraction(attraction);
  }
}

export async function updateAttraction(id: string, updates: Partial<Attraction>): Promise<Attraction | null> {
  try {
    const { data, error } = await supabase
      .from('attractions')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.warn('[AttractionStore] Supabase unavailable, using offline storage');
    return offlineStorage.updateAttraction(id, updates);
  }
}

export async function deleteAttraction(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('attractions')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.warn('[AttractionStore] Supabase unavailable, using offline storage');
    return offlineStorage.deleteAttraction(id);
  }
}
