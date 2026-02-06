"use client";

import { useState, useEffect } from "react";

/**
 * Admin Attractions Management Page
 * Route: /admin/attractions
 *
 * Allows admins to manage nearby attractions and hotel content
 * PERSISTENT: Connected to /api/admin/attractions
 */

interface Attraction {
  id: string;
  name: string;
  description: string;
  category: string;
  distance: string;
  image?: string;
  active: boolean;
}

export default function AdminAttractionsPage() {
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Attraction>>({});

  // Initial Data Fetch
  useEffect(() => {
    fetchAttractions();
  }, []);

  const fetchAttractions = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/attractions");
      if (!res.ok) throw new Error("Failed to fetch attractions");
      const data = await res.json();
      setAttractions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (attraction: Attraction) => {
    setSelectedAttraction(attraction);
    setEditForm({ ...attraction });
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!selectedAttraction) return;

    try {
      const res = await fetch("/api/admin/attractions", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedAttraction.id, ...editForm }),
      });

      if (!res.ok) throw new Error("Failed to update attraction");

      const updated = await res.json();
      setAttractions(prev => prev.map(attr =>
        attr.id === updated.id ? updated : attr
      ));

      setIsEditing(false);
      setSelectedAttraction(null);
      setEditForm({});
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to save");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedAttraction(null);
    setEditForm({});
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch("/api/admin/attractions", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, active: !currentStatus }),
      });

      if (!res.ok) throw new Error("Failed to toggle status");

      const updated = await res.json();
      setAttractions(prev => prev.map(attr =>
        attr.id === id ? updated : attr
      ));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to toggle");
    }
  };

  if (loading && attractions.length === 0) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500 animate-pulse text-lg">Loading attractions...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Attractions Management</h1>
        <p className="text-gray-600">Categories and points of interest for your guest landing page</p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4 text-red-700">
          {error}
        </div>
      )}

      {/* Attractions List */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Nearby Attractions ({attractions.length})</h2>
            <div className="text-sm text-gray-500">
              {attractions.filter(a => a.active).length} active
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {attractions.length === 0 ? (
            <div className="p-12 text-center text-gray-400">
              No attractions found. Use the API or Database to add initial data.
            </div>
          ) : (
            attractions.map((attraction) => (
              <div key={attraction.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-medium text-gray-900">{attraction.name}</h3>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${attraction.active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                        }`}>
                        {attraction.active ? 'Active' : 'Inactive'}
                      </span>
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                        {attraction.category}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-3 max-w-2xl">{attraction.description}</p>

                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>📍 {attraction.distance} away</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => toggleActive(attraction.id, attraction.active)}
                      className={`px-3 py-1 text-xs font-medium rounded ${attraction.active
                          ? 'bg-red-100 text-red-700 hover:bg-red-200'
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                    >
                      {attraction.active ? 'Deactivate' : 'Activate'}
                    </button>

                    <button
                      onClick={() => handleEdit(attraction)}
                      className="px-3 py-1 text-xs font-medium rounded bg-blue-100 text-blue-700 hover:bg-blue-200"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && selectedAttraction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Edit Attraction</h2>
                <button
                  onClick={handleCancel}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={editForm.name || ''}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={editForm.category || ''}
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    <option value="Culture">Culture</option>
                    <option value="Arts & Culture">Arts & Culture</option>
                    <option value="Nature">Nature</option>
                    <option value="Business">Business</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Entertainment">Entertainment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Distance</label>
                  <input
                    type="text"
                    value={editForm.distance || ''}
                    onChange={(e) => setEditForm({ ...editForm, distance: e.target.value })}
                    placeholder="e.g., 0.5 km"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={editForm.active ? 'active' : 'inactive'}
                    onChange={(e) => setEditForm({ ...editForm, active: e.target.value === 'active' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={editForm.description || ''}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 text-sm font-medium text-white bg-amber-600 border border-transparent rounded-lg hover:bg-amber-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Persistence Info */}
      <div className="mt-8 bg-amber-50 border border-amber-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-amber-800 mb-1">Persistence Active</h3>
        <p className="text-sm text-amber-700">
          All changes made here are now persisted to the central database (`data/db.json`).
          Manual updates to the database file will be reflected after a page refresh.
        </p>
      </div>
    </div>
  );
}
