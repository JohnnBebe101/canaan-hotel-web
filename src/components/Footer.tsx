"use client";

import React from "react";
import Link from "next/link";
import CanaanLogo from "@/components/ui/CanaanLogo";
import { Icon } from "@/components/ui/Icons";

export default function Footer() {
  return (
    <footer className="bg-forest text-sandstone py-12" role="contentinfo">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-8">
          {/* Column 1: Brand & Social */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <CanaanLogo className="w-9 h-9 text-cactus" />
              <span className="text-xl font-semibold">Canaan Hotel</span>
            </div>
            <p className="text-sm text-sandstone/90">Where the basalt of the highlands meets sanctuary and comfort.</p>
            <div className="flex space-x-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 inline-flex items-center justify-center rounded-full border border-sandstone/20 text-sandstone/70 hover:text-cactus hover:bg-sandstone/10" aria-label="Facebook">
                <Icon name="facebook" className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 inline-flex items-center justify-center rounded-full border border-sandstone/20 text-sandstone/70 hover:text-cactus hover:bg-sandstone/10" aria-label="Instagram">
                <Icon name="instagram" className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 inline-flex items-center justify-center rounded-full border border-sandstone/20 text-sandstone/70 hover:text-cactus hover:bg-sandstone/10" aria-label="Twitter">
                <Icon name="twitter" className="w-5 h-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 inline-flex items-center justify-center rounded-full border border-sandstone/20 text-sandstone/70 hover:text-cactus hover:bg-sandstone/10" aria-label="YouTube">
                <Icon name="youtube" className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2 — Exploration */}
          <div>
            <h4 className="text-[10px] uppercase tracking-widest font-bold mb-3 text-cactus">Discover</h4>
            <ul className="space-y-3 text-xs uppercase text-sandstone/80 font-medium">
              <li><Link href="/rooms" className="hover:text-cactus transition-colors duration-300">Rooms & Suites</Link></li>
              <li><Link href="/dining" className="hover:text-cactus transition-colors duration-300">Canaanite Gastronomy</Link></li>
              <li><Link href="/services" className="hover:text-cactus transition-colors duration-300">Bespoke Experiences</Link></li>
              <li><Link href="/about" className="hover:text-cactus transition-colors duration-300">Our Highland Heritage</Link></li>
              <li><Link href="/contact" className="hover:text-cactus transition-colors duration-300">Corporate & Groups</Link></li>
            </ul>
          </div>

          {/* Column 3 — Sanctuary Info */}
          <div>
            <h4 className="text-[10px] uppercase tracking-widest font-bold mb-3 text-cactus">Contact & Location</h4>
            <ul className="space-y-3 text-sm text-sandstone/90 font-light leading-relaxed">
              <li className="flex items-center gap-2"><Icon name="call" className="w-4 h-4 text-cactus" /> +251 935 406 334</li>
              <li className="flex items-center gap-2"><Icon name="mail" className="w-4 h-4 text-cactus" /> stay@canaanhotel.com</li>
              <li className="flex items-start gap-2"><Icon name="location_on" className="w-4 h-4 text-cactus mt-0.5" /> Kebele 03, Adigrat, Tigray, 1000, Ethiopia</li>
            </ul>
          </div>

          {/* Column 4 - empty/CTA placeholder */}
          <div className="hidden lg:block" aria-label="Footer CTA" />
        </div>

        <div className="pt-6 border-t border-sandstone/10 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8 text-xs text-sandstone/50">
          <span>© 2026 Canaan International Hotel. All rights reserved.</span>
          <div className="flex space-x-6">
            <Link href="/legal/privacy" className="text-sandstone/50 hover:text-cactus transition-colors">Privacy</Link>
            <Link href="/legal/terms" className="text-sandstone/50 hover:text-cactus transition-colors">Terms</Link>
            <Link href="/legal/cookies" className="text-sandstone/50 hover:text-cactus transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}