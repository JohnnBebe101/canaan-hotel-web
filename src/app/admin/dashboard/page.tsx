"use client";

export const dynamic = 'force-dynamic';

import { useEffect, useState } from "react";
import Link from "next/link";
import { Booking } from "@/lib/models";
import { useToast } from "@/components/ui/Toast";
import Badge from "@/components/ui/Badge";
import { Calendar, Users, BedDouble, CreditCard, PlusCircle, Eye, CalendarDays } from "lucide-react";

interface Stats {
  totalBookings: number;
  confirmedBookings: number;
  pendingBookings: number;
  totalRevenue: number;
  confirmedRevenueCents: number;
  activeGuests: number;
  occupancyRate: number;
  availableRooms?: number;
  checkedInGuests?: number;
  checkedInToday?: number;
}

function formatUSD(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const { showToast } = useToast();

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const adminSecret = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "";
        const headers = { "x-admin-secret": adminSecret };

        const [statsRes, bookingsRes] = await Promise.all([
          fetch("/api/admin/stats", { headers }),
          fetch("/api/admin/bookings", { headers })
        ]);

        if (statsRes.status === 401 || bookingsRes.status === 401) {
          console.error("[dashboard] Auth failed — check ADMIN_API_SECRET");
          showToast("error", "Authentication failed. Check admin credentials.");
          return;
        }

        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setStats(statsData);
          showToast("success", "Operations synchronized.");
        }

        if (bookingsRes.ok) {
          const bookingsData = await bookingsRes.json();
          setRecentBookings(bookingsData.slice(0, 5));
        }
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-forest">{greeting}</h1>
          <p className="text-sm text-slate-500 mt-1">Here is what is happening at Canaan Hotel today.</p>
        </div>
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-slate-100 shadow-sm">
          <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse"></div>
          <span className="text-xs font-medium uppercase tracking-widest text-forest">Live Operations</span>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {[
          { label: "Total Bookings", value: stats?.totalBookings, Icon: Calendar, sub: "Since inception" },
          { label: "Checked In Today", value: stats?.checkedInGuests || stats?.activeGuests || 0, Icon: Users, sub: "Currently in-house" },
          { label: "Occupancy Rate", value: `${stats?.occupancyRate ?? 0}%`, Icon: BedDouble, sub: `${stats?.availableRooms ?? 0} rooms available` },
          { label: "Confirmed Revenue", value: formatUSD(stats?.confirmedRevenueCents || 0), Icon: CreditCard, sub: "Confirmed + paid bookings only" },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-center gap-2">
              <stat.Icon className="w-5 h-5 text-cactus" />
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{stat.label}</p>
            </div>
            <p className="text-3xl font-bold text-forest mt-2">
              {loading ? <div className="animate-pulse bg-slate-100 rounded h-8 w-24" /> : stat.value || 0}
            </p>
            <p className="text-xs text-slate-500 mt-1">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Manager's Command Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-forest mb-4">Manager's Command Hub</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { label: "New Booking", href: "/admin/bookings/new", Icon: PlusCircle },
              { label: "Manage Rooms", href: "/admin/rooms", Icon: BedDouble },
              { label: "View Live Site", href: "/", target: "_blank", Icon: Eye },
              { label: "Payments", href: "/admin/payments", Icon: CreditCard },
            ].map((action, i) => (
              <Link
                key={i}
                href={action.href}
                target={action.target}
                className="flex flex-col items-center gap-2 bg-white border border-slate-100 rounded-xl p-4 hover:border-cactus hover:shadow-sm transition-all text-sm font-medium text-slate-700 hover:text-cactus"
              >
                <action.Icon className="w-6 h-6" />
                <span className="text-center">{action.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* System Status Panel */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-forest">System Status</h3>
          <div className="flex items-center gap-2 mt-3">
            <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
            <span className="text-sm text-slate-600 ml-2">Booking system operational</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Payment processing and OTA sync coming soon.</p>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="mt-8 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-forest">Recent Activity</h2>
          <Link href="/admin/bookings" className="text-xs text-cactus hover:underline cursor-pointer">
            Full History →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-3 text-left">Guest Profile</th>
                <th className="text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-3 text-left">Accommodation</th>
                <th className="text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-3 text-left">Arrival</th>
                <th className="text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-xs font-medium text-slate-400 animate-pulse uppercase tracking-wider">
                    Awaiting cloud data...
                  </td>
                </tr>
              ) : recentBookings.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-16 text-center">
                    <CalendarDays className="w-10 h-10 text-slate-300 mx-auto" />
                    <p className="text-sm font-medium text-slate-500 mt-3">No bookings yet.</p>
                    <p className="text-xs text-slate-400 mt-1">Bookings submitted through the website will appear here automatically.</p>
                    <Link href="/admin/bookings/new">
                      <button className="mt-4 inline-flex items-center gap-2 bg-cactus text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-forest transition-colors">
                        Add First Booking
                      </button>
                    </Link>
                  </td>
                </tr>
              ) : (
                recentBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-cactus/10 rounded-xl flex items-center justify-center">
                          <span className="text-xs font-bold text-cactus">
                            {booking.guest_name.substring(0, 2).toUpperCase()}
                          </span>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-forest">{booking.guest_name}</p>
                          <p className="text-xs text-slate-400">{booking.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{booking.room_type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {new Date(booking.check_in_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        booking.status === 'confirmed' ? 'bg-emerald-50 text-emerald-700' :
                        booking.status === 'pending' ? 'bg-amber-50 text-amber-700' :
                        'bg-red-50 text-red-600'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
