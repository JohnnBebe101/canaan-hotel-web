export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  rating: number;
  avatarSrc: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    quote: "An exceptional stay! The staff went above and beyond to make our anniversary special. The room was immaculate and the views of the mountains were breathtaking.",
    author: "Sarah Johnson",
    role: "Business Traveler",
    rating: 5,
    avatarSrc: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=FF6B35&color=fff",
  },
  {
    id: "2",
    quote: "Perfect location in Adigrat. Clean, comfortable, and great value. The included breakfast was delicious with a good selection of local and international options.",
    author: "Michael Chen",
    role: "Solo Explorer",
    rating: 5,
    avatarSrc: "https://ui-avatars.com/api/?name=Michael+Chen&background=4A90A4&color=fff",
  },
  {
    id: "3",
    quote: "We stayed here while exploring the ancient churches of Tigray. The hotel arranged excellent guides for us. Highly recommend for anyone visiting the region!",
    author: "Emma Williams",
    role: "Family Vacation",
    rating: 5,
    avatarSrc: "https://ui-avatars.com/api/?name=Emma+Williams&background=7B68EE&color=fff",
  },
];
