import { NextRequest, NextResponse } from "next/server";
import {
  getRooms,
  createRoom,
  updateRoom,
  deleteRoom,
} from "@/lib/room-store";

/**
 * Admin Rooms API
 * Protected by middleware - requires admin authentication
 * CRUD operations for room management
 */

// GET /api/admin/rooms - List all rooms
export async function GET() {
  try {
    const rooms = getRooms();
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
    if (!body.name || body.pricePerNight === undefined) {
      return NextResponse.json(
        { error: "Missing required fields: name and pricePerNight" },
        { status: 400 }
      );
    }

    // Validate price is a positive number
    if (typeof body.pricePerNight !== "number" || body.pricePerNight <= 0) {
      return NextResponse.json(
        { error: "Price per night must be a positive number" },
        { status: 400 }
      );
    }

    const room = createRoom({
      name: body.name.trim(),
      description: body.description?.trim() || "",
      pricePerNight: Number(body.pricePerNight),
      maxGuests: Number(body.maxGuests) || 2,
      isActive: body.isActive !== undefined ? Boolean(body.isActive) : true,
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
    if (body.pricePerNight !== undefined && (typeof body.pricePerNight !== "number" || body.pricePerNight <= 0)) {
      return NextResponse.json(
        { error: "Price per night must be a positive number" },
        { status: 400 }
      );
    }

    const updateData: any = {};
    if (body.name !== undefined) updateData.name = body.name.trim();
    if (body.description !== undefined) updateData.description = body.description.trim();
    if (body.pricePerNight !== undefined) updateData.pricePerNight = Number(body.pricePerNight);
    if (body.maxGuests !== undefined) updateData.maxGuests = Number(body.maxGuests);
    if (body.isActive !== undefined) updateData.isActive = Boolean(body.isActive);

    const updated = updateRoom(body.id, updateData);
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

// DELETE /api/admin/rooms - Delete room
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.id) {
      return NextResponse.json(
        { error: "Room ID is required" },
        { status: 400 }
      );
    }

    const success = deleteRoom(body.id);
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
