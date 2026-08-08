import { NextRequest, NextResponse } from "next/server";
export const dynamic = 'force-dynamic';
import { getBookingById } from "@/lib/admin-booking-store";
import { verifyAdminAuth } from "@/lib/admin-auth";

function adminAuthCheck(request: NextRequest) {
  if (!verifyAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = adminAuthCheck(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    const booking = await getBookingById(id);

    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(booking);
  } catch (error) {
    console.error("Error fetching booking details:", error);
    return NextResponse.json(
      { error: "Failed to fetch booking details" },
      { status: 500 }
    );
  }
}
