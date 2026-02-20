import { Metadata } from "next";
import Link from "next/link";
import OptimizedImage from "@/components/OptimizedImage";
import RoomBookingForm from "@/components/RoomBookingForm";
import { FEATURED_ROOMS } from "@/lib/featuredRooms";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const room = FEATURED_ROOMS.find(r => r.slug === id);

  if (!room) {
    return {
      title: "Room Not Found | Canaan International Hotel",
    };
  }

  return {
    title: `${room.name} | Canaan International Hotel`,
    description: room.description,
    openGraph: {
      title: `${room.name} - Luxury Accommodation in Adigrat`,
      description: room.description,
      images: [room.imageSrc],
    },
  };
}

export default async function RoomDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const room = FEATURED_ROOMS.find(r => r.slug === id);

  return (
    <main className="flex-1 px-4 sm:px-10 lg:px-20 py-10 sm:py-16">
      <div className="mx-auto max-w-7xl">
        {/* Back Link */}
        <Link href="/rooms" className="inline-flex items-center gap-2 text-sm font-bold text-text-secondary hover:text-primary transition-colors mb-8">
          <span className="material-symbols-outlined text-base">arrow_back</span>
          All Rooms
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Gallery */}
          <div className="lg:col-span-3">
            <div className="relative w-full">
              <div className="relative w-full overflow-hidden rounded-xl aspect-[4/3]">
                <OptimizedImage
                  className="w-full h-full object-cover"
                  alt={`${room?.name || 'Hotel room'} - ${room?.description || 'Comfortable accommodation'}`}
                  src={room?.imageSrc || "/images/rooms/single-room-view.webp"}
                  width={800}
                  height={600}
                  priority
                />
              </div>
              <div className="mt-3 grid grid-cols-5 gap-3">
                <div className="overflow-hidden rounded-lg aspect-square">
                  <OptimizedImage
                    className="w-full h-full object-cover cursor-pointer border-2 border-primary"
                    alt="Bedroom view"
                    src="/images/rooms/single-room-best-view.webp"
                    width={200}
                    height={200}
                    loading="lazy"
                  />
                </div>
                <div className="overflow-hidden rounded-lg aspect-square">
                  <OptimizedImage
                    className="w-full h-full object-cover cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
                    alt="Room amenities"
                    src="/images/rooms/corridor-rooms.webp"
                    width={200}
                    height={200}
                    loading="lazy"
                  />
                </div>
                <div className="overflow-hidden rounded-lg aspect-square">
                  <OptimizedImage
                    className="w-full h-full object-cover cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
                    alt="Bathroom facilities"
                    src="/images/rooms/bath-room.webp"
                    width={200}
                    height={200}
                    loading="lazy"
                  />
                </div>
                <div className="overflow-hidden rounded-lg aspect-square">
                  <OptimizedImage
                    className="w-full h-full object-cover cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
                    alt="The view from the hotel room window."
                    src="/images/rooms/Bed-view-Single.webp"
                    width={200}
                    height={200}
                    loading="lazy"
                  />
                </div>
                <div className="overflow-hidden rounded-lg aspect-square">
                  <div className="w-full h-full bg-black/50 flex items-center justify-center cursor-pointer hover:bg-black/60 transition-colors rounded-lg">
                    <span className="text-white font-bold text-lg">+5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-2 mt-8 lg:mt-0">
            <div className="sticky top-24">
              <RoomBookingForm pricePerNight={room?.pricePerNight ?? 120} />
            </div>
          </div>
        </div>

        {/* Room Details */}
        <div className="mt-12">
          <div className="flex flex-col gap-6">
            <div>
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-4xl font-black leading-tight tracking-tighter text-primary dark:text-white">
                  {room?.name || "Comfort Double"}
                </h1>
              </div>
              <p className="mt-4 text-base font-normal leading-relaxed text-text-secondary dark:text-gray-300">
                {room?.description || "Experience unparalleled comfort in our spacious room. Perfect for couples or business travelers."}
              </p>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700"></div>

            <div>
              <h3 className="text-xl font-bold text-primary dark:text-white">Key Amenities</h3>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-4">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">wifi</span>
                  <span className="text-sm font-medium">Free WiFi</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">free_breakfast</span>
                  <span className="text-sm font-medium">Continental Breakfast</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">shower</span>
                  <span className="text-sm font-medium">Rainfall Showerhead</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">ac_unit</span>
                  <span className="text-sm font-medium">Air Conditioning</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">tv</span>
                  <span className="text-sm font-medium">Flat-screen TV</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">lock</span>
                  <span className="text-sm font-medium">In-room Safe</span>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700"></div>

            <div>
              <h3 className="text-xl font-bold text-primary dark:text-white">What Our Guests Say</h3>
              <div className="mt-4 flex flex-col gap-6">
                <div className="border-l-4 border-primary pl-4">
                  <p className="italic text-text-secondary dark:text-gray-300">
                    &quot;Absolutely wonderful stay. The room was immaculate and the service was top-notch. Highly recommended for anyone visiting Adigrat.&quot;
                  </p>
                  <p className="mt-2 font-bold text-sm">— Jane D.</p>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <p className="italic text-text-secondary dark:text-gray-300">
                    &quot;A true gem in the heart of the city. Comfortable, clean, and convenient. The booking process was seamless. We&apos;ll be back!&quot;
                  </p>
                  <p className="mt-2 font-bold text-sm">— Mark S.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}