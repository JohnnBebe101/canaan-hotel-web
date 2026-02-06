import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FEATURED_ROOMS } from "@/lib/featuredRooms";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const room = FEATURED_ROOMS.find(r => r.slug === params.id);

  if (!room) {
    return {
      title: "Room Not Found | Cannan International Hotel",
    };
  }

  return {
    title: `${room.name} | Cannan International Hotel`,
    description: room.description,
    openGraph: {
      title: `${room.name} - Luxury Accommodation in Adigrat`,
      description: room.description,
      images: [room.imageSrc],
    },
  };
}

export default function RoomDetailPage() {
  return (
    <main className="flex-1 px-4 sm:px-10 lg:px-20 py-10 sm:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <div className="relative w-full">
              <div className="relative w-full overflow-hidden rounded-xl aspect-[4/3]">
                <Image
                  className="w-full h-full object-cover"
                  alt="A bright and airy hotel room with a large comfortable bed and modern furnishings."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3C6TnOqoEKDQOlUk3nyUJvFf4CA6xKtEp7E6w2iXFjqYePW0V-DOFw2ABrPWCfaQALfnOo6hI9IrrKbEPb0w9mBg4SiafKtnCRfpzffJl4PxC9wqjSiWXjyerMtizbwhUlY6Y4TG90ZMb2GRmNb7NQDIxmUQxZyz2jpNEa19GzzjuEYe0kyXsQsdGHaU-42JpGDgOibSamVzVpHIm6UXDrekNGdjIW7lAfhvpnMwD3YOcPIU_i2yE4ICl4FNcFyBoHntYiQHngcXq"
                  width={800}
                  height={600}
                  priority
                />
                <button className="absolute top-4 right-4 flex items-center gap-2 rounded-full bg-black/50 px-3 py-1.5 text-white text-xs font-semibold backdrop-blur-sm hover:bg-black/70">
                  <span className="material-symbols-outlined text-base">fullscreen</span>
                  View All
                </button>
              </div>
              <div className="mt-3 grid grid-cols-5 gap-3">
                <div className="overflow-hidden rounded-lg aspect-square">
                  <Image
                    className="w-full h-full object-cover cursor-pointer border-2 border-primary"
                    alt="Close-up of the neatly made bed with plush pillows."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaBYjLISttxDOlpoYegjT-Wg5LLsph-oKb9oPOKKRKt5TksiQ48GsOhM8IVtUZtqmFq-NwU5UhtY5uRPWzgGAKBeCL-fS7jRidCAiDMBXd81oddT9P4MIcEd2xBNvxC_nRUXYe2SVxoPgHVyvwq9MFyj18sPwihffg6BQmO9PDX1oPeXT_ip7evD4oT6cQD3UUI99uRGejJ_wjIeDEqDyurcEU7a8-wDqMPGm4BVXnBj8tag6izFmUCbfQzXP1l1dwtQAjrlnLyUsO"
                    width={200}
                    height={200}
                  />
                </div>
                <div className="overflow-hidden rounded-lg aspect-square">
                  <Image
                    className="w-full h-full object-cover cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
                    alt="The desk and chair area in the hotel room."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCX2zkhq02FZaNXzQN5j739GsryyUKYWexYTA32khsWqFVKljOcDF4DEGC75C7ugVWTvZxXvl9xXBr1owk9um-a8DUptCcTLswaTWEgEheYuIIcXl1y5ib8T8zDxUE_LCd9mSrdrazdX46xRQIhO9bkrWMOeOMYBX1j9eItDLfk-1jNS_po9rHfAwZgaO1jrvJA0Z_tsWqfQNO6n6_WFRNN910TmMQ6o1WVnx4tCXOdtlIxSo_hgfYiiA2vhVyw3tV5O7H_WrBIXg17"
                    width={200}
                    height={200}
                  />
                </div>
                <div className="overflow-hidden rounded-lg aspect-square">
                  <Image
                    className="w-full h-full object-cover cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
                    alt="A view of the bathroom with a modern shower."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGbNw3NeQDZpiFEO5i3DE-_N2_BCthFBf_zbFjv3Upcua2e4DH_vICpHT7RYf69dwURtIq2XXzIekju3GhwXyttb9GTqkta6rGqVsQOm36ZIXERIgM3gq5tpPyUfHMb1XkeGzklYXuOZ7tlg3RJtjX2bubEEfxWxGEbaL9Zt7SgsRhGnQr74WUy6gGizPvJ8e9AA3Q8im2kc__ovIyXNmMWM_0NVubl2gUk05DVNF58oQyDJxuQYoA427IwPvJNltkLINJ_5oDKlYG"
                    width={200}
                    height={200}
                  />
                </div>
                <div className="overflow-hidden rounded-lg aspect-square">
                  <Image
                    className="w-full h-full object-cover cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
                    alt="The view from the hotel room window."
                    src="/images/room-placeholder.jpg"
                    width={200}
                    height={200}
                  />
                </div>
                <div className="overflow-hidden rounded-lg aspect-square">
                  <div className="w-full h-full bg-black/50 flex items-center justify-center cursor-pointer hover:bg-black/60 transition-colors">
                    <span className="text-white font-bold text-lg">+5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 mt-8 lg:mt-0">
            <div className="sticky top-24">
              <div className="flex flex-col gap-8 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 p-6 shadow-lg">
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-bold text-primary">Starting From</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-primary dark:text-white">$120</span>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">/ night</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary dark:text-background-light mb-1" htmlFor="checkin">
                      Check-in
                    </label>
                    <div className="relative">
                      <input
                        className="w-full rounded-lg border border-border-color dark:border-text-secondary/50 dark:bg-background-light/10 dark:text-background-light focus:ring-primary focus:border-primary"
                        id="checkin"
                        placeholder="Select Date"
                        type="text"
                      />
                      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                        calendar_today
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary dark:text-background-light mb-1" htmlFor="checkout">
                      Check-out
                    </label>
                    <div className="relative">
                      <input
                        className="w-full rounded-lg border border-border-color dark:border-text-secondary/50 dark:bg-background-light/10 dark:text-background-light focus:ring-primary focus:border-primary"
                        id="checkout"
                        placeholder="Select Date"
                        type="text"
                      />
                      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                        calendar_today
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary dark:text-background-light mb-1" htmlFor="adults">
                      Adults
                    </label>
                    <select
                      className="w-full rounded-lg border border-border-color dark:border-text-secondary/50 dark:bg-background-light/10 dark:text-background-light focus:ring-primary focus:border-primary"
                      id="adults"
                    >
                      <option>1</option>
                      <option selected>2</option>
                      <option>3</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary dark:text-background-light mb-1" htmlFor="children">
                      Children
                    </label>
                    <select
                      className="w-full rounded-lg border border-border-color dark:border-text-secondary/50 dark:bg-background-light/10 dark:text-background-light focus:ring-primary focus:border-primary"
                      id="children"
                    >
                      <option selected>0</option>
                      <option>1</option>
                      <option>2</option>
                    </select>
                  </div>
                </div>

                <Link
                  href="/#booking"
                  className="w-full flex items-center justify-center rounded-lg h-12 px-6 bg-primary text-white text-base font-bold hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  <span>Reserve Your Stay</span>
                </Link>

                <div className="text-center mt-3">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Total for 1 night: <span className="font-bold text-text-primary dark:text-background-light">$120</span>
                  </p>
                  <div className="flex justify-center gap-2 mt-2">
                    <span className="inline-block px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs" data-demo="true">
                      Payment Processed
                    </span>
                    <span className="inline-block px-2 py-1 rounded-full bg-primary/10 text-primary text-xs" data-demo="true">
                      Email Sent
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 mt-12 lg:mt-0">
          <div className="flex flex-col gap-6">
            <div>
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-4xl font-black leading-tight tracking-tighter text-primary dark:text-white">
                  Comfort Double
                </h1>
                <div className="flex gap-2">
                  <span className="inline-block px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium" data-demo="true">
                    Available
                  </span>
                  <span className="inline-block px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium" data-demo="true">
                    Best Seller
                  </span>
                </div>
              </div>
              <p className="mt-4 text-base font-normal leading-relaxed">
                Experience unparalleled comfort in our spacious Comfort Double room. Perfect for couples or business travelers, this room features modern amenities, a plush double bed, and a serene ambiance to ensure a restful stay. Enjoy the blend of contemporary design and cozy furnishings, creating your perfect home away from home in Adigrat.
              </p>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700"></div>

            <div>
              <h3 className="text-xl font-bold text-primary dark:text-white">Key Amenities</h3>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-4">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">wifi</span>
                  <span className="text-sm font-medium">Free WiFi</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">free_breakfast</span>
                  <span className="text-sm font-medium">Continental Breakfast</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">shower</span>
                  <span className="text-sm font-medium">Rainfall Showerhead</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">ac_unit</span>
                  <span className="text-sm font-medium">Air Conditioning</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">tv</span>
                  <span className="text-sm font-medium">Flat-screen TV</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">lock</span>
                  <span className="text-sm font-medium">In-room Safe</span>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700"></div>

            <div>
              <h3 className="text-xl font-bold text-primary dark:text-white">What Our Guests Say</h3>
              <div className="mt-4 flex flex-col gap-6">
                <div className="border-l-4 border-primary pl-4">
                  <p className="italic">
                    "Absolutely wonderful stay. The room was immaculate and the service was top-notch. Highly recommended for anyone visiting Adigrat."
                  </p>
                  <p className="mt-2 font-bold text-sm">— Jane D.</p>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <p className="italic">
                    "A true gem in the heart of the city. Comfortable, clean, and convenient. The booking process was seamless. We'll be back!"
                  </p>
                  <p className="mt-2 font-bold text-sm">— Mark S.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}