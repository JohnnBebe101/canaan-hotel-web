"use client";

export const dynamic = 'force-dynamic';

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Room } from "@/lib/models";
import { ROOM_TYPES } from "@/lib/roomTypes";
import { useToast } from "@/components/ui/Toast";
import { useFormGuard } from "@/lib/hooks/useFormGuard";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { AlertCircle, CheckCircle, Ban, Shield } from "lucide-react";

export default function EditRoomPage() {
  const { id } = useParams();
  const router = useRouter();
  const { showToast } = useToast();

  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [isDirty, setIsDirty] = useState(false);

  // Attach navigation guard
  useFormGuard(isDirty);

  useEffect(() => {
    if (id) {
      loadRoom();
    }
  }, [id]);

  const loadRoom = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/rooms/${id}`);
      if (!response.ok) {
        if (response.status === 404) throw new Error("Room not found");
        throw new Error("Failed to load room details");
      }

      const foundRoom = await response.json();
      setRoom(foundRoom);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load room");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e?: React.SyntheticEvent) => {
    e?.preventDefault();
    if (!room) return;

    setError("");
    setSaving(true);

    try {
      const response = await fetch("/api/admin/rooms", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(room),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to update room");
      }

      showToast("success", "Room details updated successfully.");
      setIsDirty(false);

      setTimeout(() => {
        router.push("/admin/rooms");
      }, 500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update room");
      showToast("error", "Failed to save changes.");
    } finally {
      setSaving(false);
    }
  };

  const updateRoom = (field: keyof Room, value: any) => {
    if (!room) return;
    setRoom({ ...room, [field]: value });
    setIsDirty(true);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-text-secondary font-bold uppercase tracking-widest text-xs">Fetching Details...</p>
      </div>
    );
  }

  if (error && !room) {
    return (
      <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/50 p-8 rounded-3xl text-center">
        <AlertCircle className="w-10 h-10 text-red-600 mx-auto mb-4" />
        <h3 className="text-xl font-black text-red-900 dark:text-red-400 mb-2">Room Not Found</h3>
        <p className="text-red-700 dark:text-red-300/80 mb-6">{error}</p>
        <Button onClick={() => router.push("/admin/rooms")} variant="outline">
          Back to Inventory
        </Button>
      </div>
    );
  }

  if (!room) return null;

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-700 pb-6">
        <div>
          <h1 className="text-3xl font-black text-text-primary dark:text-white tracking-tight">Edit Room</h1>
          <p className="text-text-secondary dark:text-gray-400 mt-1">Updating: {room.name}</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => router.back()} disabled={saving}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} isLoading={saving}>
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-xl space-y-6">
            {/* Room Type Selector */}
            <div>
              <label className="block text-sm font-black text-text-primary dark:text-white uppercase tracking-widest mb-2">
                Room Type
              </label>
              <select
                value={ROOM_TYPES.find(rt => rt.name === room.name)?.slug || ""}
                onChange={(e) => {
                  const selectedType = ROOM_TYPES.find(rt => rt.slug === e.target.value);
                  if (selectedType) {
                    updateRoom("name", selectedType.name);
                    updateRoom("price_per_night", selectedType.price);
                    updateRoom("max_guests", selectedType.maxGuests);
                  }
                }}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary outline-none"
              >
                <option value="">Custom / Unknown</option>
                {ROOM_TYPES.map((type) => (
                  <option key={type.slug} value={type.slug}>
                    {type.name} — ${type.price}/night
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-black text-text-primary dark:text-white uppercase tracking-widest mb-2">
                  Room Name
                </label>
                <input
                  type="text"
                  value={room.name}
                  onChange={(e) => updateRoom("name", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-black text-text-primary dark:text-white uppercase tracking-widest mb-2">
                  Price Per Night ($)
                </label>
                <input
                  type="number"
                  value={room.price_per_night}
                  onChange={(e) => updateRoom("price_per_night", parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary outline-none"
                  min="1"
                  step="0.01"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-black text-text-primary dark:text-white uppercase tracking-widest mb-2">
                Room Description
              </label>
              <textarea
                value={room.description}
                onChange={(e) => updateRoom("description", e.target.value)}
                rows={5}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary outline-none resize-none"
                placeholder="Talk about the view, the bed size, or the atmosphere..."
              />
            </div>

            <div className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${room.is_active ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                  {room.is_active ? <CheckCircle className="w-5 h-5" /> : <Ban className="w-5 h-5" />}
                </div>
                <div>
                  <p className="text-sm font-black text-text-primary dark:text-white uppercase tracking-widest">Visibility Status</p>
                  <p className="text-xs text-text-secondary">{room.is_active ? 'Visible to guests' : 'Hidden from booking'}</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={room.is_active}
                  onChange={(e) => updateRoom("is_active", e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </form>

        <aside className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-xl">
            <h3 className="text-sm font-black text-text-primary dark:text-white uppercase tracking-widest mb-6">
              Details & Capacity
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] mb-2">
                  Max Occupancy
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => updateRoom("max_guests", num)}
                      className={`flex-1 py-2 rounded-lg text-sm font-black transition-all ${room.max_guests === num
                        ? "bg-primary text-white shadow-lg shadow-primary/20"
                        : "bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 hover:border-primary"
                        }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] mb-2">
                  Pricing Tier
                </label>
                <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                  <p className="text-xs font-bold text-text-primary dark:text-white mb-1">Weekly Forecast</p>
                  <p className="text-[10px] text-text-secondary">Expected revenue at 60% occupancy: <span className="text-green-600 font-bold">${Math.round(room.price_per_night * 4.2)}</span></p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-amber-50 dark:bg-amber-900/10 rounded-3xl border border-amber-100 dark:border-amber-900/20">
            <div className="flex items-center gap-3 text-amber-600 mb-2">
              <Shield className="w-5 h-5" />
              <span className="text-sm font-bold uppercase tracking-widest">Editing Safety</span>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
              Navigation guard is active. If you try to leave before saving, we will alert you to prevent data loss.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
