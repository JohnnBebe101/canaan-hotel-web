"use client";

import { useState } from "react";
import Image from "next/image";
import OptimizedImage from "@/components/OptimizedImage";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CanaanPattern from "@/components/ui/CanaanPattern";
import { Icon } from "@/components/ui/Icons";

export default function ContactClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Contact Enquiry — ${formData.interest || "General"}`
    );
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nInterest: ${formData.interest}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:info@canaanhotels.com?subject=${subject}&body=${body}`;
    setTimeout(() => setSent(true), 400);
  };

  return (
    <main className="min-h-screen">
      {/* SECTION 1 — HERO */}
      <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
        <Image
          src="/images/heroes/Gate-Corrdor.webp"
          alt="Canaan International Hotel entrance"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-forest/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 px-6 text-center">
          <p className="text-white/90 text-xs font-semibold tracking-[0.3em] uppercase mb-3">
            Get in Touch
          </p>
          <h1
            className="font-serif text-white text-5xl md:text-6xl font-bold leading-tight"
            style={{
              textShadow:
                "0 0 60px rgba(255,255,255,0.5), 0 0 100px rgba(255,255,255,0.25), 0 2px 8px rgba(0,0,0,0.6)",
            }}
          >
            We'd Love to Hear<br />
            From You
          </h1>
          <p className="text-white/90 text-base mt-4 max-w-md leading-relaxed">
            Direct bookings receive priority confirmation and our best available
            rate.
          </p>
        </div>
      </section>

      {/* SECTION 2 — CONTACT INFO CARDS */}
      <section className="bg-sandstone py-16">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Address card */}
              <a
                href="https://maps.google.com/?q=Kebele+03+Adigrat+Tigray+Ethiopia"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-2xl border border-cactus/10 p-8 hover:shadow-md hover:border-bronze/20 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-bronze/10 flex items-center justify-center mb-5">
                  <Icon name="location_on" className="text-bronze" />
                </div>
                <p className="text-forest/40 text-xs font-semibold tracking-widest uppercase mb-2">
                  Address
                </p>
                <p className="text-forest font-medium text-sm leading-relaxed">
                  Kebele 03, Adigrat<br />
                  Tigray 1000, Ethiopia
                </p>
                <p className="text-bronze text-xs mt-3 group-hover:underline">
                  Open in Maps →
                </p>
              </a>

              {/* Phone card */}
              <a
                href="tel:+251911095728"
                className="group bg-white rounded-2xl border border-cactus/10 p-8 hover:shadow-md hover:border-bronze/20 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-bronze/10 flex items-center justify-center mb-5">
                  <Icon name="call" className="text-bronze" />
                </div>
                <p className="text-forest/40 text-xs font-semibold tracking-widest uppercase mb-2">
                  Phone
                </p>
                <p className="text-forest font-medium text-sm">
                  +251 911 095 728
                </p>
                <p className="text-forest/40 text-xs mt-1">24-Hour Front Desk</p>
                <p className="text-bronze text-xs mt-3 group-hover:underline">
                  Call now →
                </p>
              </a>

              {/* Email card */}
              <a
                href="mailto:info@canaanhotels.com"
                className="group bg-white rounded-2xl border border-cactus/10 p-8 hover:shadow-md hover:border-bronze/20 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-bronze/10 flex items-center justify-center mb-5">
                  <Icon name="mail" className="text-bronze" />
                </div>
                <p className="text-forest/40 text-xs font-semibold tracking-widest uppercase mb-2">
                  Email
                </p>
                <p className="text-forest font-medium text-sm">
                  info@canaanhotels.com
                </p>
                <p className="text-forest/40 text-xs mt-1">
                  We reply within 24 hours
                </p>
                <p className="text-bronze text-xs mt-3 group-hover:underline">
                  Send email →
                </p>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 3 — MAP + FORM (two-column) */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-10 items-start">
            {/* LEFT — Map + location details */}
            <ScrollReveal direction="left">
              <div className="flex flex-col gap-6">
                {/* Map iframe */}
                <div className="rounded-2xl overflow-hidden shadow-lg border border-cactus/10 h-72 relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3948.533!2d39.4624769!3d14.2845872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x166c8f924fda49bb%3A0xf3d84f15780cf278!2sInternational%20Canaan%20Hotel!5e0!3m2!1sen!2set!4v"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Canaan International Hotel location map"
                  />
                </div>

                {/* Open in Maps link */}
                <a
                  href="https://maps.google.com/?q=Kebele+03+Adigrat+Tigray+Ethiopia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-forest text-sandstone text-sm font-medium py-3 px-6 rounded-xl hover:bg-cactus transition-colors duration-300 w-fit"
                >
                  <Icon name="map" className="text-base" />
                  Open in Google Maps
                </a>

                {/* Location details list */}
                <div className="bg-sandstone rounded-2xl p-6 space-y-4">
                  {[
                    { icon: "near_me" as const, text: "0.2 km from Adigrat city centre" },
                    { icon: "directions_car" as const, text: "Gheralta Mountains — 65 km day trip" },
                    { icon: "location_on" as const, text: "Altitude: 2,457 m above sea level" },
                    { icon: "concierge" as const, text: "24-Hour front desk & guest services" },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-3">
                      <Icon name={item.icon} className="text-bronze text-lg shrink-0" />
                      <span className="text-forest/70 text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* RIGHT — Enquiry form */}
            <ScrollReveal direction="right">
              <div className="bg-white rounded-2xl border border-cactus/10 shadow-sm p-8">
                <p className="text-bronze text-xs font-semibold tracking-[0.3em] uppercase mb-2">
                  Enquire
                </p>
                <h2 className="font-serif text-forest text-2xl font-bold mb-6">
                  Ask a Question
                </h2>

                {/* Success state */}
                {sent ? (
                  <div className="bg-cactus/10 border border-cactus/20 rounded-xl p-6 text-center">
                    <Icon
                      name="check_circle"
                      className="text-cactus text-3xl mx-auto mb-3"
                    />
                    <p className="text-forest font-semibold text-sm mb-1">
                      Enquiry prepared successfully
                    </p>
                    <p className="text-forest/60 text-xs leading-relaxed">
                      Complete your message in the email app that just opened. We
                      reply within 24 hours.
                    </p>
                    <button
                      onClick={() => setSent(false)}
                      className="mt-4 text-bronze text-xs hover:underline"
                    >
                      Send another enquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-medium text-forest/60 mb-1">
                        Full Name <span className="text-bronze">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm text-forest placeholder:text-forest/30 focus:outline-none focus:ring-2 focus:ring-bronze/40 focus:border-bronze/40 transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-medium text-forest/60 mb-1">
                        Email Address <span className="text-bronze">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm text-forest placeholder:text-forest/30 focus:outline-none focus:ring-2 focus:ring-bronze/40 focus:border-bronze/40 transition-colors"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-medium text-forest/60 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+251 9XX XXX XXX"
                        className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm text-forest placeholder:text-forest/30 focus:outline-none focus:ring-2 focus:ring-bronze/40 focus:border-bronze/40 transition-colors"
                      />
                    </div>

                    {/* Room Interest */}
                    <div>
                      <label className="block text-xs font-medium text-forest/60 mb-1">
                        I'm interested in
                      </label>
                      <select
                        name="interest"
                        value={formData.interest}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm text-forest bg-white focus:outline-none focus:ring-2 focus:ring-bronze/40 focus:border-bronze/40 transition-colors"
                      >
                        <option value="">Select an option...</option>
                        <option value="Economy Single Room">Economy Single Room</option>
                        <option value="Economy Double Room">
                          Economy Double Room
                        </option>
                        <option value="Family Room">Family Room</option>
                        <option value="Comfort Double Room">Comfort Double Room</option>
                        <option value="Corporate / Group Booking">
                          Corporate / Group Booking
                        </option>
                        <option value="Dining Reservation">
                          Dining Reservation
                        </option>
                        <option value="General Enquiry">General Enquiry</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-medium text-forest/60 mb-1">
                        Message <span className="text-bronze">*</span>
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us how we can help..."
                        className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm text-forest placeholder:text-forest/30 resize-none focus:outline-none focus:ring-2 focus:ring-bronze/40 focus:border-bronze/40 transition-colors"
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="w-full bg-forest text-sandstone font-semibold text-sm py-3.5 rounded-xl hover:bg-cactus transition-colors duration-300 tracking-wide"
                    >
                      Send Enquiry →
                    </button>

                    <p className="text-forest/30 text-xs text-center">
                      We respond to all enquiries within 24 hours.
                    </p>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SECTION 4 — OPERATING HOURS STRIP */}
      <section className="bg-forest">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-cactus/30">
            {[
              { icon: "calendar_today" as const, label: "Check-in", value: "12:00 PM" },
              { icon: "calendar_today" as const, label: "Check-out", value: "11:00 AM" },
              { icon: "concierge" as const, label: "Front Desk", value: "24 Hours" },
              { icon: "free_breakfast" as const, label: "Breakfast", value: "6:00–10:00 AM" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center text-center px-6 py-4 gap-2"
              >
                <Icon name={item.icon} className="text-bronze text-xl" />
                <p className="text-sandstone/40 text-xs tracking-widest uppercase">
                  {item.label}
                </p>
                <p className="text-sandstone font-semibold text-sm">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — ALTERNATIVE CONTACT METHODS */}
      <section className="bg-sandstone py-16">
        <div className="max-w-3xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-10">
              <p className="text-bronze text-xs font-semibold tracking-[0.3em] uppercase mb-3">
                Prefer to reach us directly?
              </p>
              <h2 className="font-serif text-forest text-3xl font-bold">
                Other Ways to Connect
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Call */}
              <a
                href="tel:+251911095728"
                className="group bg-white rounded-2xl border border-cactus/10 p-8 text-center hover:shadow-md hover:border-bronze/20 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-forest flex items-center justify-center mx-auto mb-4 group-hover:bg-cactus transition-colors">
                  <Icon name="call" className="text-sandstone text-xl" />
                </div>
                <p className="text-forest font-semibold text-sm mb-1">
                  Call Us Directly
                </p>
                <p className="text-bronze font-bold text-lg">+251 911 095 728</p>
                <p className="text-forest/40 text-xs mt-2">Available 24 hours</p>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/251911095728"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-2xl border border-cactus/10 p-8 text-center hover:shadow-md hover:border-bronze/20 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center mx-auto mb-4">
                  <svg
                    viewBox="0 0 24 24"
                    fill="white"
                    className="w-7 h-7"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <p className="text-forest font-semibold text-sm mb-1">WhatsApp</p>
                <p className="text-bronze font-bold text-lg">+251 911 095 728</p>
                <p className="text-forest/40 text-xs mt-2">
                  Quick replies via WhatsApp
                </p>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 6 — CLOSING CTA */}
      <section className="relative bg-forest py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <CanaanPattern />
        </div>
        <div className="relative max-w-2xl mx-auto px-6 text-center">
          <p className="text-bronze text-xs font-semibold tracking-[0.3em] uppercase mb-4">
            Ready to Visit?
          </p>
          <h2 className="font-serif text-sandstone text-4xl font-bold leading-tight mb-5">
            Book Your Stay Today
          </h2>
          <p className="text-sandstone/60 text-base leading-relaxed mb-10">
            Experience the warmth of Ethiopian hospitality in the heart of
            Adigrat. Reserve your room now and enjoy direct booking benefits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/rooms"
              className="inline-flex items-center justify-center gap-2 bg-bronze text-sandstone font-semibold text-sm py-3 px-8 rounded-xl hover:bg-bronze/80 transition-colors"
            >
              View Rooms
              <Icon name="arrow_forward" className="text-base" />
            </a>
            <a
              href="tel:+251911095728"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-sandstone/30 text-sandstone font-semibold text-sm py-3 px-8 rounded-xl hover:bg-sandstone/10 transition-colors"
            >
              Call Now
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}