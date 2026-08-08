# Database Migrations

This directory contains the migration files for the Canaan International Hotel database schema.

## Migration Order

Apply migrations in numerical order:

1. `001_initial_schema.sql` - Baseline schema (11 columns)
2. `002_stripe_columns.sql` - Tranche 1: Payment integration columns
3. `003_v2_hybrid_confirmation.sql` - Tranche 2: Full state machine

## How to Apply Migrations

### Option 1: Supabase Dashboard (Recommended for Manual)

1. Open [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **SQL Editor**
4. Copy the contents of each migration file in order
5. Run each migration separately
6. Verify with the verification query at the end of each file

### Option 2: Supabase CLI

```bash
# Apply all migrations
supabase db push

# Or apply specific migration
supabase db execute --file database/migrations/001_initial_schema.sql
```

## Verification

### Check Current Schema Version

Run this query to verify your database is up to date:

```sql
-- Check columns count
SELECT COUNT(*) as column_count
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'bookings';

-- Expected: 27 columns

-- Check constraints
SELECT COUNT(*) as constraint_count
FROM pg_constraint
WHERE conrelid = 'public.bookings'::regclass;

-- Expected: 4 constraints

-- Check indexes
SELECT COUNT(*) as index_count
FROM pg_indexes
WHERE tablename = 'bookings';

-- Expected: 8 indexes

-- Check RLS policies
SELECT COUNT(*) as policy_count
FROM pg_policies
WHERE tablename = 'bookings';

-- Expected: 3 policies
```

## Schema Version History

| Migration | Description | Columns |
|-----------|-------------|---------|
| 001 | Initial baseline | 11 |
| 002 | Stripe columns | 23 |
| 003 | V2 hybrid confirmation | 27 |

## Rules

### Golden Rule: Never Modify Existing Migration Files

Once a migration file is committed to the repository:
- ❌ Do NOT edit it to fix bugs
- ❌ Do NOT delete it to "start fresh"
- ✅ Do create a NEW migration file for any changes

If you need to fix something, create a new migration (e.g., `004_fix_constraint.sql`).

### Why?

1. **Reproducibility** - Other developers or CI/CD pipelines need to recreate the exact same schema
2. **Audit trail** - Every schema change is documented
3. **Rollback capability** - Can identify exactly what changed and when
4. **Conflict prevention** - Multiple developers can work on different migrations safely

## Creating New Migrations

### Naming Convention

```
{migration_number}_{short_description}.sql
```

Examples:
- `004_add_analytics_tables.sql`
- `005_update_user_permissions.sql`
- `006_fix_booking_constraint.sql`

### Template

```sql
-- ============================================================
-- MIGRATION XXX: TITLE
-- Description of what this migration does
-- ============================================================

-- Section 1: Changes
-- ALTER TABLE ...

-- Section 2: Indexes
-- CREATE INDEX ...

-- Section 3: Data migration
-- UPDATE ...

SELECT '✅ Migration XXX complete' AS status;
```

## Troubleshooting

### Migration Fails with "column already exists"

- Check if migration was already partially applied
- Use `DROP COLUMN IF EXISTS` before `ADD COLUMN`

### Migration Fails with "constraint already exists"

- Check if constraint was already created
- Use `DROP CONSTRAINT IF EXISTS` before `ADD CONSTRAINT`

### RLS Policy Conflicts

- Check existing policies: `SELECT * FROM pg_policies WHERE tablename = 'bookings';`
- Drop conflicting policies before recreating

## Files Reference

- `supabase-schema.sql` - Complete current-state schema (read-only reference)
- `supabase-seed-data.sql` - Initial seed data
- `fix-supabase.sql` - Legacy quick fixes (deprecated, use migrations)

## Support

For questions about migrations, refer to:
- [Supabase Migrations Docs](https://supabase.com/docs/guides/migrations)
- Project Tranche documentation