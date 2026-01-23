"use client";

import OptimizedImage from "./OptimizedImage";

interface RoomImageCardProps {
  src: string;
  alt: string;
  title: string;
  description: string;
  price: string;
  linkHref: string;
  className?: string;
}

export default function RoomImageCard({
  src,
  alt,
  title,
  description,
  price,
  linkHref,
  className = ""
}: RoomImageCardProps) {
  return (
    <div className={`flex flex-col group overflow-hidden rounded-xl border border-border-color dark:border-text-secondary/10 bg-white dark:bg-background-dark/50 hover:shadow-lg dark:hover:border-text-secondary/20 transition-all duration-300 ${className}`}>
      <div className="overflow-hidden">
        <OptimizedImage
          src={src}
          alt={alt}
          width={400}
          height={225}
          className="w-full h-48 object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={75}
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-text-primary dark:text-background-light text-lg font-bold leading-normal">
          {title}
        </h3>
        <p className="text-text-secondary dark:text-text-secondary/90 text-sm font-normal leading-normal mt-1">
          {description}
        </p>
        <p className="text-text-secondary dark:text-text-secondary/90 text-sm font-bold leading-normal mt-2 mb-4">
          {price}
        </p>
        <a 
          href={linkHref}
          className="mt-auto flex min-w-[84px] max-w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 px-5 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] w-full hover:opacity-90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <span className="truncate">VIEW DETAILS & BOOK</span>
        </a>
      </div>
    </div>
  );
}