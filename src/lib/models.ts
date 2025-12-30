// Core data models for the Canaan Hotel CMS
// These interfaces support future booking, pricing, and availability features

import { PaymentStatus } from "./payments/types";
import { PaymentRecord } from "./payments/payment-types";

export interface Room {
  id: string;
  name: string;
  description: string;
  pricePerNight: number;
  maxGuests: number;
  isActive: boolean;
  createdAt: string;
}

// CRM-Grade Booking Status Lifecycle
export type BookingStatus =
  | "NEW"        // Fresh inquiry, needs review
  | "REVIEWED"   // Staff assessed, ready for response
  | "CONFIRMED"  // Guest committed, room held
  | "INVOICED"   // Payment process initiated
  | "CANCELLED"  // Booking terminated
  | "CLOSED";    // Transaction complete

export interface Booking {
  id: string;
  guestName: string;      // Standardized naming
  email: string;
  phone?: string;
  roomType: string;
  checkIn: string;        // Direct date access
  checkOut: string;
  status: BookingStatus;  // Full lifecycle support
  notes?: string;         // Admin notes
  invoiceRef?: string;    // Auto-generated on INVOICED
  paymentId?: string;     // Payment integration (V4.1)
  paymentStatus?: PaymentStatus; // Payment status tracking
  paymentRecord?: PaymentRecord; // V5.2.1 Payment link tracking
  createdAt: string;
  updatedAt: string;      // Audit trail
}

// Legacy interface - kept for backward compatibility
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