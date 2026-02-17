import Link from "next/link";
import Image from "next/image";
import { getLatestBlogs } from "@/lib/blog-store";

export default async function BlogSection() {
  const blogs = await getLatestBlogs(2);

  if (blogs.length === 0) {
    return null;
  }

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="latest-blogs">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 id="latest-blogs" className="text-3xl font-bold tracking-tight text-text-primary dark:text-background-light mb-4">
            Latest from Our Blog
          </h2>
          <p className="mx-auto max-w-2xl text-text-secondary dark:text-text-secondary/90">
            Discover travel tips and local attractions in Adigrat and Tigray.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {blogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.slug}`}
              className="group block bg-white dark:bg-background-light/5 rounded-xl overflow-hidden shadow-sm border border-border-color dark:border-text-secondary/10 hover:shadow-md transition-shadow"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={blog.featured_image || "/images/heroes/Ext-Compund.webp"}
                  alt={blog.title}
                  fill
                  loading="lazy"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-text-secondary dark:text-text-secondary/70">
                    {blog.published_at
                      ? new Date(blog.published_at).toLocaleDateString()
                      : ""}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-text-primary dark:text-background-light mb-2 group-hover:text-primary transition-colors">
                  {blog.title}
                </h3>
                <p className="text-sm text-text-secondary dark:text-text-secondary/90 line-clamp-2">
                  {blog.excerpt}
                </p>
                <span className="inline-block mt-3 text-primary font-medium text-sm group-hover:underline">
                  Read More →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {blogs.length > 0 && (
          <div className="text-center mt-8">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              View All Posts
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
