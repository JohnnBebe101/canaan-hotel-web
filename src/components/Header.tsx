"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

interface HeaderProps {
  variant?: "public" | "admin";
  currentPage?: string;
}

export default function Header({ variant = "public", currentPage }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = variant === "public" 
    ? [
        { name: "Home", href: "/", current: currentPage === "home" },
        { name: "Rooms", href: "/rooms", current: currentPage === "rooms" },
        { 
          name: "Services", 
          href: "/services", 
          current: currentPage === "services",
          dropdown: [
            { name: "All Services", href: "/services" },
            { name: "Dining", href: "/services/dining" },
            { name: "Spa & Wellness", href: "/services/spa" },
            { name: "Transportation", href: "/services/transportation" }
          ]
        },
        { name: "About Us", href: "/about", current: currentPage === "about" },
        { name: "Contact", href: "/contact", current: currentPage === "contact" },
      ]
    : [
        { name: "Dashboard", href: "/admin/dashboard", current: currentPage === "dashboard" },
        { name: "Rooms", href: "/admin/rooms", current: currentPage === "rooms" },
        { name: "Bookings", href: "/admin/bookings", current: currentPage === "bookings" },
        { name: "Attractions", href: "/admin/attractions", current: currentPage === "attractions" },
      ];

  return (
    <header className="sticky top-0 z-50 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-sm border-b border-border-color dark:border-text-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <Link href={variant === "public" ? "/" : "/admin/dashboard"} className="flex items-center gap-3">
              <div className="h-10 w-auto">
                <Image
                  src="/images/logo 2.svg"
                  alt="Canaan International Hotel Logo"
                  width={40}
                  height={40}
                  className="h-10 w-auto object-contain"
                  priority
                />
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-base font-bold text-text-primary dark:text-background-light">
                  {variant === "public" ? "Canaan International Hotel" : "Admin Panel"}
                </span>
                {variant === "public" && (
                  <span className="text-xs text-text-secondary/80 flex items-center gap-1">
                    <span className="material-symbols-outlined text-green-600 text-xs">verified</span>
                    Best Price Guarantee
                  </span>
                )}
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navItems.map((item) => (
                item.dropdown ? (
                  <div key={item.name} className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        item.current
                          ? "bg-primary text-white"
                          : "text-text-primary dark:text-background-light hover:text-primary dark:hover:text-primary hover:bg-background-light/50"
                      }`}
                      aria-expanded={isDropdownOpen}
                      aria-haspopup="true"
                    >
                      {item.name}
                      <span className={`material-symbols-outlined text-sm ml-1 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}>
                        expand_more
                      </span>
                    </button>
                    
                    {isDropdownOpen && (
                      <div className="absolute top-full left-0 mt-2 w-48 bg-background-light dark:bg-background-dark border border-border-color dark:border-text-secondary/20 rounded-lg shadow-lg py-2 z-50">
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className="block px-4 py-2 text-sm text-text-primary dark:text-background-light hover:bg-background-light/50 dark:hover:bg-text-secondary/10 transition-colors"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      item.current
                        ? "bg-primary text-white"
                        : "text-text-primary dark:text-background-light hover:text-primary dark:hover:text-primary hover:bg-background-light/50"
                    }`}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </div>
          </nav>

          {/* Right side controls */}
          <div className="flex items-center gap-2">
            {variant === "public" && (
              <Link
                href="/rooms"
                className="hidden md:flex h-10 min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary px-4 text-sm font-bold text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label="Book a room now"
              >
                <span className="truncate">Book Now</span>
              </Link>
            )}
            
            {/* Demo Controls - Desktop */}
            <div className="hidden md:flex items-center gap-1">
              <span className="text-xs text-text-secondary dark:text-text-secondary/90 mr-1">Demo:</span>
              <button 
                type="button" 
                className="flex h-8 w-8 cursor-pointer items-center justify-center overflow-hidden rounded bg-background-light text-text-primary ring-1 ring-inset ring-border-color hover:bg-border-color dark:bg-background-dark dark:text-background-light dark:ring-text-secondary dark:hover:bg-text-secondary/20"
                aria-label="Demo: Admin Dashboard" 
                title="Demo: Admin Dashboard"
                data-demo="true"
              >
                <span className="material-symbols-outlined text-sm" aria-hidden="true">admin_panel_settings</span>
              </button>
              <button 
                type="button" 
                className="flex h-8 w-8 cursor-pointer items-center justify-center overflow-hidden rounded bg-background-light text-text-primary ring-1 ring-inset ring-border-color hover:bg-border-color dark:bg-background-dark dark:text-background-light dark:ring-text-secondary dark:hover:bg-text-secondary/20"
                aria-label="Demo: CRM System" 
                title="Demo: CRM System"
                data-demo="true"
              >
                <span className="material-symbols-outlined text-sm" aria-hidden="true">people</span>
              </button>
            </div>
            
            {/* Status Badges */}
            <div className="hidden md:flex items-center gap-2 ml-2">
              <span className="inline-block px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium" data-demo="true">Live</span>
              <span className="inline-block px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium" data-demo="true">Tier-3</span>
            </div>
            
            {/* Language Selector */}
            <button 
              type="button" 
              className="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-background-light text-text-primary ring-1 ring-inset ring-border-color hover:bg-border-color dark:bg-background-dark dark:text-background-light dark:ring-text-secondary dark:hover:bg-text-secondary/20"
              aria-label="Change language" 
              data-demo="true"
            >
              <span className="material-symbols-outlined text-xl" aria-hidden="true">language</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {variant === "public" && (
              <Link
                href="/rooms"
                className="px-3 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:opacity-90 transition-opacity"
              >
                Book
              </Link>
            )}
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-text-primary dark:text-background-light hover:text-primary dark:hover:text-primary hover:bg-background-light/50 focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle navigation"
            >
              <span className="sr-only">Open main menu</span>
              <span className={`material-symbols-outlined text-xl transition-transform duration-200 ${isMenuOpen ? 'rotate-90' : ''}`}>
                {isMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        id="mobile-menu"
        className={`md:hidden bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-t border-border-color dark:border-text-secondary/20 overflow-hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-4 space-y-2">
          {navItems.map((item) => (
            item.dropdown ? (
              <div key={item.name} className="space-y-1">
                <div className={`px-3 py-2 rounded-md text-base font-medium ${
                  item.current ? "bg-primary text-white" : "text-text-primary dark:text-background-light"
                }`}>
                  {item.name}
                </div>
                <div className="ml-4 space-y-1">
                  {item.dropdown.map((dropdownItem) => (
                    <Link
                      key={dropdownItem.name}
                      href={dropdownItem.href}
                      className="block px-3 py-2 rounded-md text-sm text-text-secondary dark:text-text-secondary/90 hover:text-primary dark:hover:text-primary hover:bg-background-light/50 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {dropdownItem.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  item.current
                    ? "bg-primary text-white"
                    : "text-text-primary dark:text-background-light hover:text-primary dark:hover:text-primary hover:bg-background-light/50"
                }`}
                aria-current={item.current ? "page" : undefined}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            )
          ))}
        </div>
      </div>
    </header>
  );
}