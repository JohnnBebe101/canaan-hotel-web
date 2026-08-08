"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import OptimizedImage from "@/components/OptimizedImage";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CanaanPattern from "@/components/ui/CanaanPattern";
import { Icon } from "@/components/ui/Icons";

interface GalleryImage {
    id: string;
    src: string;
    alt: string;
    category: string;
    title: string;
    span?: string;
}

const galleryImages: GalleryImage[] = [
    {
        id: "1",
        src: "/images/heroes/Ext-Compund.webp",
        alt: "Hotel exterior view showing the main building",
        category: "exterior",
        title: "The Principal Facade",
        span: "row-span-2",
    },
    {
        id: "2",
        src: "/images/heroes/Gate-Corrdor.webp",
        alt: "Hotel entrance with a welcoming, sculpted corridor",
        category: "exterior",
        title: "The Grand Entrance",
    },
    {
        id: "3",
        src: "/images/rooms/single-room-view.webp",
        alt: "Comfortable hotel room interior",
        category: "rooms",
        title: "Signature Comfort Room",
    },
    {
        id: "4",
        src: "/images/rooms/twin-room.webp",
        alt: "Spacious family suite",
        category: "rooms",
        title: "Amaryllis Family Suite",
        span: "row-span-2",
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
        alt: "Deluxe double room with balcony over the highlands",
        category: "rooms",
        title: "Deluxe Double · Highland View",
        span: "col-span-2 md:col-span-1",
    },
    {
        id: "7",
        src: "/images/attractions/Debre-Damo-Abune-Aregawi-monaster--1920x1080.webp",
        alt: "Debre Damo Monastery",
        category: "attractions",
        title: "Debre Damo Monastery",
    },
    {
        id: "8",
        src: "/images/attractions/Gheralta.webp",
        alt: "Gheralta Mountains at sunset",
        category: "attractions",
        title: "Gheralta Cliffs at Dusk",
        span: "row-span-2",
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

const categoryLabel = (id: string) =>
    categories.find((c) => c.id === id)?.label ?? id;

const buildHref = (category: string) =>
    category === "all" ? "/gallery" : `/gallery?category=${category}`;

export default function GalleryClient({
    initialCategory = "all",
}: {
    initialCategory?: string;
}) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const activeCategory = VALID(initialCategory) ? initialCategory : "all";

    const filteredImages =
        activeCategory === "all"
            ? galleryImages
            : galleryImages.filter((img) => img.category === activeCategory);

    const closeLightbox = useCallback(() => setActiveIndex(null), []);
    const prevImage = useCallback(
        () =>
            setActiveIndex((i) =>
                i === null ? null : (i - 1 + filteredImages.length) % filteredImages.length
            ),
        [filteredImages.length]
    );
    const nextImage = useCallback(
        () =>
            setActiveIndex((i) =>
                i === null ? null : (i + 1) % filteredImages.length
            ),
        [filteredImages.length]
    );

    // Keyboard navigation + body scroll lock while the lightbox is open
    useEffect(() => {
        if (activeIndex === null) return;

        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowLeft") prevImage();
            if (e.key === "ArrowRight") nextImage();
        };
        window.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [activeIndex, closeLightbox, prevImage, nextImage]);

    const selected = activeIndex !== null ? filteredImages[activeIndex] : null;

    return (
        <div className="w-full">
            {/* HERO */}
            <section
                className="relative flex min-h-[60vh] w-full flex-col items-center justify-end px-6 pb-16 pt-40 text-center overflow-hidden"
                aria-label="Gallery hero section"
            >
                <div className="absolute inset-0 -z-10">
                    <OptimizedImage
                        src="/images/heroes/Ext-Compund.webp"
                        alt="Canaan International Hotel exterior"
                        fill
                        priority
                        sizes="100vw"
                        quality={80}
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest/85 via-forest/40 to-forest/20" />
                    <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/50 to-transparent" />
                </div>
                <ScrollReveal direction="none">
                    <div className="flex flex-col items-center">
                        <Badge variant="forest" className="mb-6 border-sandstone/25">
                            A Visual Journey
                        </Badge>
                        <h1
                            className="font-serif text-white text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl"
                            style={{
                                textShadow: "0 2px 8px rgba(0,0,0,0.7), 0 0 40px rgba(0,0,0,0.5)",
                            }}
                        >
                            The Hotel in Frame
                        </h1>
                        <div className="my-5 h-px w-24 bg-bronze/70" aria-hidden="true" />
                        <p className="mx-auto max-w-2xl text-base md:text-lg text-sandstone/90 leading-relaxed font-light"
                            style={{ textShadow: "0 1px 6px rgba(0,0,0,0.7)" }}>
                            Step through the architecture, rooms and highland wilderness that make
                            Canaan International Hotel — from the grand corridor to the cliffs of Tigray.
                        </p>
                    </div>
                </ScrollReveal>
            </section>

            {/* STICKY FILTER BAR */}
            <section
                className="sticky top-20 z-30 border-y border-forest/5 bg-sandstone/95 backdrop-blur-md"
                aria-label="Gallery categories"
            >
                <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-2 px-6 py-4">
                    {categories.map((category) => {
                        const isActive = category.id === activeCategory;
                        return (
                            <Link
                                key={category.id}
                                href={buildHref(category.id)}
                                scroll={false}
                                aria-current={isActive ? "page" : undefined}
                                className={`rounded-full border px-5 py-2 text-xs font-bold uppercase tracking-widest transition-colors ${
                                    isActive
                                        ? "border-bronze bg-bronze text-white"
                                        : "border-cactus/25 bg-white text-forest hover:border-bronze/50 hover:bg-bronze/5"
                                }`}
                            >
                                {category.label}
                            </Link>
                        );
                    })}
                    <span
                        aria-live="polite"
                        className="ml-2 text-xs uppercase tracking-widest text-forest/50"
                    >
                        {filteredImages.length} photo{filteredImages.length === 1 ? "" : "s"}
                    </span>
                </div>
            </section>

            {/* GALLERY GRID */}
            <section
                className="px-4 py-16 sm:px-6 lg:px-8 md:py-24"
                aria-labelledby="gallery-grid"
            >
                <div
                    id="gallery-grid"
                    className="mx-auto grid max-w-7xl auto-rows-[200px] grid-cols-2 gap-3 md:auto-rows-[230px] md:grid-cols-3 md:gap-4"
                >
                    {filteredImages.map((image, index) => (
                        <ScrollReveal
                            key={image.id}
                            delay={(index % 3) * 100}
                            className={`h-full ${image.span ?? ""}`}
                        >
                            <button
                                onClick={() => setActiveIndex(index)}
                                className="group relative block h-full w-full overflow-hidden rounded-2xl text-left"
                                aria-label={`Enlarge photo: ${image.title}`}
                            >
                                <OptimizedImage
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                                    <div className="flex h-12 w-12 scale-75 items-center justify-center rounded-full border border-sandstone/40 bg-sandstone/10 backdrop-blur-md transition-transform duration-500 group-hover:scale-100">
                                        <Icon name="zoom_in" className="text-2xl text-sandstone" />
                                    </div>
                                </div>
                                <div className="absolute inset-x-3 bottom-3 md:inset-x-4 md:bottom-4">
                                    <div className="flex items-end justify-between gap-3 rounded-xl border border-white/30 bg-sandstone/50 px-4 py-3 backdrop-blur-md">
                                        <Badge variant="forest" size="xs">
                                            {categoryLabel(image.category)}
                                        </Badge>
                                        <h3 className="font-serif text-lg leading-tight text-forest md:text-xl">
                                            {image.title}
                                        </h3>
                                    </div>
                                </div>
                            </button>
                        </ScrollReveal>
                    ))}
                </div>
            </section>

            {/* LIGHTBOX */}
            {selected && (
                <div
                    className="fixed inset-0 z-[70] flex items-center justify-center bg-black/95 p-4 backdrop-blur-lg"
                    onClick={closeLightbox}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`Photo viewer: ${selected.title}`}
                >
                    <button
                        className="absolute right-6 top-6 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-sandstone/20 bg-white/10 text-sandstone transition-colors hover:bg-bronze hover:text-white"
                        onClick={closeLightbox}
                        aria-label="Close gallery viewer"
                    >
                        <Icon name="close" className="text-2xl" />
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            prevImage();
                        }}
                        className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-sandstone/20 bg-white/10 text-sandstone transition-colors hover:bg-bronze hover:text-white md:left-6"
                        aria-label="Previous photo"
                    >
                        <Icon name="chevron_left" className="text-2xl" />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            nextImage();
                        }}
                        className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-sandstone/20 bg-white/10 text-sandstone transition-colors hover:bg-bronze hover:text-white md:right-6"
                        aria-label="Next photo"
                    >
                        <Icon name="chevron_right" className="text-2xl" />
                    </button>

                    <div
                        className="flex w-full max-w-6xl flex-col items-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl md:aspect-[16/9]">
                            <OptimizedImage
                                src={selected.src}
                                alt={selected.alt}
                                fill
                                priority
                                quality={90}
                                className="object-contain"
                                sizes="(max-width: 1152px) 100vw, 1152px"
                            />
                        </div>
                        <div className="mt-6 space-y-2 text-center">
                            <p className="text-xs uppercase tracking-[0.3em] text-bronze">
                                Photo {activeIndex! + 1} / {filteredImages.length}
                            </p>
                            <h3 className="font-serif text-2xl font-bold text-white md:text-3xl">
                                {selected.title}
                            </h3>
                            <p className="max-w-2xl px-4 text-sm text-gray-400 md:text-base">
                                {selected.alt}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <CanaanPattern />

            {/* CLOSING CTA */}
            <section className="relative overflow-hidden bg-forest px-6 py-16 text-center md:py-24">
                <div className="absolute inset-0 opacity-[0.04] canaan-pattern pointer-events-none" />
                <div className="relative z-10 mx-auto max-w-3xl">
                    <ScrollReveal direction="none">
                        <div>
                            <Badge variant="forest" className="mb-6 border-sandstone/20">
                                Begin Your Stay
                            </Badge>
                            <h2 className="font-serif text-sandstone text-3xl font-bold leading-tight md:text-5xl">
                                See &apos;em in Person
                            </h2>
                            <div className="mx-auto my-5 h-px w-24 bg-bronze/70" aria-hidden="true" />
                            <p className="mx-auto max-w-xl text-sandstone/80 text-base leading-relaxed font-light md:text-lg">
                                The photography only hints at the warmth. Experience the comfort,
                                the architecture and the highland light of Canaan for yourself.
                            </p>
                            <div className="mt-9 flex flex-col items-center justify-center gap-4 md:flex-row">
                                <Link href="/rooms">
                                    <Button size="lg" className="px-14">Book Your Stay</Button>
                                </Link>
                                <Link href="/contact">
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="border-sandstone/30 text-sandstone hover:bg-sandstone hover:text-forest"
                                    >
                                        Contact Us
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </div>
    );
}

function VALID(category: string) {
    return ["all", "exterior", "rooms", "attractions"].includes(category);
}