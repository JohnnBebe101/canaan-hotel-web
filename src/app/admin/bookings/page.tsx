"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Booking } from "@/lib/models";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { useToast } from "@/components/ui/Toast";
import Badge from "@/components/ui/Badge";
import { Mail, BedDouble, Calendar, CreditCard, Eye, Plus, CalendarCheck } from "lucide-react";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();

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
                      <select
                        value={booking.status}
                        onChange={(e) => handleStatusChangeRequest(booking.id, e.target.value as Booking["status"])}
                        className="text-xs font-medium border border-slate-200 rounded-lg px-2 py-1 bg-white focus:ring-2 focus:ring-cactus outline-none"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirm</option>
                        <option value="cancelled">Cancel</option>
                      </select>
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
        onConfirm={executeStatusUpdate}
        onCancel={() => setConfirmConfig((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
