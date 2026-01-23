# Payments Integration

## Purpose

This directory establishes the foundational schema and types for payment processing within the Canaan International Hotel management system. It provides type definitions that will support future payment gateway integrations while maintaining clean separation between booking management and payment processing.

## Current Status (V3)

This integration is currently a **schema-only foundation**. No payment processing occurs in this version of the system. All payment-related types and interfaces exist purely for type safety and future development planning.

## Activation Requirements

Payment processing will become available in V4 and requires:

- Feature flag `PAYMENTS_ENABLED=true` in environment variables
- Complete payment gateway configuration
- Security review and testing
- Legal compliance verification

Until these requirements are met, the payment system remains inactive and safe.

## Relationship to Bookings

Payment intents are designed to link directly with booking records through:

- `bookingId`: References the originating booking inquiry
- `invoiceRef`: Connects to the booking's invoice reference for reconciliation

This creates a clear audit trail from guest inquiry to payment settlement.

## Development Guidelines

**Critical Warning:** Do not add payment processing logic, API calls, or external service integrations to this directory. This space must remain a clean type definition layer.

All payment implementation must occur in dedicated service layers with proper error handling, logging, and security measures. This ensures the foundation remains stable while payment features can be developed, tested, and deployed independently.
