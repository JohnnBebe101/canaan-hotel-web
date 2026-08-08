import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next/types";

import Button from "@/components/ui/Button";
import BookingCTA from "@/components/public/BookingCTA";
import Badge from "@/components/ui/Badge";
import SectionTitle from "@/components/ui/SectionTitle";
import CanaanPattern from "@/components/ui/CanaanPattern";
import SocialRatingWidget from "@/components/ui/SocialRatingWidget";
import CanaanLogo from "@/components/ui/CanaanLogo";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Icon } from "@/components/ui/Icons";
import { canonical } from "@/lib/seo";

import HeroSlider from "@/components/public/HeroSlider";
import HotelInFrame from "@/components/public/HotelInFrame";
import WebsiteSchema from "@/components/seo/WebsiteSchema";
import HotelSchema from "@/components/seo/HotelSchema";

const AttractionCard = ({ image, title, distance, description }: { image: string, title: string, distance: string, description: string }) => (
  <div className="group cursor-pointer">
    <div className="relative overflow-hidden mb-6 aspect-[4/5] md:aspect-[3/4]">
      <div className="absolute inset-0 bg-forest/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
    <div className="text-cactus text-4xl font-serif mb-6 opacity-30 group-hover:opacity-100 transition-opacity">"</div>
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

export const metadata: Metadata = {
  alternates: { canonical: canonical("/") },
};

export default function Home() {
  return (
    <div className="animate-in fade-in duration-1000 bg-sandstone">
      <WebsiteSchema />
      <HotelSchema />
      <HeroSlider />

      <section className="relative z-20 mt-6 bg-sandstone">
        <Container>
          <form
            role="search"
            action="/search"
            method="get"
            className="mx-auto flex max-w-xl items-center gap-2"
          >
            <input
              type="search"
              name="q"
              placeholder="Search rooms, stories & attractions"
              aria-label="Search the site"
              className="w-full rounded-full border border-cactus/20 bg-white px-6 py-3 text-forest outline-none focus:border-bronze"
            />
            <Button type="submit" variant="primary">Search</Button>
          </form>
        </Container>
      </section>

      <main>
        {/* Verified Recognition Trust Bar */}
        <section className="relative z-30 -mt-16 max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 bg-white shadow-2xl border border-forest/5 overflow-hidden">
            <ScrollReveal delay={0}><SocialRatingWidget platform="google" rating="4.1" reviews="57" href="https://share.google/GfaOOMjriRenNsEqI" /></ScrollReveal>
            <ScrollReveal delay={80}><SocialRatingWidget platform="tripadvisor" rating="4.1" reviews="8" href="https://www.tripadvisor.com/Hotel_Review-g1401789-d13207473-Reviews-Canaan_Hotel-Adigrat_Tigray_Region.html" /></ScrollReveal>
            <ScrollReveal delay={160}><SocialRatingWidget platform="booking" rating="9.2" reviews="56" href="https://www.booking.com/hotel/et/canaan-international-adigrat2.en-gb.html?aid=356980&label=gog235jc-10CAsoR0IdY2FuYWFuLWludGVybmF0aW9uYWwtYWRpZ3JhdDJICVgDaEeIAQGYATO4ARfIAQ_YAQPoAQH4AQGIAgGoAgG4AuHm9tAGwAIB0gIkOTZmYjY0NmYtNWZiNi00YjI4LTg0ODQtYWNmMWQyMDYzZTM02AIB4AIB&sid=4ed9d7e74029527edee6898325759d2c&dest_id=-602927&dest_type=city&dist=0&group_adults=2&group_children=0&hapos=1&hpos=1&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&srepoch=1780331390&srpvid=e94773f15e390970&type=total&ucfs=1&" /></ScrollReveal>
            <ScrollReveal delay={240}><SocialRatingWidget platform="expedia" rating="#1" reviews="Best Value" href="https://www.expedia.com/Canaan-Hotel-International.h48986114.Hotel-Information" /></ScrollReveal>
          </div>
        </section>

        {/* Hotel in Frame — photo gallery */}
        <section className="py-16 md:py-24 bg-sandstone">
          <Container>
            <HotelInFrame variant="home" />
          </Container>
        </section>

        {/* Structural Integrity & Philosophy */}
        <section className="py-32 md:py-40 bg-sandstone overflow-hidden">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
              <div className="animate-in slide-in-from-left duration-1000">
                <ScrollReveal direction="up">
                <SectionTitle
                  label="Our Commitment"
                  title="Why Guests Choose Canaan"
                  description="Rated #1 Best Value in Adigrat on TripAdvisor. 24 rooms, 24-hour service, complimentary breakfast every morning, and a team that turns work trips into vacations — in the words of our guests."
                />
                </ScrollReveal>
                <div className="space-y-12">
                  {[
                    { icon: 'verified_user', title: 'Complimentary Breakfast Daily', desc: 'A generous continental breakfast served every morning from 6:00 AM to 10:00 AM. Western and Ethiopian options, freshly prepared — included in every room rate.' },
                    { icon: 'wifi', title: 'Free Wi-Fi & Free Parking', desc: 'Complimentary high-speed Wi-Fi in all 24 rooms and public areas. Free on-site self-parking for all guests. No hidden extras.' },
                    { icon: 'groups', title: 'Rated #1 in Adigrat', desc: 'TripAdvisor\'s #1 Best Value of 30 properties in Adigrat. 4.1 stars on Google across 57 reviews. Our guests keep coming back.' },
                  ].map((item, i) => (
                    <ScrollReveal key={i} direction="up" delay={i * 120}>
                    <div key={i} className="flex gap-8 group">
                      <div className="flex-shrink-0 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border border-cactus/5 group-hover:bg-cactus group-hover:text-white transition-all duration-500">
                        <Icon name={item.icon as any} className="text-3xl" />
                      </div>
                      <div className="pt-2">
                        <h4 className="font-serif text-2xl mb-3 text-forest">{item.title}</h4>
                        <p className="text-base text-gray-500 font-light leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-4 border border-cactus/10 group-hover:inset-0 transition-all duration-700"></div>
                <div className="relative w-full aspect-[4/5] overflow-hidden shadow-2xl">
                  <Image
                    src="/images/gallery/Lobby.webp"
                    alt="Detail of the basalt and glass fusion architecture"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
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
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none canaan-pattern scale-150"></div>

          <Container className="relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
              <SectionTitle
                label="Local Wonders"
                title="Discover the Highlands"
                description="Gateway to the spiritual heart of the Horn of Africa. Canaan Hotel places you within reach of Tigray's most extraordinary ancient sites — from cliff-carved monasteries to the first mosque on the African continent."
                dark
              />
              <a href="https://maps.google.com/?q=Canaan+International+Hotel,+Adigrat,+Tigray,+Ethiopia" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="mb-12 border-white/10 text-sandstone hover:border-cactus">Explore Full Map</Button>
                </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <ScrollReveal delay={0}><AttractionCard
                image="/images/attractions/Gheralta.webp"
                title="Gheralta Cliffs"
                distance="45km"
                description="Climb the vertical sandstone paths to 6th-century monasteries carved directly into the sheer cliffs."
              /></ScrollReveal>
              <ScrollReveal delay={100}><AttractionCard
                image="/images/attractions/Al Najashi4.webp"
                title="Al-Najashi Mosque"
                distance="32km"
                description="The site of the first Hijra. A testament to Tigray's historical role as a sanctuary for all spirits."
              /></ScrollReveal>
              <ScrollReveal delay={200}><AttractionCard
                image="/images/attractions/Debre-Damo-Abune-Aregawi-monaster--1920x1080.webp"
                title="Debre Damo Monastery"
                distance="52km"
                description="Accessible only by a 15-meter leather rope. A living relic of early Christian architecture."
              /></ScrollReveal>
            </div>
          </Container>
        </section>

        <CanaanPattern inverted />

        {/* Global Testimonials Section */}
        <section className="py-32 md:py-40 bg-sandstone">
          <Container>
            <SectionTitle label="Voices of the World" title="Guest Stories" centered />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <ScrollReveal direction="up" delay={0}><TestimonialCard
                text="Canaan is the architectural dialogue Ethiopia has been waiting for. It captures the ruggedness of Tigray in a silk-lined sanctuary."
                author="Jean-Pierre Dubois"
                role="Global Hospitality Lead"
                date="Nov 2025"
              /></ScrollReveal>
              <ScrollReveal direction="up" delay={150}><TestimonialCard
                text="The hospitality and service at Canaan hotel was amazing. The staff are so polite, welcoming, eager to serve always with a smile. The room was spacious, very clean with toiletries."
                author="Verified Guest"
                role="Trip.com — Verified Review"
                date="Oct 2025"
              /></ScrollReveal>
              <ScrollReveal direction="up" delay={300}><TestimonialCard
                text="Incredible hospitality and service. We hosted our regional summit here and the energy of the space is truly transcendental."
                author="Dr. Abiy Tadesse"
                role="Regional Director"
                date="Jan 2026"
              /></ScrollReveal>
            </div>
            <div className="mt-24 flex justify-center">
              <div className="flex flex-col items-center gap-6">
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Verified by travelers worldwide</p>
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                  <a href="https://g.page/GfaOOMjriRenNsEqI/review" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <Image src="/images/badges/google-business-profile.svg" alt="Google Business Profile" width={179} height={64} className="w-auto h-10 object-contain" />
                  </a>
                  <span className="hidden md:inline w-1 h-1 bg-cactus rounded-full"></span>
                  <a href="https://www.tripadvisor.com/Hotel_Review-g1401789-d13207473-Reviews-Canaan_Hotel-Adigrat_Tigray_Region.html" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <Image src="/images/badges/tripadvisor-3.svg" alt="TripAdvisor" width={2515} height={777} className="w-auto h-10 object-contain" />
                  </a>
                  <span className="hidden md:inline w-1 h-1 bg-cactus rounded-full"></span>
<a href="https://www.booking.com/hotel/et/canaan-international-adigrat2.en-gb.html?aid=356980&label=gog235jc-10CAsoR0IdY2FuYWFuLWludGVybmF0aW9uYWwtYWRpZ3JhdDJICVgDaEeIAQGYATO4ARfIAQ_YAQPoAQH4AQGIAgGoAgG4AuHm9tAGwAIB0gIkOTZmYjY0NmYtNWZiNi00YjI4LTg0ODQtYWNmMWQyMDYzZTM02AIB4AIB&sid=4ed9d7e74029527edee6898325759d2c&dest_id=-602927&dest_type=city&dist=0&group_adults=2&group_children=0&hapos=1&hpos=1&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&srepoch=1780331390&srpvid=e94773f15e390970&type=total&ucfs=1&" target="_blank" rel="noopener noreferrer" className="text-xl font-serif font-bold text-forest">
                     Booking.com
                   </a>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Closing Call to Action */}
        <section className="relative overflow-hidden bg-forest py-12 md:py-16">
          {/* Background image — full width, height clipped to this section */}
          <Image
            src="/images/cta/sanctuary.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            quality={80}
            className="object-cover"
            placeholder="empty"
          />

          {/* Brand-toned forest overlay — 2 layers, image stays visible */}
          <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/55 to-forest/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-forest/30 via-transparent to-transparent" />
          {/* Faint brand texture */}
          <div className="absolute inset-0 opacity-[0.04] canaan-pattern pointer-events-none" />

          {/* Section separator — thin integrated bronze ornament line */}
          <div className="absolute inset-x-0 top-0 z-10" aria-hidden="true">
            <div className="relative flex items-center justify-center">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-bronze/70 to-transparent" />
              <div className="absolute top-1/2 -translate-y-1/2 h-2 w-2 rotate-45 bg-bronze/80" />
            </div>
          </div>

          {/* Content — hero-style, directly on image, no card */}
          <div className="relative z-10 flex items-center justify-center px-4 md:px-6">
            <Container>
              <ScrollReveal direction="none">
                <div className="mx-auto max-w-3xl text-center drop-shadow-[0_3px_10px_rgba(0,0,0,0.65)]">
                  <CanaanLogo size="w-10 h-10" className="mx-auto mb-3 opacity-90" />
                  <p
                    className="text-white text-xs font-semibold tracking-[0.3em] uppercase mb-3"
                    style={{ textShadow: "0 1px 4px rgba(0,0,0,0.9), 0 2px 14px rgba(0,0,0,0.7)" }}
                  >
                    Experience Our Hospitality
                  </p>
                  <h2
                    className="font-serif text-white text-3xl md:text-5xl font-bold leading-tight"
                    style={{ textShadow: "0 2px 6px rgba(0,0,0,0.9), 0 4px 24px rgba(0,0,0,0.6), 0 0 60px rgba(0,0,0,0.4)" }}
                  >
                    Your Sanctuary Awaits
                  </h2>
                  <div className="mx-auto my-4 h-px w-20 bg-bronze/70" aria-hidden="true" />
                  <p
                    className="mx-auto max-w-xl text-white/90 text-base md:text-lg leading-relaxed font-light"
                    style={{ textShadow: "0 1px 4px rgba(0,0,0,0.9), 0 2px 16px rgba(0,0,0,0.65)" }}
                  >
                    Experience the junction of ancient Tigrayan heritage and contemporary luxury.
                  </p>
                  <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4">
                    <BookingCTA />
                    <Link href="/rooms">
                      <span className="inline-flex items-center gap-2 border border-white/70 bg-white/5 text-white text-[11px] uppercase tracking-[0.3em] font-bold px-12 py-6 backdrop-blur-sm hover:bg-white/15 hover:border-white transition-all duration-300">
                        Explore Our Rooms
                      </span>
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            </Container>
          </div>
        </section>
      </main>
    </div>
  );
}