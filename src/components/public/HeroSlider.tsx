"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icons";

const HERO_SLIDES = [
  {
    image: "/images/heroes/Ext-Compund.webp",
    label: "Authentic Canaan with Persistency",
    title: "Canaan International Hotel",
    desc: "A landmark of contemporary Ethiopian design in the heart of Adigrat, 0.2km from the city centre. Where the ancient tradition of highland craftsmanship meets the comfort and service of an international hotel.",
    cta: "Book Your Stay"
  },
  {
    image: "/images/rooms/Bed-view-Single.webp",
    label: "Sandstone Cliffs & Ancient Spirits",
    title: "Tigray's Finest Address",
    desc: "Discover the vertical world of the Gheralta mountains. From rock-hewn legacies to contemporary luxury in the heart of Tigray.",
    cta: "View Our Rooms"
  },
  {
    image: "/images/heroes/Lobby.webp",
    label: "A Cultural Destination",
    title: "Ancient Tigray, Modern Comfort",
    desc: "Stay where history breathes. Canaan International Hotel stands as a bridge between Tigray's 6th-century rock churches and the demands of the modern traveler.",
    cta: "Discover Our Story"
  }
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

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
    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearInterval(timerRef.current!);
      } else {
        timerRef.current = setInterval(nextSlide, 10000);
      }
    };

    timerRef.current = setInterval(nextSlide, 10000);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(timerRef.current!);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [nextSlide]);

  return (
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
              placeholder="empty"
              sizes="100vw"
              quality={index === 0 ? 90 : 75}
className={`object-cover transition-transform duration-[10000ms] ease-linear ${index === currentSlide ? 'scale-110' : 'scale-100'
              }`}
            />
            {/* Gradient scrim overlay for text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent z-10" />
          </div>

          {/* Content Overlay with Staggered Animations */}
          <div className="relative h-full flex flex-col items-center justify-center z-20 px-8 pt-20">
            <div className="max-w-5xl text-center text-sandstone">
              <div className={`transform transition-all duration-1000 delay-300 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}>
                <Badge variant="cactus" className="drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">{slide.label}</Badge>
              </div>

<h1 className={`text-4xl md:text-6xl lg:text-7xl font-serif mt-10 mb-8 leading-[0.85] tracking-tighter transform transition-all duration-1000 delay-500 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-100'
                  }`}
                style={{ 
                  textShadow: '0 2px 12px rgba(11,34,26,0.9), 0 0 40px rgba(11,34,26,0.6), 0 0 80px rgba(11,34,26,0.3)',
                  WebkitTextStroke: '0.3px rgba(245,242,233,0.15)',
                }}
              >
                {slide.title}
              </h1>

              <p className={`max-w-3xl mx-auto text-lg md:text-xl font-light leading-relaxed mb-16 text-white/85 italic transform transition-all duration-1000 delay-700 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ textShadow: '0 1px 3px rgba(0,0,0,0.6)' }}
              >
                &quot;{slide.desc}&quot;
              </p>

              <div className={`flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-12 transform transition-all duration-1000 delay-900 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}>
                <Button onClick={() => window.dispatchEvent(new CustomEvent('open-booking'))} className="px-16 py-6 text-xs w-full md:w-auto bg-bronze text-white border-2 border-bronze hover:bg-forest hover:border-forest transition-all duration-300 shadow-[0_4px_15px_rgba(181,129,58,0.4)]">
                  {slide.cta}
                </Button>
                <Link href="/rooms" prefetch>
                  <button
                    className="text-white text-[11px] uppercase tracking-[0.5em] font-bold flex items-center group py-4 bg-transparent border-2 border-white/60 px-8 py-3.5 hover:bg-white/10 hover:border-white/90 backdrop-blur-sm transition-all duration-300"
                  >
                    Explore Rooms
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
                className={`absolute inset-0 bg-bronze transition-transform origin-left duration-[10000ms] linear ${i === currentSlide ? 'scale-x-100' : 'scale-x-0'
                  }`}
              />
            </div>
            <span className={`absolute -top-4 left-0 text-[8px] font-bold tracking-widest transition-opacity duration-500 ${i === currentSlide ? 'opacity-100 text-bronze' : 'opacity-0 text-white/40'
              }`}
              style={i === currentSlide ? { textShadow: '0 1px 4px rgba(0,0,0,0.9)' } : {}}
            >
              0{i + 1}
            </span>
          </button>
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="hidden md:flex absolute inset-y-0 left-8 right-8 z-30 items-center justify-between pointer-events-none">
        <button
          onClick={prevSlide}
          className="pointer-events-auto w-16 h-16 flex items-center justify-center text-white/40 hover:text-white transition-all duration-500 group border border-white/10 hover:border-white/30 rounded-full backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <Icon name="chevron_left" className="text-4xl group-hover:-translate-x-1 transition-transform" />
        </button>
        <button
          onClick={nextSlide}
          className="pointer-events-auto w-16 h-16 flex items-center justify-center text-white/40 hover:text-white transition-all duration-500 group border border-white/10 hover:border-white/30 rounded-full backdrop-blur-sm"
          aria-label="Next slide"
        >
          <Icon name="chevron_right" className="text-4xl group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </header>
  );
}