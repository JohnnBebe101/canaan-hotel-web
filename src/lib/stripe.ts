import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2024-04-10.base' as never,
  typescript: true,
});

export const STRIPE_PRICE_IN_CENTS = true;

export const STRIPE_CURRENCY = 'usd';

export type PaymentStatus =
  | 'unpaid'
  | 'pending'
  | 'paid'
  | 'failed'
  | 'refunded';

export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  unpaid: 'Unpaid',
  pending: 'Pending Payment',
  paid: 'Paid',
  failed: 'Payment Failed',
  refunded: 'Refunded',
};