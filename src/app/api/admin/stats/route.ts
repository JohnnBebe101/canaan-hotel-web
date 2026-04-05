import { NextResponse } from "next/server";
import { getBookingStats } from "@/lib/booking-store";

// GET /api/admin/stats - Get dashboard statistics
export async function GET() {
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
