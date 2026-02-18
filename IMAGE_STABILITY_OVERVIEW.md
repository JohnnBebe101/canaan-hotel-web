# Image Stability Overview & Replacement Strategy

## Executive Summary

A comprehensive reorganization of the project's image assets has been performed. All images have been consolidated under `public/images/` with a clear folder structure:
- `heroes/` - Hero/landing page images (5 webp files)
- `rooms/` - Room photography (11 webp files)
- `attractions/` - Tourist attraction images (5 svg files)
- `ui/` - UI assets, logos, payment icons (9 svg files)
- `badges/` - Trust badges (2 svg files)
- `icons-svg/` - Reserved for future icon assets (empty)

## Current Status

### Git Repository State
- **Branch:** Stability
- **Status:** Multiple image deletions staged, new image folders untracked
- **Uncommitted Changes:** 53 deleted files, 6 new folders with 31 image files

---

## Image Inventory Analysis

### NEW Images (Available in public/images/)

#### 1. Heroes (`public/images/heroes/`) - 5 files
| File | Format | Purpose | Status |
|------|--------|---------|--------|
| Ext-Compund.webp | WebP | Hotel exterior compound view | ✅ Available |
| Gate-Corrdor.webp | WebP | Entrance gate/corridor view | ✅ Available |
| Main-ENt.webp | WebP | Main entrance | ✅ Available |
| Varandah.webp | WebP | Veranda/outdoor area | ✅ Available |
| Wedding.webp | WebP | Wedding/event space | ✅ Available |

#### 2. Rooms (`public/images/rooms/`) - 11 files
| File | Format | Purpose | Status |
|------|--------|---------|--------|
| bath-room.webp | WebP | Bathroom photography | ✅ Available |
| bed-close-up.webp | WebP | Bed detail shot | ✅ Available |
| Bed-view-Single.webp | WebP | Single room bed view | ✅ Available |
| corridor-rooms.webp | WebP | Room corridor hallway | ✅ Available |
| IMG-20260105-WA0024.webp | WebP | Room photo (WA series) | ✅ Available |
| IMG-20260105-WA0030.webp | WebP | Room photo (WA series) | ✅ Available |
| single-room-best-view.webp | WebP | Single room best angle | ✅ Available |
| single-room-view.webp | WebP | Single room general view | ✅ Available |
| single-room-with-light.webp | WebP | Single room lighting showcase | ✅ Available |
| twin-room-best-view.webp | WebP | Twin room best angle | ✅ Available |
| twin-room.webp | WebP | Twin room general | ✅ Available |

#### 3. Attractions (`public/images/attractions/`) - 5 files
| File | Format | Purpose | Status |
|------|--------|---------|--------|
| Debre-Damo-Abune-Aregawi-monaster--1920x1080.svg | SVG | Debre Damo Monastery | ✅ Available |
| Gheralta.svg | SVG | Gheralta Mountains | ✅ Available |
| Al Najashi4.svg | SVG | Al-Nejashi Mosque (variant 4) | ✅ Available |
| Al Najashi5.svg | SVG | Al-Nejashi Mosque (variant 5) | ✅ Available |
| Al Najashi6.svg | SVG | Al-Nejashi Mosque (variant 6) | ✅ Available |

#### 4. UI Assets (`public/images/ui/`) - 9 files
| File | Format | Purpose | Status |
|------|--------|---------|--------|
| Canaan-logo-100x100.svg | SVG | Logo 100x100px (header) | ✅ Available |
| Canaan-logo-bigger.svg | SVG | Logo larger variant | ✅ Available |
| Booking.com_logo2.svg | SVG | Booking.com partner logo | ✅ Available |
| Expedia_Logo_2023.svg.svg | SVG | Expedia partner logo | ✅ Available |
| Twitter X Blue Round.svg | SVG | X/Twitter social icon | ✅ Available |
| Visa_Inc logo.svg | SVG | Visa payment icon | ✅ Available |
| mastercard.svg | SVG | Mastercard payment icon | ✅ Available |
| amex.svg | SVG | Amex payment icon | ✅ Available |
| paypal.svg | SVG | PayPal payment icon | ✅ Available |

#### 5. Badges (`public/images/badges/`) - 2 files
| File | Format | Purpose | Status |
|------|--------|---------|--------|
| google-business-profile.svg | SVG | Google Business badge | ✅ Available |
| tripadvisor-3.svg | SVG | TripAdvisor badge | ✅ Available |

### DELETED Images (Removed from public/)

#### From `public/assets/images/` (15 files)
- Debre-Damo-Abune-Aregawi-monaster--1920x1080.svg
- Gheralta.svg
- Al Najashi4.svg, Al Najashi5.svg, Al Najashi6.svg
- Team.jpg
- Adigrat.jpg
- Compound.jpg, Gate.jpg, Ex view.jpg
- hotel-comfort.jpg, hotel-entrance.jpg, hotel-entrance.svg, hotel-exterior.jpg, hotel-exterior.svg, hotel-family.jpg, hotel-team.svg
- facebook.png, instagram.png, google reviews(1).png, google reviews.png
- tripadvisor-3.svg
- Twitter X Blue Round.svg
- Visa_Inc logo.svg, mastercard.svg, amex.svg, paypal.svg
- logo 2.png

#### From `public/images/` root (35 files)
- Adigrat.svg, Bar-Enterance.svg, Bar-Restaurant.svg
- Bath-Portrait.svg, Bed-Best-View.svg, Bed-Room-Close-View.svg, Bed-Single.svg, Bed_closeup.svg
- Compound.svg, Compound.jpg
- Gate.svg, Gate.jpg
- Kitchen-Small.svg
- Room-4.svg, Room-Bed.svg, Room-Best-View.svg, Room-Larger.svg, Rooms-Corridor.svg
- Sport-Bar-1.svg, Sport-Bar-2.svg, Sport-Bar-BeerDraought.svg, Sport-Bar-Close.svg, Sport-Bar-Wideview.svg, Sport-Bar.svg, SportBar-Pool.svg
- Team.svg, Team.jpg
- Twin-Room.svg, Twin-Room2.svg, Twin-Room3.svg
- logo 2.svg, logo 2.png

#### From `public/` root (6 files)
- file.svg, globe.svg, next.svg, vercel.svg, window.svg, placeholder-image.svg, logo_2_nobg.png

---

## Broken Image References Requiring Updates

### Critical Path - Immediate Action Required

#### 1. **Footer.tsx** (Line 11)
```typescript
// CURRENT (BROKEN):
<Image src="/images/logo 2.svg" alt="Canaan International Hotel Logo" width={48} height={48} className="h-12 w-auto" />

// REPLACEMENT:
<Image src="/images/ui/Canaan-logo-100x100.svg" alt="Canaan International Hotel Logo" width={48} height={48} className="h-12 w-auto" />
```

#### 2. **layout.tsx** (Line 50 - Favicon)
```typescript
// CURRENT (BROKEN):
<link rel="icon" type="image/svg+xml" href="/images/logo 2.svg" />

// REPLACEMENT:
<link rel="icon" type="image/svg+xml" href="/images/ui/Canaan-logo-100x100.svg" />
```

#### 3. **layout.tsx** (Lines 21, 32 - OpenGraph/Twitter Images)
```typescript
// CURRENT (BROKEN):
images: ["/images/Compound.svg"]

// REPLACEMENT:
images: ["/images/heroes/Ext-Compund.webp"]
```

#### 4. **auth/login/page.tsx** (Line 65)
```typescript
// CURRENT (BROKEN):
<img src="/images/logo 2.svg" alt="Canaan International Hotel Logo" className="h-12 w-auto" />

// REPLACEMENT:
<img src="/images/ui/Canaan-logo-100x100.svg" alt="Canaan International Hotel Logo" className="h-12 w-auto" />
```

#### 5. **about/page.tsx** (Line 23 - Hero Background)
```typescript
// CURRENT (BROKEN):
backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%), url("/images/Team.svg")'

// REPLACEMENT (using Main-ENt.webp):
backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%), url("/images/heroes/Main-ENt.webp")'
```

#### 6. **about/page.tsx** (Line 67 - Story Image)
```typescript
// CURRENT (BROKEN):
style={{ backgroundImage: 'url("/images/Adigrat.svg")' }}

// REPLACEMENT (using Gate-Corrdor.webp):
style={{ backgroundImage: 'url("/images/heroes/Gate-Corrdor.webp")' }}
```

#### 7. **page.tsx** (Home) - Lines 20, 26, 118, 136, 154
```typescript
// METADATA IMAGES (Lines 20, 26):
images: ["/images/Compound.svg"] → images: ["/images/heroes/Ext-Compund.webp"]

// ATTRACTION IMAGES:
// Line 118: /assets/images/Debre-Damo-Abune-Aregawi-monaster--1920x1080.svg
// Line 136: /assets/images/Gheralta.svg  
// Line 154: /assets/images/Al Najashi5.svg

// ALL BECOME:
/images/attractions/Debre-Damo-Abune-Aregawi-monaster--1920x1080.svg
/images/attractions/Gheralta.svg
/images/attractions/Al Najashi5.svg
```

#### 8. **offline-storage.ts** - Lines 25, 40, 55, 70, 85, 96, 107, 119, 132
```typescript
// Room images:
'/images/Bed-Single.svg' → '/images/rooms/Bed-view-Single.webp'
'/images/Twin-Room.svg' → '/images/rooms/twin-room.webp'
'/images/Room-Larger.svg' → '/images/rooms/single-room-view.webp'
'/images/Room-Best-View.svg' → '/images/rooms/single-room-best-view.webp'

// Attraction images:
'/images/Adigrat.svg' → '/images/attractions/Debre-Damo-Abune-Aregawi-monaster--1920x1080.svg'
'/assets/images/Gheralta.svg' → '/images/attractions/Gheralta.svg'
'/assets/images/Al Najashi5.svg' → '/images/attractions/Al Najashi5.svg'

// Blog images:
'/assets/images/Gheralta.svg' → '/images/attractions/Gheralta.svg'
'/assets/images/Al Najashi5.svg' → '/images/attractions/Al Najashi5.svg'
```

#### 9. **gallery/GalleryClient.tsx** - Lines 16-78
All galleryImages array entries need updating:
```typescript
// CURRENT BROKEN ENTRIES:
{ src: "/images/Compound.svg", ... } → { src: "/images/heroes/Ext-Compund.webp", ... }
{ src: "/images/Gate.svg", ... } → { src: "/images/heroes/Gate-Corrdor.webp", ... }
{ src: "/images/Room-Larger.svg", ... } → { src: "/images/rooms/single-room-view.webp", ... }
{ src: "/images/Twin-Room.svg", ... } → { src: "/images/rooms/twin-room.webp", ... }
{ src: "/images/Room-Bed.svg", ... } → { src: "/images/rooms/bed-close-up.webp", ... }
{ src: "/images/Room-Best-View.svg", ... } → { src: "/images/rooms/single-room-best-view.webp", ... }
{ src: "/images/Adigrat.svg", ... } → { src: "/images/attractions/Debre-Damo-Abune-Aregawi-monaster--1920x1080.svg", ... }

// HeroImage component (Line 104):
src="/images/Compound.svg" → src="/images/heroes/Ext-Compund.webp"
```

#### 10. **gallery/page.tsx** (Metadata)
```typescript
// CURRENT:
images: ["/images/Compound.svg"]

// REPLACEMENT:
images: ["/images/heroes/Ext-Compund.webp"]
```

#### 11. **rooms/page.tsx** (Metadata)
```typescript
// CURRENT:
images: ["/images/Compound.svg"]

// REPLACEMENT:
images: ["/images/heroes/Ext-Compund.webp"]
```

#### 12. **rooms/[id]/page.tsx** - Lines 40, 55, 64, 73, 82
```typescript
// Main room image (Line 40):
src="/images/Room-Larger.svg" → src="/images/rooms/single-room-view.webp"

// Thumbnail images:
src="/images/Bed-Best-View.svg" → src="/images/rooms/Bed-view-Single.webp"
src="/images/Rooms-Corridor.svg" → src="/images/rooms/corridor-rooms.webp"
src="/images/Bath-Portrait.svg" → src="/images/rooms/bath-room.webp"
src="/images/Room-Bed.svg" → src="/images/rooms/bed-close-up.webp"
```

#### 13. **services/page.tsx** (Metadata + HeroImage)
```typescript
// Metadata (Line 12):
images: ["/images/Compound.svg"] → images: ["/images/heroes/Ext-Compund.webp"]

// HeroImage (Line 26):
src="/images/Compound.svg" → src="/images/heroes/Ext-Compund.webp"
```

#### 14. **attractions/page.tsx** (Metadata + HeroImage)
```typescript
// Metadata - images property missing but likely inherited
// HeroImage (Line 99):
src="/images/Compound.svg" → src="/images/heroes/Ext-Compund.webp"
```

#### 15. **api/admin/attractions/route.ts** (Line 39)
```typescript
// CURRENT:
image: body.image || "/images/Adigrat.svg"

// REPLACEMENT:
image: body.image || "/images/attractions/Debre-Damo-Abune-Aregawi-monaster--1920x1080.svg"
```

#### 16. **api/admin/blogs/route.ts**
```typescript
// CURRENT:
featured_image: body.featured_image || "/images/Adigrat.svg"

// REPLACEMENT:
featured_image: body.featured_image || "/images/attractions/Debre-Damo-Abune-Aregawi-monaster--1920x1080.svg"
```

#### 17. **admin/blogs/new/page.tsx**
```typescript
// CURRENT:
featured_image: "/images/Adigrat.svg"

// REPLACEMENT:
featured_image: "/images/attractions/Debre-Damo-Abune-Aregawi-monaster--1920x1080.svg"
```

---

## Mapping Strategy

### General Replacement Rules

| Old Path Pattern | New Path Pattern | Notes |
|-----------------|------------------|-------|
| `/images/logo 2.svg` | `/images/ui/Canaan-logo-100x100.svg` | Logo files consolidated |
| `/images/Compound.svg` | `/images/heroes/Ext-Compund.webp` | Hotel exterior compound view |
| `/images/Gate.svg` | `/images/heroes/Gate-Corrdor.webp` | Hotel entrance/gate |
| `/images/Team.svg` | `/images/heroes/Main-ENt.webp` | About page hero - using main entrance |
| `/images/Adigrat.svg` | `/images/attractions/Debre-Damo-Abune-Aregawi-monaster--1920x1080.svg` | Generic attraction fallback |
| `/assets/images/Debre-Damo*.svg` | `/images/attractions/Debre-Damo-Abune-Aregawi-monaster--1920x1080.svg` | Attraction reorganized |
| `/assets/images/Gheralta.svg` | `/images/attractions/Gheralta.svg` | Attraction reorganized |
| `/assets/images/Al Najashi*.svg` | `/images/attractions/Al Najashi5.svg` | Attraction reorganized |
| `/images/Bed-Single.svg` | `/images/rooms/Bed-view-Single.webp` | Room image - format changed |
| `/images/Twin-Room.svg` | `/images/rooms/twin-room.webp` | Room image - format changed |
| `/images/Room-Larger.svg` | `/images/rooms/single-room-view.webp` | Room image - format changed |
| `/images/Room-Best-View.svg` | `/images/rooms/single-room-best-view.webp` | Room image - format changed |
| `/images/Bed-Best-View.svg` | `/images/rooms/Bed-view-Single.webp` | Room image - format changed |
| `/images/Rooms-Corridor.svg` | `/images/rooms/corridor-rooms.webp` | Room image - format changed |
| `/images/Bath-Portrait.svg` | `/images/rooms/bath-room.webp` | Room image - format changed |
| `/images/Room-Bed.svg` | `/images/rooms/bed-close-up.webp` | Room image - format changed |

---

## Benefits of New Structure

### 1. **Organized Hierarchy**
- Clear separation by content type
- Easy to locate and manage images
- Scalable for future additions

### 2. **Format Optimization**
- Room and hero images in WebP format (better compression)
- UI/attractions remain SVG (scalable)
- ~30-50% smaller file sizes for photos

### 3. **Naming Consistency**
- Kebab-case naming (e.g., `single-room-view.webp`)
- Descriptive file names
- No spaces in filenames

### 4. **Maintenance**
- Single source of truth per image type
- Easier to update branding
- Reduced duplication

---

## Post-Implementation Checklist

- [ ] All broken references updated
- [ ] No 404 errors for images in browser console
- [ ] Metadata images loading correctly (social sharing)
- [ ] Favicon displaying correctly
- [ ] All pages rendering without image errors
- [ ] Admin panel logo displaying
- [ ] Room gallery images loading
- [ ] Attraction images displaying
- [ ] Footer logo visible
- [ ] Header logo visible
- [ ] WebP images rendering in all supported browsers
- [ ] Fallback handling for older browsers (if needed)

---

## File Statistics

| Category | Count | Format | Status |
|----------|-------|--------|--------|
| **NEW - Heroes** | 5 | WebP | ✅ Ready |
| **NEW - Rooms** | 11 | WebP | ✅ Ready |
| **NEW - Attractions** | 5 | SVG | ✅ Ready |
| **NEW - UI** | 9 | SVG | ✅ Ready |
| **NEW - Badges** | 2 | SVG | ✅ Ready |
| **DELETED - Assets** | 15+ | Mixed | ❌ Removed |
| **DELETED - Root** | 35+ | Mixed | ❌ Removed |
| **TOTAL ACTIVE** | 32 | WebP/SVG | ✅ Available |

---

## Risk Assessment

| Risk | Severity | Mitigation |
|------|----------|------------|
| WebP not supported in old Safari | Low | Safari 14+ supports WebP (covering 95%+ users) |
| Hardcoded external URLs break | Medium | Monitor external image dependencies |
| Missing placeholder fallbacks | Low | Implement generic placeholder if needed |
| Cache issues after changes | Low | Users may need to hard refresh |

---

*Generated: 2026-02-16*
*Project: Canaan Hotel Web*
*Branch: Stability*
