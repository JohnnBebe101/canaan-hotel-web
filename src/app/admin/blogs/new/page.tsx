"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useToast } from "@/components/ui/Toast";
import { useFormGuard } from "@/lib/hooks/useFormGuard";
import Button from "@/components/ui/Button";
import OptimizedImage from "@/components/OptimizedImage";

export default function NewBlogPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featured_image: "/images/heroes/Ext-Compund.webp",
    author: "Canaan Hotel Team",
    is_published: false,
  });

  // Attach navigation guard
  useFormGuard(isDirty);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
    setIsDirty(true);
  };

  const handleContentChange = (content: string) => {
    setFormData((prev) => ({ ...prev, content }));
    setIsDirty(true);
  };

  const handleSubmit = async (e?: React.SyntheticEvent, status?: "draft" | "published") => {
    e?.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      ...formData,
      is_published: status === "published",
    };

    try {
      const response = await fetch("/api/admin/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create blog");
      }

      showToast("success", status === "published" ? "Blog published!" : "Draft saved successfully.");
      setIsDirty(false); // Reset dirty state before navigation

      // Delay navigation slightly to allow toast to be seen
      setTimeout(() => {
        router.push("/admin/blogs");
      }, 500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create blog");
      showToast("error", "Failed to save blog post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-700 pb-6">
        <div>
          <h1 className="text-3xl font-black text-text-primary dark:text-white tracking-tight">Create New Post</h1>
          <p className="text-text-secondary dark:text-gray-400 mt-1">Share stories and updates from Canaan Hotel.</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={(e) => handleSubmit(e, "draft")}
            disabled={loading}
          >
            Save Draft
          </Button>
          <Button
            onClick={(e) => handleSubmit(e, "published")}
            disabled={loading}
          >
            Publish Now
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-xl space-y-6">
            <div>
              <label className="block text-sm font-black text-text-primary dark:text-white uppercase tracking-widest mb-2">
                Blog Title
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary outline-none transition-all"
                placeholder="e.g. 5 Reasons to Visit Adigrat This Summer"
              />
            </div>

            <div>
              <label className="block text-sm font-black text-text-primary dark:text-white uppercase tracking-widest mb-2">
                Excerpt
              </label>
              <textarea
                name="excerpt"
                rows={3}
                value={formData.excerpt}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
                placeholder="A short summary that appears in the blog list..."
              />
            </div>

            <div>
              <label className="block text-sm font-black text-text-primary dark:text-white uppercase tracking-widest mb-2">
                Content (Markdown Supported)
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => handleContentChange(e.target.value)}
                rows={12}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary outline-none transition-all font-mono text-sm leading-relaxed"
                placeholder="Write your story here..."
              />
            </div>
          </div>
        </form>

        <aside className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-xl">
            <h3 className="text-sm font-black text-text-primary dark:text-white uppercase tracking-widest mb-6">
              Post Settings
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] mb-1.5">
                  URL Slug
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-primary outline-none"
                  placeholder="auto-generated-slug"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] mb-1.5">
                  Author
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              <div className="pt-4">
                <label className="block text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] mb-2">
                  Featured Image
                </label>
                <div className="aspect-video rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden bg-gray-50 mb-3 relative group">
                  <OptimizedImage
                    src={formData.featured_image}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                </div>
                <input
                  type="text"
                  name="featured_image"
                  value={formData.featured_image}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-xs border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-primary outline-none"
                  placeholder="Image URL..."
                />
              </div>
            </div>
          </div>

          <div className="p-6 bg-primary/5 rounded-3xl border border-primary/10">
            <div className="flex items-center gap-3 text-primary mb-2">
              <span className="material-symbols-outlined">info</span>
              <span className="text-sm font-bold">SEO Tip</span>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
              Include relevant keywords in your title and first paragraph to help travelers find Canaan Hotel on Google.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
