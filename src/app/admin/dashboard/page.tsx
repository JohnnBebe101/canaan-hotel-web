"use client";

import { useEffect, useState } from "react";
import SystemStatusBadge from "@/components/admin/SystemStatusBadge";
import { isPaymentsEnabled, isEmailEnabled, isOTAEnabled } from "@/lib/featureFlags";
import Link from "next/link";
import { Booking } from "@/lib/models";
import { useToast } from "@/components/ui/Toast";
import Badge from "@/components/ui/Badge";

interface Stats {
  totalBookings: number;
  confirmedBookings: number;
  pendingBookings: number;
  totalRevenue: number;
  activeGuests: number;
  occupancyRate: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const { showToast } = useToast();

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [statsRes, bookingsRes] = await Promise.all([
          fetch("/api/admin/stats"),
          fetch("/api/admin/bookings")
        ]);

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
    <div className="space-y-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <h1 className="text-3xl lg:text-4xl font-black text-text-primary dark:text-white tracking-tight">
            Hotel Overview
          </h1>
          <p className="text-text-secondary dark:text-gray-400 mt-1 font-medium">
            Operational heartbeat of Canaan International Hotel.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white dark:bg-gray-800 px-4 py-2 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
          <span className="text-xs font-black uppercase tracking-widest text-text-primary dark:text-white">Live Operations</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Bookings", value: stats?.totalBookings, icon: "calendar_today", color: "blue", sub: "Since inception" },
          { label: "Active Guests", value: stats?.activeGuests, icon: "group", color: "green", sub: "Currently in-house" },
          { label: "RevPAR", value: `$${stats?.totalRevenue?.toLocaleString()}`, icon: "payments", color: "amber", sub: "Confirmed revenue" },
          { label: "Occupancy", value: `${stats?.occupancyRate}%`, icon: "hotel", color: "purple", sub: "Based on active inventory" },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-8 shadow-xl hover:shadow-2xl transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${stat.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                stat.color === 'green' ? 'bg-green-50 text-green-600' :
                  stat.color === 'amber' ? 'bg-amber-50 text-amber-600' :
                    'bg-purple-50 text-purple-600'
                }`}>
                <span className="material-symbols-outlined">{stat.icon}</span>
              </div>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary mb-1">{stat.label}</p>
            <p className="text-3xl font-black text-text-primary dark:text-white mb-2 tracking-tighter">
              {loading ? "..." : stat.value || 0}
            </p>
            <p className="text-[10px] font-bold text-text-secondary/60 uppercase tracking-widest leading-none border-t border-gray-50 dark:border-gray-700 pt-3 mt-1">
              {stat.sub}
            </p>
          </div>
        ))}
      </div>

      {/* Action Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-8 shadow-xl">
          <h2 className="text-xl font-black text-text-primary dark:text-white mb-6 uppercase tracking-tight">Manager's Command Hub</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { label: "New Booking", href: "/admin/bookings", icon: "add_circle", color: "text-primary" },
              { label: "Inventory", href: "/admin/rooms", icon: "edit_note", color: "text-green-600" },
              { label: "Media / CMS", href: "/admin/attractions", icon: "place", color: "text-purple-600" },
              { label: "Live Site", href: "/", icon: "visibility", color: "text-amber-600" },
              { label: "Storytelling", href: "/admin/blogs", icon: "article", color: "text-blue-600" },
              { label: "Settings", href: "/admin/payments", icon: "settings", color: "text-gray-600" },
            ].map((action, i) => (
              <Link
                key={i}
                href={action.href}
                className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-gray-50 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:shadow-inner transition-all group"
              >
                <span className={`material-symbols-outlined text-3xl transition-transform group-hover:scale-110 ${action.color}`}>{action.icon}</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary group-hover:text-text-primary transition-colors">{action.label}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-8 shadow-xl">
          <h2 className="text-xl font-black text-text-primary dark:text-white mb-6 uppercase tracking-tight">Integrations</h2>
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-widest text-text-secondary">Email Relay</span>
              <Badge variant={isEmailEnabled() ? "success" : "neutral"}>{isEmailEnabled() ? "Online" : "Paused"}</Badge>
            </div>
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-widest text-text-secondary">Payments</span>
              <Badge variant={isPaymentsEnabled() ? "success" : "neutral"}>{isPaymentsEnabled() ? "Active" : "Disabled"}</Badge>
            </div>
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-widest text-text-secondary">Booking.com</span>
              <Badge variant={isOTAEnabled() ? "success" : "neutral"}>{isOTAEnabled() ? "Synced" : "Offline"}</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Data Insight Table */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-xl overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-xl font-black text-text-primary dark:text-white uppercase tracking-tight">Recent Activity</h2>
          <Link href="/admin/bookings" className="text-[10px] font-black uppercase tracking-[0.2em] text-primary hover:opacity-70 transition-opacity">
            Full History →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50/50 dark:bg-gray-900/50">
              <tr>
                <th className="px-8 py-4 text-left text-[10px] font-black text-text-secondary uppercase tracking-[0.2em]">Guest Profile</th>
                <th className="px-8 py-4 text-left text-[10px] font-black text-text-secondary uppercase tracking-[0.2em]">Accommodation</th>
                <th className="px-8 py-4 text-left text-[10px] font-black text-text-secondary uppercase tracking-[0.2em]">Arrival</th>
                <th className="px-8 py-4 text-left text-[10px] font-black text-text-secondary uppercase tracking-[0.2em]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
              {loading ? (
                <tr><td colSpan={4} className="px-8 py-10 text-center text-xs font-bold text-text-secondary animate-pulse uppercase tracking-widest">Awaiting cloud data...</td></tr>
              ) : recentBookings.length === 0 ? (
                <tr><td colSpan={4} className="px-8 py-10 text-center text-xs font-bold text-text-secondary uppercase tracking-widest">No recent arrivals.</td></tr>
              ) : (
                recentBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors">
                    <td className="px-8 py-5 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                          <span className="text-xs font-black text-primary">
                            {booking.guest_name.substring(0, 2).toUpperCase()}
                          </span>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-black text-text-primary dark:text-white leading-none mb-1">{booking.guest_name}</p>
                          <p className="text-[10px] text-text-secondary font-bold tracking-tight">{booking.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap text-xs font-bold text-text-primary dark:text-white uppercase tracking-widest">{booking.room_type}</td>
                    <td className="px-8 py-5 whitespace-nowrap text-xs font-bold text-text-secondary uppercase tracking-widest">
                      {new Date(booking.check_in_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <Badge variant={booking.status === 'confirmed' ? 'success' : booking.status === 'pending' ? 'warning' : 'error'} size="sm" className="uppercase tracking-widest">
                        {booking.status}
                      </Badge>
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
