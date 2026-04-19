"use client";

export const dynamic = 'force-dynamic';

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Booking } from "@/lib/models";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { useToast } from "@/components/ui/Toast";
import Badge from "@/components/ui/Badge";
import { Mail, BedDouble, Calendar, CreditCard, Eye, Plus, CalendarCheck, RefreshCw, AlertTriangle } from "lucide-react";

const ADMIN_SECRET = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [showLocalModal, setShowLocalModal] = useState(false);
  const { showToast } = useToast();

  const [confirmConfig, setConfirmConfig] = useState<{
    isOpen: boolean;
    bookingId: string;
    action: "confirm" | "flag-conflict" | "";
    title: string;
    message: string;
    variant: "primary" | "danger" | "warning";
  }>({
    isOpen: false,
    bookingId: "",
    action: "",
    title: "",
    message: "",
    variant: "primary",
  });

  const [localForm, setLocalForm] = useState({
    guest_name: "",
    email: "",
    phone: "",
    check_in_date: "",
    check_out_date: "",
    number_of_guests: 1,
    room_type: "economy-single",
    payment_received_locally: false,
  });

  const loadBookings = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/bookings", {
        headers: { "x-admin-secret": ADMIN_SECRET },
      });
      if (!response.ok) throw new Error("Failed to load bookings");
      const data = await response.json();
      setBookings(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBookings();
    const interval = setInterval(loadBookings, 60000);
    return () => clearInterval(interval);
  }, [loadBookings]);

  const handleConfirmRequest = (bookingId: string) => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) return;

    setConfirmConfig({
      isOpen: true,
      bookingId,
      action: "confirm",
      title: "Confirm Booking",
      message: `This will confirm the booking for ${booking.guest_name} and send a confirmation email. Continue?`,
      variant: "primary",
    });
  };

  const handleFlagConflictRequest = (bookingId: string) => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) return;

    setConfirmConfig({
      isOpen: true,
      bookingId,
      action: "flag-conflict",
      title: "Flag Conflict & Refund",
      message: `This will cancel the booking, initiate a refund to ${booking.guest_name}, and send an apology email. Are you sure?`,
      variant: "danger",
    });
  };

  const executeAction = async () => {
    const { bookingId, action } = confirmConfig;
    if (!bookingId || !action) return;

    try {
      if (action === "confirm") {
        const response = await fetch("/api/admin/bookings/confirm", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "x-admin-secret": ADMIN_SECRET,
          },
          body: JSON.stringify({ bookingId, mode: "manual" }),
        });
        if (!response.ok) throw new Error("Failed to confirm booking");
        showToast("success", "Booking confirmed successfully.");
      } else if (action === "flag-conflict") {
        const response = await fetch("/api/admin/bookings/flag-conflict", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "x-admin-secret": ADMIN_SECRET,
          },
          body: JSON.stringify({ bookingId, reason: "Availability conflict" }),
        });
        if (!response.ok) throw new Error("Failed to flag conflict");
        showToast("success", "Booking flagged and refund initiated.");
      }

      loadBookings();
    } catch (err) {
      showToast("error", "Action failed. Please try again.");
    } finally {
      setConfirmConfig((prev) => ({ ...prev, isOpen: false }));
    }
  };

  const handleCreateLocalBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/admin/bookings/local", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "x-admin-secret": ADMIN_SECRET,
        },
        body: JSON.stringify(localForm),
      });
      if (!response.ok) throw new Error("Failed to create booking");
      showToast("success", "Local booking created successfully.");
      setShowLocalModal(false);
      setLocalForm({
        guest_name: "",
        email: "",
        phone: "",
        check_in_date: "",
        check_out_date: "",
        number_of_guests: 1,
        room_type: "economy-single",
        payment_received_locally: false,
      });
      loadBookings();
    } catch (err) {
      showToast("error", "Failed to create booking.");
    }
  };

  const filteredBookings = bookings.filter((b) => {
    const status = b.status as string;
    if (filter === "all") return true;
    if (filter === "pending") return status === "held" || status === "hold_pending_confirmation" || status === "booking_created";
    if (filter === "confirmed") return status === "confirmed";
    if (filter === "today") {
      const today = new Date().toISOString().split("T")[0];
      return b.check_in_date === today;
    }
    return true;
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cactus mx-auto"></div>
        <p className="mt-4 text-sm font-medium text-slate-400 uppercase tracking-wider">Loading Bookings...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-forest tracking-tight">Bookings</h1>
          <p className="text-sm text-slate-500 mt-1">Manage guest inquiries and reservations.</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mt-1">Total Requests</p>
          <p className="text-2xl font-bold text-forest">{bookings.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mt-1">Confirmed</p>
          <p className="text-2xl font-bold text-emerald-600">
            {bookings.filter((b) => b.status === "confirmed").length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mt-1">Awaiting Action</p>
          <p className="text-2xl font-bold text-amber-600">
            {bookings.filter((b) => b.status === "pending").length}
          </p>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mt-4">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-3 text-left">Guest</th>
                <th className="text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-3 text-left">Room</th>
                <th className="text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-3 text-left">Dates</th>
                <th className="text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-3 text-left">Price</th>
                <th className="text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-3 text-left">Status</th>
                <th className="text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-cactus/10 rounded-xl flex items-center justify-center">
                        <span className="text-xs font-bold text-cactus">
                          {booking.guest_name.substring(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-forest">{booking.guest_name}</p>
                        <p className="text-xs text-slate-400 flex items-center gap-1">
                          <Mail className="w-3 h-3" /> {booking.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <BedDouble className="w-4 h-4 text-slate-400" />
                      {booking.room_type}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      {new Date(booking.check_in_date).toLocaleDateString()} - {new Date(booking.check_out_date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-forest">
                    ${booking.total_price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      booking.status === 'confirmed' ? 'bg-emerald-50 text-emerald-700' :
                      booking.status === 'pending' ? 'bg-amber-50 text-amber-700' :
                      'bg-red-50 text-red-600'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {((booking.status as string) === "hold_pending_confirmation" || (booking.status as string) === "held") && (
                        <>
                          <button
                            onClick={() => handleConfirmRequest(booking.id)}
                            className="text-xs font-medium px-2 py-1 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => handleFlagConflictRequest(booking.id)}
                            className="text-xs font-medium px-2 py-1 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
                          >
                            Conflict
                          </button>
                        </>
                      )}
                      <Link
                        href={`/admin/bookings/${booking.id}`}
                        className="p-1.5 bg-slate-100 text-slate-500 rounded-lg hover:text-cactus transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {bookings.length === 0 && (
          <div className="p-20 text-center">
            <CalendarCheck className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">No bookings found</p>
            <p className="text-xs text-slate-400 mt-2">Bookings submitted through the website will appear here.</p>
            <Link href="/admin/bookings/new">
              <button className="mt-6 px-6 py-2 bg-cactus text-white text-sm font-medium rounded-lg hover:bg-forest transition-colors">
                Add First Booking
              </button>
            </Link>
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={confirmConfig.isOpen}
        title={confirmConfig.title}
        message={confirmConfig.message}
        variant={confirmConfig.variant}
        confirmLabel="Continue"
        onConfirm={executeAction}
        onCancel={() => setConfirmConfig((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
