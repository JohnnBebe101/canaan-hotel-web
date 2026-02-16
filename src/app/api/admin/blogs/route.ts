import { NextRequest, NextResponse } from "next/server";
import {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  generateSlug,
  type Blog
} from "@/lib/blog-store";

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    const slug = body.slug || generateSlug(body.title);

    const blogData = {
      title: body.title.trim(),
      slug,
      excerpt: body.excerpt?.trim() || "",
      content: body.content || "",
      featured_image: body.featured_image || "/images/heroes/Ext-Compund.webp",
      author: body.author?.trim() || "Canaan Hotel Team",
      is_published: body.is_published || false,
      published_at: body.is_published ? new Date().toISOString() : null,
    };

    const blog = await createBlog(blogData);
    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.id) {
      return NextResponse.json(
        { error: "Blog ID is required" },
        { status: 400 }
      );
    }

    const existingBlog = await getBlogById(body.id);
    if (!existingBlog) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }

    const updateData: Partial<Blog> = {};

    if (body.title !== undefined) {
      updateData.title = body.title.trim();
      if (!body.slug) {
        updateData.slug = generateSlug(body.title);
      }
    }

    if (body.slug !== undefined) {
      updateData.slug = body.slug;
    }

    if (body.excerpt !== undefined) {
      updateData.excerpt = body.excerpt.trim();
    }

    if (body.content !== undefined) {
      updateData.content = body.content;
    }

    if (body.featured_image !== undefined) {
      updateData.featured_image = body.featured_image;
    }

    if (body.author !== undefined) {
      updateData.author = body.author.trim();
    }

    if (body.is_published !== undefined) {
      updateData.is_published = body.is_published;
      if (body.is_published && !existingBlog.published_at) {
        updateData.published_at = new Date().toISOString();
      } else if (!body.is_published) {
        updateData.published_at = null;
      }
    }

    const updated = await updateBlog(body.id, updateData);
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { error: "Failed to update blog" },
      { status: 500 }
    );
  }
}

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
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
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
