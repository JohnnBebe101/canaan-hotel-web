"use client";

import { useState } from "react";
import Image from "next/image";
import HeroImage from "@/components/HeroImage";

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  title: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: "1",
    src: "/assets/images/hotel-exterior.jpg",
    alt: "Hotel exterior view showing the main building",
    category: "exterior",
    title: "Hotel Exterior",
  },
  {
    id: "2",
    src: "/assets/images/hotel-entrance.jpg",
    alt: "Hotel entrance with welcoming design",
    category: "exterior",
    title: "Main Entrance",
  },
  {
    id: "3",
    src: "/assets/images/hotel-comfort.jpg",
    alt: "Comfortable hotel room interior",
    category: "rooms",
    title: "Comfort Room",
  },
  {
    id: "4",
    src: "/assets/images/hotel-family.jpg",
    alt: "Spacious family suite",
    category: "rooms",
    title: "Family Suite",
  },
  {
    id: "5",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCDrh16GHYlnaqEVWs2yuQQVY-cZT5cKmTV1Z5f7LMqcxHYmGPX83yGuWpIhyDz-sI0EAVDMOGKJnCixD6nRZlAy6VQqXlZbFWo4rHnIUKXbr8BQ0kl7vlX5LhG1fnX4EwM64cK3zcbvZi0NM2mRjJcl1Z6baJznFavNIXNy4miBiF4zDBFt5J9gWKqQofEwlQQBIcdyN2Mf7M34bZyDAl73Yq-ZQ3stdftFVktK5CtYpo4DqSZ2_KaBGf8rnHM_IuNuGkThbQzm3I3",
    alt: "Economy single room with city view",
    category: "rooms",
    title: "Economy Single",
  },
  {
    id: "6",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCER0_PlwABxBmlMMmAaU_yGix4gPIkXQKzPDFZ6WH5PJpJXSIbeFtD0JGKmaUlVh_-7MoJjGgDhuH29mzUNnuJvgaQreqY556Gp3nkbK-8SjpQsrPoEwWDUYBmYtnos7TgGUmaxFS61olFKtzfpsz8iClF-uuSJhKMddiHAoizkLTXluXZezNyqTerQ7pQfokpIAoQtyNxeNGanobXz8JodC-O06PRkK6NZgkk9JmF_Slaqhac-0YQHBuC-u-2ug-dYr85plGoSWtC",
    alt: "Deluxe double room with balcony",
    category: "rooms",
    title: "Deluxe Double",
  },
  {
    id: "7",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVBCiJf9wtUSe8GRtQ7FjJUL8fqmByyx3a4qTqQ4n4-Ktm0mo3pH9pUo8uYbzc7pSTsYQWC9WKS_MOLPYFKGQS1Ynu5UXq-QmoswfdXlt3IDrCGl334TDwMKhUc0kiS86rI4ylnTuYIpkv7nb4_LyTXcdTfjKTVMOHo4AG3w2nZv9nz4eOjt_Qsnjym7EGUbYmBexcpulCoMUbKpqoDgjuFuWWQDt8TvJ0TTqeXk65Mb-Odp1FD2F6X7eCjNp_5VISBUWeJhlZ1Qtu",
    alt: "Debre Damo Monastery",
    category: "attractions",
    title: "Debre Damo",
  },
  {
    id: "8",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOmzVXKyVHsOx5BZJWwzPKLNMpkFW0fPK_T6kwrzbuR1SHuGeOlUqQ5iQdDZ24F_uXiLTIRpp1jk-wCrZxA3OsyUxnlhaT0cTuR1qivKgKiXaC4BkeXMRihJwrwcinyoTV5O7hc0qsQZlQS5qIv0R_aQ5CizVwvf17Mu-9q5G6vgzVjddqcCtJqDweNpb0wk_UMwGCVCG8hk2T6Xffjriy0Duk_Hfqt6j8hpoJdRGZhC61HW5we8N_gYV6nX9-dPEJok4mvXIKhHwV",
    alt: "Gheralta Mountains at sunset",
    category: "attractions",
    title: "Gheralta Mountains",
  },
  {
    id: "9",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBu1k1XaYnLWxoh_9eox5bwqgUMyw6TLJvyOs0Z4OkVoWWhjdFNrXXRF9X6CbCqqx7QMW0zFPcwvsPQn0jDImshfGxd0GMEKmWuF6Vq6XtTylCEo3OBIl9rSoaNHS33g4HNsV1sLmQd_L6uCT5wqcE-yythiueqZJ_PT8FIkllUYS_JPQ1fSfSCv8pEmMs47I5lvxXTwDY7971GKY8JDBXNG1vJ3kSw8SYuCMsInmPJhichHxmplgY7VrQ0b4DrcIk55orKUc6tJk1o",
    alt: "Al-Nejashi Mosque historic site",
    category: "attractions",
    title: "Al-Nejashi Mosque",
  },
];

const categories = [
  { id: "all", label: "All Photos" },
  { id: "exterior", label: "Hotel Exterior" },
  { id: "rooms", label: "Rooms & Suites" },
  { id: "attractions", label: "Nearby Attractions" },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const filteredImages = activeCategory === "all"
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <main id="main-content" className="flex flex-1 flex-col items-center">
      <div className="w-full max-w-7xl">
        {/* Hero Section */}
        <section
          className="relative flex min-h-[50vh] w-full flex-col items-center justify-center p-4 py-20 text-center text-white"
          aria-label="Gallery hero section"
        >
          <HeroImage
            src="/assets/images/hotel-exterior.jpg"
            alt="Canaan International Hotel exterior"
            overlayOpacity={0.5}
            className="absolute inset-0 -z-10"
          />
          <div className="flex flex-col gap-4 relative z-10">
            <h1 className="text-4xl font-black leading-tight tracking-tighter md:text-6xl">
              Photo Gallery
            </h1>
            <p className="mx-auto max-w-2xl text-base font-normal leading-normal text-gray-200 md:text-lg">
              Take a visual journey through our hotel and discover the beauty of Adigrat.
            </p>
          </div>
        </section>

        {/* Category Filters */}
        <section className="px-4 py-8 sm:px-6 lg:px-8" aria-label="Gallery filters">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? "bg-primary text-white"
                    : "bg-white text-text-secondary border border-border-color hover:bg-gray-50 dark:bg-background-dark dark:border-text-secondary/20 dark:hover:bg-text-secondary/10"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="px-4 pb-16 sm:px-6 lg:px-8" aria-labelledby="gallery-grid">
          <h2 id="gallery-grid" className="sr-only">Photo Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {filteredImages.map((image) => (
              <button
                key={image.id}
                onClick={() => setSelectedImage(image)}
                className="group block overflow-hidden rounded-xl border border-border-color dark:border-text-secondary/10 bg-white dark:bg-background-dark/50 hover:shadow-lg transition-all duration-300 text-left"
              >
                <div className="relative overflow-hidden">
                  <div className="aspect-video relative">
                    {image.src.startsWith("/") ? (
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div
                        className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                        style={{ backgroundImage: `url("${image.src}")` }}
                        role="img"
                        aria-label={image.alt}
                      />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-white font-medium">{image.title}</p>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-text-primary dark:text-background-light font-semibold">
                    {image.title}
                  </h3>
                  <p className="text-sm text-text-secondary dark:text-text-secondary/90 mt-1">
                    {image.alt}
                  </p>
                  <span className="inline-block px-2 py-1 rounded-full bg-gray-100 text-gray-700 text-xs mt-2 dark:bg-text-secondary/10 dark:text-text-secondary">
                    {categories.find((c) => c.id === image.category)?.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-primary transition-colors"
              onClick={() => setSelectedImage(null)}
              aria-label="Close image viewer"
            >
              <span className="material-symbols-outlined text-3xl">close</span>
            </button>
            <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
              <div className="relative aspect-video rounded-lg overflow-hidden">
                {selectedImage.src.startsWith("/") ? (
                  <Image
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
                  />
                ) : (
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url("${selectedImage.src}")` }}
                    role="img"
                    aria-label={selectedImage.alt}
                  />
                )}
              </div>
              <div className="text-center mt-4">
                <h3 className="text-white text-xl font-bold">{selectedImage.title}</h3>
                <p className="text-gray-300 mt-1">{selectedImage.alt}</p>
              </div>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <section className="px-4 py-16 sm:px-6 lg:px-8 bg-white dark:bg-background-light/5 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-text-primary dark:text-background-light mb-4">
            Ready to Experience It In Person?
          </h2>
          <p className="mx-auto max-w-2xl text-text-secondary dark:text-text-secondary/90 mb-8">
            Book your stay today and create your own memories at Canaan International Hotel.
          </p>
          <a
            href="/rooms"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 text-base font-bold text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Book Your Stay
          </a>
        </section>
      </div>
    </main>
  );
}
