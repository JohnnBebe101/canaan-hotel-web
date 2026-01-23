import { describe, it, expect } from 'vitest';
import { validateCredentials } from '../auth';

/**
 * Tests for validateCredentials function
 * 
 * Note: ADMIN_USERNAME and ADMIN_PASSWORD are constants set at module load time
 * from environment variables with defaults of "admin" and "admin".
 * These tests assume the default values unless environment variables are set.
 */
describe('validateCredentials', () => {
  // Test with default credentials (admin/admin)
  // This assumes .env.local doesn't override these, or tests run with defaults
  const defaultUsername = process.env.ADMIN_USERNAME || 'admin';
  const defaultPassword = process.env.ADMIN_PASSWORD || 'admin';

  it('should validate correct credentials with default values', () => {
    expect(validateCredentials(defaultUsername, defaultPassword)).toBe(true);
  });

  it('should reject incorrect username', () => {
    expect(validateCredentials('wronguser', defaultPassword)).toBe(false);
  });

  it('should reject incorrect password', () => {
    expect(validateCredentials(defaultUsername, 'wrongpass')).toBe(false);
  });

  it('should trim whitespace from username', () => {
    expect(validateCredentials(`  ${defaultUsername}  `, defaultPassword)).toBe(true);
    expect(validateCredentials(`\t${defaultUsername}\n`, defaultPassword)).toBe(true);
  });

  it('should trim whitespace from password', () => {
    expect(validateCredentials(defaultUsername, `  ${defaultPassword}  `)).toBe(true);
    expect(validateCredentials(defaultUsername, `\t${defaultPassword}\n`)).toBe(true);
  });

  it('should handle empty strings after trimming', () => {
    expect(validateCredentials('   ', defaultPassword)).toBe(false);
    expect(validateCredentials(defaultUsername, '   ')).toBe(false);
  });

  it('should be case-sensitive', () => {
    if (defaultUsername === 'admin') {
      expect(validateCredentials('Admin', defaultPassword)).toBe(false);
      expect(validateCredentials('ADMIN', defaultPassword)).toBe(false);
    }
    if (defaultPassword === 'admin') {
      expect(validateCredentials(defaultUsername, 'Admin')).toBe(false);
      expect(validateCredentials(defaultUsername, 'ADMIN')).toBe(false);
    }
  });

  it('should reject both incorrect credentials', () => {
    expect(validateCredentials('wronguser', 'wrongpass')).toBe(false);
  });

  it('should handle special characters in credentials', () => {
    // Should reject credentials with special characters if not matching env vars
    expect(validateCredentials('admin!', defaultPassword)).toBe(false);
    expect(validateCredentials(defaultUsername, 'admin@123')).toBe(false);
  });
});
