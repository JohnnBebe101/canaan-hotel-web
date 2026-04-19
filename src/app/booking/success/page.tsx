"use client";

import { Suspense, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type BookingStatus = "inquiry" | "booking_created" | "held" | "hold_pending_confirmation" | "confirmed" | "cancelled";
type PaymentStatus = "unpaid" | "pending" | "paid" | "failed" | "refunded";

interface StatusResponse {
  status: string;
  payment_status: string;
  booking_reference: string;
  guest_name: string;
}

function BookingSuccessContent() {
  const searchParams = useSearchParams();
  const bookingRef = searchParams.get("ref");
  const bookingId = searchParams.get("bookingId");
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");

  const [status, setStatus] = useState<string>("loading");
  const [paymentStatus, setPaymentStatus] = useState<string>("loading");
  const [guestName, setGuestName] = useState<string>("");
  const [polling, setPolling] = useState(true);
  const [pollingCount, setPollingCount] = useState(0);

  const checkStatus = useCallback(async () => {
    if (!bookingRef && !bookingId) return;

    try {
      const params = new URLSearchParams();
      if (bookingRef) params.set("ref", bookingRef);
      if (bookingId) params.set("bookingId", bookingId);

      const response = await fetch(`/api/bookings/status?${params.toString()}`);
      
      if (response.ok) {
        const data: StatusResponse = await response.json();
        setStatus(data.status);
        setPaymentStatus(data.payment_status);
        setGuestName(data.guest_name);

        if (data.status === "confirmed" || data.status === "cancelled" || pollingCount >= 10) {
          setPolling(false);
        }
      }
    } catch (error) {
      console.error("Status check error:", error);
    }

    setPollingCount((prev) => prev + 1);
  }, [bookingRef, bookingId, pollingCount]);

  useEffect(() => {
    if (!bookingRef && !bookingId) return;

    checkStatus();

    const interval = setInterval(() => {
      if (polling && pollingCount < 10) {
        checkStatus();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [bookingRef, bookingId, checkStatus, polling, pollingCount]);

  const getStatusMessage = () => {
    if (status === "loading") {
      return "Confirming your booking...";
    }
    if (status === "confirmed") {
      return "Your booking is confirmed!";
    }
    if (status === "hold_pending_confirmation") {
      return "Payment confirmed — we're verifying availability and will email your confirmation within 2 hours.";
    }
    if (status === "cancelled") {
      return "Your booking was cancelled.";
    }
    return "Check your email for confirmation details.";
  };

  const getStatusVariant = () => {
    if (status === "confirmed") return "success";
    if (status === "hold_pending_confirmation" || status === "held" || status === "loading") return "pending";
    if (status === "cancelled") return "error";
    return "neutral";
  };

  if (!bookingRef && !bookingId) {
    return (
      <main className="min-h-screen bg-sandstone flex items-center justify-center">
        <div className="max-w-md w-full mx-4 text-center">
          <div className="bg-white rounded-2xl shadow-lg border border-cactus/10 p-8">
            <h1 className="font-serif text-2xl font-bold text-forest mb-4">
              Booking Reference Missing
            </h1>
            <p className="text-stone-600 mb-8">
              No booking reference found. Please check your email for confirmation details.
            </p>
            <Link href="/" className="btn-primary">
              Return to Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-sandstone flex items-center justify-center">
      <div className="max-w-md w-full mx-4 text-center">
        <div className="bg-white rounded-2xl shadow-lg border border-cactus/10 p-8">
          <div className="w-16 h-16 bg-cactus/10 rounded-full flex items-center justify-center mx-auto mb-6">
            {status === "confirmed" || status === "hold_pending_confirmation" ? (
              <svg className="w-8 h-8 text-cactus" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-8 h-8 text-cactus animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </div>

          <h1 className="font-serif text-2xl font-bold text-forest mb-4">
            {status === "confirmed" ? "Booking Confirmed!" : "Processing Your Booking"}
          </h1>

          {bookingRef && (
            <div className="bg-slate-50 rounded-lg p-3 mb-4">
              <p className="text-xs text-slate-500 uppercase tracking-wider">Reference</p>
              <p className="text-lg font-mono font-bold text-forest">{bookingRef}</p>
            </div>
          )}

          <p className="text-stone-600 mb-4">
            {getStatusMessage()}
          </p>

          {(checkIn || checkOut) && (
            <div className="text-sm text-stone-500 mb-6">
              {checkIn && <p>Check-in: {new Date(checkIn).toLocaleDateString()}</p>}
              {checkOut && <p>Check-out: {new Date(checkOut).toLocaleDateString()}</p>}
            </div>
          )}

          <div className="space-y-3">
            <Link
              href="/"
              className="block w-full bg-forest text-sandstone font-semibold py-3 px-6 rounded-xl hover:bg-cactus transition-colors"
            >
              Return to Home
            </Link>

            <Link
              href="/contact"
              className="block w-full border border-forest/20 text-forest font-medium py-3 px-6 rounded-xl hover:bg-forest/5 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>

        <p className="text-xs text-stone-400 mt-6">
          Payment processed securely via Stripe
        </p>
      </div>
    </main>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-sandstone flex items-center justify-center">
        <div className="max-w-md w-full mx-4 text-center">
          <div className="bg-white rounded-2xl shadow-lg border border-cactus/10 p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cactus mx-auto"></div>
            <p className="mt-4 text-stone-600">Loading...</p>
          </div>
        </div>
      </main>
    }>
      <BookingSuccessContent />
    </Suspense>
  );
}