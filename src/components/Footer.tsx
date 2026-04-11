import React from "react";
import Link from "next/link";
import Image from "next/image";
import CanaanLogo from "@/components/ui/CanaanLogo";
import { Icon } from "@/components/ui/Icons";

export default function Footer() {
  return (
    <footer className="bg-forest text-sandstone">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-8">
          {/* Column 1 — Brand Identity */}
          <div className="space-y-4">
            <CanaanLogo size="w-20 h-20" className="text-cactus" />
            <p className="text-sandstone/60 text-sm leading-relaxed mt-3 max-w-[200px]">
              Where the basalt of the highlands meets sanctuary and comfort.
            </p>
            <div className="flex space-x-3 pt-2">
              <a href="#" aria-label="Facebook — coming soon" className="text-sandstone/40 hover:text-bronze transition-colors opacity-60 cursor-not-allowed">
                <Icon name="facebook" className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Instagram — coming soon" className="text-sandstone/40 hover:text-bronze transition-colors opacity-60 cursor-not-allowed">
                <Icon name="instagram" className="w-5 h-5" />
              </a>
              <a href="#" aria-label="X/Twitter — coming soon" className="text-sandstone/40 hover:text-bronze transition-colors opacity-60 cursor-not-allowed">
                <Icon name="twitter" className="w-5 h-5" />
              </a>
              <a href="#" aria-label="YouTube — coming soon" className="text-sandstone/40 hover:text-bronze transition-colors opacity-60 cursor-not-allowed">
                <Icon name="youtube" className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2 — Explore */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase mb-4 text-sandstone/40">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/rooms" className="block text-sandstone/70 hover:text-sandstone text-sm py-1 transition-colors">
                  Rooms & Suites
                </Link>
              </li>
              <li>
                <Link href="/services/gastronomy" className="block text-sandstone/70 hover:text-sandstone text-sm py-1 transition-colors">
                  Canaanite Gastronomy
                </Link>
              </li>
              <li>
                <Link href="/about" className="block text-sandstone/70 hover:text-sandstone text-sm py-1 transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/blog" className="block text-sandstone/70 hover:text-sandstone text-sm py-1 transition-colors">
                  Journal & Stories
                </Link>
              </li>
              <li>
                <Link href="/corporate" className="block text-sandstone/70 hover:text-sandstone text-sm py-1 transition-colors">
                  Corporate & Groups
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 — Contact */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase mb-4 text-sandstone/40">Contact</h4>
            <ul className="space-y-3 text-sm text-sandstone/70">
              <li className="flex items-center gap-2">
                <Icon name="call" className="w-4 h-4 text-cactus" />
                <a href="tel:+251911095728" className="hover:text-bronze transition-colors">+251 911 095 728</a>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="mail" className="w-4 h-4 text-cactus" />
                <a href="mailto:info@canaanhotels.com" className="hover:text-bronze transition-colors">info@canaanhotels.com</a>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="location_on" className="w-4 h-4 text-cactus mt-0.5" />
                <span>
                  Kebele 03, Adigrat<br />
                  <span className="text-sandstone/50">Tigray 1000, Ethiopia</span>
                </span>
              </li>
              <li className="flex items-center gap-2 pt-2">
                <Icon name="info" className="w-4 h-4 text-cactus" />
                <span className="text-sandstone/60">24-Hour Front Desk</span>
              </li>
            </ul>
          </div>

          {/* Column 4 — Visit */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase mb-4 text-sandstone/40">Visit</h4>
            <div className="bg-forest/40 border border-cactus/20 rounded-lg h-32 flex items-center justify-center">
              <span className="text-sandstone/40 text-xs text-center">Kebele 03, Adigrat</span>
            </div>
            <a 
              href="https://maps.google.com/?q=Adigrat,Tigray,Ethiopia" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-bronze text-xs hover:underline mt-2 inline-block"
            >
              Open in Google Maps →
            </a>
            <div className="text-sandstone/60 text-xs mt-4">
              <p>Check-in: 12:00 PM</p>
              <p>Check-out: 11:00 AM</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-cactus/20 pt-6 mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-sandstone/40">
            <span>© 2026 Canaan International Hotel. All rights reserved.</span>
            <div className="flex gap-6">
              <Link href="/legal/privacy" className="text-sandstone/40 hover:text-sandstone/70 transition-colors">Privacy</Link>
              <span>·</span>
              <Link href="/legal/terms" className="text-sandstone/40 hover:text-sandstone/70 transition-colors">Terms</Link>
              <span>·</span>
              <Link href="/legal/cookies" className="text-sandstone/40 hover:text-sandstone/70 transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}