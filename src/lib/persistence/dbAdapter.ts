import { isDbPersistenceEnabled } from '../featureFlags';
import { logError } from '../logger';
import { BookingRecordDB, PaymentRecordDB, AuditEventDB, RoomRecordDB, AttractionRecordDB } from './types';
import { initializeDatabase, Booking, Room, Attraction, nanoid } from '../db'; // Import lowdb setup

// Global write lock to serialize lowdb writes and prevent race conditions
let writePromise = Promise.resolve();

/**
 * Save booking record to database
 * @param booking Complete booking record to persist
 */
export async function saveBooking(booking: BookingRecordDB): Promise<void> {
  if (!isDbPersistenceEnabled()) {
    // Database persistence disabled - silently return
    return;
  }

  try {
    await writePromise;
    const db = await initializeDatabase();
    const existingBookingIndex = db.data.bookings.findIndex(b => b.id === booking.id);

    if (existingBookingIndex > -1) {
      // Update existing booking
      const mappedUpdate = mapToDbBooking(booking);
      db.data.bookings[existingBookingIndex] = { ...db.data.bookings[existingBookingIndex], ...mappedUpdate };
    } else {
      // Add new booking
      const newBooking: Booking = mapToDbBooking(booking);
      db.data.bookings.push(newBooking);
    }
    writePromise = db.write();
    await writePromise;
  } catch (error) {
    logError('DB_ADAPTER', 'Failed to save booking to database', { bookingId: booking.id, error });
    throw new Error('Failed to save booking');
  }
}

/**
 * Helper to map domain BookingRecordDB to legacy DB Booking schema
 */
function mapToDbBooking(record: BookingRecordDB): Booking {
  return {
    id: record.id,
    guest_name: record.guestName,
    email: record.email,
    check_in_date: record.checkIn,
    check_out_date: record.checkOut,
    number_of_guests: 1, // Default fallback, as not in BookingRecordDB
    room_type: record.roomType,
    total_price: 0, // Default fallback
    status: record.status === 'NEW' ? 'pending' :
      record.status === 'CANCELLED' ? 'cancelled' : 'confirmed',
    created_at: new Date(record.createdAt).getTime(),
    notes: record.notes
  };
}

/**
 * Helper to map domain RoomRecordDB to legacy DB Room schema
 */
function mapToDbRoom(record: RoomRecordDB): Room {
  return {
    id: record.id,
    name: record.name,
    description: record.description,
    price_per_night: record.pricePerNight,
    max_guests: record.maxGuests,
    is_active: record.isActive,
    created_at: record.createdAt
  };
}

/**
 * Helper to map domain AttractionRecordDB to legacy DB Attraction schema
 */
function mapToDbAttraction(record: AttractionRecordDB): Attraction {
  return {
    id: record.id,
    name: record.name,
    description: record.description,
    category: record.category,
    distance: record.distance,
    image: record.image,
    is_active: record.active
  };
}


/**
 * Save payment record to database
 * @param payment Complete payment record to persist
 */
export async function savePayment(payment: PaymentRecordDB): Promise<void> {
  if (!isDbPersistenceEnabled()) {
    return;
  }
  // Payments not fully implemented in lowdb for now, silently return
  logError('DB_ADAPTER', 'Attempted to save payment to unimplemented database', { paymentId: payment.id, bookingId: payment.bookingId, operation: 'savePayment' });
  return;
}

/**
 * Save audit event to database
 * @param event Complete audit event to persist
 */
export async function saveAuditEvent(event: AuditEventDB): Promise<void> {
  if (!isDbPersistenceEnabled()) {
    return;
  }
  // Audit events not fully implemented in lowdb for now, silently return
  logError('DB_ADAPTER', 'Attempted to save audit event to unimplemented database', { eventId: event.id, resourceType: event.resourceType, resourceId: event.resourceId, operation: 'saveAuditEvent' });
  return;
}

/**
 * Retrieve booking record from database by ID
 * @param id Booking ID to retrieve
 * @returns Booking record or null if not found
 */
export async function getBookingById(id: string): Promise<BookingRecordDB | null> {
  if (!isDbPersistenceEnabled()) {
    return null;
  }

  try {
    const db = await initializeDatabase();
    return db.data.bookings.find(b => b.id === id) as unknown as BookingRecordDB || null;
  } catch (error) {
    logError('DB_ADAPTER', 'Failed to retrieve booking from database', { bookingId: id, error });
    throw new Error('Failed to retrieve booking');
  }
}

/**
 * Retrieve payment record from database by ID
 * @param id Payment ID to retrieve
 * @returns Payment record or null if not found
 */
export async function getPaymentById(id: string): Promise<PaymentRecordDB | null> {
  if (!isDbPersistenceEnabled()) {
    return null;
  }
  // Payments not fully implemented in lowdb for now, silently return null
  logError('DB_ADAPTER', 'Attempted to retrieve payment from unimplemented database', { paymentId: id, operation: 'getPaymentById' });
  return null;
}

/**
 * Retrieve payments for a specific booking
 * @param bookingId Booking ID to get payments for
 * @returns Array of payment records
 */
export async function getPaymentsByBookingId(bookingId: string): Promise<PaymentRecordDB[]> {
  if (!isDbPersistenceEnabled()) {
    return [];
  }
  // Payments not fully implemented in lowdb for now, silently return empty array
  logError('DB_ADAPTER', 'Attempted to retrieve booking payments from unimplemented database', { bookingId, operation: 'getPaymentsByBookingId' });
  return [];
}

/**
 * Update booking record in database
 * @param id Booking ID to update
 * @param updates Partial booking data to apply
 * @returns Updated booking record or null if not found
 */
export async function updateBooking(id: string, updates: Partial<BookingRecordDB>): Promise<BookingRecordDB | null> {
  if (!isDbPersistenceEnabled()) {
    return null;
  }

  try {
    await writePromise;
    const db = await initializeDatabase();
    const bookingIndex = db.data.bookings.findIndex(b => b.id === id);

    if (bookingIndex > -1) {
      db.data.bookings[bookingIndex] = { ...db.data.bookings[bookingIndex], ...updates as unknown as Booking };
      writePromise = db.write();
      await writePromise;
      return db.data.bookings[bookingIndex] as unknown as BookingRecordDB;
    }
    return null;
  } catch (error) {
    logError('DB_ADAPTER', 'Failed to update booking in database', { bookingId: id, error });
    throw new Error('Failed to update booking');
  }
}

/**
 * Update payment record in database
 * @param id Payment ID to update
 * @param updates Partial payment data to apply
 * @returns Updated payment record or null if not found
 */
export async function updatePayment(id: string, updates: Partial<PaymentRecordDB>): Promise<PaymentRecordDB | null> {
  if (!isDbPersistenceEnabled()) {
    return null;
  }
  // Payments not fully implemented in lowdb for now, silently return null
  logError('DB_ADAPTER', 'Attempted to update payment in unimplemented database', { paymentId: id, operation: 'updatePayment' });
  return null;
}

/**
 * Retrieve all bookings from the database
 * @returns Array of all booking records
 */
export async function getAllBookings(): Promise<BookingRecordDB[]> {
  if (!isDbPersistenceEnabled()) {
    return [];
  }

  try {
    const db = await initializeDatabase();
    return db.data.bookings as unknown as BookingRecordDB[];
  } catch (error) {
    logError('DB_ADAPTER', 'Failed to retrieve all bookings from database', { operation: 'getAllBookings', error });
    throw new Error('Failed to retrieve all bookings');
  }
}

/**
 * Save room record to database
 */
export async function saveRoom(room: RoomRecordDB): Promise<void> {
  if (!isDbPersistenceEnabled()) return;
  try {
    await writePromise;
    const db = await initializeDatabase();
    const index = db.data.rooms.findIndex(r => r.id === room.id);
    const mapped = mapToDbRoom(room);
    if (index > -1) {
      db.data.rooms[index] = { ...db.data.rooms[index], ...mapped };
    } else {
      db.data.rooms.push(mapped);
    }
    writePromise = db.write();
    await writePromise;
  } catch (error) {
    logError('DB_ADAPTER', 'Failed to save room to database', { roomId: room.id, error });
    throw new Error('Failed to save room');
  }
}

/**
 * Retrieve all rooms from the database
 */
export async function getAllRooms(): Promise<RoomRecordDB[]> {
  if (!isDbPersistenceEnabled()) return [];
  try {
    const db = await initializeDatabase();
    // Simple cast for now as labels match mostly
    return db.data.rooms.map(r => ({
      id: r.id,
      name: r.name,
      description: r.description,
      pricePerNight: r.price_per_night,
      maxGuests: r.max_guests,
      isActive: r.is_active,
      createdAt: r.created_at
    })) as RoomRecordDB[];
  } catch (error) {
    logError('DB_ADAPTER', 'Failed to retrieve all rooms', { error });
    return [];
  }
}

/**
 * Update room record
 */
export async function updateRoom(id: string, updates: Partial<RoomRecordDB>): Promise<RoomRecordDB | null> {
  if (!isDbPersistenceEnabled()) return null;
  try {
    await writePromise;
    const db = await initializeDatabase();
    const index = db.data.rooms.findIndex(r => r.id === id);
    if (index > -1) {
      // Map keys correctly for persistence
      const mappedUpdates: any = {};
      if (updates.name !== undefined) mappedUpdates.name = updates.name;
      if (updates.description !== undefined) mappedUpdates.description = updates.description;
      if (updates.pricePerNight !== undefined) mappedUpdates.price_per_night = updates.pricePerNight;
      if (updates.maxGuests !== undefined) mappedUpdates.max_guests = updates.maxGuests;
      if (updates.isActive !== undefined) mappedUpdates.is_active = updates.isActive;

      db.data.rooms[index] = { ...db.data.rooms[index], ...mappedUpdates };
      writePromise = db.write();
      await writePromise;

      const r = db.data.rooms[index];
      return {
        id: r.id,
        name: r.name,
        description: r.description,
        pricePerNight: r.price_per_night,
        maxGuests: r.max_guests,
        isActive: r.is_active,
        createdAt: r.created_at
      } as RoomRecordDB;
    }
    return null;
  } catch (error) {
    logError('DB_ADAPTER', 'Failed to update room', { roomId: id, error });
    throw new Error('Failed to update room');
  }
}

/**
 * Delete room record
 */
export async function deleteRoom(id: string): Promise<boolean> {
  if (!isDbPersistenceEnabled()) return false;
  try {
    await writePromise;
    const db = await initializeDatabase();
    const initialLength = db.data.rooms.length;
    db.data.rooms = db.data.rooms.filter(r => r.id !== id);
    if (db.data.rooms.length < initialLength) {
      writePromise = db.write();
      await writePromise;
      return true;
    }
    return false;
  } catch (error) {
    logError('DB_ADAPTER', 'Failed to delete room', { roomId: id, error });
    return false;
  }
}

/**
 * Save attraction record to database
 */
export async function saveAttraction(attraction: AttractionRecordDB): Promise<void> {
  if (!isDbPersistenceEnabled()) return;
  try {
    await writePromise;
    const db = await initializeDatabase();
    const index = db.data.attractions.findIndex(a => a.id === attraction.id);
    const mapped = mapToDbAttraction(attraction);
    if (index > -1) {
      db.data.attractions[index] = { ...db.data.attractions[index], ...mapped };
    } else {
      db.data.attractions.push(mapped);
    }
    writePromise = db.write();
    await writePromise;
  } catch (error) {
    logError('DB_ADAPTER', 'Failed to save attraction', { attractionId: attraction.id, error });
    throw new Error('Failed to save attraction');
  }
}

/**
 * Retrieve all attractions
 */
export async function getAllAttractions(): Promise<AttractionRecordDB[]> {
  if (!isDbPersistenceEnabled()) return [];
  try {
    const db = await initializeDatabase();
    return db.data.attractions.map(a => ({
      id: a.id,
      name: a.name,
      description: a.description,
      category: a.category,
      distance: a.distance,
      image: a.image,
      active: a.is_active
    })) as AttractionRecordDB[];
  } catch (error) {
    logError('DB_ADAPTER', 'Failed to retrieve all attractions', { error });
    return [];
  }
}

/**
 * Update attraction record
 */
export async function updateAttraction(id: string, updates: Partial<AttractionRecordDB>): Promise<AttractionRecordDB | null> {
  if (!isDbPersistenceEnabled()) return null;
  try {
    await writePromise;
    const db = await initializeDatabase();
    const index = db.data.attractions.findIndex(a => a.id === id);
    if (index > -1) {
      const mappedUpdates: any = {};
      if (updates.name !== undefined) mappedUpdates.name = updates.name;
      if (updates.description !== undefined) mappedUpdates.description = updates.description;
      if (updates.category !== undefined) mappedUpdates.category = updates.category;
      if (updates.distance !== undefined) mappedUpdates.distance = updates.distance;
      if (updates.image !== undefined) mappedUpdates.image = updates.image;
      if (updates.active !== undefined) mappedUpdates.is_active = updates.active;

      db.data.attractions[index] = { ...db.data.attractions[index], ...mappedUpdates };
      writePromise = db.write();
      await writePromise;

      const a = db.data.attractions[index];
      return {
        id: a.id,
        name: a.name,
        description: a.description,
        category: a.category,
        distance: a.distance,
        image: a.image,
        active: a.is_active
      } as AttractionRecordDB;
    }
    return null;
  } catch (error) {
    logError('DB_ADAPTER', 'Failed to update attraction', { attractionId: id, error });
    throw new Error('Failed to update attraction');
  }
}

/**
 * Delete attraction record
 */
export async function deleteAttraction(id: string): Promise<boolean> {
  if (!isDbPersistenceEnabled()) return false;
  try {
    await writePromise;
    const db = await initializeDatabase();
    const initialLength = db.data.attractions.length;
    db.data.attractions = db.data.attractions.filter(a => a.id !== id);
    if (db.data.attractions.length < initialLength) {
      writePromise = db.write();
      await writePromise;
      return true;
    }
    return false;
  } catch (error) {
    logError('DB_ADAPTER', 'Failed to delete attraction', { attractionId: id, error });
    return false;
  }
}

