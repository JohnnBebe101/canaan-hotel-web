import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            Canaan International Hotel
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-light">
            Your Gateway to Unforgettable Experiences
          </p>
          <Link
            href="/contact"
            className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors duration-200 shadow-lg"
          >
            Book Your Stay
          </Link>
        </div>
      </section>

      {/* Rooms Preview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Rooms
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our elegantly designed accommodations, each crafted for your comfort and relaxation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Room Card 1 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-64 bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                <span className="text-gray-500 text-sm">Room Image Placeholder</span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Deluxe Room</h3>
                <p className="text-gray-600 mb-4">
                  Spacious and comfortable, perfect for your stay
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-amber-600">$120/night</span>
                  <Link
                    href="/rooms"
                    className="text-amber-600 hover:text-amber-700 font-semibold"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>

            {/* Room Card 2 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-64 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                <span className="text-gray-500 text-sm">Room Image Placeholder</span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Executive Suite</h3>
                <p className="text-gray-600 mb-4">
                  Premium accommodations with stunning views
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-amber-600">$200/night</span>
                  <Link
                    href="/rooms"
                    className="text-amber-600 hover:text-amber-700 font-semibold"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>

            {/* Room Card 3 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-64 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                <span className="text-gray-500 text-sm">Room Image Placeholder</span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Presidential Suite</h3>
                <p className="text-gray-600 mb-4">
                  The ultimate in luxury and sophistication
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-amber-600">$350/night</span>
                  <Link
                    href="/rooms"
                    className="text-amber-600 hover:text-amber-700 font-semibold"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/rooms"
              className="inline-block bg-gray-900 hover:bg-gray-800 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
            >
              View All Rooms
            </Link>
          </div>
        </div>
      </section>

      {/* Booking Inquiry CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-600 to-amber-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Book Your Stay?
          </h2>
          <p className="text-xl text-amber-50 mb-8 max-w-2xl mx-auto">
            Send us your inquiry and our team will get back to you promptly to confirm your reservation
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white hover:bg-gray-100 text-amber-700 font-semibold px-10 py-4 rounded-lg text-lg transition-colors duration-200 shadow-lg"
          >
            Send Booking Inquiry
          </Link>
        </div>
      </section>

      {/* Reviews Placeholder Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Guest Reviews
            </h2>
            <p className="text-lg text-gray-600">
              See what our guests have to say about their stay
            </p>
          </div>
          
          {/* Reviews Widget Placeholder */}
          <div className="bg-white rounded-lg shadow-md p-12 border-2 border-dashed border-gray-300">
            <div className="text-center">
              <div className="text-gray-400 mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </div>
              <p className="text-gray-500 text-lg font-medium">
                Reviews Widget Placeholder
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Booking.com / TripAdvisor reviews widget will be integrated here
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Attractions Preview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Nearby Attractions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore the best that the area has to offer, all within easy reach of our hotel
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Attraction 1 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                <span className="text-gray-500 text-sm">Attraction Image Placeholder</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Historic Downtown</h3>
                <p className="text-gray-600 mb-4">
                  Discover charming streets and local culture just minutes away
                </p>
                <p className="text-sm text-gray-500">0.5 km away</p>
              </div>
            </div>

            {/* Attraction 2 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
                <span className="text-gray-500 text-sm">Attraction Image Placeholder</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Museum District</h3>
                <p className="text-gray-600 mb-4">
                  Explore world-class museums and art galleries
                </p>
                <p className="text-sm text-gray-500">1.2 km away</p>
              </div>
            </div>

            {/* Attraction 3 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center">
                <span className="text-gray-500 text-sm">Attraction Image Placeholder</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Central Park</h3>
                <p className="text-gray-600 mb-4">
                  Beautiful green spaces perfect for relaxation and recreation
                </p>
                <p className="text-sm text-gray-500">0.8 km away</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/attractions"
              className="inline-block bg-gray-900 hover:bg-gray-800 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
            >
              Explore All Attractions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

