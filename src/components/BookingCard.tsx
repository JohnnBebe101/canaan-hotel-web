"use client";

import { useState } from "react";

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

      const data: BookingResponse = await response.json();

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
      {/* Transparent card with backdrop blur */}
      <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-8 border border-white/20">
        <div className="mb-6">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
            Book Your Stay
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Reserve directly for best rates. We'll confirm within 24 hours.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Guest Name */}
            <div>
              <label
                htmlFor="guest_name"
                className="block text-sm font-medium text-text-primary dark:text-background-light mb-2"
              >
                Full Name *
              </label>
              <input
                type="text"
                id="guest_name"
                name="guest_name"
                value={formData.guest_name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-border-color rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-background-light/10 text-text-primary dark:text-background-light placeholder-text-secondary dark:placeholder-text-secondary/70"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-text-primary dark:text-background-light mb-2"
              >
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-border-color rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-background-light/10 text-text-primary dark:text-background-light placeholder-text-secondary dark:placeholder-text-secondary/70"
                placeholder="guest@mail.com"
              />
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-text-primary dark:text-background-light mb-2"
              >
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-border-color rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-background-light/10 text-text-primary dark:text-background-light placeholder-text-secondary dark:placeholder-text-secondary/70"
                placeholder="+251 XXX XXX XXX"
              />
            </div>

            {/* Room Type */}
            <div>
              <label
                htmlFor="room_type"
                className="block text-sm font-medium text-text-primary dark:text-background-light mb-2"
              >
                Room Type *
              </label>
              <select
                id="room_type"
                name="room_type"
                value={formData.room_type}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-border-color rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-background-light/10 text-text-primary dark:text-background-light"
              >
                <option value="">Select a room type</option>
                <option value="Economy Single Room">Economy Single Room - $50/night</option>
                <option value="Comfort Double Room">Comfort Double Room - $75/night</option>
                <option value="Family Suite">Family Suite - $110/night</option>
              </select>
            </div>

            {/* Number of Guests */}
            <div>
              <label
                htmlFor="number_of_guests"
                className="block text-sm font-medium text-text-primary dark:text-background-light mb-2"
              >
                Number of Guests *
              </label>
              <input
                type="number"
                id="number_of_guests"
                name="number_of_guests"
                value={formData.number_of_guests}
                onChange={handleInputChange}
                required
                min={1}
                className="w-full px-4 py-3 border border-border-color rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-background-light/10 text-text-primary dark:text-background-light placeholder-text-secondary dark:placeholder-text-secondary/70"
                placeholder="Number of guests"
              />
            </div>

            {/* Total Price */}
            <div>
              <label
                htmlFor="total_price"
                className="block text-sm font-medium text-text-primary dark:text-background-light mb-2"
              >
                Total Price (USD) *
              </label>
              <input
                type="number"
                id="total_price"
                name="total_price"
                value={formData.total_price}
                onChange={handleInputChange}
                required
                min={0}
                step="0.01"
                className="w-full px-4 py-3 border border-border-color rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-background-light/10 text-text-primary dark:text-background-light placeholder-text-secondary dark:placeholder-text-secondary/70"
                placeholder="e.g., 150.00"
              />
            </div>

            {/* Check-in Date */}
            <div>
              <label
                htmlFor="check_in"
                className="block text-sm font-medium text-text-primary dark:text-background-light mb-2"
              >
                Check-in Date *
              </label>
              <input
                type="date"
                id="check_in"
                name="check_in"
                value={formData.check_in}
                onChange={handleInputChange}
                required
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border border-border-color rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-background-light/10 text-text-primary dark:text-background-light"
              />
            </div>

            {/* Check-out Date */}
            <div>
              <label
                htmlFor="check_out"
                className="block text-sm font-medium text-text-primary dark:text-background-light mb-2"
              >
                Check-out Date *
              </label>
              <input
                type="date"
                id="check_out"
                name="check_out"
                value={formData.check_out}
                onChange={handleInputChange}
                required
                min={formData.check_in || new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border border-border-color rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-background-light/10 text-text-primary dark:text-background-light"
              />
            </div>
          </div>

          {/* Special Requests */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-text-primary dark:text-background-light mb-2"
            >
              Special Requests (Optional)
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 border border-border-color rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-background-light/10 text-text-primary dark:text-background-light placeholder-text-secondary dark:placeholder-text-secondary/70 resize-none"
              placeholder="Any special requests or additional information..."
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 text-base font-bold text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Submitting...
                </>
              ) : (
                "Submit Booking Inquiry"
              )}
            </button>
          </div>

          {/* Status Message */}
          {submitStatus.type && (
            <div
              className={`p-4 rounded-lg ${submitStatus.type === "success"
                ? "bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-800"
                : "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800"
                }`}
            >
              {submitStatus.message}
            </div>
          )}
        </form>
      </div>
    </div>
    </section >
  );
}