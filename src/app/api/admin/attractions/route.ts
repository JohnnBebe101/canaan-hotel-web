import { NextRequest, NextResponse } from "next/server";
import {
  getAttractions,
  createAttraction,
  updateAttraction,
  deleteAttraction,
  type Attraction
} from "@/lib/attraction-store";

/**
 * Admin Attractions API
 * Protected by middleware - requires admin authentication
 * CRUD operations for attraction management
 */

export async function GET() {
  try {
    const attractions = await getAttractions();
    return NextResponse.json(attractions);
  } catch (error) {
    console.error("Error fetching attractions:", error);
    return NextResponse.json({ error: "Failed to fetch attractions" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!body.name) {
      return NextResponse.json({ error: "Missing required field: name" }, { status: 400 });
    }
    
    const attraction = await createAttraction({
      name: body.name.trim(),
      description: body.description?.trim() || "",
      category: body.category?.trim() || "Uncategorized",
      distance: body.distance?.trim() || "Unknown",
      image: body.image || "/images/heroes/Ext-Compund.webp",
      is_active: body.is_active !== undefined ? Boolean(body.is_active) : true,
    });
    
    return NextResponse.json(attraction, { status: 201 });
  } catch (error) {
    console.error("Error creating attraction:", error);
    return NextResponse.json({ error: "Failed to create attraction" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!body.id) {
      return NextResponse.json({ error: "Attraction ID is required" }, { status: 400 });
    }
    
    const updateData: Partial<Attraction> = {};
    if (body.name !== undefined) updateData.name = body.name.trim();
    if (body.description !== undefined) updateData.description = body.description.trim();
    if (body.category !== undefined) updateData.category = body.category.trim();
    if (body.distance !== undefined) updateData.distance = body.distance.trim();
    if (body.image !== undefined) updateData.image = body.image;
    if (body.is_active !== undefined) updateData.is_active = Boolean(body.is_active);
    
    const updated = await updateAttraction(body.id, updateData);
    if (!updated) {
      return NextResponse.json({ error: "Attraction not found" }, { status: 404 });
    }
    
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating attraction:", error);
    return NextResponse.json({ error: "Failed to update attraction" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!body.id) {
      return NextResponse.json({ error: "Attraction ID is required" }, { status: 400 });
    }
    
    const success = await deleteAttraction(body.id);
    if (!success) {
      return NextResponse.json({ error: "Attraction not found" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting attraction:", error);
    return NextResponse.json({ error: "Failed to delete attraction" }, { status: 500 });
  }
}
