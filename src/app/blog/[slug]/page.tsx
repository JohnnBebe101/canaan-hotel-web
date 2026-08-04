import type { Metadata } from "next/types";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedBlogs, getBlogBySlug } from "@/lib/blog-store";
import { offlineStorage } from "@/lib/offline-storage";
import ScrollReveal from "@/components/ui/ScrollReveal";

export async function generateStaticParams() {
  const posts = offlineStorage.getPublishedBlogs();
  return posts.map((post: { slug: string }) => ({ slug: post.slug }));
}

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Blog Post Not Found",
    };
  }

  return {
    title: `${blog.title} | Canaan International Hotel`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: [blog.featured_image || "/images/heroes/Ext-Compund.webp"],
    },
  };
}

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

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const blogs = await getPublishedBlogs();
  const currentIndex = blogs.findIndex((b) => b.id === blog.id);
  const prevPost = currentIndex > 0 ? blogs[currentIndex - 1] : null;
  const nextPost = currentIndex < blogs.length - 1 ? blogs[currentIndex + 1] : null;

  return (
    <div className="flex flex-1 flex-col items-center">
      <article className="w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <Link
          href="/blog"
          className="text-bronze hover:underline text-sm mb-6 inline-block"
        >
          ← Back to Journal
        </Link>

        <ScrollReveal>
          <header className="mb-8">
            <span className="inline-block px-3 py-1 bg-cactus/10 text-cactus text-xs uppercase tracking-widest font-bold mb-4">
              {deriveCategory(blog.title)}
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-forest mb-4">
              {blog.title}
            </h1>
            <div className="flex items-center gap-4 text-cactus text-sm">
              <span>{readingTime(blog.content)}</span>
              <span>•</span>
              <span>{blog.author}</span>
              <span>•</span>
              <span>
                {blog.published_at
                  ? new Date(blog.published_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : ""}
              </span>
            </div>
          </header>
        </ScrollReveal>

        {blog.featured_image && (
          <ScrollReveal>
            <div className="relative h-[28rem] w-full mb-8 overflow-hidden">
              <Image
                src={blog.featured_image}
                alt={blog.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 896px) 100vw, 832px"
              />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </ScrollReveal>
        )}

        {blog.excerpt && (
          <ScrollReveal>
            <blockquote className="border-l-4 border-bronze pl-6 italic text-lg text-text-secondary mb-8">
              {blog.excerpt}
            </blockquote>
          </ScrollReveal>
        )}

        <ScrollReveal>
          <div
            className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-forest prose-p:text-text-secondary prose-a:text-bronze"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </ScrollReveal>

        {/* Post Navigation - already computed, just render */}
        {(prevPost || nextPost) && (
          <ScrollReveal>
            <nav className="mt-16 pt-8 border-t border-forest/10 grid grid-cols-2 gap-8">
              {prevPost ? (
                <Link href={`/blog/${prevPost.slug}`} className="group">
                  <span className="text-xs uppercase tracking-widest text-cactus">← Previous</span>
                  <p className="mt-1 font-serif text-forest group-hover:text-bronze transition-colors line-clamp-2">
                    {prevPost.title}
                  </p>
                </Link>
              ) : <div />}
              {nextPost && (
                <Link href={`/blog/${nextPost.slug}`} className="group text-right">
                  <span className="text-xs uppercase tracking-widest text-cactus">Next →</span>
                  <p className="mt-1 font-serif text-forest group-hover:text-bronze transition-colors line-clamp-2">
                    {nextPost.title}
                  </p>
                </Link>
              )}
            </nav>
          </ScrollReveal>
        )}

        <div className="mt-12 pt-8 border-t border-forest/10">
          <Link
            href="/blog"
            className="text-bronze hover:underline font-medium"
          >
            ← Back to Journal
          </Link>
        </div>
      </article>
    </div>
  );
}