import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import SectionTitle from "@/components/ui/SectionTitle";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface HotelInFrameProps {
  variant?: "about" | "home";
}

const tiles = [
  { src: "/images/gallery/Lobby.webp", alt: "Canaan Hotel lobby", span: true, delay: 0 },
  { src: "/images/gallery/Bed-view-Single.webp", alt: "Guest room", delay: 100 },
  { src: "/images/gallery/bath-room.webp", alt: "En-suite bathroom", delay: 200 },
  { src: "/images/gallery/single-room-best-view.webp", alt: "Comfort double room", delay: 300 },
  { src: "/images/gallery/Gate-Corrdor.webp", alt: "Hotel entrance corridor", wide: true, delay: 400 },
];

export default function HotelInFrame({ variant = "about" }: HotelInFrameProps) {
  return (
    <>
      {variant === "home" ? (
        <SectionTitle label="A Glimpse Into Our World" title="The Hotel in Frame" centered />
      ) : (
        <div className="text-center mb-12">
          <p className="text-bronze text-xs font-semibold tracking-[0.3em] uppercase mb-3">
            A Glimpse Into Our World
          </p>
          <h2 className="font-serif text-forest text-4xl font-bold">
            The Hotel in Frame
          </h2>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 auto-rows-[200px]">
        {tiles.map((tile) => (
          <div
            key={tile.src}
            className={`rounded-2xl overflow-hidden relative ${
              tile.span ? "row-span-2" : tile.wide ? "col-span-2 md:col-span-1" : ""
            }`}
          >
            <ScrollReveal delay={tile.delay} className="relative h-full">
              <Image
                src={tile.src}
                alt={tile.alt}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </ScrollReveal>
          </div>
        ))}
      </div>

      {variant === "home" && (
        <div className="mt-14 flex justify-center">
          <Link href="/gallery">
            <Button variant="outline" size="lg">View Full Gallery</Button>
          </Link>
        </div>
      )}
    </>
  );
}