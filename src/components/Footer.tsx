
"use client";

import React from "react";
import Link from "next/link";
import CanaanLogo from "@/components/ui/CanaanLogo";

// Refactored footer blueprint (simplified; newsletter removed per plan)
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
            <p className="text-sm text-gray-200">Where the basalt of the highlands meets sanctuary and comfort.</p>
            <div className="flex space-x-3">
              {['facebook', 'instagram', 'twitter', 'youtube'].map((icon, idx) => (
                <span key={idx} className="w-9 h-9 inline-flex items-center justify-center rounded-full border border-white/20 text-white/70 hover:bg-white/20 cursor-pointer">
                  <span className="material-symbols-outlined">{icon}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Column 2: Exploration */}
          <div>
            <h4 className="text-[10px] uppercase tracking-widest font-bold mb-3 text-cactus">Exploration</h4>
            <ul className="space-y-3 text-xs uppercase text-gray-200 font-medium">
              <li><Link href="/rooms" className="hover:text-sandstone">Suites & Sanctuaries</Link></li>
              <li><Link href="/dining" className="hover:text-sandstone">Canaanite Gastronomy</Link></li>
              <li><Link href="/services" className="hover:text-sandstone">Bespoke Experiences</Link></li>
              <li><Link href="/about" className="hover:text-sandstone">Our Highland Heritage</Link></li>
              <li><Link href="/contact" className="hover:text-sandstone">Stability Partnership</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="text-[10px] uppercase tracking-widest font-bold mb-3 text-cactus">Sanctuary Info</h4>
            <ul className="space-y-3 text-sm text-gray-200 font-light">
              <li className="flex items-center gap-2"><span className="material-symbols-outlined">call</span> +251 941 12 34 56</li>
              <li className="flex items-center gap-2"><span className="material-symbols-outlined">mail</span> stay@canaanhotel.com</li>
              <li className="flex items-start gap-2"><span className="material-symbols-outlined">location_on</span> Grand Mesob Tower, Highland Hub, Adigrat</li>
            </ul>
          </div>

          {/* Column 4: empty/CTA placeholder to reflect blueprint spacing */}
          <div className="hidden lg:block" aria-label="Footer CTA" />
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8 text-xs text-gray-300">
          <span>© 2026 Canaan International Hotel. Stability Core.</span>
          <div className="flex space-x-6">
            <Link href="/legal/privacy">Privacy</Link>
            <Link href="/legal/terms">Terms</Link>
            <Link href="/legal/cookies">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
