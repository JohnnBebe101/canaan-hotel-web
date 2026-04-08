import type { Metadata } from "next/types";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedBlogs, getBlogBySlug } from "@/lib/blog-store";
import { offlineStorage } from "@/lib/offline-storage";

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
  const nextPost = currentIndex > 0 ? blogs[currentIndex - 1] : null;
  const prevPost = currentIndex < blogs.length - 1 ? blogs[currentIndex + 1] : null;

  return (
    <main id="main-content" className="flex flex-1 flex-col items-center">
      <article className="w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <Link
          href="/blog"
          className="text-primary hover:underline text-sm mb-6 inline-block"
        >
          ← Back to Journal
        </Link>

        <header className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-text-primary dark:text-background-light mb-4">
            {blog.title}
          </h1>
          <div className="flex items-center gap-4 text-text-secondary dark:text-text-secondary/70">
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

        {blog.featured_image && (
          <div className="relative h-96 w-full mb-8 rounded-xl overflow-hidden">
            <Image
              src={blog.featured_image}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {blog.excerpt && (
          <p className="text-xl text-text-secondary dark:text-text-secondary/90 mb-8 italic">
            {blog.excerpt}
          </p>
        )}

        <div
          className="prose prose-lg max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        <div className="mt-12 pt-8 border-t border-border-color dark:border-text-secondary/20">
          <Link
            href="/blog"
            className="text-primary hover:underline font-medium"
          >
            ← Back to Journal
          </Link>
        </div>
      </article>
    </main>
  );
}
