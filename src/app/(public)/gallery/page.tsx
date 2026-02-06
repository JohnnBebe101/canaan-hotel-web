import { Metadata } from "next";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Photo Gallery | Cannan International Hotel",
  description: "Experience the beauty of Canaan International Hotel in Adigrat through our photo gallery. Explore our rooms, dining facilities, and local attractions.",
  openGraph: {
    title: "Cannan International Hotel Gallery - A Visual Journey",
    description: "Browse our photos to see why Cannan International Hotel is the premier choice for accommodation in Adigrat.",
    images: ["/assets/images/hotel-exterior.jpg"],
  },
};

export default function GalleryPage() {
  return (
    <main id="main-content" className="flex flex-1 flex-col items-center">
      <GalleryClient />
    </main>
  );
}
