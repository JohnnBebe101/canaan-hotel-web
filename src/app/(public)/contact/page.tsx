import type { Metadata } from "next/types";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: 'Book Your Stay — Adigrat',
  description: 'Reserve your room at Canaan International Hotel. +251 911 095 728 · info@canaanhotels.com · Kebele 03, Adigrat, Tigray. Direct bookings receive priority confirmation.',
  openGraph: {
    title: 'Book Your Stay | Canaan International Hotel',
    description: "Tigray's #1 Best Value hotel. Book direct for the best available rate.",
    images: ['/images/heroes/Ext-Compund.webp'],
  },
};

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="w-full bg-forest py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block px-4 py-1 bg-sandstone/10 text-sandstone text-xs uppercase tracking-widest font-bold mb-4">
            Get in Touch
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-sandstone mb-4">
            Contact Us
          </h1>
          <p className="max-w-2xl mx-auto text-sandstone/70 text-lg">
            We&apos;re here to help plan your perfect stay in Adigrat, Tigray.
          </p>
        </div>
      </section>
      <main className="flex-1 px-4 sm:px-10 lg:px-20 py-10 sm:py-16">
        <ContactClient />
      </main>
    </>
  );
}
