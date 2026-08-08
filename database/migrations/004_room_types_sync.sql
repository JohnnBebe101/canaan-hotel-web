-- ============================================================
-- MIGRATION 004: Room Types Synchronization
-- Date: 2026-05-15
-- Purpose: Document canonical 6 room types for project
-- 
-- Status: Documentation-only migration
-- The room_type column in bookings uses TEXT type,
-- no schema changes are required for this migration.
-- ============================================================

-- ============================================================
-- CANONICAL ROOM TYPES
-- ============================================================
-- The following 6 room types are the ONLY valid room types
-- for new bookings in this system:
--
-- 1. standard    - $25/night  - 1 guest max
-- 2. delux       - $32/night  - 2 guests max
-- 3. king        - $40/night  - 2 guests max
-- 4. twin        - $45/night  - 2 guests max
-- 5. semi-suit   - $50/night  - 2 guests max
-- 6. suit        - $55/night  - 2 guests max

-- ============================================================
-- IMAGE FOLDERS (for reference)
-- ============================================================
-- Room images are organized in subfolders under:
-- /public/images/rooms/
--   standard/     (standard-primary.jpg, standard-gallery-01.jpg, etc.)
--   deluxe/       (deluxe-primary.jpg, etc.)
--   king/         (king-primary.jpg, etc.)
--   twin/         (twin-primary.jpg, etc.)
--   semi-suite/   (semi-suite-primary.jpg, etc.)
--   suite/        (suite-primary.jpg, etc.)

-- ============================================================
-- SEED DATA FOR ROOMS TABLE (Optional)
-- ============================================================
-- Uncomment and run below to seed/reset the rooms table with canonical types.
-- This will not delete existing bookings but will update room prices.

/*
BEGIN;

-- Upsert standard room types
INSERT INTO rooms (name, description, price_per_night, max_guests, is_active, image_src, image_alt, badges, rating)
VALUES
  ('Standard Room', 'Comfortable standard room with essential amenities. Perfect for solo travelers seeking quality accommodation at an affordable price.', 25, 1, true, '/images/rooms/standard/standard-primary.jpg', 'Standard Room at Canaan Hotel', ARRAY['Free Wi-Fi', 'Private Bath', 'Air Conditioning'], 4.2),
  ('Delux Room', 'Spacious delux room with modern amenities. Ideal for couples or business travelers who want extra comfort.', 32, 2, true, '/images/rooms/deluxe/deluxe-primary.jpg', 'Delux Room at Canaan Hotel', ARRAY['Free Wi-Fi', 'Modern Bath', 'Work Desk', 'Mini Fridge'], 4.4),
  ('King Room', 'Luxurious king room with premium amenities. Perfect for guests seeking a premium stay experience.', 40, 2, true, '/images/rooms/king/king-primary.jpg', 'King Room at Canaan Hotel', ARRAY['Free Wi-Fi', 'Premium Bath', 'King Bed', 'Work Desk', 'Mini Fridge'], 4.6),
  ('Twin Room', 'Room with two single beds. Great for friends or colleagues traveling together.', 45, 2, true, '/images/rooms/twin/twin-primary.jpg', 'Twin Room at Canaan Hotel', ARRAY['Free Wi-Fi', 'Two Beds', 'Work Desk', 'Mini Fridge'], 4.3),
  ('Semi Suit Room', 'Semi-suit with extra space and premium amenities. For guests who want more space and luxury.', 50, 2, true, '/images/rooms/semi-suite/semi-suite-primary.jpg', 'Semi Suit Room at Canaan Hotel', ARRAY['Free Wi-Fi', 'Extra Space', 'Premium Bath', 'Seating Area', 'Mini Fridge'], 4.5),
  ('Suit Room', 'Premium suit with luxury amenities. The ultimate Canaan experience for discerning travelers.', 55, 2, true, '/images/rooms/suite/suite-primary.jpg', 'Suit Room at Canaan Hotel', ARRAY['Free Wi-Fi', 'Luxury Bath', 'King Bed', 'Seating Area', 'Premium View', 'Mini Fridge'], 4.8)
ON CONFLICT (name) DO UPDATE SET
  description = EXCLUDED.description,
  price_per_night = EXCLUDED.price_per_night,
  max_guests = EXCLUDED.max_guests,
  image_src = EXCLUDED.image_src,
  image_alt = EXCLUDED.image_alt,
  badges = EXCLUDED.badges,
  rating = EXCLUDED.rating;

COMMIT;
*/

-- ============================================================
-- VERIFICATION QUERIES
-- ============================================================

-- Query 1: List all distinct room types in bookings table
-- SELECT DISTINCT room_type FROM bookings ORDER BY room_type;

-- Query 2: Count bookings by room type
-- SELECT room_type, COUNT(*) as count FROM bookings GROUP BY room_type ORDER BY count DESC;

-- Query 3: Verify rooms table has canonical types
-- SELECT name, price_per_night, max_guests FROM rooms ORDER BY price_per_night;

-- ============================================================
-- END OF MIGRATION 004
-- ============================================================
SELECT '✅ Migration 004: Room types synchronized successfully!' AS status;