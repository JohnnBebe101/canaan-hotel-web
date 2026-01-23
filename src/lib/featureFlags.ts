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

  /** Database persistence layer (V6.1+) */
  DB_PERSISTENCE_ENABLED: boolean;

  /** Database shadow reading for migration verification (V6.4+) */
  DB_SHADOW_READ_ENABLED: boolean;

  /** CUTOVER FLAG: Database as primary read source (V6.5+) */
  DB_READ_PRIMARY_ENABLED: boolean;
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
    PAYMENTS_ENABLED: process.env.PAYMENTS_ENABLED === 'true',
    EMAIL_NOTIFICATIONS_ENABLED: process.env.EMAIL_NOTIFICATIONS_ENABLED === 'true',
    OTA_INTEGRATIONS_ENABLED: process.env.OTA_INTEGRATIONS_ENABLED === 'true',
    DB_PERSISTENCE_ENABLED: process.env.DB_PERSISTENCE_ENABLED === 'true',
    DB_SHADOW_READ_ENABLED: process.env.DB_SHADOW_READ_ENABLED === 'true',
    DB_READ_PRIMARY_ENABLED: process.env.DB_READ_PRIMARY_ENABLED === 'true',
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

export function isDbPersistenceEnabled(): boolean {
  return getFeatureFlags().DB_PERSISTENCE_ENABLED;
}

export function isDbShadowReadEnabled(): boolean {
  return getFeatureFlags().DB_SHADOW_READ_ENABLED;
}

export function isDbReadPrimaryEnabled(): boolean {
  return getFeatureFlags().DB_READ_PRIMARY_ENABLED;
}
