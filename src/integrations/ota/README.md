# OTA Integration

## Purpose

This directory establishes the foundational schema and types for Online Travel Agency (OTA) integrations within the Canaan International Hotel management system. OTA platforms include Booking.com, Expedia, Agoda, and Airbnb, which represent a significant portion of hotel bookings worldwide.

## What OTA Integration Means

OTA integration enables the hotel management system to:

- Receive booking notifications from external platforms
- Maintain synchronization between internal and external booking systems
- Map room types between hotel inventory and OTA listings
- Track booking status across multiple distribution channels

## Supported Providers

The system is designed to support these major OTA platforms:

- **BOOKING_COM**: Booking.com platform integration
- **EXPEDIA**: Expedia group platforms (Expedia, Hotels.com, etc.)
- **AGODA**: Agoda platform integration
- **AIRBNB**: Airbnb platform integration

## Booking vs Room Mapping

Two core concepts define OTA integration:

**OTABooking**: Tracks individual bookings received from external platforms, maintaining the link between external booking IDs and internal booking records for operational management.

**OTARoomMapping**: Establishes relationships between external room type IDs (as defined on OTA platforms) and internal room IDs, ensuring accurate inventory synchronization.

## Current Status (V3)

This integration is currently a **schema-only foundation**. No OTA connections or data synchronization occurs in this version of the system. All OTA-related types and interfaces exist purely for type safety and future development planning.

## Activation Requirements

OTA functionality will become available in V4 and requires:

- Feature flag `OTA_INTEGRATIONS_ENABLED=true` in environment variables
- Complete API credentials and configuration for each provider
- Legal agreements with OTA platforms
- Comprehensive testing across all supported providers

Until these requirements are met, the OTA system remains inactive and safe.

## Development Guidelines

**Critical Warning:** Do not add API connections, webhook handlers, or external service integrations to this directory. This space must remain a clean type definition layer.

All OTA implementation must occur in dedicated service layers with proper error handling, retry mechanisms, and data validation. This ensures the foundation remains stable while OTA features can be developed, tested, and deployed independently.
