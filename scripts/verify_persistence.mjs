import fetch from 'node-fetch';

async function verifyPersistence() {
    console.log('--- Verifying Rooms API ---');
    try {
        const roomsRes = await fetch('http://localhost:3000/api/admin/rooms');
        const rooms = await roomsRes.json();
        console.log(`Rooms found: ${rooms.length}`);
        rooms.forEach(r => console.log(`- ${r.name} (${r.isActive ? 'Active' : 'Inactive'})`));
    } catch (err) {
        console.error('Rooms API failed:', err.message);
    }

    console.log('\n--- Verifying Attractions API ---');
    try {
        const attractionsRes = await fetch('http://localhost:3000/api/admin/attractions');
        const attractions = await attractionsRes.json();
        console.log(`Attractions found: ${attractions.length}`);
        attractions.forEach(a => console.log(`- ${a.name} (${a.active ? 'Active' : 'Inactive'})`));
    } catch (err) {
        console.error('Attractions API failed:', err.message);
    }
}

verifyPersistence();
