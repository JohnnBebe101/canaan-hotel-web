import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseClient: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.warn('Supabase environment variables are missing. Some features may be unavailable.');
    return null;
  }

  if (!supabaseClient) {
    supabaseClient = createClient(supabaseUrl, supabaseKey);
  }

  return supabaseClient;
}

export const supabase = getSupabase() as SupabaseClient;

// Type definitions for our database
export interface Booking {
  id: string;
  guest_name: string;
  email: string;
  phone?: string;
  check_in_date: string;
  check_out_date: string;
  number_of_guests: number;
  room_type: string;
  total_price: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  notes?: string;
  created_at: string;
}

export interface Payment {
  id: string;
  booking_id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
}

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

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  author: string;
  is_published: boolean;
  published_at: string | null;
  created_at?: string;
}
