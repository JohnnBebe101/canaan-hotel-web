import { isOTAEnabled } from "../featureFlags";
import { OTAProvider, OTASyncResult } from "./otaTypes";
import { buildOTAPayload } from "./otaPayloadBuilder";

/**
 * Push Room to OTA Service
 *
 * Feature-flag controlled room synchronization with OTA providers.
 * Currently a mock implementation for development safety.
 */
export function pushRoomToOTA(
  room: {
    id: string;
    name: string;
    pricePerNight: number;
    isActive: boolean;
  },
  provider: OTAProvider
): OTASyncResult {
  const payload = buildOTAPayload(provider, room);

  if (!isOTAEnabled()) {
    console.log("[OTA DISABLED]", provider, room.id);
    return {
      success: false,
      provider,
      timestamp: new Date(),
      message: "OTA integrations disabled by feature flag",
    };
  }

  // Mock successful sync for development
  console.log("[OTA SYNC MOCK]", provider, payload);
  return {
    success: true,
    provider,
    timestamp: new Date(),
    message: "Mock sync completed successfully",
  };
}