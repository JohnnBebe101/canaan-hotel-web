export enum PaymentStatus {
  PENDING = 'PENDING',
  AUTHORIZED = 'AUTHORIZED',
  PAID = 'PAID',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

export enum PaymentProvider {
  MANUAL = 'MANUAL',
  STRIPE = 'STRIPE',
  LOCAL = 'LOCAL',
}

export interface PaymentIntent {
  id: string;
  bookingId: string;
  invoiceRef: string;
  amount: number;
  currency: string;
  provider: PaymentProvider;
  status: PaymentStatus;
  createdAt: string;
  updatedAt: string;
}
