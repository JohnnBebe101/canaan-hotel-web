import type { Metadata } from "next/types";
import BookingForm from "@/components/booking/BookingForm";
import Badge from "@/components/ui/Badge";
import { FEATURED_ROOMS } from "@/lib/featuredRooms";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Secure Your Stay — Book Your Room",
  alternates: { canonical: canonical("/booking") },
  description:
    "Book your stay at Canaan International Hotel, Adigrat. Choose your room, dates and guests, confirm securely and enjoy best-rate direct reservations in the highlands of Tigray.",
  openGraph: {
    title: "Secure Your Stay | Canaan International Hotel",
    description:
      "Direct booking with best-rate guarantee at Canaan International Hotel, Adigrat, Tigray.",
    images: ["/images/heroes/Ext-Compund.webp"],
  },
};

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{ room?: string; checkin?: string; checkout?: string }>;
}) {
  const { room, checkin, checkout } = await searchParams;

  const validRoom = FEATURED_ROOMS.some((r) => r.slug === room) ? room : undefined;
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  const validCheckIn = checkin && dateRegex.test(checkin) ? checkin : undefined;
  const validCheckOut = checkout && dateRegex.test(checkout) ? checkout : undefined;

  return (
    <div className="flex w-full flex-col items-center">
      {/* HERO BAND */}
      <section className="relative flex min-h-[34vh] w-full flex-col items-center justify-center overflow-hidden px-6 pt-28 text-center md:min-h-[38vh]">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-forest via-cactus/80 to-forest" />
        <div className="absolute inset-0 -z-10 opacity-[0.05] canaan-pattern pointer-events-none" />
        <Badge className="mb-5 border-sandstone/30">Direct Reservation</Badge>
        <h1
          className="font-serif text-sandstone text-4xl font-bold leading-tight tracking-tight md:text-6xl"
          style={{ textShadow: "0 2px 8px rgba(0,0,0,0.6), 0 0 40px rgba(0,0,0,0.4)" }}
        >
          Secure Your Stay
        </h1>
        <div className="my-4 h-px w-24 bg-bronze/70" aria-hidden="true" />
        <p
          className="mx-auto max-w-2xl text-base font-light leading-relaxed text-sandstone/90 md:text-lg"
          style={{ textShadow: "0 1px 6px rgba(0,0,0,0.6)" }}
        >
          A reserved moment in the highlands of Tigray. Choose your sanctuary, confirm securely,
          and let the comfort of Canaan greet you in Adigrat.
        </p>
      </section>

      <BookingForm initialRoom={validRoom} initialCheckIn={validCheckIn} initialCheckOut={validCheckOut} />
    </div>
  );
}