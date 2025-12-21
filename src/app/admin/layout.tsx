import { redirect } from "next/navigation";
import Link from "next/link";
import { checkAuth } from "@/lib/auth";
import LogoutButton from "@/components/LogoutButton";

/**
 * Admin Layout
 * 
 * Provides the main layout structure for all admin routes:
 * - Protected by authentication (redirects to login if not authenticated)
 * - Sidebar navigation with links to Dashboard, Rooms, Bookings, Attractions
 * - Top bar with logout button
 * - Main content area for child routes
 */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Authentication check - redirect to login if not authenticated
  const authenticated = await checkAuth();

  if (!authenticated) {
    redirect("/admin/login");
  }

  return (
    <div>
      {/* Top Bar */}
      <header>
        <div>
          <h1>Canaan Hotel Admin</h1>
          <LogoutButton />
        </div>
      </header>

      <div>
        {/* Sidebar Navigation */}
        <aside>
          <nav>
            <ul>
              <li>
                <Link href="/admin/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link href="/admin/rooms">Rooms</Link>
              </li>
              <li>
                <Link href="/admin/bookings">Bookings</Link>
              </li>
              <li>
                <Link href="/admin/attractions">Attractions</Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main>{children}</main>
      </div>
    </div>
  );
}
