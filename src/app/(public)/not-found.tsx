import Link from "next/link";
import { Icon } from "@/components/ui/Icons";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-20 text-center bg-sandstone">
      <div className="max-w-lg">
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-forest/10 rounded-full flex items-center justify-center">
            <Icon name="block" className="w-12 h-12 text-forest" />
          </div>
        </div>
        
        <h1 className="text-6xl font-serif font-bold text-forest mb-4">404</h1>
        <h2 className="text-2xl font-bold text-forest mb-4">Page Not Found</h2>
        <p className="text-text-secondary mb-8">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. 
          It may have been moved or doesn&apos;t exist.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-forest text-sandstone px-8 py-3 rounded-lg font-bold hover:bg-forest/90 transition-colors"
          >
            <Icon name="home" className="w-5 h-5" />
            Home
          </Link>
          <Link 
            href="/rooms"
            className="inline-flex items-center justify-center gap-2 border-2 border-forest text-forest px-8 py-3 rounded-lg font-bold hover:bg-forest/5 transition-colors"
          >
            <Icon name="hotel" className="w-5 h-5" />
            Rooms
          </Link>
        </div>
      </div>
    </main>
  );
}