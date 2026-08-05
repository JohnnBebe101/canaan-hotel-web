import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedBlogs } from "@/lib/blog-store";
import { getAttractions } from "@/lib/attraction-store";
import { FEATURED_ROOMS } from "@/lib/featuredRooms";

export const metadata: Metadata = {
  title: "Search | Canaan International Hotel",
  robots: { index: false, follow: false },
};

async function search(query: string) {
  const q = query.toLowerCase().trim();

  if (!q) {
    return { q, rooms: [], blogs: [], attractions: [] };
  }

  const [blogs, attractions] = await Promise.all([
    getPublishedBlogs(),
    getAttractions(),
  ]);

  const rooms = FEATURED_ROOMS.filter(
    (r) =>
      r.name.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q)
  );

  const blogHits = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(q) ||
      (b.excerpt || "").toLowerCase().includes(q)
  );

  const attractionHits = attractions.filter(
    (a) =>
      a.name.toLowerCase().includes(q) ||
      (a.description || "").toLowerCase().includes(q)
  );

  return { q, rooms, blogs: blogHits, attractions: attractionHits };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const { rooms, blogs, attractions } = await search(q);
  const total = rooms.length + blogs.length + attractions.length;

  return (
    <main className="min-h-screen bg-sandstone px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <form role="search" action="/search" method="get" className="mb-10">
          <input
            type="search"
            name="q"
            defaultValue={q}
            placeholder="Search rooms, blog posts, attractions…"
            aria-label="Search"
            className="w-full rounded-xl border border-cactus/30 bg-white px-5 py-3 text-forest outline-none focus:border-bronze"
          />
        </form>

        <h1 className="mb-2 font-serif text-3xl font-bold text-forest">
          {q ? `Results for "${q}"` : "Search"}
        </h1>
        <p className="mb-8 text-sm text-forest/60">
          {q
            ? `${total} result${total === 1 ? "" : "s"} found`
            : "Type a query above to search the site."}
        </p>

        {q && total === 0 && (
          <p className="text-forest/70">No results matched your search.</p>
        )}

        {rooms.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-bronze">
              Rooms & Suites
            </h2>
            <ul className="space-y-3">
              {rooms.map((room) => (
                <li key={room.slug}>
                  <Link
                    href={`/rooms/${room.slug}`}
                    className="block rounded-xl border border-cactus/15 bg-white p-5 transition-colors hover:border-bronze/40"
                  >
                    <h3 className="font-serif text-lg font-semibold text-forest">
                      {room.name}
                    </h3>
                    <p className="mt-1 text-sm text-forest/60">
                      {room.description}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {blogs.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-bronze">
              Journal
            </h2>
            <ul className="space-y-3">
              {blogs.map((blog) => (
                <li key={blog.id}>
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="block rounded-xl border border-cactus/15 bg-white p-5 transition-colors hover:border-bronze/40"
                  >
                    <h3 className="font-serif text-lg font-semibold text-forest">
                      {blog.title}
                    </h3>
                    <p className="mt-1 text-sm text-forest/60">
                      {blog.excerpt}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {attractions.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-bronze">
              Attractions
            </h2>
            <ul className="space-y-3">
              {attractions.map((attraction) => (
                <li key={attraction.id}>
                  <Link
                    href="/attractions"
                    className="block rounded-xl border border-cactus/15 bg-white p-5 transition-colors hover:border-bronze/40"
                  >
                    <h3 className="font-serif text-lg font-semibold text-forest">
                      {attraction.name}
                    </h3>
                    <p className="mt-1 text-sm text-forest/60">
                      {attraction.description}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}