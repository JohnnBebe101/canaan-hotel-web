
"use client";

import React from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";

import CanaanLogo from "@/components/ui/CanaanLogo";

const NewsletterSignup = () => (
  <div className="space-y-6">
    <h4 className="text-[10px] uppercase tracking-widest font-bold text-cactus">Heritage Newsletter</h4>
    <p className="text-xs text-gray-400 font-light leading-relaxed">
      Curated updates from the highlands. Architecture, culture, and exclusive rates.
    </p>
    <form className="relative group" onSubmit={(e) => e.preventDefault()}>
      <div className="flex border-b border-white/10 group-focus-within:border-cactus transition-colors pb-2">
        <span className="material-symbols-outlined text-gray-600 mr-3 mt-1 text-base">mail</span>
        <input
          type="email"
          placeholder="EMAIL ADDRESS"
          className="bg-transparent text-xs w-full focus:outline-none text-sandstone uppercase tracking-widest placeholder:text-gray-700"
          required
        />
        <button type="submit" className="text-cactus hover:text-sandstone transition-colors" aria-label="Subscribe">
          <span className="material-symbols-outlined text-base">arrow_forward</span>
        </button>
      </div>
    </form>
  </div>
);

export default function Footer() {
  return (
    <footer className="bg-forest text-sandstone pt-40 pb-16" role="contentinfo">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
          {/* Column 1: Brand & Social */}
          <div className="space-y-10">
            <div className="flex items-center space-x-4">
              <CanaanLogo className="w-10 h-10 text-cactus" />
              <h3 className="text-3xl font-serif font-bold tracking-tight">Canaan Hotel</h3>
            </div>
            <p className="text-gray-500 leading-relaxed text-sm italic font-light max-w-xs">
              &quot;Where the basalt of the highlands meets the spirit of sanctuary. Architecture as a bridge to eternity.&quot;
            </p>
            <div className="flex space-x-5">
              {/* Social Icons Placeholder - replace with actual svgs later if needed */}
              {['facebook', 'photo_camera', 'flutter_dash', 'business_center'].map((icon, i) => (
                <button key={i} className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center hover:bg-cactus hover:text-white transition-all duration-500 group">
                  <span className="material-symbols-outlined text-gray-400 group-hover:text-white text-base">{icon}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Column 2: Exploration */}
          <div>
            <h4 className="text-[10px] uppercase tracking-widest font-bold mb-10 text-cactus">Exploration</h4>
            <ul className="space-y-5 text-[11px] tracking-[0.2em] text-gray-500 uppercase font-medium">
              <li><Link href="/rooms" className="hover:text-sandstone transition-colors flex items-center gap-3"><span className="w-1 h-1 bg-cactus rounded-full"></span> Suites & Sanctuaries</Link></li>
              <li><Link href="/dining" className="hover:text-sandstone transition-colors flex items-center gap-3"><span className="w-1 h-1 bg-cactus rounded-full"></span> Canaanite Gastronomy</Link></li>
              <li><Link href="/services" className="hover:text-sandstone transition-colors flex items-center gap-3"><span className="w-1 h-1 bg-cactus rounded-full"></span> Bespoke Experiences</Link></li>
              <li><Link href="/about" className="hover:text-sandstone transition-colors flex items-center gap-3"><span className="w-1 h-1 bg-cactus rounded-full"></span> Our Highland Heritage</Link></li>
              <li><Link href="/contact" className="hover:text-sandstone transition-colors flex items-center gap-3"><span className="w-1 h-1 bg-cactus rounded-full"></span> Stability Partnership</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="text-[10px] uppercase tracking-widest font-bold mb-10 text-cactus">Sanctuary Info</h4>
            <ul className="space-y-6 text-sm text-gray-500 font-light">
              <li className="flex items-center space-x-4"><span className="material-symbols-outlined text-cactus text-sm">call</span> <span className="hover:text-sandstone transition-colors">+251 941 12 34 56</span></li>
              <li className="flex items-center space-x-4"><span className="material-symbols-outlined text-cactus text-sm">mail</span> <span className="hover:text-sandstone transition-colors">stay@canaanhotel.com</span></li>
              <li className="flex items-start space-x-4"><span className="material-symbols-outlined text-cactus text-sm mt-1">location_on</span> <span className="leading-relaxed">Grand Mesob Tower, Highland Hub<br />Adigrat, Tigray Region, Ethiopia</span></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <NewsletterSignup />
        </div>

        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10">
            <span className="text-[9px] uppercase tracking-[0.4em] text-gray-700">© 2026 Canaan International Hotel. Stability Core.</span>
            <div className="flex space-x-10 text-[9px] uppercase tracking-[0.4em] text-gray-500">
              <Link href="/legal/privacy" className="hover:text-cactus transition-colors">Privacy Policy</Link>
              <Link href="/legal/terms" className="hover:text-cactus transition-colors">Terms of Service</Link>
              <Link href="/legal/cookies" className="hover:text-cactus transition-colors">Cookies</Link>
            </div>
          </div>
          <div className="flex items-center space-x-2 opacity-30 grayscale hover:grayscale-0 transition-all duration-700 cursor-default">
            <span className="text-[8px] uppercase font-bold tracking-widest mr-2">Certified Stability</span>
            <div className="w-6 h-6 border border-sandstone rotate-45 flex items-center justify-center text-[6px] font-bold">CT</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
