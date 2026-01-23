# Repository Wiki: Design System & Visual Language Guide

## Overview
This document serves as the **authoritative reference guide** for the Canaan International Hotel design system. It maps the legacy HTML/CSS designs to the Next.js implementation and defines the Visual Language for all future development including Admin, CRM, and Dashboard modules.

**Source of Truth**: HTML demo files located in `ui-demo/` and `html_demo_pages/`

---

# VISUAL LANGUAGE SPECIFICATION

## 1. Color Palette

### 1.1 Primary Brand Colors

| Token | Hex Value | Tailwind Class | Usage Context | Semantic Meaning |
|-------|-----------|----------------|---------------|------------------|
| Primary | `#f97316` | `bg-primary`, `text-primary` | CTAs, active states, brand highlights, focus rings | Action, energy, warmth |
| Primary Muted | `#f97316/10` | `bg-primary/10`, `bg-primary/20` | Active nav backgrounds, hover states | Subtle brand presence |

### 1.2 Background Colors

| Token | Hex Value | Light Mode | Dark Mode | Usage Context |
|-------|-----------|------------|-----------|---------------|
| Background Light | `#f8f8f5` | `bg-background-light` | - | Main page background, form inputs |
| Background Dark | `#181611` | - | `dark:bg-background-dark` | Dark mode page background |
| Surface Light | `#ffffff` | `bg-white` | `dark:bg-background-dark/50` | Cards, panels, modals |
| Surface Elevated | `#ffffff` | `bg-white` | `dark:bg-background-light/5` | Elevated cards, feature sections |

### 1.3 Text Colors

| Token | Hex Value | Light Mode | Dark Mode | Usage Context |
|-------|-----------|------------|-----------|---------------|
| Text Primary | `#172554` | `text-text-primary` | `dark:text-background-light` | Headings, primary content |
| Text Secondary | `#64748b` | `text-text-secondary` | `dark:text-text-secondary/90` | Labels, descriptions, metadata |
| Text Muted | `#64748b/60` | `text-text-secondary/60` | `dark:text-text-secondary/50` | Placeholder text, disabled |

### 1.4 Border Colors

| Token | Hex Value | Light Mode | Dark Mode | Usage Context |
|-------|-----------|------------|-----------|---------------|
| Border Default | `#e2e8f0` | `border-border-color` | `dark:border-text-secondary/20` | Card borders, dividers |
| Border Strong | `#e2e8f0` | `border-border-color` | `dark:border-text-secondary/30` | Form inputs, panels |
| Border Subtle | `#e2e8f0/50` | `border-gray-200` | `dark:border-text-secondary/10` | Table dividers, subtle separations |

### 1.5 Semantic Status Colors

| Status | Background | Text | Icon Color | Usage |
|--------|------------|------|------------|-------|
| Success | `bg-green-100` | `text-green-800` | `text-green-600` | Confirmed, Active, Completed, Operational |
| Info | `bg-blue-100` | `text-blue-800` | `text-blue-600` | New, Informational, Tier indicators |
| Warning | `bg-yellow-100` | `text-yellow-800` | `text-yellow-600` | Pending, Processing, Awaiting |
| Error | `bg-red-100` | `text-red-800` | `text-red-600` | Failed, Cancelled, AI indicators |
| Purple | `bg-purple-100` | `text-purple-800` | `text-purple-600` | VIP, Invoiced, Premium features |
| Orange | `bg-orange-100` | `text-orange-800` | `text-orange-600` | A/B Test, Dynamic, Delivery rates |
| Gray | `bg-gray-100` | `text-gray-800` | `text-gray-600` | Closed, Inactive, Neutral |
| Amber | `bg-amber-500` | `text-white` | - | Demo buttons, special actions |

### 1.6 Gradient Backgrounds (Feature Cards)

```css
/* CRM/Dashboard Feature Cards */
bg-gradient-to-br from-blue-50 to-blue-100    /* Guest Database */
bg-gradient-to-br from-yellow-50 to-yellow-100 /* Loyalty Program */
bg-gradient-to-br from-purple-50 to-purple-100 /* Analytics */
bg-gradient-to-br from-green-50 to-green-100   /* Campaigns */
```

---

## 2. Spacing System

### 2.1 Base Unit
The spacing system uses Tailwind's default 4px base unit.

### 2.2 Padding Scale

| Token | Value | Tailwind | Usage Context |
|-------|-------|----------|---------------|
| xs | 4px | `p-1` | Tight internal spacing |
| sm | 8px | `p-2` | Badge padding, compact elements |
| md | 12px | `p-3` | List item padding, small cards |
| base | 16px | `p-4` | Standard card padding, sections |
| lg | 20px | `p-5` | Feature cards, room cards |
| xl | 24px | `p-6` | Dashboard cards, panel sections |
| 2xl | 32px | `p-8` | Hero sections, major containers |

### 2.3 Directional Padding Patterns

```css
/* Horizontal */
px-2  /* 8px - Badges */
px-3  /* 12px - Buttons small, inputs */
px-4  /* 16px - Standard buttons, sections */
px-5  /* 20px - Large buttons */
px-6  /* 24px - Table cells, panels */

/* Vertical */
py-1  /* 4px - Badges */
py-2  /* 8px - Buttons, form elements */
py-3  /* 12px - Large buttons */
py-4  /* 16px - Table cells, sections */
```

### 2.4 Margin Scale

| Token | Value | Tailwind | Usage Context |
|-------|-------|----------|---------------|
| xs | 4px | `m-1`, `mt-1` | Tight between elements |
| sm | 8px | `m-2`, `mt-2` | Badge gaps, small spacing |
| md | 12px | `m-3`, `mt-3` | Button groups spacing |
| base | 16px | `m-4`, `mb-4` | Standard component spacing |
| lg | 24px | `m-6`, `mb-6` | Section spacing |
| xl | 32px | `m-8`, `mb-8` | Major section breaks |
| 2xl | 48px | `m-12`, `mb-12` | Page section separations |

### 2.5 Gap System (Flexbox/Grid)

| Token | Value | Tailwind | Usage Context |
|-------|-------|----------|---------------|
| xs | 4px | `gap-1` | Tight inline elements |
| sm | 8px | `gap-2` | Button groups, badge rows |
| md | 12px | `gap-3` | Nav items, card headers |
| base | 16px | `gap-4` | Form fields, grid items |
| lg | 24px | `gap-6` | Card grids, dashboard panels |
| xl | 32px | `gap-8` | Section grids, feature areas |

### 2.6 Section Spacing Pattern

```css
/* Public Page Sections */
px-4 py-16 sm:px-6 lg:px-8 lg:py-24

/* Admin Main Content */
p-6

/* Card Internal Structure */
p-5 (room cards)
p-6 (dashboard cards, panels)
```

---

## 3. Typography Hierarchy

### 3.1 Font Family

```javascript
// tailwind.config.js
fontFamily: {
  display: ['Plus Jakarta Sans', 'Noto Sans', 'sans-serif']
}
```

**Google Fonts Import**:
```html
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700;800&display=swap" rel="stylesheet"/>
```

### 3.2 Font Weight Scale

| Weight | Tailwind | Usage Context |
|--------|----------|---------------|
| 400 | `font-normal` | Body text, descriptions |
| 500 | `font-medium` | Labels, nav items, subtle emphasis |
| 700 | `font-bold` | Headings, buttons, important text |
| 800 | `font-black` | Hero headlines only |

### 3.3 Font Size Hierarchy

| Level | Size | Tailwind | Line Height | Usage |
|-------|------|----------|-------------|-------|
| Display | 3.75rem (60px) | `text-6xl` | `leading-tight` | Hero headline (desktop) |
| H1 | 2.25rem (36px) | `text-4xl` | `leading-tight` | Hero headline (mobile) |
| H2 | 1.875rem (30px) | `text-3xl` | `tracking-tight` | Section titles |
| H3 | 1.5rem (24px) | `text-2xl` | `tracking-tight` | Card section headers |
| H4 | 1.25rem (20px) | `text-xl` | `leading-normal` | Panel titles, page headers |
| H5 | 1.125rem (18px) | `text-lg` | `leading-normal` | Card titles, subsection headers |
| Body | 1rem (16px) | `text-base` | `leading-normal` | Primary body text |
| Small | 0.875rem (14px) | `text-sm` | `leading-normal` | Secondary text, nav, buttons |
| XSmall | 0.75rem (12px) | `text-xs` | `leading-normal` | Badges, metadata, labels |

### 3.4 Typography Patterns

```css
/* Hero Headline */
text-4xl font-black leading-tight tracking-tighter md:text-6xl

/* Section Title */
text-3xl font-bold tracking-tight text-text-primary dark:text-background-light

/* Card Title */
text-lg font-bold leading-normal text-text-primary dark:text-background-light

/* Body Text */
text-sm font-normal leading-normal text-text-secondary dark:text-text-secondary/90

/* Label */
text-sm font-medium text-text-secondary
```

---

## 4. Border Radius System

### 4.1 Standard Radius Values

| Token | Value | Tailwind | Usage Context |
|-------|-------|----------|---------------|
| Default | 0.25rem (4px) | `rounded` | Form inputs, small elements |
| Large | 0.5rem (8px) | `rounded-lg` | Buttons, cards, panels |
| XL | 0.75rem (12px) | `rounded-xl` | Feature cards, hero sections |
| Full | 9999px | `rounded-full` | Circular elements, badges |

### 4.2 Component-Specific Radius

```css
/* Buttons */
rounded-lg  /* Standard buttons */
rounded-full /* Round icon buttons */

/* Cards */
rounded-xl  /* Feature cards */
rounded-lg  /* Dashboard cards */

/* Forms */
rounded-lg  /* Input fields, selects */
```

---

## 5. Shadow System

### 5.1 Elevation Levels

| Level | Tailwind | Usage Context |
|-------|----------|---------------|
| None | (default) | Flat surfaces |
| Small | `shadow-sm` | Subtle depth |
| Medium | `shadow` | Standard elevation |
| Large | `shadow-lg` | Prominent elements |
| XL | `shadow-xl` | Modal dialogs |

### 5.2 Interactive Shadows

```css
/* Hover states */
hover:shadow-lg

/* Focus states */
focus:shadow-md

/* Active states */
active:shadow-sm
```

---

## 6. Responsive Design System

### 6.1 Breakpoint Definitions

| Breakpoint | Value | Tailwind Prefix | Usage |
|------------|-------|-----------------|-------|
| Mobile | < 640px | (default) | Base mobile-first |
| Small | ≥ 640px | `sm:` | Tablet improvements |
| Medium | ≥ 768px | `md:` | Desktop navigation |
| Large | ≥ 1024px | `lg:` | Full desktop layouts |
| XL | ≥ 1280px | `xl:` | Maximum container widths |

### 6.2 Responsive Patterns

```css
/* Container Widths */
max-w-7xl  /* Main content container */
w-full     /* Full width elements */

/* Grid Columns */
grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  /* Responsive grids */

/* Padding */
px-4 sm:px-6 lg:px-8  /* Responsive horizontal padding */

/* Typography */
text-4xl md:text-6xl  /* Responsive font sizes */
```

---

## 7. Interactive States

### 7.1 Button States

```css
/* Default */
bg-primary text-white rounded-lg px-4 py-2

/* Hover */
hover:opacity-90 hover:bg-opacity-90

/* Focus */
focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2

/* Disabled */
opacity-50 cursor-not-allowed
```

### 7.2 Link States

```css
/* Default */
text-text-primary hover:text-primary

/* Active */
text-primary font-bold

/* Transitions */
transition-colors duration-200
```

### 7.3 Card States

```css
/* Default */
bg-white border border-border-color

/* Hover */
hover:shadow-lg hover:border-text-secondary/20

/* Dark Mode */
dark:bg-background-dark/50 dark:border-text-secondary/10
```

---

## 8. Demo Mode Indicators

### 8.1 Status Badges

```css
/* Live Status */
inline-block px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium

/* Tier Level */
inline-block px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium

/* Warning */
inline-block px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-medium

/* Inactive */
inline-block px-2 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-medium
```

### 8.2 Demo Buttons

```css
/* Action Buttons */
px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm

/* Large Demo Actions */
px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-white
```

---

## 9. Image Assets & Photography

### 9.1 Available Images (html_demo_pages/)

| Image | File | Dimensions | Usage Context |
|-------|------|------------|---------------|
| Hero Background | `Compound.jpg` | Landscape | Home page hero |
| Services Hero | `Gate.jpg` | Landscape | Services section |
| Historical | `Adigrat.jpg` | Landscape | About Us |
| Team Photo | `Team.jpg` | Portrait | Staff/team |
| Logo | `logo 2.png` | Square | Brand identity |

### 9.2 Image Usage Patterns

```css
/* Hero Sections */
bg-cover bg-center bg-no-repeat

/* Content Cards */
aspect-video bg-cover rounded-t-xl

/* Gallery Grids */
aspect-square bg-cover rounded-xl

/* Gradient Overlays */
linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%)
```

---

## 10. Form Element Standards

### 10.1 Input Fields

```css
/* Standard Input */
h-12 rounded-lg border border-border-color bg-white px-3 text-text-primary

/* Focus State */
focus:border-primary focus:ring-2 focus:ring-primary

/* Dark Mode */
dark:border-text-secondary/50 dark:bg-background-light/10 dark:text-background-light
```

### 10.2 Buttons

```css
/* Primary Button */
flex h-10 min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary px-4 text-sm font-bold text-white

/* Large Button */
h-12 px-5 text-base font-bold

/* Secondary Button */
bg-background-light text-text-primary
```

---

## 11. Grid & Layout Patterns

### 11.1 Public Pages

```css
/* Hero Sections */
relative flex min-h-[60vh] w-full flex-col items-center justify-center

/* Feature Grids */
grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6

/* Booking Forms */
grid grid-cols-1 gap-4 md:grid-cols-4
```

### 11.2 Admin/CRM Pages

```css
/* Dashboard Grids */
grid grid-cols-1 md:grid-cols-3 gap-6

/* Table Layouts */
overflow-x-auto (mobile scrolling)

/* Sidebar Layout */
w-64 fixed sidebar (desktop)
```

---

## 12. Accessibility Standards

### 12.1 ARIA Patterns

```html
<!-- Skip Links -->
<a href="#main-content" class="skip-link">Skip to main content</a>

<!-- Landmarks -->
<main id="main-content">...</main>
<nav aria-label="Main navigation">...</nav>

<!-- Form Labels -->
<label for="check-in">Check-in Date</label>
<input id="check-in" name="check-in" type="date" required aria-required="true"/>

<!-- Current Page -->
<a href="home.html" aria-current="page">Home</a>
```

### 12.2 Keyboard Navigation

```css
/* Focus Rings */
*:focus-visible {
  outline: 2px solid #f97316;
  outline-offset: 2px;
}

/* Focus States */
focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
```

### 12.3 Screen Reader Support

```html
<!-- Descriptive Alt Text -->
<img src="hotel.jpg" alt="Luxury hotel exterior with welcoming entrance"/>

<!-- ARIA Labels -->
<button aria-label="Demo: Admin Dashboard" title="Demo: Admin Dashboard">

<!-- Heading Hierarchy -->
<h1>Cannan International Hotel</h1>
<h2>Our Featured Rooms</h2>
<h3>Economy Single Room</h3>
```

---

# IMPLEMENTATION GUIDELINES

## Module Development Process

### 1. Reference the Source of Truth
Always start by examining the corresponding HTML demo file in `html_demo_pages/` for visual patterns and component structures.

### 2. Map to Tailwind Classes
Convert HTML/CSS patterns to equivalent Tailwind classes using the specifications above.

### 3. Maintain Color Consistency
Use the established color palette tokens rather than hardcoded hex values.

### 4. Apply Responsive Patterns
Follow the documented responsive design patterns for consistent behavior across devices.

### 5. Ensure Accessibility
Implement all accessibility features as documented in the ARIA and keyboard navigation sections.

---

## Quality Assurance Checklist

- [ ] Color palette matches HTML source
- [ ] Typography hierarchy implemented correctly
- [ ] Spacing system applied consistently
- [ ] Responsive breakpoints functioning
- [ ] Accessibility features included
- [ ] Dark mode support verified
- [ ] Interactive states working properly
- [ ] Performance optimized (unused CSS purged)

This Visual Language Specification serves as the definitive guide for all future development, ensuring consistency and quality across all modules.