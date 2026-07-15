"use client";

export const dynamic = 'force-dynamic';

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Blog } from "@/lib/models";
import { useToast } from "@/components/ui/Toast";
import { useFormGuard } from "@/lib/hooks/useFormGuard";
import Button from "@/components/ui/Button";
import OptimizedImage from "@/components/OptimizedImage";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { CircleHelp, Image, Send } from "lucide-react";

const ADMIN_SECRET = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "";

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const blogId = params.id as string;
  const { showToast } = useToast();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featured_image: "",
    author: "",
    is_published: false,
  });

  // Attach navigation guard
  useFormGuard(isDirty);

  useEffect(() => {
    loadBlog();
  }, [blogId]);

  const loadBlog = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/blogs`, {
        headers: { "x-admin-secret": ADMIN_SECRET },
      });
      if (!response.ok) throw new Error("Failed to load blogs");
      const blogs = await response.json();
      const found = blogs.find((b: Blog) => b.id === blogId);
      if (!found) {
        throw new Error("Blog not found");
      }
      setFormData({
        title: found.title,
        slug: found.slug,
        excerpt: found.excerpt || "",
        content: found.content || "",
        featured_image: found.featured_image || "",
        author: found.author || "",
        is_published: found.is_published,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load blog");
    } finally {
      setLoading(false);
    }
  };

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

  const handleSubmit = async (e?: React.SyntheticEvent, statusOverride?: boolean) => {
    e?.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      ...formData,
      is_published: statusOverride !== undefined ? statusOverride : formData.is_published,
    };

    try {
      const response = await fetch("/api/admin/blogs", {
        method: "PUT",
        headers: { "Content-Type": "application/json", "x-admin-secret": ADMIN_SECRET },
        body: JSON.stringify({ id: blogId, ...payload }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to update blog");
      }

      showToast("success", "Blog post updated successfully.");
      setIsDirty(false);

      setTimeout(() => {
        router.push("/admin/blogs");
      }, 500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update blog");
      showToast("error", "Failed to save changes.");
    } finally {
      setSaving(false);
    }
  };

  const executeDelete = async () => {
    try {
      const response = await fetch("/api/admin/blogs", {
        method: "DELETE",
        headers: { "Content-Type": "application/json", "x-admin-secret": ADMIN_SECRET },
        body: JSON.stringify({ id: blogId }),
      });

      if (!response.ok) throw new Error("Failed to delete blog");

      showToast("success", "Blog post deleted.");
      setIsDirty(false);
      router.push("/admin/blogs");
    } catch (err) {
      showToast("error", "Failed to delete blog post.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-text-secondary font-bold uppercase tracking-widest text-xs">Loading Post...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-700 pb-6">
        <div>
          <h1 className="text-3xl font-black text-text-primary dark:text-white tracking-tight">Edit Post</h1>
          <p className="text-text-secondary dark:text-gray-400 mt-1">Refining: {formData.title}</p>
        </div>
        <div className="flex gap-3">
          <Button variant="ghost" className="text-red-600 hover:bg-red-50" onClick={() => setIsDeleteModalOpen(true)}>
            Delete
          </Button>
          <Button variant="outline" onClick={() => handleSubmit(undefined, false)} disabled={saving}>
            Save as Draft
          </Button>
          <Button onClick={() => handleSubmit(undefined, true)} isLoading={saving}>
            Update & Publish
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-xl space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-black text-text-primary dark:text-white uppercase tracking-widest mb-2">
                Blog Title
                <CircleHelp className="w-4 h-4 text-gray-400" />
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary outline-none transition-all"
              />
            </div>

            <div>
              <label className="text-sm font-black text-text-primary dark:text-white uppercase tracking-widest mb-2 block">
                Excerpt
              </label>
              <textarea
                name="excerpt"
                rows={3}
                value={formData.excerpt}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
                placeholder="A short summary..."
              />
            </div>

            <div>
              <label className="text-sm font-black text-text-primary dark:text-white uppercase tracking-widest mb-2 block">
                Content (Markdown)
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => handleContentChange(e.target.value)}
                rows={15}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary outline-none transition-all font-mono text-sm leading-relaxed"
              />
            </div>
          </div>
        </form>

        <aside className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-xl">
            <h3 className="text-sm font-black text-text-primary dark:text-white uppercase tracking-widest mb-6">
              Publishing Info
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
                  Featured Image Preview
                </label>
                <div className="aspect-video rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden bg-gray-100 mb-3 relative group">
                  {formData.featured_image ? (
                    <OptimizedImage
                      src={formData.featured_image}
                      alt="Preview"
                      fill
                      className="object-cover"
                      unoptimized={!formData.featured_image.startsWith("/")}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-300">
                      <Image className="w-10 h-10" />
                    </div>
                  )}
                </div>
                <input
                  type="text"
                  name="featured_image"
                  value={formData.featured_image}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-xs border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-primary outline-none"
                  placeholder="Paste URL here..."
                />
              </div>
            </div>
          </div>

          <div className="p-6 bg-primary/5 rounded-3xl border border-primary/10">
            <div className="flex items-center gap-3 text-primary mb-2">
              <Send className="w-5 h-5" />
              <span className="text-sm font-bold uppercase tracking-widest">Status: {formData.is_published ? 'Published' : 'Draft'}</span>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed font-medium">
              {formData.is_published
                ? "This post is currently live on your website and visible to all guests."
                : "This post is currently a draft. Use 'Update & Publish' to make it live."
              }
            </p>
          </div>
        </aside>
      </div>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Delete Blog Post"
        message={`Are you sure you want to delete "${formData.title}"? This action is permanent and cannot be reversed.`}
        confirmLabel="Yes, Delete Post"
        variant="danger"
        onConfirm={executeDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
}
