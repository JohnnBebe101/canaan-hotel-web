import { Room } from "./models";

// Temporary in-memory room storage
// TODO: Replace with database when ready
let rooms: Room[] = [
  {
    id: "deluxe-001",
    name: "Deluxe Room",
    description: "Spacious and comfortable room perfect for your stay. Features modern amenities and a relaxing atmosphere.",
    pricePerNight: 120,
    maxGuests: 2,
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "executive-001",
    name: "Executive Suite",
    description: "Premium accommodations with stunning views and enhanced amenities for business travelers.",
    pricePerNight: 200,
    maxGuests: 3,
    isActive: true,
    createdAt: new Date().toISOString(),
  },
];

export function getRooms(): Room[] {
  return rooms;
}

export function getRoomById(id: string): Room | undefined {
  return rooms.find((room) => room.id === id);
}

export function createRoom(data: Omit<Room, "id" | "createdAt">): Room {
  const newRoom: Room = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  rooms.push(newRoom);
  return newRoom;
}

export function updateRoom(
  id: string,
  data: Partial<Omit<Room, "id" | "createdAt">>
): Room | null {
  const room = getRoomById(id);
  if (!room) return null;

  Object.assign(room, data);
  return room;
}

export function deleteRoom(id: string): boolean {
  const initialLength = rooms.length;
  rooms = rooms.filter((room) => room.id !== id);
  return rooms.length < initialLength;
}
