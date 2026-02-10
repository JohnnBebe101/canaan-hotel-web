import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Facilities & Amenities | Canaan International Hotel",
  description: "Explore the luxurious facilities at Canaan International Hotel, including our elegant restaurant, bar, and secure parking.",
  openGraph: {
    title: "World-Class Facilities in Adigrat - Canaan International Hotel",
    description: "Unwind in our sophisticated lounge or stay productive with our business amenities. Everything you need for a comfortable stay.",
    images: ["/images/Gate.svg"],
  },
};

export default function ServicesPage() {
  return (
    <main id="main-content" className="flex w-full flex-col items-center">
      <div className="flex w-full max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
        <div className="w-full py-16 sm:py-24">
          <div className="@container">
            <div
              className="bg-cover bg-center flex flex-col justify-end overflow-hidden rounded-xl min-h-[300px] md:min-h-[400px]"
              role="img"
              aria-label="A luxurious hotel lounge area with comfortable seating and elegant decor."
              style={{
                backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 40%), url("/images/Gate.svg")'
              }}
            >
              <div className="flex p-6 md:p-8">
                <h1 className="text-white tracking-tight text-4xl md:text-5xl font-bold leading-tight">
                  Our Services & Facilities
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div className="py-10">
          <p className="text-[#181611] dark:text-background-light text-base md:text-lg font-normal leading-normal text-center max-w-3xl mx-auto">
            Welcome to Canaan International Hotel. We are committed to providing you with an exceptional stay, complete with a wide range of services and facilities designed for your comfort and convenience.
          </p>
        </div>

        <div className="flex flex-col gap-10 py-10">
          <div className="flex flex-col gap-4 text-center">
            <h1 className="text-[#181611] dark:text-background-light tracking-tight text-3xl md:text-4xl font-bold leading-tight max-w-3xl mx-auto">
              Explore Our Offerings
            </h1>
            <p className="text-[#897f61] dark:text-gray-400 text-base font-normal leading-normal max-w-3xl mx-auto">
              From fine dining to business essentials, we have everything you need for a memorable stay.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-0">
            <div className="flex flex-1 gap-4 rounded-xl border border-[#e6e3db] dark:border-background-dark/50 bg-white dark:bg-[#2a2416] p-5 flex-col text-center items-center">
              <div className="text-[#F9A825] text-4xl">
                <span className="material-symbols-outlined !text-4xl">restaurant</span>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-[#F9A825] dark:text-[#F9A825] text-lg font-bold leading-tight">Restaurant & Bar</h2>
                <p className="text-[#897f61] dark:text-gray-400 text-sm font-normal leading-normal">
                  Savor exquisite local and international cuisine in our elegant restaurant or unwind with a drink at our sophisticated bar.
                </p>
              </div>
            </div>

            <div className="flex flex-1 gap-4 rounded-xl border border-[#e6e3db] dark:border-background-dark/50 bg-white dark:bg-[#2a2416] p-5 flex-col text-center items-center">
              <div className="text-[#F9A825] text-4xl">
                <span className="material-symbols-outlined !text-4xl">concierge</span>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-[#F9A825] dark:text-[#F9A825] text-lg font-bold leading-tight">24-Hour Front Desk</h2>
                <p className="text-[#897f61] dark:text-gray-400 text-sm font-normal leading-normal">
                  Our dedicated team is available around the clock to assist you with check-in, concierge services, and any inquiries.
                </p>
              </div>
            </div>

            <div className="flex flex-1 gap-4 rounded-xl border border-[#e6e3db] dark:border-background-dark/50 bg-white dark:bg-[#2a2416] p-5 flex-col text-center items-center">
              <div className="text-[#F9A825] text-4xl">
                <span className="material-symbols-outlined !text-4xl">local_parking</span>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-[#F9A825] dark:text-[#F9A825] text-lg font-bold leading-tight">Free & Secure Parking</h2>
                <p className="text-[#897f61] dark:text-gray-400 text-sm font-normal leading-normal">
                  Enjoy peace of mind with complimentary and secure on-site parking available for all our guests.
                </p>
              </div>
            </div>

            <div className="flex flex-1 gap-4 rounded-xl border border-[#e6e3db] dark:border-background-dark/50 bg-white dark:bg-[#2a2416] p-5 flex-col text-center items-center">
              <div className="text-[#F9A825] text-4xl">
                <span className="material-symbols-outlined !text-4xl">business_center</span>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-[#F9A825] dark:text-[#F9A825] text-lg font-bold leading-tight">Business Amenities</h2>
                <p className="text-[#897f61] dark:text-gray-400 text-sm font-normal leading-normal">
                  Stay productive with high-speed Wi-Fi, modern meeting rooms, and comprehensive conference facilities.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="py-10">
          <div className="flex flex-1 flex-col items-center justify-between gap-6 rounded-xl border border-[#e6e3db] dark:border-background-dark/50 bg-white dark:bg-[#2a2416] p-6 text-center @container md:flex-row md:text-left md:p-8">
            <div className="flex flex-col items-center gap-4 md:flex-row">
              <div className="text-[#F9A825] text-5xl">
                <span className="material-symbols-outlined !text-5xl">mark_email_read</span>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-[#F9A825] dark:text-[#F9A825] text-lg font-bold leading-tight">Stay Connected: Our Communication Hub</p>
                <p className="text-[#897f61] dark:text-gray-400 text-base font-normal leading-normal max-w-2xl">
                  We now offer a professional, domain-based email service for our guests and business clients, ensuring secure and private communication during your stay.
                </p>
              </div>
            </div>
            <Link
              className="text-sm font-bold leading-normal tracking-[0.015em] flex-shrink-0 flex gap-2 items-center text-[#181611] dark:text-background-light hover:text-primary dark:hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              href="/contact"
            >
              Learn More
              <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
            </Link>
          </div>
        </div>

        <div className="bg-primary/20 dark:bg-primary/10 rounded-xl my-10 p-8 md:p-12 text-center">
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-3xl md:text-4xl font-bold text-[#181611] dark:text-background-light">
              Experience Unmatched Comfort
            </h2>
            <p className="text-[#181611]/80 dark:text-background-light/80 max-w-2xl">
              Ready to enjoy our world-class services and facilities? Book your stay with us today for an unforgettable experience.
            </p>
            <Link
              href="/rooms"
              className="flex mt-4 min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-[#181611] text-base font-bold leading-normal tracking-[0.015em] hover:bg-opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <span className="truncate">Book Your Stay</span>
            </Link>
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}