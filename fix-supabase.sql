-- =============================================
-- CANAAN HOTEL - QUICK FIX FOR SUPABASE
-- Copy and run ALL of this in Supabase SQL Editor
-- =============================================

-- Fix attractions table - add missing columns
ALTER TABLE attractions ADD COLUMN IF NOT EXISTS long_description TEXT;
ALTER TABLE attractions ADD COLUMN IF NOT EXISTS highlights TEXT[] DEFAULT '{}';

-- Verify the fix
SELECT '✅ Fix complete!' AS status;
SELECT table_name, column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'attractions' 
ORDER BY ordinal_position;
