import type { Metadata } from "next/types";
import { notFound } from "next/navigation";
import OptimizedImage from "@/components/OptimizedImage";
import RoomBookingForm from "@/components/RoomBookingForm";
import RoomCard from "@/components/RoomCard";
import { FEATURED_ROOMS } from "@/lib/featuredRooms";
import { getRoomImagePath } from "@/lib/roomTypes";
import { Icon } from "@/components/ui/Icons";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { canonical } from "@/lib/seo";

export async function generateStaticParams() {
  return FEATURED_ROOMS.map((room: { slug: string }) => ({
    id: room.slug,
  }));
}

export const dynamic = 'force-static';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const room = FEATURED_ROOMS.find(r => r.slug === id);

  if (!room) {
    return {
      title: "Room Not Found",
    };
  }

  return {
    title: room.name,
    description: room.description,
    alternates: { canonical: canonical(`/rooms/${room.slug}`) },
    openGraph: {
      title: room.name,
      description: room.description,
      images: [room.imageSrc],
    },
  };
}

const roomGallery: Record<string, string[]> = {
  'standard': ['standard-primary.jpg', 'standard-gallery-01.jpg', 'standard-gallery-02.jpg', 'standard-gallery-03.jpg'],
  'delux': ['deluxe-primary.jpg', 'deluxe-gallery-01.jpg', 'deluxe-gallery-02.jpg', 'deluxe-gallery-03.jpg'],
  'king': ['king-primary.jpg', 'king-gallery-01.jpg', 'king-gallery-02.jpg', 'king-gallery-03.jpg'],
  'twin': ['twin-primary.jpg', 'twin-gallery-01.jpg', 'twin-gallery-02.jpg', 'twin-gallery-03.jpg'],
  'semi-suit': ['semi-suite-primary.jpg', 'semi-suite-gallery-01.jpg', 'semi-suite-gallery-02.jpg', 'semi-suite-gallery-03.jpg'],
  'suit': ['suite-primary.jpg', 'suite-gallery-01.jpg', 'suite-gallery-02.jpg', 'suite-gallery-03.jpg'],
};

export default async function RoomDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const room = FEATURED_ROOMS.find(r => r.slug === id);

  if (!room) {
    notFound();
  }

  const galleryImages = roomGallery[room.slug] ?? [room.imageSrc, room.imageSrc, room.imageSrc];
  const otherRooms = FEATURED_ROOMS.filter(r => r.slug !== room.slug).slice(0, 3);

  return (
    <main className="flex-1 px-4 sm:px-10 lg:px-20 py-10 sm:py-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">
        {/* Left Column: Gallery + Details */}
        <div>
          <Breadcrumbs
            items={[
              { name: "Rooms & Suites", href: "/rooms" },
              { name: room.name },
            ]}
          />

          {/* Gallery */}
          <div className="relative w-full overflow-hidden rounded-xl aspect-[4/3] mb-4">
            <OptimizedImage
              className="w-full h-full object-cover"
              alt={room.name}
              src={room.imageSrc}
              width={800}
              height={600}
            />
          </div>
          <div className="grid grid-cols-3 gap-2 rounded-2xl overflow-hidden">
            {galleryImages.map((src, i) => (
              <div key={i} className="relative aspect-square h-full">
                <OptimizedImage 
                  src={getRoomImagePath(room.slug, src)} 
                  alt={`${room.name} view ${i+1}`} 
                  fill 
                  className="object-cover" 
                />
              </div>
            ))}
          </div>

          {/* Room Details */}
          <div className="mt-10">
            <h1 className="text-3xl font-bold text-stone-800 mb-4">
              {room.name}
            </h1>
            <p className="text-stone-600 leading-relaxed mb-6">
              {room.description}
            </p>

            {/* Key Amenities */}
            <div className="border-t border-stone-200 pt-6 mb-6">
              <h3 className="text-lg font-semibold text-stone-800 mb-4">Key Amenities</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {room.badges.map((badge) => (
                  <div key={badge} className="flex items-center gap-2">
                    <Icon name="check_circle" className="text-green-600" />
                    <span className="text-sm text-stone-600">{badge}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Guest Reviews */}
            <div className="border-t border-stone-200 pt-6">
              <h3 className="text-lg font-semibold text-stone-800 mb-4">What Our Guests Say</h3>
              <div className="flex flex-col gap-4">
                <div className="border-l-4 border-amber-700 pl-4">
                  <p className="text-stone-600 italic">&ldquo;Absolutely wonderful stay. The room was immaculate and the service was top-notch.&rdquo;</p>
                  <p className="mt-2 font-bold text-sm">— Jane D.</p>
                </div>
                <div className="border-l-4 border-amber-700 pl-4">
                  <p className="text-stone-600 italic">&ldquo;A true gem in the heart of the city. Comfortable and convenient.&rdquo;</p>
                  <p className="mt-2 font-bold text-sm">— Mark S.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Booking Form */}
        <div className="lg:sticky lg:top-24">
          <RoomBookingForm pricePerNight={room.pricePerNight} roomName={room.name} roomSlug={room.slug} />
        </div>
      </div>

      {/* Other Rooms */}
      {otherRooms.length > 0 && (
        <section className="max-w-6xl mx-auto mt-16 pt-10 border-t border-stone-200">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-serif font-bold text-stone-800">
                Other Rooms & Suites
              </h2>
              <p className="text-stone-500 mt-1">
                Explore more ways to stay at Canaan Hotel.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherRooms.map((r) => (
              <RoomCard
                key={r.slug}
                slug={r.slug}
                imageSrc={r.imageSrc}
                imageAlt={r.imageAlt}
                name={r.name}
                description={r.description}
                priceLabel={r.priceLabel}
                badges={r.badges}
                rating={r.rating}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}