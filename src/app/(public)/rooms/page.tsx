"use client";

import Link from "next/link";

export default function RoomsPage() {
  return (
    <main className="flex-1 px-4 sm:px-10 lg:px-20 py-10 sm:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap justify-between gap-3 mb-8">
          <div className="flex min-w-72 flex-col gap-3">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-black leading-tight tracking-[-0.033em] text-text-primary dark:text-background-light">
                  Rooms & Suites
                </h1>
                <p className="text-base font-normal leading-normal text-text-secondary dark:text-text-secondary/90">
                  Discover our comfortable accommodations designed for your perfect stay.
                </p>
              </div>
              <div className="flex gap-2">
                <span className="inline-block px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium" data-demo="true">
                  24 Available
                </span>
                <span className="inline-block px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium" data-demo="true">
                  Best Rates
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-background-light dark:bg-background-dark/80 pl-4 pr-3 border border-border-color dark:border-text-secondary/20 hover:border-text-primary/50 dark:hover:border-text-primary/50 transition-colors">
              <p className="text-text-primary dark:text-background-light text-sm font-medium leading-normal">Price</p>
              <span className="material-symbols-outlined text-text-secondary dark:text-gray-400 text-base">expand_more</span>
            </button>
            <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-background-light dark:bg-background-dark/80 pl-4 pr-3 border border-border-color dark:border-text-secondary/20 hover:border-text-primary/50 dark:hover:border-text-primary/50 transition-colors">
              <p className="text-text-primary dark:text-background-light text-sm font-medium leading-normal">Beds</p>
              <span className="material-symbols-outlined text-text-secondary dark:text-gray-400 text-base">expand_more</span>
            </button>
            <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-background-light dark:bg-background-dark/80 pl-4 pr-3 border border-border-color dark:border-text-secondary/20 hover:border-text-primary/50 dark:hover:border-text-primary/50 transition-colors">
              <p className="text-text-primary dark:text-background-light text-sm font-medium leading-normal">Amenities</p>
              <span className="material-symbols-outlined text-text-secondary dark:text-gray-400 text-base">expand_more</span>
            </button>
            <button className="flex h-10 shrink-0 items-center justify-center rounded-full text-sm font-medium ml-auto text-text-secondary dark:text-gray-400 hover:text-text-primary dark:hover:text-background-light transition-colors px-4">
              <p>Clear Filters</p>
            </button>
            <div className="flex gap-2 mt-4 md:mt-0">
              <button className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm" data-demo="true">
                Demo: Bulk Update
              </button>
              <button className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm" data-demo="true">
                Demo: Rate Manager
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div className="flex flex-col group overflow-hidden rounded-xl border border-border-color dark:border-text-secondary/10 bg-white dark:bg-background-dark hover:shadow-lg dark:hover:border-text-secondary/20 transition-all duration-300">
            <div className="overflow-hidden">
              <div 
                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-t-xl group-hover:scale-105 transition-transform duration-300" 
                data-alt="A bright, clean hotel room with a single bed and a window showing a city view"
                style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCDrh16GHYlnaqEVWs2yuQQVY-cZT5cKmTV1Z5f7LMqcxHYmGPX83yGuWpIhyDz-sI0EAVDMOGKJnCixD6nRZlAy6VQqXlZbFWo4rHnIUKXbr8BQ0kl7vlX5LhG1fnX4EwM64cK3zcbvZi0NM2mRjJcl1Z6baJznFavNIXNy4miBiF4zDBFt5J9gWKqQofEwlQQBIcdyN2Mf7M34bZyDAl73Yq-ZQ3stdftFVktK5CtYpo4DqSZ2_KaBGf8rnHM_IuNuGkThbQzm3I3")'}}
              ></div>
            </div>
            <div className="p-5 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-text-primary dark:text-background-light text-lg font-bold leading-normal">
                  Economy Single Room
                </h3>
                <span className="inline-block px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium" data-demo="true">
                  Available
                </span>
              </div>
              <p className="text-text-secondary dark:text-gray-400 text-sm font-normal leading-normal mt-1">
                Perfect for solo travelers with a stunning city view.
              </p>
              <p className="text-text-secondary dark:text-gray-400 text-sm font-bold leading-normal mt-2 mb-4">
                From $50 / night
              </p>
              <Link 
                href="/rooms/economy-single" 
                className="mt-auto flex min-w-[84px] max-w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 px-5 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] w-full hover:opacity-90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <span className="truncate">VIEW DETAILS & BOOK</span>
              </Link>
            </div>
          </div>
          
          <div className="flex flex-col group overflow-hidden rounded-xl border border-border-color dark:border-text-secondary/10 bg-white dark:bg-background-dark hover:shadow-lg dark:hover:border-text-secondary/20 transition-all duration-300">
            <div className="overflow-hidden">
              <div 
                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-t-xl group-hover:scale-105 transition-transform duration-300" 
                data-alt="A spacious hotel room with a double bed, modern decor, and a balcony door"
                style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCER0_PlwABxBmlMMmAaU_yGix4gPIkXQKzPDFZ6WH5PJpJXSIbeFtD0JGKmaUlVh_-7MoJjGgDhuH29mzUNnuJvgaQreqY556Gp3nkbK-8SjpQsrPoEwWDUYBmYtnos7TgGUmaxFS61olFKtzfpsz8iClF-uuSJhKMddiHAoizkLTXluXZezNyqTerQ7pQfokpIAoQtyNxeNGanobXz8JodC-O06PRkK6NZgkk9JmF_Slaqhac-0YQHBuC-u-2ug-dYr85plGoSWtC")'}}
              ></div>
            </div>
            <div className="p-5 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-text-primary dark:text-background-light text-lg font-bold leading-normal">
                  Comfort Double Room
                </h3>
                <span className="inline-block px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-medium" data-demo="true">
                  Booked
                </span>
              </div>
              <p className="text-text-secondary dark:text-gray-400 text-sm font-normal leading-normal mt-1">
                Spacious comfort for couples, featuring a private balcony.
              </p>
              <p className="text-text-secondary dark:text-gray-400 text-sm font-bold leading-normal mt-2 mb-4">
                From $75 / night
              </p>
              <Link 
                href="/rooms/comfort-double" 
                className="mt-auto flex min-w-[84px] max-w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 px-5 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] w-full hover:opacity-90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <span className="truncate">VIEW DETAILS & BOOK</span>
              </Link>
            </div>
          </div>
          
          <div className="flex flex-col group overflow-hidden rounded-xl border border-border-color dark:border-text-secondary/10 bg-white dark:bg-background-dark hover:shadow-lg dark:hover:border-text-secondary/20 transition-all duration-300">
            <div className="overflow-hidden">
              <div 
                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-t-xl group-hover:scale-105 transition-transform duration-300" 
                data-alt="A large hotel suite with multiple beds, a small seating area, suitable for families"
                style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAv1O8s218liaKe7XB8AYkqIOoVFhaQn3CA1T4eTN4yjx6SqOQJKjrQ_GfRjnndl1FOwYIkt6gKaTWC0Jh2BSTQ2S7xGxx-liXYIWNYirmSF_On39JZxpCwFi6Y3-U8yiXk9N_5ak-x2Mt1cNWYDeCyyDd8IyLStmBqqDhb8QTrRSv3jfFjy2UPcg3ubnwGq1TmBF0bK2NTmCVZqJqqt9JLSrkSwpATqQBdIAXgQBk8paHNYod4qefHI-I2BA3wb9zoOHQRX19rOI-q")'}}
              ></div>
            </div>
            <div className="p-5 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-text-primary dark:text-background-light text-lg font-bold leading-normal">
                  Family Suite
                </h3>
                <span className="inline-block px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium" data-demo="true">
                  Reserved
                </span>
              </div>
              <p className="text-text-secondary dark:text-gray-400 text-sm font-normal leading-normal mt-1">
                Ideal for families, with multiple beds and extra space.
              </p>
              <p className="text-text-secondary dark:text-gray-400 text-sm font-bold leading-normal mt-2 mb-4">
                From $110 / night
              </p>
              <Link 
                href="/rooms/family-suite" 
                className="mt-auto flex min-w-[84px] max-w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 px-5 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] w-full hover:opacity-90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <span className="truncate">VIEW DETAILS & BOOK</span>
              </Link>
            </div>
          </div>
          
          <div className="flex flex-col group overflow-hidden rounded-xl border border-border-color dark:border-text-secondary/10 bg-white dark:bg-background-dark hover:shadow-lg dark:hover:border-text-secondary/20 transition-all duration-300">
            <div className="overflow-hidden">
              <div 
                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-t-xl group-hover:scale-105 transition-transform duration-300" 
                data-alt="A luxurious hotel suite with a king-sized bed, elegant furniture, and a separate living area"
                style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAiZabs3g6lXGTVdXC0S4dE0jsUWDRGgLE2nhnMon8a5nVAxZp1Vim0I11lc59IRbj93Cu8mMPzmzuuG7AaRGIymbDvmpYnYcvzSbSFXWxyH0sFt2OsfXkY4DgF5n11vCbsDXgwJtQQqfywKBM755l39K48jvAHYbblsgImndRFaMp9AjUmuZIfTOUgyAY_oqgsFMcH0llGRXN5C0rAcbcUsbQUO6QMZCqPcdBjv_5C-smt1M2cJYyuLiRz9upckIHvwY_tZW_v10K9")'}}
              ></div>
            </div>
            <div className="p-5 flex flex-col flex-1">
              <h3 className="text-text-primary dark:text-background-light text-lg font-bold leading-normal">
                Executive Suite
              </h3>
              <p className="text-text-secondary dark:text-gray-400 text-sm font-normal leading-normal mt-1">
                Luxury and elegance with premium amenities and a separate living area.
              </p>
              <p className="text-text-secondary dark:text-gray-400 text-sm font-bold leading-normal mt-2 mb-4">
                From $150 / night
              </p>
              <Link 
                href="/rooms/executive-suite" 
                className="mt-auto flex min-w-[84px] max-w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 px-5 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] w-full hover:opacity-90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <span className="truncate">VIEW DETAILS & BOOK</span>
              </Link>
            </div>
          </div>
          
          <div className="flex flex-col group overflow-hidden rounded-xl border border-border-color dark:border-text-secondary/10 bg-white dark:bg-background-dark hover:shadow-lg dark:hover:border-text-secondary/20 transition-all duration-300">
            <div className="overflow-hidden">
              <div 
                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-t-xl group-hover:scale-105 transition-transform duration-300" 
                data-alt="Modern hotel room with two queen beds, suitable for friends or colleagues sharing a room"
                style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBsz2DmSSop27e39jq-diNk5OPwzPvaj9WUrnojamOoICgoSnL7vzXOx3rclNtX31Ly2UGNaB0xLxqiawCixtvhtrFfTp0_bCZqlVEKy95JXz8I_acyLqNNRpZRoKNhrPRoxhjWbFQ9O6dqgmwzkq5_i8zlYqx-BwI7q2hocQCHN6vkx37UfHCTJZyqkVr7NVPzG_z3ImEuUpcnIzx7WguwRHaGhTCi2zv3lGe4Ro6ndGtYshS5eDyLyznWFx52bM28vmdQa6WkkfbF")'}}
              ></div>
            </div>
            <div className="p-5 flex flex-col flex-1">
              <h3 className="text-text-primary dark:text-background-light text-lg font-bold leading-normal">
                Twin Deluxe Room
              </h3>
              <p className="text-text-secondary dark:text-gray-400 text-sm font-normal leading-normal mt-1">
                Features two separate beds, perfect for friends or colleagues.
              </p>
              <p className="text-text-secondary dark:text-gray-400 text-sm font-bold leading-normal mt-2 mb-4">
                From $85 / night
              </p>
              <Link 
                href="/rooms/twin-deluxe" 
                className="mt-auto flex min-w-[84px] max-w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 px-5 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] w-full hover:opacity-90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <span className="truncate">VIEW DETAILS & BOOK</span>
              </Link>
            </div>
          </div>
          
          <div className="flex flex-col group overflow-hidden rounded-xl border border-border-color dark:border-text-secondary/10 bg-white dark:bg-background-dark hover:shadow-lg dark:hover:border-text-secondary/20 transition-all duration-300">
            <div className="overflow-hidden">
              <div 
                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-t-xl group-hover:scale-105 transition-transform duration-300" 
                data-alt="A high-end hotel suite with panoramic city views and opulent furnishings"
                style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBFJDkEiL_VfbAwSab6An4Nhf59N8Hsj8mNfAJnM0CxzjKZrFw6KK09aTLtHCxHE3a6mgbmE9izQyI94RhoLhj1gfslvSe5y8sQg7kDgKHRWrVxl1KE8KPXYK1ZQIbmO8gQ2B4JvDVyRIwr1S9JLHkQ1IaJf05P0uJwwJZ3TYYYehYfJbQTThO7xY5PeVDGs7USfOOHjw6xGak-2k5q7Xx0vNURU3vShAP7W5F5wHB4fUXgR_wK9mnOg5KOvIqAQVDxgAxnj6JDx_Th")'}}
              ></div>
            </div>
            <div className="p-5 flex flex-col flex-1">
              <h3 className="text-text-primary dark:text-background-light text-lg font-bold leading-normal">
                Presidential Suite
              </h3>
              <p className="text-text-secondary dark:text-gray-400 text-sm font-normal leading-normal mt-1">
                The pinnacle of luxury with unmatched views and service.
              </p>
              <p className="text-text-secondary dark:text-gray-400 text-sm font-bold leading-normal mt-2 mb-4">
                From $350 / night
              </p>
              <Link 
                href="/rooms/presidential-suite" 
                className="mt-auto flex min-w-[84px] max-w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 px-5 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] w-full hover:opacity-90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <span className="truncate">VIEW DETAILS & BOOK</span>
              </Link>
            </div>
          </div>
        </div>
        
        <section className="p-6 my-6 border border-gray-300 rounded-lg shadow-sm">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-text-primary dark:text-background-light mb-2">
              Demo: Booking Management System
            </h2>
            <p className="text-sm text-text-secondary dark:text-text-secondary/90">
              Integrated CRM and reservation management for seamless operations
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 my-6 border border-gray-300 rounded-lg shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <span className="material-symbols-outlined text-lg">check_circle</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-text-primary dark:text-background-light">
                    Demo: Real-time Availability
                  </h3>
                  <p className="text-xs text-text-secondary dark:text-text-secondary/90">
                    Auto-sync with booking channels
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 my-6 border border-gray-300 rounded-lg shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <span className="material-symbols-outlined text-lg">person_search</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-text-primary dark:text-background-light">
                    Demo: Guest Profiles
                  </h3>
                  <p className="text-xs text-text-secondary dark:text-text-secondary/90">
                    CRM integration with preferences
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 my-6 border border-gray-300 rounded-lg shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                  <span className="material-symbols-outlined text-lg">analytics</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-text-primary dark:text-background-light">
                    Demo: Revenue Analytics
                  </h3>
                  <p className="text-xs text-text-secondary dark:text-text-secondary/90">
                    Performance tracking & reporting
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}