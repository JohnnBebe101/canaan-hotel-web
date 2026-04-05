
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Calendar from './Calendar';
import CanaanLogo from '../ui/CanaanLogo';
import { Icon } from "@/components/ui/Icons";

interface BookingWidgetProps {
    isOpen: boolean;
    onClose: () => void;
    initialSuite?: string;
}

type Step = 'details' | 'payment' | 'success';

export default function BookingWidget({ isOpen, onClose, initialSuite }: BookingWidgetProps) {
    const [step, setStep] = useState<Step>('details');
    const [selectedSuite, setSelectedSuite] = useState(initialSuite || 'The Royal Mesob Suite');

    // Date selection state
    const [checkIn, setCheckIn] = useState<Date | null>(null);
    const [checkOut, setCheckOut] = useState<Date | null>(null);

    useEffect(() => {
        if (isOpen) {
            setStep('details');
            if (initialSuite) setSelectedSuite(initialSuite);
        }
    }, [isOpen, initialSuite]);

    const nights = useMemo(() => {
        if (!checkIn || !checkOut) return 0;
        const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }, [checkIn, checkOut]);

    const totalPrice = useMemo(() => {
        const rates: Record<string, number> = {
            'The Royal Mesob Suite': 450,
            'Gheralta Vista Deluxe': 280,
            'Adigrat Executive': 350
        };
        const rate = rates[selectedSuite] || 450;
        return nights > 0 ? nights * rate : 0;
    }, [nights, selectedSuite]);

    if (!isOpen) return null;

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault();
        if (step === 'details' && checkIn && checkOut) setStep('payment');
        else if (step === 'payment') setStep('success');
    };

    const resetAndClose = () => {
        setStep('details');
        setCheckIn(null);
        setCheckOut(null);
        onClose();
    };

    const handleRangeSelect = (start: Date | null, end: Date | null) => {
        setCheckIn(start);
        setCheckOut(end);
    };

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center px-4 overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-title"
        >
            <div
                className="absolute inset-0 bg-forest/95 backdrop-blur-xl animate-in fade-in duration-700"
                onClick={resetAndClose}
                aria-hidden="true"
            />

            <div className="relative bg-sandstone w-full max-w-6xl shadow-2xl rounded-sm overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-700 h-[90vh] md:h-auto max-h-[95vh] flex flex-col md:flex-row border border-white/5">

                {/* Close Button - More Premium Position */}
                <button
                    onClick={resetAndClose}
                    className="absolute top-8 right-8 z-50 p-2 text-forest/40 hover:text-cactus hover:bg-forest/5 rounded-full transition-all group"
                    aria-label="Close booking modal"
                >
                    <Icon name="close" className="text-3xl transform group-hover:rotate-90 transition-transform duration-500" />
                </button>

                {/* Left Summary Sidebar - Enhanced with better typography and hierarchy */}
                <div className="md:w-[38%] bg-forest p-12 flex flex-col justify-between relative overflow-hidden flex-shrink-0 border-r border-white/5">
                    {/* Subtle Decorative Background Pattern */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none canaan-pattern scale-150"></div>

                    <div className="relative z-10 space-y-12">
                        <div className="flex items-center space-x-4">
                            <CanaanLogo className="w-10 h-10 text-cactus animate-pulse-slow" />
                            <div className="h-px w-12 bg-cactus/30"></div>
                        </div>

                        <div className="space-y-10">
                            <div>
                                <h3 id="booking-modal-title" className="text-3xl md:text-4xl font-serif text-sandstone leading-tight">Your Stay in the Highlands</h3>
                                <p className="text-[10px] uppercase tracking-[0.5em] text-cactus font-bold mt-4">Sanctuary Details</p>
                            </div>

                            <div className="space-y-8">
                                <div className="space-y-2 group cursor-default">
                                    <p className="text-[9px] uppercase tracking-widest text-cactus font-bold">Chamber Tier</p>
                                    <p className="text-xl font-serif text-sandstone group-hover:text-cactus transition-colors">{selectedSuite}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-8 border-y border-white/5 py-8">
                                    <div className="space-y-2">
                                        <p className="text-[9px] uppercase tracking-widest text-cactus font-bold">Check-in</p>
                                        <p className="text-lg font-serif text-sandstone">{checkIn ? checkIn.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : '---'}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-[9px] uppercase tracking-widest text-cactus font-bold">Check-out</p>
                                        <p className="text-lg font-serif text-sandstone">{checkOut ? checkOut.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : '---'}</p>
                                    </div>
                                </div>

                                <div className="space-y-6 pt-4" role="region" aria-label="Price summary">
                                    <div className="flex items-center justify-between text-[10px] tracking-widest text-gray-500 uppercase font-bold">
                                        <span>Stay Duration</span>
                                        <span className="text-sandstone">{nights} {nights === 1 ? 'Night' : 'Nights'}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-[11px] tracking-[0.3em] text-cactus uppercase pt-8 border-t border-white/10 font-bold">
                                        <span>Total Investment</span>
                                        <span className="text-4xl md:text-5xl font-serif text-sandstone tracking-tighter">${totalPrice.toLocaleString()}</span>
                                    </div>
                                    <p className="text-[8px] uppercase tracking-widest text-gray-600 text-right font-bold italic">Inclusive of highland heritage tax</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 space-y-6 hidden md:block mt-12 pt-8 border-t border-white/5">
                        <div className="flex items-center space-x-4 text-cactus/40 hover:text-cactus transition-colors duration-500 cursor-default">
                            <Icon name="verified_user" className="text-xl" />
                            <span className="text-[9px] uppercase font-bold tracking-[0.3em]">Best Rate Guaranteed</span>
                        </div>
                        <div className="flex items-center space-x-4 text-cactus/40 hover:text-cactus transition-colors duration-500 cursor-default">
                            <Icon name="lock" className="text-xl" />
                            <span className="text-[9px] uppercase font-bold tracking-[0.3em]">Reserve Your Room</span>
                        </div>
                    </div>
                </div>

                {/* Main Form Content - Clean Sandstone Aesthetic */}
                <div className="flex-1 p-10 md:p-20 overflow-y-auto bg-sandstone custom-scrollbar relative">
                    {step === 'details' && (
                        <form onSubmit={handleNext} className="space-y-12 animate-in slide-in-from-right-10 duration-700">
                            <div className="flex items-end justify-between border-b border-forest/5 pb-8">
                                <div>
                                    <Badge variant="cactus">Phase 01</Badge>
                                    <h2 className="text-4xl md:text-5xl font-serif text-forest mt-4">Personal Details</h2>
                                </div>
                                <div className="text-[10px] uppercase font-bold text-cactus tracking-[0.3em]" aria-label="Step 1 of 2">Identification</div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-3">
                                    <label htmlFor="guest-name" className="text-[10px] uppercase font-bold tracking-widest text-forest/40">Full Legal Name</label>
                                    <input
                                        id="guest-name"
                                        required
                                        type="text"
                                        placeholder="E.g. Alexander Mesob"
                                        className="w-full bg-white/50 border-b-2 border-forest/10 p-4 text-forest font-serif text-lg focus:border-cactus outline-none transition-all placeholder:text-gray-300 placeholder:italic"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label htmlFor="guest-email" className="text-[10px] uppercase font-bold tracking-widest text-forest/40">Digital Address (Email)</label>
                                    <input
                                        id="guest-email"
                                        required
                                        type="email"
                                        placeholder="alex@heritage.com"
                                        className="w-full bg-white/50 border-b-2 border-forest/10 p-4 text-forest font-serif text-lg focus:border-cactus outline-none transition-all placeholder:text-gray-300 placeholder:italic"
                                    />
                                </div>
                            </div>

                            <div className="space-y-6">
                                <label className="text-[10px] uppercase font-bold tracking-widest text-forest/40 flex items-center gap-3">
                                    <Icon name="calendar_month" className="text-cactus text-sm" /> Choose Your Window of Stay
                                </label>
                                <div className="border border-forest/5 shadow-xl rounded-sm overflow-hidden bg-white">
                                    <Calendar
                                        startDate={checkIn}
                                        endDate={checkOut}
                                        onRangeSelect={handleRangeSelect}
                                    />
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className={`w-2 h-2 rounded-full ${!checkIn ? 'bg-cactus animate-ping' : 'bg-cactus'}`}></div>
                                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">
                                        {!checkIn ? 'Awaiting arrival date selection' : !checkOut ? 'Awaiting departure date selection' : 'Stay window secured'}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4 pt-4">
                                <label htmlFor="suite-tier-select" className="text-[10px] uppercase font-bold tracking-widest text-forest/40">Chamber Refinement</label>
                                <div className="relative">
                                    <select
                                        id="suite-tier-select"
                                        value={selectedSuite}
                                        onChange={(e) => setSelectedSuite(e.target.value)}
                                        className="w-full bg-white border border-forest/10 p-6 text-forest font-serif text-xl outline-none appearance-none cursor-pointer hover:border-cactus transition-colors shadow-sm"
                                    >
                                        <option>The Royal Mesob Suite</option>
                                        <option>Gheralta Vista Deluxe</option>
                                        <option>Adigrat Executive</option>
                                    </select>
                                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-cactus">
                                        <Icon name="arrow_forward" className="transform rotate-90" />
                                    </div>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                variant={(!checkIn || !checkOut) ? 'outline' : 'primary'}
                                disabled={!checkIn || !checkOut}
                                className="w-full py-8 text-xs"
                            >
                                Proceed to Sanctuary Checkout <Icon name="arrow_forward" className="text-base ml-2" />
                            </Button>
                        </form>
                    )}

                    {step === 'payment' && (
                        <form onSubmit={handleNext} className="space-y-12 animate-in slide-in-from-right-10 duration-700">
                            <div className="flex items-center justify-between border-b border-forest/5 pb-8">
                                <button
                                    type="button"
                                    onClick={() => setStep('details')}
                                    className="text-[10px] uppercase font-bold text-cactus flex items-center group"
                                >
                                    <Icon name="chevron_left" className="text-base mr-2 transform group-hover:-translate-x-2 transition-transform" /> Return to Identification
                                </button>
                                <div className="text-[10px] uppercase font-bold text-cactus tracking-[0.3em]">Phase 02/02</div>
                            </div>

                            <div>
                                <Badge variant="cactus">Final Step</Badge>
                                <h2 className="text-4xl md:text-5xl font-serif text-forest mt-4">Secure Checkout</h2>
                                <p className="text-gray-400 mt-4 font-light text-lg">Your data is encrypted with the same rigidity as our highland basalt foundations.</p>
                            </div>

                            <div className="space-y-10">
                                <div className="space-y-3">
                                    <label htmlFor="card-number" className="text-[10px] uppercase font-bold tracking-widest text-forest/40">Secure Card Number</label>
                                    <div className="relative">
                                        <input
                                            id="card-number"
                                            required
                                            type="text"
                                            placeholder="4000 0000 0000 0000"
                                            className="w-full bg-white border border-forest/10 p-6 text-forest font-serif text-xl focus:border-cactus outline-none transition-all shadow-sm"
                                        />
                                        <Icon name="credit_card" className="absolute right-6 top-1/2 -translate-y-1/2 text-forest/20 text-3xl" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-10">
                                    <div className="space-y-3">
                                        <label htmlFor="card-expiry" className="text-[10px] uppercase font-bold tracking-widest text-forest/40">Expiry Window (MM/YY)</label>
                                        <input id="card-expiry" required type="text" placeholder="12/28" className="w-full bg-white border border-forest/10 p-6 text-forest font-serif text-xl outline-none focus:border-cactus transition-all shadow-sm" />
                                    </div>
                                    <div className="space-y-3">
                                        <label htmlFor="card-cvv" className="text-[10px] uppercase font-bold tracking-widest text-forest/40">Security Key (CVV)</label>
                                        <input id="card-cvv" required type="password" placeholder="***" className="w-full bg-white border border-forest/10 p-6 text-forest font-serif text-xl outline-none focus:border-cactus transition-all shadow-sm" />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-8 border border-cactus/10 rounded-sm shadow-sm relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-1 h-full bg-cactus"></div>
                                <p className="text-sm text-gray-500 leading-relaxed italic relative z-10">
                                    &quot;By completing this reservation, you become a guest of Canaan International Hotel. We look forward to your arrival in Adigrat.&quot;
                                </p>
                            </div>

                            <Button
                                type="submit"
                                className="w-full py-8 text-xs"
                            >
                                Seal Your Reservation <Icon name="lock" className="text-base ml-2" />
                            </Button>
                        </form>
                    )}

                    {step === 'success' && (
                        <div className="h-full flex flex-col items-center justify-center text-center py-20 animate-in zoom-in-95 duration-1000" role="alert" aria-live="polite">
                            <div className="relative mb-12">
                                <div className="absolute inset-0 bg-cactus/20 rounded-full animate-ping"></div>
                                <div className="w-28 h-28 bg-white border-2 border-cactus rounded-full flex items-center justify-center shadow-2xl relative z-10">
                                    <Icon name="check_circle" className="text-cactus text-6xl" />
                                </div>
                            </div>
                            <Badge variant="cactus">Experience Secured</Badge>
                            <h2 className="text-5xl md:text-6xl font-serif text-forest mt-8 mb-6">Welcome to the Tower</h2>
                            <p className="text-gray-500 text-lg mb-16 max-w-sm mx-auto leading-relaxed font-light italic">
                                A formal invitation and digital itinerary have been dispatched to your address. The highlands are calling.
                            </p>
                            <Button
                                onClick={resetAndClose}
                                variant="outline"
                                className="px-20 py-6"
                            >
                                Return to the Sanctuary Home
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
