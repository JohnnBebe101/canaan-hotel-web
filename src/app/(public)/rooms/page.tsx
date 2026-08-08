import type { Metadata } from "next/types";
import Image from "next/image";
export const revalidate = 3600;
import RoomsClient from "./RoomsClient";
import { Icon } from "@/components/ui/Icons";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: canonical("/rooms") },
  title: 'Rooms & Suites',
  description: "Explore our diverse range of accommodations in Adigrat, from economy singles to deluxe suites. Find the perfect room for your stay in Tigray.",
  openGraph: {
    title: "Accommodations at Canaan International Hotel - Adigrat",
    description: "Discover comfortable and elegant rooms designed for a restful stay. Book direct for the best available rates.",
    images: ["/images/heroes/Ext-Compund.webp"],
  },
};

export default function RoomsPage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative h-64 md:h-80 w-full overflow-hidden">
        <Image 
          src="/images/heroes/Gate-Corrdor.webp" 
          alt="Canaan Hotel Rooms" 
          fill 
          className="object-cover brightness-75" 
          priority 
          sizes="100vw"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <p className="text-amber-300 text-sm font-medium tracking-widest uppercase mb-2">Accommodations</p>
          <h1 className="text-white text-4xl md:text-5xl font-bold tracking-tight">Rooms & Suites</h1>
          <p className="text-white/80 text-base mt-2">24 guestrooms in the heart of Adigrat</p>
        </div>
      </section>

      <div className="px-4 sm:px-10 lg:px-20 py-10 sm:py-16">
        <div className="mx-auto max-w-7xl">
          {/* Amenities Bar */}
          <section className="mb-12" aria-labelledby="amenities">
            <h2 id="amenities" className="text-2xl font-bold tracking-tight text-text-primary dark:text-background-light mb-6">
              What&apos;s Included in Every Room
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

          {/* Room Cards with Client-side filtering */}
          <RoomsClient />
        </div>
      </div>
    </main>
  );
}