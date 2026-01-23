"use client";

import OptimizedImage from "./OptimizedImage";

interface HeroImageProps {
  src: string;
  alt: string;
  overlayOpacity?: number;
  className?: string;
  priority?: boolean;
}

export default function HeroImage({
  src,
  alt,
  overlayOpacity = 0.4,
  className = "",
  priority = true
}: HeroImageProps) {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <OptimizedImage
        src={src}
        alt={alt}
        fill
        priority={priority}
        className="object-cover"
        sizes="100vw"
        quality={80}
        unoptimized={src.endsWith('.svg')}
      />
      {/* Gradient overlay */}
      <div 
        className="absolute inset-0" 
        style={{ 
          background: `linear-gradient(rgba(0, 0, 0, ${overlayOpacity}) 0%, rgba(0, 0, 0, ${overlayOpacity * 1.25}) 100%)` 
        }}
      />
    </div>
  );
}