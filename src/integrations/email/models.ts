export enum EmailType {
  BOOKING_RECEIVED = 'BOOKING_RECEIVED',
  BOOKING_CONFIRMED = 'BOOKING_CONFIRMED',
  INVOICE_ISSUED = 'INVOICE_ISSUED',
  BOOKING_CANCELLED = 'BOOKING_CANCELLED',
  MANUAL = 'MANUAL',
}

export enum EmailStatus {
  DRAFT = 'DRAFT',
  QUEUED = 'QUEUED',
  SENT = 'SENT',
  FAILED = 'FAILED',
}

export interface EmailMessage {
  id: string;
  bookingId?: string;
  to: string;
  subject: string;
  type: EmailType;
  status: EmailStatus;
  createdAt: string;
  sentAt?: string;
}
