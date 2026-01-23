'use client';

import React, { useState } from 'react';

interface Testimonial {
  text: string;
  author: string;
  rating: number; // 1-5 stars
  ota: string; // e.g., 'Booking.com', 'Expedia', 'TripAdvisor'
}

const testimonials: Testimonial[] = [
  {
    text: "An exceptional stay at Canaan Hotel! The rooms were immaculate, the staff incredibly welcoming, and the location perfect for exploring the area. Highly recommend!",
    author: "Sarah Johnson",
    rating: 5,
    ota: "Booking.com"
  },
  {
    text: "Wonderful experience from start to finish. The amenities were top-notch, and the breakfast was delicious. Will definitely return!",
    author: "Michael Chen",
    rating: 5,
    ota: "Expedia"
  },
  {
    text: "Great value for money. Clean, comfortable, and the service was outstanding. The hotel exceeded our expectations.",
    author: "Emma Rodriguez",
    rating: 4,
    ota: "TripAdvisor"
  },
  {
    text: "A peaceful retreat with beautiful surroundings. The staff went above and beyond to make our stay memorable.",
    author: "David Kim",
    rating: 5,
    ota: "Agoda"
  }
];

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={`icon-[tabler--star] text-sm ${
            i < Math.floor(rating)
              ? 'text-yellow-400 fill-yellow-400'
              : 'text-gray-300'
          }`}
        />
      ))}
      <span className="text-text-secondary dark:text-text-secondary/90 text-sm ml-1">
        ({rating})
      </span>
    </div>
  );
};

const OTABadge: React.FC<{ ota: string }> = ({ ota }) => {
  const badgeStyles = {
    'Booking.com': 'bg-blue-100 text-blue-800 border-blue-200',
    'Expedia': 'bg-green-100 text-green-800 border-green-200',
    'TripAdvisor': 'bg-purple-100 text-purple-800 border-purple-200',
    'Agoda': 'bg-orange-100 text-orange-800 border-orange-200'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
      badgeStyles[ota as keyof typeof badgeStyles] || 'bg-gray-100 text-gray-800 border-gray-200'
    }`}>
      {ota}
    </span>
  );
};

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="guest-reviews">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 id="guest-reviews" className="text-3xl font-bold tracking-tight text-text-primary dark:text-background-light mb-4">
            What Our Guests Say
          </h2>
          <p className="text-lg text-text-secondary dark:text-text-secondary/90 max-w-2xl mx-auto">
            Real reviews from satisfied travelers across different platforms
          </p>
        </div>

        <div className="relative bg-white dark:bg-background-dark/50 rounded-xl shadow-lg p-8 md:p-12 border border-border-color dark:border-text-secondary/10">
          {/* Testimonial Content */}
          <div className="text-center mb-8">
            <StarRating rating={currentTestimonial.rating} />
            <blockquote className="mt-4 text-lg text-text-primary dark:text-background-light italic leading-relaxed">
              "{currentTestimonial.text}"
            </blockquote>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
              <cite className="font-semibold text-text-primary dark:text-background-light">{currentTestimonial.author}</cite>
              <OTABadge ota={currentTestimonial.ota} />
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={prevTestimonial}
              className="flex items-center justify-center w-12 h-12 bg-background-light dark:bg-background-dark hover:bg-gray-100 dark:hover:bg-text-secondary/10 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Previous testimonial"
            >
              <span className="icon-[tabler--chevron-left] text-text-secondary dark:text-text-secondary/90 text-xl" />
            </button>

            {/* Dots */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                    index === currentIndex ? 'bg-primary' : 'bg-text-secondary/30 dark:bg-text-secondary/50 hover:bg-text-secondary/50 dark:hover:bg-text-secondary/70'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="flex items-center justify-center w-12 h-12 bg-background-light dark:bg-background-dark hover:bg-gray-100 dark:hover:bg-text-secondary/10 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Next testimonial"
            >
              <span className="icon-[tabler--chevron-right] text-text-secondary dark:text-text-secondary/90 text-xl" />
            </button>
          </div>
        </div>

        {/* Testimonial Counter */}
        <div className="text-center mt-6 text-sm text-text-secondary dark:text-text-secondary/90">
          {currentIndex + 1} of {testimonials.length}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;