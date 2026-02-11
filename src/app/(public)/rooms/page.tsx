import { Metadata } from "next";
import RoomCard from "@/components/RoomCard";
import { FEATURED_ROOMS } from "@/lib/featuredRooms";

export const metadata: Metadata = {
  title: "Our Rooms & Suites | Canaan International Hotel",
  description: "Explore our diverse range of accommodations in Adigrat, from economy singles to deluxe suites. Find the perfect room for your stay in Tigray.",
  openGraph: {
    title: "Accommodations at Canaan International Hotel - Adigrat",
    description: "Discover comfortable and elegant rooms designed for a restful stay. Book direct for the best available rates.",
    images: ["/images/Compound.svg"],
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

        <section className="mb-12" aria-labelledby="amenities">
          <h2 id="amenities" className="text-2xl font-bold tracking-tight text-text-primary dark:text-background-light mb-6">
            Essential Professional Amenities
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: "wifi", text: "High-Speed WiFi" },
              { icon: "restaurant", text: "Breakfast Included" },
              { icon: "concierge", text: "24/7 Front Desk" },
              { icon: "local_parking", text: "Secure Parking" },
              { icon: "ac_unit", text: "Air Conditioning" },
              { icon: "room_service", text: "Room Service" },
            ].map((amenity) => (
              <div
                key={amenity.text}
                className="flex items-center gap-3 p-4 rounded-lg bg-background-light dark:bg-background-dark/50 border border-border-color dark:border-text-secondary/20"
              >
                <span className="material-symbols-outlined text-primary">{amenity.icon}</span>
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