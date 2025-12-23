# Email Integration

## Purpose

This directory establishes the foundational schema and types for email communication within the Canaan International Hotel management system. It provides type definitions that will support automated guest communications while maintaining clean separation between booking management and email delivery.

## Supported Email Types

The email system supports these predefined communication types:

- **BOOKING_RECEIVED**: Acknowledgment when guest submits booking inquiry
- **BOOKING_CONFIRMED**: Confirmation when booking moves to CONFIRMED status
- **INVOICE_ISSUED**: Invoice delivery when booking reaches INVOICED status
- **BOOKING_CANCELLED**: Cancellation notification for terminated bookings
- **MANUAL**: Custom communications initiated by hotel staff

## Current Status (V3)

This integration is currently a **schema-only foundation**. No emails are sent in this version of the system. All email-related types and interfaces exist purely for type safety and future development planning.

## Activation Requirements

Email functionality will become available in V4 and requires:

- Feature flag `EMAIL_NOTIFICATIONS_ENABLED=true` in environment variables
- Complete SMTP/email provider configuration
- Template development and testing
- Anti-spam compliance verification

Until these requirements are met, the email system remains inactive and safe.

## Relationship to CRM Booking Lifecycle

Email communications are designed to align with booking workflow progression:

- **NEW** → BOOKING_RECEIVED acknowledgment
- **CONFIRMED** → BOOKING_CONFIRMED notification
- **INVOICED** → INVOICE_ISSUED delivery
- **CANCELLED** → BOOKING_CANCELLED notification

This creates automated guest communication that mirrors operational booking management.

## Development Guidelines

**Critical Warning:** Do not add email sending logic, SMTP connections, or external service integrations to this directory. This space must remain a clean type definition layer.

All email implementation must occur in dedicated service layers with proper error handling, retry logic, and delivery tracking. This ensures the foundation remains stable while email features can be developed, tested, and deployed independently.
