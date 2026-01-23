"use client";

import { useState } from "react";
import Link from "next/link";

export default function Hero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-background-light dark:bg-background-dark">
      {/* Fixed Header */}
      <header className="border-border-color dark:border-text-secondary/20 bg-background-light/90 dark:bg-background-dark/90 fixed top-0 z-10 w-full border-b py-1 backdrop-blur-sm">
        <nav className="navbar mx-auto max-w-7xl rounded-b-xl px-4 sm:px-6 lg:px-8">
          <div className="w-full lg:flex lg:items-center lg:gap-2">
            <div className="navbar-start items-center justify-between max-lg:w-full">
              <Link className="text-text-primary dark:text-background-light flex items-center gap-3 text-xl font-bold" href="/">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-white font-bold text-sm">CH</span>
                </div>
                Canaan
              </Link>
              <div className="flex items-center gap-5 lg:hidden">
                <Link href="/admin" className="btn btn-primary">Login</Link>
                <button
                  type="button"
                  className="collapse-toggle btn btn-outline btn-secondary btn-square"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-controls="navbar-block-4"
                  aria-expanded={isMenuOpen}
                  aria-label="Toggle navigation"
                >
                  <span className={`icon-[tabler--menu-2] collapse-open:hidden size-5.5 ${isMenuOpen ? 'hidden' : 'block'}`}></span>
                  <span className={`icon-[tabler--x] collapse-open:block hidden size-5.5 ${isMenuOpen ? 'block' : 'hidden'}`}></span>
                </button>
              </div>
            </div>
            <div
              id="navbar-block-4"
              className={`lg:navbar-center transition-all duration-300 font-medium lg:flex ${
                isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
              } lg:max-h-none lg:opacity-100`}
            >
              <div className="text-text-primary dark:text-background-light flex gap-6 text-base max-lg:mt-4 max-lg:flex-col lg:items-center">
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                <Link href="/rooms" className="hover:text-primary transition-colors">Rooms</Link>
                <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
                <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
              </div>
            </div>
            <div className="navbar-end max-lg:hidden">
              <Link href="/rooms" className="btn btn-primary">Book Now</Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="h-screen">
        <div className="flex h-full flex-col justify-between gap-18 overflow-x-hidden pt-40 md:gap-24 md:pt-45 lg:gap-35 lg:pt-47.5">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 justify-self-center px-4 text-center sm:px-6 lg:px-8">
            <div className="bg-background-dark/5 dark:bg-background-light/10 border-border-color dark:border-text-secondary/20 flex w-fit items-center gap-2.5 rounded-full border px-3 py-2">
              <span className="badge badge-primary shrink-0 rounded-full">Premium</span>
              <span className="text-text-secondary dark:text-text-secondary/80">Experience Luxury Hospitality</span>
            </div>
            <h1 className="text-text-primary dark:text-background-light relative z-1 text-5xl leading-[1.15] font-bold max-md:text-2xl md:max-w-3xl md:text-balance">
              <span>Your Gateway to Tigray's History and Comfort</span>
              <svg
                width="223"
                height="12"
                viewBox="0 0 223 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute -bottom-1.5 left-10 -z-1 max-lg:left-4 max-md:hidden"
              >
                <path
                  d="M1.30466 10.7431C39.971 5.28788 76.0949 3.02 115.082 2.30401C143.893 1.77489 175.871 0.628649 204.399 3.63102C210.113 3.92052 215.332 4.91391 221.722 6.06058"
                  stroke="url(#paint0_linear_10365_68643)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_10365_68643"
                    x1="19.0416"
                    y1="4.03539"
                    x2="42.8362"
                    y2="66.9459"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0.2" stopColor="var(--color-primary)" />
                    <stop offset="1" stopColor="var(--color-primary)" />
                  </linearGradient>
                </defs>
              </svg>
            </h1>
            <p className="text-text-secondary dark:text-text-secondary/80 max-w-3xl">
              Experience unparalleled hospitality in the heart of Adigrat.
            </p>

            <Link href="/rooms" className="btn btn-primary btn-lg inline-flex items-center gap-2">
              Book Your Stay
              <span className="icon-[tabler--arrow-right] size-5"></span>
            </Link>
          </div>

          <div className="w-full">
            <img
              src="/assets/images/hotel-exterior.jpg"
              alt="Canaan International Hotel exterior view"
              className="min-h-67 w-full object-cover"
            />
          </div>
        </div>
      </main>
    </div>
  );
}