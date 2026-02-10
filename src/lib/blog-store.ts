import { supabase } from './supabase';

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  author: string;
  published_at: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export async function getBlogs(): Promise<Blog[]> {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('published_at', { ascending: false, nullsFirst: false });

    if (error) {
      console.warn('[BlogStore] Blogs table not available yet:', error.message);
      return [];
    }

    return data || [];
  } catch (error) {
    console.warn('[BlogStore] Error fetching blogs:', error);
    return [];
  }
}

export async function getPublishedBlogs(): Promise<Blog[]> {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('is_published', true)
      .order('published_at', { ascending: false });

    if (error) {
      console.warn('[BlogStore] Blogs table not available yet:', error.message);
      return [];
    }

    return data || [];
  } catch (error) {
    console.warn('[BlogStore] Error fetching published blogs:', error);
    return [];
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

    if (error) {
      console.warn('[BlogStore] Blogs table not available yet:', error.message);
      return [];
    }

    return data || [];
  } catch (error) {
    console.warn('[BlogStore] Error fetching latest blogs:', error);
    return [];
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
      console.warn('[BlogStore] Blogs table not available yet:', error.message);
      return null;
    }

    return data;
  } catch (error) {
    console.warn('[BlogStore] Error fetching blog by slug:', error);
    return null;
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
      console.warn('[BlogStore] Blogs table not available yet:', error.message);
      return null;
    }

    return data;
  } catch (error) {
    console.warn('[BlogStore] Error fetching blog by id:', error);
    return null;
  }
}

export async function createBlog(blog: Omit<Blog, 'id' | 'created_at' | 'updated_at'>): Promise<Blog> {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .insert(blog)
      .select()
      .single();

    if (error) {
      console.error('[BlogStore] Error creating blog:', error);
      throw new Error('Failed to create blog');
    }

    return data;
  } catch (error) {
    console.error('[BlogStore] Error creating blog:', error);
    throw error;
  }
}

export async function updateBlog(id: string, updates: Partial<Blog>): Promise<Blog | null> {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('[BlogStore] Error updating blog:', error);
      throw new Error('Failed to update blog');
    }

    return data;
  } catch (error) {
    console.error('[BlogStore] Error updating blog:', error);
    throw error;
  }
}

export async function deleteBlog(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('[BlogStore] Error deleting blog:', error);
      throw new Error('Failed to delete blog');
    }

    return true;
  } catch (error) {
    console.error('[BlogStore] Error deleting blog:', error);
    throw error;
  }
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
