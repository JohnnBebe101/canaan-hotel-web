"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Button from "./ui/Button";

interface RoomBookingFormProps {
    pricePerNight: number;
}

export default function RoomBookingForm({ pricePerNight }: RoomBookingFormProps) {
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);
    const [totalPrice, setTotalPrice] = useState(pricePerNight);
    const [nights, setNights] = useState(1);

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

    return (
        <div className="flex flex-col gap-8 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 p-6 shadow-lg">
            <div className="flex flex-col gap-2">
                <p className="text-sm font-bold text-primary">Starting From</p>
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-primary dark:text-white">${pricePerNight}</span>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">/ night</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-bold text-text-primary dark:text-white mb-2" htmlFor="checkin">
                        Check-in
                    </label>
                    <div className="relative">
                        <input
                            className="w-full rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
                            id="checkin"
                            type="date"
                            min={today}
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-text-primary dark:text-white mb-2" htmlFor="checkout">
                        Check-out
                    </label>
                    <div className="relative">
                        <input
                            className="w-full rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
                            id="checkout"
                            type="date"
                            min={checkIn || today}
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-bold text-text-primary dark:text-white mb-2" htmlFor="adults">
                        Adults
                    </label>
                    <select
                        className="w-full rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
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
                    <label className="block text-sm font-bold text-text-primary dark:text-white mb-2" htmlFor="children">
                        Children
                    </label>
                    <select
                        className="w-full rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
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

            <Link
                href={`/#booking?checkIn=${checkIn}&checkOut=${checkOut}&adults=${adults}&children=${children}`}
                className="w-full flex items-center justify-center rounded-lg h-12 px-6 bg-primary text-white text-base font-bold hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
                <span>Reserve Your Stay</span>
            </Link>

            <div className="text-center mt-3 pt-4 border-t border-gray-50 dark:border-gray-700">
                <p className="text-xs text-text-secondary dark:text-gray-400">
                    Total for {nights} {nights === 1 ? 'night' : 'nights'}: <span className="font-black text-text-primary dark:text-white text-base">${totalPrice}</span>
                </p>
            </div>
        </div>
    );
}
