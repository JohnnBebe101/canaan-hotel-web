export default function RoomsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Rooms
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our elegantly designed accommodations, each crafted for your comfort and relaxation
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8">
          <p className="text-gray-500 text-center">
            Room listings and availability will be displayed here.
          </p>
        </div>
      </div>
    </div>
  );
}
