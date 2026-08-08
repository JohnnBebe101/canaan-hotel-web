import Image from "next/image";

interface CanaanLogoProps {
  size?: string;
  className?: string;
}

export default function CanaanLogo({
  size = "w-20 h-20",
  className = "",
}: CanaanLogoProps) {
  const sizeMap: Record<string, number> = {
    "w-10 h-10": 40,
    "w-14 h-14": 56,
    "w-16 h-16": 64,
    "w-20 h-20": 80,
    "w-24 h-24": 96,
    "w-32 h-32": 128,
  };

  const pixelSize = sizeMap[size] || 80;

  return (
    <div className={`relative ${size} ${className}`}>
      <Image
        src="/images/ui/logo-and-favicon/logo-512.png"
        alt="Canaan International Hotel"
        width={pixelSize}
        height={pixelSize}
        className="object-contain"
        priority
        sizes={`
          (max-width: 768px) ${Math.round(pixelSize * 0.75)}px,
          ${pixelSize}px
        `}
      />
    </div>
  );
}