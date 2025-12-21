"use client";

import { useState, useEffect } from "react";

/**
 * Admin Bookings Page
 * Route: /admin/bookings
 *
 * Displays booking inquiries for admin review
 */

interface BookingInquiry {
  id: string;
  guest_name: string;
  email: string;
  phone: string;
  room_type: string;
  dates: {
    check_in: string;
    check_out: string;
  };
  message: string;
  status: "pending" | "confirmed" | "cancelled";
  created_at?: string;
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<BookingInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<BookingInquiry | null>(null);

  // TODO: Replace with actual API call when data storage is implemented
  useEffect(() => {
    // Simulate loading bookings from database
    const loadBookings = async () => {
      try {
        // This would be: const response = await fetch('/api/bookings');
        // For now, show empty state
        setBookings([]);
      } catch (error) {
        console.error("Failed to load bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  const updateBookingStatus = async (bookingId: string, newStatus: BookingInquiry["status"]) => {
    // TODO: Implement status update API
    console.log(`Update booking ${bookingId} to status: ${newStatus}`);
    // This would make an API call to update the booking status
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-800";
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Booking Inquiries</h1>
        <p className="text-gray-600">Manage guest booking requests</p>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No booking inquiries yet</h3>
            <p className="text-gray-600 mb-6">
              Booking inquiries from guests will appear here. Data storage needs to be implemented to persist bookings.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-left max-w-md mx-auto">
              <h4 className="text-sm font-medium text-yellow-800 mb-2">Implementation Note</h4>
              <p className="text-sm text-yellow-700">
                To enable booking storage, implement database integration in <code>/api/bookings/route.ts</code> and add retrieval endpoints.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">All Bookings ({bookings.length})</h2>
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
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-medium text-gray-900">{booking.guest_name}</h3>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{booking.email} • {booking.phone}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {booking.room_type} • {booking.dates.check_in} to {booking.dates.check_out}
                    </p>
                    {booking.message && (
                      <p className="text-sm text-gray-500 mt-2 truncate max-w-md">
                        {booking.message}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <select
                      value={booking.status}
                      onChange={(e) => updateBookingStatus(booking.id, e.target.value as BookingInquiry["status"])}
                      onClick={(e) => e.stopPropagation()}
                      className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Booking Details Modal - Placeholder for future implementation */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Booking Details</h2>
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
                  <p className="mt-1 text-sm text-gray-900">{selectedBooking.guest_name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedBooking.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedBooking.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Room Type</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedBooking.room_type}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Check-in</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedBooking.dates.check_in}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Check-out</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedBooking.dates.check_out}</p>
                </div>
              </div>

              {selectedBooking.message && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Message</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedBooking.message}</p>
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
