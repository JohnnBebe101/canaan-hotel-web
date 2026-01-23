/**
 * Payment Hooks - V4.1 Placeholder Functions
 *
 * These functions will integrate payment workflows with the booking lifecycle.
 * Currently placeholders that throw "Not implemented" errors.
 *
 * Future implementation will connect to payment gateway APIs and handle
 * invoice generation, payment link creation, and confirmation workflows.
 */

/**
 * Called when an invoice is created for a booking
 * Future: Will trigger payment link generation and email notifications
 */
export function onInvoiceCreated(): void {
  throw new Error("Payment hooks not implemented - V4.1 feature");
}

/**
 * Called when a payment link is generated
 * Future: Will handle payment gateway integration and link distribution
 */
export function onPaymentLinkGenerated(): void {
  throw new Error("Payment hooks not implemented - V4.1 feature");
}

/**
 * Called when a payment is confirmed
 * Future: Will update booking status and trigger confirmation workflows
 */
export function onPaymentConfirmed(): void {
  throw new Error("Payment hooks not implemented - V4.1 feature");
}
