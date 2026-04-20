-- ============================================================
-- MIGRATION 002: STRIPE COLUMNS
-- Tranche 1: Payment integration columns
-- ============================================================

-- Add phone column
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS phone TEXT;

-- Add payment tracking columns
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'unpaid';
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS total_price_cents INTEGER;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS stripe_payment_intent TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS stripe_webhook_event_id TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'USD';

-- Add booking versioning
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS booking_version TEXT DEFAULT 'v1-pre-stripe';

-- Add booking reference for customer-facing ID
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS booking_reference TEXT;

-- Add booking origin tracking
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS booking_origin TEXT DEFAULT 'online';

-- Add hold expiration tracking
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS hold_expires_at TIMESTAMP WITH TIME ZONE;

-- Add confirmation tracking
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS confirmation_mode TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS confirmed_at TIMESTAMP WITH TIME ZONE;

-- Add audit timestamps
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Add cancellation tracking
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS cancelled_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS cancellation_reason TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS refund_amount_cents INTEGER;

-- ============================================================
-- UNIQUE INDEX: Prevent duplicate webhook events
-- ============================================================
CREATE UNIQUE INDEX IF NOT EXISTS bookings_stripe_webhook_event_id_unique 
    ON bookings(stripe_webhook_event_id) 
    WHERE stripe_webhook_event_id IS NOT NULL;

-- ============================================================
-- PERFORMANCE INDEXES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_payment_status ON bookings(payment_status);
CREATE INDEX IF NOT EXISTS idx_bookings_check_in_date ON bookings(check_in_date);
CREATE INDEX IF NOT EXISTS idx_bookings_room_type_dates ON bookings(room_type, check_in_date, check_out_date);

SELECT '✅ Migration 002 complete: Stripe columns added' AS status;