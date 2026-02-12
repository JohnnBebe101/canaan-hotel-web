import { offlineStorage } from './offline-storage';

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
  return offlineStorage.getAttractions();
}

export async function getAttractionById(id: string): Promise<Attraction | null> {
  return offlineStorage.getAttraction(id) || null;
}

export async function createAttraction(attraction: Omit<Attraction, 'id' | 'created_at'>): Promise<Attraction> {
  return offlineStorage.createAttraction(attraction);
}

export async function updateAttraction(id: string, updates: Partial<Attraction>): Promise<Attraction | null> {
  return offlineStorage.updateAttraction(id, updates);
}

export async function deleteAttraction(id: string): Promise<boolean> {
  return offlineStorage.deleteAttraction(id);
}
