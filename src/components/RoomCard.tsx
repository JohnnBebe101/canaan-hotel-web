"use client";

import Link from "next/link";
import OptimizedImage from "./OptimizedImage";

interface RoomCardProps {
  slug: string; // e.g. "economy-single"
  imageSrc: string;
  imageAlt: string;
  name: string;
  description: string;
  priceLabel: string; // e.g. "From $75 / night"
  badges?: string[];
  rating?: number;
}

export default function RoomCard({
  slug,
  imageSrc,
  imageAlt,
  name,
  description,
  priceLabel,
  badges = [],
  rating,
}: RoomCardProps) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border-color bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-text-secondary/20 dark:bg-background-dark/70">
      <div className="relative overflow-hidden">
        <OptimizedImage
          src={imageSrc}
          alt={imageAlt}
          width={640}
          height={400}
          className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
          quality={80}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/0" />
        <div className="absolute bottom-3 left-3 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white shadow-sm backdrop-blur">
          {priceLabel}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        {badges.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {badges.map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary dark:text-primary"
              >
                {badge}
              </span>
            ))}
          </div>
        )}

        <h3 className="text-lg font-semibold leading-snug text-text-primary dark:text-background-light line-clamp-2 text-primary">
          {name}
        </h3>

        <p className="text-sm leading-relaxed text-text-secondary dark:text-text-secondary/90 line-clamp-3">
          {description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-3">
          {typeof rating === "number" ? (
            <div className="flex items-center gap-1 text-xs">
              <StarRating rating={rating} />
              <span className="text-text-secondary dark:text-text-secondary/80">
                {rating.toFixed(1)}
              </span>
            </div>
          ) : (
            <span className="text-xs font-medium text-text-secondary/80 dark:text-text-secondary/80">
              Popular choice
            </span>
          )}

          <Link
            href={`/rooms/${slug}`}
            className="inline-flex items-center gap-1 rounded-full bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-sm transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Book now
            <span aria-hidden="true" className="text-[0.9rem]">
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}

function StarRating({ rating }: { rating: number }) {
  const stars = 5;
  const filled = Math.round(rating);

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: stars }).map((_, index) => {
        const isFilled = index < filled;
        return (
          <svg
            key={index}
            className={`h-3.5 w-3.5 ${
              isFilled ? "text-primary" : "text-gray-300 dark:text-gray-600"
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.18 3.63a1 1 0 00.95.69h3.813c.969 0 1.371 1.24.588 1.81l-3.085 2.24a1 1 0 00-.364 1.118l1.18 3.63c.3.921-.755 1.688-1.54 1.118l-3.085-2.24a1 1 0 00-1.176 0l-3.085 2.24c-.785.57-1.84-.197-1.54-1.118l1.18-3.63a1 1 0 00-.364-1.118L2.518 9.057c-.783-.57-.38-1.81.588-1.81h3.813a1 1 0 00.95-.69l1.18-3.63z" />
          </svg>
        );
      })}
    </div>
  );
}

