import type { Metadata } from "next/types";
import Image from "next/image";
import CorporateInquiryForm from "./CorporateInquiryForm";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Corporate & Groups",
  alternates: { canonical: canonical("/corporate") },
  description: "Meetings, retreats, and group stays in the heart of Tigray. Host your next event at Canaan Hotel.",
};

export default function CorporatePage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative h-64 md:h-80 w-full overflow-hidden">
        <Image 
          src="/images/heroes/Ext-Compund.webp" 
          alt="Corporate & Groups" 
          fill 
          className="object-cover brightness-75" 
          priority 
          sizes="100vw"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-sandstone text-4xl md:text-5xl font-bold tracking-tight" style={{ textShadow: '0 0 60px rgba(255,255,255,0.5), 0 0 100px rgba(255,255,255,0.25), 0 2px 8px rgba(0,0,0,0.6)' }}>Corporate & Groups</h1>
          <p className="text-sandstone/80 text-base mt-2" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>Meetings, retreats, and group stays in the heart of Tigray</p>
        </div>
      </section>

      {/* Body Section */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-serif font-bold text-forest mb-4">Host Your Next Event in Tigray</h2>
          <p className="text-stone-600 leading-relaxed">
            Canaan International Hotel offers dedicated support for corporate travel, 
            regional summits, NGO delegations, and group bookings. With 24 rooms, 
            24-hour service, and a central Adigrat location, we are the natural choice 
            for organizations operating in Tigray.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          <div className="bg-sandstone p-6 rounded-xl">
            <h3 className="font-serif font-bold text-forest mb-1">24 Guestrooms</h3>
            <p className="text-sm text-stone-600">Full hotel buyout available for exclusive events</p>
          </div>
          <div className="bg-sandstone p-6 rounded-xl">
            <h3 className="font-serif font-bold text-forest mb-1">Conference Support</h3>
            <p className="text-sm text-stone-600">Flexible meeting space arrangements on request</p>
          </div>
          <div className="bg-sandstone p-6 rounded-xl">
            <h3 className="font-serif font-bold text-forest mb-1">Group Rates</h3>
            <p className="text-sm text-stone-600">Dedicated pricing for groups of 5 rooms or more</p>
          </div>
          <div className="bg-sandstone p-6 rounded-xl">
            <h3 className="font-serif font-bold text-forest mb-1">Logistics Support</h3>
            <p className="text-sm text-stone-600">Airport transfers and local transport coordination</p>
          </div>
        </div>

        {/* Inquiry Form */}
        <div className="bg-white p-8 rounded-xl shadow-lg border border-stone-100">
          <h3 className="text-xl font-serif font-bold text-forest mb-6">Send an Inquiry</h3>
          <CorporateInquiryForm />
        </div>
      </section>
    </main>
  );
}