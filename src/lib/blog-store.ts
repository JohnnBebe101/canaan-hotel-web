import { supabase } from './supabase';
import { offlineStorage } from './offline-storage';
import { Blog } from './models';

// ============================================
// BLOG STORE (Supabase with Offline Fallback)
// ============================================

export async function getBlogs(): Promise<Blog[]> {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.warn('[BlogStore] Supabase unavailable, using offline storage');
    return offlineStorage.getBlogs();
  }
}

export async function getPublishedBlogs(): Promise<Blog[]> {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('is_published', true)
      .order('published_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.warn('[BlogStore] Supabase unavailable, using offline storage');
    return offlineStorage.getPublishedBlogs();
  }
}

export async function getLatestBlogs(limit: number = 2): Promise<Blog[]> {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('is_published', true)
      .order('published_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.warn('[BlogStore] Supabase unavailable, using offline storage');
    return offlineStorage.getLatestBlogs(limit);
  }
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return data;
  } catch (error) {
    console.warn('[BlogStore] Supabase unavailable, using offline storage');
    return offlineStorage.getBlogBySlug(slug);
  }
}

export async function getBlogById(id: string): Promise<Blog | null> {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return data;
  } catch (error) {
    console.warn('[BlogStore] Supabase unavailable, using offline storage');
    return offlineStorage.getBlogById(id);
  }
}

export async function createBlog(blog: Omit<Blog, 'id' | 'created_at' | 'updated_at'>): Promise<Blog> {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .insert(blog)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.warn('[BlogStore] Supabase unavailable, using offline storage');
    return offlineStorage.createBlog(blog);
  }
}

export async function updateBlog(id: string, updates: Partial<Blog>): Promise<Blog | null> {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.warn('[BlogStore] Supabase unavailable, using offline storage');
    return offlineStorage.updateBlog(id, updates);
  }
}

export async function deleteBlog(id: string): Promise<boolean> {
  try {
    const { error } = await supabase.from('blogs').delete().eq('id', id);
    if (error) throw error;
    return true;
  } catch (error) {
    console.warn('[BlogStore] Supabase unavailable, using offline storage');
    return offlineStorage.deleteBlog(id);
  }
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
