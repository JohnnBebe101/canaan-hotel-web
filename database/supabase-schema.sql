-- ============================================================
-- CANAAN INTERNATIONAL HOTEL - AUTHORITATIVE DATABASE SCHEMA
-- Generated: 2026-04-20
-- 
-- This file reflects the current live database state exactly.
-- Use this file to recreate the environment or for reference.
--
-- Tables: bookings, payments, rooms, attractions, blogs
-- ============================================================

-- ============================================================
-- EXTENSIONS
-- ============================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- BOOKINGS TABLE
-- Core table for all reservation data
-- ============================================================
CREATE TABLE IF NOT EXISTS bookings (
    -- Core identification
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Guest information
    guest_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    
    -- Stay details
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    number_of_guests INTEGER NOT NULL DEFAULT 1,
    room_type TEXT NOT NULL,
    
    -- Pricing
    total_price NUMERIC NOT NULL,
    total_price_cents INTEGER,
    currency TEXT DEFAULT 'USD',
    
    -- Status tracking
    status TEXT DEFAULT 'held',
    payment_status TEXT NOT NULL DEFAULT 'unpaid',
    
    -- Booking metadata
    booking_version TEXT DEFAULT 'v2-hybrid-confirmation',
    booking_reference TEXT,
    booking_origin TEXT DEFAULT 'online',
    
    -- Payment tracking
    stripe_payment_intent TEXT,
    stripe_webhook_event_id TEXT,
    
    -- Hold/expiration tracking
    hold_expires_at TIMESTAMP WITH TIME ZONE,
    
    -- Confirmation tracking
    confirmation_mode TEXT,
    confirmed_at TIMESTAMP WITH TIME ZONE,
    
    -- Audit timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Cancellation tracking
    cancelled_at TIMESTAMP WITH TIME ZONE,
    cancellation_reason TEXT,
    refund_amount_cents INTEGER,
    
    -- Additional notes
    notes TEXT
);

-- ============================================================
-- CONSTRAINTS ON BOOKINGS
-- ============================================================

-- Status must be one of the allowed values
ALTER TABLE bookings ADD CONSTRAINT bookings_status_check
    CHECK (status = ANY (ARRAY[
        'pending'::text, 
        'confirmed'::text, 
        'cancelled'::text,
        'inquiry'::text,
        'booking_created'::text,
        'held'::text,
        'hold_pending_confirmation'::text,
        'conflict_flagged'::text,
        'checked_in'::text,
        'checked_out'::text
    ]));

-- Payment status must be one of the allowed values
ALTER TABLE bookings ADD CONSTRAINT bookings_payment_status_check
    CHECK (payment_status = ANY (ARRAY[
        'unpaid'::text, 
        'pending'::text, 
        'paid'::text, 
        'failed'::text, 
        'refunded'::text,
        'partially_refunded'::text
    ]));

-- Booking origin must be online, local, or hybrid
ALTER TABLE bookings ADD CONSTRAINT bookings_booking_origin_check
    CHECK (booking_origin = ANY (ARRAY[
        'online'::text, 
        'local'::text, 
        'hybrid'::text
    ]));

-- Currency must be USD
ALTER TABLE bookings ADD CONSTRAINT bookings_currency_check
    CHECK (currency = 'USD'::text);

-- ============================================================
-- INDEXES ON BOOKINGS
-- ============================================================

-- Primary key (auto-created with table)
-- UNIQUE INDEX: stripe_webhook_event_id (prevents duplicate webhooks)
CREATE UNIQUE INDEX IF NOT EXISTS bookings_stripe_webhook_event_id_unique 
    ON bookings(stripe_webhook_event_id) 
    WHERE stripe_webhook_event_id IS NOT NULL;

-- Performance indexes
CREATE INDEX IF NOT EXISTS idx_bookings_status 
    ON bookings(status);

CREATE INDEX IF NOT EXISTS idx_bookings_payment_status 
    ON bookings(payment_status);

CREATE INDEX IF NOT EXISTS idx_bookings_check_in_date 
    ON bookings(check_in_date);

CREATE INDEX IF NOT EXISTS idx_bookings_room_type_dates 
    ON bookings(room_type, check_in_date, check_out_date);

-- Partial indexes for common queries
CREATE INDEX IF NOT EXISTS idx_bookings_booking_reference 
    ON bookings(booking_reference) 
    WHERE booking_reference IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_bookings_hold_expires_at 
    ON bookings(hold_expires_at) 
    WHERE hold_expires_at IS NOT NULL;

-- ============================================================
-- PAYMENTS TABLE
-- Legacy payment tracking (may be unused in current implementation)
-- ============================================================
CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
    amount NUMERIC(10,2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    status TEXT CHECK (status IN ('pending', 'completed', 'failed')) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- ROOMS TABLE
-- Hotel room inventory
-- ============================================================
CREATE TABLE IF NOT EXISTS rooms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    price_per_night NUMERIC(10,2) NOT NULL,
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
-- Local tourist attractions
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
-- Blog posts for marketing/SEO
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
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE attractions ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- --------------------------------------------------------
-- BOOKINGS RLS POLICIES
-- --------------------------------------------------------

-- Allow anonymous insert for online bookings
CREATE POLICY anon_insert_online_bookings ON bookings
    FOR INSERT TO anon
    WITH CHECK (true);

-- Allow public select by booking_reference via header
CREATE POLICY anon_select_by_booking_reference ON bookings
    FOR SELECT TO anon
    USING (
        booking_reference = 
            COALESCE(
                NULLIF(current_setting('request.headers', true)::json->>'x-booking-ref', ''),
                ''
            )
    );

-- Allow authenticated users full access
CREATE POLICY authenticated_full_access ON bookings
    FOR ALL TO authenticated
    USING (true)
    WITH CHECK (true);

-- --------------------------------------------------------
-- ROOMS RLS POLICIES (Public read)
-- --------------------------------------------------------

CREATE POLICY "Public can view rooms" ON rooms
    FOR SELECT TO anon
    USING (true);

-- --------------------------------------------------------
-- ATTRACTIONS RLS POLICIES (Public read)
-- --------------------------------------------------------

CREATE POLICY "Public can view attractions" ON attractions
    FOR SELECT TO anon
    USING (true);

-- --------------------------------------------------------
-- BLOGS RLS POLICIES (Public read)
-- --------------------------------------------------------

CREATE POLICY "Public can view published blogs" ON blogs
    FOR SELECT TO anon
    USING (is_published = true);

-- ============================================================
-- SEED DATA
-- ============================================================
-- Note: See database/supabase-seed-data.sql for initial data
-- 
-- Key room types (used in booking form validation):
--   - economy-single  ($45/night)
--   - economy-double  ($75/night)  
--   - family-room     ($95/night)
--   - comfort-double  ($120/night)
--
-- Room types must match: src/app/api/bookings/create/route.ts
-- and src/lib/featuredRooms.ts
-- ============================================================

-- ============================================================
-- VERIFICATION QUERIES
-- ============================================================

-- Verify schema loaded correctly
SELECT 
    '✅ Schema loaded' AS status,
    COUNT(*) AS tables_count
FROM information_schema.tables 
WHERE table_schema = 'public';

-- Verify RLS is enabled
SELECT 
    tablename,
    rowsecurity AS rls_enabled
FROM pg_tables
WHERE schemaname = 'public' 
    AND tablename IN ('bookings', 'payments', 'rooms', 'attractions', 'blogs');

-- Verify constraints count
SELECT 
    'Constraints verified' AS status,
    COUNT(*) AS constraint_count
FROM pg_constraint
WHERE conrelid = 'public.bookings'::regclass;

-- Verify indexes count
SELECT 
    'Indexes verified' AS status,
    COUNT(*) AS index_count
FROM pg_indexes
WHERE tablename = 'bookings';

-- ============================================================
-- END OF SCHEMA
-- ============================================================
SELECT '✅ Complete database schema loaded successfully!' AS status;