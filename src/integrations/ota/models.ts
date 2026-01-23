export enum OTAProvider {
  BOOKING_COM = 'BOOKING_COM',
  EXPEDIA = 'EXPEDIA',
  AGODA = 'AGODA',
  AIRBNB = 'AIRBNB',
}

export enum OTASyncStatus {
  DISCONNECTED = 'DISCONNECTED',
  CONNECTED = 'CONNECTED',
  SYNCING = 'SYNCING',
  ERROR = 'ERROR',
}

export interface OTABooking {
  id: string;
  provider: OTAProvider;
  externalBookingId: string;
  internalBookingId?: string;
  status: OTASyncStatus;
  createdAt: string;
  updatedAt?: string;
}

export interface OTARoomMapping {
  provider: OTAProvider;
  externalRoomId: string;
  internalRoomId: string;
  active: boolean;
}
