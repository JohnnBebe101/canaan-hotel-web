export enum PaymentStatus {
  PENDING = "PENDING",
  PAYMENT_LINK_SENT = "PAYMENT_LINK_SENT",
  PAID = "PAID",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
  REFUNDED = "REFUNDED",
}

export interface PaymentRecord {
  id: string;
  bookingId: string;
  invoiceRef: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  provider: "STRIPE" | "PAYPAL" | "MANUAL";
  createdAt: string;
  updatedAt: string;
}

export interface PaymentProviderConfig {
  providerName: string;
  enabled: boolean;
  mode: "TEST" | "LIVE";
}
