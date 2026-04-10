import Image from "next/image";
import Link from "next/link";

import Button from "@/components/ui/Button";
import BookingCTA from "@/components/public/BookingCTA";
import Badge from "@/components/ui/Badge";
import SectionTitle from "@/components/ui/SectionTitle";
import CanaanPattern from "@/components/ui/CanaanPattern";
import SocialRatingWidget from "@/components/ui/SocialRatingWidget";
import CanaanLogo from "@/components/ui/CanaanLogo";
import { Icon } from "@/components/ui/Icons";

import HeroSlider from "@/components/public/HeroSlider";

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

export default function Home() {
  return (
    <div className="animate-in fade-in duration-1000 bg-sandstone">

      <HeroSlider />

      <main>
        {/* Verified Recognition Trust Bar */}
        <section className="relative z-30 -mt-16 max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 bg-white shadow-2xl border border-forest/5 overflow-hidden">
            <SocialRatingWidget platform="google" rating="4.1" reviews="57" href="https://share.google/GfaOOMjriRenNsEqI" />
            <SocialRatingWidget platform="tripadvisor" rating="4.1" reviews="8" href="https://www.tripadvisor.com/Hotel_Review-g1401789-d13207473-Reviews-Canaan_Hotel-Adigrat_Tigray_Region.html" />
            <SocialRatingWidget platform="booking" rating="9.2" reviews="56" href="https://www.booking.com/hotel/et/canaan-international-adigrat.html" />
            <SocialRatingWidget platform="expedia" rating="#1" reviews="Best Value" href="https://www.expedia.com/Canaan-Hotel-International.h48986114.Hotel-Information" />
          </div>
        </section>

        {/* Structural Integrity & Philosophy */}
        <section className="py-32 md:py-40 bg-sandstone overflow-hidden">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
              <div className="animate-in slide-in-from-left duration-1000">
                <SectionTitle
                  label="Our Commitment"
                  title="Why Guests Choose Canaan"
                  description="Rated #1 Best Value in Adigrat on TripAdvisor. 24 rooms, 24-hour service, complimentary breakfast every morning, and a team that turns work trips into vacations — in the words of our guests."
                />
                <div className="space-y-12">
                  {[
                    { icon: 'verified_user', title: 'Complimentary Breakfast Daily', desc: 'A generous continental breakfast served every morning from 6:00 AM to 10:00 AM. Western and Ethiopian options, freshly prepared — included in every room rate.' },
                    { icon: 'wifi', title: 'Free Wi-Fi & Free Parking', desc: 'Complimentary high-speed Wi-Fi in all 24 rooms and public areas. Free on-site self-parking for all guests. No hidden extras.' },
                    { icon: 'groups', title: 'Rated #1 in Adigrat', desc: 'TripAdvisor\'s #1 Best Value of 30 properties in Adigrat. 4.1 stars on Google across 57 reviews. Our guests keep coming back.' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-8 group">
                      <div className="flex-shrink-0 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border border-cactus/5 group-hover:bg-cactus group-hover:text-white transition-all duration-500">
                        <Icon name={item.icon as any} className="text-3xl" />
                      </div>
                      <div className="pt-2">
                        <h4 className="font-serif text-2xl mb-3 text-forest">{item.title}</h4>
                        <p className="text-base text-gray-500 font-light leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-4 border border-cactus/10 group-hover:inset-0 transition-all duration-700"></div>
                <div className="relative w-full aspect-[4/5] overflow-hidden shadow-2xl">
                  <Image
                    src="/images/heroes/Lobby.webp"
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
              <AttractionCard
                image="/images/attractions/Gheralta.webp"
                title="Gheralta Cliffs"
                distance="45km"
                description="Climb the vertical sandstone paths to 6th-century monasteries carved directly into the sheer cliffs."
              />
              <AttractionCard
                image="/images/attractions/Al Najashi4.webp"
                title="Al-Najashi Mosque"
                distance="32km"
                description="The site of the first Hijra. A testament to Tigray's historical role as a sanctuary for all spirits."
              />
              <AttractionCard
                image="/images/attractions/Debre-Damo-Abune-Aregawi-monaster--1920x1080.webp"
                title="Debre Damo Monastery"
                distance="52km"
                description="Accessible only by a 15-meter leather rope. A living relic of early Christian architecture."
              />
            </div>
          </Container>
        </section>

        <CanaanPattern inverted />

        {/* Global Testimonials Section */}
        <section className="py-32 md:py-40 bg-sandstone">
          <Container>
            <SectionTitle label="Voices of the World" title="Guest Stories" centered />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <TestimonialCard
                text="Canaan is the architectural dialogue Ethiopia has been waiting for. It captures the ruggedness of Tigray in a silk-lined sanctuary."
                author="Jean-Pierre Dubois"
                role="Global Hospitality Lead"
                date="Nov 2025"
              />
              <TestimonialCard
                text="The hospitality and service at Canaan hotel was amazing. The staff are so polite, welcoming, eager to serve always with a smile. The room was spacious, very clean with toiletries."
                author="Verified Guest"
                role="Trip.com — Verified Review"
                date="Oct 2025"
              />
              <TestimonialCard
                text="Incredible hospitality and service. We hosted our regional summit here and the energy of the space is truly transcendental."
                author="Dr. Abiy Tadesse"
                role="Regional Director"
                date="Jan 2026"
              />
            </div>
            <div className="mt-24 flex justify-center">
              <div className="flex flex-col items-center gap-6">
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Verified by travelers worldwide</p>
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                  <a href="https://g.page/GfaOOMjriRenNsEqI/review" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <Image src="/images/badges/google-business-profile.svg" alt="Google Business Profile" width={100} height={40} className="object-contain" />
                  </a>
                  <span className="hidden md:inline w-1 h-1 bg-cactus rounded-full"></span>
                  <a href="https://www.tripadvisor.com/Hotel_Review-g1401789-d13207473-Reviews-Canaan_Hotel-Adigrat_Tigray_Region.html" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <Image src="/images/badges/tripadvisor-3.svg" alt="TripAdvisor" width={100} height={40} className="object-contain" />
                  </a>
                  <span className="hidden md:inline w-1 h-1 bg-cactus rounded-full"></span>
                  <a href="https://www.booking.com/hotel/et/canaan-international-adigrat.html" target="_blank" rel="noopener noreferrer" className="text-xl font-serif font-bold text-forest">
                    Booking.com
                  </a>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Closing Call to Action */}
        <section className="py-32 bg-forest relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 canaan-pattern scale-150"></div>
          <Container className="relative z-10 text-center">
            <SectionTitle
              title="Your Sanctuary Awaits"
              description="Experience the junction of ancient Tigrayan heritage and contemporary luxury."
              centered
              dark
            />
            <BookingCTA />
          </Container>
        </section>
      </main>
    </div>
  );
}