# Implementation Plan - Admin Panel Stabilization & Consistency

This plan outlines the steps required to fix logical bugs, naming inconsistencies, and type redundancies within the Canaan International Hotel Admin Panel.

## Phase 1: Core Type Centralization
**Goal**: Establish `src/lib/models.ts` as the single source of truth for all data interfaces.

- [ ] **Audit `src/lib/models.ts`**: Ensure it exports comprehensive types (`Room`, `Booking`, `Attraction`, `Blog`) from `supabase.ts`.
- [ ] **Refactor Admin Pages**: Remove local interface definitions in the following files and replace them with imports from `@/lib/models`:
    - `src/app/admin/rooms/page.tsx`
    - `src/app/admin/bookings/page.tsx`
    - `src/app/admin/attractions/page.tsx`
    - `src/app/admin/blogs/[id]/page.tsx`

## Phase 2: Data Flow Alignment (CamelCase vs Snake_case)
**Goal**: Synchronize frontend form submission keys with API backend expectations.

- [ ] **Fix Room Creation**: Update `src/app/admin/rooms/new/page.tsx` form state and submission logic to use `price_per_night` and `max_guests` instead of camelCase variants.
- [ ] **Fix Room Editing**: Standardize `src/app/admin/rooms/[id]/page.tsx` to use the same naming convention.
- [ ] **API Validation**: Audit `src/app/api/admin/rooms/route.ts` to ensure it strictly expects and validates these standardized keys.

## Phase 3: Logical Bug Fixes
**Goal**: Correct UI behavior issues identified during the investigation.

- [ ] **Attraction Toggle Logic**: Fix the `toggleActive` and modal dropdown logic in `src/app/admin/attractions/page.tsx` where string values (`'active'`) don't match the state checks (`'is_active'`).
- [ ] **Room Selection Logic**: Refactor `src/app/admin/rooms/[id]/page.tsx` to use `getRoomById` directly from the store instead of fetching the entire list and filtering locally.

## Phase 4: Data Store Unification
**Goal**: Ensure all data modules follow the same "Supabase with Offline Fallback" pattern.

- [ ] **Attraction Store**: Update `src/lib/attraction-store.ts` to integrate Supabase calls (currently it only uses `offlineStorage`).
- [ ] **Booking Store**: Audit `src/lib/booking-store.ts` to ensure it uses the unified `db.ts` or follows the fallback pattern consistently.
- [ ] **Blog Store**: Standardize `src/lib/blog-store.ts` with the same architectural pattern.

## Phase 5: Verification & Cleanup
**Goal**: Confirm stability and type safety.

- [ ] **Type Check**: Run `npx tsc --noEmit` to ensure no lingering property access errors remain.
- [ ] **Production Build**: Run `npm run build` to verify the project is ready for deployment.
- [ ] **Manual Audit**: Test Create/Read/Update/Delete flows for Rooms, Bookings, and Attractions in the browser.
