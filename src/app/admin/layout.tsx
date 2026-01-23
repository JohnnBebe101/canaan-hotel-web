import { redirect } from "next/navigation";
import { checkAuth } from "@/lib/auth";
import LogoutButton from "@/components/LogoutButton";
import Header from "@/components/Header";

/**
 * Admin Layout
 * 
 * Provides the main layout structure for all admin routes:
 * - Protected by authentication (redirects to login if not authenticated)
 * - Shared header navigation
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
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Header variant="admin" />
      
      <div className="flex">
        {/* Main Content Area */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
