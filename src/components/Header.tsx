
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icons";

import CanaanLogo from "@/components/ui/CanaanLogo";

const navItems = [
  { label: "Sanctuary", href: "/" },
  { label: "Chambers", href: "/rooms" },
  { label: "Heritage", href: "/about" },
  { label: "Journals", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

interface HeaderProps {
  variant?: 'public' | 'admin';
}

function Header({ variant = 'public' }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // If admin, maybe render differently or just same for now to fix build
  // For now, we return the same header but the prop is accepted.
  // We could hide it for admin if needed, but existing code used it.


  // Close menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="relative z-50">
      <nav
        aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-2xl py-4"
          : "bg-white/90/90 backdrop-blur-md py-6"
          }`}
      >
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
          <Link
            href="/"
            className="flex items-center space-x-4 cursor-pointer group focus:outline-none"
            aria-label="Canaan International Hotel Home"
          >
            <CanaanLogo
              className={`w-8 h-8 transition-all duration-500 ${isScrolled ? "text-cactus" : "text-sandstone scale-110"
                }`}
            />
            <div
              className={`text-xl font-serif font-bold tracking-tight transition-colors duration-500 text-sandstone`}
            >
              Canaan Hotel
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-10" role="menubar">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  role="menuitem"
                  className={`text-[9px] uppercase tracking-[0.4em] font-bold transition-all duration-500 relative group ${isScrolled
                    ? "text-sandstone/70 hover:text-sandstone"
                    : "text-sandstone/70 hover:text-sandstone"
                    } ${isActive ? "opacity-100 text-cactus" : "opacity-60"}`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-cactus transition-all duration-500 ${isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    aria-hidden="true"
                  ></span>
                </Link>
              );
            })}

            <Link href="/rooms">
              <Button variant="primary" size="md" className="px-6 py-3 text-[9px] uppercase tracking-[0.4em]">Reserve</Button>
            </Link>
          </div>

          <button
            className="lg:hidden p-2 focus:outline-none transition-transform active:scale-90"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <Icon name="close" className="text-sandstone text-4xl" />
            ) : (
              <Icon name="menu" className="text-sandstone text-4xl" />
            )}
          </button>
        </div>

          {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 bg-forest z-50 p-12 flex flex-col justify-center items-center space-y-10 animate-in slide-in-from-top duration-700">
            <button
              className="absolute top-10 right-10 p-2"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <Icon name="close" className="text-sandstone text-5xl" />
            </button>
            <CanaanLogo className="w-16 h-16 text-cactus mb-8" />
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-4xl font-serif text-sandstone hover:text-cactus transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/rooms" onClick={() => setIsMobileMenuOpen(false)}>
              <button className="px-16 py-6 bg-cactus text-sandstone font-serif text-2xl shadow-2xl mt-8">
                Experience Sanctuary
              </button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

export default React.memo(Header);
