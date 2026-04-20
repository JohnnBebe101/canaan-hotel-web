-- ============================================================
-- MIGRATION 001: INITIAL SCHEMA
-- Baseline schema before any enhancements
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- BOOKINGS TABLE (Baseline - 11 columns)
-- ============================================================
CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    guest_name TEXT NOT NULL,
    email TEXT NOT NULL,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    number_of_guests INTEGER NOT NULL,
    room_type TEXT NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    status TEXT CHECK (status IN ('pending', 'confirmed', 'cancelled')) DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- PAYMENTS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    status TEXT CHECK (status IN ('pending', 'completed', 'failed')) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- ROOMS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS rooms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    price_per_night DECIMAL(10,2) NOT NULL,
    max_guests INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT true,
    image_src TEXT DEFAULT '/images/Room-Bed.svg',
    image_alt TEXT DEFAULT 'Hotel room',
    price_label TEXT DEFAULT 'From $XX / night',
    badges TEXT[] DEFAULT '{}',
    rating DECIMAL(2,1) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- ATTRACTIONS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS attractions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    category TEXT,
    distance TEXT,
    image TEXT DEFAULT '/images/Adigrat.svg',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- BLOGS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS blogs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT,
    featured_image TEXT,
    author TEXT DEFAULT 'Canaan Hotel Team',
    published_at TIMESTAMP WITH TIME ZONE,
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- SEED DATA - ROOMS
-- ============================================================
INSERT INTO rooms (name, description, price_per_night, max_guests, is_active, image_src, image_alt, price_label, badges, rating) VALUES
('Economy Single Room', 'Perfect for solo travelers with a stunning city view. Compact yet comfortable with essential amenities.', 50, 1, true, '/images/Room-Bed.svg', 'Economy Single Room', 'From $50 / night', ARRAY['Free WiFi', 'City View'], 4.5),
('Comfort Double Room', 'Spacious comfort for couples, featuring a plush double bed and private balcony.', 75, 2, true, '/images/Room-Larger.svg', 'Comfort Double Room', 'From $75 / night', ARRAY['Free WiFi', 'Balcony', 'Breakfast Included'], 4.7),
('Family Suite', 'Ideal for families, with multiple beds and extra space for everyone.', 110, 4, true, '/images/Twin-Room.svg', 'Family Suite', 'From $110 / night', ARRAY['Free WiFi', 'Kitchenette', 'Extra Beds'], 4.8)
ON CONFLICT (name) DO NOTHING;

-- ============================================================
-- SEED DATA - ATTRACTIONS
-- ============================================================
INSERT INTO attractions (name, description, category, distance, image, is_active) VALUES
('Debre Damo Monastery', 'An ancient monastery perched atop a flat-topped mountain, accessible only by rope.', 'Historical', '45 km', '/images/Adigrat.svg', true),
('Gheralta Mountains', 'Dramatic sandstone cliffs home to ancient rock-hewn churches and stunning hiking trails.', 'Nature', '30 km', '/images/Adigrat.svg', true),
('Al-Nejashi Mosque', 'One of the oldest mosques in Africa, a site of great historical and religious importance.', 'Historical', '5 km', '/images/Gate.svg', true),
('Hawzien Rock Churches', 'A cluster of medieval churches carved into volcanic rock formations.', 'Historical', '40 km', '/images/Adigrat.svg', true),
('Medebra Church', 'Ancient Ethiopian Orthodox church with unique architectural features.', 'Historical', '12 km', '/images/Adigrat.svg', true)
ON CONFLICT DO NOTHING;

-- ============================================================
-- SEED DATA - BOOKINGS (Demo)
-- ============================================================
INSERT INTO bookings (guest_name, email, check_in_date, check_out_date, number_of_guests, room_type, total_price, status, notes) VALUES
('John Demo', 'john.demo@example.com', '2025-02-15', '2025-02-18', 2, 'Comfort Double Room', 225, 'confirmed', 'Demo booking - Welcome!'),
('Jane Sample', 'jane.sample@example.com', '2025-02-20', '2025-02-22', 1, 'Economy Single Room', 100, 'pending', 'Demo booking'),
('Bob Wilson', 'bob@example.com', '2025-02-25', '2025-03-01', 4, 'Family Suite', 440, 'confirmed', 'Family vacation')
ON CONFLICT DO NOTHING;

-- ============================================================
-- ENABLE RLS (Baseline)
-- ============================================================
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE attractions ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Basic RLS policies (minimal)
CREATE POLICY "Public can view rooms" ON rooms FOR SELECT TO anon USING (true);
CREATE POLICY "Public can view attractions" ON attractions FOR SELECT TO anon USING (true);
CREATE POLICY "Public can view published blogs" ON blogs FOR SELECT TO anon USING (is_published = true);

SELECT '✅ Migration 001 complete: Initial schema' AS status;