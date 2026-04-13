import Link from 'next/link';

export default function BookingSuccessPage() {
  return (
    <main className="min-h-screen bg-sandstone flex items-center justify-center">
      <div className="max-w-md w-full mx-4 text-center">
        <div className="bg-white rounded-2xl shadow-lg border border-cactus/10 p-8">
          <div className="w-16 h-16 bg-cactus/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-cactus"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="font-serif text-2xl font-bold text-forest mb-4">
            Payment Successful!
          </h1>

          <p className="text-stone-600 mb-8">
            Thank you for your payment. Your booking has been confirmed and you will receive a confirmation email shortly.
          </p>

          <div className="space-y-3">
            <Link
              href="/"
              className="block w-full bg-forest text-sandstone font-semibold py-3 px-6 rounded-xl hover:bg-cactus transition-colors"
            >
              Return to Home
            </Link>

            <Link
              href="/contact"
              className="block w-full border border-forest/20 text-forest font-medium py-3 px-6 rounded-xl hover:bg-forest/5 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>

        <p className="text-xs text-stone-400 mt-6">
          Payment processed securely via Stripe
        </p>
      </div>
    </main>
  );
}