import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const EMAIL_CONFIG = {
  from: "Canaan International Hotel <bookings@canaanhotels.com>",
  hotelEmail: process.env.HOTEL_ALERT_EMAIL ?? "info@canaanhotels.com",
  hotelPhone: "+251 911 095 728",
  hotelAddress: "Kebele 03, Adigrat, Tigray 1000, Ethiopia",
  checkInTime: "12:00 PM",
  checkOutTime: "11:00 AM",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://canaanhotels.com",
};

export async function sendEmail(params: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    console.warn("[email] RESEND_API_KEY not configured — email skipped");
    return;
  }
  try {
    const { error } = await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to: params.to,
      subject: params.subject,
      html: params.html,
      replyTo: params.replyTo ?? EMAIL_CONFIG.hotelEmail,
    });
    if (error) throw new Error(JSON.stringify(error));
    console.log("[email] Sent to:", params.to, "| Subject:", params.subject);
  } catch (err) {
    console.error("[email] Send failed (non-fatal):", err);
  }
}