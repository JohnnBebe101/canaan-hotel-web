/**
 * Feature Flags System - V3 Production-Safe Toggles
 *
 * Centralizes feature control for gradual rollouts and safe toggling.
 * All flags default to false for maximum safety.
 *
 * Usage: Import getFeatureFlags() to check feature availability.
 * Never call external services or modify app behavior directly.
 */

/**
 * Feature Flags Interface
 * Defines all available feature toggles in the system
 */
export interface FeatureFlags {
  /** Payment processing and gateway integration */
  PAYMENTS_ENABLED: boolean;

  /** Email notifications for bookings and confirmations */
  EMAIL_NOTIFICATIONS_ENABLED: boolean;

  /** Online Travel Agency integrations (Booking.com, etc.) */
  OTA_INTEGRATIONS_ENABLED: boolean;
}

/**
 * Get Feature Flags
 *
 * Reads feature flags from environment variables with safe defaults.
 * Never throws errors - always returns valid boolean values.
 * Production-safe: defaults to false if env vars are missing.
 *
 * @returns FeatureFlags object with current flag states
 */
export function getFeatureFlags(): FeatureFlags {
  return {
    PAYMENTS_ENABLED: process.env.NEXT_PUBLIC_PAYMENTS_ENABLED === 'true',
    EMAIL_NOTIFICATIONS_ENABLED: process.env.NEXT_PUBLIC_EMAIL_NOTIFICATIONS_ENABLED === 'true',
    OTA_INTEGRATIONS_ENABLED: process.env.NEXT_PUBLIC_OTA_INTEGRATIONS_ENABLED === 'true',
  };
}

// Helper functions for convenient flag checking
export function isPaymentsEnabled(): boolean {
  return getFeatureFlags().PAYMENTS_ENABLED;
}

export function isEmailEnabled(): boolean {
  return getFeatureFlags().EMAIL_NOTIFICATIONS_ENABLED;
}

export function isOTAEnabled(): boolean {
  return getFeatureFlags().OTA_INTEGRATIONS_ENABLED;
}
