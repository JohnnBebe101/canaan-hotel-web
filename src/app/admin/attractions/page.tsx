"use client";

import { useState } from "react";

/**
 * Admin Attractions Management Page
 * Route: /admin/attractions
 *
 * Allows admins to manage nearby attractions and hotel content
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
  // Static attraction data - in production this would be managed via database/CMS
  const [attractions, setAttractions] = useState<Attraction[]>([
    {
      id: "historic-downtown",
      name: "Historic Downtown",
      description: "Discover charming streets and local culture just minutes away from our hotel. Explore boutique shops, local cafes, and historic architecture.",
      category: "Culture",
      distance: "0.5 km",
      active: true
    },
    {
      id: "museum-district",
      name: "Museum District",
      description: "Explore world-class museums and art galleries featuring contemporary and historical exhibits. Perfect for culture enthusiasts.",
      category: "Arts & Culture",
      distance: "1.2 km",
      active: true
    },
    {
      id: "central-park",
      name: "Central Park",
      description: "Beautiful green spaces perfect for relaxation and recreation. Enjoy walking paths, picnic areas, and outdoor activities.",
      category: "Nature",
      distance: "0.8 km",
      active: true
    },
    {
      id: "business-district",
      name: "Business District",
      description: "Convenient access to corporate offices, meeting spaces, and professional services. Ideal for business travelers.",
      category: "Business",
      distance: "1.5 km",
      active: true
    }
  ]);

  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Attraction>>({});

  const handleEdit = (attraction: Attraction) => {
    setSelectedAttraction(attraction);
    setEditForm({ ...attraction });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!selectedAttraction) return;

    setAttractions(prev => prev.map(attr =>
      attr.id === selectedAttraction.id
        ? { ...attr, ...editForm }
        : attr
    ));

    setIsEditing(false);
    setSelectedAttraction(null);
    setEditForm({});
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedAttraction(null);
    setEditForm({});
  };

  const toggleActive = (id: string) => {
    setAttractions(prev => prev.map(attr =>
      attr.id === id ? { ...attr, active: !attr.active } : attr
    ));
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Attractions Management</h1>
        <p className="text-gray-600">Manage nearby attractions and local points of interest</p>
      </div>

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
          {attractions.map((attraction) => (
            <div key={attraction.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-medium text-gray-900">{attraction.name}</h3>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      attraction.active
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
                    onClick={() => toggleActive(attraction.id)}
                    className={`px-3 py-1 text-xs font-medium rounded ${
                      attraction.active
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
          ))}
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

      {/* Implementation Note */}
      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-yellow-800 mb-2">Implementation Note</h3>
        <p className="text-sm text-yellow-700">
          This attractions management interface allows you to edit existing attractions. In a production environment,
          this would be connected to a database/CMS for full CRUD operations including adding new attractions and image uploads.
        </p>
      </div>
    </div>
  );
}
