async function testBooking() {
    const payload = {
        guest_name: "Test User Simulation",
        email: "simulation@test.com",
        phone: "+251911223344",
        room_type: "Economy Single Room",
        dates: {
            check_in: "2025-05-01",
            check_out: "2025-05-05"
        },
        message: "Simulation test"
    };

    console.log("Sending booking inquiry...");
    try {
        const response = await fetch('http://localhost:3000/api/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        console.log("Response status:", response.status);
        console.log("Response data:", JSON.stringify(data, null, 2));

        if (response.ok) {
            console.log("\nChecking admin bookings...");
            const adminRes = await fetch('http://localhost:3000/api/admin/bookings');
            const bookings = await adminRes.json();
            if (Array.isArray(bookings)) {
                const found = bookings.find(b => b.guest_name === "Test User Simulation");
                if (found) {
                    console.log("SUCCESS: Booking visible in admin panel!");
                    console.log("Booking details:", JSON.stringify(found, null, 2));
                } else {
                    console.log("FAILURE: Booking NOT found in admin panel.");
                }
            } else {
                console.log("FAILURE: Admin API did not return an array.", bookings);
            }
        }
    } catch (err) {
        console.error("Connection error:", err.message);
    }
}

testBooking();
