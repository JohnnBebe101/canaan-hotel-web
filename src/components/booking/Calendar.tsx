
"use client";

import React from "react";

interface CalendarProps {
    startDate: Date | null;
    endDate: Date | null;
    onRangeSelect: (start: Date | null, end: Date | null) => void;
}

export default function Calendar({ startDate, endDate, onRangeSelect }: CalendarProps) {
    // Simplified calendar implementation for the first pass.
    // In a real production app, we might use date-fns or a library like react-day-picker.
    // For now, we'll use native date inputs styled to look custom, 
    // or a basic custom implementation to match the design.

    // Let's implement a simple custom view to match the "highland" aesthetic.
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

    const isSelected = (day: number) => {
        const date = new Date(currentYear, currentMonth, day);
        if (startDate && date.getTime() === startDate.getTime()) return true;
        if (endDate && date.getTime() === endDate.getTime()) return true;
        if (startDate && endDate && date > startDate && date < endDate) return true;
        return false;
    };

    const handleDateClick = (day: number) => {
        const clickedDate = new Date(currentYear, currentMonth, day);

        if (!startDate || (startDate && endDate)) {
            onRangeSelect(clickedDate, null);
        } else if (startDate && !endDate) {
            if (clickedDate < startDate) {
                onRangeSelect(clickedDate, null);
            } else {
                onRangeSelect(startDate, clickedDate);
            }
        }
    };

    return (
        <div className="p-6 bg-white">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-serif font-bold text-forest">
                    {today.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </h3>
                <div className="flex gap-2">
                    {/* Navigation placeholders */}
                    <button className="p-1 hover:bg-sandstone rounded-full transition-colors text-cactus">
                        <span className="material-symbols-outlined text-sm">chevron_left</span>
                    </button>
                    <button className="p-1 hover:bg-sandstone rounded-full transition-colors text-cactus">
                        <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-7 gap-1 mb-2">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                    <div key={d} className="text-center text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                        {d}
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
                {blanks.map((_, i) => (
                    <div key={`blank-${i}`} className="aspect-square" />
                ))}
                {days.map((day) => {
                    const date = new Date(currentYear, currentMonth, day);
                    const isStart = startDate && date.getTime() === startDate.getTime();
                    const isEnd = endDate && date.getTime() === endDate.getTime();
                    const inRange = startDate && endDate && date > startDate && date < endDate;
                    const selected = isStart || isEnd || inRange;

                    return (
                        <button
                            key={day}
                            onClick={() => handleDateClick(day)}
                            className={`aspect-square flex items-center justify-center text-sm transition-all duration-300 rounded-full
                    ${isStart || isEnd ? 'bg-cactus text-white shadow-md scale-105 z-10' : ''}
                    ${inRange ? 'bg-cactus/10 text-cactus' : ''}
                    ${!selected ? 'hover:bg-sandstone text-forest' : ''}
                `}
                        >
                            {day}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
