import Link from "next/link";

export default function AdminSidebar() {
  const links = [
    { name: "Dashboard", href: "/admin/dashboard" },
    { name: "Rooms", href: "/admin/rooms" },
    { name: "Bookings", href: "/admin/bookings" },
    { name: "Attractions", href: "/admin/attractions" },
  ];

  return (
    <nav className="w-64 bg-gray-50 border-r h-full p-4">
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link 
              href={link.href}
              className="block p-2 rounded hover:bg-gray-200 transition-colors"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}