/**
 * Email Dispatcher - CRM Event to Email Bridge
 *
 * Maps booking lifecycle events to email notifications.
 * Pure functions that generate and send emails without side effects.
 */

import { Booking } from "../models";
import {
  generateBookingReceivedEmail,
  generateBookingStatusUpdateEmail,
  generateInvoiceIssuedEmail,
  generateNewBookingAlertEmail,
} from "./emailTemplates";
import { sendEmail } from "./emailService";

/**
 * Dispatch booking received email to guest
 */
export function dispatchBookingReceivedEmail(booking: Booking): void {
  const emailContent = generateBookingReceivedEmail(
    booking.guestName,
    booking.id,
    booking.checkIn,
    booking.checkOut
  );

  sendEmail({
    to: booking.email,
    subject: emailContent.subject,
    body: emailContent.body,
    bookingId: booking.id,
  });
}

/**
 * Dispatch booking status update email to guest
 */
export function dispatchBookingStatusUpdateEmail(booking: Booking): void {
  const emailContent = generateBookingStatusUpdateEmail(
    booking.guestName,
    booking.id,
    booking.status,
    booking.checkIn,
    booking.checkOut
  );

  sendEmail({
    to: booking.email,
    subject: emailContent.subject,
    body: emailContent.body,
    bookingId: booking.id,
  });
}

/**
 * Dispatch invoice issued email to guest
 */
export function dispatchInvoiceIssuedEmail(booking: Booking): void {
  if (!booking.invoiceRef) {
    console.warn("[EMAIL DISPATCH] No invoice reference for booking:", booking.id);
    return;
  }

  const emailContent = generateInvoiceIssuedEmail(
    booking.guestName,
    booking.id,
    booking.invoiceRef,
    booking.checkIn,
    booking.checkOut
  );

  sendEmail({
    to: booking.email,
    subject: emailContent.subject,
    body: emailContent.body,
    bookingId: booking.id,
    invoiceRef: booking.invoiceRef,
  });
}

/**
 * Dispatch new booking alert to hotel staff
 * Note: This would typically send to a configured hotel email address
 */
export function dispatchHotelAlertEmail(booking: Booking): void {
  const emailContent = generateNewBookingAlertEmail(
    booking.guestName,
    booking.id,
    booking.checkIn,
    booking.checkOut,
    booking.email
  );

  // In production, this would send to hotel staff email
  // For now, sending to a placeholder hotel email
  sendEmail({
    to: "reservations@canaan-hotel.com", // Placeholder hotel email
    subject: emailContent.subject,
    body: emailContent.body,
    bookingId: booking.id,
  });
}
