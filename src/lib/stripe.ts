import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  console.warn('[Stripe] STRIPE_SECRET_KEY not configured - checkout will fail');
}

export const stripe = new Stripe(stripeSecretKey || 'sk_test_placeholder', {
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

export function isStripeConfigured(): boolean {
  return !!stripeSecretKey && stripeSecretKey.startsWith('sk_');
}