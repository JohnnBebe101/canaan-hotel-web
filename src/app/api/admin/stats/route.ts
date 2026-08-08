import { NextRequest, NextResponse } from "next/server";
export const dynamic = 'force-dynamic';
import { getBookingStats } from "@/lib/admin-booking-store";
import { verifyAdminAuth } from "@/lib/admin-auth";

function adminAuthCheck(request: NextRequest) {
  if (!verifyAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

// GET /api/admin/stats - Get dashboard statistics
export async function GET(request: NextRequest) {
  const authError = adminAuthCheck(request);
  if (authError) return authError;
    try {
        const stats = await getBookingStats();
        return NextResponse.json(stats);
    } catch (error) {
        console.error("Error fetching stats:", error);
        return NextResponse.json(
            { error: "Failed to fetch statistics" },
            { status: 500 }
        );
    }
}
