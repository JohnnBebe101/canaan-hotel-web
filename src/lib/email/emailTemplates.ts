/**
 * Email Templates - Pure Functions for Hotel Transactional Emails
 *
 * These functions generate plain text email content for booking-related communications.
 * All templates are professional, neutral, and focused on clear communication.
 */

/**
 * Booking Received Template - Sent to guest when inquiry is submitted
 */
export function generateBookingReceivedEmail(
  guestName: string,
  bookingId: string,
  checkInDate: string,
  checkOutDate: string
): { subject: string; body: string } {
  const subject = `Booking Inquiry Received - ${bookingId}`;

  const body = `Dear ${guestName},

Thank you for your interest in Canaan International Hotel. We have received your booking inquiry for:

Booking Reference: ${bookingId}
Check-in Date: ${checkInDate}
Check-out Date: ${checkOutDate}

Our reservations team will review your request and contact you within 24 hours with availability confirmation and next steps.

If you have any questions or need to modify your inquiry, please contact us at your earliest convenience.

We look forward to welcoming you to Canaan International Hotel.

Best regards,
Reservations Team
Canaan International Hotel`;

  return { subject, body };
}

/**
 * Booking Status Update Template - Sent to guest when booking status changes
 */
export function generateBookingStatusUpdateEmail(
  guestName: string,
  bookingId: string,
  newStatus: string,
  checkInDate: string,
  checkOutDate: string
): { subject: string; body: string } {
  const subject = `Booking Update - ${bookingId}`;

  const body = `Dear ${guestName},

We are writing to update you on the status of your booking inquiry.

Booking Reference: ${bookingId}
Current Status: ${newStatus}
Check-in Date: ${checkInDate}
Check-out Date: ${checkOutDate}

Our reservations team will continue to work on confirming your accommodation. We will provide further updates as they become available.

Please contact us if you have any questions about your booking.

Best regards,
Reservations Team
Canaan International Hotel`;

  return { subject, body };
}

/**
 * Invoice Issued Template - Sent to guest when invoice is generated
 */
export function generateInvoiceIssuedEmail(
  guestName: string,
  bookingId: string,
  invoiceRef: string,
  checkInDate: string,
  checkOutDate: string
): { subject: string; body: string } {
  const subject = `Invoice Issued - ${invoiceRef}`;

  const body = `Dear ${guestName},

Your invoice has been prepared for your upcoming stay at Canaan International Hotel.

Booking Reference: ${bookingId}
Invoice Reference: ${invoiceRef}
Check-in Date: ${checkInDate}
Check-out Date: ${checkOutDate}

Please review the invoice details and contact us if you have any questions or require modifications.

We appreciate your business and look forward to your visit.

Best regards,
Reservations Team
Canaan International Hotel`;

  return { subject, body };
}

/**
 * New Booking Alert Template - Internal alert to hotel staff
 */
export function generateNewBookingAlertEmail(
  guestName: string,
  bookingId: string,
  checkInDate: string,
  checkOutDate: string,
  guestEmail: string
): { subject: string; body: string } {
  const subject = `NEW BOOKING INQUIRY - ${bookingId}`;

  const body = `NEW BOOKING INQUIRY RECEIVED

Guest Name: ${guestName}
Booking ID: ${bookingId}
Email: ${guestEmail}
Check-in: ${checkInDate}
Check-out: ${checkOutDate}

Please review this inquiry in the admin dashboard and respond within 24 hours.

Action Required: Contact guest to confirm availability and provide quote.`;

  return { subject, body };
}
