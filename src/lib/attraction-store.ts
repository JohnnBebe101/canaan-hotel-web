import { offlineStorage } from './offline-storage';
import { Attraction } from './models';

// ============================================
// ATTRACTION STORE (Local-Only CMS)
// This data is managed locally to save costs and reduce complexity,
// as attractions are updated infrequently.
// ============================================

export async function getAttractions(): Promise<Attraction[]> {
  // Use local storage directly for static content
  return offlineStorage.getAttractions();
}

export async function getAttractionById(id: string): Promise<Attraction | null> {
  return offlineStorage.getAttraction(id) || null;
}

export async function createAttraction(attraction: Omit<Attraction, 'id' | 'created_at'>): Promise<Attraction> {
  // Updates local storage (persists per session/build)
  return offlineStorage.createAttraction(attraction);
}

export async function updateAttraction(id: string, updates: Partial<Attraction>): Promise<Attraction | null> {
  return offlineStorage.updateAttraction(id, updates);
}

export async function deleteAttraction(id: string): Promise<boolean> {
  return offlineStorage.deleteAttraction(id);
}
