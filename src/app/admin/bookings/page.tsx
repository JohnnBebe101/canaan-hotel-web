"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Booking, BookingStatus } from "@/lib/models";

/**
 * Admin Bookings - CRM Inbox
 * Route: /admin/bookings
 *
 * Operational booking management with full CRM workflow
 */

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  // Load CRM bookings
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

  const updateBookingStatus = async (bookingId: string, newStatus: BookingStatus) => {
    try {
      const response = await fetch("/api/admin/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: bookingId, status: newStatus })
      });

      if (!response.ok) throw new Error("Failed to update status");

      const updatedBooking = await response.json();

      // Update local state
      setBookings(bookings.map(b =>
        b.id === bookingId ? updatedBooking : b
      ));

      // Update selected booking if it's the one being modified
      if (selectedBooking?.id === bookingId) {
        setSelectedBooking(updatedBooking);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update status");
    }
  };

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case "NEW":
        return "bg-blue-100 text-blue-800";
      case "REVIEWED":
        return "bg-yellow-100 text-yellow-800";
      case "CONFIRMED":
        return "bg-green-100 text-green-800";
      case "INVOICED":
        return "bg-purple-100 text-purple-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      case "CLOSED":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusDescription = (status: BookingStatus) => {
    switch (status) {
      case "NEW": return "Fresh inquiry needs review";
      case "REVIEWED": return "Assessed, ready for response";
      case "CONFIRMED": return "Guest committed, room held";
      case "INVOICED": return "Payment process initiated";
      case "CANCELLED": return "Booking terminated";
      case "CLOSED": return "Transaction complete";
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading CRM bookings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-red-900 font-medium">CRM System Error</h3>
          <p className="text-red-700 text-sm mt-1">{error}</p>
          <button
            onClick={loadBookings}
            className="mt-3 px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700"
          >
            Retry Loading
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">CRM Inbox</h1>
        <p className="text-gray-600">Manage guest booking requests and operational workflow</p>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {(["NEW", "REVIEWED", "CONFIRMED", "INVOICED", "CANCELLED", "CLOSED"] as BookingStatus[]).map((status) => {
          const count = bookings.filter(b => b.status === status).length;
          return (
            <div key={status} className="bg-white p-4 rounded-lg border">
              <div className="text-2xl font-bold text-gray-900">{count}</div>
              <div className="text-sm text-gray-600">{status}</div>
            </div>
          );
        })}
      </div>

      {/* Bookings List */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">All Bookings ({bookings.length})</h2>
            <div className="text-sm text-gray-500">
              Click any booking for details and workflow actions
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="p-6 hover:bg-gray-50 cursor-pointer"
              onClick={() => setSelectedBooking(booking)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-medium text-gray-900">{booking.guestName}</h3>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                    {booking.invoiceRef && (
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                        {booking.invoiceRef}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{booking.email} • {booking.phone || 'No phone'}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {booking.roomType} • {booking.checkIn} to {booking.checkOut}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Status: {getStatusDescription(booking.status)}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <select
                    value={booking.status}
                    onChange={(e) => updateBookingStatus(booking.id, e.target.value as BookingStatus)}
                    onClick={(e) => e.stopPropagation()}
                    className="text-sm border border-gray-300 rounded px-3 py-1 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    <option value="NEW">NEW</option>
                    <option value="REVIEWED">REVIEWED</option>
                    <option value="CONFIRMED">CONFIRMED</option>
                    <option value="INVOICED">INVOICED</option>
                    <option value="CANCELLED">CANCELLED</option>
                    <option value="CLOSED">CLOSED</option>
                  </select>
                  <Link
                    href={`/admin/bookings/${booking.id}`}
                    className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {bookings.length === 0 && (
          <div className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">CRM Inbox Empty</h3>
            <p className="text-gray-600 mb-4">
              No booking requests yet. Guest inquiries will appear here for operational management.
            </p>
            <Link
              href="/"
              className="inline-block bg-amber-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors"
            >
              View Public Site
            </Link>
          </div>
        )}
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Booking Details - CRM</h2>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Guest Name</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedBooking.guestName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedBooking.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedBooking.phone || 'Not provided'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Room Type</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedBooking.roomType}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Check-in</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedBooking.checkIn}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Check-out</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedBooking.checkOut}</p>
                </div>
              </div>

              {selectedBooking.notes && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Guest Message</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedBooking.notes}</p>
                </div>
              )}

              {selectedBooking.invoiceRef && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Invoice Reference</label>
                  <p className="mt-1 text-sm font-mono bg-purple-50 px-2 py-1 rounded text-purple-900">{selectedBooking.invoiceRef}</p>
                </div>
              )}

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

