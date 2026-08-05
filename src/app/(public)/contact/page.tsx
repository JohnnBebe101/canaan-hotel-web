import type { Metadata } from "next/types";
import ContactClient from "./ContactClient";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: 'Book Your Stay — Adigrat',
  alternates: { canonical: canonical("/contact") },
  description: 'Reserve your room at Canaan International Hotel. +251 911 095 728 · info@canaanhotels.com · Kebele 03, Adigrat, Tigray. Direct bookings receive priority confirmation.',
  openGraph: {
    title: 'Book Your Stay | Canaan International Hotel',
    description: "Tigray's #1 Best Value hotel. Book direct for the best available rate.",
    images: ['/images/heroes/Ext-Compund.webp'],
  },
};

export default function ContactPage() {
  return <ContactClient />;
}