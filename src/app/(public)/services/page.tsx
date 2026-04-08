import type { Metadata } from "next/types";
import Link from "next/link";
import HeroImage from "@/components/HeroImage";
import ServiceCard from "@/components/ServiceCard";

export const metadata: Metadata = {
  title: 'Services | Canaan International Hotel — Adigrat, Tigray',
  description: 'Complimentary breakfast, free Wi-Fi, free parking, 24-hour front desk, restaurant and bar. Every service at Canaan International Hotel is included in your room rate.',
};

export default function ServicesPage() {
  return (
    <main id="main-content" className="flex flex-1 flex-col items-center">
      <div className="w-full max-w-7xl">
        {/* hero Section */}
        <section
          className="relative flex min-h-[60vh] w-full flex-col items-center justify-center p-4 py-20 text-center text-white"
          aria-label="Hero section with hotel services"
        >
          <HeroImage
            src="/images/heroes/Ext-Compund.webp"
            alt="Canaan International Hotel services and facilities"
            overlayOpacity={0.5}
            className="absolute inset-0 -z-10"
          />
          <div className="flex flex-col gap-4 relative z-10">
            <h1 className="text-4xl font-black leading-tight tracking-tighter md:text-6xl">
              Our Services & Facilities
            </h1>
            <p className="mx-auto max-w-2xl text-base font-normal leading-normal text-gray-200 md:text-lg">
              Experience world-class hospitality with our comprehensive range of services designed for your comfort.
            </p>
          </div>
        </section>

        {/* Why Book Direct Section */}
        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="why-book-direct">
          <div className="text-center">
            <h2 id="why-book-direct" className="text-3xl font-bold tracking-tight text-text-primary dark:text-background-light">
              Why Book Direct?
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <ServiceCard
              icon="sell"
              title="Best Price Guarantee"
              description="Always get the best available rate when you book directly with us."
            />
            <ServiceCard
              icon="star"
              title="Exclusive Offers"
              description="Access special packages and deals you won't find anywhere else."
            />
            <ServiceCard
              icon="task_alt"
              title="Flexible Cancellation"
              description="Enjoy peace of mind with our flexible cancellation policies."
            />
          </div>
        </section>

        {/* Call to Action */}
        <section className="px-4 py-16 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-text-primary dark:text-background-light mb-4">
            Ready to Experience Our Services?
          </h2>
          <p className="mx-auto max-w-2xl text-text-secondary dark:text-text-secondary/90 mb-8">
            Book your stay today and enjoy world-class hospitality with our comprehensive range of services.
          </p>
          <Link
            href="/rooms"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 text-base font-bold text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Book Now
          </Link>
        </section>
      </div>
    </main>
  );
}
