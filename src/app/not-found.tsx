import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-sandstone flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <p className="font-serif text-7xl font-bold text-bronze mb-4">404</p>
        <h1 className="font-serif text-3xl font-bold text-forest mb-3">
          Page Not Found
        </h1>
        <p className="text-stone-600 leading-relaxed mb-8">
          The page you are looking for does not exist or may have been moved.
          Return home or explore our rooms to continue your journey.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto bg-forest text-sandstone font-semibold px-8 py-3 rounded-lg text-center hover:bg-cactus transition-colors"
          >
            Return Home
          </Link>
          <Link
            href="/rooms"
            className="w-full sm:w-auto border border-forest/20 text-forest font-medium px-8 py-3 rounded-lg text-center hover:bg-forest/5 transition-colors"
          >
            Explore Rooms
          </Link>
        </div>
      </div>
    </main>
  );
}