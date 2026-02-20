"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

const navItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: "dashboard" },
  { name: "Bookings", href: "/admin/bookings", icon: "calendar_today" },
  { name: "Rooms & Pricing", href: "/admin/rooms", icon: "hotel" },
  { name: "Blogs / CMS", href: "/admin/blogs", icon: "edit_note" },
  { name: "Local Attractions", href: "/admin/attractions", icon: "map" },
  { name: "Payments", href: "/admin/payments", icon: "payments" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-64 min-h-[calc(100vh-64px)] bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 sticky top-16">
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition-all ${isActive
                  ? "bg-primary/10 text-primary"
                  : "text-text-secondary dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-primary"
                  }`}
              >
                <span className={`material-symbols-outlined ${isActive ? "filled" : ""}`}>
                  {item.icon}
                </span>
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <LogoutButton />
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 z-40 px-2 pb-safe">
        <nav className="flex justify-around py-3">
          {navItems.slice(0, 5).map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center gap-1 px-2 transition-colors ${isActive ? "text-primary" : "text-gray-500"
                  }`}
              >
                <span className={`material-symbols-outlined text-2xl ${isActive ? "filled" : ""}`}>
                  {item.icon}
                </span>
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