import { offlineStorage } from './offline-storage';
import { Blog } from './models';

// ============================================
// BLOG STORE (Local-Only CMS)
// Blogs are managed locally to ensure fast performance and simplified content coordination.
// ============================================

export async function getBlogs(): Promise<Blog[]> {
  return offlineStorage.getBlogs();
}

export async function getPublishedBlogs(): Promise<Blog[]> {
  return offlineStorage.getPublishedBlogs();
}

export async function getLatestBlogs(limit: number = 2): Promise<Blog[]> {
  return offlineStorage.getLatestBlogs(limit);
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  return offlineStorage.getBlogBySlug(slug);
}

export async function getBlogById(id: string): Promise<Blog | null> {
  return offlineStorage.getBlogById(id);
}

export async function createBlog(blog: Omit<Blog, 'id' | 'created_at' | 'updated_at'>): Promise<Blog> {
  return offlineStorage.createBlog(blog);
}

export async function updateBlog(id: string, updates: Partial<Blog>): Promise<Blog | null> {
  return offlineStorage.updateBlog(id, updates);
}

export async function deleteBlog(id: string): Promise<boolean> {
  return offlineStorage.deleteBlog(id);
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
