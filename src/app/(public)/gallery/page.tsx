import { Metadata } from "next";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Photo Gallery | Canaan International Hotel",
  description: "Experience the beauty of Canaan International Hotel in Adigrat through our photo gallery. Explore our rooms, dining facilities, and local attractions.",
  openGraph: {
    title: "Canaan International Hotel Gallery - A Visual Journey",
    description: "Browse our photos to see why Canaan International Hotel is the premier choice for accommodation in Adigrat.",
    images: ["/images/heroes/Ext-Compund.webp"],
  },
};

export default function GalleryPage() {
  return (
    <main id="main-content" className="flex flex-1 flex-col items-center">
      <GalleryClient />
    </main>
  );
}
