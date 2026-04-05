import { NextRequest, NextResponse } from "next/server";
import { getRoomById } from "@/lib/room-store";

/**
 * Admin Single Room API
 * GET /api/admin/rooms/[id] - Get details for a specific room
 */
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const room = await getRoomById(id);

        if (!room) {
            return NextResponse.json(
                { error: "Room not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(room);
    } catch (error) {
        console.error("Error fetching room:", error);
        return NextResponse.json(
            { error: "Failed to fetch room" },
            { status: 500 }
        );
    }
}
