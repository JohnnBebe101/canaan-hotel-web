import { OTAProvider, OTAPushPayload } from "./otaTypes";

/**
 * Build OTA Push Payload
 *
 * Pure function that creates OTA payload from room data.
 * Deterministic and side-effect free.
 *
 * @param provider The OTA provider for this payload
 * @param room Room object with id, name, pricePerNight, isActive fields
 * @returns OTAPushPayload ready for sync operations
 */
export function buildOTAPayload(
  provider: OTAProvider,
  room: {
    id: string;
    name: string;
    pricePerNight: number;
    isActive: boolean;
  }
): OTAPushPayload {
  return {
    provider,
    roomId: room.id,
    roomName: room.name,
    basePrice: room.pricePerNight,
    availability: room.isActive,
    lastUpdated: new Date(),
  };
}
