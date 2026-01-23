# V4 Payments Decision Document

## Payment Goals
- **Simple integration** - Family credit card friendly interface
- **Reliable processing** - Clear success/failure states
- **Hotel-focused workflow** - Seamless booking to payment transition
- **Professional appearance** - Matches existing admin dashboard design language

## Explicit Non-Goals
- No tax calculations or complex compliance
- No advanced payment features (subscriptions, installments, partial payments)
- No card storage or vaulting capabilities
- No multi-currency support beyond USD
- No payment analytics or reporting features

## Approved Payment Flow

### Core Workflow
```
Booking → Invoice → Payment Link → Gateway → Manual Confirmation Fallback
```

### Step-by-Step Process
1. **Booking Confirmed** → Invoice automatically generated with unique reference
2. **Invoice Issued** → Payment link generated and communicated to guest
3. **Guest Payment** → External payment gateway processes transaction
4. **Success/Failure** → Payment status updated in CRM system
5. **Manual Override** → Admin can manually confirm payment if needed

### Fallback Mechanisms
- Gateway failure → Manual payment confirmation option
- Link expiration → Admin can regenerate payment links
- Dispute handling → Manual resolution through admin interface

## Automation Level

### Automated Components
- **Invoice Reference Generation** - Automatic unique reference on status change to INVOICED
- **Payment Link Creation** - Automatic generation tied to invoice reference
- **Status Updates** - Real-time sync with payment gateway
- **Email Triggers** - Future integration with email system (V4.1)

### Manual Controls
- **Payment Confirmation Override** - Admin can manually mark as paid
- **Link Regeneration** - Admin can create new payment links
- **Amount Adjustments** - Manual invoice modifications allowed
- **Cancellation Handling** - Manual payment refund processing

## Security Posture

### Data Handling
- **No Card Storage** - All payment data handled externally
- **Token-based Processing** - PCI compliance through gateway provider
- **Minimal Data Retention** - Only payment status and reference stored locally

### Access Controls
- **Gateway-only Processing** - No direct card handling in application
- **Admin-only Payment Management** - Payment operations restricted to authenticated admins
- **Audit Trail** - All payment actions logged with admin identity

### Compliance Approach
- **Gateway Provider Responsibility** - PCI DSS compliance delegated to payment processor
- **Local Compliance** - Basic financial record keeping for hotel operations
- **Data Minimization** - Only essential payment metadata stored

## Feature Flag Dependency

### Flag Configuration
- **PAYMENTS_ENABLED=false** (default, production-safe)
- **Server-side Only** - Not exposed to client-side code
- **Environment Controlled** - Set via `PAYMENTS_ENABLED=true` in production

### Activation Requirements
- Payment gateway account configured
- Environment variables set
- Admin training completed
- Email notifications enabled (recommended)
- Testing completed in staging environment

### Deactivation Safety
- Flag can be disabled at any time
- Existing payments remain accessible
- New bookings revert to manual payment flow
- No data loss or system disruption

---

**Status:** Ready for V4.1 implementation
**Dependencies:** Payment gateway provider selection, Email V4.1 completion
**Risk Level:** Medium (external dependency on payment gateway)
