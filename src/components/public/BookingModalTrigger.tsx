"use client";

import { useState, useEffect } from "react";
import BookingWidget from "@/components/booking/BookingWidget";

export default function BookingModalTrigger() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-booking', handleOpen);
    return () => window.removeEventListener('open-booking', handleOpen);
  }, []);

  return <BookingWidget isOpen={isOpen} onClose={() => setIsOpen(false)} />;
}