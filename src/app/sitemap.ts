import { MetadataRoute } from 'next'
import { FEATURED_ROOMS } from '@/lib/featuredRooms'
import { offlineStorage } from '@/lib/offline-storage'
import { SITE_URL } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}`,             lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${SITE_URL}/rooms`,       lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${SITE_URL}/booking`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/contact`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/about`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/attractions`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/gallery`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/services`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/blog`,        lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.5 },
  ]

  const roomRoutes: MetadataRoute.Sitemap = FEATURED_ROOMS.map((room) => ({
    url: `${SITE_URL}/rooms/${room.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  let blogRoutes: MetadataRoute.Sitemap = []
  try {
    const posts = offlineStorage.getPublishedBlogs()
    blogRoutes = posts.map((post: { slug: string; updated_at?: string }) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.updated_at ? new Date(post.updated_at) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }))
  } catch {
    blogRoutes = []
  }

  return [...staticRoutes, ...roomRoutes, ...blogRoutes]
}
