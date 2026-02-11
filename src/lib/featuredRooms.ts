export interface FeaturedRoom {
  slug: string;
  imageSrc: string;
  imageAlt: string;
  name: string;
  description: string;
  priceLabel: string;
  badges: string[];
  rating: number;
}

export const FEATURED_ROOMS: FeaturedRoom[] = [
  {
    slug: "standard-room",
    imageSrc: "/images/Bed-Single.svg",
    imageAlt: "Standard Room with comfortable amenities",
    name: "Standard Room",
    description: "Comfortable room with essential amenities for a pleasant stay.",
    priceLabel: "From $45/night",
    badges: ["Free WiFi", "Air Conditioning"],
    rating: 4.5,
  },
  {
    slug: "deluxe-room",
    imageSrc: "/images/Twin-Room.svg",
    imageAlt: "Deluxe Room with premium furnishings",
    name: "Deluxe Room",
    description: "Spacious room with premium furnishings and enhanced amenities.",
    priceLabel: "From $75/night",
    badges: ["Free WiFi", "Room Service", "Breakfast Included"],
    rating: 4.8,
  },
  {
    slug: "family-room",
    imageSrc: "/images/Room-Larger.svg",
    imageAlt: "Family Room with multiple beds",
    name: "Family Room",
    description: "Spacious accommodation perfect for families, with multiple beds and extra space.",
    priceLabel: "From $95/night",
    badges: ["Free WiFi", "Breakfast Included", "Extra Beds"],
    rating: 4.7,
  },
  {
    slug: "suite",
    imageSrc: "/images/Room-Best-View.svg",
    imageAlt: "Luxury Suite with living area",
    name: "Luxury Suite",
    description: "Expansive suite with separate living area and premium finishes.",
    priceLabel: "From $120/night",
    badges: ["Free WiFi", "Room Service", "Breakfast Included", "Minibar"],
    rating: 5.0,
  },
];
