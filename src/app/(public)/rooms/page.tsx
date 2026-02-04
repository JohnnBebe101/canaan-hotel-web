"use client";

import RoomCard from "@/components/RoomCard";
import { FEATURED_ROOMS } from "@/lib/featuredRooms";

export default function RoomsPage() {
  return (
    <main className="flex-1 px-4 sm:px-10 lg:px-20 py-10 sm:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap justify-between gap-3 mb-8">
          <div className="flex min-w-72 flex-col gap-3">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-black leading-tight tracking-[-0.033em] text-text-primary dark:text-background-light">
                  Rooms & Suites
                </h1>
                <p className="text-base font-normal leading-normal text-text-secondary dark:text-text-secondary/90">
                  Discover our comfortable accommodations designed for your perfect stay.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-background-light dark:bg-background-dark/80 pl-4 pr-3 border border-border-color dark:border-text-secondary/20 hover:border-text-primary/50 dark:hover:border-text-primary/50 transition-colors">
              <p className="text-text-primary dark:text-background-light text-sm font-medium leading-normal">
                Price
              </p>
              <span className="material-symbols-outlined text-text-secondary dark:text-gray-400 text-base">
                expand_more
              </span>
            </button>
            <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-background-light dark:bg-background-dark/80 pl-4 pr-3 border border-border-color dark:border-text-secondary/20 hover:border-text-primary/50 dark:hover:border-text-primary/50 transition-colors">
              <p className="text-text-primary dark:text-background-light text-sm font-medium leading-normal">
                Beds
              </p>
              <span className="material-symbols-outlined text-text-secondary dark:text-gray-400 text-base">
                expand_more
              </span>
            </button>
            <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-background-light dark:bg-background-dark/80 pl-4 pr-3 border border-border-color dark:border-text-secondary/20 hover:border-text-primary/50 dark:hover:border-text-primary/50 transition-colors">
              <p className="text-text-primary dark:text-background-light text-sm font-medium leading-normal">
                Amenities
              </p>
              <span className="material-symbols-outlined text-text-secondary dark:text-gray-400 text-base">
                expand_more
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_ROOMS.map((room) => (
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
      </div>
    </main>
  );
}