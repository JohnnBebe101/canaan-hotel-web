"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface HeroSliderProps {
  images: { src: string; alt: string }[];
  intervalMs?: number;
}

const HeroSlider: React.FC<HeroSliderProps> = ({
  images,
  intervalMs = 5000,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, intervalMs);
  };

  const pauseAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    if (!isHovered) {
      startAutoPlay();
    }
    return () => pauseAutoPlay(); // Cleanup on unmount
  }, [images, intervalMs, isHovered]);

  const handleDotClick = (index: number) => {
    setCurrentImageIndex(index);
    // Restart autoplay after manual selection
    if (!isHovered) {
      startAutoPlay();
    }
  };

  return (
    <div
      className="absolute inset-0 w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {images.map((image, index) => (
        <Image
          key={image.src}
          src={image.src}
          alt={image.alt}
          layout="fill"
          objectFit="cover"
          priority={index === 0} // Only apply priority to the first image
          quality={90}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Slider dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              index === currentImageIndex ? "bg-white scale-125" : "bg-gray-400 hover:bg-gray-300"
            }`}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
