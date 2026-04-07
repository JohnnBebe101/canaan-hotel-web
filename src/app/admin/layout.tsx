import { redirect } from "next/navigation";
import { checkAuth } from "@/lib/auth";
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
      <div className="min-h-screen bg-sandstone flex">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Mobile Top Bar */}
          <header className="lg:hidden h-14 bg-white border-b border-slate-200 flex items-center px-4 gap-3">
            <h1 className="text-forest font-bold">Canaan</h1>
          </header>

          {/* Breadcrumb Strip (desktop) */}
          <div className="hidden lg:block px-8 py-3 border-b border-slate-100 bg-white">
            <Breadcrumbs />
          </div>

          {/* Page Content */}
          <div className="flex-1 overflow-y-auto p-6 lg:p-8">
            <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-500">
              {children}
            </div>
          </div>
        </main>
      </div>
    </ToastProvider>
  );
}
