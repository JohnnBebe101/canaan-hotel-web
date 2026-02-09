import { redirect } from "next/navigation";
import { checkAuth } from "@/lib/auth";
import LogoutButton from "@/components/LogoutButton";
import Header from "@/components/Header";
import Link from "next/link";

const navItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: "dashboard" },
  { name: "Bookings", href: "/admin/bookings", icon: "calendar_today" },
  { name: "Rooms", href: "/admin/rooms", icon: "hotel" },
  { name: "Attractions", href: "/admin/attractions", icon: "place" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authenticated = await checkAuth();

  if (!authenticated) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header variant="admin" />

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:flex lg:flex-col w-64 min-h-[calc(100vh-64px)] bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          <nav className="flex-1 px-4 py-6 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <LogoutButton />
          </div>
        </aside>

        {/* Mobile Navigation */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-40">
          <nav className="flex justify-around py-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex flex-col items-center gap-1 px-4 py-2 text-xs font-medium text-gray-600 dark:text-gray-300"
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8 pb-24 lg:pb-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
