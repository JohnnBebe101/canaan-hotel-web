/**
 * V4.4 Async Guards - Production Safety Utilities
 *
 * Provides timeout and error handling for async operations to prevent:
 * - Hanging requests (payments, OTA integrations)
 * - Silent API failures (email, booking operations)
 * - Unhandled promise rejections
 */

/**
 * Creates a timeout promise that rejects after the specified milliseconds
 */
function createTimeoutPromise<T>(timeoutMs: number): Promise<T> {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Operation timed out after ${timeoutMs}ms`));
    }, timeoutMs);
  });
}

/**
 * Wraps an async function with a timeout using AbortController
 * Used for fetch operations that support abort signals
 */
export async function withTimeout<T>(
  operation: (signal: AbortSignal) => Promise<T>,
  timeoutMs: number = 8000
): Promise<T> {
  const controller = new AbortController();

  try {
    const result = await Promise.race([
      operation(controller.signal),
      createTimeoutPromise<T>(timeoutMs)
    ]);

    return result;
  } catch (error) {
    controller.abort(); // Clean up signal
    throw error;
  }
}

/**
 * Wraps an async function with error handling and logging
 * Used for operations where failure should be logged but not crash the app
 */
export async function safeAsync<T>(
  operation: () => Promise<T>,
  context: string
): Promise<T | null> {
  try {
    return await operation();
  } catch (error) {
    console.error(`[${context}] Async operation failed:`, error);
    return null;
  }
}

/**
 * Wraps an async function with timeout and error handling
 * Used for critical operations that need both timeout and error resilience
 */
export async function safeAsyncWithTimeout<T>(
  operation: (signal: AbortSignal) => Promise<T>,
  context: string,
  timeoutMs: number = 8000
): Promise<T | null> {
  try {
    return await withTimeout(operation, timeoutMs);
  } catch (error) {
    console.error(`[${context}] Async operation timed out or failed:`, error);
    return null;
  }
}
