import { NextRequest, NextResponse } from "next/server";
export const dynamic = 'force-dynamic';
import { getRoomById } from "@/lib/admin-room-store";
import { verifyAdminAuth } from "@/lib/admin-auth";

function adminAuthCheck(request: NextRequest) {
  if (!verifyAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

/**
 * Admin Single Room API
 * GET /api/admin/rooms/[id] - Get details for a specific room
 */
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const authError = adminAuthCheck(request);
    if (authError) return authError;

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
