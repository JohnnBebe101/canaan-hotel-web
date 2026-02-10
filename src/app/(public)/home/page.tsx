"use client";

import Image from "next/image";
import Link from "next/link";
import Card from "../../../components/Card";

export default function HomePage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <main id="main-content" className="flex flex-1 flex-col items-center">
      <div className="w-full max-w-7xl">
        <section 
          className="relative flex min-h-[60vh] w-full flex-col items-center justify-center bg-cover bg-center bg-no-repeat p-4 py-20 text-center text-white" 
          aria-label="Hero section with hotel exterior view"
          style={{
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%), url("/images/Compound.svg")'
          }}
        >
          <div className="flex flex-col gap-4">
            <h2 className="text-4xl font-black leading-tight tracking-tighter md:text-6xl">
              Your Gateway to Tigray's History and Comfort
            </h2>
            <p className="mx-auto max-w-2xl text-base font-normal leading-normal text-gray-200 md:text-lg">
              Experience unparalleled hospitality in the heart of Adigrat.
            </p>
          </div>
        </section>
        
        <div className="relative -mt-16 flex justify-center px-4">
          <div className="w-full max-w-4xl rounded-xl border border-border-color bg-background-light p-4 shadow-lg dark:border-text-secondary/30 dark:bg-background-dark">
            <form className="grid grid-cols-1 gap-4 md:grid-cols-4" aria-label="Hotel booking form" onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-text-secondary" htmlFor="check-in">
                  Check-in Date
                </label>
                <input 
                  className="h-12 rounded-lg border border-border-color bg-white px-3 text-text-primary focus:border-primary focus:ring-2 focus:ring-primary dark:border-text-secondary/50 dark:bg-background-light/10 dark:text-background-light" 
                  id="check-in" 
                  name="check-in" 
                  type="date" 
                  required 
                  aria-required="true"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-text-secondary" htmlFor="check-out">
                  Check-out Date
                </label>
                <input 
                  className="h-12 rounded-lg border border-border-color bg-white px-3 text-text-primary focus:border-primary focus:ring-2 focus:ring-primary dark:border-text-secondary/50 dark:bg-background-light/10 dark:text-background-light" 
                  id="check-out" 
                  name="check-out" 
                  type="date" 
                  required 
                  aria-required="true"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-text-secondary" htmlFor="guests">
                  Guests
                </label>
                <select 
                  className="h-12 rounded-lg border border-border-color bg-white px-3 text-text-primary focus:border-primary focus:ring-2 focus:ring-primary dark:border-text-secondary/50 dark:bg-background-light/10 dark:text-background-light" 
                  id="guests" 
                  name="guests" 
                  required 
                  aria-required="true"
                >
                  <option value="1">1 Adult</option>
                  <option value="2">2 Adults</option>
                  <option value="3">2 Adults, 1 Child</option>
                  <option value="4">2 Adults, 2 Children</option>
                </select>
              </div>
              <div className="flex flex-col justify-end">
                <button 
                  type="submit" 
                  className="flex h-12 w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary px-5 text-base font-bold text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  <span>Check Availability</span>
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="featured-rooms">
          <div className="text-center mb-12">
            <h2 id="featured-rooms" className="text-3xl font-bold tracking-tight text-text-primary dark:text-background-light mb-4">
              Our Featured Rooms
            </h2>
            <p className="mx-auto max-w-2xl text-text-secondary dark:text-text-secondary/90">
              Discover our selection of comfortable accommodations designed for your perfect stay.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            <Card
              image={{
                src: "/images/Room-Bed.svg",
                alt: "Economy Single Room"
              }}
              title="Economy Single Room"
              description="Perfect for solo travelers with a stunning city view."
              price="From $50 / night"
              button={{
                text: "VIEW DETAILS & BOOK",
                href: "/rooms"
              }}
            />

            <Card
              image={{
                src: "/images/Room-Larger.svg",
                alt: "Comfort Double Room"
              }}
              title="Comfort Double Room"
              description="Spacious comfort for couples, featuring a private balcony."
              price="From $75 / night"
              button={{
                text: "VIEW DETAILS & BOOK",
                href: "/rooms"
              }}
            />

            <Card
              image={{
                src: "/images/Twin-Room.svg",
                alt: "Family Suite"
              }}
              title="Family Suite"
              description="Ideal for families, with multiple beds and extra space."
              price="From $110 / night"
              button={{
                text: "VIEW DETAILS & BOOK",
                href: "/rooms"
              }}
            />
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href="/rooms" 
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              View All Rooms
            </Link>
          </div>
        </section>
        
        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="why-book-direct">
          <div className="text-center">
            <h2 id="why-book-direct" className="text-3xl font-bold tracking-tight text-text-primary dark:text-background-light">
              Why Book Direct?
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <article className="flex flex-col items-center gap-4 rounded-lg bg-white p-6 text-center dark:bg-background-light/5">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary" aria-hidden="true">
                <span className="material-symbols-outlined text-3xl">sell</span>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-bold text-text-primary dark:text-background-light">Best Price Guarantee</h3>
                <p className="text-sm text-text-secondary dark:text-text-secondary/90">
                  Always get the best available rate when you book directly with us.
                </p>
              </div>
            </article>
            <article className="flex flex-col items-center gap-4 rounded-lg bg-white p-6 text-center dark:bg-background-light/5">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary" aria-hidden="true">
                <span className="material-symbols-outlined text-3xl">star</span>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-bold text-text-primary dark:text-background-light">Exclusive Offers</h3>
                <p className="text-sm text-text-secondary dark:text-text-secondary/90">
                  Access special packages and deals you won't find anywhere else.
                </p>
              </div>
            </article>
            <article className="flex flex-col items-center gap-4 rounded-lg bg-white p-6 text-center dark:bg-background-light/5">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary" aria-hidden="true">
                <span className="material-symbols-outlined text-3xl">task_alt</span>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-bold text-text-primary dark:text-background-light">Flexible Cancellation</h3>
                <p className="text-sm text-text-secondary dark:text-text-secondary/90">
                  Enjoy peace of mind with our flexible cancellation policies.
                </p>
              </div>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}