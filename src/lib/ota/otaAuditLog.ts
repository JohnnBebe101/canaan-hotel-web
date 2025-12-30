import { OTASyncResult } from "./otaTypes";

/**
 * OTA Sync Audit Log
 *
 * In-memory audit trail for OTA synchronization operations.
 * Provides visibility into sync attempts and results.
 */

// In-memory audit log (resets on app restart)
const otaSyncLog: OTASyncResult[] = [];

/**
 * Record OTA Sync Result
 *
 * Adds a sync result to the audit log for visibility.
 *
 * @param result The sync operation result to record
 */
export function recordOTASync(result: OTASyncResult): void {
  otaSyncLog.push(result);
}

/**
 * Get OTA Sync Log
 *
 * Returns all recorded sync operations for audit purposes.
 *
 * @returns Array of all OTA sync results
 */
export function getOTASyncLog(): OTASyncResult[] {
  return [...otaSyncLog]; // Return copy to prevent external mutations
}
