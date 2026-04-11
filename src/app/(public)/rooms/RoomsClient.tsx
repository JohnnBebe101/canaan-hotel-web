"use client";

import { useState } from "react";
import RoomCard from "@/components/RoomCard";
import { FEATURED_ROOMS, FeaturedRoom } from "@/lib/featuredRooms";

type FilterType = 'all' | 'single' | 'double' | 'family';

export default function RoomsClient() {
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredRooms: FeaturedRoom[] = FEATURED_ROOMS.filter((room) => {
    if (filter === 'all') return true;
    if (filter === 'single') return room.slug.includes('single');
    if (filter === 'double') return room.slug.includes('double');
    if (filter === 'family') return room.slug === 'family-room';
    return true;
  });

  const filters: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'single', label: 'Singles' },
    { value: 'double', label: 'Doubles' },
    { value: 'family', label: 'Family' },
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
                ? 'bg-amber-700 text-white'
                : 'bg-white text-stone-700 border border-stone-200 hover:border-amber-700'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Room Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
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
    </>
  );
}