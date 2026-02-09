import { supabase } from './supabase';

// ============================================
// ATTRACTION STORE (Supabase)
// ============================================

export interface Attraction {
  id: string;
  name: string;
  description: string;
  category: string;
  distance: string;
  image?: string;
  is_active: boolean;
  created_at: string;
}

export async function getAttractions(): Promise<Attraction[]> {
  const { data, error } = await supabase
    .from('attractions')
    .select('*')
    .eq('is_active', true)
    .order('name');

  if (error) {
    console.error('[AttractionStore] Error fetching attractions:', error);
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
    if (error.code === 'PGRST116') return null;
    console.error('[AttractionStore] Error fetching attraction:', error);
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
    console.error('[AttractionStore] Error creating attraction:', error);
    throw new Error('Failed to create attraction');
  }

  return data;
}

export async function updateAttraction(id: string, updates: Partial<Attraction>): Promise<Attraction | null> {
  const { data, error } = await supabase
    .from('attractions')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('[AttractionStore] Error updating attraction:', error);
    throw new Error('Failed to update attraction');
  }

  return data;
}

export async function deleteAttraction(id: string): Promise<boolean> {
  // Soft delete - set is_active to false
  const { error } = await supabase
    .from('attractions')
    .update({ is_active: false })
    .eq('id', id);

  if (error) {
    console.error('[AttractionStore] Error deleting attraction:', error);
    throw new Error('Failed to delete attraction');
  }

  return true;
}
