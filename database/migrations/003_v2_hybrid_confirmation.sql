-- ============================================================
-- MIGRATION 003: V2 HYBRID CONFIRMATION
-- Tranche 2: Full state machine, RLS updates, constraints
-- ============================================================

-- ============================================================
-- 1. UPDATE STATUS CONSTRAINT
-- Drop legacy constraint and add new 8-value enum
-- ============================================================

-- First, migrate any existing 'pending' status to 'held'
UPDATE bookings 
SET status = 'held' 
WHERE status = 'pending';

-- Drop legacy constraint
ALTER TABLE bookings DROP CONSTRAINT IF EXISTS bookings_status_check;

-- Add new status constraint with 10 values
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

-- ============================================================
-- 2. ADD PAYMENT STATUS CONSTRAINT
-- ============================================================
ALTER TABLE bookings ADD CONSTRAINT bookings_payment_status_check
    CHECK (payment_status = ANY (ARRAY[
        'unpaid'::text, 
        'pending'::text, 
        'paid'::text, 
        'failed'::text, 
        'refunded'::text,
        'partially_refunded'::text
    ]));

-- ============================================================
-- 3. ADD BOOKING ORIGIN CONSTRAINT
-- ============================================================
ALTER TABLE bookings ADD CONSTRAINT bookings_booking_origin_check
    CHECK (booking_origin = ANY (ARRAY[
        'online'::text, 
        'local'::text, 
        'hybrid'::text
    ]));

-- ============================================================
-- 4. ADD CURRENCY CONSTRAINT
-- ============================================================
ALTER TABLE bookings ADD CONSTRAINT bookings_currency_check
    CHECK (currency = 'USD'::text);

-- ============================================================
-- 5. UPDATE DEFAULT VALUES
-- ============================================================

-- Set proper defaults for new columns
ALTER TABLE bookings ALTER COLUMN status SET DEFAULT 'held'::text;
ALTER TABLE bookings ALTER COLUMN payment_status SET DEFAULT 'unpaid'::text;
ALTER TABLE bookings ALTER COLUMN booking_version SET DEFAULT 'v2-hybrid-confirmation'::text;
ALTER TABLE bookings ALTER COLUMN booking_origin SET DEFAULT 'online'::text;
ALTER TABLE bookings ALTER COLUMN currency SET DEFAULT 'USD'::text;

-- ============================================================
-- 6. ADDITIONAL INDEXES
-- ============================================================

-- Partial index for booking reference lookups
CREATE INDEX IF NOT EXISTS idx_bookings_booking_reference 
    ON bookings(booking_reference) 
    WHERE booking_reference IS NOT NULL;

-- Partial index for hold expiration queries
CREATE INDEX IF NOT EXISTS idx_bookings_hold_expires_at 
    ON bookings(hold_expires_at) 
    WHERE hold_expires_at IS NOT NULL;

-- ============================================================
-- 7. UPDATE RLS POLICIES
-- ============================================================

-- Drop existing bookings policies (if any)
DROP POLICY IF EXISTS anon_insert_online_bookings ON bookings;
DROP POLICY IF EXISTS anon_select_by_booking_reference ON bookings;
DROP POLICY IF EXISTS authenticated_full_access ON bookings;

-- Create new policies for v2

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

-- ============================================================
-- 8. DATA MIGRATION (if needed)
-- ============================================================

-- Update any existing bookings to v2 version
UPDATE bookings 
SET booking_version = 'v2-hybrid-confirmation'
WHERE booking_version IS NULL OR booking_version = 'v1-pre-stripe';

-- Set hold_expires_at for any held bookings that don't have it
UPDATE bookings
SET hold_expires_at = created_at + INTERVAL '30 minutes'
WHERE status = 'held' AND hold_expires_at IS NULL;

SELECT '✅ Migration 003 complete: V2 hybrid confirmation schema' AS status;