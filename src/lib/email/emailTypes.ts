export enum EmailEventType {
  BOOKING_RECEIVED = "BOOKING_RECEIVED",
  BOOKING_STATUS_UPDATED = "BOOKING_STATUS_UPDATED",
  INVOICE_ISSUED = "INVOICE_ISSUED",
  HOTEL_NEW_BOOKING_ALERT = "HOTEL_NEW_BOOKING_ALERT",
}

export interface EmailPayload {
  to: string;
  subject: string;
  body: string;
  bookingId?: string;
  invoiceRef?: string;
}
