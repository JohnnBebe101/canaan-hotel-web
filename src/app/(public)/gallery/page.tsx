import type { Metadata } from "next/types";
import GalleryClient from "./GalleryClient";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: 'Photo Gallery — Adigrat, Tigray',
  alternates: { canonical: canonical("/gallery") },
  description: 'Photos of Canaan International Hotel — rooms, architecture, highland surroundings, and the cultural landscape of Adigrat, Tigray, Ethiopia.',
};

export default function GalleryPage() {
  return (
    <main id="main-content" className="flex flex-1 flex-col items-center">
      <GalleryClient />
    </main>
  );
}
