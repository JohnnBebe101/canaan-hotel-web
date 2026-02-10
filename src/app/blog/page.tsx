import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getPublishedBlogs } from "@/lib/blog-store";

export const metadata: Metadata = {
  title: "Blog | Canaan International Hotel",
  description: "Discover travel tips, local attractions, and stories from Adigrat and Tigray.",
};

export default async function BlogPage() {
  const blogs = await getPublishedBlogs();

  return (
    <main id="main-content" className="flex flex-1 flex-col items-center">
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-text-primary dark:text-background-light mb-4">
            Our Blog
          </h1>
          <p className="mx-auto max-w-2xl text-text-secondary dark:text-text-secondary/90">
            Discover travel tips, local attractions, and stories from Adigrat and Tigray.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.slug}`}
              className="group block bg-white dark:bg-background-light/5 rounded-xl overflow-hidden shadow-sm border border-border-color dark:border-text-secondary/10 hover:shadow-md transition-shadow"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={blog.featured_image || "/images/Adigrat.svg"}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs text-text-secondary dark:text-text-secondary/70">
                    {blog.published_at
                      ? new Date(blog.published_at).toLocaleDateString()
                      : ""}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-text-primary dark:text-background-light mb-2 group-hover:text-primary transition-colors">
                  {blog.title}
                </h2>
                <p className="text-sm text-text-secondary dark:text-text-secondary/90 line-clamp-3">
                  {blog.excerpt}
                </p>
                <span className="inline-block mt-4 text-primary font-medium text-sm group-hover:underline">
                  Read More →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {blogs.length === 0 && (
          <div className="text-center py-16">
            <p className="text-text-secondary dark:text-text-secondary/90">
              No blog posts yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
