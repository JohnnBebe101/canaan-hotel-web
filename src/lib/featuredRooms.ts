export interface FeaturedRoom {
  slug: string;
  imageSrc: string;
  imageAlt: string;
  name: string;
  description: string;
  priceLabel: string;
  badges?: string[];
  rating?: number;
}

export const FEATURED_ROOMS: FeaturedRoom[] = [
  {
    slug: "economy-single",
    imageSrc: "/images/Gate.svg",
    imageAlt: "Economy Single Room with city view",
    name: "Economy Single Room",
    description: "Perfect for solo travelers with a stunning city view.",
    priceLabel: "From $50 / night",
    badges: ["Great value"],
    rating: 4.5,
  },
  {
    slug: "comfort-double",
    imageSrc: "/images/Room-Larger.svg",
    imageAlt: "Comfort Double Room with private balcony",
    name: "Comfort Double Room",
    description: "Spacious comfort for couples, featuring a private balcony.",
    priceLabel: "From $75 / night",
    badges: ["Best seller"],
    rating: 4.8,
  },
  {
    slug: "family-suite",
    imageSrc: "/images/Twin-Room.svg",
    imageAlt: "Family Suite with multiple beds and extra space",
    name: "Family Suite",
    description: "Ideal for families, with multiple beds and extra space.",
    priceLabel: "From $110 / night",
    badges: ["Family friendly"],
    rating: 4.7,
  },
];

