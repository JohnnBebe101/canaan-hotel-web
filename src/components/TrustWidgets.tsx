"use client";

import Link from "next/link";
import StarRating from "./ui/StarRating";
import Badge from "./ui/Badge";
import Button from "./ui/Button";

interface BusinessProfileCardProps {
  rating: number;
  reviewCount: number;
  badge: string;
  platform: "tripadvisor" | "google";
}

function BusinessProfileCard({
  rating,
  reviewCount,
  badge,
  platform,
}: BusinessProfileCardProps) {
  const colors = {
    tripadvisor: {
      bg: "bg-green-50 dark:bg-green-900/20",
      text: "text-green-800 dark:text-green-300",
      accent: "#00AF87",
    },
    google: {
      bg: "bg-blue-50 dark:bg-blue-900/20",
      text: "text-blue-800 dark:text-blue-300",
      accent: "#4285F4",
    },
  };

  const color = colors[platform];

  return (
    <div
      className={`flex flex-col items-center p-6 rounded-xl border border-border-color dark:border-text-secondary/20 ${color.bg}`}
    >
      <div className="mb-4">
        {platform === "tripadvisor" ? (
          <svg
            className="h-8 w-auto"
            viewBox="0 0 24 24"
            fill={color.accent}
            aria-hidden="true"
          >
            <path d="M12.017 0C5.396 0 .017 5.379.017 11.993c0 5.488 4.015 10.579 9.783 12.387.356-2.339 1.781-4.657 3.402-6.168l4.502-2.596c.398-.23.632-.666.632-1.125v-.004c0-.746-.546-1.371-1.277-1.457-.731-.086-1.453.35-1.773 1.07l-2.549 5.74c-.091.206-.308.326-.52.326h-.143c-.207 0-.422-.114-.517-.312l-3.043-6.34c-.098-.204-.298-.326-.517-.326h-5.604c-.133 0-.258-.064-.333-.175s-.102-.255-.062-.389l1.674-5.608c.057-.19.222-.32.409-.32h8.91c.187 0 .352.13.409.32l1.674 5.608c.04.134.015.289-.062.389-.075.111-.2.175-.333.175h-4.27c.373.753.662 1.533.859 2.334h4.411c.219 0 .419.122.517.326l3.043 6.34c.095.198.31.312.517.312h.143c.212 0 .429-.12.52-.326l2.549-5.74c.32-.72 1.042-1.156 1.773-1.07.731.086 1.277.711 1.277 1.457v.004c0 .459-.234.895-.632 1.125l-4.502 2.596c-1.621 1.511-3.046 3.829-3.402 6.168-5.768-1.808-9.783-6.899-9.783-12.387C.017 5.379 5.396 0 12.017 0z" />
          </svg>
        ) : (
          <svg
            className="h-8 w-auto"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path fill={color.accent} d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
          </svg>
        )}
      </div>

      <div className="flex items-center gap-2 mb-2">
        <span className="text-3xl font-bold text-text-primary dark:text-background-light">
          {rating}
        </span>
        <StarRating rating={rating} iconSize="text-xl" />
      </div>

      <Badge variant={platform === "tripadvisor" ? "success" : "info"} size="sm">
        {badge}
      </Badge>

      <p className="text-sm text-text-secondary dark:text-text-secondary/70 mt-2">
        {reviewCount.toLocaleString()} reviews
      </p>
    </div>
  );
}

function WhyBookDirectCard() {
  const features = [
    { icon: "sell", text: "Best Price Guarantee" },
    { icon: "star", text: "Exclusive Offers" },
    { icon: "task_alt", text: "Flexible Cancellation" },
  ];

  return (
    <div className="flex flex-col items-center p-6 rounded-xl border border-border-color dark:border-text-secondary/20 bg-amber-50 dark:bg-amber-900/20">
      <div className="mb-4">
        <span className="material-symbols-outlined text-4xl text-amber-600">verified</span>
      </div>

      <h3 className="text-lg font-bold text-text-primary dark:text-background-light mb-4">
        Why Book Direct
      </h3>

      <ul className="space-y-3 w-full">
        {features.map((feature) => (
          <li key={feature.text} className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">check_circle</span>
            <span className="text-sm text-text-secondary dark:text-text-secondary/90">
              {feature.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function TrustWidgets() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="trust-widgets">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2
            id="trust-widgets"
            className="text-3xl font-bold tracking-tight text-text-primary dark:text-background-light mb-4"
          >
            Trusted by Travelers
          </h2>
          <p className="mx-auto max-w-2xl text-text-secondary dark:text-text-secondary/90">
            Join thousands of satisfied guests who have experienced our hospitality
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <BusinessProfileCard
            rating={4.5}
            reviewCount={127}
            badge="Travelers' Choice"
            platform="tripadvisor"
          />
          <BusinessProfileCard
            rating={4.7}
            reviewCount={89}
            badge="Highly Recommended"
            platform="google"
          />
          <WhyBookDirectCard />
        </div>

        <div className="text-center mt-10">
          <p className="text-text-secondary dark:text-text-secondary/90 mb-4">
            Have questions? Our team is here to help.
          </p>
          <Button size="lg" className="px-12">
            <Link href="/contact">Email Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
