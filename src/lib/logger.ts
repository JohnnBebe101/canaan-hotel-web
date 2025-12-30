/**
 * V4.4 Logging Discipline - Structured Application Logger
 *
 * Production-safe logging utility for operational visibility:
 * - CRM lifecycle tracking
 * - Email dispatch monitoring
 * - API failure diagnostics
 * - Future payment/OTA audit trails
 *
 * Environment-aware: verbose in development, minimal in production
 */

interface LogEntry {
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR';
  context: string;
  message: string;
  data?: Record<string, any>;
}

const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * Core logging function with structured output
 */
function log(level: LogEntry['level'], context: string, message: string, data?: Record<string, any>) {
  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    level,
    context,
    message,
    ...(data && { data })
  };

  // In development: detailed structured logging
  if (isDevelopment) {
    const logMethod = level === 'ERROR' ? console.error :
                     level === 'WARN' ? console.warn :
                     console.log;

    logMethod(`[${entry.timestamp}] ${level} [${context}] ${message}`, data || '');
    return;
  }

  // In production: minimal essential logging only
  if (level === 'ERROR') {
    console.error(`[${entry.timestamp}] ${level} [${context}] ${message}`, data ? JSON.stringify(data) : '');
  }
  // INFO and WARN suppressed in production to reduce noise
}

/**
 * Info-level logging for normal operations
 * Used for: successful operations, lifecycle transitions
 */
export function logInfo(context: string, message: string, data?: Record<string, any>) {
  log('INFO', context, message, data);
}

/**
 * Warning-level logging for potential issues
 * Used for: recoverable failures, validation warnings
 */
export function logWarn(context: string, message: string, data?: Record<string, any>) {
  log('WARN', context, message, data);
}

/**
 * Error-level logging for failures requiring attention
 * Used for: API failures, email dispatch errors, system issues
 */
export function logError(context: string, message: string, data?: Record<string, any>) {
  log('ERROR', context, message, data);
}
