-- =============================================
-- CANAAN INTERNATIONAL HOTEL - DATABASE SCHEMA
-- Run this in Supabase SQL Editor
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- BOOKINGS TABLE
-- =============================================
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

-- =============================================
-- PAYMENTS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    status TEXT CHECK (status IN ('pending', 'completed', 'failed')) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- ROOMS TABLE
-- =============================================
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

-- =============================================
-- ATTRACTIONS TABLE
-- =============================================
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

-- =============================================
-- BLOGS TABLE
-- =============================================
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

-- =============================================
-- SEED DATA - ROOMS
-- =============================================
INSERT INTO rooms (name, description, price_per_night, max_guests, is_active, image_src, image_alt, price_label, badges, rating) VALUES
('Economy Single Room', 'Perfect for solo travelers with a stunning city view. Compact yet comfortable with essential amenities.', 50, 1, true, '/images/Room-Bed.svg', 'Economy Single Room', 'From $50 / night', ARRAY['Free WiFi', 'City View'], 4.5),
('Comfort Double Room', 'Spacious comfort for couples, featuring a plush double bed and private balcony.', 75, 2, true, '/images/Room-Larger.svg', 'Comfort Double Room', 'From $75 / night', ARRAY['Free WiFi', 'Balcony', 'Breakfast Included'], 4.7),
('Family Suite', 'Ideal for families, with multiple beds and extra space for everyone.', 110, 4, true, '/images/Twin-Room.svg', 'Family Suite', 'From $110 / night', ARRAY['Free WiFi', 'Kitchenette', 'Extra Beds'], 4.8)
ON CONFLICT (name) DO NOTHING;

-- =============================================
-- SEED DATA - ATTRACTIONS
-- =============================================
INSERT INTO attractions (name, description, category, distance, image, is_active) VALUES
('Debre Damo Monastery', 'An ancient monastery perched atop a flat-topped mountain, accessible only by rope.', 'Historical', '45 km', '/images/Adigrat.svg', true),
('Gheralta Mountains', 'Dramatic sandstone cliffs home to ancient rock-hewn churches and stunning hiking trails.', 'Nature', '30 km', '/images/Adigrat.svg', true),
('Al-Nejashi Mosque', 'One of the oldest mosques in Africa, a site of great historical and religious importance.', 'Historical', '5 km', '/images/Gate.svg', true),
('Hawzien Rock Churches', 'A cluster of medieval churches carved into volcanic rock formations.', 'Historical', '40 km', '/images/Adigrat.svg', true),
('Medebra Church', 'Ancient Ethiopian Orthodox church with unique architectural features.', 'Historical', '12 km', '/images/Adigrat.svg', true)
ON CONFLICT DO NOTHING;

-- =============================================
-- SEED DATA - BOOKINGS (Demo)
-- =============================================
INSERT INTO bookings (guest_name, email, check_in_date, check_out_date, number_of_guests, room_type, total_price, status, notes) VALUES
('John Demo', 'john.demo@example.com', '2025-02-15', '2025-02-18', 2, 'Comfort Double Room', 225, 'confirmed', 'Demo booking - Welcome!'),
('Jane Sample', 'jane.sample@example.com', '2025-02-20', '2025-02-22', 1, 'Economy Single Room', 100, 'pending', 'Demo booking'),
('Bob Wilson', 'bob@example.com', '2025-02-25', '2025-03-01', 4, 'Family Suite', 440, 'confirmed', 'Family vacation')
ON CONFLICT DO NOTHING;

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE attractions ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- =============================================
-- SEED DATA - BLOGS
-- =============================================
INSERT INTO blogs (title, slug, excerpt, content, featured_image, author, published_at, is_published) VALUES
(
    'Discover Gheralta: A Hikers Paradise in Tigray',
    'gheralta-mountains-tigray',
    'Explore the dramatic sandstone cliffs and ancient rock-hewn churches of the Gheralta Mountains.',
    '<p>The Gheralta Mountains in Tigray, Ethiopia, are a hidden gem for hiking enthusiasts and history lovers alike. Rising dramatically from the Ethiopian highlands, this range offers some of the most spectacular landscapes in Africa.</p>

<h2>A Landscape Like No Other</h2>
<p>The Gheralta Mountains are characterized by their dramatic sandstone formations, deep gorges, and towering cliffs. The landscape is both rugged and beautiful, offering breathtaking views at every turn. For hikers, the trails provide an challenging yet rewarding experience through some of the most pristine natural scenery in Ethiopia.</p>

<h2>Ancient Rock-Hewn Churches</h2>
<p>One of the most remarkable features of the Gheralta Mountains is the concentration of ancient rock-hewn churches hidden within its cliffs and caves. These churches, some dating back to the 5th century, are carved directly into the rock faces and represent a unique architectural and religious heritage.</p>

<p>Among the most famous are the churches of Maryam Keder and Daniel Kweruro, which require careful climbing to reach. The views from these elevated churches are simply spectacular, offering panoramic vistas of the surrounding mountains and valleys.</p>

<h2>Best Time to Visit</h2>
<p>The ideal time to explore the Gheralta Mountains is between October and March, when the weather is dry and the hiking trails are in their best condition. The cooler months of December to February offer the most comfortable temperatures for trekking.</p>

<h2>Plan Your Visit</h2>
<p>Whether you are an experienced hiker seeking adventure or a history enthusiast eager to explore ancient religious sites, the Gheralta Mountains have something to offer everyone. Stay at Canaan International Hotel in Adigrat as your base for exploring this remarkable region.</p>',
    '/images/Adigrat.svg',
    'Canaan Hotel Team',
    NOW(),
    true
),
(
    'Al-Nejashi Mosque: One of Africas Oldest Mosques',
    'al-nejashi-mosque-history',
    'Learn about this remarkable 7th-century architectural marvel and its place in Islamic history.',
    '<p>The Al-Nejashi Mosque, located just 5 kilometers from Adigrat in Tigray, Ethiopia, is one of the oldest mosques in Africa and holds significant historical and religious importance.</p>

<h2>A Foundation in the 7th Century</h2>
<p>According to historical accounts, the Al-Nejashi Mosque was built during the early years of Islam, making it one of the first places of worship for Muslims in Africa. The mosque is said to have been built by followers of the Prophet Muhammad who fled persecution in Mecca and found refuge in the Kingdom of Axum.</p>

<h2>Unique Architecture</h2>
<p>Unlike the typical mosque architecture found in other parts of the Islamic world, the Al-Nejashi Mosque features a distinct local style. The original structure was built using traditional Ethiopian construction techniques, with thick stone walls and a thatched roof. Over the centuries, the mosque has been renovated and expanded, but it still retains much of its historical character.</p>

<h2>Historical Significance</h2>
<p>The mosque is named after Negash, a prominent figure in early Islamic history who welcomed the Muslim refugees and allowed them to settle in the area. The nearby Negash Island, located in the Tekezé River, was one of the earliest Muslim settlements in Africa.</p>

<h2>A Place of Pilgrimage</h2>
<p>Today, the Al-Nejashi Mosque is a place of pilgrimage for Muslims from across Ethiopia and beyond. The mosque complex includes a cemetery where early Muslim settlers are buried, adding to its spiritual significance.</p>

<h2>Visiting the Mosque</h2>
<p>The mosque is open to visitors who wish to learn about its history and appreciate its cultural significance. Located just a short drive from Canaan International Hotel, it makes for an excellent half-day excursion during your stay in Adigrat.</p>',
    '/images/Gate.svg',
    'Canaan Hotel Team',
    NOW(),
    true
)
ON CONFLICT (slug) DO NOTHING;

-- =============================================
-- VERIFICATION QUERIES
-- =============================================
SELECT 'Bookings count: ' || COUNT(*)::TEXT FROM bookings;
SELECT 'Rooms count: ' || COUNT(*)::TEXT FROM rooms;
SELECT 'Attractions count: ' || COUNT(*)::TEXT FROM attractions;

-- =============================================
-- COMPLETED!
-- =============================================
SELECT '✅ Database schema created successfully!' AS status;
