import type { Metadata } from "next/types";
import Link from "next/link";
import HeroImage from "@/components/HeroImage";
import Card from "../../../components/Card";
import { Icon } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: 'Local Attractions | Canaan Hotel — Gheralta, Al-Najashi, Debre Damo',
  description: "Explore Tigray's ancient wonders from Canaan Hotel. Gheralta rock churches (45km), Al-Najashi Mosque (32km), Debre Damo Monastery (52km). Your highland base camp.",
  openGraph: {
    title: 'Discover the Tigray Highlands | Canaan International Hotel',
    description: 'Gateway to the spiritual heart of the Horn of Africa. Ancient monasteries, sacred mosques, vertical sandstone landscapes.',
    images: ['/images/heroes/Ext-Compund.webp'],
  },
};

interface Attraction {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  image: string;
  distance: string;
  category: string;
  highlights: string[];
}

const attractions: Attraction[] = [
  {
    id: "debre-damo",
    name: "Debre Damo Monastery",
    description: "An ancient monastery perched atop a flat-topped mountain.",
    longDescription: "One of the oldest monasteries in Ethiopia, Debre Damo is accessible only by climbing a 15-meter rope up a sheer cliff face. This 6th-century monastery houses ancient manuscripts and offers breathtaking views of the surrounding landscape.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVBCiJf9wtUSe8GRtQ7FjJUL8fqmByyx3a4qTqQ4n4-Ktm0mo3pH9pUo8uYbzc7pSTsYQWC9WKS_MOLPYFKGQS1Ynu5UXq-QmoswfdXlt3IDrCGl334TDwMKhUc0kiS86rI4ylnTuYIpkv7nb4_LyTXcdTfjKTVMOHo4AG3w2nZv9nz4eOjt_Qsnjym7EGUbYmBexcpulCoMUbKpqoDgjuFuWWQDt8TvJ0TTqeXk65Mb-Odp1FD2F6X7eCjNp_5VISBUWeJhlZ1Qtu",
    distance: "45 km",
    category: "Religious Site",
    highlights: ["6th century monastery", "Ancient manuscripts", "Rope climb access", "Panoramic views"],
  },
  {
    id: "gheralta",
    name: "Gheralta Mountains",
    description: "Home to stunning rock-hewn churches and panoramic views.",
    longDescription: "The Gheralta mountain range features dramatic sandstone cliffs and is home to some of the most impressive rock-hewn churches in Ethiopia. These ancient churches, carved into cliff faces, date back to the 4th-6th centuries.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOmzVXKyVHsOx5BZJWwzPKLNMpkFW0fPK_T6kwrzbuR1SHuGeOlUqQ5iQdDZ24F_uXiLTIRpp1jk-wCrZxA3OsyUxnlhaT0cTuR1qivKgKiXaC4BkeXMRihJwrwcinyoTV5O7hc0qsQZlQS5qIv0R_aQ5CizVwvf17Mu-9q5G6vgzVjddqcCtJqDweNpb0wk_UMwGCVCG8hk2T6Xffjriy0Duk_Hfqt6j8hpoJdRGZhC61HW5we8N_gYV6nX9-dPEJok4mvXIKhHwV",
    distance: "65 km",
    category: "Natural Wonder",
    highlights: ["Rock-hewn churches", "Dramatic cliffs", "Hiking trails", "Ancient frescoes"],
  },
  {
    id: "al-nejashi",
    name: "Al-Nejashi Mosque",
    description: "One of the earliest mosques in Africa, a site of great historical importance.",
    longDescription: "The Al-Nejashi Mosque is believed to be the first mosque in Africa, established during the first Hijra when early Muslims sought refuge in the Ethiopian kingdom. This historically significant site represents the peaceful coexistence of religions in Ethiopia.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBu1k1XaYnLWxoh_9eox5bwqgUMyw6TLJvyOs0Z4OkVoWWhjdFNrXXRF9X6CbCqqx7QMW0zFPcwvsPQn0jDImshfGxd0GMEKmWuF6Vq6XtTylCEo3OBIl9rSoaNHS33g4HNsV1sLmQd_L6uCT5wqcE-yythiueqZJ_PT8FIkllUYS_JPQ1fSfSCv8pEmMs47I5lvxXTwDY7971GKY8JDBXNG1vJ3kSw8SYuCMsInmPJhichHxmplgY7VrQ0b4DrcIk55orKUc6tJk1o",
    distance: "30 km",
    category: "Religious Site",
    highlights: ["First mosque in Africa", "Historical significance", "Religious harmony", "Cultural heritage"],
  },
  {
    id: "yeha-temple",
    name: "Yeha Temple",
    description: "A pre-Aksumite temple dating back over 2,500 years.",
    longDescription: "The Great Temple of Yeha is one of the oldest standing structures in Ethiopia, dating to around the 8th-7th century BC. This remarkable monument from the pre-Aksumite period showcases the advanced civilization that existed in this region.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVBCiJf9wtUSe8GRtQ7FjJUL8fqmByyx3a4qTqQ4n4-Ktm0mo3pH9pUo8uYbzc7pSTsYQWC9WKS_MOLPYFKGQS1Ynu5UXq-QmoswfdXlt3IDrCGl334TDwMKhUc0kiS86rI4ylnTuYIpkv7nb4_LyTXcdTfjKTVMOHo4AG3w2nZv9nz4eOjt_Qsnjym7EGUbYmBexcpulCoMUbKpqoDgjuFuWWQDt8TvJ0TTqeXk65Mb-Odp1FD2F6X7eCjNp_5VISBUWeJhlZ1Qtu",
    distance: "55 km",
    category: "Archaeological Site",
    highlights: ["Pre-Aksumite era", "2,500+ years old", "Ancient architecture", "Historical museum"],
  },
  {
    id: "adigrat-market",
    name: "Adigrat Local Market",
    description: "Experience authentic Ethiopian culture and local crafts.",
    longDescription: "The vibrant local market in Adigrat offers an authentic glimpse into daily Ethiopian life. Browse traditional crafts, sample local produce, and experience the warm hospitality of the Tigrayan people.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOmzVXKyVHsOx5BZJWwzPKLNMpkFW0fPK_T6kwrzbuR1SHuGeOlUqQ5iQdDZ24F_uXiLTIRpp1jk-wCrZxA3OsyUxnlhaT0cTuR1qivKgKiXaC4BkeXMRihJwrwcinyoTV5O7hc0qsQZlQS5qIv0R_aQ5CizVwvf17Mu-9q5G6vgzVjddqcCtJqDweNpb0wk_UMwGCVCG8hk2T6Xffjriy0Duk_Hfqt6j8hpoJdRGZhC61HW5we8N_gYV6nX9-dPEJok4mvXIKhHwV",
    distance: "1 km",
    category: "Cultural Experience",
    highlights: ["Traditional crafts", "Local produce", "Cultural immersion", "Walking distance"],
  },
  {
    id: "qohaito",
    name: "Qohaito Archaeological Site",
    description: "Ancient ruins with mysterious stelae and rock carvings.",
    longDescription: "Qohaito features impressive pre-Aksumite ruins including the remains of a dam, stelae, and rock carvings. This archaeological site provides insights into the advanced civilization that flourished in this region thousands of years ago.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBu1k1XaYnLWxoh_9eox5bwqgUMyw6TLJvyOs0Z4OkVoWWhjdFNrXXRF9X6CbCqqx7QMW0zFPcwvsPQn0jDImshfGxd0GMEKmWuF6Vq6XtTylCEo3OBIl9rSoaNHS33g4HNsV1sLmQd_L6uCT5wqcE-yythiueqZJ_PT8FIkllUYS_JPQ1fSfSCv8pEmMs47I5lvxXTwDY7971GKY8JDBXNG1vJ3kSw8SYuCMsInmPJhichHxmplgY7VrQ0b4DrcIk55orKUc6tJk1o",
    distance: "80 km",
    category: "Archaeological Site",
    highlights: ["Ancient ruins", "Mysterious stelae", "Rock carvings", "Historical research"],
  },
];

export default function AttractionsPage() {
  return (
    <main id="main-content" className="flex flex-1 flex-col items-center">
      <div className="w-full max-w-7xl">
        {/* Hero Section */}
        <section
          className="relative flex min-h-[50vh] w-full flex-col items-center justify-center p-4 py-20 text-center text-white"
          aria-label="Local attractions hero section"
        >
          <HeroImage
            src="/images/heroes/Ext-Compund.webp"
            alt="Beautiful landscape of Tigray region"
            overlayOpacity={0.5}
            className="absolute inset-0 -z-10"
          />
          <div className="flex flex-col gap-4 relative z-10">
            <h1 className="text-4xl font-black leading-tight tracking-tighter md:text-6xl">
              Explore Adigrat & Tigray
            </h1>
            <p className="mx-auto max-w-2xl text-base font-normal leading-normal text-gray-200 md:text-lg">
              Discover the rich history and breathtaking landscapes surrounding our hotel.
            </p>
          </div>
        </section>

        {/* Featured Attractions */}
        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="featured-attractions">
          <div className="text-center mb-12">
            <h2 id="featured-attractions" className="text-3xl font-bold tracking-tight text-text-primary dark:text-background-light mb-4">
              Must-Visit Destinations
            </h2>
            <p className="mx-auto max-w-2xl text-text-secondary dark:text-text-secondary/90">
              From ancient monasteries to stunning natural landscapes, Tigray offers unforgettable experiences.
            </p>
          </div>

          {/* Main Attractions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {attractions.slice(0, 3).map((attraction) => (
              <Card
                key={attraction.id}
                image={{
                  src: attraction.image,
                  alt: attraction.name
                }}
                title={attraction.name}
                description={attraction.description}
                badges={[
                  { text: attraction.category, variant: 'primary' },
                  { text: attraction.distance, variant: 'secondary' }
                ]}
                button={{
                  text: "LEARN MORE",
                  href: `#${attraction.id}`
                }}
              />
            ))}
          </div>
        </section>

        {/* All Attractions List */}
        <section className="px-4 pb-16 sm:px-6 lg:px-8" aria-labelledby="all-attractions">
          <h2 id="all-attractions" className="text-2xl font-bold tracking-tight text-text-primary dark:text-background-light mb-8 text-center">
            All Nearby Attractions
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {attractions.map((attraction) => (
              <article
                key={attraction.id}
                id={attraction.id}
                className="flex flex-col sm:flex-row gap-4 rounded-xl border border-border-color bg-white p-4 dark:border-text-secondary/10 dark:bg-background-dark/50 hover:shadow-lg transition-shadow"
              >
                <div
                  className="w-full sm:w-40 h-32 rounded-lg bg-cover bg-center flex-shrink-0"
                  style={{ backgroundImage: `url("${attraction.image}")` }}
                  role="img"
                  aria-label={attraction.name}
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-text-primary dark:text-background-light">
                        {attraction.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="inline-block px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                          {attraction.category}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-text-secondary">
                          <Icon name="place" className="text-sm" />
                          {attraction.distance}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-text-secondary dark:text-text-secondary/90 mb-3">
                    {attraction.longDescription}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {attraction.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="inline-block px-2 py-1 rounded-full bg-gray-100 text-gray-700 text-xs dark:bg-text-secondary/10 dark:text-text-secondary"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Tour Services */}
        <section className="px-4 py-16 sm:px-6 lg:px-8 bg-white dark:bg-background-light/5" aria-labelledby="tour-services">
          <div className="text-center mb-12">
            <h2 id="tour-services" className="text-3xl font-bold tracking-tight text-text-primary dark:text-background-light mb-4">
              Tour Services
            </h2>
            <p className="mx-auto max-w-2xl text-text-secondary dark:text-text-secondary/90">
              Let us help you explore the wonders of Tigray with our guided tour services.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <article className="flex flex-col items-center gap-4 rounded-lg bg-background-light p-6 text-center dark:bg-background-dark">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary" aria-hidden="true">
                <Icon name="directions_car" className="text-3xl" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-bold text-text-primary dark:text-background-light">Private Transfers</h3>
                <p className="text-sm text-text-secondary dark:text-text-secondary/90">
                  Comfortable private transportation to all attractions with experienced drivers.
                </p>
              </div>
            </article>
            <article className="flex flex-col items-center gap-4 rounded-lg bg-background-light p-6 text-center dark:bg-background-dark">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary" aria-hidden="true">
                <Icon name="person" className="text-3xl" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-bold text-text-primary dark:text-background-light">Expert Guides</h3>
                <p className="text-sm text-text-secondary dark:text-text-secondary/90">
                  Knowledgeable local guides who bring history and culture to life.
                </p>
              </div>
            </article>
            <article className="flex flex-col items-center gap-4 rounded-lg bg-background-light p-6 text-center dark:bg-background-dark">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary" aria-hidden="true">
                <Icon name="calendar_month" className="text-3xl" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-bold text-text-primary dark:text-background-light">Custom Itineraries</h3>
                <p className="text-sm text-text-secondary dark:text-text-secondary/90">
                  Tailored tour packages designed around your interests and schedule.
                </p>
              </div>
            </article>
          </div>
          <div className="text-center mt-12">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 text-base font-bold text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Inquire About Tours
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
