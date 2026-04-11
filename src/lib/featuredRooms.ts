export interface FeaturedRoom {
  slug: string;
  imageSrc: string;
  imageAlt: string;
  name: string;
  description: string;
  priceLabel: string;
  pricePerNight: number;
  badges: string[];
  rating: number;
  maxGuests: number;
}

export const FEATURED_ROOMS: FeaturedRoom[] = [
  {
    slug: "economy-single",
    imageSrc: "/images/rooms/Bed-view-Single.webp",
    imageAlt: "Economy Single Room with comfortable single bed",
    name: "Economy Single Room",
    description: "A well-appointed single room with a comfortable single bed, private en-suite bathroom with rainfall shower, free Wi-Fi, flat-screen TV, and all the essentials for a productive stay. Ideal for the solo traveler or business guest.",
    priceLabel: "From $45/night",
    pricePerNight: 45,
    badges: ["Free Wi-Fi", "Rainfall Shower", "TV", "Desk"],
    rating: 4.2,
    maxGuests: 1,
  },
  {
    slug: "economy-double",
    imageSrc: "/images/rooms/twin-room.webp",
    imageAlt: "Economy Double Room with comfortable double bed",
    name: "Economy Double Room",
    description: "A spacious double room with a comfortable double bed, private en-suite bathroom with rainfall shower, free Wi-Fi, flat-screen TV, and a work desk. The right choice for couples or guests who prefer more space.",
    priceLabel: "From $75/night",
    pricePerNight: 75,
    badges: ["Free Wi-Fi", "Rainfall Shower", "TV", "Desk"],
    rating: 4.4,
    maxGuests: 2,
  },
  {
    slug: "family-room",
    imageSrc: "/images/rooms/single-room-view.webp",
    imageAlt: "Family Room with multiple beds",
    name: "Family Room",
    description: "Generously proportioned accommodation for families traveling together. Multiple beds, private en-suite bathroom with rainfall shower, free Wi-Fi, flat-screen TV, and daily housekeeping.",
    priceLabel: "From $95/night",
    pricePerNight: 95,
    badges: ["Free Wi-Fi", "Breakfast Included", "Extra Beds"],
    rating: 4.6,
    maxGuests: 4,
  },
  {
    slug: "comfort-double",
    imageSrc: "/images/rooms/single-room-best-view.webp",
    imageAlt: "Comfort Double Room with king bed",
    name: "Comfort Double Room",
    description: "Our finest room category. A generous king-bed room with premium finishes, private en-suite bathroom with rainfall shower, free Wi-Fi, flat-screen TV, and a work desk. The choice of guests who want the best Canaan has to offer.",
    priceLabel: "From $120/night",
    pricePerNight: 120,
    badges: ["Free Wi-Fi", "Rainfall Shower", "TV", "Desk", "King Bed"],
    rating: 4.8,
    maxGuests: 2,
  },
];
