import type { Metadata } from "next/types";
import GalleryClient from "./GalleryClient";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: 'Photo Gallery — Adigrat, Tigray',
  alternates: { canonical: canonical("/gallery") },
  description: 'Photos of Canaan International Hotel — rooms, architecture, highland surroundings, and the cultural landscape of Adigrat, Tigray, Ethiopia.',
  openGraph: {
    title: 'Photo Gallery | Canaan International Hotel',
    description: 'A visual journey through Canaan International Hotel — rooms, architecture, and the highlands of Tigray.',
    images: ['/images/heroes/Ext-Compund.webp'],
  },
};

const VALID_CATEGORIES = ["exterior", "rooms", "attractions"];

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category = "" } = await searchParams;
  const initialCategory = VALID_CATEGORIES.includes(category) ? category : "all";
  return (
    <main id="main-content" className="flex flex-1 flex-col items-center bg-sandstone">
      <GalleryClient initialCategory={initialCategory} />
    </main>
  );
}
