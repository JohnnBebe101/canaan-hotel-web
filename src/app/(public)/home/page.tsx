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
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%), url("/assets/images/Compound.jpg")'
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
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="inline-block px-2 py-1 rounded-full bg-blue-100 text-blue-800" data-demo="true">NEW</span>
                  <span className="inline-block px-2 py-1 rounded-full bg-yellow-100 text-yellow-800" data-demo="true">CONFIRMED</span>
                  <span className="inline-block px-2 py-1 rounded-full bg-purple-100 text-purple-800" data-demo="true">INVOICED</span>
                  <span className="inline-block px-2 py-1 rounded-full bg-gray-100 text-gray-800" data-demo="true">CLOSED</span>
                </div>
                <div className="mt-2 flex gap-2">
                  <button className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm" data-demo="true">
                    Demo: Quick Book
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm" data-demo="true">
                    Demo: Special Rates
                  </button>
                </div>
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
                src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCDrh16GHYlnaqEVWs2yuQQVY-cZT5cKmTV1Z5f7LMqcxHYmGPX83yGuWpIhyDz-sI0EAVDMOGKJnCixD6nRZlAy6VQqXlZbFWo4rHnIUKXbr8BQ0kl7vlX5LhG1fnX4EwM64cK3zcbvZi0NM2mRjJcl1Z6baJznFavNIXNy4miBiF4zDBFt5J9gWKqQofEwlQQBIcdyN2Mf7M34bZyDAl73Yq-ZQ3stdftFVktK5CtYpo4DqSZ2_KaBGf8rnHM_IuNuGkThbQzm3I3",
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
                src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCER0_PlwABxBmlMMmAaU_yGix4gPIkXQKzPDFZ6WH5PJpJXSIbeFtD0JGKmaUlVh_-7MoJjGgDhuH29mzUNnuJvgaQreqY556Gp3nkbK-8SjpQsrPoEwWDUYBmYtnos7TgGUmaxFS61olFKtzfpsz8iClF-uuSJhKMddiHAoizkLTXluXZezNyqTerQ7pQfokpIAoQtyNxeNGanobXz8JodC-O06PRkK6NZgkk9JmF_Slaqhac-0YQHBuC-u-2ug-dYr85plGoSWtC",
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
                src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAv1O8s218liaKe7XB8AYkqIOoVFhaQn3CA1T4eTN4yjx6SqOQJKjrQ_GfRjnndl1FOwYIkt6gKaTWC0Jh2BSTQ2S7xGxx-liXYIWNYirmSF_On39JZxpCwFi6Y3-U8yiXk9N_5ak-x2Mt1cNWYDeCyyDd8IyLStmBqqDhb8QTrRSv3jfFjy2UPcg3ubnwGq1TmBF0bK2NTmCVZqJqqt9JLSrkSwpATqQBdIAXgQBk8paHNYod4qefHI-I2BA3wb9zoOHQRX19rOI-q",
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
        
        <section className="px-4 py-8 sm:px-6 lg:px-8" aria-labelledby="demo-newsletter">
          <div className="max-w-4xl mx-auto">
            <div className="p-6 my-6 border border-gray-300 rounded-lg shadow-sm">
              <div className="text-center mb-6">
                <h2 id="demo-newsletter" className="text-xl font-bold text-text-primary dark:text-background-light mb-2">
                  Demo: Email Marketing Suite
                </h2>
                <p className="text-sm text-text-secondary dark:text-text-secondary/90">
                  Automated campaigns, guest communications, and marketing analytics
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-block px-2 py-1 rounded-full bg-gray-200 text-gray-800">Demo: Welcome Series</span>
                    <span className="inline-block px-2 py-1 rounded-full bg-gray-200 text-gray-800">Demo: Booking Confirmations</span>
                    <span className="inline-block px-2 py-1 rounded-full bg-gray-200 text-gray-800">Demo: Promotional Campaigns</span>
                  </div>
                </div>
                <div className="w-full sm:w-auto">
                  <div className="flex gap-2">
                    <input 
                      type="email" 
                      placeholder="Enter email for demo" 
                      className="flex-1 sm:w-64 h-10 rounded-lg border border-border-color bg-white px-3 text-sm text-text-primary focus:border-primary focus:ring-2 focus:ring-primary dark:border-text-secondary/50 dark:bg-background-light/10 dark:text-background-light" 
                    />
                    <button 
                      type="button" 
                      className="px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-white"
                      data-demo="true"
                    >
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Demo Integration Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 py-8" data-demo="true">
          <div className="p-6 border border-gray-300 rounded-lg shadow-sm" data-demo="true">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-blue-600">people</span>
              </div>
              <h3 className="font-semibold text-gray-900">Demo: CRM System</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Active Guests</span>
                <span className="inline-block px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs">247</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Loyalty Members</span>
                <span className="inline-block px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs">1,203</span>
              </div>
              <button className="w-full mt-3 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm" data-demo="true">
                Demo: Manage Guests
              </button>
            </div>
          </div>
          
          <div className="p-6 border border-gray-300 rounded-lg shadow-sm" data-demo="true">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-green-600">credit_card</span>
              </div>
              <h3 className="font-semibold text-gray-900">Demo: Payments</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Today's Revenue</span>
                <span className="inline-block px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs">$2,847</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Pending</span>
                <span className="inline-block px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs">$423</span>
              </div>
              <button className="w-full mt-3 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm" data-demo="true">
                Demo: Process Payments
              </button>
            </div>
          </div>
          
          <div className="p-6 border border-gray-300 rounded-lg shadow-sm" data-demo="true">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-purple-600">mail</span>
              </div>
              <h3 className="font-semibold text-gray-900">Demo: Email Marketing</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Open Rate</span>
                <span className="inline-block px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs">68%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Subscribers</span>
                <span className="inline-block px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs">3,492</span>
              </div>
              <button className="w-full mt-3 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm" data-demo="true">
                Demo: Send Campaign
              </button>
            </div>
          </div>
          
          <div className="p-6 border border-gray-300 rounded-lg shadow-sm" data-demo="true">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-orange-600">travel_explore</span>
              </div>
              <h3 className="font-semibold text-gray-900">Demo: OTA Integration</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Booking.com</span>
                <span className="inline-block px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs">Sync</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Expedia</span>
                <span className="inline-block px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs">Sync</span>
              </div>
              <button className="w-full mt-3 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm" data-demo="true">
                Demo: Manage Channels
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}