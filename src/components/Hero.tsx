"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from 'next/dynamic';
const BookingCardDynamic = dynamic(() => import('./BookingCard'), { ssr: false, loading: () => null });
import HeroSlider from "./HeroSlider";
import { HERO_SLIDER_IMAGES } from "@/lib/heroImages";
import Button from "./ui/Button";
import Badge from "./ui/Badge";
import { Icon } from "@/components/ui/Icons";

export default function Hero() {
  return (
    <div className="relative min-h-screen bg-background-light dark:bg-background-dark overflow-hidden">
      {/* Hero Slider Background */}
      <HeroSlider images={HERO_SLIDER_IMAGES} />
      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/40 to-black/50 z-10" />

      {/* Hero Content - Desktop: Side by Side | Mobile: Stacked */}
      <main className="relative z-20 min-h-[calc(100vh-73px)] flex items-center px-4 py-8 sm:py-12 lg:px-8 overflow-hidden">
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">

            {/* Left Column: Hero Text & CTA */}
            <div className="text-center lg:text-left space-y-4 sm:space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-2">
                <Badge variant="primary" size="xs">Premium</Badge>
                <span className="text-white/90 text-sm font-medium">Experience Luxury Hospitality</span>
              </div>

              {/* Main Heading */}
              <h1 className="relative text-4xl sm:text-5xl lg:text-5xl font-black leading-tight text-white tracking-tight">
                <span className="block">Your Gateway to</span>
                <span className="block text-primary">Tigray's History</span>
                <span className="block">and Comfort</span>
                {/* Decorative underline */}
                <svg
                  width="180"
                  height="12"
                  viewBox="0 0 223 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute -bottom-2 left-0 lg:left-0 max-md:hidden opacity-80"
                  aria-hidden="true"
                >
                  <path
                    d="M1.30466 10.7431C39.971 5.28788 76.0949 3.02 115.082 2.30401C143.893 1.77489 175.871 0.628649 204.399 3.63102C210.113 3.92052 215.332 4.91391 221.722 6.06058"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="text-primary"
                  />
                </svg>
              </h1>

              {/* Description */}
              <p className="text-lg sm:text-xl text-gray-100 max-w-2xl mx-auto lg:mx-0">
                Experience unparalleled hospitality in the heart of Adigrat. Book direct for best rates and exclusive offers.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <Link href="/rooms">
                  <Button size="lg" className="w-full sm:w-auto px-10 gap-2">
                    <span>View Our Rooms</span>
                    <Icon name="arrow_forward" className="ml-1" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto px-10 border-white text-white hover:bg-white hover:text-text-primary">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column: Booking Card is lazy-loaded to optimize initial render */}
            <div className="w-full lg:justify-self-end lg:max-w-lg">
              <div className="mx-auto lg:mx-0 lg:ml-auto">
                <BookingCardDynamic />
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
