"use client";

import Button from "@/components/ui/Button";

export default function BookingCTA({ className = "" }: { className?: string }) {
  return (
    <Button
      onClick={() => window.dispatchEvent(new CustomEvent("open-booking"))}
      className={`bg-bronze border-2 border-bronze text-white hover:bg-forest hover:border-forest shadow-[0_4px_15px_rgba(181,129,58,0.4)] mx-auto px-16 py-6 text-xs ${className}`}
    >
      Book Your Stay
    </Button>
  );
}