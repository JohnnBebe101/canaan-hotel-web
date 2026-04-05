import { redirect } from "next/navigation";
import { checkAuth } from "@/lib/auth";
import Header from "@/components/Header";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { ToastProvider } from "@/components/ui/Toast";

export const dynamic = 'force-dynamic';

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
    <ToastProvider>
      <div className="min-h-screen bg-background-light dark:bg-background-dark">
        <Header variant="admin" />

        <div className="flex">
          {/* Sidebar */}
          <AdminSidebar />

          {/* Main Content Area */}
          <main className="flex-1 p-4 lg:p-10 pb-24 lg:pb-10 min-w-0">
            <div className="max-w-7xl mx-auto">
              {/* Contextual Breadcrumbs */}
              <Breadcrumbs />

              {/* Page Content */}
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}
