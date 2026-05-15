"use client";

import { useState } from "react";
import RoomCard from "@/components/RoomCard";
import { FEATURED_ROOMS, FeaturedRoom } from "@/lib/featuredRooms";
import { ROOM_TYPES } from "@/lib/roomTypes";

type FilterType = 'all' | 'budget' | 'standard' | 'premium' | 'suite';

const FILTER_CONFIG: Record<FilterType, { label: string; priceRange: string; slugs: string[] }> = {
  'all': { label: 'All Rooms', priceRange: '', slugs: [] },
  'budget': { label: 'Budget', priceRange: '$25-$32', slugs: ['standard', 'delux'] },
  'standard': { label: 'Standard', priceRange: '$40-$45', slugs: ['king', 'twin'] },
  'premium': { label: 'Premium', priceRange: '$50', slugs: ['semi-suit'] },
  'suite': { label: 'Suite', priceRange: '$55', slugs: ['suit'] },
};

export default function RoomsClient() {
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredRooms: FeaturedRoom[] = FEATURED_ROOMS.filter((room) => {
    if (filter === 'all') return true;
    const config = FILTER_CONFIG[filter];
    return config.slugs.includes(room.slug);
  });

  const filters: { value: FilterType; label: string; priceRange: string }[] = [
    { value: 'all', label: 'All Rooms', priceRange: '' },
    { value: 'budget', label: 'Budget', priceRange: '$25-$32' },
    { value: 'standard', label: 'Standard', priceRange: '$40-$45' },
    { value: 'premium', label: 'Premium', priceRange: '$50' },
    { value: 'suite', label: 'Suite', priceRange: '$55' },
  ];

  return (
    <>
      {/* Filter Buttons */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
              filter === f.value
                ? 'bg-cactus text-white'
                : 'bg-white text-forest border border-slate-200 hover:border-cactus hover:bg-sandstone/50'
            }`}
          >
            {f.label}
            {f.priceRange && (
              <span className={`ml-2 text-xs ${filter === f.value ? 'text-white/70' : 'text-slate-400'}`}>
                {f.priceRange}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Room Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {filteredRooms.map((room) => (
          <RoomCard
            key={room.slug}
            slug={room.slug}
            imageSrc={room.imageSrc}
            imageAlt={room.imageAlt}
            name={room.name}
            description={room.description}
            priceLabel={room.priceLabel}
            badges={room.badges}
            rating={room.rating}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredRooms.length === 0 && (
        <div className="text-center py-16">
          <p className="text-slate-500">No rooms found for this filter.</p>
        </div>
      )}
    </>
  );
}