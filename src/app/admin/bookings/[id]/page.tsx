"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Booking } from "@/lib/models";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

export default function BookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const { showToast } = useToast();

    const [booking, setBooking] = useState<Booking | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadBooking() {
            try {
                const response = await fetch(`/api/admin/bookings/${id}`);
                if (!response.ok) throw new Error("Booking not found");
                const data = await response.json();
                setBooking(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to load booking");
            } finally {
                setLoading(false);
            }
        }
        loadBooking();
    }, [id]);

    const handleStatusUpdate = async (newStatus: Booking["status"]) => {
        try {
            const response = await fetch("/api/admin/bookings", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status: newStatus }),
            });

            if (!response.ok) throw new Error("Failed to update status");

            const updated = await response.json();
            setBooking(updated);
            showToast("success", `Status updated to ${newStatus}`);
        } catch (err) {
            showToast("error", "Failed to update status");
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                <p className="mt-4 text-text-secondary font-bold uppercase tracking-widest text-xs">Loading Details...</p>
            </div>
        );
    }

    if (error || !booking) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 text-center border border-gray-100 dark:border-gray-700 shadow-xl">
                <span className="material-symbols-outlined text-6xl text-red-500 mb-4">error</span>
                <h2 className="text-2xl font-black text-text-primary dark:text-white mb-2">Booking Not Found</h2>
                <p className="text-text-secondary dark:text-gray-400 mb-8 font-medium">The record you are looking for might have been removed.</p>
                <Link href="/admin/bookings">
                    <Button variant="outline">Back to Bookings</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-4">
                    <Link href="/admin/bookings" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors">
                        <span className="material-symbols-outlined text-2xl">arrow_back</span>
                    </Link>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-black text-text-primary dark:text-white tracking-tight">
                                Guest Record
                            </h1>
                            <Badge variant={booking.status === 'confirmed' ? 'success' : booking.status === 'pending' ? 'warning' : 'error'} size="sm" className="uppercase tracking-widest">
                                {booking.status}
                            </Badge>
                        </div>
                        <p className="text-text-secondary dark:text-gray-400 font-medium">ID: {booking.id}</p>
                    </div>
                </div>

                <div className="flex gap-3">
                    {booking.status === 'pending' && (
                        <Button onClick={() => handleStatusUpdate('confirmed')} className="bg-green-600 hover:bg-green-700 text-white border-none">
                            Confirm Booking
                        </Button>
                    )}
                    {booking.status !== 'cancelled' && (
                        <Button onClick={() => handleStatusUpdate('cancelled')} variant="outline" className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 border-red-200">
                            Cancel Staying
                        </Button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Details */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-8 shadow-xl">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-text-secondary mb-8 pb-4 border-b border-gray-50 dark:border-gray-700">Guest Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary block mb-1">Full Name</label>
                                <p className="text-lg font-bold text-text-primary dark:text-white">{booking.guest_name}</p>
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary block mb-1">Email Address</label>
                                <p className="text-lg font-bold text-text-primary dark:text-white">{booking.email}</p>
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary block mb-1">Phone Number</label>
                                <p className="text-lg font-bold text-text-primary dark:text-white">{booking.phone || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary block mb-1">Created At</label>
                                <p className="text-lg font-bold text-text-primary dark:text-white">{new Date(booking.created_at).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-8 shadow-xl">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-text-secondary mb-8 pb-4 border-b border-gray-50 dark:border-gray-700">Stay Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary block mb-1">Room Type</label>
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary">hotel</span>
                                    <p className="text-lg font-bold text-text-primary dark:text-white">{booking.room_type}</p>
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary block mb-1">Guests</label>
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary">group</span>
                                    <p className="text-lg font-bold text-text-primary dark:text-white">{booking.number_of_guests} Persons</p>
                                </div>
                            </div>
                            <div className="bg-primary/5 dark:bg-primary/10 p-4 rounded-2xl border border-primary/10">
                                <label className="text-[10px] font-black uppercase tracking-widest text-primary block mb-1">Check-in</label>
                                <p className="text-xl font-black text-text-primary dark:text-white">{new Date(booking.check_in_date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>
                            <div className="bg-amber-50 dark:bg-amber-900/10 p-4 rounded-2xl border border-amber-100 dark:border-amber-900/20">
                                <label className="text-[10px] font-black uppercase tracking-widest text-amber-600 block mb-1">Check-out</label>
                                <p className="text-xl font-black text-text-primary dark:text-white">{new Date(booking.check_out_date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Summary */}
                <aside className="space-y-8">
                    <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-8 shadow-xl sticky top-24">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-text-secondary mb-6">Financial Summary</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm font-bold text-text-secondary dark:text-gray-400">
                                <span>Room Subtotal</span>
                                <span>${booking.total_price}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm font-bold text-text-secondary dark:text-gray-400">
                                <span>Services / Tax</span>
                                <span>$0.00</span>
                            </div>
                            <div className="pt-4 border-t border-gray-50 dark:border-gray-700 flex justify-between items-end">
                                <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Grand Total</span>
                                <span className="text-3xl font-black text-primary tracking-tighter">${booking.total_price}</span>
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-gray-50 dark:border-gray-700">
                            <div className="flex items-center gap-3 text-primary mb-4">
                                <span className="material-symbols-outlined">payments</span>
                                <span className="text-xs font-black uppercase tracking-widest">Payment Status</span>
                            </div>
                            <Badge variant="neutral" size="sm" className="w-full justify-center py-2 opacity-60">Pending Settlement</Badge>
                        </div>
                    </div>

                    <div className="p-6 bg-blue-50 dark:bg-blue-900/10 rounded-3xl border border-blue-100 dark:border-blue-900/20">
                        <div className="flex items-center gap-3 text-blue-600 mb-2">
                            <span className="material-symbols-outlined text-sm">sticky_note_2</span>
                            <span className="text-[10px] font-black uppercase tracking-widest">Internal Notes</span>
                        </div>
                        <p className="text-xs text-text-secondary dark:text-gray-400 italic">
                            {booking.notes || "No internal notes for this booking. Click settings to add documentation."}
                        </p>
                    </div>
                </aside>
            </div>
        </div>
    );
}
