import { NextRequest } from 'next/server';

const ADMIN_API_SECRET = process.env.ADMIN_API_SECRET;

export function verifyAdminAuth(request: NextRequest): boolean {
  if (!ADMIN_API_SECRET) {
    console.error('[AdminAuth] ADMIN_API_SECRET not configured');
    return false;
  }

  const authHeader = request.headers.get('x-admin-secret');
  return authHeader === ADMIN_API_SECRET;
}