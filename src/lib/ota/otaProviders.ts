import { OTAProvider } from "./otaTypes";

/**
 * OTA Provider Metadata
 *
 * Static configuration for supported Online Travel Agencies.
 * All providers currently in design phase - no live integrations.
 */
export const OTA_PROVIDERS = {
  [OTAProvider.BOOKING_COM]: {
    displayName: "Booking.com",
    supportsPricing: true,
    supportsAvailability: true,
    supportsPromotions: false,
    phase: "DESIGN_ONLY",
  },
  [OTAProvider.EXPEDIA]: {
    displayName: "Expedia",
    supportsPricing: true,
    supportsAvailability: true,
    supportsPromotions: false,
    phase: "DESIGN_ONLY",
  },
  [OTAProvider.TRIPADVISOR]: {
    displayName: "TripAdvisor",
    supportsPricing: false,
    supportsAvailability: false,
    supportsPromotions: false,
    phase: "DESIGN_ONLY",
  },
} as const;
