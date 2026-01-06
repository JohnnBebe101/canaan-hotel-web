# V5.3.1 Payment Lifecycle & Manual Confirmation (DESIGN ONLY)

## Overview

This document defines the **manual payment confirmation flow** for the Canaan Hotel Tier-3 system. All payment lifecycle transitions are **ADMIN-INITIATED ONLY** - no automatic status changes, webhooks, or external triggers.

## Payment Status Lifecycle

```
DRAFT → LINK_CREATED → AWAITING_CONFIRMATION → PAID → CLOSED
```

### Status Definitions

| Status | Description | Admin Action Required |
|--------|-------------|----------------------|
| **DRAFT** | Initial state before payment link creation | Generate payment link |
| **LINK_CREATED** | Payment link generated and ready for customer | Mark as sent to customer |
| **AWAITING_CONFIRMATION** | Payment link sent, waiting for customer completion | Monitor and confirm receipt |
| **PAID** | Payment successfully received and confirmed | Update booking status |
| **CLOSED** | Payment lifecycle complete | No further actions |

### Transition Rules

#### DRAFT → LINK_CREATED
- **Trigger:** Admin clicks "Generate Payment Link"
- **Preconditions:**
  - Booking status = "INVOICED"
  - Payment feature flag = enabled
  - No existing payment record for booking
- **Actions:**
  - Create PaymentRecord with LINK_CREATED status
  - Generate customer-facing payment link
  - Attach PaymentRecord to Booking
- **Post-conditions:** Payment link visible in admin UI

#### LINK_CREATED → AWAITING_CONFIRMATION
- **Trigger:** Admin marks payment link as "sent to customer"
- **Preconditions:** PaymentRecord exists with LINK_CREATED status
- **Actions:** Update PaymentRecord status to AWAITING_CONFIRMATION
- **Post-conditions:** Admin UI shows "awaiting payment" indicator

#### AWAITING_CONFIRMATION → PAID
- **Trigger:** Admin clicks "Mark Payment as Received"
- **Preconditions:**
  - PaymentRecord exists with AWAITING_CONFIRMATION status
  - Admin has verified payment receipt (external confirmation)
- **Actions:**
  - Update PaymentRecord status to PAID
  - Update Booking status to CONFIRMED
  - Trigger booking confirmation email (existing logic)
- **Post-conditions:**
  - Booking moves to CONFIRMED status
  - Payment lifecycle complete

#### PAID → CLOSED
- **Trigger:** Automatic on booking closure (future implementation)
- **Preconditions:** PaymentRecord status = PAID
- **Actions:** Update PaymentRecord status to CLOSED
- **Post-conditions:** Payment record archived (read-only)

## Admin Confirmation Rules

### Payment Verification Requirements
- **External Verification:** Admin must verify payment receipt through external means (Stripe dashboard, bank statement, etc.)
- **No Automatic Detection:** System never automatically detects payment completion
- **Manual Override Only:** All payment confirmations require explicit admin action

### Booking ↔ Payment Relationship

#### 1:1 Relationship
- Each Booking can have at most one PaymentRecord
- PaymentRecord is created when payment link is generated
- PaymentRecord remains attached to Booking throughout lifecycle

#### Status Synchronization
- Booking status drives payment creation (must be INVOICED)
- Payment status drives booking confirmation (PAID → CONFIRMED)
- No circular dependencies or automatic updates

#### Data Integrity
- PaymentRecord.bookingId must match Booking.id
- PaymentRecord.amountCents must match calculated booking total
- PaymentRecord.currency must be consistent with hotel settings

## Failure Scenarios

### Payment Link Generation Failure
- **Cause:** Feature flag disabled, invalid booking state
- **Result:** No PaymentRecord created, booking unchanged
- **Recovery:** Admin retries after fixing preconditions

### Payment Confirmation Failure
- **Cause:** PaymentRecord not found, invalid status transition
- **Result:** No status changes, error logged
- **Recovery:** Admin investigates and retries

### Email Notification Failure
- **Cause:** Email feature disabled or service error
- **Result:** Booking/Payment status updated, email fails silently
- **Recovery:** Admin manually sends confirmation if needed

### Booking Status Update Failure
- **Cause:** Booking not found or invalid transition
- **Result:** Payment status updated, booking status unchanged
- **Recovery:** Admin manually updates booking status

## Implementation Notes

### Current State (V5.2.2)
- ✅ Payment link generation (design-only)
- ✅ Manual payment confirmation UI
- ✅ PaymentRecord storage
- ✅ Feature flag gating

### Future Extensions (V5.3+)
- 🔄 Stripe API integration (replaces design-only link generation)
- 🔄 Webhook handlers (for automated status updates)
- 🔄 Payment expiration logic
- 🔄 Refund handling
- 🔄 Multi-provider support

### Safety Guarantees
- **No Automatic Actions:** All status changes require explicit admin approval
- **Feature Flag Control:** Entire payment system can be disabled instantly
- **Fail-Safe Design:** Errors never prevent core booking operations
- **Audit Trail:** All admin actions logged with context

## Testing Checklist

### Admin Workflow Testing
- [ ] Generate payment link for INVOICED booking
- [ ] Verify payment link display in admin UI
- [ ] Confirm manual payment receipt updates statuses correctly
- [ ] Verify email notifications trigger on confirmation
- [ ] Test feature flag disabling prevents all payment actions

### Error Handling Testing
- [ ] Invalid booking states prevent payment link generation
- [ ] Payment confirmation fails gracefully on missing records
- [ ] Email failures don't block status updates
- [ ] Feature flag changes take effect immediately

### Data Integrity Testing
- [ ] Payment records properly linked to bookings
- [ ] Status transitions maintain data consistency
- [ ] No orphaned payment records
- [ ] Audit logs capture all admin actions
