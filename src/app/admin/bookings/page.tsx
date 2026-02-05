"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Booking, BookingStatus } from "@/lib/models";
import { withTimeout, safeAsync } from "@/lib/asyncGuards";
import { createStripePaymentLink } from "@/lib/payments/payment-link-service";
import { PaymentCreateIntent, PaymentRecord, PaymentStatus } from "@/lib/payments/payment-types";
import { updatePaymentStatus } from "@/lib/payments/payment-store";
import { isPaymentsEnabled } from "@/lib/featureFlags";
import { logInfo, logError } from "@/lib/logger";

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
  const [generatingPaymentLink, setGeneratingPaymentLink] = useState(false);
  const [confirmingPayment, setConfirmingPayment] = useState(false);
  const [paymentLinkCopied, setPaymentLinkCopied] = useState(false);
  const [updatingPaymentStatus, setUpdatingPaymentStatus] = useState(false);

  // Load CRM bookings
  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      setLoading(true);
      // V4.4 async guard: Prevent hanging requests during CRM data loading
      const response = await withTimeout(
        (signal) => fetch("/api/admin/bookings", { signal }),
        5000 // 5 second timeout for admin operations
      );
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
      // V4.4 async guard: Prevent hanging requests during CRM status updates
      const response = await withTimeout(
        (signal) => fetch("/api/admin/bookings", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: bookingId, status: newStatus }),
          signal
        }),
        5000 // 5 second timeout for admin operations
      );

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

  const generatePaymentLink = async (booking: Booking) => {
    // V5.2.1 safety: Only allow for INVOICED bookings with payments enabled
    if (booking.status !== "INVOICED" || !isPaymentsEnabled()) {
      return;
    }

    setGeneratingPaymentLink(true);

    try {
      // Calculate amount (placeholder: $100 per night, would be calculated properly in production)
      const checkIn = new Date(booking.checkIn);
      const checkOut = new Date(booking.checkOut);
      const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
      const amountCents = nights * 10000; // $100/night in cents

      const input: PaymentCreateIntent = {
        bookingId: booking.id,
        amountCents,
        currency: "usd"
      };

      // V5.2.1 async guard: Safe payment link generation
      const paymentRecord = await safeAsync(
        () => createStripePaymentLink(input),
        "ADMIN_PAYMENT_LINK_GENERATION"
      );

      if (paymentRecord) {
        try {
          // V5.2.1: Persist payment reference to backend (safe operation)
          const persistResponse = await withTimeout(
            (signal) => fetch("/api/admin/bookings", {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                id: booking.id,
                paymentId: paymentRecord.id,
                paymentRecord
              }),
              signal
            }),
            5000 // 5 second timeout for payment persistence
          );

          if (persistResponse.ok) {
            const persistedBooking = await persistResponse.json();

            // Update local state with persisted data
            setBookings(bookings.map(b =>
              b.id === booking.id ? persistedBooking : b
            ));

            // Update selected booking if it's the one being modified
            if (selectedBooking?.id === booking.id) {
              setSelectedBooking(persistedBooking);
            }
          } else {
            // Fallback: Update local state even if persistence fails (UI consistency)
            const updatedBooking = { ...booking, paymentRecord };
            setBookings(bookings.map(b =>
              b.id === booking.id ? updatedBooking : b
            ));

            if (selectedBooking?.id === booking.id) {
              setSelectedBooking(updatedBooking);
            }
          }
        } catch (persistError) {
          // V5.2.1 safety: Fallback to local state update if persistence fails
          // Ensures UI remains functional even if backend persistence fails
          const updatedBooking = { ...booking, paymentRecord };
          setBookings(bookings.map(b =>
            b.id === booking.id ? updatedBooking : b
          ));

          if (selectedBooking?.id === booking.id) {
            setSelectedBooking(updatedBooking);
          }
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate payment link");
    } finally {
      setGeneratingPaymentLink(false);
    }
  };

  const confirmManualPayment = async (booking: Booking) => {
    if (!booking.paymentRecord || booking.paymentRecord.status === "PAID") {
      return;
    }

    setConfirmingPayment(true);

    try {
      // V5.2.2: Manual payment confirmation - update payment and booking status
      const updateResponse = await withTimeout(
        (signal) => fetch("/api/admin/bookings", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: booking.id,
            status: "CONFIRMED", // Move booking to CONFIRMED status
            paymentStatus: "PAID" // Mark payment as received
          }),
          signal
        }),
        5000 // 5 second timeout for payment confirmation
      );

      if (!updateResponse.ok) {
        throw new Error("Failed to confirm payment");
      }

      const updatedBooking = await updateResponse.json();

      // Update local state
      setBookings(bookings.map(b =>
        b.id === booking.id ? updatedBooking : b
      ));

      // Update selected booking if it's the one being modified
      if (selectedBooking?.id === booking.id) {
        setSelectedBooking(updatedBooking);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to confirm payment");
    } finally {
      setConfirmingPayment(false);
    }
  };

  const copyPaymentLink = async () => {
    if (!selectedBooking?.paymentRecord?.paymentLink) return;

    try {
      await navigator.clipboard.writeText(selectedBooking.paymentRecord.paymentLink);
      setPaymentLinkCopied(true);
      setTimeout(() => setPaymentLinkCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.warn('Failed to copy payment link to clipboard:', err);
    }
  };

  const updatePaymentStatusLocal = async (newStatus: PaymentStatus, actionNote: string) => {
    if (!selectedBooking?.paymentRecord || !isPaymentsEnabled()) return;

    setUpdatingPaymentStatus(true);

    try {
      const updatedPayment = updatePaymentStatus(selectedBooking.paymentRecord.id, newStatus);

      if (updatedPayment) {
        // Update local state
        const updatedBooking = {
          ...selectedBooking,
          paymentRecord: updatedPayment
        };
        setSelectedBooking(updatedBooking);

        // Update bookings list
        setBookings(bookings.map(b =>
          b.id === selectedBooking.id ? updatedBooking : b
        ));

        // Log admin action
        logInfo('ADMIN_PAYMENT_STATUS_UPDATE', `Payment status updated: ${selectedBooking.paymentRecord.status} → ${newStatus}`, {
          bookingId: selectedBooking.id,
          paymentId: updatedPayment.id,
          previousStatus: selectedBooking.paymentRecord.status,
          newStatus,
          actionNote,
          timestamp: new Date().toISOString()
        });
      } else {
        logError('ADMIN_PAYMENT_STATUS_UPDATE', 'Failed to update payment status - payment record not found', {
          bookingId: selectedBooking.id,
          paymentId: selectedBooking.paymentRecord.id,
          requestedStatus: newStatus
        });
      }
    } catch (error) {
      logError('ADMIN_PAYMENT_STATUS_UPDATE', 'Error updating payment status', {
        bookingId: selectedBooking.id,
        paymentId: selectedBooking.paymentRecord.id,
        requestedStatus: newStatus,
        error: error instanceof Error ? error.message : String(error)
      });
    } finally {
      setUpdatingPaymentStatus(false);
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

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "LINK_CREATED":
        return "bg-blue-100 text-blue-800";
      case "PAID":
        return "bg-green-100 text-green-800";
      case "FAILED":
        return "bg-red-100 text-red-800";
      case "CANCELLED":
        return "bg-gray-100 text-gray-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Loading Guest Bookings</h3>
          <p className="text-gray-600">Retrieving booking data from the CRM system...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Unable to Load Bookings</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">{error}</p>
          <button
            onClick={loadBookings}
            className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
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
      <div className="mb-12">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Booking Status Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {(["NEW", "REVIEWED", "CONFIRMED", "INVOICED", "CANCELLED", "CLOSED"] as BookingStatus[]).map((status) => {
            const count = bookings.filter(b => b.status === status).length;
            const getStatusStyle = () => {
              switch (status) {
                case "NEW": return "bg-blue-50 border-blue-200 text-blue-900";
                case "REVIEWED": return "bg-yellow-50 border-yellow-200 text-yellow-900";
                case "CONFIRMED": return "bg-green-50 border-green-200 text-green-900";
                case "INVOICED": return "bg-purple-50 border-purple-200 text-purple-900";
                case "CANCELLED": return "bg-red-50 border-red-200 text-red-900";
                case "CLOSED": return "bg-gray-50 border-gray-200 text-gray-900";
                default: return "bg-white border-gray-200 text-gray-900";
              }
            };

            return (
              <div key={status} className={`p-4 rounded-lg border ${getStatusStyle()}`}>
                <div className="text-2xl font-bold">{count}</div>
                <div className="text-sm font-medium">{status}</div>
                <div className="text-xs opacity-75 mt-1">
                  {status === "NEW" && "Awaiting review"}
                  {status === "REVIEWED" && "Staff reviewed"}
                  {status === "CONFIRMED" && "Guest confirmed"}
                  {status === "INVOICED" && "Invoice sent"}
                  {status === "CANCELLED" && "Booking cancelled"}
                  {status === "CLOSED" && "Completed"}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bookings List */}
      <div className="bg-white rounded-lg shadow-sm border mt-8">
        <div className="p-6 border-b bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Guest Bookings ({bookings.length})</h2>
              <p className="text-sm text-gray-600 mt-1">Manage the complete booking lifecycle</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 mb-1">Click any booking for details</div>
              <div className="text-xs text-gray-400">Use status dropdown to advance workflow</div>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => setSelectedBooking(booking)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  {/* Guest Header */}
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">{booking.guestName}</h3>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-gray-600">{booking.email}</span>
                        {booking.phone && (
                          <span className="text-sm text-gray-600">• {booking.phone}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                      {booking.invoiceRef && (
                        <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800 border border-purple-200">
                          {booking.invoiceRef}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-700">Room:</span>
                        <span className="text-sm text-gray-900">{booking.roomType}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-700">Check-in:</span>
                        <span className="text-sm text-gray-900">{new Date(booking.checkIn).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-700">Check-out:</span>
                        <span className="text-sm text-gray-900">{new Date(booking.checkOut).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Status Description */}
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                      {getStatusDescription(booking.status)}
                    </div>
                    {booking.updatedAt !== booking.createdAt && (
                      <div className="text-xs text-gray-400">
                        Updated {new Date(booking.updatedAt).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-3 ml-6 flex-shrink-0">
                  <div className="flex flex-col items-end space-y-2">
                    <select
                      value={booking.status}
                      onChange={async (e) => {
                        try {
                          await updateBookingStatus(booking.id, e.target.value as BookingStatus);
                          // Optionally trigger a refresh or update local state here
                        } catch (error) {
                          console.error('Failed to update booking status:', error);
                        }
                      }}
                      onClick={(e) => e.stopPropagation()}
                      className="text-sm border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
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
                      className="inline-flex items-center px-3 py-2 text-sm font-medium bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {bookings.length === 0 && (
          <div className="p-16 text-center">
            <div className="text-amber-400 mb-6">
              <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Guest Bookings Yet</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              When guests submit booking inquiries from the website, they will appear here for you to manage
              through the complete operational workflow.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 max-w-lg mx-auto">
              <h4 className="text-sm font-medium text-amber-900 mb-2">Workflow Ready</h4>
              <p className="text-sm text-amber-800">
                Status management, invoicing, and guest communication tools are prepared and waiting for your first booking.
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 transition-colors shadow-sm"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Preview Booking Form
            </Link>
          </div>
        )}
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(selectedBooking.status).split(' ')[0]}`}></div>
                  <h2 className="text-xl font-semibold text-gray-900">Booking Details</h2>
                  <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(selectedBooking.status)}`}>
                    {selectedBooking.status}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Guest Information */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Guest Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Guest Name</label>
                    <p className="mt-1 text-sm font-medium text-gray-900">{selectedBooking.guestName}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Email Address</label>
                    <p className="mt-1 text-sm font-medium text-gray-900">{selectedBooking.email}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Phone Number</label>
                    <p className="mt-1 text-sm font-medium text-gray-900">{selectedBooking.phone || 'Not provided'}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Room Type</label>
                    <p className="mt-1 text-sm font-medium text-gray-900">{selectedBooking.roomType}</p>
                  </div>
                </div>
              </div>

              {/* Booking Details */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Booking Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <label className="block text-xs font-medium text-blue-600 uppercase tracking-wide">Check-in Date</label>
                    <p className="mt-1 text-lg font-semibold text-blue-900">{new Date(selectedBooking.checkIn).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <label className="block text-xs font-medium text-green-600 uppercase tracking-wide">Check-out Date</label>
                    <p className="mt-1 text-lg font-semibold text-green-900">{new Date(selectedBooking.checkOut).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <label className="block text-xs font-medium text-purple-600 uppercase tracking-wide">Room Type</label>
                    <p className="mt-1 text-lg font-semibold text-purple-900">{selectedBooking.roomType}</p>
                  </div>
                </div>
              </div>

              {/* Invoice Information */}
              {selectedBooking.invoiceRef && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Invoice Information
                  </h3>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <label className="block text-xs font-medium text-purple-600 uppercase tracking-wide">Invoice Reference</label>
                    <p className="mt-1 text-xl font-mono font-bold text-purple-900">{selectedBooking.invoiceRef}</p>
                    <p className="mt-2 text-sm text-purple-700">Auto-generated when booking status changed to INVOICED</p>
                  </div>
                </div>
              )}

              {/* Payment Information - V5.3.2 Read-Only */}
              {isPaymentsEnabled() && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Payment Information
                  </h3>

                  {selectedBooking.paymentRecord ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {/* Payment Status */}
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Status</label>
                        <p className="mt-1 text-sm font-medium text-gray-900">{selectedBooking.paymentRecord.status.replace('_', ' ')}</p>
                      </div>

                      {/* Payment Provider */}
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Provider</label>
                        <p className="mt-1 text-sm font-medium text-gray-900">{selectedBooking.paymentRecord.provider}</p>
                      </div>

                      {/* Payment Amount */}
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Amount</label>
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          ${(selectedBooking.paymentRecord.amountCents / 100).toFixed(2)}
                        </p>
                      </div>

                      {/* Payment Currency */}
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Currency</label>
                        <p className="mt-1 text-sm font-medium text-gray-900">{selectedBooking.paymentRecord.currency.toUpperCase()}</p>
                      </div>

                      {/* Payment Link (Masked) - Full width */}
                      <div className="md:col-span-2 lg:col-span-4 bg-blue-50 p-3 rounded-lg border border-blue-200">
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-xs font-medium text-blue-600 uppercase tracking-wide">Payment Link</label>
                          {selectedBooking.paymentRecord.paymentLink && (
                            <button
                              onClick={copyPaymentLink}
                              className="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded hover:bg-blue-200 transition-colors"
                            >
                              {paymentLinkCopied ? (
                                <>
                                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                  Copied
                                </>
                              ) : (
                                <>
                                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                  </svg>
                                  Copy
                                </>
                              )}
                            </button>
                          )}
                        </div>
                        <p className="text-sm text-blue-900 font-mono break-all">
                          {selectedBooking.paymentRecord.paymentLink ?
                            selectedBooking.paymentRecord.paymentLink.length > 50 ?
                              `${selectedBooking.paymentRecord.paymentLink.substring(0, 25)}...${selectedBooking.paymentRecord.paymentLink.substring(selectedBooking.paymentRecord.paymentLink.length - 25)}` :
                              selectedBooking.paymentRecord.paymentLink
                            : 'No link available'}
                        </p>
                      </div>

                      {/* Manual Payment Status Controls - V5.3.2 */}
                      <div className="md:col-span-2 lg:col-span-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <label className="block text-xs font-medium text-gray-600 uppercase tracking-wide mb-3">Manual Status Controls</label>
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => updatePaymentStatusLocal(PaymentStatus.PAID, 'Admin marked payment as received')}
                            disabled={updatingPaymentStatus || selectedBooking.paymentRecord.status === PaymentStatus.PAID}
                            className="inline-flex items-center px-3 py-2 text-xs font-medium text-green-700 bg-green-100 rounded-lg hover:bg-green-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            {updatingPaymentStatus ? (
                              <>
                                <svg className="w-3 h-3 mr-1 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Updating...
                              </>
                            ) : (
                              <>
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Mark as Paid
                              </>
                            )}
                          </button>

                          <button
                            onClick={() => updatePaymentStatusLocal(PaymentStatus.FAILED, 'Admin marked payment as failed')}
                            disabled={updatingPaymentStatus || selectedBooking.paymentRecord.status === PaymentStatus.FAILED}
                            className="inline-flex items-center px-3 py-2 text-xs font-medium text-red-700 bg-red-100 rounded-lg hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            {updatingPaymentStatus ? (
                              <>
                                <svg className="w-3 h-3 mr-1 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.003 8.003 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Updating...
                              </>
                            ) : (
                              <>
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                                Mark as Failed
                              </>
                            )}
                          </button>

                          <button
                            onClick={() => updatePaymentStatusLocal(PaymentStatus.CANCELLED, 'Admin cancelled payment')}
                            disabled={updatingPaymentStatus || selectedBooking.paymentRecord.status === PaymentStatus.CANCELLED}
                            className="inline-flex items-center px-3 py-2 text-xs font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            {updatingPaymentStatus ? (
                              <>
                                <svg className="w-3 h-3 mr-1 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.003 8.003 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Updating...
                              </>
                            ) : (
                              <>
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Cancel Payment
                              </>
                            )}
                          </button>
                        </div>
                        <p className="mt-2 text-xs text-gray-500">
                          These controls update payment status only. Booking status and emails are not affected.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-600">No payment created</p>
                    </div>
                  )}
                </div>
              )}

              {/* Payment Link - V5.2.1 */}
              {selectedBooking.status === "INVOICED" && isPaymentsEnabled() && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    Payment Processing
                  </h3>

                  {selectedBooking.paymentRecord ? (
                    // Enhanced payment information display - Read-only
                    <div className="space-y-4">
                      {/* Payment Status Badge */}
                      <div className="flex items-center space-x-3">
                        <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(selectedBooking.paymentRecord.status)}`}>
                          {selectedBooking.paymentRecord.status.replace('_', ' ')}
                        </span>
                        <span className="text-sm text-gray-600">Payment Status</span>
                      </div>

                      {/* Payment Details */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Payment Status</label>
                          <p className="mt-1 text-sm font-medium text-gray-900">{selectedBooking.paymentRecord.status.replace('_', ' ')}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Provider</label>
                          <p className="mt-1 text-sm font-medium text-gray-900">{selectedBooking.paymentRecord.provider}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Link Created</label>
                          <p className="mt-1 text-sm font-medium text-gray-900">
                            {new Date(selectedBooking.paymentRecord.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>

                      {/* Payment Link - Read-only */}
                      <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                        <label className="block text-xs font-medium text-blue-600 uppercase tracking-wide">Stripe Payment Link</label>
                        <p className="mt-1 text-sm text-blue-900 break-all font-mono">{selectedBooking.paymentRecord.paymentLink}</p>
                        <p className="mt-2 text-xs text-blue-700">
                          Amount: ${(selectedBooking.paymentRecord.amountCents / 100).toFixed(2)} {selectedBooking.paymentRecord.currency.toUpperCase()}
                        </p>
                      </div>

                      {/* Manual Payment Confirmation - V5.2.2 */}
                      {selectedBooking.paymentRecord.status !== "PAID" && (
                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                          <p className="text-sm text-green-800 mb-3">
                            If payment has been received through external means, mark this booking as paid.
                          </p>
                          <button
                            onClick={() => confirmManualPayment(selectedBooking)}
                            disabled={confirmingPayment}
                            className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            {confirmingPayment ? "Confirming..." : "Mark Payment as Received"}
                          </button>
                          <p className="mt-2 text-xs text-green-600">
                            This will update booking status to CONFIRMED and trigger guest notification.
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    // Generate payment link button
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <p className="text-sm text-yellow-800 mb-3">
                        This booking is ready for payment processing. Generate a Stripe payment link for the guest.
                      </p>
                      <button
                        onClick={() => generatePaymentLink(selectedBooking)}
                        disabled={generatingPaymentLink}
                        className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {generatingPaymentLink ? "Generating..." : "Generate Payment Link"}
                      </button>
                      <p className="mt-2 text-xs text-yellow-600">
                        V5.2.1 DESIGN: This creates a placeholder link. Real Stripe integration in V5.3+
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Guest Message */}
              {selectedBooking.notes && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Guest Message
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg border">
                    <p className="text-sm text-gray-900 whitespace-pre-wrap">{selectedBooking.notes}</p>
                  </div>
                </div>
              )}

              {/* Audit Information */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Audit Trail
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Created</label>
                    <p className="mt-1 text-sm text-gray-900">{new Date(selectedBooking.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Last Updated</label>
                    <p className="mt-1 text-sm text-gray-900">{new Date(selectedBooking.updatedAt).toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t">
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

