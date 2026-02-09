"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Room {
  id: string;
  name: string;
  description: string;
  price_per_night: number;
  max_guests: number;
  is_active: boolean;
  created_at: string;
}

export default function AdminRoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const handleToggleActive = async (roomId: string) => {
    try {
      const room = rooms.find(r => r.id === roomId);
      if (!room) return;

      const response = await fetch("/api/admin/rooms", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: roomId,
          is_active: !room.is_active
        })
      });

      if (!response.ok) throw new Error("Failed to update room");

      setRooms(rooms.map(r =>
        r.id === roomId ? { ...r, is_active: !r.is_active } : r
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update room");
    }
  };

  const handleDelete = async (roomId: string) => {
    if (!confirm("Are you sure you want to delete this room?")) return;

    try {
      const response = await fetch("/api/admin/rooms", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: roomId })
      });

      if (!response.ok) throw new Error("Failed to delete room");

      setRooms(rooms.filter(r => r.id !== roomId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete room");
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading rooms...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-red-900 font-medium">Error loading rooms</h3>
          <p className="text-red-700 text-sm mt-1">{error}</p>
          <button onClick={loadRooms} className="mt-3 px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Room Management</h1>
          <p className="text-gray-600">Manage hotel rooms and pricing</p>
        </div>
        <Link
          href="/admin/rooms/new"
          className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:opacity-90"
        >
          Add New Room
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">All Rooms ({rooms.length})</h2>
        </div>

        <div className="divide-y">
          {rooms.map((room) => (
            <div key={room.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{room.name}</h3>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      room.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {room.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">${room.price_per_night}/night • Up to {room.max_guests} guests</p>
                  <p className="text-sm text-gray-600 line-clamp-2">{room.description}</p>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => handleToggleActive(room.id)}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      room.is_active
                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                        : 'bg-red-100 text-red-800 hover:bg-red-200'
                    }`}
                  >
                    {room.is_active ? 'Deactivate' : 'Activate'}
                  </button>
                  <Link
                    href={`/admin/rooms/${room.id}`}
                    className="px-3 py-2 text-sm font-medium bg-primary text-white rounded-md hover:opacity-90"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(room.id)}
                    className="px-3 py-2 text-sm font-medium bg-red-100 text-red-800 rounded-md hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {rooms.length === 0 && (
          <div className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No rooms yet</h3>
            <p className="text-gray-600 mb-4">Get started by creating your first room</p>
            <Link
              href="/admin/rooms/new"
              className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-medium hover:opacity-90"
            >
              Create First Room
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
