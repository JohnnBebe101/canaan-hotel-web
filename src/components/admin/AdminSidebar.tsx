"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, LayoutDashboard, Calendar, BedDouble, CreditCard } from "lucide-react";
import LogoutButton from "@/components/LogoutButton";

const navItems = [
  { name: "Dashboard", href: "/admin/dashboard", Icon: LayoutDashboard },
  { name: "Bookings", href: "/admin/bookings", Icon: Calendar },
  { name: "Rooms", href: "/admin/rooms", Icon: BedDouble },
  { name: "Payments", href: "/admin/payments", Icon: CreditCard },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-64 min-h-screen bg-forest sticky top-0">
        <div className="p-6">
          <h1 className="text-xl font-bold tracking-widest text-white">Canaan</h1>
        </div>
        <div className="border-b border-white/10 mx-2"></div>
        
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg mx-2 transition-all ${
                  isActive
                    ? "bg-cactus text-white font-semibold"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                <item.Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-white/60"}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <LogoutButton />
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 z-40 px-2 pb-safe">
        <nav className="flex justify-around py-3">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center gap-1 px-2 transition-colors ${isActive ? "text-primary" : "text-gray-500"
                  }`}
              >
                <item.Icon className="w-5 h-5" />
                <span className="text-[10px] font-bold uppercase tracking-widest">{item.name.split(" ")[0]}</span>
              </Link>
            );
          })}
          <div className="flex flex-col items-center gap-1 px-2 border-l border-gray-100 dark:border-gray-700 ml-1 pl-3">
            <LogoutButton compact />
          </div>
        </nav>
      </div>
    </>
  );
}
