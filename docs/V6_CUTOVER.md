# V6.5 Database Cutover Operations Guide

## Overview

V6.5 implements database cutover for booking read operations. Database becomes primary read source with memory as automatic fallback.

## Changes Made

### Read Path Modification
- `getBooking(id)` now reads from database first when enabled
- Falls back to memory on DB failure or unavailability
- Maintains memory as source of truth for all write operations
- Preserves V6.3 dual-write pattern (memory-first, DB-optional writes)

### Feature Flags
- `DB_READ_PRIMARY_ENABLED`: Controls read path cutover (default: false)
- Requires `DB_PERSISTENCE_ENABLED=true` for operation
- Independent of payment processing flags

### Runtime Guards
- Validates DB_PERSISTENCE_ENABLED before attempting DB reads
- Logs warnings when cutover enabled but persistence disabled
- Never throws fatal errors in production paths
- Comprehensive error logging with safe identifiers

## Enable Cutover

### Prerequisites
- Database persistence layer fully operational
- `DB_PERSISTENCE_ENABLED=true` in environment
- Shadow reading (`DB_SHADOW_READ_ENABLED=true`) recommended for verification

### Steps
1. Set `DB_READ_PRIMARY_ENABLED=true` in environment variables
2. Deploy changes
3. Monitor logs for cutover success/fallback events
4. Verify booking read operations continue normally

### Expected Log Events
- `DB_CUTOVER_SUCCESS`: DB read succeeded
- `DB_CUTOVER_FALLBACK`: DB read failed, using memory
- `DB_CUTOVER_GUARD`: Configuration mismatch warning

## Rollback

### Immediate Rollback
Set `DB_READ_PRIMARY_ENABLED=false` in environment variables and redeploy.

### Effects of Rollback
- All read operations return to memory-only behavior
- No data loss or corruption
- Zero downtime required
- Application behavior identical to pre-V6.5 state

## Safe Limits

### Supported Operations
- Individual booking reads: `getBooking(id)`
- Bulk operations remain memory-only
- Write operations unchanged (dual-write pattern)

### Known Limitations
- No bulk database read operations implemented
- Payment reads remain memory-only
- Room data remains memory-only
- Admin analytics use memory data

### Performance Considerations
- DB read latency may increase response times
- Automatic fallback prevents performance degradation
- Memory operations unchanged in speed

## Non-Goals

### Payments Automation
- No automatic payment processing
- No webhook handling
- No payment status synchronization
- Payment reads remain memory-based

### External Integrations
- No OTA integration automation
- No email provider API integration
- No calendar system synchronization

### Advanced Features
- No database transactions
- No connection pooling configuration
- No query optimization
- No database migration tools

## Monitoring

### Key Metrics
- DB_CUTOVER_SUCCESS log count
- DB_CUTOVER_FALLBACK log count
- Application response times
- Error rates in booking operations

### Alert Conditions
- High DB_CUTOVER_FALLBACK rate (>10%)
- Increased application latency (>2x baseline)
- DB_CUTOVER_GUARD warnings present

## Troubleshooting

### Common Issues
- DB_READ_PRIMARY_ENABLED=true but DB_PERSISTENCE_ENABLED=false
  - Logs: DB_CUTOVER_GUARD warnings
  - Solution: Enable DB_PERSISTENCE_ENABLED or disable DB_READ_PRIMARY_ENABLED

- DB connection failures
  - Logs: DB_CUTOVER_FALLBACK with error details
  - Solution: Check database connectivity, automatic fallback active

### Verification Steps
1. Confirm DB_READ_PRIMARY_ENABLED flag setting
2. Check DB_PERSISTENCE_ENABLED flag setting
3. Review application logs for cutover events
4. Test booking read operations manually