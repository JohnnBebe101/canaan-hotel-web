import Image from "next/image";

interface CanaanLogoProps {
  size?: "header" | "footer" | "mobile" | "default";
  className?: string;
}

export default function CanaanLogo({
  size = "default",
  className = "",
}: CanaanLogoProps) {
  const sizeClasses: Record<string, string> = {
    header: "w-14 h-14",
    footer: "w-16 h-16",
    mobile: "w-10 h-10",
    default: "w-12 h-12",
  };
  
  const sizeClass = sizeClasses[size] || sizeClasses.default;
  
  return (
    <div className={`relative ${sizeClass} ${className}`}>
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