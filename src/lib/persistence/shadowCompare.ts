/**
 * V6.4 Shadow Compare - Memory vs Database Consistency Checker
 *
 * Compares data between memory and database during shadow reading.
 * Detects inconsistencies without affecting application behavior.
 *
 * SAFETY FIRST:
 * - Read-only comparison logic
 * - Never throws or blocks execution
 * - Logs only when mismatches detected
 * - No side effects on data or application state
 */

import { ShadowReadResult } from './shadowRead';
import { logError } from '../logger';

/**
 * Compare memory data against database data
 *
 * Performs shallow comparison of data structures to detect inconsistencies
 * between memory and database state during shadow reading.
 *
 * @template T The data type being compared
 * @param memory Data from memory (source of truth)
 * @param db Data from database (null if DB unavailable or not found)
 * @returns ShadowReadResult with comparison details
 */
export function compareMemoryVsDB<T>(memory: T, db: T | null): ShadowReadResult<T> {
  // If no DB data available, no comparison possible
  if (db === null) {
    return {
      memory,
      db: undefined,
      mismatch: false,
    };
  }

  // Perform shallow comparison of top-level fields
  const memoryKeys = Object.keys(memory as any);
  const dbKeys = Object.keys(db as any);

  // Check if different number of fields
  if (memoryKeys.length !== dbKeys.length) {
    logMismatch('DIFFERENT_FIELD_COUNT', memory, db, {
      memoryFieldCount: memoryKeys.length,
      dbFieldCount: dbKeys.length,
    });
    return {
      memory,
      db,
      mismatch: true,
    };
  }

  // Check each field for shallow equality
  for (const key of memoryKeys) {
    const memoryValue = (memory as any)[key];
    const dbValue = (db as any)[key];

    // Use loose equality for comparison (handles undefined/null differences)
    if (memoryValue != dbValue) {
      logMismatch('FIELD_VALUE_MISMATCH', memory, db, {
        field: key,
        memoryValue,
        dbValue,
      });
      return {
        memory,
        db,
        mismatch: true,
      };
    }
  }

  // All fields match
  return {
    memory,
    db,
    mismatch: false,
  };
}

/**
 * Log mismatch details for debugging
 *
 * @param reason Reason for mismatch detection
 * @param memory Memory data
 * @param db Database data
 * @param details Additional context about the mismatch
 */
function logMismatch(
  reason: string,
  memory: any,
  db: any,
  details: Record<string, any>
): void {
  // Extract safe identifiers for logging (avoid sensitive data)
  const safeContext = {
    reason,
    memoryId: extractSafeId(memory),
    dbId: extractSafeId(db),
    ...details,
  };

  logError('DB_SHADOW_MISMATCH_DETECTED', 'Memory vs Database data mismatch detected', safeContext);
}

/**
 * Extract safe identifier from data object for logging
 *
 * @param data Data object to extract ID from
 * @returns Safe identifier string or 'unknown'
 */
function extractSafeId(data: any): string {
  // Try common ID fields
  const idFields = ['id', '_id', 'bookingId', 'paymentId'];

  for (const field of idFields) {
    if (data && typeof data === 'object' && data[field]) {
      return String(data[field]);
    }
  }

  return 'unknown';
}