"use client";

import { useState, useEffect } from "react";
import { Attraction } from "@/lib/models";
import { useToast } from "@/components/ui/Toast";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import OptimizedImage from "@/components/OptimizedImage";
import ConfirmModal from "@/components/ui/ConfirmModal";

export default function AdminAttractionsPage() {
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();

  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Attraction>>({});
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

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

  const handleSave = async (statusOverride?: boolean) => {
    if (!selectedAttraction) return;

    const payload = {
      ...editForm,
      id: selectedAttraction.id,
      is_active: statusOverride !== undefined ? statusOverride : editForm.is_active,
    };

    try {
      const res = await fetch("/api/admin/attractions", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to update attraction");

      const updated = await res.json();
      setAttractions((prev) =>
        prev.map((attr) => (attr.id === updated.id ? updated : attr))
      );

      showToast("success", "Attraction updated successfully.");
      setIsEditing(false);
      setSelectedAttraction(null);
      setEditForm({});
    } catch (err) {
      showToast("error", err instanceof Error ? err.message : "Failed to save");
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch("/api/admin/attractions", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, is_active: !currentStatus }),
      });

      if (!res.ok) throw new Error("Failed to toggle status");

      const updated = await res.json();
      setAttractions((prev) =>
        prev.map((attr) => (attr.id === id ? updated : attr))
      );
      showToast("success", `Attraction ${!currentStatus ? "activated" : "deactivated"}.`);
    } catch (err) {
      showToast("error", "Failed to toggle status.");
    }
  };

  if (loading && attractions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-text-secondary font-bold uppercase tracking-widest text-xs">Syncing Experiences...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-text-primary dark:text-white tracking-tight">Local Attractions</h1>
          <p className="text-text-secondary dark:text-gray-400 mt-1">Manage points of interest and nearby activities for guests.</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/50 p-6 rounded-2xl text-red-700 dark:text-red-400 font-bold">
          {error}
        </div>
      )}

      {/* Attractions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {attractions.length === 0 ? (
          <div className="md:col-span-2 p-20 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 text-center">
            <span className="material-symbols-outlined text-6xl text-gray-200 dark:text-gray-700 mb-4">map</span>
            <p className="text-text-secondary dark:text-gray-400 font-bold uppercase tracking-widest">No attractions found</p>
          </div>
        ) : (
          attractions.map((attraction) => (
            <div key={attraction.id} className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-xl overflow-hidden group transition-all duration-300">
              <div className="flex flex-col sm:flex-row">
                <div className="relative w-full sm:w-48 h-48 sm:h-auto">
                  <OptimizedImage
                    src={attraction.image || "/images/heroes/Ext-Compund.webp"}
                    alt={attraction.name}
                    fill
                    className="object-cover"
                    unoptimized={!attraction.image?.startsWith("/")}
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant={attraction.is_active ? "success" : "neutral"} size="sm" className="bg-white/90 backdrop-blur-md shadow-sm uppercase tracking-widest font-black">
                      {attraction.is_active ? "Live" : "Draft"}
                    </Badge>
                  </div>
                </div>
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-black text-text-primary dark:text-white leading-tight">{attraction.name}</h3>
                      <Badge variant="primary" size="xs" className="flex-shrink-0 uppercase tracking-tighter">
                        {attraction.category}
                      </Badge>
                    </div>
                    <p className="text-text-secondary dark:text-gray-400 text-sm line-clamp-2 mb-4">
                      {attraction.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs font-bold text-text-primary dark:text-gray-300">
                      <span className="material-symbols-outlined text-base">near_me</span>
                      {attraction.distance} away
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-6">
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEdit(attraction)}>
                      Edit Detail
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={attraction.is_active ? "text-amber-600 hover:bg-amber-50" : "text-green-600 hover:bg-green-50"}
                      onClick={() => toggleActive(attraction.id, attraction.is_active)}
                    >
                      {attraction.is_active ? "Set to Draft" : "Go Live"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit Modal (Content Empowerment) */}
      {isEditing && selectedAttraction && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[110] animate-in fade-in duration-300">
          <div className="bg-white dark:bg-gray-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-text-primary dark:text-white tracking-tight">Edit Attraction</h2>
                <p className="text-xs text-text-secondary font-bold uppercase tracking-widest mt-1">Live Website Preview Enabled</p>
              </div>
              <button
                onClick={() => setIsEditing(false)}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 lg:grid lg:grid-cols-2 lg:gap-8">
              {/* Form Section */}
              <div className="space-y-6">
                <div>
                  <label className="flex items-center gap-2 text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] mb-2">
                    Attraction Name
                    <span className="material-symbols-outlined text-xs cursor-help" title="This will be the main heading for the attraction.">help</span>
                  </label>
                  <input
                    type="text"
                    value={editForm.name || ""}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-primary outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] mb-2 block">Category</label>
                    <select
                      value={editForm.category || ""}
                      onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                      className="w-full px-3 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-primary outline-none"
                    >
                      <option value="Culture">Culture</option>
                      <option value="Nature">Nature</option>
                      <option value="Religious Site">Religious Site</option>
                      <option value="Shopping">Shopping</option>
                      <option value="Dining">Dining</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] mb-2 block">Distance</label>
                    <input
                      type="text"
                      value={editForm.distance || ""}
                      onChange={(e) => setEditForm({ ...editForm, distance: e.target.value })}
                      placeholder="e.g. 5 km"
                      className="w-full px-3 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-primary outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] mb-2 block">Short Description</label>
                  <textarea
                    value={editForm.description || ""}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-primary outline-none resize-none"
                    placeholder="Briefly describe what makes this place special..."
                  />
                </div>

                <div>
                  <label className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] mb-2 block">Image URL</label>
                  <input
                    type="text"
                    value={editForm.image || ""}
                    onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-primary outline-none"
                    placeholder="/images/..."
                  />
                </div>
              </div>

              {/* Real-time Preview Section */}
              <div className="mt-8 lg:mt-0 space-y-4">
                <label className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] mb-2 block">Live Asset Preview</label>
                <div className="aspect-video rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-gray-50 dark:bg-gray-900 shadow-inner flex items-center justify-center group relative">
                  {editForm.image ? (
                    <OptimizedImage
                      src={editForm.image}
                      alt="Preview"
                      fill
                      className="object-cover"
                      unoptimized={!editForm.image.startsWith("/")}
                    />
                  ) : (
                    <div className="text-center p-8">
                      <span className="material-symbols-outlined text-4xl text-gray-300 mb-2">image</span>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Awaiting valid URL...</p>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <span className="text-white text-xs font-black uppercase tracking-widest">Manager Preview</span>
                  </div>
                </div>

                <div className="p-6 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-900/20">
                  <div className="flex items-center gap-2 text-blue-600 mb-2">
                    <span className="material-symbols-outlined text-xl">info</span>
                    <span className="text-[10px] font-black uppercase tracking-widest">Image Hint</span>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Your image should be high resolution (1920x1080 recommended) and show the primary landmark clearly.
                  </p>
                </div>

                <div className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-2xl flex items-center justify-between border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${editForm.is_active ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                      <span className="material-symbols-outlined">{editForm.is_active ? 'public' : 'inventory'}</span>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-text-primary dark:text-white uppercase tracking-widest">Visibility</p>
                      <p className="text-[9px] text-text-secondary font-bold uppercase tracking-tighter">{editForm.is_active ? 'Public on Main Website' : 'Hidden in Content Library'}</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={editForm.is_active || false}
                      onChange={(e) => setEditForm({ ...editForm, is_active: e.target.checked })}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Modal Footer (Dual Action Publishing) */}
            <div className="p-8 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 flex flex-col sm:flex-row justify-end gap-3">
              <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button variant="outline" onClick={() => handleSave(false)}>Save as Draft</Button>
              <Button onClick={() => handleSave(true)}>Publish Now</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
