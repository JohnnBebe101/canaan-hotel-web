"use client";

import { useState } from "react";
import Button from "./ui/Button";
import Badge from "./ui/Badge";

interface BookingFormData {
  guest_name: string;
  email: string;
  phone: string;
  room_type: string;
  number_of_guests: number;
  total_price: number;
  check_in: string;
  check_out: string;
  message: string;
}

interface BookingResponse {
  message: string;
  booking_id: string;
  status: string;
}

export default function BookingCard() {
  const [formData, setFormData] = useState<BookingFormData>({
    guest_name: "",
    email: "",
    phone: "",
    room_type: "",
    number_of_guests: 1,
    total_price: 0,
    check_in: "",
    check_out: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          guest_name: formData.guest_name,
          email: formData.email,
          phone: formData.phone,
          room_type: formData.room_type,
          number_of_guests: formData.number_of_guests,
          total_price: formData.total_price,
          dates: {
            check_in: formData.check_in,
            check_out: formData.check_out,
          },
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "Booking inquiry submitted successfully! We'll contact you soon.",
        });
        // Reset form
        setFormData({
          guest_name: "",
          email: "",
          phone: "",
          room_type: "",
          number_of_guests: 1,
          total_price: 0,
          check_in: "",
          check_out: "",
          message: "",
        });
      } else {
        setSubmitStatus({
          type: "error",
          message: data.message || "Failed to submit booking inquiry. Please try again.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <div className="bg-white/80 backdrop-blur-xl rounded-sm shadow-2xl p-8 md:p-10 border border-forest/5 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-forest via-cactus to-forest"></div>

        <div className="mb-8 flex items-center justify-between relative z-10">
          <div>
            <h2 className="text-3xl font-serif text-forest mb-2">
              Secure Your Stay
            </h2>
            <p className="text-xs uppercase tracking-widest text-gray-500 font-bold">
              Direct Reservation Privilege
            </p>
          </div>
          <Badge variant="cactus" size="sm" className="gap-2 px-3 py-1">
            <span className="material-symbols-outlined text-sm">verified</span>
            <span>Best Rate</span>
          </Badge>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Guest Name */}
            <div className="space-y-2">
              <label htmlFor="guest_name" className="block text-[10px] uppercase font-bold tracking-widest text-forest/60">
                Full Name
              </label>
              <input
                type="text"
                id="guest_name"
                name="guest_name"
                value={formData.guest_name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-b-2 border-forest/10 bg-transparent text-forest font-serif text-lg focus:border-cactus outline-none transition-colors placeholder:text-gray-300 placeholder:font-sans placeholder:text-sm"
                placeholder="E.g. Alexander Mesob"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-[10px] uppercase font-bold tracking-widest text-forest/60">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-b-2 border-forest/10 bg-transparent text-forest font-serif text-lg focus:border-cactus outline-none transition-colors placeholder:text-gray-300 placeholder:font-sans placeholder:text-sm"
                placeholder="guest@example.com"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-[10px] uppercase font-bold tracking-widest text-forest/60">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-b-2 border-forest/10 bg-transparent text-forest font-serif text-lg focus:border-cactus outline-none transition-colors placeholder:text-gray-300 placeholder:font-sans placeholder:text-sm"
                placeholder="+251 ..."
              />
            </div>

            {/* Room Type */}
            <div className="space-y-2">
              <label htmlFor="room_type" className="block text-[10px] uppercase font-bold tracking-widest text-forest/60">
                Chamber Preference
              </label>
              <div className="relative">
                <select
                  id="room_type"
                  name="room_type"
                  value={formData.room_type}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-b-2 border-forest/10 bg-transparent text-forest font-serif text-lg focus:border-cactus outline-none transition-colors appearance-none cursor-pointer"
                >
                  <option value="">Select Chamber</option>
                  <option value="Economy Single Room">Economy Single Room</option>
                  <option value="Comfort Double Room">Comfort Double Room</option>
                  <option value="Family Suite">Family Suite</option>
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-forest/30">
                  <span className="material-symbols-outlined text-sm">expand_more</span>
                </div>
              </div>
            </div>

            {/* Number of Guests */}
            <div className="space-y-2">
              <label htmlFor="number_of_guests" className="block text-[10px] uppercase font-bold tracking-widest text-forest/60">
                Guests
              </label>
              <input
                type="number"
                id="number_of_guests"
                name="number_of_guests"
                value={formData.number_of_guests}
                onChange={handleInputChange}
                required
                min={1}
                className="w-full px-4 py-3 border-b-2 border-forest/10 bg-transparent text-forest font-serif text-lg focus:border-cactus outline-none transition-colors"
              />
            </div>

            {/* Total Price (USD) Placeholder - usually calc'd */}
            <div className="space-y-2 opacity-50 pointer-events-none">
              <label className="block text-[10px] uppercase font-bold tracking-widest text-forest/60">
                Est. Investment (USD)
              </label>
              <input
                type="number"
                disabled
                value={formData.total_price}
                className="w-full px-4 py-3 border-b-2 border-forest/10 bg-transparent text-forest font-serif text-lg"
              />
            </div>

            {/* Check-in Date */}
            <div className="space-y-2">
              <label htmlFor="check_in" className="block text-[10px] uppercase font-bold tracking-widest text-forest/60">
                Arrival
              </label>
              <input
                type="date"
                id="check_in"
                name="check_in"
                value={formData.check_in}
                onChange={handleInputChange}
                required
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border-b-2 border-forest/10 bg-transparent text-forest font-serif text-lg focus:border-cactus outline-none transition-colors"
              />
            </div>

            {/* Check-out Date */}
            <div className="space-y-2">
              <label htmlFor="check_out" className="block text-[10px] uppercase font-bold tracking-widest text-forest/60">
                Departure
              </label>
              <input
                type="date"
                id="check_out"
                name="check_out"
                value={formData.check_out}
                onChange={handleInputChange}
                required
                min={formData.check_in || new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border-b-2 border-forest/10 bg-transparent text-forest font-serif text-lg focus:border-cactus outline-none transition-colors"
              />
            </div>
          </div>

          <div className="flex justify-center pt-8">
            <Button
              type="submit"
              size="lg"
              variant="primary"
              className="w-full md:w-auto min-w-[200px]"
              isLoading={isSubmitting}
            >
              Initiate Reservation
            </Button>
          </div>

          {submitStatus.type && (
            <div
              className={`p-4 rounded-sm text-xs font-bold uppercase tracking-widest border ${submitStatus.type === "success"
                ? "bg-cactus/10 text-cactus border-cactus/20"
                : "bg-red-50 text-red-800 border-red-200"
                }`}
            >
              {submitStatus.message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
