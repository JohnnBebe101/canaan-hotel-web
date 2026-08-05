import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPublishedBlogs } from "@/lib/blog-store";
import { getAttractions } from "@/lib/attraction-store";
import { FEATURED_ROOMS } from "@/lib/featuredRooms";
import { Icon } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Search | Canaan International Hotel",
  robots: { index: false, follow: false },
};

type ResultType = "rooms" | "blogs" | "attractions";

const POPULAR = ["Gheralta", "King Room", "Breakfast", "Al-Najashi", "Wi-Fi"];

const CHIPS: { label: string; type: ResultType | "all" }[] = [
  { label: "All", type: "all" },
  { label: "Rooms & Suites", type: "rooms" },
  { label: "Journal", type: "blogs" },
  { label: "Attractions", type: "attractions" },
];

function highlight(text: string, q: string) {
  if (!q) return text;
  const index = text.toLowerCase().indexOf(q);
  if (index === -1) return text;
  return (
    <>
      {text.slice(0, index)}
      <mark className="rounded-sm bg-bronze/25 px-0.5 text-forest">
        {text.slice(index, index + q.length)}
      </mark>
      {text.slice(index + q.length)}
    </>
  );
}

interface ResultCardProps {
  href: string;
  badge: string;
  badgeClass: string;
  title: React.ReactNode;
  description: React.ReactNode;
  image?: string;
  alt?: string;
  meta?: React.ReactNode;
}

function ResultCard({ href, badge, badgeClass, title, description, image, alt, meta }: ResultCardProps) {
  return (
    <li>
      <Link
        href={href}
        className="group flex flex-col sm:flex-row overflow-hidden rounded-2xl border border-cactus/15 bg-white transition-colors hover:border-bronze/50"
      >
        <div className="relative h-40 w-full sm:h-auto sm:w-52 shrink-0 overflow-hidden bg-sandstone">
          {image ? (
            <Image
              src={image}
              alt={alt ?? ""}
              fill
              sizes="(max-width: 640px) 100vw, 208px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <Icon name="hotel" className="text-5xl text-cactus/25" />
            </div>
          )}
        </div>
        <div className="flex-1 p-5">
          <div className="mb-2 flex items-center gap-2">
            <span className={`rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest ${badgeClass}`}>
              {badge}
            </span>
          </div>
          <h3 className="font-serif text-lg font-semibold text-forest group-hover:text-cactus transition-colors">
            {title}
          </h3>
          <p className="mt-1 text-sm text-forest/60 leading-relaxed">
            {description}
          </p>
          {meta && <div className="mt-3">{meta}</div>}
        </div>
      </Link>
    </li>
  );
}

const groupMeta = {
  rooms: { badge: "Rooms & Suites", badgeClass: "bg-forest text-sandstone" },
  blogs: { badge: "Journal", badgeClass: "bg-bronze/15 text-bronze" },
  attractions: { badge: "Attractions", badgeClass: "bg-cactus/15 text-cactus" },
} as const;

async function search(query: string, type: string) {
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

  if (type === "rooms") return { q, rooms, blogs: [], attractions: [] };
  if (type === "blogs") return { q, rooms: [], blogs: blogHits, attractions: [] };
  if (type === "attractions") return { q, rooms: [], blogs: [], attractions: attractionHits };

  return { q, rooms, blogs: blogHits, attractions: attractionHits };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; type?: string }>;
}) {
  const { q: rawQ = "", type: rawType = "" } = await searchParams;
  const q = rawQ.trim();
  const type: ResultType | "all" =
    rawType === "rooms" || rawType === "blogs" || rawType === "attractions"
      ? rawType
      : "all";

  const { rooms, blogs, attractions } = await search(q, type);
  const total = rooms.length + blogs.length + attractions.length;

  const buildHref = (chipType: ResultType | "all", chipQ: string = q) => {
    const params = new URLSearchParams();
    if (chipQ) params.set("q", chipQ);
    if (chipType !== "all") params.set("type", chipType);
    const qs = params.toString();
    return qs ? `/search?${qs}` : "/search";
  };

  return (
    <main className="min-h-screen bg-sandstone px-6 pt-32 pb-16 md:pt-36">
      <div className="mx-auto max-w-4xl">
        {/* Search hero band */}
        <section className="mb-8 text-center">
          <p className="text-bronze text-xs font-semibold tracking-[0.3em] uppercase mb-3">
            Search the Hotel
          </p>
          <h1 className="mb-6 font-serif text-4xl md:text-5xl font-bold text-forest">
            {q ? `Results for "${q}"` : "Find What You Need"}
          </h1>
          <form role="search" action="/search" method="get" className="mx-auto max-w-2xl">
            <div className="relative flex items-center">
              <Icon name="search" className="absolute left-5 text-cactus text-xl pointer-events-none" />
              <input
                type="search"
                name="q"
                defaultValue={q}
                placeholder="Search rooms, journal posts, attractions…"
                aria-label="Search the site"
                className="w-full rounded-full border border-cactus/30 bg-white py-4 pl-14 pr-36 text-forest shadow-sm outline-none transition-colors focus:border-bronze"
              />
              <button
                type="submit"
                className="absolute right-2 rounded-full bg-forest px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] text-sandstone transition-colors hover:bg-cactus"
              >
                Search
              </button>
            </div>
          </form>
        </section>

        {/* Category chips */}
        <nav aria-label="Filter results" className="mb-8 flex flex-wrap items-center justify-center gap-2">
          {CHIPS.map((chip) => {
            const isActive = chip.type === type;
            return (
              <Link
                key={chip.type}
                href={buildHref(chip.type)}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors ${
                  isActive
                    ? "border-bronze bg-bronze text-white"
                    : "border-cactus/25 bg-white text-forest hover:border-bronze/50"
                }`}
              >
                {chip.label}
              </Link>
            );
          })}
        </nav>

        {/* Result stats */}
        <p aria-live="polite" className="mb-8 text-center text-sm text-forest/60">
          {q
            ? `${total} result${total === 1 ? "" : "s"} found · Rooms & Suites (${rooms.length}) · Journal (${blogs.length}) · Attractions (${attractions.length})`
            : "Type a query above, or try a popular search."}
        </p>

        {/* Empty state */}
        {!q && (
          <section className="text-center">
            <p className="mb-4 text-sm text-forest/70">Popular searches</p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {POPULAR.map((term) => (
                <Link
                  key={term}
                  href={`/search?q=${encodeURIComponent(term)}`}
                  className="rounded-full border border-cactus/25 bg-white px-4 py-2 text-sm text-forest transition-colors hover:border-bronze/50 hover:bg-bronze/5"
                >
                  {term}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* No-results state */}
        {q && total === 0 && (
          <section className="rounded-2xl border border-cactus/15 bg-white p-10 text-center">
            <h2 className="mb-2 font-serif text-2xl font-bold text-forest">
              No results matched your search
            </h2>
            <p className="mb-6 text-sm text-forest/60">
              Try a different keyword, or browse the hotel directly.
            </p>
            <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
              {POPULAR.map((term) => (
                <Link
                  key={term}
                  href={`/search?q=${encodeURIComponent(term)}`}
                  className="rounded-full border border-cactus/25 bg-white px-4 py-2 text-sm text-forest transition-colors hover:border-bronze/50 hover:bg-bronze/5"
                >
                  {term}
                </Link>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/rooms" className="text-sm font-semibold text-cactus hover:text-forest">
                Browse Rooms & Suites
              </Link>
              <Link href="/blog" className="text-sm font-semibold text-cactus hover:text-forest">
                Read the Journal
              </Link>
              <Link href="/attractions" className="text-sm font-semibold text-cactus hover:text-forest">
                Explore Attractions
              </Link>
            </div>
          </section>
        )}

        {/* Results */}
        {rooms.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-bronze">
              Rooms &amp; Suites
            </h2>
            <ul className="space-y-4">
              {rooms.map((room) => (
                <ResultCard
                  key={room.slug}
                  href={`/rooms/${room.slug}`}
                  badge={groupMeta.rooms.badge}
                  badgeClass={groupMeta.rooms.badgeClass}
                  title={highlight(room.name, q.toLowerCase())}
                  description={highlight(room.description, q.toLowerCase())}
                  image={room.imageSrc}
                  alt={room.imageAlt}
                  meta={
                    <div className="flex flex-wrap items-center gap-3 text-sm">
                      <span className="font-semibold text-forest">{room.priceLabel}</span>
                      <span className="flex items-center gap-1 text-cactus">
                        <Icon name="star" className="text-sm" />
                        {room.rating}
                      </span>
                    </div>
                  }
                />
              ))}
            </ul>
          </section>
        )}

        {blogs.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-bronze">
              Journal
            </h2>
            <ul className="space-y-4">
              {blogs.map((blog) => (
                <ResultCard
                  key={blog.id}
                  href={`/blog/${blog.slug}`}
                  badge={groupMeta.blogs.badge}
                  badgeClass={groupMeta.blogs.badgeClass}
                  title={highlight(blog.title, q.toLowerCase())}
                  description={highlight(blog.excerpt, q.toLowerCase())}
                  image={blog.featured_image}
                  alt={blog.title}
                />
              ))}
            </ul>
          </section>
        )}

        {attractions.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-bronze">
              Attractions
            </h2>
            <ul className="space-y-4">
              {attractions.map((attraction) => (
                <ResultCard
                  key={attraction.id}
                  href="/attractions"
                  badge={groupMeta.attractions.badge}
                  badgeClass={groupMeta.attractions.badgeClass}
                  title={highlight(attraction.name, q.toLowerCase())}
                  description={highlight(attraction.description, q.toLowerCase())}
                  image={attraction.image}
                  alt={attraction.name}
                  meta={
                    attraction.distance ? (
                      <span className="text-xs font-semibold uppercase tracking-widest text-cactus">
                        {attraction.distance}
                      </span>
                    ) : undefined
                  }
                />
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}
