"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Room } from "@/lib/models";
import { useToast } from "@/components/ui/Toast";
import ConfirmModal from "@/components/ui/ConfirmModal";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Plus, BedDouble, CreditCard, Users, Delete, Package, Pencil } from "lucide-react";

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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cactus mx-auto"></div>
        <p className="mt-4 text-sm font-medium text-slate-400 uppercase tracking-wider">Loading Inventory...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-forest tracking-tight">Room Management</h1>
          <p className="text-sm text-slate-500 mt-1">Configure your hotel's room inventory and pricing.</p>
        </div>
        <Button onClick={() => router.push('/admin/rooms/new')} size="lg">
          <Plus className="w-4 h-4 mr-2" />
          Add New Room
        </Button>
      </div>

      {/* Room Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-6">
        {rooms.map((room) => (
          <div key={room.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            {/* Image Area */}
            <div className="aspect-video bg-slate-100 relative">
              {room.image_src ? (
                <img 
                  src={room.image_src} 
                  alt={room.name}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <BedDouble className="w-12 h-12 text-slate-300" />
                </div>
              )}
              <div className="absolute top-3 left-3">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  room.is_active ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                }`}>
                  {room.is_active ? "Available" : "Offline"}
                </span>
              </div>
            </div>
            
            {/* Card Body */}
            <div className="p-4">
              <h3 className="text-sm font-semibold text-forest">{room.name}</h3>
              <p className="text-xs text-slate-400 mt-0.5">{room.description?.substring(0, 60)}...</p>
              
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1">
                  <CreditCard className="w-4 h-4 text-bronze" />
                  <span className="text-lg font-bold text-bronze">${room.price_per_night}</span>
                  <span className="text-xs text-slate-400">/night</span>
                </div>
                <div className="flex items-center gap-1 border-l border-slate-100 pl-4">
                  <Users className="w-4 h-4 text-slate-400" />
                  <span className="text-xs text-slate-500">{room.max_guests} Guests</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-3 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => router.push(`/admin/rooms/${room.id}`)}
                >
                  <Pencil className="w-3 h-3 mr-1" />
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
                  className="text-slate-400 hover:text-red-500 p-2"
                  onClick={() => handleDeleteRequest(room.id)}
                >
                  <Delete className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {rooms.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-20 text-center">
          <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-forest mb-2">No rooms added yet.</h2>
          <p className="text-sm text-slate-500 mb-8 max-w-sm mx-auto">
            Add your first room to start accepting bookings.
          </p>
          <Button onClick={() => router.push('/admin/rooms/new')} size="lg">
            <Plus className="w-4 h-4 mr-2" />
            Add First Room
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
