"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Room } from "@/lib/models";
import { useToast } from "@/components/ui/Toast";
import ConfirmModal from "@/components/ui/ConfirmModal";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

export default function AdminRoomsPage() {
  const router = useRouter();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();

  const [confirmConfig, setConfirmConfig] = useState<{
    isOpen: boolean;
    roomId: string;
    action: "delete" | "toggle";
    title: string;
    message: string;
    variant: "danger" | "warning" | "primary";
  }>({
    isOpen: false,
    roomId: "",
    action: "toggle",
    title: "",
    message: "",
    variant: "primary",
  });

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/rooms");
      if (!response.ok) throw new Error("Failed to load rooms");
      const data = await response.json();
      setRooms(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load rooms");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleRequest = (roomId: string) => {
    const room = rooms.find((r) => r.id === roomId);
    if (!room) return;

    setConfirmConfig({
      isOpen: true,
      roomId,
      action: "toggle",
      title: room.is_active ? "Deactivate Room" : "Activate Room",
      message: room.is_active
        ? `Are you sure you want to take "${room.name}" offline? It will no longer be bookable.`
        : `Bring "${room.name}" back online? Guests will be able to book it immediately.`,
      variant: "warning",
    });
  };

  const handleDeleteRequest = (roomId: string) => {
    const room = rooms.find((r) => r.id === roomId);
    if (!room) return;

    setConfirmConfig({
      isOpen: true,
      roomId,
      action: "delete",
      title: "Delete Room Permanently",
      message: `Are you sure you want to delete "${room.name}"? This action cannot be undone and will remove all associated data.`,
      variant: "danger",
    });
  };

  const executeAction = async () => {
    const { roomId, action } = confirmConfig;
    if (!roomId) return;

    try {
      if (action === "toggle") {
        const room = rooms.find((r) => r.id === roomId);
        const response = await fetch("/api/admin/rooms", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: roomId, is_active: !room?.is_active }),
        });
        if (!response.ok) throw new Error("Failed to update room");
        setRooms(rooms.map((r) => (r.id === roomId ? { ...r, is_active: !r.is_active } : r)));
        showToast("success", "Room status updated successfully.");
      } else {
        const response = await fetch("/api/admin/rooms", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: roomId }),
        });
        if (!response.ok) throw new Error("Failed to delete room");
        setRooms(rooms.filter((r) => r.id !== roomId));
        showToast("success", "Room deleted successfully.");
      }
    } catch (err) {
      showToast("error", "An error occurred while updating the room.");
    } finally {
      setConfirmConfig((prev) => ({ ...prev, isOpen: false }));
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-text-secondary font-bold uppercase tracking-widest text-xs">Loading Inventory...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-text-primary dark:text-white tracking-tight">Room Management</h1>
          <p className="text-text-secondary dark:text-gray-400 mt-1">Configure your hotel's room inventory and pricing.</p>
        </div>
        <Button onClick={() => router.push('/admin/rooms/new')} size="lg">
          <span className="material-symbols-outlined mr-2">add</span>
          Add New Room
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div key={room.id} className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-2xl">hotel</span>
                </div>
                <Badge variant={room.is_active ? "success" : "error"} size="sm" className="uppercase tracking-widest font-black">
                  {room.is_active ? "Live" : "Offline"}
                </Badge>
              </div>

              <h3 className="text-xl font-black text-text-primary dark:text-white mb-2">{room.name}</h3>
              <p className="text-text-secondary dark:text-gray-400 text-sm line-clamp-2 mb-4 h-10">
                {room.description}
              </p>

              <div className="flex items-center gap-4 text-sm font-bold text-text-primary dark:text-gray-200 mb-6">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-lg text-primary">payments</span>
                  ${room.price_per_night}
                </div>
                <div className="flex items-center gap-1 border-l border-gray-100 dark:border-gray-700 pl-4">
                  <span className="material-symbols-outlined text-lg text-primary">group</span>
                  {room.max_guests} Guests
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-gray-50 dark:border-gray-700/50">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => router.push(`/admin/rooms/${room.id}`)}
                >
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={room.is_active ? "text-amber-600 hover:bg-amber-50" : "text-green-600 hover:bg-green-50"}
                  onClick={() => handleToggleRequest(room.id)}
                >
                  {room.is_active ? "Deactivate" : "Activate"}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:bg-red-50 p-2"
                  onClick={() => handleDeleteRequest(room.id)}
                >
                  <span className="material-symbols-outlined">delete</span>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {rooms.length === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-20 text-center">
          <div className="w-20 h-20 bg-gray-50 dark:bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-4xl text-gray-300">inventory_2</span>
          </div>
          <h2 className="text-2xl font-black text-text-primary dark:text-white mb-2">No Rooms Defined</h2>
          <p className="text-text-secondary dark:text-gray-400 mb-8 max-w-sm mx-auto">
            Your room inventory is empty. Add your first room to start accepting bookings.
          </p>
          <Button onClick={() => router.push('/admin/rooms/new')} size="lg">
            Create First Room
          </Button>
        </div>
      )}

      <ConfirmModal
        isOpen={confirmConfig.isOpen}
        title={confirmConfig.title}
        message={confirmConfig.message}
        variant={confirmConfig.variant}
        confirmLabel={confirmConfig.action === "delete" ? "Delete Permanently" : "Proceed"}
        onConfirm={executeAction}
        onCancel={() => setConfirmConfig((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
