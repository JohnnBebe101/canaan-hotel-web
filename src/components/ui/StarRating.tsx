import React from "react";

interface StarRatingProps {
    rating: number;
    max?: number;
    className?: string;
    iconSize?: string;
}

export default function StarRating({
    rating,
    max = 5,
    className = "",
    iconSize = "text-sm",
}: StarRatingProps) {
    const roundedRating = Math.round(rating);

    return (
        <div className={`flex items-center gap-0.5 ${className}`}>
            {Array.from({ length: max }).map((_, index) => {
                const isFilled = index < roundedRating;
                return (
                    <span
                        key={index}
                        className={`material-symbols-outlined ${iconSize} ${isFilled ? "text-primary" : "text-gray-300 dark:text-gray-600"
                            }`}
                        style={{ fontVariationSettings: isFilled ? "'FILL' 1" : "'FILL' 0" }}
                    >
                        star
                    </span>
                );
            })}
        </div>
    );
}
