export enum OTAProvider {
  BOOKING_COM = "BOOKING_COM",
  EXPEDIA = "EXPEDIA",
  TRIPADVISOR = "TRIPADVISOR",
}

export enum OTASyncScope {
  ROOMS = "ROOMS",
  PRICING = "PRICING",
  AVAILABILITY = "AVAILABILITY",
}

export interface OTAPushPayload {
  provider: OTAProvider;
  roomId: string;
  roomName: string;
  basePrice: number;
  availability: boolean;
  lastUpdated: Date;
}

export interface OTASyncResult {
  success: boolean;
  provider: OTAProvider;
  timestamp: Date;
  message?: string;
}
