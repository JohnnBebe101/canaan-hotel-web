export default function AttractionsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Local Attractions
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore the best of what our destination has to offer, from cultural sites to natural wonders
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8">
          <p className="text-gray-500 text-center">
            Nearby attractions and points of interest will be featured here.
          </p>
        </div>
      </div>
    </div>
  );
}
