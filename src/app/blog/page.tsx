import type { Metadata } from "next/types";
import Link from "next/link";
import Image from "next/image";
import { getPublishedBlogs } from "@/lib/blog-store";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: 'Journal — Travel Stories from Tigray',
  description: 'Travel guides, cultural insights, and stories from the highlands of Tigray. Written by the team at Canaan International Hotel, Adigrat.',
};

function readingTime(content: string): string {
  const words = content?.replace(/<[^>]+>/g, '').split(/\s+/).length ?? 0;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

function deriveCategory(title: string): string {
  const t = title.toLowerCase();
  if (t.includes('mosque') || t.includes('church')) return 'Heritage';
  if (t.includes('hik') || t.includes('mountain') || t.includes('cliff')) return 'Adventure';
  if (t.includes('hotel') || t.includes('canaan')) return 'Hotel News';
  return 'Culture';
}

export default async function BlogPage() {
  const blogs = await getPublishedBlogs();
  const featuredPost = blogs[0];
  const gridPosts = blogs.slice(1);

  return (
    <div className="flex flex-1 flex-col items-center">
      {/* Hero Section - above the fold, no scroll animation */}
      <section className="w-full bg-forest py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block px-4 py-1 bg-sandstone/10 text-sandstone text-xs uppercase tracking-widest font-bold mb-6">
            Travel Journal
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-sandstone mb-4">
            Stories from the Highlands
          </h1>
          <p className="max-w-2xl mx-auto text-sandstone/70 text-lg">
            Travel guides, cultural insights, and news from Canaan International Hotel in Adigrat, Tigray.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="w-full bg-sandstone py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Featured Post */}
          {featuredPost && (
            <ScrollReveal className="mb-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-2xl overflow-hidden shadow-lg">
                <div className="relative h-80 lg:h-auto">
                  <Image
                    src={featuredPost.featured_image || "/images/heroes/Ext-Compund.webp"}
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <span className="inline-block px-3 py-1 bg-cactus/10 text-cactus text-xs uppercase tracking-widest font-bold mb-4 w-fit">
                    {deriveCategory(featuredPost.title)}
                  </span>
                  <h2 className="text-3xl font-serif font-bold text-forest mb-4">
                    {featuredPost.title}
                  </h2>
                  <p className="text-text-secondary mb-6 line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-cactus mb-6">
                    <span>{readingTime(featuredPost.content)}</span>
                    <span>•</span>
                    <span>{featuredPost.author}</span>
                  </div>
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-2 text-bronze font-medium hover:gap-3 transition-all"
                  >
                    Read Story <span>→</span>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* Post Grid */}
          {gridPosts.length > 0 && (
            <ScrollReveal>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {gridPosts.map((blog, index) => (
                  <ScrollReveal key={blog.id} delay={index * 100}>
                    <Link
                      href={`/blog/${blog.slug}`}
                      className="group block bg-white rounded-xl overflow-hidden shadow-sm border border-forest/5 hover:shadow-lg hover:border-bronze/30 transition-all duration-300"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={blog.featured_image || "/images/heroes/Ext-Compund.webp"}
                          alt={blog.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs text-cactus uppercase tracking-wider font-bold">
                            {deriveCategory(blog.title)}
                          </span>
                          <span className="text-xs text-cactus/60">
                            {blog.published_at
                              ? new Date(blog.published_at).toLocaleDateString('en-GB', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric'
                                })
                              : ""}
                          </span>
                        </div>
                        <h3 className="text-xl font-serif font-bold text-forest mb-2 group-hover:text-bronze transition-colors">
                          {blog.title}
                        </h3>
                        <p className="text-sm text-text-secondary line-clamp-2 mb-4">
                          {blog.excerpt}
                        </p>
                        <span className="inline-block text-bronze font-medium text-sm group-hover:underline">
                          Read Story →
                        </span>
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </ScrollReveal>
          )}

          {blogs.length === 0 && (
            <div className="text-center py-16">
              <p className="text-text-secondary">
                No blog posts yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}