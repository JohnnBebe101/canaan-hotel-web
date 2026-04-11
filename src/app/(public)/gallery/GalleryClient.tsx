"use client";

import { useState } from "react";
import Link from "next/link";
import OptimizedImage from "@/components/OptimizedImage";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Icon } from "@/components/ui/Icons";

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
        src: "/images/heroes/Ext-Compund.webp",
        alt: "Hotel exterior view showing the main building",
        category: "exterior",
        title: "Hotel Exterior",
    },
    {
        id: "2",
        src: "/images/heroes/Gate-Corrdor.webp",
        alt: "Hotel entrance with welcoming design",
        category: "exterior",
        title: "Main Entrance",
    },
    {
        id: "3",
        src: "/images/rooms/single-room-view.webp",
        alt: "Comfortable hotel room interior",
        category: "rooms",
        title: "Comfort Room",
    },
    {
        id: "4",
        src: "/images/rooms/twin-room.webp",
        alt: "Spacious family suite",
        category: "rooms",
        title: "Family Suite",
    },
    {
        id: "5",
        src: "/images/rooms/Bed-view-Single.webp",
        alt: "Economy single room with city view",
        category: "rooms",
        title: "Economy Single",
    },
    {
        id: "6",
        src: "/images/rooms/single-room-best-view.webp",
        alt: "Deluxe double room with balcony",
        category: "rooms",
        title: "Deluxe Double",
    },
    {
        id: "7",
        src: "/images/attractions/Debre-Damo-Abune-Aregawi-monaster--1920x1080.webp",
        alt: "Debre Damo Monastery",
        category: "attractions",
        title: "Debre Damo",
    },
    {
        id: "8",
        src: "/images/attractions/Gheralta.webp",
        alt: "Gheralta Mountains at sunset",
        category: "attractions",
        title: "Gheralta Mountains",
    },
    {
        id: "9",
        src: "/images/attractions/Al Najashi5.webp",
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

export default function GalleryClient() {
    const [activeCategory, setActiveCategory] = useState("all");
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

    const filteredImages = activeCategory === "all"
        ? galleryImages
        : galleryImages.filter((img) => img.category === activeCategory);

    return (
        <div className="w-full">
            {/* Hero Section */}
            <section
                className="relative flex min-h-[40vh] w-full flex-col items-center justify-center p-4 py-20 text-center text-white overflow-hidden"
                aria-label="Gallery hero section"
            >
                <div className="absolute inset-0 -z-10">
                    <OptimizedImage
                        src="/images/heroes/Ext-Compund.webp"
                        alt="Canaan International Hotel exterior"
                        fill
                        priority
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
                </div>
                <div className="flex flex-col gap-4 relative z-10 max-w-4xl">
                    <Badge variant="primary" className="mx-auto border-white/20 bg-white/10 text-white backdrop-blur-md">Visual Journey</Badge>
                    <h1 className="text-4xl font-black leading-tight tracking-tight md:text-6xl text-white">
                        Photo Gallery
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg font-medium text-gray-200">
                        Explore the comfort of our rooms and the historic beauty of Tigray.
                    </p>
                </div>
            </section>

            {/* Category Filters */}
            <section className="px-4 py-12 sm:px-6 lg:px-8 border-b border-border-color dark:border-text-secondary/10 bg-white dark:bg-background-dark/50 sticky top-16 z-30 backdrop-blur-md" aria-label="Gallery filters">
                <div className="flex flex-wrap justify-center gap-2 max-w-7xl mx-auto">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${activeCategory === category.id
                                ? "bg-primary text-white shadow-lg shadow-primary/20 scale-105"
                                : "bg-white text-text-secondary border border-border-color hover:border-primary hover:text-primary dark:bg-background-dark dark:border-text-secondary/20"
                                }`}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="gallery-grid">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {filteredImages.map((image, index) => (
                        <ScrollReveal key={image.id} delay={index * 100}>
                            <button
                                onClick={() => setSelectedImage(image)}
                                className="group block overflow-hidden rounded-2xl bg-white dark:bg-background-dark/50 border border-border-color dark:border-text-secondary/10 hover:shadow-2xl transition-all duration-500 text-left w-full"
                            >
                                <div className="relative overflow-hidden aspect-[4/3]">
                                    <OptimizedImage
                                        src={image.src}
                                        alt={image.alt}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        unoptimized={!image.src.startsWith("/")}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-500">
                                            <Icon name="zoom_in" className="text-white text-2xl" />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                        <Badge variant="primary" size="xs" className="mb-2 bg-white text-primary border-none">{categories.find(c => c.id === image.category)?.label}</Badge>
                                        <h3 className="text-xl font-bold text-white leading-tight">
                                            {image.title}
                                        </h3>
                                    </div>
                                </div>
                            </button>
                        </ScrollReveal>
                    ))}
                </div>
            </section>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4 backdrop-blur-lg animate-in fade-in duration-300"
                    onClick={() => setSelectedImage(null)}
                    role="dialog"
                    aria-modal="true"
                >
                    <button
                        className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-primary transition-colors z-10"
                        onClick={() => setSelectedImage(null)}
                    >
                        <Icon name="close" className="text-2xl" />
                    </button>
                    <div className="max-w-6xl w-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
                        <div className="relative w-full aspect-[3/2] md:aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black">
                            <OptimizedImage
                                src={selectedImage.src}
                                alt={selectedImage.alt}
                                fill
                                className="object-contain"
                                sizes="100vw"
                                priority
                                unoptimized={!selectedImage.src.startsWith("/")}
                            />
                        </div>
                        <div className="mt-8 text-center max-w-2xl px-4 scale-in-95 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
                            <Badge variant="primary" className="mb-4">{categories.find(c => c.id === selectedImage.category)?.label}</Badge>
                            <h3 className="text-2xl md:text-3xl font-black text-white mb-2">{selectedImage.title}</h3>
                            <p className="text-gray-400 text-lg leading-relaxed">{selectedImage.alt}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* CTA Section */}
            <section className="px-4 py-24 sm:px-6 lg:px-8 bg-gray-50 dark:bg-background-light/5 text-center overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                <div className="relative z-10 max-w-3xl mx-auto">
                    <h2 className="text-4xl font-black tracking-tight text-text-primary dark:text-background-light mb-6">
                        Ready to Visit Us?
                    </h2>
                    <p className="text-lg text-text-secondary dark:text-text-secondary/90 mb-10">
                        Experience the elegance and comfort of Canaan International Hotel for yourself. Book your room today for the best rates.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/rooms">
                            <Button size="lg" className="px-10">
                                Book Your Stay
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="outline" size="lg" className="px-10">
                                Contact Us
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
