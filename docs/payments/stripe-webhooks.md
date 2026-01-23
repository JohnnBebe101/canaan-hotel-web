# V5.4 Stripe Webhook Architecture Design

## Overview

This document outlines the **design architecture** for Stripe webhook integration in future V5.4 implementation. **Webhooks are NOT implemented in the current version** - this is purely architectural planning.

## Intended Webhook Events

### Primary Events

1. **`checkout.session.completed`**
   - Triggered when customer completes checkout flow
   - Contains session details and payment intent reference
   - Used to mark payment as "ready for admin verification"

2. **`payment_intent.succeeded`**
   - Triggered when payment is successfully processed
   - Contains final payment confirmation
   - Used to update payment status to "completed"

3. **`payment_intent.failed`**
   - Triggered when payment processing fails
   - Contains failure reason and error details
   - Used to update payment status to "failed"

### Event Filtering

- Only process events for known payment intents (linked to booking IDs)
- Ignore events for unknown or unlinked payments
- Validate event data matches stored payment records

## Security Architecture

### Signature Verification

- **Stripe Signature Header**: Verify `Stripe-Signature` header on all webhook requests
- **Webhook Endpoint Secret**: Use environment-stored secret for HMAC verification
- **Timestamp Validation**: Reject events older than 5 minutes
- **Fail Closed**: Reject any webhook with invalid signature

### Replay Protection

- **Event ID Tracking**: Store processed event IDs to prevent duplicate processing
- **Idempotency Keys**: Use Stripe's `idempotency_key` for duplicate detection
- **Timestamp Window**: Only accept events within acceptable time window
- **Database Logging**: Log all received events for audit trail

### Idempotency

- **Event Deduplication**: Check event ID against processed events table
- **State Validation**: Verify payment state allows the transition
- **Atomic Operations**: Use database transactions for state changes
- **Error Recovery**: Graceful handling of partial failures

## Data Flow Architecture

```
Stripe Webhook Event
        ↓
Webhook Endpoint (/api/webhooks/stripe)
        ↓
Signature Verification
        ↓
Event Validation
        ↓
Payment Record Lookup
        ↓
Status Update (Payment Status ONLY)
        ↓
Admin Notification (Email/Alert)
        ↓
NO Booking Status Changes
```

### Processing Steps

1. **Receive Webhook**: Raw event data from Stripe
2. **Verify Signature**: Cryptographic validation
3. **Parse Event**: Extract payment intent and metadata
4. **Lookup Payment**: Find associated booking payment record
5. **Validate State**: Ensure transition is allowed
6. **Update Payment**: Modify payment status only
7. **Log Event**: Record webhook processing for audit
8. **Notify Admin**: Alert admin of payment status change
9. **Response**: Return 200 OK to Stripe

## Explicit Rules

### Critical Constraints

- **NEVER Auto-Confirm Bookings**: Webhooks update payment status only
- **Admin Approval Always Required**: Manual verification before booking confirmation
- **Payment Status Isolation**: Webhook events affect payment records, not booking workflow
- **Feature Flag Gated**: Webhooks disabled when `isPaymentsEnabled()` returns false

### Status Transitions

- `AWAITING_CONFIRMATION` → `PAID` (on payment_intent.succeeded)
- `AWAITING_CONFIRMATION` → `FAILED` (on payment_intent.failed)
- `DRAFT` → `AWAITING_CONFIRMATION` (on checkout.session.completed)

### Forbidden Actions

- ❌ No automatic booking status updates
- ❌ No email sending to customers
- ❌ No integration with booking workflow
- ❌ No external API calls (except Stripe verification)

## Failure Scenarios

### Webhook Delayed

- **Scenario**: Webhook arrives after admin manual confirmation
- **Handling**: Check current payment state, skip if already processed
- **Logging**: Log delayed event for monitoring
- **Safety**: No duplicate state changes

### Duplicate Events

- **Scenario**: Same event received multiple times
- **Handling**: Event ID deduplication prevents reprocessing
- **Logging**: Track duplicate attempts for monitoring
- **Safety**: Idempotent operations prevent data corruption

### Partial Payment

- **Scenario**: Payment partially succeeds or has issues
- **Handling**: Mark as `FAILED`, require admin investigation
- **Notification**: Alert admin with failure details
- **Recovery**: Manual admin intervention required

### Invalid Events

- **Scenario**: Webhook for unknown payment or malformed data
- **Handling**: Log security event, return error to Stripe
- **Monitoring**: Alert admin of suspicious activity
- **Safety**: No state changes, isolated incident

### Network Failures

- **Scenario**: Database unavailable during webhook processing
- **Handling**: Return 500 error, Stripe will retry
- **Idempotency**: Ensure retry-safe operations
- **Monitoring**: Track webhook processing failures

## Implementation Notes

### Future V5.4 Requirements

- Stripe webhook secret environment variable
- Webhook endpoint with proper middleware
- Payment audit log table
- Admin notification system
- Comprehensive error handling
- Monitoring and alerting

### Database Schema Extensions

```sql
-- Webhook audit table
CREATE TABLE webhook_events (
  id VARCHAR PRIMARY KEY,
  event_type VARCHAR NOT NULL,
  payment_id VARCHAR REFERENCES payment_records(id),
  processed_at TIMESTAMP,
  status VARCHAR, -- 'processed', 'skipped', 'error'
  raw_data JSONB
);
```

### Environment Variables

```
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_WEBHOOK_TOLERANCE=300000  # 5 minutes in ms
```

## Risk Mitigation

- **Gradual Rollout**: Enable webhooks in staging first
- **Monitoring**: Comprehensive logging and alerting
- **Fallback**: Manual payment confirmation always available
- **Audit Trail**: Complete event history for compliance
- **Security Review**: External security assessment before production

---

⚠️ **Webhooks are NOT implemented in this version**

This document serves as architectural planning for future V5.4 implementation. All payment processing currently relies on manual admin confirmation with no automated webhook handling.
