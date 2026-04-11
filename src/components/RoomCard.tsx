"use client";

import Link from "next/link";
import React from "react";
import OptimizedImage from "./OptimizedImage";
import StarRating from "./ui/StarRating";
import Badge from "./ui/Badge";
import { Icon } from "@/components/ui/Icons";

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

function RoomCard({
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
    <article className="group relative flex flex-col overflow-hidden rounded-sm border border-forest/5 bg-white/90 shadow-sm transition-all duration-700 hover:-translate-y-1 hover:shadow-2xl hover:border-cactus/20">
      <div className="relative overflow-hidden aspect-[4/3]">
        <OptimizedImage
          src={imageSrc}
          alt={imageAlt}
          width={640}
          height={400}
          className="h-full w-full object-cover transition-transform duration-[1.5s] ease-in-out group-hover:scale-110 grayscale-[10%] group-hover:grayscale-0"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
          quality={80}
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
        <div className="absolute top-3 left-3">
          <div className="bg-white/90 backdrop-blur-sm text-stone-800 text-sm font-semibold px-3 py-1 rounded-full shadow-sm">
            {priceLabel}
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5 gap-3">
        {badges.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {badges.slice(0, 3).map((badge) => (
              <Badge key={badge} variant="cactus" size="xs">
                {badge}
              </Badge>
            ))}
          </div>
        )}

        <h3 className="text-lg font-semibold text-stone-800 leading-snug">
          {name}
        </h3>

        <p className="text-sm text-stone-500 leading-relaxed line-clamp-2">
          {description}
        </p>

<div className="mt-auto flex items-center justify-between">
          {typeof rating === "number" ? (
            <div className="flex items-center gap-2">
              <StarRating rating={rating} iconSize="text-sm" />
              <span className="text-sm text-stone-600">
                {rating.toFixed(1)}
              </span>
            </div>
          ) : (
            <span className="text-sm text-stone-400">
              Sanctuary Choice
            </span>
          )}

          <Link
            href={`/rooms/${slug}`}
            className="text-sm font-medium text-amber-700 hover:text-amber-900 underline underline-offset-2 transition-colors"
          >
            View Room →
          </Link>
        </div>
      </div>
    </article>
  );
}
export default React.memo(RoomCard);
