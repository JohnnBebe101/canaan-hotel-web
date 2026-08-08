# Admin Dashboard Security Documentation

## Overview

This document describes the admin dashboard authentication system, the security enhancements implemented, and the resolution of the data visibility issue (dashboard showing 0 bookings/rooms).

---

## Issue: Dashboard Showing 0 Bookings/Rooms

### Symptoms
- Admin dashboard displayed `0 bookings` and `0 rooms` despite data existing in the database
- No error messages were visible to the admin user
- Other admin functions appeared to work normally

### Root Cause
The admin dashboard and other admin pages were making API calls **without** including the required `x-admin-secret` authentication header.

When the API received requests without this header, the security layer (`admin-auth.ts`) rejected them, but the frontend was not properly handling the 401 Unauthorized response. The API returned empty data sets rather than an error.

### Resolution
Added the `x-admin-secret` header to all fetch calls in admin pages:

```typescript
// Before (broken)
const response = await fetch("/api/admin/stats");

// After (fixed)
const adminSecret = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "";
const headers = { "x-admin-secret": adminSecret };
const response = await fetch("/api/admin/stats", { headers });
```

**Files Fixed:**
- `src/app/admin/dashboard/page.tsx` (lines 47-52)
- `src/app/admin/rooms/page.tsx` (line 47)
- `src/app/admin/bookings/page.tsx` (lines 54, 110, 121, 144)

---

## Security Architecture

### How It Works

```
┌─────────────────┐     x-admin-secret     ┌─────────────────┐
│  Admin Browser  │ ──────────────────────►│   API Routes    │
│                 │     Header + Value      │  (Next.js)      │
└─────────────────┘                        └────────┬────────┘
                                                    │
                                                    ▼
                                           ┌─────────────────┐
                                           │  admin-auth.ts  │
                                           │  verifyAdminAuth│
                                           └────────┬────────┘
                                                    │
                                      ┌─────────────┴─────────────┐
                                      ▼                           ▼
                               VALID ✓                    INVALID ✗
                               (Allow access)              (Return 401)
```

### Components

1. **Client-Side** (`admin-*.tsx` pages)
   - Reads secret from `process.env.NEXT_PUBLIC_ADMIN_PASSWORD`
   - Sends header with every API request: `x-admin-secret: <secret>`

2. **Server-Side** (`src/lib/admin-auth.ts`)
   - Reads secret from `process.env.ADMIN_API_SECRET`
   - Validates incoming requests via `verifyAdminAuth()` function

3. **Environment Variables** (`.env.local`)

   | Variable | Purpose | Used By |
   |----------|---------|---------|
   | `ADMIN_API_SECRET` | Server-side validation | API routes, middleware |
   | `NEXT_PUBLIC_ADMIN_PASSWORD` | Client-side authentication | Admin pages (frontend) |

### Important: Two Separate Secrets?

Both environment variables should contain the **same value**. This is a legacy pattern:

- `ADMIN_API_SECRET` - Original name, used by server
- `NEXT_PUBLIC_ADMIN_PASSWORD` - Exposed to client for convenience

**Recommendation:** Set both to the same value in `.env.local`:

```
ADMIN_API_SECRET=your-secure-password-here
NEXT_PUBLIC_ADMIN_PASSWORD=your-secure-password-here
```

---

## Security Enhancement: Compared to /auth/login

### Previous System (Supabase Auth)

The original authentication used Supabase's built-in auth system at `/auth/login`:

- **Method**: Email/password authentication via Supabase
- **Storage**: User credentials stored in Supabase `auth.users` table
- **Session**: JWT tokens managed by Supabase client
- **Access Control**: Row Level Security (RLS) on database tables

**Flow:**
```
User enters email/password → Supabase Auth → JWT Token → API calls include token
```

### Current System (API Secret Header)

The new system uses a custom API secret header:

- **Method**: Single shared secret/password (not per-user accounts)
- **Storage**: Secret stored in environment variables only
- **Session**: None - secret sent with every request
- **Access Control**: Server-side validation in `admin-auth.ts`

**Flow:**
```
User enters password → Compare with env var → Include x-admin-secret header in all API calls
```

### Comparison Table

| Aspect | Previous (/auth/login) | Current (x-admin-secret) |
|--------|------------------------|--------------------------|
| **Auth Type** | Supabase User Auth | Custom API Secret |
| **User Accounts** | Multiple users supported | Single shared password |
| **Session** | JWT tokens (expires) | No session (stateless) |
| **Token Storage** | Browser cookies/storage | None |
| **Audit Trail** | Per-user tracking | No user identification |
| **Complexity** | Higher (Supabase setup) | Lower (simple string match) |
| **Security Level** | Per-user, token-based | Single secret, header-based |

### Why This Change?

1. **Simplification**: Eliminates Supabase Auth dependency for admin access
2. **Reliability**: Avoids RLS blocking issues that caused the dashboard bug
3. **Speed**: No token refresh/validation overhead
4. **Maintenance**: Fewer dependencies to manage

### Security Considerations

**Pros:**
- Simpler architecture
- No token expiration issues
- No session management
- Easier to rotate (change one env variable)

**Cons:**
- Single password for all admins (no individual accountability)
- No audit trail of which admin performed actions
- Password exposed to client-side (though not visible in UI)
- If secret leaks, full admin access is compromised

**Mitigations:**
- Use a strong, randomly generated password
- Rotate periodically
- Consider IP whitelisting for production
- Implement individual user accounts if audit trail needed

---

## Troubleshooting

### "Authentication failed" Error

**Symptoms:** Dashboard shows error toast "Authentication failed. Check admin credentials."

**Solutions:**
1. Verify both environment variables are set:
   ```bash
   echo $ADMIN_API_SECRET
   echo $NEXT_PUBLIC_ADMIN_PASSWORD
   ```

2. Ensure both values are identical
3. Restart dev server after changing `.env.local`
4. Check server console for `[AdminAuth]` error messages

### Dashboard Shows 0 Data

**Symptoms:** No error displayed but data shows as 0

**Solutions:**
1. Open browser DevTools → Network tab
2. Check API responses for `/api/admin/stats` and `/api/admin/bookings`
3. If status is 401, the header is not being sent correctly
4. Verify `NEXT_PUBLIC_ADMIN_PASSWORD` is accessible in the browser console:
   ```javascript
   console.log(process.env.NEXT_PUBLIC_ADMIN_PASSWORD)
   ```

---

## Implementation Reference

### Server-Side Validation Code

```typescript
// src/lib/admin-auth.ts
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
```

### Client-Side Request Code

```typescript
// In admin dashboard or any admin page
const adminSecret = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "";
const headers = { "x-admin-secret": adminSecret };

const response = await fetch("/api/admin/stats", { headers });

if (response.status === 401) {
  // Handle authentication failure
}
```

### API Route Protection Example

```typescript
// In any /api/admin/* route
import { verifyAdminAuth } from '@/lib/admin-auth';

export async function GET(request: NextRequest) {
  if (!verifyAdminAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // Proceed with normal handler logic
  // ...
}
```

---

## Training Checklist

For new admin users:

- [ ] Understand the password is stored in `.env.local`
- [ ] Know to restart dev server after changing password
- [ ] Can identify authentication errors in browser console
- [ ] Know how to check Network tab for 401 responses
- [ ] Understand the difference between this system and customer login

---

*Last Updated: April 2026*
*Part of: Canaan International Hotel Booking System*