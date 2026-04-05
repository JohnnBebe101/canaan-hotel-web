import type { Metadata } from "next/types";
import RoomCard from "@/components/RoomCard";
import { FEATURED_ROOMS } from "@/lib/featuredRooms";
import { Icon } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Our Rooms & Suites | Canaan International Hotel",
  description: "Explore our diverse range of accommodations in Adigrat, from economy singles to deluxe suites. Find the perfect room for your stay in Tigray.",
  openGraph: {
    title: "Accommodations at Canaan International Hotel - Adigrat",
    description: "Discover comfortable and elegant rooms designed for a restful stay. Book direct for the best available rates.",
    images: ["/images/heroes/Ext-Compund.webp"],
  },
};

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
                  24 guestrooms in the heart of Adigrat.
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
              <Icon name="expand_more" className="text-text-secondary dark:text-gray-400 text-base" />
            </button>
            <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-background-light dark:bg-background-dark/80 pl-4 pr-3 border border-border-color dark:border-text-secondary/20 hover:border-text-primary/50 dark:hover:border-text-primary/50 transition-colors">
              <p className="text-text-primary dark:text-background-light text-sm font-medium leading-normal">
                Beds
              </p>
              <Icon name="expand_more" className="text-text-secondary dark:text-gray-400 text-base" />
            </button>
            <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-background-light dark:bg-background-dark/80 pl-4 pr-3 border border-border-color dark:border-text-secondary/20 hover:border-text-primary/50 dark:hover:border-text-primary/50 transition-colors">
              <p className="text-text-primary dark:text-background-light text-sm font-medium leading-normal">
                Amenities
              </p>
              <Icon name="expand_more" className="text-text-secondary dark:text-gray-400 text-base" />
            </button>
          </div>
        </div>

        <section className="mb-12" aria-labelledby="amenities">
          <h2 id="amenities" className="text-2xl font-bold tracking-tight text-text-primary dark:text-background-light mb-6">
            What's Included in Every Room
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: "wifi", text: "Free Wi-Fi in Every Room" },
              { icon: "restaurant", text: "Complimentary Breakfast (6AM-10AM)" },
              { icon: "concierge", text: "24-Hour Front Desk" },
              { icon: "local_parking", text: "Free On-Site Parking" },
              { icon: "ac_unit", text: "Climate Control" },
              { icon: "room_service", text: "Restaurant & Bar On-Site" },
            ].map((amenity) => (
              <div
                key={amenity.text}
                className="flex items-center gap-3 p-4 rounded-lg bg-background-light dark:bg-background-dark/50 border border-border-color dark:border-text-secondary/20"
              >
                <Icon name={amenity.icon as any} className="text-primary" />
                <span className="text-sm font-medium text-text-primary dark:text-background-light">
                  {amenity.text}
                </span>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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