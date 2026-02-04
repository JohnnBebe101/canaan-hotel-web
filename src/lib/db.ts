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

// Define the structure of our database
interface Data {
  bookings: Booking[];
  payments: Payment[]; // Although payments are not fully implemented, keep the structure
}

// Default data for the database
const defaultData: Data = { 
  bookings: [], 
  payments: [] 
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
    await db.write();
  }

  return db;
}

export { nanoid };
