"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
}

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");

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

  const handleDelete = async (blogId: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    try {
      const response = await fetch("/api/admin/blogs", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: blogId }),
      });

      if (!response.ok) throw new Error("Failed to delete blog");

      setBlogs(blogs.filter((b) => b.id !== blogId));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete blog");
    }
  };

  const filteredBlogs = blogs.filter((blog) => {
    if (filter === "published") return blog.is_published;
    if (filter === "draft") return !blog.is_published;
    return true;
  });

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blogs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-red-900 font-medium">Error loading blogs</h3>
          <p className="text-red-700 text-sm mt-1">{error}</p>
          <button
            onClick={loadBlogs}
            className="mt-3 px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700"
          >
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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Blog Management
          </h1>
          <p className="text-gray-600">Create and manage blog posts</p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:opacity-90"
        >
          Add New Post
        </Link>
      </div>

      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === "all"
              ? "bg-primary text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          All ({blogs.length})
        </button>
        <button
          onClick={() => setFilter("published")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === "published"
              ? "bg-primary text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Published ({blogs.filter((b) => b.is_published).length})
        </button>
        <button
          onClick={() => setFilter("draft")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === "draft"
              ? "bg-primary text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Drafts ({blogs.filter((b) => !b.is_published).length})
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            All Posts ({filteredBlogs.length})
          </h2>
        </div>

        <div className="divide-y">
          {filteredBlogs.map((blog) => (
            <div key={blog.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {blog.title}
                    </h3>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        blog.is_published
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {blog.is_published ? "Published" : "Draft"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                    {blog.excerpt || "No excerpt"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {blog.author} •{" "}
                    {blog.published_at
                      ? new Date(blog.published_at).toLocaleDateString()
                      : "Not published"}
                  </p>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <Link
                    href={`/admin/blogs/${blog.id}`}
                    className="px-3 py-2 text-sm font-medium bg-primary text-white rounded-md hover:opacity-90"
                  >
                    Edit
                  </Link>
                  <Link
                    href={`/blog/${blog.slug}`}
                    target="_blank"
                    className="px-3 py-2 text-sm font-medium bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="px-3 py-2 text-sm font-medium bg-red-100 text-red-800 rounded-md hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredBlogs.length === 0 && (
          <div className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No blog posts yet
            </h3>
            <p className="text-gray-600 mb-4">
              Get started by creating your first blog post
            </p>
            <Link
              href="/admin/blogs/new"
              className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-medium hover:opacity-90"
            >
              Create First Post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
