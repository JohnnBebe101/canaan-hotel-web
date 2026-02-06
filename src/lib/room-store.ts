import { Room } from "./models";
import { getAllRooms, saveRoom, updateRoom as dbUpdateRoom, deleteRoom as dbDeleteRoom } from "./persistence/dbAdapter";
import { logInfo, logError } from "./logger";

// Room Management Core: Operational room management
// NO IN-MEMORY FALLBACK: Using database persistence as primary source

export async function getRooms(): Promise<Room[]> {
  try {
    const rooms = await getAllRooms();
    return rooms as Room[];
  } catch (error) {
    logError("ROOM_FETCH_FAILED", "Failed to retrieve rooms from database", { error });
    return [];
  }
}

export async function getRoomById(id: string): Promise<Room | undefined> {
  try {
    const allRooms = await getRooms();
    return allRooms.find((room) => room.id === id);
  } catch (error) {
    logError("ROOM_BY_ID_FAILED", `Failed to get room by id: ${id}`, { error });
    return undefined;
  }
}

export async function createRoom(data: Omit<Room, "id" | "createdAt">): Promise<Room> {
  const newRoom: Room = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  try {
    await saveRoom(newRoom);
    logInfo("ROOM_CREATED", `New room created and persisted: ${newRoom.id}`, { roomId: newRoom.id });
  } catch (error) {
    logError("ROOM_CREATE_FAILED", "Failed to persist new room", { error });
    throw new Error("Failed to create room in database");
  }

  return newRoom;
}

export async function updateRoom(
  id: string,
  data: Partial<Omit<Room, "id" | "createdAt">>
): Promise<Room | null> {
  try {
    const updated = await dbUpdateRoom(id, data);
    if (updated) {
      logInfo("ROOM_UPDATED", `Room updated and persisted: ${id}`, { roomId: id });
    }
    return updated as Room | null;
  } catch (error) {
    logError("ROOM_UPDATE_FAILED", `Failed to update room: ${id}`, { error });
    throw new Error("Failed to update room in database");
  }
}

export async function deleteRoom(id: string): Promise<boolean> {
  try {
    const success = await dbDeleteRoom(id);
    if (success) {
      logInfo("ROOM_DELETED", `Room deleted and persisted: ${id}`, { roomId: id });
    }
    return success;
  } catch (error) {
    logError("ROOM_DELETE_FAILED", `Failed to delete room: ${id}`, { error });
    return false;
  }
}
