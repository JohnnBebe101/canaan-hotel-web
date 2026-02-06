import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { join } from 'path';
import { nanoid } from 'nanoid';

// Define the Booking interface, mirroring the API expected schema
export interface Booking {
  id: string;
  guest_name: string;
  email: string;
  check_in_date: string; // YYYY-MM-DD format
  check_out_date: string; // YYYY-MM-DD format
  number_of_guests: number;
  room_type: string; // e.g., "Economy Single", "Comfort Double"
  total_price: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: number; // Unix timestamp
  notes?: string; // Admin notes
}

interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  created_at: number;
}

export interface Room {
  id: string;
  name: string;
  description: string;
  price_per_night: number;
  max_guests: number;
  is_active: boolean;
  created_at: string;
}

export interface Attraction {
  id: string;
  name: string;
  description: string;
  category: string;
  distance: string;
  image?: string;
  is_active: boolean;
}

// Define the structure of our database
interface Data {
  bookings: Booking[];
  payments: Payment[];
  rooms: Room[];
  attractions: Attraction[];
}

// Default data for the database
const defaultData: Data = {
  bookings: [],
  payments: [],
  rooms: [],
  attractions: []
};

let db: Low<Data> | null = null;

// Function to initialize the database
export async function initializeDatabase() {
  if (db) {
    return db;
  }

  const file = join(process.cwd(), 'data', 'db.json');
  const adapter = new JSONFile<Data>(file);
  db = new Low<Data>(adapter, defaultData);

  await db.read();
  // If the database file is new or empty, write the default data
  if (!db.data) {
    db.data = defaultData;
  }

  let dataChanged = false;

  // SEEDING: If the database is completely empty (no rooms, attractions, or bookings), populate with demo data
  const isEmpty = (db.data.rooms?.length || 0) === 0 &&
    (db.data.attractions?.length || 0) === 0 &&
    (db.data.bookings?.length || 0) === 0;

  if (isEmpty) {
    db.data.rooms = [
      {
        id: "room-deluxe",
        name: "Deluxe Ocean Suite",
        description: "Spacious suite with panoramic ocean views and premium amenities.",
        price_per_night: 250,
        max_guests: 2,
        is_active: true,
        created_at: new Date().toISOString(),
      },
      {
        id: "room-executive",
        name: "Executive Garden Room",
        description: "Elegant room overlooking the lush hotel gardens.",
        price_per_night: 180,
        max_guests: 2,
        is_active: true,
        created_at: new Date().toISOString(),
      },
      {
        id: "room-economy",
        name: "Economy Single Room",
        description: "Compact and efficient room for the solo traveler.",
        price_per_night: 95,
        max_guests: 1,
        is_active: true,
        created_at: new Date().toISOString(),
      }
    ];

    db.data.attractions = [
      {
        id: "historic-district",
        name: "Old Town Historic District",
        description: "Explore the colonial architecture and narrow cobblestone streets.",
        category: "Culture",
        distance: "1.5 km",
        is_active: true
      },
      {
        id: "botanical-gardens",
        name: "City Botanical Gardens",
        description: "A peaceful oasis featuring exotic plants from around the world.",
        category: "Nature",
        distance: "2.3 km",
        is_active: true
      }
    ];

    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    const inTwoWeeks = new Date(today);
    inTwoWeeks.setDate(today.getDate() + 14);

    db.data.bookings = [
      {
        id: nanoid(),
        guest_name: "John Demo",
        email: "john.demo@example.com",
        check_in_date: nextWeek.toISOString().split('T')[0],
        check_out_date: new Date(nextWeek.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        number_of_guests: 2,
        room_type: "Deluxe Ocean Suite",
        total_price: 750,
        status: 'confirmed',
        created_at: Date.now(),
        notes: "Demo seed booking"
      },
      {
        id: nanoid(),
        guest_name: "Jane Sample",
        email: "jane.sample@example.com",
        check_in_date: inTwoWeeks.toISOString().split('T')[0],
        check_out_date: new Date(inTwoWeeks.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        number_of_guests: 1,
        room_type: "Economy Single Room",
        total_price: 190,
        status: 'pending',
        created_at: Date.now(),
        notes: "Demo seed booking"
      }
    ];

    dataChanged = true;
  }

  if (dataChanged) {
    await db.write();
  }

  return db;
}

export { nanoid };
