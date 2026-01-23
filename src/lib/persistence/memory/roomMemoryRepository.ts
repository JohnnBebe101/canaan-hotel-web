/**
 * V6 Persistence Layer - Room Memory Repository Adapter
 *
 * TRANSITIONAL ADAPTER: This implementation wraps the existing in-memory room store
 * without modifying its logic or behavior. It provides a repository interface for future
 * database migration while maintaining complete backward compatibility.
 *
 * NO NEW LOGIC: All operations delegate to existing room-store.ts functions.
 * NO DATA DUPLICATION: Uses the same underlying data structures.
 * NO BEHAVIOR CHANGES: Return values and side effects remain identical.
 */

import { RoomRepository } from '../repository';
import { RoomRecord, PartialRoomRecord } from '../types';
import {
  getRooms,
  getRoomById,
  createRoom,
  updateRoom,
} from '../../room-store';

/**
 * Memory-based room repository adapter
 * Wraps existing in-memory room store with repository interface
 */
export class RoomMemoryRepository implements RoomRepository {
  async getAll(): Promise<RoomRecord[]> {
    // Delegate to existing in-memory function
    const rooms = getRooms();
    // Return as RoomRecord[] (compatible with existing Room[])
    return rooms as RoomRecord[];
  }

  async getById(id: string): Promise<RoomRecord | null> {
    // Delegate to existing in-memory function
    const room = getRoomById(id);
    // Return null if not found (matches existing behavior)
    return room || null;
  }

  async getActive(): Promise<RoomRecord[]> {
    // Delegate to existing getRooms function and filter for active rooms
    const rooms = getRooms();
    const activeRooms = rooms.filter(room => room.isActive);
    // Return as RoomRecord[] (compatible with existing Room[])
    return activeRooms as RoomRecord[];
  }

  async create(record: Omit<RoomRecord, 'id' | 'createdAt'>): Promise<RoomRecord> {
    // Transform repository record to room-store format
    const roomData = {
      name: record.name,
      description: record.description,
      pricePerNight: record.pricePerNight,
      maxGuests: record.maxGuests,
      isActive: record.isActive,
    };

    // Delegate to existing createRoom function
    const created = createRoom(roomData);

    // Return as RoomRecord (compatible with existing Room)
    return created as RoomRecord;
  }

  async update(id: string, updates: PartialRoomRecord): Promise<RoomRecord | null> {
    // Transform repository updates to room-store format
    const updateData = {
      name: updates.name,
      description: updates.description,
      pricePerNight: updates.pricePerNight,
      maxGuests: updates.maxGuests,
      isActive: updates.isActive,
    };

    // Delegate to existing updateRoom function
    const updated = updateRoom(id, updateData);

    // Return as RoomRecord or null (matches existing behavior)
    return updated as RoomRecord | null;
  }
}
