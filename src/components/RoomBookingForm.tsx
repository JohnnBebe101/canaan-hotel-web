"use client";

import { useState, useEffect } from "react";
import Button from "./ui/Button";

interface RoomBookingFormProps {
    pricePerNight: number;
    roomName?: string;
    roomSlug?: string;
}

export default function RoomBookingForm({ pricePerNight, roomName, roomSlug }: RoomBookingFormProps) {
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);
    const [totalPrice, setTotalPrice] = useState(pricePerNight);
    const [nights, setNights] = useState(1);
    const [guestName, setGuestName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const roomType = roomSlug || 'economy-single';

    useEffect(() => {
        if (checkIn && checkOut) {
            const start = new Date(checkIn);
            const end = new Date(checkOut);
            const diffTime = Math.abs(end.getTime() - start.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays > 0) {
                setNights(diffDays);
                setTotalPrice(diffDays * pricePerNight);
            } else {
                setNights(1);
                setTotalPrice(pricePerNight);
            }
        }
    }, [checkIn, checkOut, pricePerNight]);

    const today = new Date().toISOString().split("T")[0];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const bookingRes = await fetch("/api/bookings/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    guest_name: guestName,
                    email,
                    phone,
                    check_in_date: checkIn,
                    check_out_date: checkOut,
                    number_of_guests: adults + children,
                    room_type: roomType,
                }),
            });

            if (!bookingRes.ok) {
                const { error: err } = await bookingRes.json();
                throw new Error(err || "Booking creation failed");
            }

            const { bookingId } = await bookingRes.json();

            const checkoutRes = await fetch("/api/checkout/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ bookingId }),
            });

            if (!checkoutRes.ok) {
                throw new Error("Payment session could not be created");
            }

            const { sessionUrl } = await checkoutRes.json();

            window.location.href = sessionUrl;

        } catch (err) {
            setError(err instanceof Error ? err.message : "An unexpected error occurred");
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 rounded-xl border border-stone-200 bg-white p-6 shadow-lg">
            <div className="flex flex-col gap-2">
                <p className="text-sm font-bold text-stone-600">Starting From</p>
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-stone-800">${pricePerNight}</span>
                    <span className="text-sm font-medium text-stone-500">/ night</span>
                </div>
            </div>

            {/* Guest Details */}
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-bold text-stone-700 mb-1.5" htmlFor="guestName">
                        Full Name
                    </label>
                    <input
                        className="w-full rounded-lg border border-stone-200 px-4 py-2.5 focus:ring-2 focus:ring-amber-700 focus:border-amber-700 outline-none"
                        id="guestName"
                        type="text"
                        placeholder="Your full name"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-stone-700 mb-1.5" htmlFor="email">
                        Email Address
                    </label>
                    <input
                        className="w-full rounded-lg border border-stone-200 px-4 py-2.5 focus:ring-2 focus:ring-amber-700 focus:border-amber-700 outline-none"
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-stone-700 mb-1.5" htmlFor="phone">
                        Phone Number
                    </label>
                    <input
                        className="w-full rounded-lg border border-stone-200 px-4 py-2.5 focus:ring-2 focus:ring-amber-700 focus:border-amber-700 outline-none"
                        id="phone"
                        type="tel"
                        placeholder="+251 911 000 000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-bold text-stone-700 mb-1.5" htmlFor="checkin">
                        Check-in
                    </label>
                    <input
                        className="w-full rounded-lg border border-stone-200 px-4 py-2.5 focus:ring-2 focus:ring-amber-700 focus:border-amber-700 outline-none"
                        id="checkin"
                        type="date"
                        min={today}
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-stone-700 mb-1.5" htmlFor="checkout">
                        Check-out
                    </label>
                    <input
                        className="w-full rounded-lg border border-stone-200 px-4 py-2.5 focus:ring-2 focus:ring-amber-700 focus:border-amber-700 outline-none"
                        id="checkout"
                        type="date"
                        min={checkIn || today}
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        required
                    />
                </div>
            </div>

            {/* Guests */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-bold text-stone-700 mb-1.5" htmlFor="adults">
                        Adults
                    </label>
                    <select
                        className="w-full rounded-lg border border-stone-200 px-4 py-2.5 focus:ring-2 focus:ring-amber-700 focus:border-amber-700 outline-none"
                        id="adults"
                        value={adults}
                        onChange={(e) => setAdults(Number(e.target.value))}
                    >
                        <option value="1">1 Adult</option>
                        <option value="2">2 Adults</option>
                        <option value="3">3 Adults</option>
                        <option value="4">4 Adults</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-bold text-stone-700 mb-1.5" htmlFor="children">
                        Children
                    </label>
                    <select
                        className="w-full rounded-lg border border-stone-200 px-4 py-2.5 focus:ring-2 focus:ring-amber-700 focus:border-amber-700 outline-none"
                        id="children"
                        value={children}
                        onChange={(e) => setChildren(Number(e.target.value))}
                    >
                        <option value="0">0 Children</option>
                        <option value="1">1 Child</option>
                        <option value="2">2 Children</option>
                    </select>
                </div>
            </div>

            <Button 
                type="submit" 
                size="lg" 
                className="w-full py-4 uppercase tracking-widest bg-amber-700 hover:bg-amber-800"
                disabled={isLoading}
            >
                {isLoading ? "Processing..." : "Reserve Your Stay"}
            </Button>

            {error && (
                <p className="text-red-600 text-sm mt-2" role="alert">
                    {error}
                </p>
            )}

            <div className="text-center pt-2 border-t border-stone-100">
                <p className="text-xs text-stone-500">
                    Total for {nights} {nights === 1 ? 'night' : 'nights'}: <span className="font-black text-stone-800 text-base">${totalPrice}</span>
                </p>
            </div>
        </form>
    );
}