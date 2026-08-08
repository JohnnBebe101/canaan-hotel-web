"use client";

import Link from "next/link";

export default function BookingCTA({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/booking"
      className={`bg-bronze border-2 border-bronze text-white hover:bg-forest hover:border-forest shadow-[0_4px_15px_rgba(181,129,58,0.4)] mx-auto px-16 py-6 text-xs rounded-lg text-center ${className}`}
    >
      Book Your Stay
    </Link>
  );
}