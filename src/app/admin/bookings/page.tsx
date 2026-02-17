"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import { Booking } from "@/lib/models";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const updateStatus = async (bookingId: string, newStatus: Booking['status']) => {
    try {
      const response = await fetch("/api/admin/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: bookingId, status: newStatus }),
      });
      if (!response.ok) throw new Error("Failed to update status");
      const updated = await response.json();
      setBookings(bookings.map(b => b.id === bookingId ? updated : b));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update status");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading bookings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-red-900 font-medium">Error loading bookings</h3>
          <p className="text-red-700 text-sm mt-1">{error}</p>
          <button onClick={loadBookings} className="mt-3 px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Bookings</h1>
          <p className="text-gray-600">Manage guest booking inquiries</p>
        </div>
        <Link href="/rooms" className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90">
          View Website
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg border p-4">
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-2xl font-bold">{bookings.length}</p>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <p className="text-sm text-gray-500">Confirmed</p>
          <p className="text-2xl font-bold text-green-600">
            {bookings.filter(b => b.status === 'confirmed').length}
          </p>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <p className="text-sm text-gray-500">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">
            {bookings.filter(b => b.status === 'pending').length}
          </p>
        </div>
      </div>

      {/* Bookings List */}
      <div className="bg-white rounded-lg border">
        <div className="p-4 border-b bg-gray-50">
          <h2 className="font-semibold">Guest Bookings ({bookings.length})</h2>
        </div>
        <div className="divide-y">
          {bookings.map((booking) => (
            <div key={booking.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold">{booking.guest_name}</h3>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{booking.email}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {booking.room_type} • {new Date(booking.check_in_date).toLocaleDateString()} - {new Date(booking.check_out_date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <select
                    value={booking.status}
                    onChange={(e) => updateStatus(booking.id, e.target.value as Booking['status'])}
                    className="text-sm border rounded-lg px-3 py-2"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <Link
                    href={`/admin/bookings/${booking.id}`}
                    className="px-3 py-2 text-sm bg-primary text-white rounded-lg hover:opacity-90"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
          {bookings.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No bookings yet. When guests submit inquiries, they will appear here.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
