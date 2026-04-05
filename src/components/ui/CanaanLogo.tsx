import Image from "next/image";

interface CanaanLogoProps {
  className?: string;
}

export default function CanaanLogo({
  className = "w-8 h-8",
}: CanaanLogoProps) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/images/ui/Canaan-logo-bigger.svg"
        alt="Canaan International Hotel"
        fill
        className="object-contain"
        priority
      />
    </div>
  );
}