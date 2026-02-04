"use client";

import React from "react";
import TestimonialCard from "./TestimonialCard"; // Import the new card component
import { TESTIMONIALS } from "@/lib/testimonialsData"; // Import centralized data

export default function Testimonials() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="guest-reviews">
      <div className="max-w-7xl mx-auto"> {/* Changed to max-w-7xl for wider grid */}
        <div className="text-center mb-12">
          <h2 id="guest-reviews" className="text-3xl font-bold tracking-tight text-text-primary dark:text-background-light mb-4">
            What Our Guests Say
          </h2>
          <p className="text-lg text-text-secondary dark:text-text-secondary/90 max-w-2xl mx-auto">
            Real reviews from satisfied travelers across different platforms
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              rating={testimonial.rating}
              avatarSrc={testimonial.avatarSrc}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
