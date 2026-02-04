export interface Testimonial {
  id: string; // Add a unique ID for mapping
  quote: string;
  author: string;
  role?: string; // Optional role for the author
  rating: number; // 1-5 stars
  ota?: string; // e.g., 'Booking.com', 'Expedia', 'TripAdvisor'
  avatarSrc?: string; // Optional: for author image
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    quote:
      "An exceptional stay at Canaan Hotel! The rooms were immaculate, the staff incredibly welcoming, and the location perfect for exploring the area. Highly recommend!",
    author: "Sarah Johnson",
    role: "Frequent Traveler",
    rating: 5,
    ota: "Booking.com",
    avatarSrc: "/assets/images/user-sarah.jpg", // Placeholder if you add user avatars
  },
  {
    id: "2",
    quote:
      "Wonderful experience from start to finish. The amenities were top-notch, and the breakfast was delicious. Will definitely return!",
    author: "Michael Chen",
    role: "Business Guest",
    rating: 5,
    ota: "Expedia",
    avatarSrc: "/assets/images/user-michael.jpg",
  },
  {
    id: "3",
    quote:
      "Great value for money. Clean, comfortable, and the service was outstanding. The hotel exceeded our expectations.",
    author: "Emma Rodriguez",
    role: "Family Vacationer",
    rating: 4,
    ota: "TripAdvisor",
    avatarSrc: "/assets/images/user-emma.jpg",
  },
  {
    id: "4",
    quote:
      "A peaceful retreat with beautiful surroundings. The staff went above and beyond to make our stay memorable.",
    author: "David Kim",
    role: "Solo Adventurer",
    rating: 5,
    ota: "Agoda",
    avatarSrc: "/assets/images/user-david.jpg",
  },
  {
    id: "5",
    quote:
      "The best hotel experience in Adigrat. Every detail was perfect, from the room service to the helpful concierge. Truly a five-star stay!",
    author: "Jessica Lee",
    role: "Luxury Seeker",
    rating: 5,
    ota: "Booking.com",
    avatarSrc: "/assets/images/user-jessica.jpg",
  },
];

export function getTestimonials(): Testimonial[] {
  return TESTIMONIALS;
}
