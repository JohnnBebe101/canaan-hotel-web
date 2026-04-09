import type { Metadata } from "next/types";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Our Story — Adigrat, Tigray',
  description: 'Canaan International Hotel — a landmark of contemporary Ethiopian design in Adigrat, 0.2km from the city centre. Built on Tigrayan highland craftsmanship and international hospitality standards.',
  openGraph: {
    title: 'Our Story | Canaan International Hotel',
    description: 'Where the ancient tradition of highland craftsmanship meets the comfort and service of an international hotel.',
    images: ['/images/heroes/Ext-Compund.webp'],
  },
};

export default function AboutPage() {
  return (
    <main id="main-content" className="flex w-full flex-col items-center">
      <div className="flex w-full max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
        <div className="w-full py-16 sm:py-24">
          <div className="@container">
            <div
              className="flex min-h-[480px] flex-col gap-6 rounded-xl bg-cover bg-center bg-no-repeat @[480px]:gap-8 items-center justify-center p-8 text-center"
              aria-label="Hero section with hotel staff photo"
              style={{
                backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%), url("/images/Team.webp")'
              }}
            >
                <div className="flex flex-col gap-4">
                  <div className="flex justify-center mb-4">
                  <div className="flex gap-2">
                    <span className="inline-block px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                      24 Guestrooms
                    </span>
                    <span className="inline-block px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
                      4.1★ Rating
                    </span>
                    <span className="inline-block px-2 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-medium">
                      #1 Best Value
                    </span>
                  </div>
                </div>
                <h2 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl">
                  Our Story
                </h2>
                <p className="text-white text-base font-normal leading-normal @[480px]:text-lg max-w-2xl">
                  A hotel born from Tigray&apos;s highlands, built for the world.
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className="py-16 sm:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center" aria-labelledby="canaan-story">
          <div className="flex flex-col gap-4">
            <h2 id="canaan-story" className="text-[#D48135] dark:text-[#D48135] text-[22px] sm:text-3xl font-bold leading-tight tracking-[-0.015em]">
              The Canaan Story
            </h2>
            <p className="text-[#2D2424]/80 dark:text-background-light/80 text-base font-normal leading-relaxed">
              Discover the journey of the Canaan International Hotel, from its humble beginnings to becoming a cornerstone of hospitality in Adigrat. Our founders envisioned a place that not only offers comfort but also embodies the rich culture and resilient spirit of Tigray. We are dedicated to providing an authentic experience that honors our heritage and welcomes the world.
            </p>
            <p className="text-[#2D2424]/80 dark:text-background-light/80 text-base font-normal leading-relaxed pt-2">
              Canaan International Hotel is located in Kebele 03, Adigrat — just 0.2 kilometres from the city centre. Adigrat is the commercial capital of eastern Tigray, set at 2,457 metres above sea level on the Ethiopian Highlands plateau. The hotel is within easy reach of the city&apos;s Cathedral of the Holy Saviour (3.5km), the Piyasa market district (810m), and serves as the ideal base for day trips to Tigray&apos;s most celebrated heritage sites.
            </p>
          </div>
          <div
            className="w-full bg-center bg-no-repeat bg-cover aspect-square rounded-xl"
            role="img"
            aria-label="A black and white historical photo of the hotel's founder."
            style={{ backgroundImage: 'url("/images/attractions/Gheralta.webp")' }}
          ></div>
        </section>

        <section className="py-16 sm:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center" aria-labelledby="commitment-tigray">
          <div
            className="w-full bg-center bg-no-repeat bg-cover aspect-square rounded-xl md:order-2"
            role="img"
            aria-label="Vibrant local Tigrayan market scene with fresh produce."
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCcMq461Fe3D5wPKSdLrzibjzTTlZsDpQ2E01aqrm-VcLgkNzG9voQibtNRGk2Wio2zJizHzmj0sfPvnjmyd8cWDH_7ZEbfWrt6vdYflicu5-1-emMHwSKBq4yTKd5hEpYtlbF9YRC8y-LshJyXgLLWg-i7QQu5JFDSd-rPneO6f9agDGFU79-90i2AATBPuv6U6yaBZrbJhcbxgtyFS-KXnXN8fuPh7d6IAZI-zDuZ-wYD0w4XPPl8OmGadRvmFtTgCv7HtNYopRyG")' }}
          ></div>
          <div className="flex flex-col gap-4 md:order-1">
            <h2 id="commitment-tigray" className="text-[#D48135] dark:text-[#D48135] text-[22px] sm:text-3xl font-bold leading-tight tracking-[-0.015em]">
              Our Commitment to Tigray
            </h2>
            <p className="text-[#2D2424]/80 dark:text-background-light/80 text-base font-normal leading-relaxed">
              Canaan International Hotel is more than just a place to stay; it's a part of the fabric of Adigrat. We are deeply committed to our community, prioritizing local sourcing for our restaurant, employing local artisans for our decor, and actively participating in initiatives that support the economic and cultural vitality of Tigray. Your stay with us directly contributes to the well-being of our beloved region.
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-24 flex flex-col items-center" aria-labelledby="glimpse-world">
          <div className="text-center mb-12">
            <h2 id="glimpse-world" className="text-[#D48135] dark:text-[#D48135] text-[22px] sm:text-3xl font-bold leading-tight tracking-[-0.015em]">
              A Glimpse Into Our World
            </h2>
            <p className="text-[#2D2424]/80 dark:text-background-light/80 text-base font-normal leading-relaxed mt-2 max-w-2xl mx-auto">
              Explore images that capture the essence of our hotel, our team, and the vibrant culture of Tigray that inspires us every day.
            </p>
          </div>
          <div className="w-full gap-2 overflow-hidden aspect-[3/2] grid grid-cols-3 grid-rows-2">
            <div
              className="w-full bg-center bg-no-repeat bg-cover aspect-auto rounded-lg row-span-2 col-span-2"
              role="img"
              aria-label="A beautifully decorated hotel room with local art."
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBi9paBMGL3oWDLVhHFlqJBX8RIfFw-T9ruIoH80elseZyLKEtqwSZ0oLFMSt7kRsisIcm_y9MYKPjvURPBVx5JBYbksSFWFX-uyUBIiw9vaJonp3QLEvTPv-VA_IRMdcRhz8zkG8RUUK4NXYIDU--GBaQHtiyBsYVlJwXu_78XaNV60WjpBzxJo4cH-2CXw-LhZT6jYhzQEU1vAaleW7HB40285ltEsXow9kNBx2IXIeK7G8R6yU64Ob2dS-0dNHkrqmBbEM4XvjOr")' }}
            ></div>
            <div
              className="w-full bg-center bg-no-repeat bg-cover aspect-auto rounded-lg"
              role="img"
              aria-label="A chef preparing a traditional Ethiopian dish in the hotel kitchen."
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAeKnoGMoESQwjwhfwzIjn7HHiMYM3467IzLQauoNVbRcEW8QuVn1buyd7Aiyq0OraDUvhXuepMGKsMvR1gGsdX3R-nOQgdCsOr__Ms6TpKpJSYEjag9_B2MbwZtGmsrMSAWS3_ht-2HO8vaNV6ZIGV97fqpL_6bSmjQ4lD4wHrWNKRBaavwgkmc7lY_yi_nto2kvhQTEaJIShhHN0CiBDIn9ZdoQEbfcB7gGoPzNtGQL9Wg8pMJbQBMStR7rHnRjd-T49Sh97UURuI")' }}
            ></div>
            <div
              className="w-full bg-center bg-no-repeat bg-cover aspect-auto rounded-lg"
              role="img"
              aria-label="A stunning landscape view of the mountains surrounding Adigrat."
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBSZxrqC9-cyZgriHaN0PIhHk7atf7JkhUPokmLWwCdx1GIjvu55PwLy_yj5VgYygM776Eyy0gdHo7hp4B7z9c1ufdFOl-2U36zs3c_yz80yT6E96dp5Ee8DEUJx_pzwxT8HyQpvlyBCvZgsuvGXIhyKETbFbNDccwIRghml_UwJZC8uWpTRGXOPM99wprfUGQbdA80854eIHRxR8dVjWKCk1vqHqGnx6SApPpYi6Tm2nDH818A4XFXrzomUSN2zrAB8DIXSmrKSlzM")' }}
            ></div>
          </div>
        </section>

        <section className="w-full py-16 sm:py-24" aria-labelledby="experience-hospitality">
          <div className="bg-[#D48135]/10 dark:bg-[#D48135]/20 p-8 sm:p-12 lg:p-16 rounded-xl flex flex-col items-center text-center gap-6">
            <h2 id="experience-hospitality" className="text-[#2D2424] dark:text-background-light text-3xl sm:text-4xl font-bold leading-tight tracking-[-0.015em]">
              Experience Our Hospitality
            </h2>
            <p className="text-[#2D2424]/80 dark:text-background-light/80 text-base sm:text-lg font-normal leading-normal max-w-2xl">
              Ready to be a part of our story? Book your stay and discover the warmth, comfort, and authentic culture of the Canaan International Hotel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link
                href="/rooms"
                className="flex min-w-[140px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <span className="truncate">Book Your Stay</span>
              </Link>
              <Link
                href="/rooms"
                className="flex min-w-[140px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <span className="truncate">Explore Our Rooms</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}