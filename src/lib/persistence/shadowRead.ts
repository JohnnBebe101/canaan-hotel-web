/**
 * V6.4 Shadow Read Types - Data Consistency Verification
 *
 * TypeScript contracts for shadow reading functionality during database migration.
 * Enables comparison between memory and database state without affecting runtime behavior.
 *
 * NO IMPLEMENTATION - Type contracts only.
 * These types support gradual migration verification and data consistency checks.
 */

/**
 * Shadow Read Result - Comparison between memory and database state
 *
 * Used during V6.4 shadow reads to verify data consistency between
 * in-memory storage and database persistence without affecting application behavior.
 */
export interface ShadowReadResult<T> {
  /** Data from memory (source of truth) */
  memory: T;

  /** Data from database (if available) */
  db?: T;

  /** Whether memory and database values differ */
  mismatch: boolean;
}

/**
 * Shadow Compare Function - Type-safe comparison logic
 *
 * Function type for comparing memory and database representations of the same data.
 * Used in shadow read operations to determine data consistency.
 *
 * @template T The data type being compared
 * @param memory Data from memory storage
 * @param db Data from database (may be undefined if DB read fails)
 * @returns ShadowReadResult with comparison details
 */
export type ShadowCompareFn<T> = (memory: T, db?: T) => ShadowReadResult<T>;