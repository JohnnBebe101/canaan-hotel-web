import type { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Terms of Service | Canaan International Hotel",
  description: "Terms of service for Canaan International Hotel, Adigrat, Tigray.",
};

export default function TermsPage() {
  return (
    <main id="main-content" className="flex flex-col items-center py-16 px-4">
      <div className="max-w-3xl w-full">
        <h1 className="text-4xl font-serif font-bold text-forest mb-8">Terms of Service</h1>
        <div className="prose prose-sandstone max-w-none">
          <p className="text-text-secondary leading-relaxed mb-6">
            Welcome to Canaan International Hotel. By accessing our website or staying at our hotel, you agree to these terms of service.
          </p>
          <h2 className="text-2xl font-bold text-forest mt-8 mb-4">Booking Terms</h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            All reservations are subject to availability and confirmation. A valid payment method is required to secure your booking.
          </p>
          <h2 className="text-2xl font-bold text-forest mt-8 mb-4">Check-in / Check-out</h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            Check-in time is 12:00 PM. Check-out time is 10:00 AM. Early check-in and late check-out may be available upon request.
          </p>
          <h2 className="text-2xl font-bold text-forest mt-8 mb-4">Cancellation Policy</h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            Free cancellation is available up to 24 hours before your scheduled arrival. After that, the first night is non-refundable.
          </p>
          <h2 className="text-2xl font-bold text-forest mt-8 mb-4">Liability</h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            Canaan International Hotel is not liable for any injury, loss, or damage to guests' property during their stay, except as required by law.
          </p>
          <h2 className="text-2xl font-bold text-forest mt-8 mb-4">Contact Us</h2>
          <p className="text-text-secondary leading-relaxed">
            For questions about these terms, please contact us at <a href="mailto:info@canaanhotels.com" className="text-cactus hover:underline">info@canaanhotels.com</a>.
          </p>
        </div>
      </div>
    </main>
  );
}