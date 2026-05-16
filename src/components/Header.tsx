"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icons";
import { Home, BedDouble, BookOpen, FileText, Mail, X } from "lucide-react";

import CanaanLogo from "@/components/ui/CanaanLogo";

const navItems = [
  { label: "Home", href: "/", Icon: Home },
  { label: "Rooms", href: "/rooms", Icon: BedDouble },
  { label: "Our Story", href: "/about", Icon: BookOpen },
  { label: "Journal", href: "/blog", Icon: FileText },
  { label: "Contact", href: "/contact", Icon: Mail },
];

interface HeaderProps {
  variant?: 'public' | 'admin';
}

/**
 * Header Component with Two Visual States:
 * 
 * At top of page (hero visible, !scrolled):
 * - Background: transparent
 * - Nav links: white/90 with drop-shadow
 * - Logo: white with drop-shadow
 * - Book Now button: bronze with hover
 * 
 * After scrolling 80px (scrolled):
 * - Background: forest/97 with backdrop-blur
 * - Nav links: white/80 without drop-shadow
 * - Logo: white
 * - Book Now button: bronze with subtle hover
 * 
 * Mobile Drawer:
 * - Slides in from right with backdrop blur
 * - Proper accessibility (role="dialog", aria-modal, Escape key)
 * - Touch-friendly 48px minimum targets
 */
function Header({ variant = 'public' }: HeaderProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Escape key closes menu
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  // Focus trap: move focus to close button when drawer opens
  useEffect(() => {
    if (menuOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [menuOpen]);

  return (
    <header className="relative z-50">
      <nav
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          scrolled
            ? "bg-forest/80 backdrop-blur-md border-b border-white/20 shadow-[0_4px_16px_rgba(0,0,0,0.15)] py-3"
            : "bg-white/[0.10] backdrop-blur-md border-b border-white/40 shadow-[0_4px_16px_rgba(0,0,0,0.08)] py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center h-20">
          <Link
            href="/"
            className="flex items-center cursor-pointer group focus:outline-none"
            aria-label="Canaan International Hotel Home"
          >
            <div className="flex flex-col items-start">
              <CanaanLogo
                size={scrolled ? "w-14 h-14" : "w-20 h-20"}
                className={`transition-all duration-300 ${scrolled ? "text-cactus" : "text-white"}`}
              />
              <span className={`text-xs mt-1 transition-all duration-300 ${scrolled ? "text-forest/60" : "text-white/80"}`}>Canaan</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 lg:gap-8 xl:gap-10" role="menubar">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  role="menuitem"
                  className={`text-[15px] uppercase tracking-wide font-medium transition-all duration-300 relative group ${
                    scrolled
                      ? "text-white/80 hover:text-white"
                      : "text-white/90 hover:text-white"
                  } ${isActive ? "text-bronze font-medium" : ""}`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-[2px] bg-bronze transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    aria-hidden="true"
                  ></span>
                </Link>
              );
            })}

            <Button 
                variant="primary" 
                size="md" 
                onClick={() => window.dispatchEvent(new CustomEvent('open-booking'))}
                className={`px-5 py-2.5 text-[10px] uppercase tracking-normal transition-all duration-200 ${
                  scrolled
                    ? "bg-bronze text-white border-2 border-bronze hover:bg-bronze/90"
                    : "bg-bronze text-white border-2 border-bronze hover:bg-white hover:text-forest hover:border-white shadow-[0_2px_12px_rgba(181,129,58,0.5)]"
                }`}
              >
                Book Now
              </Button>
          </div>

          {/* Hamburger Button (Mobile) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="lg:hidden flex flex-col gap-1.5 p-2 group"
          >
            <span className={`block w-6 h-0.5 transition-all duration-300 bg-white ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 transition-all duration-300 bg-white ${
              menuOpen ? 'opacity-0' : ''
            }`} />
            <span className={`block w-6 h-0.5 transition-all duration-300 bg-white ${
              menuOpen ? '-rotate-45 -translate-y-2' : ''
            }`} />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <div 
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />
        
        {/* Drawer Panel - slides from right */}
        <div 
          className={`absolute top-0 right-0 h-full w-[280px] bg-forest flex flex-col transition-transform duration-300 ease-in-out shadow-2xl ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Top section - wordmark + close button */}
          <div className="h-16 px-6 flex items-center justify-between border-b border-white/10">
            <span className="text-white font-bold tracking-wide text-lg">Canaan</span>
            <button
              ref={closeButtonRef}
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <X className="w-5 h-5 text-white/70 hover:text-white" />
            </button>
          </div>

          {/* Nav links section */}
          <nav className="flex flex-col px-4 py-6 gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl min-h-[48px] transition-all duration-150 ${
                    isActive 
                      ? "text-bronze bg-white/5 font-semibold" 
                      : "text-white/80 hover:text-white hover:bg-white/8 active:bg-white/12"
                  }`}
                >
                  <item.Icon className="w-5 h-5" />
                  <span className="text-base font-medium tracking-wide">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Bottom section - CTA */}
          <div className="mt-auto px-6 pb-8 border-t border-white/10 pt-6">
            <Link 
              href="/rooms" 
              onClick={() => setMenuOpen(false)}
              className="block w-full bg-bronze text-white font-semibold py-3.5 rounded-xl text-center tracking-normal hover:bg-bronze/90 transition-colors"
            >
              Book Now
            </Link>
            
            {/* Footer note */}
            <p className="text-white/30 text-xs text-center mt-4">
              Canaan International Hotel · Adigrat, Tigray
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default React.memo(Header);
