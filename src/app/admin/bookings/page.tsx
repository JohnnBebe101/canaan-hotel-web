"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Booking } from "@/lib/models";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { useToast } from "@/components/ui/Toast";
import Badge from "@/components/ui/Badge";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();

  // State for ConfirmModal
  const [confirmConfig, setConfirmConfig] = useState<{
    isOpen: boolean;
    bookingId: string;
    newStatus: Booking["status"] | "";
    title: string;
    message: string;
    variant: "primary" | "danger" | "warning";
  }>({
    isOpen: false,
    bookingId: "",
    newStatus: "",
    title: "",
    message: "",
    variant: "primary",
  });

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/bookings");
      if (!response.ok) throw new Error("Failed to load bookings");
      const data = await response.json();
      setBookings(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChangeRequest = (bookingId: string, newStatus: Booking["status"]) => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) return;

    let config: typeof confirmConfig = {
      isOpen: true,
      bookingId,
      newStatus,
      title: "Update Booking Status",
      message: `Change status for ${booking.guest_name} to ${newStatus}?`,
      variant: "primary",
    };

    if (newStatus === "confirmed") {
      config.title = "Confirm Booking";
      config.message = `Confirming will notify ${booking.guest_name} and lock the room. Proceed?`;
      config.variant = "primary";
    } else if (newStatus === "cancelled") {
      config.title = "Cancel Booking";
      config.message = `Are you sure you want to cancel the booking for ${booking.guest_name}? This action cannot be undone.`;
      config.variant = "danger";
    }

    setConfirmConfig(config);
  };

  const executeStatusUpdate = async () => {
    const { bookingId, newStatus } = confirmConfig;
    if (!bookingId || !newStatus) return;

    try {
      const response = await fetch("/api/admin/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: bookingId, status: newStatus }),
      });

      if (!response.ok) throw new Error("Failed to update status");

      const updated = await response.json();
      setBookings(bookings.map((b) => (b.id === bookingId ? updated : b)));
      showToast("success", `Booking ${newStatus} successfully.`);
    } catch (err) {
      showToast("error", "Failed to update booking status.");
    } finally {
      setConfirmConfig((prev) => ({ ...prev, isOpen: false }));
    }
  };

  const getStatusVariant = (status: string): any => {
    switch (status) {
      case "confirmed":
        return "success";
      case "pending":
        return "warning";
      case "cancelled":
        return "danger";
      default:
        return "neutral";
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-text-secondary font-bold uppercase tracking-widest text-xs">Loading Bookings...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-text-primary dark:text-white tracking-tight">Bookings</h1>
          <p className="text-text-secondary dark:text-gray-400 mt-1">Manage guest inquiries and reservations.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <p className="text-xs font-black uppercase tracking-widest text-text-secondary mb-1">Total Requests</p>
          <p className="text-3xl font-black text-text-primary dark:text-white">{bookings.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <p className="text-xs font-black uppercase tracking-widest text-green-600 mb-1">Confirmed</p>
          <p className="text-3xl font-black text-green-600">
            {bookings.filter((b) => b.status === "confirmed").length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <p className="text-xs font-black uppercase tracking-widest text-amber-600 mb-1">Awaiting Action</p>
          <p className="text-3xl font-black text-amber-600">
            {bookings.filter((b) => b.status === "pending").length}
          </p>
        </div>
      </div>

      {/* Bookings List */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-xl overflow-hidden">
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {bookings.map((booking) => (
            <div key={booking.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-black text-text-primary dark:text-white">{booking.guest_name}</h3>
                    <Badge variant={getStatusVariant(booking.status)} size="sm" className="uppercase tracking-widest">
                      {booking.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm text-text-secondary dark:text-gray-400 font-medium">
                    <p className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-base">mail</span>
                      {booking.email}
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-base">hotel</span>
                      {booking.room_type}
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-base">calendar_today</span>
                      {new Date(booking.check_in_date).toLocaleDateString()} - {new Date(booking.check_out_date).toLocaleDateString()}
                    </p>
                    <p className="flex items-center gap-2 text-text-primary dark:text-white font-bold">
                      <span className="material-symbols-outlined text-base">payments</span>
                      ${booking.total_price}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <select
                    value={booking.status}
                    onChange={(e) => handleStatusChangeRequest(booking.id, e.target.value as Booking["status"])}
                    className="text-sm font-bold border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary outline-none"
                  >
                    <option value="pending">Mark Pending</option>
                    <option value="confirmed">Confirm Stay</option>
                    <option value="cancelled">Cancel Stay</option>
                  </select>
                  <Link
                    href={`/admin/bookings/${booking.id}`}
                    className="p-2.5 bg-gray-100 dark:bg-gray-700 text-text-primary dark:text-white rounded-xl hover:bg-primary hover:text-white transition-all group"
                  >
                    <span className="material-symbols-outlined">visibility</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {bookings.length === 0 && (
            <div className="p-20 text-center">
              <span className="material-symbols-outlined text-6xl text-gray-200 dark:text-gray-700 mb-4">
                inbox_customize
              </span>
              <p className="text-text-secondary dark:text-gray-400 font-bold uppercase tracking-widest">
                No bookings found
              </p>
            </div>
          )}
        </div>
      </div>

      <ConfirmModal
        isOpen={confirmConfig.isOpen}
        title={confirmConfig.title}
        message={confirmConfig.message}
        variant={confirmConfig.variant}
        confirmLabel="Continue"
        onConfirm={executeStatusUpdate}
        onCancel={() => setConfirmConfig((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
