"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { ROOM_TYPES } from "@/lib/roomTypes";
import { ImagePlus, X, Loader2, AlertCircle, ArrowLeft } from "lucide-react";
import Button from "@/components/ui/Button";

export const dynamic = 'force-dynamic';

interface ImagePreview {
  file: File;
  preview: string;
}

export default function NewRoomPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedRoomType, setSelectedRoomType] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price_per_night: "",
    max_guests: "2"
  });
  const [images, setImages] = useState<ImagePreview[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [uploadError, setUploadError] = useState("");

  useEffect(() => {
    if (selectedRoomType) {
      const roomType = ROOM_TYPES.find(rt => rt.slug === selectedRoomType);
      if (roomType) {
        setFormData(prev => ({
          ...prev,
          name: roomType.name,
          price_per_night: roomType.price.toString(),
          max_guests: roomType.maxGuests.toString()
        }));
      }
    }
  }, [selectedRoomType]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (images.length + files.length > 5) {
      setError("Maximum 5 images allowed");
      return;
    }

    const validFiles = files.filter(file => {
      const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setError(`Invalid file type: ${file.name}. Use JPG, PNG, or WEBP.`);
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError(`File too large: ${file.name}. Max 5MB each.`);
        return false;
      }
      return true;
    });

    const newPreviews = validFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));

    setImages(prev => [...prev, ...newPreviews]);
    setError("");
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].preview);
      updated.splice(index, 1);
      return updated;
    });
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError("");
    setUploadError("");
    setLoading(true);

    try {
      if (!formData.name.trim() || !formData.price_per_night) {
        throw new Error("Room name and price are required");
      }

      const price = parseFloat(formData.price_per_night);
      if (isNaN(price) || price <= 0) {
        throw new Error("Price must be a positive number");
      }

      let imageUrls: string[] = [];

      if (images.length > 0) {
        setUploading(true);
        
        for (const img of images) {
          try {
            const filePath = `rooms/${Date.now()}-${img.file.name}`;
            const { data, error: uploadError } = await supabase.storage
              .from('room-images')
              .upload(filePath, img.file, { cacheControl: '3600', upsert: false });

            if (uploadError) {
              throw new Error(`Failed to upload ${img.file.name}`);
            }

            const { data: { publicUrl } } = supabase.storage
              .from('room-images')
              .getPublicUrl(filePath);

            imageUrls.push(publicUrl);
          } catch (err) {
            const errMsg = err instanceof Error ? err.message : `Failed to upload ${img.file.name}`;
            setUploadError(errMsg);
            setLoading(false);
            setUploading(false);
            return;
          }
        }
        setUploading(false);
      }

      const response = await fetch("/api/admin/rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          description: formData.description.trim(),
          price_per_night: price,
          max_guests: parseInt(formData.max_guests) || 2,
          images: imageUrls,
          image_src: imageUrls[0] || null,
          is_active: true
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create room");
      }

      router.push("/admin/rooms");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create room");
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-6 max-w-3xl">
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-500 hover:text-forest mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to Rooms</span>
        </button>
        <h1 className="text-2xl font-bold text-forest">Create New Room</h1>
        <p className="text-sm text-slate-500 mt-1">Add a new room to your hotel inventory</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-100 rounded-xl p-4 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {uploadError && (
          <div className="mb-6 bg-red-50 border border-red-100 rounded-xl p-4 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500" />
            <p className="text-sm text-red-600">{uploadError}</p>
          </div>
        )}

        <div className="space-y-6">
          {/* Room Type Selector */}
          <div>
            <label className="block text-sm font-semibold text-forest mb-2">
              Room Type *
            </label>
            <select
              value={selectedRoomType}
              onChange={(e) => setSelectedRoomType(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cactus focus:border-transparent outline-none transition-all bg-white"
              required
            >
              <option value="">Select a room type...</option>
              {ROOM_TYPES.map((type) => (
                <option key={type.slug} value={type.slug}>
                  {type.name} — ${type.price}/night (up to {type.maxGuests} guests)
                </option>
              ))}
            </select>
            <p className="text-xs text-slate-400 mt-1">Selecting a room type will auto-fill name, price, and max guests.</p>
          </div>

          {/* Room Name */}
          <div>
            <label className="block text-sm font-semibold text-forest mb-2">
              Room Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cactus focus:border-transparent outline-none transition-all"
              placeholder="e.g., Deluxe Suite"
              required
            />
          </div>

          {/* Price per Night */}
          <div>
            <label className="block text-sm font-semibold text-forest mb-2">
              Price per Night *
            </label>
            <div className="relative">
              <span className="absolute left-4 top-2.5 text-slate-400">$</span>
              <input
                type="number"
                value={formData.price_per_night}
                onChange={(e) => handleChange("price_per_night", e.target.value)}
                className="w-full pl-8 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cactus focus:border-transparent outline-none transition-all"
                placeholder="120"
                min="1"
                step="0.01"
                required
              />
            </div>
          </div>

          {/* Max Guests */}
          <div>
            <label className="block text-sm font-semibold text-forest mb-2">
              Maximum Guests
            </label>
            <select
              value={formData.max_guests}
              onChange={(e) => handleChange("max_guests", e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cactus focus:border-transparent outline-none transition-all"
            >
              <option value="1">1 Guest</option>
              <option value="2">2 Guests</option>
              <option value="3">3 Guests</option>
              <option value="4">4 Guests</option>
              <option value="5">5+ Guests</option>
            </select>
          </div>

          {/* Image Upload Section */}
          <div>
            <label className="block text-sm font-semibold text-forest mb-2">
              Room Photos
            </label>
            <p className="text-xs text-slate-400 mb-3">Upload up to 5 photos. First image will be used as the cover.</p>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              onChange={handleImageSelect}
              className="hidden"
            />

            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:border-cactus hover:bg-sandstone/50 transition-all cursor-pointer"
            >
              <ImagePlus className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm text-slate-500">Drag photos here or click to browse</p>
              <p className="text-xs text-slate-400 mt-1">JPG, PNG, WEBP — max 5MB each</p>
            </div>

            {/* Image Previews */}
            {images.length > 0 && (
              <div className="grid grid-cols-3 lg:grid-cols-5 gap-3 mt-4">
                {images.map((img, index) => (
                  <div key={index} className="aspect-square rounded-xl overflow-hidden relative bg-slate-100">
                    <img 
                      src={img.preview} 
                      alt={`Preview ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage(index);
                      }}
                      className="absolute top-1 right-1 bg-black/50 rounded-full p-0.5 hover:bg-red-500 transition-colors"
                    >
                      <X className="w-3 h-3 text-white" />
                    </button>
                    {index === 0 && (
                      <span className="absolute bottom-1 left-1 bg-cactus text-white text-xs px-1.5 py-0.5 rounded">
                        Cover
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-forest mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={4}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cactus focus:border-transparent outline-none transition-all resize-none"
              placeholder="Describe the room features, amenities, and what makes it special..."
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-slate-100">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2.5 text-slate-600 bg-slate-100 border border-slate-200 rounded-xl hover:bg-slate-200 transition-colors font-medium"
            disabled={loading || uploading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || uploading}
            className="px-6 py-2.5 bg-cactus text-white rounded-xl hover:bg-forest transition-colors font-medium disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading || uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {uploading ? "Uploading..." : "Creating..."}
              </>
            ) : (
              "Create Room"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
