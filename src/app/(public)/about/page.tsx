import type { Metadata } from "next/types";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import CanaanPattern from "@/components/ui/CanaanPattern";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Icon } from "@/components/ui/Icons";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: 'Our Story — Adigrat, Tigray',
  alternates: { canonical: canonical("/about") },
  description: 'Canaan International Hotel — a landmark of contemporary Ethiopian design in Adigrat, 0.2km from the city centre. Built on Tigrayan highland craftsmanship and international hospitality standards.',
  openGraph: {
    title: 'Our Story | Canaan International Hotel',
    description: 'Where the ancient tradition of highland craftsmanship meets the comfort and service of an international hotel.',
    images: ['/images/heroes/Ext-Compund.webp'],
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* SECTION 1 — HERO */}
      <section className="relative h-[75vh] min-h-[520px] w-full overflow-hidden">
        <Image
          src="/images/heroes/Ext-Compund.webp"
          alt="Canaan International Hotel exterior, Adigrat"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-forest/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 px-6 text-center">
          <p className="text-white/90 text-xs font-semibold tracking-[0.3em] uppercase mb-3">
            Our Story
          </p>
          <h1 className="font-serif text-white text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight max-w-3xl"
              style={{ textShadow: '0 0 60px rgba(255,255,255,0.5), 0 0 100px rgba(255,255,255,0.25), 0 2px 8px rgba(0,0,0,0.6)' }}>
            Born from the Highlands
          </h1>
          <p className="text-white/90 text-base md:text-lg mt-4 max-w-xl leading-relaxed">
            Adigrat, Tigray — 2,457 metres above sea level
          </p>
        </div>
      </section>

      {/* SECTION 2 — STAT TRUST BAR */}
      <section className="bg-forest">
        <div className="max-w-4xl mx-auto px-6 py-10 grid grid-cols-3 divide-x divide-cactus/30">
          {[
            { value: '24',    label: 'Guestrooms'              },
            { value: '4.1★',  label: 'Google Rating'           },
            { value: '#1',    label: 'Best Value in Adigrat'   },
          ].map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 100}>
              <div className="flex flex-col items-center text-center px-6 py-2">
                <span className="font-serif text-sandstone text-4xl md:text-5xl font-bold">
                  {stat.value}
                </span>
                <span className="text-sandstone/50 text-xs tracking-widest uppercase mt-1">
                  {stat.label}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* SECTION 3 — THE CANAAN STORY */}
      <section className="bg-sandstone py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal>
              <div>
                <p className="text-bronze text-xs font-semibold tracking-[0.3em] uppercase mb-4">
                  The Canaan Story
                </p>
                <h2 className="font-serif text-forest text-4xl md:text-5xl font-bold leading-tight mb-6">
                  A Landmark Built<br />for Tigray
                </h2>
                <span className="block font-serif text-bronze text-8xl leading-none -mb-4 select-none">"</span>
                <p className="text-forest/70 text-base leading-relaxed mb-5">
                  Discover the journey of the Canaan International Hotel, from its humble beginnings
                  to becoming a cornerstone of hospitality in Adigrat. Our founders envisioned a place
                  that not only offers comfort but also embodies the rich culture and resilient spirit
                  of Tigray.
                </p>
                <p className="text-forest/70 text-base leading-relaxed mb-5">
                  We are dedicated to providing an authentic experience that honours our heritage and
                  welcomes the world — from the solo researcher to the international delegation.
                </p>
                <p className="text-forest/60 text-sm leading-relaxed border-l-2 border-bronze/40 pl-4 italic">
                  Located in Kebele 03, Adigrat — 0.2 km from the city centre. The commercial capital
                  of eastern Tigray, set at 2,457 metres above sea level on the Ethiopian Highlands plateau.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="relative">
                <div className="absolute -top-4 -right-4 w-full h-full bg-cactus/10 rounded-2xl" />
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-sandstone">
                  <Image
                    src="/images/Team.webp"
                    alt="The Canaan International Hotel team"
                    width={600}
                    height={700}
                    className="object-cover w-full"
                  />
                </div>
                <div className="absolute -bottom-5 -left-5 bg-forest text-sandstone px-5 py-3 rounded-xl shadow-xl text-sm font-medium">
                  The Canaan Team · Adigrat
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SECTION 4 — OUR COMMITMENT TO TIGRAY */}
      <section className="relative bg-forest py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <CanaanPattern />
        </div>
        <div className="relative max-w-5xl mx-auto px-6">
          <ScrollReveal>
            <div className="flex flex-col items-center text-center mb-14">
              <div className="w-10 h-px bg-bronze mb-5" />
              <p className="text-bronze text-xs font-semibold tracking-[0.3em] uppercase mb-3">
                Our Commitment
              </p>
              <h2 className="font-serif text-sandstone text-4xl md:text-5xl font-bold leading-tight max-w-2xl">
                Woven into the Fabric of Adigrat
              </h2>
              <p className="text-sandstone/60 text-base leading-relaxed mt-5 max-w-2xl">
                Canaan International Hotel is more than a place to stay — it is part of the community
                that built it. We prioritise local sourcing, local artisans, and active participation
                in the cultural and economic vitality of Tigray.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: 'storefront',
                title: 'Local Sourcing',
                desc: 'Our restaurant sources ingredients directly from farmers in the Adigrat plateau, supporting the local agricultural economy.',
              },
              {
                icon: 'brush',
                title: 'Local Artisans',
                desc: 'Every decorative element in the hotel was crafted by Tigrayan artisans, preserving traditional highland craft traditions.',
              },
              {
                icon: 'volunteer_activism',
                title: 'Community Investment',
                desc: 'Your stay directly contributes to the economic and cultural vitality of Tigray and the people of Adigrat.',
              },
            ].map((pillar, i) => (
              <ScrollReveal key={pillar.title} delay={100 + i * 100}>
                <div className="bg-cactus/10 border border-cactus/20 rounded-2xl p-7 hover:bg-cactus/20 transition-colors duration-300">
                  <div className="w-10 h-10 rounded-xl bg-bronze/20 flex items-center justify-center mb-5">
                    <Icon name={pillar.icon as any} className="text-bronze text-xl" />
                  </div>
                  <h3 className="font-serif text-sandstone text-xl font-semibold mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-sandstone/60 text-sm leading-relaxed">{pillar.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — PHOTO GALLERY */}
      <section className="bg-sandstone py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <ScrollReveal>
              <p className="text-bronze text-xs font-semibold tracking-[0.3em] uppercase mb-3">
                A Glimpse Into Our World
              </p>
              <h2 className="font-serif text-forest text-4xl font-bold">
                The Hotel in Frame
              </h2>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 auto-rows-[200px]">
            <div className="row-span-2 rounded-2xl overflow-hidden relative">
              <ScrollReveal delay={0}>
                <Image src="/images/gallery/Lobby.webp" alt="Canaan Hotel lobby"
                       width={400} height={600} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </ScrollReveal>
            </div>

            <div className="rounded-2xl overflow-hidden relative">
              <ScrollReveal delay={100}>
                <Image src="/images/gallery/Bed-view-Single.webp" alt="Guest room"
                       width={300} height={200} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </ScrollReveal>
            </div>

            <div className="rounded-2xl overflow-hidden relative">
              <ScrollReveal delay={200}>
                <Image src="/images/gallery/bath-room.webp" alt="En-suite bathroom"
                       width={300} height={200} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </ScrollReveal>
            </div>

            <div className="rounded-2xl overflow-hidden relative">
              <ScrollReveal delay={300}>
                <Image src="/images/gallery/single-room-best-view.webp" alt="Comfort double room"
                       width={300} height={200} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </ScrollReveal>
            </div>

            <div className="col-span-2 md:col-span-1 rounded-2xl overflow-hidden relative">
              <ScrollReveal delay={400}>
                <Image src="/images/gallery/Gate-Corrdor.webp" alt="Hotel entrance corridor"
                       width={300} height={200} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — LOCATION & CONTEXT */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <ScrollReveal>
              <div>
                <p className="text-bronze text-xs font-semibold tracking-[0.3em] uppercase mb-4">
                  Location
                </p>
                <h2 className="font-serif text-forest text-3xl md:text-4xl font-bold mb-8">
                  In the Heart of Adigrat
                </h2>
                <ul className="space-y-5">
                  {[
                    { icon: 'location_on',  text: 'Kebele 03, Adigrat, Tigray 1000, Ethiopia'       },
                    { icon: 'near_me',      text: '0.2 km from Adigrat city centre'                 },
                    { icon: 'church',       text: 'Cathedral of the Holy Saviour — 3.5 km'          },
                    { icon: 'storefront',   text: 'Piyasa market district — 810 m'                  },
                    { icon: 'terrain',      text: 'Altitude: 2,457 m above sea level'               },
                    { icon: 'directions_car', text: 'Gheralta Mountains — 65 km (day trip)'         },
                  ].map((item, i) => (
                    <ScrollReveal key={item.text} delay={i * 50}>
                      <li className="flex items-start gap-3">
                        <Icon name={item.icon as any} className="text-bronze text-lg mt-0.5 shrink-0" />
                        <span className="text-forest/70 text-sm leading-relaxed">{item.text}</span>
                      </li>
                    </ScrollReveal>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="flex flex-col gap-4">
                <div className="bg-sandstone border border-cactus/20 rounded-2xl h-64 overflow-hidden">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3948.533!2d39.4624769!3d14.2845872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x166c8f924fda49bb%3A0xf3d84f15780cf278!2sInternational%20Canaan%20Hotel!5e0!3m2!1sen!2set!4v"
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Canaan International Hotel Location"
                    className="w-full h-full"
                  />
                </div>
                <a href="https://maps.google.com/?q=Canaan+International+Hotel,+Adigrat,+Tigray,+Ethiopia"
                   target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center justify-center gap-2 bg-forest text-sandstone text-sm font-medium py-3 px-6 rounded-xl hover:bg-cactus transition-colors duration-300">
                  <Icon name="near_me" className="text-base" />
                  Open in Google Maps
                </a>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-sandstone rounded-xl p-4 text-center">
                    <p className="text-forest/40 text-xs uppercase tracking-wider mb-1">Check-in</p>
                    <p className="text-forest font-semibold">12:00 PM</p>
                  </div>
                  <div className="bg-sandstone rounded-xl p-4 text-center">
                    <p className="text-forest/40 text-xs uppercase tracking-wider mb-1">Check-out</p>
                    <p className="text-forest font-semibold">11:00 AM</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SECTION 7 — CLOSING CTA */}
      <section className="relative bg-forest py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <CanaanPattern />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <ScrollReveal>
            <p className="text-bronze text-xs font-semibold tracking-[0.3em] uppercase mb-4">
              Experience Our Hospitality
            </p>
            <h2 className="font-serif text-sandstone text-4xl md:text-5xl font-bold leading-tight mb-5">
              Ready to Be Part<br />of Our Story?
            </h2>
            <p className="text-sandstone/60 text-base leading-relaxed mb-10 max-w-xl mx-auto">
              Book your stay and discover the warmth, comfort, and authentic highland culture
              of the Canaan International Hotel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/rooms">
                <Button variant="primary" size="lg">Book Your Stay</Button>
              </Link>
              <Link href="/rooms">
                <Button variant="outline" size="lg">Explore Our Rooms</Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}