"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function NavigationProgress() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    setIsNavigating(true);
    setProgress(15);

    const timer1 = setTimeout(() => setProgress(85), 100);
    const timer2 = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setTimeout(() => setProgress(0), 200);
      }, 200);
    }, 300);

    const cleanupTimer = setTimeout(() => setIsNavigating(false), 600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(cleanupTimer);
    };
  }, [pathname]);

  if (progress === 0) return null;

  return (
    <div
      className="fixed top-0 left-0 z-[9999] w-full h-[3px] bg-transparent"
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full bg-bronze transition-all duration-300 ease-in-out"
        style={{
          width: `${progress}%`,
          opacity: isNavigating ? 1 : 0,
          transition: progress === 100 
            ? "width 200ms ease, opacity 200ms ease" 
            : "width 300ms ease-in-out",
        }}
      />
    </div>
  );
}
