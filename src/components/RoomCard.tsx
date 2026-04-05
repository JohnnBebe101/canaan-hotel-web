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
        <div className="absolute top-4 right-4">
          {/* Price Tag - Elegant */}
          <div className="bg-sandstone/90 backdrop-blur-md px-4 py-2 text-[10px] uppercase tracking-widest font-bold text-forest shadow-lg border border-white/20">
            {priceLabel}
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-8 bg-white relative">
        {/* Decorative top border */}
        <div className="absolute top-0 left-8 right-8 h-px bg-forest/5 group-hover:bg-cactus/30 transition-colors duration-500"></div>

        {badges.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {badges.map((badge) => (
              <Badge key={badge} variant="cactus" size="xs">
                {badge}
              </Badge>
            ))}
          </div>
        )}

        <h3 className="text-2xl font-serif text-forest mb-3 line-clamp-1 group-hover:text-cactus transition-colors duration-300">
          {name}
        </h3>

        <p className="text-sm leading-relaxed text-gray-500 font-light line-clamp-3 mb-6">
          {description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-6 border-t border-forest/5">
          {typeof rating === "number" ? (
            <div className="flex items-center gap-2">
              <StarRating rating={rating} iconSize="text-sm" />
              <span className="text-[10px] uppercase tracking-widest font-bold text-cactus">
                {rating.toFixed(1)} / 5.0
              </span>
            </div>
          ) : (
            <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
              Sanctuary Choice
            </span>
          )}

          <Link
            href={`/rooms/${slug}`}
            className="group/btn inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-forest hover:text-cactus transition-colors"
          >
            <span>View Room</span>
            <Icon name="arrow_forward" className="text-base transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
export default React.memo(RoomCard);
