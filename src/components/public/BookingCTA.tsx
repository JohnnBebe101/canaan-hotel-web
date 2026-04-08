"use client";

import Button from "@/components/ui/Button";

export default function BookingCTA() {
  return (
    <Button 
      onClick={() => window.dispatchEvent(new CustomEvent('open-booking'))} 
      className="mx-auto mt-10 px-20 py-6 text-xs"
    >
      Book Your Stay
    </Button>
  );
}