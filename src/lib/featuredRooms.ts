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
    slug: "standard",
    imageSrc: "/images/rooms/Bed-view-Single.webp",
    imageAlt: "Standard Room",
    name: "Standard Room",
    description: "Comfortable standard room with essential amenities. Perfect for solo travelers seeking quality accommodation at an affordable price.",
    priceLabel: "From $25/night",
    pricePerNight: 25,
    badges: ["Free Wi-Fi", "Private Bath"],
    rating: 4.2,
    maxGuests: 1,
  },
  {
    slug: "delux",
    imageSrc: "/images/rooms/twin-room.webp",
    imageAlt: "Delux Room",
    name: "Delux Room",
    description: "Spacious delux room with modern amenities. Ideal for couples or business travelers who want extra comfort.",
    priceLabel: "From $32/night",
    pricePerNight: 32,
    badges: ["Free Wi-Fi", "Modern Bath", "Work Desk"],
    rating: 4.4,
    maxGuests: 2,
  },
  {
    slug: "king",
    imageSrc: "/images/rooms/single-room-view.webp",
    imageAlt: "King Room",
    name: "King Room",
    description: "Luxurious king room with premium amenities. Perfect for guests seeking a premium stay experience.",
    priceLabel: "From $40/night",
    pricePerNight: 40,
    badges: ["Free Wi-Fi", "Premium Bath", "King Bed", "Work Desk"],
    rating: 4.6,
    maxGuests: 2,
  },
  {
    slug: "twin",
    imageSrc: "/images/rooms/single-room-best-view.webp",
    imageAlt: "Twin Room",
    name: "Twin Room",
    description: "Room with two single beds. Great for friends or colleagues traveling together.",
    priceLabel: "From $45/night",
    pricePerNight: 45,
    badges: ["Free Wi-Fi", "Two Beds", "Work Desk"],
    rating: 4.3,
    maxGuests: 2,
  },
  {
    slug: "semi-suit",
    imageSrc: "/images/rooms/single-room-view.webp",
    imageAlt: "Semi Suit Room",
    name: "Semi Suit Room",
    description: "Semi-suit with extra space and amenities. For guests who want more space and luxury.",
    priceLabel: "From $50/night",
    pricePerNight: 50,
    badges: ["Free Wi-Fi", "Extra Space", "Premium Bath", "Seating Area"],
    rating: 4.5,
    maxGuests: 2,
  },
  {
    slug: "suit",
    imageSrc: "/images/rooms/single-room-best-view.webp",
    imageAlt: "Suit Room",
    name: "Suit Room",
    description: "Premium suit with luxury amenities. The ultimate Canaan experience.",
    priceLabel: "From $55/night",
    pricePerNight: 55,
    badges: ["Free Wi-Fi", "Luxury Bath", "King Bed", "Seating Area", "Premium View"],
    rating: 4.8,
    maxGuests: 2,
  },
];