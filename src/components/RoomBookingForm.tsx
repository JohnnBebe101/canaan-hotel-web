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

    const roomType = roomSlug || 'standard';

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

    const inputStyles =
        "w-full border-b-2 border-forest/10 bg-transparent px-1 py-2.5 text-forest font-serif text-lg focus:border-cactus outline-none transition-colors placeholder:text-gray-300 placeholder:font-sans placeholder:text-sm";
    const labelStyles = "block text-[10px] uppercase font-bold tracking-widest text-forest/60 mb-1.5";

    return (
        <form onSubmit={handleSubmit} className="relative flex flex-col gap-6 overflow-hidden rounded-2xl border border-forest/10 bg-white/90 p-6 shadow-xl backdrop-blur">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-forest via-cactus to-forest" aria-hidden="true" />

            <div className="flex flex-col gap-1 pt-2">
                {roomName && <p className="font-serif text-xl text-forest">{roomName}</p>}
                <p className="text-[10px] uppercase font-bold tracking-widest text-forest/60">Starting From</p>
                <div className="flex items-baseline gap-2">
                    <span className="font-serif text-4xl font-bold text-forest">${pricePerNight}</span>
                    <span className="text-sm font-medium text-forest/50">/ night</span>
                </div>
            </div>

            {/* Guest Details */}
            <div className="space-y-5">
                <div>
                    <label className={labelStyles} htmlFor="guestName">
                        Full Name
                    </label>
                    <input
                        className={inputStyles}
                        id="guestName"
                        type="text"
                        placeholder="Your full name"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className={labelStyles} htmlFor="email">
                        Email Address
                    </label>
                    <input
                        className={inputStyles}
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className={labelStyles} htmlFor="phone">
                        Phone Number
                    </label>
                    <input
                        className={inputStyles}
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
            <div className="grid grid-cols-2 gap-5">
                <div>
                    <label className={labelStyles} htmlFor="checkin">
                        Check-in
                    </label>
                    <input
                        className={inputStyles}
                        id="checkin"
                        type="date"
                        min={today}
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className={labelStyles} htmlFor="checkout">
                        Check-out
                    </label>
                    <input
                        className={inputStyles}
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
            <div className="grid grid-cols-2 gap-5">
                <div>
                    <label className={labelStyles} htmlFor="adults">
                        Adults
                    </label>
                    <select
                        className={inputStyles}
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
                    <label className={labelStyles} htmlFor="children">
                        Children
                    </label>
                    <select
                        className={inputStyles}
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
                variant="primary"
                className="w-full py-4"
                isLoading={isLoading}
            >
                {isLoading ? "Processing..." : "Reserve Your Stay"}
            </Button>

            {error && (
                <p className="text-red-600 text-sm mt-2" role="alert">
                    {error}
                </p>
            )}

            <div className="pt-2 border-t border-forest/10">
                <p className="text-xs text-forest/50">
                    Total for {nights} {nights === 1 ? 'night' : 'nights'}:{" "}
                    <span className="font-serif text-xl font-bold text-forest">${totalPrice.toLocaleString()}</span>
                </p>
            </div>
        </form>
    );
}
