import type { Booking } from "@/lib/supabase";
import { EMAIL_CONFIG } from "./resend";

function fmtDate(d: string): string {
  return new Date(d).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function fmtAmount(cents: number): string {
  return `$${(cents / 100).toFixed(2)} USD`;
}

const hotelFooter = `
<table cellpadding="0" cellspacing="0" style="width:100%;margin-top:30px;border-top:1px solid #e5e7eb;">
  <tr>
    <td style="padding-top:20px;font-size:12px;color:#6b7280;">
      <p style="margin:0;font-weight:600;">Canaan International Hotel</p>
      <p style="margin:5px 0;">${EMAIL_CONFIG.hotelAddress}</p>
      <p style="margin:5px 0;">Phone: ${EMAIL_CONFIG.hotelPhone}</p>
      <p style="margin:5px 0;">Check-in: ${EMAIL_CONFIG.checkInTime} | Check-out: ${EMAIL_CONFIG.checkOutTime}</p>
    </td>
  </tr>
</table>`;

export function emailPaymentReceived(b: Booking): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Payment Received</title></head>
<body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
  <h1 style="color:#166534;">Payment Received!</h1>
  <p>Dear ${b.guest_name},</p>
  <p>We have received your payment of <strong>${fmtAmount(b.total_price_cents || b.total_price * 100)}</strong>.</p>
  <p>We are now verifying room availability. You will receive a confirmation email within the next 2 hours.</p>
  <table cellpadding="10" cellspacing="0" style="width:100%;border-collapse:collapse;margin:20px 0;">
    <tr><td style="background:#f9fafb;border:1px solid #e5e7eb;"><strong>Booking Reference:</strong></td><td style="background:#f9fafb;border:1px solid #e5e7eb;">${b.booking_reference || 'Pending'}</td></tr>
    <tr><td style="border:1px solid #e5e7eb;"><strong>Room Type:</strong></td><td style="border:1px solid #e5e7eb;">${b.room_type}</td></tr>
    <tr><td style="background:#f9fafb;border:1px solid #e5e7eb;"><strong>Check-in:</strong></td><td style="background:#f9fafb;border:1px solid #e5e7eb;">${fmtDate(b.check_in_date)}</td></tr>
    <tr><td style="border:1px solid #e5e7eb;"><strong>Check-out:</strong></td><td style="border:1px solid #e5e7eb;">${fmtDate(b.check_out_date)}</td></tr>
    <tr><td style="background:#f9fafb;border:1px solid #e5e7eb;"><strong>Total Amount:</strong></td><td style="background:#f9fafb;border:1px solid #e5e7eb;">${fmtAmount(b.total_price_cents || b.total_price * 100)}</td></tr>
  </table>
  <p>If you have any questions, please contact us.</p>
  ${hotelFooter}
</body>
</html>`;
}

export function emailStaffNewBookingAlert(b: Booking): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>New Paid Booking</title></head>
<body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
  <h1 style="color:#dc2626;">⚠️ New Paid Booking — Action Required</h1>
  <p>A new booking has been paid and requires availability verification.</p>
  <p><strong>Please verify within 2 hours.</strong></p>
  <table cellpadding="10" cellspacing="0" style="width:100%;border-collapse:collapse;margin:20px 0;">
    <tr><td style="background:#fef3c7;border:1px solid #e5e7eb;"><strong>Reference:</strong></td><td style="background:#fef3c7;border:1px solid #e5e7eb;font-size:18px;font-weight:bold;">${b.booking_reference || 'Pending'}</td></tr>
    <tr><td style="border:1px solid #e5e7eb;"><strong>Guest:</strong></td><td style="border:1px solid #e5e7eb;">${b.guest_name}</td></tr>
    <tr><td style="background:#f9fafb;border:1px solid #e5e7eb;"><strong>Email:</strong></td><td style="background:#f9fafb;border:1px solid #e5e7eb;">${b.email}</td></tr>
    <tr><td style="border:1px solid #e5e7eb;"><strong>Phone:</strong></td><td style="border:1px solid #e5e7eb;">${b.phone || 'N/A'}</td></tr>
    <tr><td style="background:#f9fafb;border:1px solid #e5e7eb;"><strong>Room:</strong></td><td style="background:#f9fafb;border:1px solid #e5e7eb;">${b.room_type}</td></tr>
    <tr><td style="border:1px solid #e5e7eb;"><strong>Check-in:</strong></td><td style="border:1px solid #e5e7eb;">${fmtDate(b.check_in_date)}</td></tr>
    <tr><td style="background:#f9fafb;border:1px solid #e5e7eb;"><strong>Check-out:</strong></td><td style="background:#f9fafb;border:1px solid #e5e7eb;">${fmtDate(b.check_out_date)}</td></tr>
    <tr><td style="border:1px solid #e5e7eb;"><strong>Guests:</strong></td><td style="border:1px solid #e5e7eb;">${b.number_of_guests}</td></tr>
    <tr><td style="background:#fef3c7;border:1px solid #e5e7eb;"><strong>Amount:</strong></td><td style="background:#fef3c7;border:1px solid #e5e7eb;font-weight:bold;">${fmtAmount(b.total_price_cents || b.total_price * 100)}</td></tr>
  </table>
  <p>Go to <a href="${EMAIL_CONFIG.siteUrl}/admin">Admin Dashboard</a> to confirm or flag a conflict.</p>
  ${hotelFooter}
</body>
</html>`;
}

export function emailBookingConfirmed(b: Booking): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Booking Confirmed</title></head>
<body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
  <h1 style="color:#166534;">✓ Booking Confirmed!</h1>
  <p>Dear ${b.guest_name},</p>
  <p>Your booking at Canaan International Hotel is <strong>confirmed</strong>.</p>
  <p>We look forward to hosting you!</p>
  <table cellpadding="10" cellspacing="0" style="width:100%;border-collapse:collapse;margin:20px 0;">
    <tr><td style="background:#ecfdf5;border:1px solid #10b981;"><strong>Booking Reference:</strong></td><td style="background:#ecfdf5;border:1px solid #10b981;font-size:18px;font-weight:bold;">${b.booking_reference || 'Pending'}</td></tr>
    <tr><td style="border:1px solid #e5e7eb;"><strong>Room Type:</strong></td><td style="border:1px solid #e5e7eb;">${b.room_type}</td></tr>
    <tr><td style="background:#f9fafb;border:1px solid #e5e7eb;"><strong>Check-in:</strong></td><td style="background:#f9fafb;border:1px solid #e5e7eb;">${fmtDate(b.check_in_date)}</td></tr>
    <tr><td style="border:1px solid #e5e7eb;"><strong>Check-out:</strong></td><td style="border:1px solid #e5e7eb;">${fmtDate(b.check_out_date)}</td></tr>
    <tr><td style="background:#f9fafb;border:1px solid #e5e7eb;"><strong>Total Paid:</strong></td><td style="background:#f9fafb;border:1px solid #e5e7eb;font-weight:bold;">${fmtAmount(b.total_price_cents || b.total_price * 100)}</td></tr>
  </table>
  <p><strong>Check-in:</strong> ${EMAIL_CONFIG.checkInTime} | <strong>Check-out:</strong> ${EMAIL_CONFIG.checkOutTime}</p>
  <p>Address: ${EMAIL_CONFIG.hotelAddress}</p>
  <p>If you need to modify or cancel your booking, please contact us at least 24 hours before check-in.</p>
  ${hotelFooter}
</body>
</html>`;
}

export function emailConflictRefund(b: Booking): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Booking Issue</title></head>
<body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
  <h1 style="color:#dc2626;">Important: Booking Issue</h1>
  <p>Dear ${b.guest_name},</p>
  <p>We sincerely apologize, but we are unable to confirm your reservation for the dates requested due to a room availability conflict.</p>
  <p><strong>A full refund has been initiated.</strong></p>
  <table cellpadding="10" cellspacing="0" style="width:100%;border-collapse:collapse;margin:20px 0;">
    <tr><td style="background:#fef2f2;border:1px solid #ef4444;"><strong>Booking Reference:</strong></td><td style="background:#fef2f2;border:1px solid #ef4444;">${b.booking_reference || 'N/A'}</td></tr>
    <tr><td style="border:1px solid #e5e7eb;"><strong>Room Type:</strong></td><td style="border:1px solid #e5e7eb;">${b.room_type}</td></tr>
    <tr><td style="background:#f9fafb;border:1px solid #e5e7eb;"><strong>Check-in:</strong></td><td style="background:#f9fafb;border:1px solid #e5e7eb;">${fmtDate(b.check_in_date)}</td></tr>
    <tr><td style="border:1px solid #e5e7eb;"><strong>Check-out:</strong></td><td style="border:1px solid #e5e7eb;">${fmtDate(b.check_out_date)}</td></tr>
    <tr><td style="background:#fef2f2;border:1px solid #ef4444;"><strong>Refund Amount:</strong></td><td style="background:#fef2f2;border:1px solid #ef4444;font-weight:bold;">${fmtAmount(b.total_price_cents || b.total_price * 100)}</td></tr>
  </table>
  <p>Please allow 5-10 business days for the refund to appear in your account.</p>
  <p>We apologize for the inconvenience. Please contact us if you would like to rebook for different dates.</p>
  ${hotelFooter}
</body>
</html>`;
}

export function emailPaymentFailed(b: Booking): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Payment Failed</title></head>
<body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
  <h1 style="color:#dc2626;">Payment Unsuccessful</h1>
  <p>Dear ${b.guest_name},</p>
  <p>Your payment for booking <strong>${b.booking_reference || 'N/A'}</strong> was not successful.</p>
  <p>Please try again to complete your booking.</p>
  <table cellpadding="10" cellspacing="0" style="width:100%;border-collapse:collapse;margin:20px 0;">
    <tr><td style="border:1px solid #e5e7eb;"><strong>Booking Reference:</strong></td><td style="border:1px solid #e5e7eb;">${b.booking_reference || 'Pending'}</td></tr>
    <tr><td style="background:#f9fafb;border:1px solid #e5e7eb;"><strong>Amount:</strong></td><td style="background:#f9fafb;border:1px solid #e5e7eb;">${fmtAmount(b.total_price_cents || b.total_price * 100)}</td></tr>
  </table>
  <p><a href="${EMAIL_CONFIG.siteUrl}/rooms">Click here to try again</a></p>
  <p>If you need assistance, please contact us.</p>
  ${hotelFooter}
</body>
</html>`;
}

export function emailSessionExpired(b: Booking): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Session Expired</title></head>
<body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
  <h1 style="color:#f59e0b;">Booking Session Expired</h1>
  <p>Dear ${b.guest_name},</p>
  <p>Your payment session for booking <strong>${b.booking_reference || 'N/A'}</strong> has expired.</p>
  <p>Your booking hold has been released. To complete your booking, please start a new reservation.</p>
  <p><a href="${EMAIL_CONFIG.siteUrl}/rooms">Start a new booking</a></p>
  <p>If you have any questions, please contact us.</p>
  ${hotelFooter}
</body>
</html>`;
}

export function emailLocalBookingConfirmed(b: Booking): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Booking Confirmed</title></head>
<body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
  <h1 style="color:#166534;">✓ Booking Confirmed!</h1>
  <p>Dear ${b.guest_name},</p>
  <p>Your booking at Canaan International Hotel is <strong>confirmed</strong>.</p>
  <p>This is a direct booking made by our staff.</p>
  <table cellpadding="10" cellspacing="0" style="width:100%;border-collapse:collapse;margin:20px 0;">
    <tr><td style="background:#ecfdf5;border:1px solid #10b981;"><strong>Booking Reference:</strong></td><td style="background:#ecfdf5;border:1px solid #10b981;font-size:18px;font-weight:bold;">${b.booking_reference || 'Pending'}</td></tr>
    <tr><td style="border:1px solid #e5e7eb;"><strong>Room Type:</strong></td><td style="border:1px solid #e5e7eb;">${b.room_type}</td></tr>
    <tr><td style="background:#f9fafb;border:1px solid #e5e7eb;"><strong>Check-in:</strong></td><td style="background:#f9fafb;border:1px solid #e5e7eb;">${fmtDate(b.check_in_date)}</td></tr>
    <tr><td style="border:1px solid #e5e7eb;"><strong>Check-out:</strong></td><td style="border:1px solid #e5e7eb;">${fmtDate(b.check_out_date)}</td></tr>
    <tr><td style="background:#f9fafb;border:1px solid #e5e7eb;"><strong>Guests:</strong></td><td style="background:#f9fafb;border:1px solid #e5e7eb;">${b.number_of_guests}</td></tr>
  </table>
  <p><strong>Check-in:</strong> ${EMAIL_CONFIG.checkInTime} | <strong>Check-out:</strong> ${EMAIL_CONFIG.checkOutTime}</p>
  <p>Address: ${EMAIL_CONFIG.hotelAddress}</p>
  ${hotelFooter}
</body>
</html>`;
}