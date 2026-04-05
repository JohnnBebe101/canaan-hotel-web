"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/ui/Icons";

interface LogoutButtonProps {
  compact?: boolean;
}

export default function LogoutButton({ compact = false }: LogoutButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        router.push("/auth/login");
        router.refresh();
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error("Logout error:", error);
      setLoading(false);
    }
  };

  if (compact) {
    return (
      <button
        onClick={handleLogout}
        disabled={loading}
        className="flex flex-col items-center gap-1 text-red-500 disabled:opacity-50"
      >
        <Icon name="logout" className="text-2xl" />
        <span className="text-[10px] font-bold uppercase tracking-widest">{loading ? "..." : "Exit"}</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors disabled:opacity-50"
    >
      <Icon name="logout" className="text-sm" />
      {loading ? "Signing out..." : "Sign Out"}
    </button>
  );
}
