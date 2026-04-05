import { NextResponse } from "next/server";
import { getPublishedBlogs, getLatestBlogs, getBlogBySlug } from "@/lib/blog-store";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const latest = searchParams.get("latest");

    if (slug) {
      const blog = await getBlogBySlug(slug);
      if (!blog) {
        return NextResponse.json(
          { error: "Blog not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(blog);
    }

    if (latest) {
      const limit = parseInt(latest, 10) || 2;
      const blogs = await getLatestBlogs(limit);
      return NextResponse.json(blogs);
    }

    const blogs = await getPublishedBlogs();
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
