"use client";

import React from "react";
// Assuming OptimizedImage could be used if we had images for testimonials,
// but for now, we'll keep it simple with text-based avatars or placeholder SVGs.

interface TestimonialCardProps {
  quote: string;
  author: string;
  role?: string; // Optional role/title for the author
  rating?: number; // 0-5 stars
  avatarSrc?: string; // Optional avatar image source
}

export default function TestimonialCard({
  quote,
  author,
  role,
  rating,
  avatarSrc,
}: TestimonialCardProps) {
  return (
    <div className="flex flex-col rounded-xl border border-border-color bg-white p-6 shadow-sm dark:border-text-secondary/20 dark:bg-background-dark/70 transition-all duration-300 hover:shadow-lg">
      {/* Star Rating (if provided) */}
      {typeof rating === "number" && rating > 0 && (
        <div className="mb-3 flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, index) => (
            <svg
              key={index}
              className={`h-4 w-4 ${
                index < Math.floor(rating) ? "text-primary" : "text-gray-300 dark:text-gray-600"
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.18 3.63a1 1 0 00.95.69h3.813c.969 0 1.371 1.24.588 1.81l-3.085 2.24a1 1 0 00-.364 1.118l1.18 3.63c.3.921-.755 1.688-1.54 1.118l-3.085-2.24a1 1 0 00-1.176 0l-3.085 2.24c-.785.57-1.84-.197-1.54-1.118l1.18-3.63a1 1 0 00-.364-1.118L2.518 9.057c-.783-.57-.38-1.81.588-1.81h3.813a1 1 0 00.95-.69l1.18-3.63z" />
            </svg>
          ))}
        </div>
      )}

      {/* Quote */}
      <blockquote className="flex-1 text-base italic leading-relaxed text-text-primary dark:text-background-light">
        "{quote}"
      </blockquote>

      {/* Author Info */}
      <div className="mt-4 flex items-center">
        {avatarSrc ? (
          // <OptimizedImage src={avatarSrc} alt={author} width={40} height={40} className="h-10 w-10 rounded-full object-cover mr-3" />
          // Using a simple div for now as OptimizedImage requires src and alt, and we don't have testimonial images yet.
          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-text-secondary mr-3">
            {author.charAt(0)}
          </div>
        ) : (
          <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg mr-3">
            {author.charAt(0)}
          </div>
        )}
        <div>
          <p className="font-semibold text-text-primary dark:text-background-light">
            {author}
          </p>
          {role && (
            <p className="text-sm text-text-secondary dark:text-text-secondary/90">
              {role}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}