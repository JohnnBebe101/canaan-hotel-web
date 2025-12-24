/**
 * Rooms Page
 * Route: /rooms
 *
 * Displays detailed information about hotel rooms
 */

interface Room {
  id: string;
  name: string;
  description: string;
  price: number;
  amenities: string[];
  images: string[]; // Placeholder for future image URLs
}

export default function RoomsPage() {
  // Static room data - in production this would come from a database or CMS
  const rooms: Room[] = [
    {
      id: "deluxe",
      name: "Deluxe Room",
      description: "Spacious and comfortable room perfect for your stay. Features modern amenities and a relaxing atmosphere.",
      price: 120,
      amenities: ["King Size Bed", "City View", "Free WiFi", "Air Conditioning", "Mini Bar", "Room Service"],
      images: []
    },
    {
      id: "executive",
      name: "Executive Suite",
      description: "Premium suite with stunning views and additional space. Ideal for business travelers or extended stays.",
      price: 200,
      amenities: ["King Size Bed", "Ocean View", "Free WiFi", "Air Conditioning", "Mini Bar", "Room Service", "Work Desk", "Coffee Machine"],
      images: []
    },
    {
      id: "presidential",
      name: "Presidential Suite",
      description: "The ultimate in luxury and sophistication. Experience unparalleled comfort in our finest accommodation.",
      price: 350,
      amenities: ["King Size Bed", "Panoramic View", "Free WiFi", "Air Conditioning", "Mini Bar", "24/7 Room Service", "Work Desk", "Coffee Machine", "Private Balcony", "Jacuzzi"],
      images: []
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Rooms</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our elegantly designed accommodations, each crafted for your comfort and relaxation.
              Choose from our range of rooms to find the perfect fit for your stay.
            </p>
          </div>
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <div key={room.id} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-lg transition-shadow duration-300">
              {/* Room Image Placeholder */}
              <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-gray-400 mb-2">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-sm">Room Image</p>
                  <p className="text-xs text-gray-400 mt-1">Coming Soon</p>
                </div>
              </div>

              {/* Room Details */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{room.name}</h3>
                  <span className="text-2xl font-bold text-amber-600">${room.price}</span>
                </div>

                <p className="text-gray-600 mb-6">{room.description}</p>

                {/* Amenities */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Amenities</h4>
                  <div className="flex flex-wrap gap-2">
                    {room.amenities.map((amenity, index) => (
                      <span
                        key={index}
                        className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Booking Button */}
                <div className="flex space-x-3">
                  <a
                    href={`/contact?room=${room.id}`}
                    className="flex-1 bg-amber-600 text-white text-center px-6 py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors"
                  >
                    Book Now
                  </a>
                  <button className="px-3 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-amber-50 border border-amber-200 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Book Your Stay?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Contact us today to reserve your room and experience the comfort and luxury of Canaan International Hotel.
          </p>
          <a
            href="/contact"
            className="inline-block bg-amber-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors"
          >
            Make a Reservation
          </a>
        </div>
      </div>
    </div>
  );
}
