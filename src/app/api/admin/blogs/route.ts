import { NextRequest, NextResponse } from "next/server";
import {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  generateSlug
} from "@/lib/blog-store";

// GET - List all blogs
export async function GET() {
  try {
    const blogs = await getBlogs();
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

// POST - Create a new blog post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.title) {
      return NextResponse.json(
        { error: "Blog title is required" },
        { status: 400 }
      );
    }

    const blog = await createBlog({
      title: body.title.trim(),
      slug: body.slug || generateSlug(body.title),
      excerpt: body.excerpt?.trim() || "",
      content: body.content?.trim() || "",
      featured_image: body.featured_image || "",
      author: body.author?.trim() || "Admin",
      is_published: body.is_published !== undefined ? Boolean(body.is_published) : false,
      published_at: body.is_published ? new Date().toISOString() : null,
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 }
    );
  }
}

// PUT - Update a blog post
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.id) {
      return NextResponse.json(
        { error: "Blog ID is required" },
        { status: 400 }
      );
    }

    const updates = { ...body };
    if (updates.is_published && !updates.published_at) {
      updates.published_at = new Date().toISOString();
    }

    const updated = await updateBlog(body.id, updates);
    if (!updated) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { error: "Failed to update blog" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a blog post
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.id) {
      return NextResponse.json(
        { error: "Blog ID is required" },
        { status: 400 }
      );
    }

    const success = await deleteBlog(body.id);
    if (!success) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { error: "Failed to delete blog" },
      { status: 500 }
    );
  }
}
