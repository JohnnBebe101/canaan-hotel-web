"use client";

import Link from "next/link";
import OptimizedImage from "./OptimizedImage";

interface Badge {
  text: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}

interface CardProps {
  image: {
    src: string;
    alt: string;
  };
  title: string;
  description: string;
  badges?: Badge[];
  price?: string;
  rating?: number;
  button: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
  className?: string;
}

const badgeVariantStyles: Record<NonNullable<Badge['variant']>, string> = {
  primary: 'bg-primary/10 text-primary border-primary/20',
  secondary: 'bg-text-secondary/10 text-text-secondary border-text-secondary/20',
  success: 'bg-green-100 text-green-800 border-green-200',
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  error: 'bg-red-100 text-red-800 border-red-200',
};

function StarRating({ rating }: { rating: number }) {
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
}

export default function Card({
  image,
  title,
  description,
  badges = [],
  price,
  rating,
  button,
  className = ""
}: CardProps) {
  const buttonElement = button.href ? (
    <Link
      href={button.href}
      className="mt-auto flex min-w-[84px] max-w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 px-5 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] w-full hover:opacity-90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
    >
      <span className="truncate">{button.text}</span>
    </Link>
  ) : (
    <button
      onClick={button.onClick}
      className="mt-auto flex min-w-[84px] max-w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 px-5 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] w-full hover:opacity-90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
    >
      <span className="truncate">{button.text}</span>
    </button>
  );

  return (
    <div className={`flex flex-col group overflow-hidden rounded-xl border border-border-color dark:border-text-secondary/10 bg-white dark:bg-background-dark/50 hover:shadow-lg dark:hover:border-text-secondary/20 transition-all duration-300 ${className}`}>
      <div className="overflow-hidden">
        <OptimizedImage
          src={image.src}
          alt={image.alt}
          width={400}
          height={225}
          className="w-full h-48 object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={75}
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        {badges.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {badges.map((badge, index) => (
              <span
                key={index}
                className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${
                  badgeVariantStyles[badge.variant || 'primary']
                }`}
              >
                {badge.text}
              </span>
            ))}
          </div>
        )}
        <h3 className="text-text-primary dark:text-background-light text-lg font-bold leading-normal">
          {title}
        </h3>
        <p className="text-text-secondary dark:text-text-secondary/90 text-sm font-normal leading-normal mt-1">
          {description}
        </p>
        {(price || rating) && (
          <div className="mt-2 mb-4">
            {price && (
              <p className="text-text-secondary dark:text-text-secondary/90 text-sm font-bold leading-normal">
                {price}
              </p>
            )}
            {rating && <StarRating rating={rating} />}
          </div>
        )}
        {buttonElement}
      </div>
    </div>
  );
}