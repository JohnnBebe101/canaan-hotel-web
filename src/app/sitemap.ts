import { MetadataRoute } from 'next'
import { FEATURED_ROOMS } from '@/lib/featuredRooms'
import { offlineStorage } from '@/lib/offline-storage'

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://canaan11.netlify.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}`,             lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/rooms`,       lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/contact`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/about`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/attractions`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/gallery`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/services`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/blog`,        lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.5 },
  ]

  const roomRoutes: MetadataRoute.Sitemap = FEATURED_ROOMS.map((room) => ({
    url: `${BASE}/rooms/${room.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  let blogRoutes: MetadataRoute.Sitemap = []
  try {
    const posts = offlineStorage.getPublishedBlogs()
    blogRoutes = posts.map((post: { slug: string; updated_at?: string }) => ({
      url: `${BASE}/blog/${post.slug}`,
      lastModified: post.updated_at ? new Date(post.updated_at) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }))
  } catch {
    blogRoutes = []
  }

  return [...staticRoutes, ...roomRoutes, ...blogRoutes]
}