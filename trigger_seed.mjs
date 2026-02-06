import { initializeDatabase } from './src/lib/db.js';

async function seed() {
    console.log('Initializing database to trigger seeding...');
    await initializeDatabase();
    console.log('Done.');
}

seed();
