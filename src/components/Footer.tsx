import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-background-dark/90 border-t border-border-color dark:border-text-secondary/20">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <Image src="/images/logo 2.svg" alt="Canaan International Hotel Logo" width={48} height={48} className="h-12 w-auto" />
            </div>
            <p className="mt-4 text-sm text-text-secondary dark:text-text-secondary/90">
              Your home in the heart of Tigray. Experience comfort, history, and warm Ethiopian hospitality.
            </p>
            <div className="mt-4 flex gap-4">
              <a href="#" className="text-text-secondary hover:text-primary transition-colors" aria-label="Facebook">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a href="#" className="text-text-secondary hover:text-primary transition-colors" aria-label="Instagram">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.345 2.525c.636-.247 1.363.416 2.427-.465C9.795 2.013 10.148 2 12.315 2z" />
                </svg>
              </a>
              <a href="#" className="text-text-secondary hover:text-primary transition-colors" aria-label="Twitter">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-text-primary dark:text-background-light">Quick Links</h4>
            <ul className="mt-4 space-y-2 text-sm text-text-secondary dark:text-text-secondary/90">
              <li><Link href="/rooms" className="hover:text-primary transition-colors">Rooms & Suites</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">Services</Link></li>
              <li><Link href="/gallery" className="hover:text-primary transition-colors">Photo Gallery</Link></li>
              <li><Link href="/attractions" className="hover:text-primary transition-colors">Local Attractions</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-text-primary dark:text-background-light">Contact Us</h4>
            <ul className="mt-4 space-y-2 text-sm text-text-secondary dark:text-text-secondary/90">
              <li>123 Main Street, Adigrat, Tigray</li>
              <li>
                <a href="tel:+251911095728" className="hover:text-primary transition-colors">
                  +251 911 095 728
                </a>
              </li>
              <li>
                <a href="mailto:contact@canaanhotel.com" className="hover:text-primary transition-colors">
                  contact@canaanhotel.com
                </a>
              </li>
              <li>
                <Link href="/contact" className="text-primary hover:underline text-sm">
                  View on Map →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-text-primary dark:text-background-light">Newsletter</h4>
            <p className="mt-4 text-sm text-text-secondary dark:text-text-secondary/90">
              Subscribe for exclusive offers and updates.
            </p>
            <form className="mt-4 space-y-2">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-3 py-2 text-sm border border-border-color rounded-lg focus:ring-2 focus:ring-primary bg-white dark:bg-background-light/10 text-text-primary dark:text-background-light"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-orange-600 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h4 className="font-semibold text-text-primary dark:text-background-light">Payment Methods</h4>
            <div className="mt-4 flex flex-wrap gap-2">
              <div className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs text-text-secondary">Visa</div>
              <div className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs text-text-secondary">Mastercard</div>
              <div className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs text-text-secondary">Amex</div>
              <div className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs text-text-secondary">PayPal</div>
              <div className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs text-text-secondary">Bank Transfer</div>
            </div>
            <div className="mt-6">
              <h4 className="font-semibold text-text-primary dark:text-background-light text-sm">Certifications</h4>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex items-center gap-1 text-xs text-text-secondary">
                  <span className="material-symbols-outlined text-green-600 text-sm">verified</span>
                  <span>Ethiopian Tourism</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border-color dark:border-text-secondary/30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-text-secondary dark:text-text-secondary/90">
            <p>© 2025 Canaan International Hotel. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#privacy" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#terms" className="hover:text-primary transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
