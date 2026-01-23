export default function Footer() {
  return (
    <footer className="bg-white dark:bg-background-dark/90 border-t border-border-color dark:border-text-secondary/20">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <aside>
            <h3 className="text-lg font-bold text-text-primary dark:text-background-light flex items-center gap-2">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2L2 7v15h20V7L12 2zm0 2.83l8 4.48v.69H4v-.69l8-4.48zM10 10h4v8h-4v-8z"/>
              </svg>
              Cannan International Hotel
            </h3>
            <p className="mt-2 text-sm text-text-secondary dark:text-text-secondary/90">
              Your home in the heart of Tigray. Experience comfort, history, and warm Ethiopian hospitality.
            </p>
          </aside>
          
          <aside className="md:text-center not-italic">
            <h4 className="font-semibold text-text-primary dark:text-background-light">Contact Us</h4>
            <ul className="mt-2 space-y-1 text-sm text-text-secondary dark:text-text-secondary/90">
              <li>123 Main Street, Adigrat, Tigray</li>
              <li>
                <a href="tel:+251911095728" className="hover:text-primary transition-colors">
                  +251 911 095 728
                </a>
              </li>
              <li>
                <a href="mailto:contact@cannanhotel.com" className="hover:text-primary transition-colors">
                  contact@cannanhotel.com
                </a>
              </li>
            </ul>
          </aside>
          
          <nav className="md:text-right">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-text-primary dark:text-background-light">Company</h4>
                <ul className="mt-2 space-y-1 text-sm text-text-secondary dark:text-text-secondary/90">
                  <li><a href="/about" className="hover:text-primary transition-colors">About Us</a></li>
                  <li><a href="/rooms" className="hover:text-primary transition-colors">Rooms & Suites</a></li>
                  <li><a href="/services" className="hover:text-primary transition-colors">Services & Facilities</a></li>
                  <li><a href="/contact" className="hover:text-primary transition-colors">Contact & Location</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-text-primary dark:text-background-light">Legal</h4>
                <ul className="mt-2 space-y-1 text-sm text-text-secondary dark:text-text-secondary/90">
                  <li><a href="#privacy" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                  <li><a href="#terms" className="hover:text-primary transition-colors">Terms of Service</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-text-primary dark:text-background-light">Follow Us</h4>
                <div className="mt-2 flex gap-4 md:justify-end">
                  <a 
                    href="#" 
                    className="text-text-secondary hover:text-primary dark:text-text-secondary/90 dark:hover:text-primary transition-colors"
                    aria-label="Visit our Facebook page"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path 
                        fillRule="evenodd" 
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" 
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a 
                    href="#" 
                    className="text-text-secondary hover:text-primary dark:text-text-secondary/90 dark:hover:text-primary transition-colors"
                    aria-label="Visit our Instagram page"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path 
                        fillRule="evenodd" 
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218 1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.345 2.525c.636-.247 1.363.416 2.427-.465C9.795 2.013 10.148 2 12.315 2zm-1.003 3.844a.972.972 0 01.972.972c0 .537-.435.972-.972.972s-.972-.435-.972-.972c0-.537.435-.972.972-.972zM12 7.188c-2.649 0-4.812 2.163-4.812 4.812s2.163 4.812 4.812 4.812 4.812-2.163 4.812-4.812-2.163-4.812-4.812-4.812zm0 7.828a3.016 3.016 0 110-6.032 3.016 3.016 0 010 6.032z" 
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </nav>
        </div>
        
        <div className="mt-8 border-t border-border-color dark:border-text-secondary/30 pt-8 text-center text-sm text-text-secondary dark:text-text-secondary/90">
          <p>
            © 2024 Cannan International Hotel. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}