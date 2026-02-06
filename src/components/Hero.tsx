"use client";

import { useState } from "react";
import Link from "next/link";
import BookingCard from "./BookingCard";
import HeroSlider from "./HeroSlider";
import { HERO_SLIDER_IMAGES } from "@/lib/heroImages";

export default function Hero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-background-light dark:bg-background-dark overflow-hidden">
      {/* Fixed Sticky Header */}
      <header className="border-border-color dark:border-text-secondary/20 bg-background-light/95 dark:bg-background-dark/95 sticky top-0 z-50 w-full border-b backdrop-blur-md transition-all">
        <nav className="navbar mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="w-full lg:flex lg:items-center lg:gap-2">
            <div className="navbar-start items-center justify-between max-lg:w-full">
              <Link className="text-text-primary dark:text-background-light flex items-center gap-3 text-xl font-bold" href="/">
                <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-white font-bold text-base">CH</span>
                </div>
                <span className="max-sm:hidden">Canaan Hotel</span>
                <span className="sm:hidden">Canaan</span>
              </Link>
              <div className="flex items-center gap-3 lg:hidden">
                <Link href="/rooms" className="btn btn-primary btn-sm">Book Now</Link>
                <button
                  type="button"
                  className="btn btn-outline btn-secondary btn-square btn-sm"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-controls="navbar-mobile"
                  aria-expanded={isMenuOpen}
                  aria-label="Toggle navigation"
                >
                  <span className={`icon-[tabler--menu-2] size-5 ${isMenuOpen ? 'hidden' : 'block'}`}></span>
                  <span className={`icon-[tabler--x] size-5 ${isMenuOpen ? 'block' : 'hidden'}`}></span>
                </button>
              </div>
            </div>
            <div
              id="navbar-mobile"
              className={`lg:navbar-center transition-all duration-300 font-medium lg:flex ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                } lg:max-h-none lg:opacity-100`}
            >
              <div className="text-text-primary dark:text-background-light flex gap-6 text-base max-lg:mt-4 max-lg:flex-col lg:items-center">
                <Link href="/" className="hover:text-primary transition-colors py-2">Home</Link>
                <Link href="/rooms" className="hover:text-primary transition-colors py-2">Rooms</Link>
                <Link href="/services" className="hover:text-primary transition-colors py-2">Services</Link>
                <Link href="/contact" className="hover:text-primary transition-colors py-2">Contact</Link>
              </div>
            </div>
            <div className="navbar-end max-lg:hidden">
              <Link href="/rooms" className="btn btn-primary btn-md min-h-[44px]">
                Book Now
                <span className="icon-[tabler--arrow-right] size-4"></span>
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Slider Background */}
      <HeroSlider images={HERO_SLIDER_IMAGES} />
      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/40 to-black/50 z-10" />

      {/* Hero Content - Desktop: Side by Side | Mobile: Stacked */}
      <main className="relative z-20 min-h-[calc(100vh-73px)] flex items-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

            {/* Left Column: Hero Text & CTA */}
            <div className="text-center lg:text-left space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-2">
                <span className="badge badge-primary shrink-0 rounded-full text-xs font-bold">Premium</span>
                <span className="text-white/90 text-sm font-medium">Experience Luxury Hospitality</span>
              </div>

              {/* Main Heading */}
              <h1 className="relative text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white">
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
                <Link
                  href="/rooms"
                  className="btn btn-lg bg-primary hover:bg-orange-600 text-white border-none min-h-[52px] px-8"
                >
                  View Our Rooms
                  <span className="icon-[tabler--arrow-right] size-5"></span>
                </Link>
                <Link
                  href="/contact"
                  className="btn btn-lg btn-outline border-2 border-white text-white hover:bg-white hover:text-primary min-h-[52px] px-8"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Right Column: Transparent Booking Card (Desktop) / Below Content (Mobile) */}
            <div className="w-full lg:justify-self-end">
              <div className="max-w-md mx-auto lg:mx-0">
                <BookingCard />
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
