-- Demo Data for Presentation
-- Run this in Supabase Dashboard SQL Editor
-- After your presentation, delete these records from the Table Editor

-- Insert Demo Bookings
INSERT INTO bookings (guest_name, email, check_in_date, check_out_date, number_of_guests, room_type, total_price, status, notes) VALUES
('John Demo', 'john.demo@email.com', '2025-02-10', '2025-02-12', 2, 'Economy Single Room', 100, 'confirmed', 'Early check-in requested'),
('Jane Sample', 'jane.sample@email.com', '2025-02-15', '2025-02-18', 3, 'Family Suite', 330, 'pending', 'Anniversary celebration'),
('Michael Traveler', 'mike.t@email.com', '2025-02-20', '2025-02-22', 2, 'Comfort Double Room', 150, 'confirmed', 'Business traveler'),
('Sarah Johnson', 'sarah.j@email.com', '2025-02-25', '2025-02-28', 4, 'Family Suite', 330, 'pending', NULL);

-- Verify data
SELECT id, guest_name, status, check_in_date, total_price FROM bookings ORDER BY created_at DESC LIMIT 5;
