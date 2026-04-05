import React from "react";
import { Star } from "lucide-react";

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
                    <Star
                        key={index}
                        className={`${iconSize} ${isFilled ? "fill-primary text-primary" : "text-gray-300 dark:text-gray-600"
                            }`}
                    />
                );
            })}
        </div>
    );
}
