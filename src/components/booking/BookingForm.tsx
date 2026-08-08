"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import Calendar from "./Calendar";
import { Icon } from "@/components/ui/Icons";
import { FEATURED_ROOMS } from "@/lib/featuredRooms";

interface BookingFormProps {
    initialRoom?: string;
    initialCheckIn?: string;
    initialCheckOut?: string;
}

type Step = "details" | "payment" | "success";

function parseDate(value?: string): Date | null {
    if (!value) return null;
    const d = new Date(`${value}T00:00:00`);
    return Number.isNaN(d.getTime()) ? null : d;
}

function toDateInput(d: Date): string {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

const inputStyles =
    "w-full bg-white/50 border-b-2 border-forest/10 p-4 text-forest font-serif text-lg focus:border-cactus outline-none transition-all placeholder:text-gray-300 placeholder:italic";
const labelStyles =
    "block text-[10px] uppercase font-bold tracking-widest text-forest/40 mb-3";

export default function BookingForm({ initialRoom, initialCheckIn, initialCheckOut }: BookingFormProps) {
    const hasRoom = FEATURED_ROOMS.some((r) => r.slug === initialRoom);
    const [selectedSuite, setSelectedSuite] = useState(hasRoom ? initialRoom! : "standard");
    const [checkIn, setCheckIn] = useState<Date | null>(parseDate(initialCheckIn));
    const [checkOut, setCheckOut] = useState<Date | null>(parseDate(initialCheckOut));
    const [guests, setGuests] = useState(1);

    const [step, setStep] = useState<Step>("details");
    const [guestName, setGuestName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [bookingRef, setBookingRef] = useState<string>("");

    const selectedRoom = FEATURED_ROOMS.find((r) => r.slug === selectedSuite) ?? FEATURED_ROOMS[0];

    const nights = useMemo(() => {
        if (!checkIn || !checkOut) return 0;
        const diff = Math.abs(checkOut.getTime() - checkIn.getTime());
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    }, [checkIn, checkOut]);

    const totalPrice = useMemo(
        () => (nights > 0 ? nights * selectedRoom.pricePerNight : 0),
        [nights, selectedRoom.pricePerNight]
    );

    const handleRangeSelect = (start: Date | null, end: Date | null) => {
        setCheckIn(start);
        setCheckOut(end);
    };

    const goToPayment = (e: React.FormEvent) => {
        e.preventDefault();
        if (checkIn && checkOut && guestName && email) setStep("payment");
    };

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);
        setError(null);

        try {
            const bookingRes = await fetch("/api/bookings/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    guest_name: guestName,
                    email,
                    phone,
                    check_in_date: checkIn ? toDateInput(checkIn) : "",
                    check_out_date: checkOut ? toDateInput(checkOut) : "",
                    number_of_guests: guests,
                    room_type: selectedSuite,
                }),
            });

            if (!bookingRes.ok) {
                const d = await bookingRes.json();
                throw new Error(d.error || "Booking creation failed");
            }

            const booking = await bookingRes.json();
            setBookingRef(booking.booking_reference || "");

            const checkoutRes = await fetch("/api/checkout/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ bookingId: booking.bookingId }),
            });

            if (checkoutRes.ok) {
                const { sessionUrl } = await checkoutRes.json();
                window.location.href = sessionUrl;
                return;
            }

            const cd = await checkoutRes.json().catch(() => null);
            // Stripe not configured → graceful offline confirmation
            if (checkoutRes.status === 503 || cd?.error === "Stripe is not configured") {
                setStep("success");
                setIsSubmitting(false);
                return;
            }
            throw new Error(cd?.error || "Payment session could not be created");
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unexpected error occurred");
            setIsSubmitting(false);
        }
    };

    return (
        <section className="w-full bg-sandstone px-4 py-10 sm:px-6 md:py-14 lg:px-8">
            <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-5">
                {/* FORM COLUMN */}
                <div className="lg:col-span-3">
                    {/* STEP HEADER */}
                    <div className="mb-6 flex items-center justify-between border-b border-forest/5 pb-4">
                        <div>
                            <Badge variant="cactus">
                                {step === "details" ? "Phase 01" : step === "payment" ? "Phase 02" : "Phase 03"}
                            </Badge>
                            <h2 className="mt-2 font-serif text-3xl text-forest md:text-4xl">
                                {step === "details" ? "Personal Details" : step === "payment" ? "Secure Checkout" : "Experience Secured"}
                            </h2>
                        </div>
                        <div className="flex items-center gap-1.5" aria-hidden="true">
                            <span className={`h-1.5 w-6 rounded-full ${step === "details" ? "bg-cactus" : "bg-cactus/40"}`} />
                            <span className={`h-1.5 w-6 rounded-full ${step === "payment" ? "bg-cactus" : step === "details" ? "bg-forest/15" : "bg-cactus/40"}`} />
                            <span className={`h-1.5 w-6 rounded-full ${step === "success" ? "bg-cactus" : "bg-forest/15"}`} />
                        </div>
                    </div>

                    {/* STEP: DETAILS */}
                    {step === "details" && (
                        <form onSubmit={goToPayment} className="space-y-6">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-3">
                                    <label htmlFor="guest-name" className={labelStyles}>Full Legal Name</label>
                                    <input id="guest-name" required type="text" placeholder="E.g. Alexander Mesob" value={guestName} onChange={(e) => setGuestName(e.target.value)} className={inputStyles} />
                                </div>
                                <div className="space-y-3">
                                    <label htmlFor="guest-email" className={labelStyles}>Digital Address (Email)</label>
                                    <input id="guest-email" required type="email" placeholder="alex@heritage.com" value={email} onChange={(e) => setEmail(e.target.value)} className={inputStyles} />
                                </div>
                                <div className="space-y-3 md:col-span-2">
                                    <label htmlFor="guest-phone" className={labelStyles}>Phone Number</label>
                                    <input id="guest-phone" type="tel" placeholder="+251 911 000 000" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputStyles} />
                                </div>
                            </div>

                            <div className="space-y-6">
                                <label className="flex items-center gap-3 text-[10px] uppercase font-bold tracking-widest text-forest/40">
                                    <Icon name="calendar_month" className="text-sm text-cactus" /> Choose Your Window of Stay
                                </label>
                                <div className="overflow-hidden rounded-sm border border-forest/5 bg-white shadow-xl">
                                    <Calendar startDate={checkIn} endDate={checkOut} onRangeSelect={handleRangeSelect} />
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className={`h-2 w-2 rounded-full ${!checkIn ? "bg-cactus animate-ping" : "bg-cactus"}`}></div>
                                    <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400">
                                        {!checkIn ? "Awaiting arrival date selection" : !checkOut ? "Awaiting departure date selection" : "Stay window secured"}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6 pt-4 md:grid-cols-2">
                                <div className="space-y-3">
                                    <label htmlFor="suite-tier-select" className={`${labelStyles} flex items-center gap-2`}>
                                        <Icon name="hotel" className="text-sm text-cactus" /> Room Type
                                    </label>
                                    <div className="relative">
                                        <select id="suite-tier-select" value={selectedSuite} onChange={(e) => setSelectedSuite(e.target.value)}
                                            className="w-full appearance-none bg-white/50 py-4 pr-10 text-forest font-serif text-lg outline-none transition-colors cursor-pointer border-b-2 border-forest/10 hover:border-cactus focus:border-cactus">
                                            {FEATURED_ROOMS.map((room) => (
                                                <option key={room.slug} value={room.slug}>{room.name}</option>
                                            ))}
                                        </select>
                                        <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-cactus">
                                            <Icon name="expand_more" className="text-xl" />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label htmlFor="guest-count" className={`${labelStyles} flex items-center gap-2`}>
                                        <Icon name="group" className="text-sm text-cactus" /> Guests
                                    </label>
                                    <div className="relative">
                                        <select id="guest-count" value={guests} onChange={(e) => setGuests(Number(e.target.value))}
                                            className="w-full appearance-none bg-white/50 py-4 pr-10 text-forest font-serif text-lg outline-none transition-colors cursor-pointer hover:border-cactus focus:border-cactus border-b-2 border-forest/10">
                                            {[1, 2, 3, 4, 5].map((n) => (
                                                <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>
                                            ))}
                                        </select>
                                        <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-cactus">
                                            <Icon name="expand_more" className="text-xl" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                variant={!checkIn || !checkOut ? "outline" : "primary"}
                                disabled={!checkIn || !checkOut}
                                className="w-full py-4 text-xs"
                            >
                                Continue to Secure Checkout <Icon name="arrow_forward" className="ml-2 text-base" />
                            </Button>
                        </form>
                    )}

                    {/* STEP: PAYMENT */}
                    {step === "payment" && (
                        <form onSubmit={handlePayment} className="space-y-6">
                            <div className="flex items-center justify-between">
                                <button type="button" onClick={() => setStep("details")}
                                    className="group flex items-center text-[10px] uppercase font-bold text-cactus">
                                    <Icon name="chevron_left" className="mr-2 text-base transition-transform group-hover:-translate-x-2" /> Return to Identification
                                </button>
                            </div>

                            <div className="rounded-sm border border-cactus/10 bg-white p-8 shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 left-0 h-full w-1 bg-cactus"></div>
                                <p className="text-sm text-gray-500 italic leading-relaxed">
                                    &quot;By completing this reservation, you become a guest of Canaan International Hotel. We book directly — no third-party fees.&quot;
                                </p>
                            </div>

                            <div className="rounded-sm border border-forest/10 bg-white/80 p-6">
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-[10px] uppercase font-bold tracking-widest text-forest/40">Total for {nights} {nights === 1 ? "night" : "nights"}</p>
                                        <p className="font-serif text-4xl font-bold text-forest">${totalPrice.toLocaleString()}</p>
                                    </div>
                                    <p className="text-xs text-forest/50">Settled securely via Stripe checkout.</p>
                                </div>
                            </div>

                            {error && (
                                <p className="rounded-sm border border-red-200 bg-red-50 p-4 text-xs font-bold uppercase tracking-widest text-red-800" role="alert">
                                    {error}
                                </p>
                            )}

                            <Button type="submit" size="lg" className="w-full py-4" isLoading={isSubmitting}>
                                {isSubmitting ? "Processing..." : <>Confirm &amp; Pay <Icon name="lock" className="ml-2 text-base" /></>}
                            </Button>
                        </form>
                    )}

                    {/* STEP: SUCCESS (offline fallback) */}
                    {step === "success" && (
                        <div className="flex h-full flex-col items-center justify-center py-16 text-center animate-in zoom-in-95 duration-1000" role="alert" aria-live="polite">
                            <div className="relative mb-12">
                                <div className="absolute inset-0 animate-ping rounded-full bg-cactus/20"></div>
                                <div className="relative z-10 flex h-28 w-28 items-center justify-center rounded-full border-2 border-cactus bg-white shadow-2xl">
                                    <Icon name="check_circle" className="text-6xl text-cactus" />
                                </div>
                            </div>
                            <Badge variant="cactus">Experience Secured</Badge>
                            <h2 className="mt-8 mb-6 font-serif text-5xl text-forest md:text-6xl">Welcome to the Highlands</h2>
                            <p className="mx-auto mb-6 max-w-md text-gray-500 text-lg leading-relaxed italic font-light">
                                Your request has been received. Our team will confirm availability and finalise your reservation shortly.
                            </p>
                            {bookingRef && (
                                <p className="mb-8 text-xs uppercase tracking-[0.3em] text-cactus font-bold">Reference: {bookingRef}</p>
                            )}
                            <div className="flex flex-col gap-3 sm:flex-row">
                                <Link href="/rooms">
                                    <Button size="lg" className="px-12">Browse Rooms</Button>
                                </Link>
                                <Link href="/contact">
                                    <Button variant="outline" size="lg" className="px-12">Contact Us</Button>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>

                {/* SUMMARY COLUMN */}
                <aside className="lg:col-span-2">
                    <div className="lg:sticky lg:top-24 overflow-hidden rounded-sm bg-forest p-6 text-left relative">
                        <div className="absolute inset-0 canaan-pattern scale-150 opacity-[0.03] pointer-events-none"></div>
                        <div className="relative z-10 space-y-8">
                            <div className="flex items-center space-x-4">
                                <Icon name="verified_user" className="text-xl text-cactus" />
                                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-cactus/80">Secure Reservation</span>
                            </div>
                            <div>
                                <h3 className="font-serif text-3xl leading-tight text-sandstone md:text-4xl">Your Stay in the Highlands</h3>
                                <p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-cactus">Sanctuary Summary</p>
                            </div>

                            <div className="space-y-3 border-y border-white/10 py-5">
                                <p className="text-[9px] font-bold uppercase tracking-widest text-cactus">Room Type</p>
                                <p className="font-serif text-xl text-sandstone">{selectedRoom.name}</p>
                                <p className="text-[11px] font-bold text-cactus/80">From ${selectedRoom.pricePerNight} / night</p>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-2">
                                    <p className="text-[9px] font-bold uppercase tracking-widest text-cactus">Check-in</p>
                                    <p className="font-serif text-lg text-sandstone">{checkIn ? checkIn.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : "---"}</p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-[9px] font-bold uppercase tracking-widest text-cactus">Check-out</p>
                                    <p className="font-serif text-lg text-sandstone">{checkOut ? checkOut.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : "---"}</p>
                                </div>
                            </div>

                            <div className="space-y-4 pt-2" aria-label="Price summary">
                                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-gray-500">
                                    <span>Stay Duration</span>
                                    <span className="text-sandstone">{nights} {nights === 1 ? "Night" : "Nights"}</span>
                                </div>
                                <div className="flex items-center justify-between border-t border-white/10 pt-4 text-[11px] font-bold uppercase tracking-[0.3em] text-cactus">
                                    <span>Total Investment</span>
                                    <span className="font-serif text-4xl tracking-tighter text-sandstone md:text-5xl">${totalPrice.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 space-y-3 hidden lg:block">
                        <div className="flex items-center gap-3 text-cactus/70">
                            <Icon name="lock" className="text-lg" />
                            <span className="text-[9px] font-bold uppercase tracking-[0.3em]">Encrypted &amp; Secure</span>
                        </div>
                        <div className="flex items-center gap-3 text-cactus/70">
                            <Icon name="star" className="text-lg" />
                            <span className="text-[9px] font-bold uppercase tracking-[0.3em]">Best Rate Guaranteed Directly</span>
                        </div>
                    </div>
                </aside>
            </div>

            {/* MOBILE STICKY PRICE BAR */}
            {step !== "success" && (
                <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between border-t border-forest/10 bg-sandstone/95 px-6 py-3 backdrop-blur-md md:hidden lg:hidden">
                    <div>
                        <p className="text-[9px] uppercase font-bold tracking-widest text-forest/50">{nights} {nights === 1 ? "Night" : "Nights"}</p>
                        <p className="font-serif text-xl font-bold text-forest">${totalPrice.toLocaleString()}</p>
                    </div>
                    {step === "details" && (
                        <Button variant="primary" className="px-6 py-3 text-[9px]" disabled={!checkIn || !checkOut} onClick={() => setStep(checkIn && checkOut ? "payment" : "details")}>
                            Checkout
                        </Button>
                    )}
                </div>
            )}
        </section>
    );
}