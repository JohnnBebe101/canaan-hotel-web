Plan B/C PR Draft: Incremental Loading, Memoization, and Cache Enhancements with AI Artifact Archival (P1 Fixes)

Overview
- This PR implements Plan B as the primary path to improve runtime performance and stability by introducing incremental loading, memoization, and a TTL-based in-app cache. Plan C remains staged for deeper cache tuning and production-oriented optimizations.
- Non-blocking artifacts (placeholders/images) are explicitly marked for later review and not blocked by this PR.

Scope of changes
- UI: incremental loading and memoization
  - Dynamic import for BookingCard in Hero to reduce initial bundle size.
  - Memoization for RoomCard and Header components to reduce re-renders.
  - TTL-based in-app cache utility introduced for derived data (src/utils/cache.ts).
- Data/UI surface (Plan A bridge): camelCase UI surface with internal snake_case adapter for bookings
  - Booking API surface remains camelCase in the frontend, with a small adapter in BookingStore to map to snake_case storage when needed.
- Components updated to blueprint-inspired styling where applicable:
  - Button.tsx updated to provide rounded-pill visuals.
  - Header.tsx and Footer.tsx updated to align with blueprint aesthetics and spacing.
- Icon rendering fix (Plan A Option A): Tailwind + Iconify integration patch included to fix icons, with Option A configured.
- AI artifacts treatment: moved 17 artifacts to archive and set up for archive-commentary-based cleanup in a follow-up PR.

Non-blocking artifacts (placeholders)
- Placeholder images and folders reviewed; not blocking progress.
- Will be included in future docs/review as needed.

Files touched (highlights)
- src/components/Hero.tsx (dynamic BookingCard)
- src/components/RoomCard.tsx (React.memo)
- src/components/Header.tsx (React.memo)
- src/components/Footer.tsx (blueprint-aligned footer)
- src/components/ui/Button.tsx (rounded-pill and base styles)
- src/utils/cache.ts (TTLCache)
- src/app/api/bookings/route.ts, src/lib/booking-store.ts (Plan A camelCase surface with internal adapter)
- tailwind.config.js (iconify plugin integration)
- PR meta: PR draft content file (this document)
- PR artifact policy: archive/ folder created for AI artifacts

Archival of AI artifacts (Plan A step)
- 17 artifacts moved to archive/ (location: archive/ with a manifest in a future PR)
- Next steps: delete remaining artifacts in a follow-up PR after validation.

Rationale and goals
- Improve performance and stability in the UI without touching backend logic.
- Use Plan B as the primary path to showcase code-splitting, memoization, and lightweight caching to reduce re-renders and memory usage.
- Plan C remains as a follow-up to tune webpack/Next.js caches, instrumentation, and optional client-side caches for ultra-fast UI responsiveness.
- Icon rendering fix (Option A) ensures consistent, scalable SVG/icon usage and reduces the risk of text-based icons.

Testing and QA plan
- Functional: verify booking flow retains behavior (no backend changes).
- UI: visually validate header, hero, room cards, and dynamic loading behaves as expected; confirm icons render, one Reserve button in navbar, and navigation spacing matches blueprint expectations.
- Performance: compare initial render timings before/after dynamic import + memoization; verify no regression in list rendering.
- Accessibility: ensure focus management and aria-labels remain intact with dynamic imports and memoized components.
- Regression: run unit tests (npm test) and build (npm run build) to ensure no breaking changes.

PR details
- Title: Plan B: Incremental Loading + Memoization (P1 Fixes) + Plan C: Cache Enhancements + AI Artifacts Archival (Non-blocking)
- Description: A structured, two-phase upgrade focusing on performance and stability with artifact cleanup; includes an archiving plan for AI artifacts in archive/ and a blueprint-aligned UI polish.
- Risks: minimal UI risk; artifacts archiving may affect history; ensure follow-up PR deletes archived files permanently and updates .gitignore.
- Rollback: revert memoization wrappers and dynamic imports if needed; revert archive changes if necessary (using separate PR).

Commit strategy
- Multiple small commits per patch/tile; a final PR description summarizing Plan B as the primary flow and Plan C as follow-up.

Next steps (you confirmed)
- Create the PR with this content and attach diffs for all touched files.
- Execute Plan B patches (incremental loading + memoization + cache) and the archive move as described.
- After PR approval, proceed with Plan C patches in a follow-up PR to further optimize caching and performance.
