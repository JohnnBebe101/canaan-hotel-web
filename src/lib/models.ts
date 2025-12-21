// Core data models for the Canaan Hotel CMS
// These interfaces support future booking, pricing, and availability features

export interface Room {
  id: string;
  name: string;
  description: string;
  pricePerNight: number;
  maxGuests: number;
  isActive: boolean;
  createdAt: string;
}

export interface BookingInquiry {
  id: string;
  guest_name: string;
  email: string;
  phone: string;
  room_type: string;
  dates: {
    check_in: string;
    check_out: string;
  };
  message?: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
}

export interface Attraction {
  id: string;
  name: string;
  description: string;
  category: string;
  distance: string;
  image?: string;
  active: boolean;
}