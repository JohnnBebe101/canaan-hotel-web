export enum PaymentStatus {
  PAID = 'paid',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  AWAITING_CONFIRMATION = 'awaiting_confirmation',
  LINK_CREATED = 'link_created',
  DRAFT = 'draft',
}
export enum PaymentProvider {
  STRIPE = 'stripe',
  CASH = 'cash',
  BANK_TRANSFER = 'bank_transfer',
  CREDIT_CARD = 'credit_card',
}

export interface PaymentRecord {
  id: string;
  bookingId: string;
  amountCents: number;
  currency: string;
  status: PaymentStatus;
  provider: PaymentProvider;
  transactionId?: string;
  paymentLink?: string;
  createdAt: string;
  updatedAt: string;
}

export const isPaymentsFeatureActive = () => false;
