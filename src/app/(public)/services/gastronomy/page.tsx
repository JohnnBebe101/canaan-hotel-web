import type { Metadata } from "next/types";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icons";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Canaanite Gastronomy | Canaan International Hotel",
  alternates: { canonical: canonical("/services/gastronomy") },
  description: "Experience the culinary traditions of the Ethiopian highlands at Canaan Hotel's restaurant.",
};

export default function GastronomyPage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative h-64 md:h-80 w-full overflow-hidden">
        <Image 
          src="/images/heroes/Gate-Corrdor.webp" 
          alt="Canaanite Gastronomy" 
          fill 
          className="object-cover brightness-75" 
          priority 
          sizes="100vw"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-sandstone text-4xl md:text-5xl font-bold tracking-tight" style={{ textShadow: '0 0 60px rgba(255,255,255,0.5), 0 0 100px rgba(255,255,255,0.25), 0 2px 8px rgba(0,0,0,0.6)' }}>Canaanite Gastronomy</h1>
          <p className="text-sandstone/80 text-base mt-2" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>A culinary journey through the highlands of Tigray</p>
        </div>
      </section>

      {/* Body Section */}
      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl font-serif font-bold text-forest mb-6">Where Tigray Meets the Table</h2>
        <p className="text-stone-600 leading-relaxed mb-12">
          Our restaurant celebrates the rich culinary traditions of the Ethiopian highlands — 
          injera baked fresh each morning, slow-cooked tibs, and seasonal highland vegetables 
          sourced from local farmers in the Adigrat plateau. Complemented by a curated selection 
          of Ethiopian wines and tej.
        </p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-sandstone p-6 rounded-xl">
            <Icon name="restaurant" className="w-8 h-8 text-bronze mx-auto mb-3" />
            <h3 className="font-serif font-bold text-forest mb-2">Ethiopian Breakfast</h3>
            <p className="text-sm text-stone-600">Served daily 6AM–10AM, included in every room rate.</p>
          </div>
          <div className="bg-sandstone p-6 rounded-xl">
            <Icon name="restaurant" className="w-8 h-8 text-bronze mx-auto mb-3" />
            <h3 className="font-serif font-bold text-forest mb-2">Highland Cuisine</h3>
            <p className="text-sm text-stone-600">Lunch and dinner service featuring traditional Tigrayan recipes.</p>
          </div>
          <div className="bg-sandstone p-6 rounded-xl">
            <Icon name="room_service" className="w-8 h-8 text-bronze mx-auto mb-3" />
            <h3 className="font-serif font-bold text-forest mb-2">In-Room Dining</h3>
            <p className="text-sm text-stone-600">Full menu available for in-room service 7AM–10PM.</p>
          </div>
        </div>

        {/* CTA */}
        <Link 
          href="mailto:info@canaanhotels.com?subject=Dining%20Reservation%20Inquiry"
          className="inline-block bg-bronze text-white px-8 py-3 rounded-lg font-medium hover:bg-bronze/90 transition-colors"
        >
          Make a Dining Reservation
        </Link>
        
        <div className="mt-8">
          <Link href="/" className="text-bronze hover:underline text-sm">
            ← Back to Hotel
          </Link>
        </div>
      </section>
    </main>
  );
}