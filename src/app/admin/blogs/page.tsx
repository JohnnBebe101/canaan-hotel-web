"use client";

export const dynamic = 'force-dynamic';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Blog } from "@/lib/models";
import { useToast } from "@/components/ui/Toast";
import ConfirmModal from "@/components/ui/ConfirmModal";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import OptimizedImage from "@/components/OptimizedImage";
import { Plus, FileText, Delete, BookOpen } from "lucide-react";

export default function AdminBlogsPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");
  const { showToast } = useToast();

  const [confirmConfig, setConfirmConfig] = useState<{
    isOpen: boolean;
    blogId: string;
    title: string;
    message: string;
  }>({
    isOpen: false,
    blogId: "",
    title: "",
    message: "",
  });

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/blogs");
      if (!response.ok) throw new Error("Failed to load blogs");
      const data = await response.json();
      setBlogs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRequest = (blogId: string) => {
    const blog = blogs.find((b) => b.id === blogId);
    if (!blog) return;

    setConfirmConfig({
      isOpen: true,
      blogId,
      title: "Delete Blog Post",
      message: `Are you sure you want to delete "${blog.title}"? This action is permanent.`,
    });
  };

  const executeDelete = async () => {
    const { blogId } = confirmConfig;
    if (!blogId) return;

    try {
      const response = await fetch("/api/admin/blogs", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: blogId }),
      });

      if (!response.ok) throw new Error("Failed to delete blog");

      setBlogs(blogs.filter((b) => b.id !== blogId));
      showToast("success", "Blog post deleted successfully.");
    } catch (err) {
      showToast("error", "An error occurred while deleting the post.");
    } finally {
      setConfirmConfig((prev) => ({ ...prev, isOpen: false }));
    }
  };

  const filteredBlogs = blogs.filter((blog) => {
    if (filter === "published") return blog.is_published;
    if (filter === "draft") return !blog.is_published;
    return true;
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-text-secondary font-bold uppercase tracking-widest text-xs">Syncing Stories...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-text-primary dark:text-white tracking-tight">Blog Management</h1>
          <p className="text-text-secondary dark:text-gray-400 mt-1">Curate and publish hotel updates and travel tips.</p>
        </div>
        <Button onClick={() => router.push('/admin/blogs/new')} size="lg">
          <Plus className="w-4 h-4 mr-2" />
          New Post
        </Button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setFilter("all")}
          className={`flex-shrink-0 px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${filter === "all"
            ? "bg-primary text-white shadow-lg shadow-primary/30"
            : "bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200"
            }`}
        >
          All ({blogs.length})
        </button>
        <button
          onClick={() => setFilter("published")}
          className={`flex-shrink-0 px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${filter === "published"
            ? "bg-green-600 text-white shadow-lg shadow-green-600/30"
            : "bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200"
            }`}
        >
          Published ({blogs.filter((b) => b.is_published).length})
        </button>
        <button
          onClick={() => setFilter("draft")}
          className={`flex-shrink-0 px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${filter === "draft"
            ? "bg-amber-500 text-white shadow-lg shadow-amber-500/30"
            : "bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200"
            }`}
        >
          Drafts ({blogs.filter((b) => !b.is_published).length})
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredBlogs.map((blog) => (
          <div key={blog.id} className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-xl overflow-hidden flex flex-col group hover:shadow-2xl transition-all duration-300">
            <div className="relative h-48 w-full overflow-hidden">
              <OptimizedImage
                src={blog.featured_image || "/images/heroes/Ext-Compund.webp"}
                alt={blog.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                unoptimized={!blog.featured_image?.startsWith("/")}
              />
              <div className="absolute top-4 left-4">
                <Badge variant={blog.is_published ? "success" : "warning"} size="sm" className="bg-white/90 backdrop-blur-md shadow-sm uppercase tracking-widest font-black">
                  {blog.is_published ? "Published" : "Draft"}
                </Badge>
              </div>
            </div>
            <div className="p-8 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-black text-text-primary dark:text-white leading-tight mb-3 line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-text-secondary dark:text-gray-400 text-sm line-clamp-2 mb-6 font-medium">
                  {blog.excerpt || "No excerpt provided for this post."}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-gray-50 dark:border-gray-700 pt-6 mt-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-black text-primary uppercase">
                    {blog.author.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="text-[10px] text-text-secondary font-black uppercase tracking-[0.1em]">
                    {blog.author} • {blog.published_at ? new Date(blog.published_at).toLocaleDateString() : 'Unpublished'}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/blogs/${blog.id}`}
                    className="p-2.5 bg-gray-100 dark:bg-gray-700 text-text-primary dark:text-white rounded-xl hover:bg-primary hover:text-white transition-all"
                    title="Edit Post"
                  >
                    <FileText className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => handleDeleteRequest(blog.id)}
                    className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"
                    title="Delete Post"
                  >
                    <Delete className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredBlogs.length === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-20 text-center">
          <div className="w-20 h-20 bg-gray-50 dark:bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-10 h-10 text-gray-300" />
          </div>
          <h2 className="text-2xl font-black text-text-primary dark:text-white mb-2">No Stories Yet</h2>
          <p className="text-text-secondary dark:text-gray-400 mb-8 max-w-sm mx-auto font-medium">
            Start building your hotel's presence by sharing interesting stories and local tips.
          </p>
          <Button onClick={() => router.push('/admin/blogs/new')} size="lg">
            Create First Post
          </Button>
        </div>
      )}

      <ConfirmModal
        isOpen={confirmConfig.isOpen}
        title={confirmConfig.title}
        message={confirmConfig.message}
        variant="danger"
        confirmLabel="Delete Permanently"
        onConfirm={executeDelete}
        onCancel={() => setConfirmConfig((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
