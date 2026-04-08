import { NextRequest, NextResponse } from "next/server";
export const dynamic = 'force-dynamic';
import {
  getRooms,
  createRoom,
  updateRoom,
  deleteRoom,
  type Room
} from "@/lib/room-store";

/**
 * Admin Rooms API
 * Protected by middleware - requires admin authentication
 * CRUD operations for room management
 */

// GET /api/admin/rooms - List all rooms
export async function GET() {
  try {
    const rooms = await getRooms();
    return NextResponse.json(rooms);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return NextResponse.json(
      { error: "Failed to fetch rooms" },
      { status: 500 }
    );
  }
}

// POST /api/admin/rooms - Create new room
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.name || body.price_per_night === undefined) {
      return NextResponse.json(
        { error: "Missing required fields: name and price_per_night" },
        { status: 400 }
      );
    }

    // Validate price is a positive number
    if (typeof body.price_per_night !== "number" || body.price_per_night <= 0) {
      return NextResponse.json(
        { error: "Price per night must be a positive number" },
        { status: 400 }
      );
    }

    const room = await createRoom({
      name: body.name.trim(),
      description: body.description?.trim() || "",
      price_per_night: Number(body.price_per_night),
      max_guests: Number(body.max_guests) || 2,
      is_active: body.is_active !== undefined ? Boolean(body.is_active) : true,
      image_src: body.image_src,
      image_alt: body.image_alt,
      price_label: body.price_label || `From $${body.price_per_night} / night`,
      badges: body.badges || [],
      images: body.images || [],
    });

    return NextResponse.json(room, { status: 201 });
  } catch (error) {
    console.error("Error creating room:", error);
    return NextResponse.json(
      { error: "Failed to create room" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/rooms - Update existing room
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.id) {
      return NextResponse.json(
        { error: "Room ID is required" },
        { status: 400 }
      );
    }

    // Validate price if provided
    if (body.price_per_night !== undefined && (typeof body.price_per_night !== "number" || body.price_per_night <= 0)) {
      return NextResponse.json(
        { error: "Price per night must be a positive number" },
        { status: 400 }
      );
    }

    const updateData: Partial<Room> = {};
    if (body.name !== undefined) updateData.name = body.name.trim();
    if (body.description !== undefined) updateData.description = body.description.trim();
    if (body.price_per_night !== undefined) updateData.price_per_night = Number(body.price_per_night);
    if (body.max_guests !== undefined) updateData.max_guests = Number(body.max_guests);
    if (body.is_active !== undefined) updateData.is_active = Boolean(body.is_active);
    if (body.image_src !== undefined) updateData.image_src = body.image_src;
    if (body.image_alt !== undefined) updateData.image_alt = body.image_alt;
    if (body.images !== undefined) updateData.images = body.images;

    const updated = await updateRoom(body.id, updateData);
    if (!updated) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating room:", error);
    return NextResponse.json(
      { error: "Failed to update room" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/rooms - Delete room (soft delete)
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.id) {
      return NextResponse.json(
        { error: "Room ID is required" },
        { status: 400 }
      );
    }

    const success = await deleteRoom(body.id);
    if (!success) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting room:", error);
    return NextResponse.json(
      { error: "Failed to delete room" },
      { status: 500 }
    );
  }
}
