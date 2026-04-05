
"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

// UI Components
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import SectionTitle from "@/components/ui/SectionTitle";
import CanaanPattern from "@/components/ui/CanaanPattern";
import SocialRatingWidget from "@/components/ui/SocialRatingWidget";
import CanaanLogo from "@/components/ui/CanaanLogo";
import { Icon } from "@/components/ui/Icons";

// Feature Components
import BookingWidget from "@/components/booking/BookingWidget";

// Assets / Data
const HERO_SLIDES = [
  {
    image: "/images/heroes/Ext-Compund.webp", // Note: Filename has unique spelling in repo
    label: "Gateway to the Northern Heritage",
    title: "Canaan Adigrat",
    desc: "A biophilic landmark inspired by the ancient Axumite Mesob. Experience a sanctuary where architectural stability meets spiritual crossroads.",
    cta: "Secure Sanctuary"
  },
  {
    image: "/images/rooms/Bed-view-Single.webp",
    label: "Sandstone Cliffs & Ancient Spirits",
    title: "Highland Heights",
    desc: "Discover the vertical world of the Gheralta mountains. From rock-hewn legacies to contemporary luxury in the heart of Tigray.",
    cta: "Explore Sanctuaries"
  },
  {
    image: "/images/heroes/Lobby.webp", // Ensure this exists or fallback
    label: "A Cultural Sanctuary",
    title: "Ancient Echoes",
    desc: "Stay where history breathes. Our Grand Mesob Tower is a bridge between the 6th-century rock churches and tomorrow's prosperity.",
    cta: "View Heritage"
  }
];

// Sub-components for this page
const AttractionCard = ({ image, title, distance, description }: { image: string, title: string, distance: string, description: string }) => (
  <div className="group cursor-pointer">
    <div className="relative overflow-hidden mb-6 aspect-[4/5] md:aspect-[3/4]">
      <div className="absolute inset-0 bg-forest/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transform group-hover:scale-110 transition-transform duration-[1.5s]"
      />
      <div className="absolute top-6 right-6 z-20">
        <Badge variant="sandstone">{distance}</Badge>
      </div>
    </div>
    <h3 className="text-2xl font-serif text-sandstone mb-3 group-hover:text-cactus transition-colors">{title}</h3>
    <p className="text-sm text-gray-400 font-light leading-relaxed">{description}</p>
  </div>
);

const TestimonialCard = ({ text, author, role, date }: { text: string, author: string, role: string, date: string }) => (
  <div className="bg-white p-10 border border-forest/5 hover:border-cactus/30 hover:shadow-2xl transition-all duration-500 group">
    <div className="text-cactus text-4xl font-serif mb-6 opacity-30 group-hover:opacity-100 transition-opacity">“</div>
    <p className="text-lg text-gray-600 font-light italic leading-relaxed mb-8 min-h-[120px]">
      {text}
    </p>
    <div className="flex items-center justify-between border-t border-forest/5 pt-6">
      <div>
        <h4 className="font-serif text-forest text-lg">{author}</h4>
        <p className="text-[10px] uppercase tracking-widest text-gray-400 mt-1">{role}</p>
      </div>
      <span className="text-[10px] font-bold text-cactus/50">{date}</span>
    </div>
  </div>
);

const Container = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`max-w-7xl mx-auto px-8 ${className}`}>
    {children}
  </div>
);

export default function Home() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    setTimeout(() => setIsTransitioning(false), 1000);
  }, [isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
    setTimeout(() => setIsTransitioning(false), 1000);
  }, [isTransitioning]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 10000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="animate-in fade-in duration-1000 bg-sandstone">
      <BookingWidget
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />

      {/* Enhanced Hero Slider */}
      <header className="relative h-screen w-full overflow-hidden bg-forest" role="region" aria-label="Grand Tower Sanctuary Slide">
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
          >
            {/* Background Image with Cinematic Zoom */}
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                className={`object-cover grayscale-[15%] brightness-[0.7] transition-transform duration-[10000ms] ease-linear ${index === currentSlide ? 'scale-110' : 'scale-100'
                  }`}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-forest/60 via-transparent to-forest/90"></div>
            </div>

            {/* Content Overlay with Staggered Animations */}
            <div className="relative h-full flex flex-col items-center justify-center z-20 px-8 pt-20">
              <div className="max-w-5xl text-center text-sandstone">
                <div className={`transform transition-all duration-1000 delay-300 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}>
                  <Badge variant="cactus">{slide.label}</Badge>
                </div>

                <h1 className={`text-6xl md:text-[8rem] lg:text-[10rem] font-serif mt-10 mb-8 leading-[0.85] tracking-tighter transform transition-all duration-1000 delay-500 text-sandstone ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                  }`}>
                  {slide.title}
                </h1>

                <p className={`max-w-3xl mx-auto text-xl md:text-2xl font-light leading-relaxed mb-16 text-gray-200 italic transform transition-all duration-1000 delay-700 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}>
                  &quot;{slide.desc}&quot;
                </p>

                <div className={`flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-12 transform transition-all duration-1000 delay-900 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}>
                  <Button onClick={() => setIsBookingModalOpen(true)} className="px-16 py-6 text-xs w-full md:w-auto">
                    {slide.cta}
                  </Button>
                  <Link href="/rooms">
                    <button
                      className="text-sandstone text-[11px] uppercase tracking-[0.5em] font-bold flex items-center group py-4"
                    >
                      Sanctuary Gallery
                      <Icon name="arrow_forward" className="ml-4 text-cactus group-hover:translate-x-4 transition-transform" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Cinematic Progress Indicators */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30 flex space-x-4 items-center">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className="group relative py-4 px-2 focus:outline-none"
              aria-label={`Go to slide ${i + 1}`}
            >
              <div className={`h-[2px] w-12 transition-all duration-500 relative bg-white/20 overflow-hidden`}>
                <div
                  className={`absolute inset-0 bg-cactus transition-transform origin-left duration-[10000ms] linear ${i === currentSlide ? 'scale-x-100' : 'scale-x-0'
                    }`}
                />
              </div>
              <span className={`absolute -top-4 left-0 text-[8px] font-bold tracking-widest transition-opacity duration-500 ${i === currentSlide ? 'opacity-100 text-cactus' : 'opacity-0'
                }`}>
                0{i + 1}
              </span>
            </button>
          ))}
        </div>

        {/* Navigation Controls */}
        <div className="hidden md:flex absolute inset-y-0 left-8 right-8 z-30 items-center justify-between pointer-events-none">
          <button
            onClick={prevSlide}
            className="pointer-events-auto w-16 h-16 flex items-center justify-center text-sandstone/30 hover:text-cactus transition-all duration-500 group border border-white/5 hover:border-cactus/50 rounded-full backdrop-blur-sm"
            aria-label="Previous slide"
          >
            <Icon name="chevron_left" className="text-4xl group-hover:-translate-x-1 transition-transform" />
          </button>
          <button
            onClick={nextSlide}
            className="pointer-events-auto w-16 h-16 flex items-center justify-center text-sandstone/30 hover:text-cactus transition-all duration-500 group border border-white/5 hover:border-cactus/50 rounded-full backdrop-blur-sm"
            aria-label="Next slide"
          >
            <Icon name="chevron_right" className="text-4xl group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </header>

      <main>
        {/* Verified Recognition Trust Bar */}
        <section className="relative z-30 -mt-16 max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 bg-white shadow-2xl border border-forest/5 overflow-hidden">
            <SocialRatingWidget platform="google" rating="4.9" reviews="482" />
            <SocialRatingWidget platform="tripadvisor" rating="5.0" reviews="156" />
            <SocialRatingWidget platform="booking" rating="9.8" reviews="1.2k" />
            <SocialRatingWidget platform="expedia" rating="4.7" reviews="340" />
          </div>
        </section>

        {/* Structural Integrity & Philosophy */}
        <section className="py-32 md:py-40 bg-sandstone overflow-hidden">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
              <div className="animate-in slide-in-from-left duration-1000">
                <SectionTitle
                  label="The Stability Branch"
                  title="Architecture of Resilience"
                  description="Inspired by the Mesob tower, our structure utilizes indigenous basalt foundations and sandstone composites, creating a haven that breathes with the highland winds while offering the security of ancient forts."
                />
                <div className="space-y-12">
                  {[
                    { icon: 'verified_user', title: 'Seismic Integrity', desc: 'Precision engineered for the unique structural profile of the Ethiopian Highlands.' },
                    { icon: 'bolt', title: 'Solar Harvesting', desc: 'Integrated facade technology providing zero-carbon, reliable 24/7 highland power.' },
                    { icon: 'groups', title: 'Community Pillar', desc: 'Employing hundreds of local artisans and supporting Adigrat small-hold farmers.' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-8 group">
                      <div className="flex-shrink-0 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border border-cactus/5 group-hover:bg-cactus group-hover:text-white transition-all duration-500">
                        <Icon name={item.icon as any} className="text-3xl" />
                      </div>
                      <div className="pt-2">
                        <h4 className="font-serif text-2xl mb-3 text-forest">{item.title}</h4>
                        <p className="text-base text-gray-500 font-light leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-4 border border-cactus/10 group-hover:inset-0 transition-all duration-700"></div>
                <div className="relative w-full aspect-[4/5] overflow-hidden shadow-2xl">
                  <Image
                    src="/images/heroes/Lobby.webp"
                    alt="Detail of the basalt and glass fusion architecture"
                    fill
                    className="object-cover grayscale-[30%] transition-all duration-700 group-hover:grayscale-0"
                  />
                </div>
                <div className="absolute -bottom-10 -right-10 bg-forest p-12 hidden lg:block shadow-2xl border border-white/5">
                  <CanaanLogo className="w-16 h-16 text-cactus animate-pulse-slow" />
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Local Wonders (Nearby Attractions) */}
        <section className="py-32 md:py-40 bg-forest text-sandstone overflow-hidden relative">
          {/* Subtle pattern background */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none canaan-pattern scale-150"></div>

          <Container className="relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
              <SectionTitle
                label="Sanctuary Surroundings"
                title="Discover the Highlands"
                description="Gateway to the spiritual heart of the Horn. Explore rock-hewn legacies and spiritual verticalities."
                dark
              />
              <Link href="/admin/attractions">
                <Button variant="outline" className="mb-12 border-white/10 text-sandstone hover:border-cactus">Explore Full Map</Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <AttractionCard
                image="/images/attractions/Gheralta.svg"
                title="Gheralta Cliffs"
                distance="45km"
                description="Climb the vertical sandstone paths to 6th-century monasteries carved directly into the sheer cliffs."
              />
              <AttractionCard
                image="/images/attractions/Al Najashi4.svg"
                title="Al-Najashi Mosque"
                distance="32km"
                description="The site of the first Hijra. A testament to Tigray's historical role as a sanctuary for all spirits."
              />
              <AttractionCard
                image="/images/attractions/Debre-Damo-Abune-Aregawi-monaster--1920x1080.svg"
                title="Debre Damo Monastery"
                distance="52km"
                description="Accessible only by a 15-meter leather rope. A living relic of early Christian architecture."
              />
            </div>
          </Container>
        </section>

        <CanaanPattern inverted />

        {/* Global Testimonials Section */}
        <section className="py-32 md:py-40 bg-sandstone">
          <Container>
            <SectionTitle label="Voices of the World" title="Highland Experiences" centered />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <TestimonialCard
                text="Canaan is the architectural dialogue Ethiopia has been waiting for. It captures the ruggedness of Tigray in a silk-lined sanctuary."
                author="Jean-Pierre Dubois"
                role="Global Hospitality Lead"
                date="Nov 2025"
              />
              <TestimonialCard
                text="The Grand Mesob Tower isn't just a hotel; it's a structural promise. I've never felt more connected to the ancient soil of the highlands."
                author="Elena Rodriguez"
                role="Solo Traveler & Architect"
                date="Dec 2025"
              />
              <TestimonialCard
                text="Incredible stability and service. We hosted our regional summit here and the energy of the space is truly transcendental."
                author="Dr. Abiy Tadesse"
                role="Regional Director"
                date="Jan 2026"
              />
            </div>
            <div className="mt-24 flex justify-center">
              <div className="flex flex-col items-center gap-6">
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Trusted by travelers worldwide</p>
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                  <span className="text-xl font-serif font-bold text-forest">Forbes Travel Guide</span>
                  <span className="hidden md:inline w-1 h-1 bg-cactus rounded-full"></span>
                  <span className="text-xl font-serif font-bold text-forest">Condé Nast</span>
                  <span className="hidden md:inline w-1 h-1 bg-cactus rounded-full"></span>
                  <span className="text-xl font-serif font-bold text-forest">Travel + Leisure</span>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Closing Call to Action */}
        <section className="py-32 bg-forest relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 canaan-pattern scale-150"></div>
          <Container className="relative z-10 text-center">
            <SectionTitle
              title="Your Sanctuary Awaits"
              description="Experience the junction of ancient Tigrayan heritage and contemporary luxury."
              centered
              dark
            />
            <Button onClick={() => setIsBookingModalOpen(true)} className="mx-auto mt-10 px-20 py-6 text-xs">Begin Your Legacy</Button>
          </Container>
        </section>
      </main>
    </div>
  );
}
