import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Hero from "../../components/Hero";
import BookingCard from "../../components/BookingCard";
import RoomCard from "../../components/RoomCard";
import OptimizedImage from "../../components/OptimizedImage";
import Testimonials from "../../components/Testimonials";
import { FEATURED_ROOMS } from "@/lib/featuredRooms";

export const metadata: Metadata = {
  title: "Cannan International Hotel - Your Gateway to Tigray's History and Comfort",
  description: "Experience unparalleled hospitality at Cannan International Hotel in Adigrat, Tigray. Book direct for best rates, exclusive offers, and flexible cancellation.",
  keywords: "hotel Adigrat, Tigray hotel, Cannan International Hotel, Ethiopia hotel booking",
  authors: [{ name: "Cannan International Hotel" }],
  openGraph: {
    title: "Cannan International Hotel - Your Gateway to Tigray's History and Comfort",
    description: "Experience unparalleled hospitality in the heart of Adigrat. Book direct for best rates and exclusive offers.",
    images: ["/images/room-placeholder.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cannan International Hotel - Your Gateway to Tigray's History and Comfort",
    description: "Experience unparalleled hospitality in the heart of Adigrat.",
    images: ["/images/room-placeholder.jpg"],
  },
};

export default function HomePage() {

  return (
    <>

      {/* Hero Section with integrated header */}
      <Hero />

      {/* Booking Card Section */}
      <BookingCard />

      <main id="main-content" className="flex flex-1 flex-col items-center">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="featured-rooms">
            <div className="text-center mb-12">
              <h2 id="featured-rooms" className="text-3xl font-bold tracking-tight text-text-primary dark:text-background-light mb-4">Our Featured Rooms</h2>
              <p className="mx-auto max-w-2xl text-text-secondary dark:text-text-secondary/90">Discover our selection of comfortable accommodations designed for your perfect stay.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {FEATURED_ROOMS.map((room) => (
                <RoomCard
                  key={room.slug}
                  slug={room.slug}
                  imageSrc={room.imageSrc}
                  imageAlt={room.imageAlt}
                  name={room.name}
                  description={room.description}
                  priceLabel={room.priceLabel}
                  badges={room.badges}
                  rating={room.rating}
                />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/rooms" className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                View All Rooms
              </Link>
            </div>
          </section>
          <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="why-book-direct">
            <div className="text-center">
              <h2 id="why-book-direct" className="text-3xl font-bold tracking-tight text-text-primary dark:text-background-light">Why Book Direct?</h2>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
              <article className="flex flex-col items-center gap-4 rounded-lg bg-white p-6 text-center dark:bg-background-light/5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary" aria-hidden="true">
                  <span className="material-symbols-outlined text-3xl">sell</span>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-bold text-text-primary dark:text-background-light">Best Price Guarantee</h3>
                  <p className="text-sm text-text-secondary dark:text-text-secondary/90">Always get the best available rate when you book directly with us.</p>
                </div>
              </article>
              <article className="flex flex-col items-center gap-4 rounded-lg bg-white p-6 text-center dark:bg-background-light/5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary" aria-hidden="true">
                  <span className="material-symbols-outlined text-3xl">star</span>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-bold text-text-primary dark:text-background-light">Exclusive Offers</h3>
                  <p className="text-sm text-text-secondary dark:text-text-secondary/90">Access special packages and deals you won't find anywhere else.</p>
                </div>
              </article>
              <article className="flex flex-col items-center gap-4 rounded-lg bg-white p-6 text-center dark:bg-background-light/5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary" aria-hidden="true">
                  <span className="material-symbols-outlined text-3xl">task_alt</span>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-bold text-text-primary dark:text-background-light">Flexible Cancellation</h3>
                  <p className="text-sm text-text-secondary dark:text-text-secondary/90">Enjoy peace of mind with our flexible cancellation policies.</p>
                </div>
              </article>
            </div>
          </section>




          <Testimonials />

          <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="explore-tigray">
            <div className="text-center">
              <h2 id="explore-tigray" className="text-3xl font-bold tracking-tight text-text-primary dark:text-background-light">Explore Adigrat & Tigray</h2>
              <p className="mx-auto mt-4 max-w-2xl text-text-secondary dark:text-text-secondary/90">Discover the rich history and breathtaking landscapes surrounding our hotel.</p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
              <a className="group block overflow-hidden rounded-xl" href="#debre-damo" aria-label="Learn more about Debre Damo Monastery">
                <div className="relative">
                  <OptimizedImage
                    src="/images/room-placeholder.jpg"
                    alt="The ancient cliff-face monastery of Debre Damo"
                    width={600}
                    height={400}
                    className="h-64 w-full object-cover rounded-xl border border-border-color dark:border-text-secondary/30"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={75}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 p-6">
                    <h3 className="text-xl font-bold text-white">Debre Damo Monastery</h3>
                    <p className="mt-1 text-sm text-gray-300">An ancient monastery perched atop a flat-topped mountain.</p>
                  </div>
                </div>
              </a>
              <a className="group block overflow-hidden rounded-xl" href="#gheralta" aria-label="Learn more about Gheralta Mountains">
                <div className="relative">
                  <OptimizedImage
                    src="/images/room-placeholder.jpg"
                    alt="Dramatic sandstone cliffs of the Gheralta Mountains at sunset"
                    width={600}
                    height={400}
                    className="h-64 w-full object-cover rounded-xl border border-border-color dark:border-text-secondary/30"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={75}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 p-6">
                    <h3 className="text-xl font-bold text-white">Gheralta Mountains</h3>
                    <p className="mt-1 text-sm text-gray-300">Home to stunning rock-hewn churches and panoramic views.</p>
                  </div>
                </div>
              </a>
              <a className="group block overflow-hidden rounded-xl" href="#al-nejashi" aria-label="Learn more about Al-Nejashi Mosque">
                <div className="relative">
                  <OptimizedImage
                    src="/images/room-placeholder.jpg"
                    alt="The historic Al-Nejashi Mosque with its white minarets"
                    width={600}
                    height={400}
                    className="h-64 w-full object-cover rounded-xl border border-border-color dark:border-text-secondary/30"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={75}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 p-6">
                    <h3 className="text-xl font-bold text-white">Al-Nejashi Mosque</h3>
                    <p className="mt-1 text-sm text-gray-300">One of the earliest mosques in Africa, a site of great historical importance.</p>
                  </div>
                </div>
              </a>
            </div>
          </section>
          <section className="px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="trusted-partners">
            <div className="text-center">
              <h2 id="trusted-partners" className="text-2xl font-bold tracking-tight text-text-primary dark:text-background-light">Trusted by Travelers Worldwide</h2>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-8 opacity-60 dark:opacity-80 md:gap-12">
              <Image className="h-8 w-auto dark:brightness-0 dark:invert" alt="TripAdvisor logo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDrh16GHYlnaqEVWs2yuQQVY-cZT5cKmTV1Z5f7LMqcxHYmGPX83yGuWpIhyDz-sI0EAVDMOGKJnCixD6nRZlAy6VQqXlZbFWo4rHnIUKXbr8BQ0kl7vlX5LhG1fnX4EwM64cK3zcbvZi0NM2mRjJcl1Z6baJznFavNIXNy4miBiF4zDBFt5J9gWKqQofEwlQQBIcdyN2Mf7M34bZyDAl73Yq-ZQ3stdftFVktK5CtYpo4DqSZ2_KaBGf8rnHM_IuNuGkThbQzm3I3" width={120} height={32} />
              <Image className="h-6 w-auto dark:brightness-0 dark:invert" alt="Booking.com logo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCER0_PlwABxBmlMMmAaU_yGix4gPIkXQKzPDFZ6WH5PJpJXSIbeFtD0JGKmaUlVh_-7MoJjGgDhuH29mzUNnuJvgaQreqY556Gp3nkbK-8SjpQsrPoEwWDUYBmYtnos7TgGUmaxFS61olFKtzfpsz8iClF-uuSJhKMddiHAoizkLTXluXZezNyqTerQ7pQfokpIAoQtyNxeNGanobXz8JodC-O06PRkK6NZgkk9JmF_Slaqhac-0YQHBuC-u-2ug-dYr85plGoSWtC" width={120} height={24} />
              <Image className="h-8 w-auto dark:brightness-0 dark:invert" alt="Expedia logo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAv1O8s218liaKe7XB8AYkqIOoVFhaQn3CA1T4eTN4yjx6SqOQJKjrQ_GfRjnndl1FOwYIkt6gKaTWC0Jh2BSTQ2S7xGxx-liXYIWNYirmSF_On39JZxpCwFi6Y3-U8yiXk9N_5ak-x2Mt1cNWYDeCyyDd8IyLStmBqqDhb8QTrRSv3jfFjy2UPcg3ubnwGq1TmBF0bK2NTmCVZqJqqt9JLSrkSwpATqQBdIAXgQBk8paHNYod4qefHI-I2BA3wb9zoOHQRX19rOI-q" width={120} height={32} />
            </div>
          </section>

        </div>
      </main>
    </>
  );
}

