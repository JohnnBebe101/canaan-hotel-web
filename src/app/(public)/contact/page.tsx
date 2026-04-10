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
    <main id="main-content" className="flex-1 px-4 sm:px-10 lg:px-20 py-10 sm:py-16">
      <ContactClient />
    </main>
  );
}
