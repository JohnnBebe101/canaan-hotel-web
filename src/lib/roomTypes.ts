export const ROOM_TYPES = [
  { slug: 'standard', name: 'Standard Room', price: 25, maxGuests: 1, folder: 'standard' },
  { slug: 'delux', name: 'Delux Room', price: 32, maxGuests: 2, folder: 'deluxe' },
  { slug: 'king', name: 'King Room', price: 40, maxGuests: 2, folder: 'king' },
  { slug: 'twin', name: 'Twin Room', price: 45, maxGuests: 2, folder: 'twin' },
  { slug: 'semi-suit', name: 'Semi Suit Room', price: 50, maxGuests: 2, folder: 'semi-suite' },
  { slug: 'suit', name: 'Suit Room', price: 55, maxGuests: 2, folder: 'suite' },
] as const;

export type RoomTypeSlug = typeof ROOM_TYPES[number]['slug'];

export const getRoomTypeBySlug = (slug: string) => 
  ROOM_TYPES.find(rt => rt.slug === slug);

export const ROOM_PRICES: Record<string, number> = Object.fromEntries(
  ROOM_TYPES.map(rt => [rt.slug, rt.price])
);

export const ROOM_GALLERY_IMAGES: Record<string, string[]> = {
  'standard': ['standard-primary.jpg', 'standard-gallery-01.jpg', 'standard-gallery-02.jpg', 'standard-gallery-03.jpg'],
  'delux': ['deluxe-primary.jpg', 'deluxe-gallery-01.jpg', 'deluxe-gallery-02.jpg', 'deluxe-gallery-03.jpg'],
  'king': ['king-primary.jpg', 'king-gallery-01.jpg', 'king-gallery-02.jpg', 'king-gallery-03.jpg'],
  'twin': ['twin-primary.jpg', 'twin-gallery-01.jpg', 'twin-gallery-02.jpg', 'twin-gallery-03.jpg'],
  'semi-suit': ['semi-suite-primary.jpg', 'semi-suite-gallery-01.jpg', 'semi-suite-gallery-02.jpg', 'semi-suite-gallery-03.jpg'],
  'suit': ['suite-primary.jpg', 'suite-gallery-01.jpg', 'suite-gallery-02.jpg', 'suite-gallery-03.jpg'],
};

export function getRoomImagePath(slug: string, filename: string): string {
  const roomType = getRoomTypeBySlug(slug);
  return `/images/rooms/${roomType?.folder ?? slug}/${filename}`;
}

export function getRoomPrimaryImage(slug: string): string {
  const roomType = getRoomTypeBySlug(slug);
  return `/images/rooms/${roomType?.folder ?? slug}/${roomType?.folder ?? slug}-primary.jpg`;
}

export function isValidRoomTypeSlug(slug: string): boolean {
  return ROOM_TYPES.some(rt => rt.slug === slug);
}

export function getRoomTypeBySlugOrThrow(slug: string) {
  const roomType = getRoomTypeBySlug(slug);
  if (!roomType) {
    const validSlugs = ROOM_TYPES.map(rt => rt.slug).join(', ');
    throw new Error(`Invalid room type: "${slug}". Valid types: ${validSlugs}`);
  }
  return roomType;
}

export function validateRoomTypeForBooking(roomType: string): { valid: boolean; error?: string } {
  if (!isValidRoomTypeSlug(roomType)) {
    return {
      valid: false,
      error: `Invalid room type: "${roomType}". Valid types: ${ROOM_TYPES.map(rt => rt.slug).join(', ')}`
    };
  }
  return { valid: true };
}