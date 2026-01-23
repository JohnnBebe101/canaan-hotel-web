# Cannan Hotel UI Demo - Shared Resources

## Overview

This directory contains shared resources and templates for maintaining consistency across the Cannan Hotel UI demo pages.

## Files

### `html-head.html`
Complete HTML head template with:
- Meta tags (customize per page)
- Font loading (Plus Jakarta Sans)
- Material Symbols font
- Tailwind CSS configuration
- Shared styles (skip links, icons)

### `color-scheme.md`
Comprehensive color scheme documentation including:
- Primary color palette
- Usage guidelines for public vs admin interfaces
- Dark mode support
- Typography standards
- Spacing guidelines

### `layout-patterns.html`
Common HTML patterns and components:
- Admin sidebar navigation
- Admin header layout
- KPI cards
- Data tables
- Action buttons
- Filter controls
- Pagination
- Chart placeholders

## Usage Instructions

### For New Pages

1. **Copy HTML head**: Include the shared head template in new pages
2. **Customize meta tags**: Update title, description, and Open Graph tags
3. **Use layout patterns**: Reference the pattern examples for consistent structure
4. **Follow color scheme**: Use documented colors and classes

### Color Consistency

**All pages must use the shared color palette:**
- Primary: `#f97316` (Orange)
- Background Light: `#f8f8f5` (Cream)
- Background Dark: `#181611` (Dark brown)
- Text Primary: `#172554` (Dark blue)
- Text Secondary: `#64748b` (Gray)
- Border Color: `#e2e8f0` (Light gray)

**Dark mode classes must be included:**
- `dark:bg-background-dark` for dark backgrounds
- `dark:text-background-light` for dark text
- `dark:border-text-secondary/20` for dark borders

### Typography Standards

- **Primary font**: Plus Jakarta Sans (400, 500, 700, 800 weights)
- **Fallback**: Noto Sans, sans-serif
- **Consistent spacing**: Use Tailwind's default line heights

### Component Patterns

#### Admin Pages
- Fixed sidebar (256px width)
- Fixed header (64px height)
- Scrollable main content
- Demo mode indicators

#### Public Pages
- Marketing-focused layouts
- Hero sections
- Feature grids
- Call-to-action buttons

### Demo Standards

**All interactive elements must be marked with `data-demo="true"`:**
- Buttons that would perform actions
- Form inputs
- Links to functional pages
- Interactive controls

**Demo indicators:**
- "Demo Mode Active" badges
- "Live"/"Tier-3" status indicators
- "data-demo=true" attributes on all functional elements

## Maintenance

### Updating Shared Resources

When updating shared resources:
1. Update all existing pages to match new standards
2. Test across different screen sizes
3. Verify dark mode compatibility
4. Ensure build passes

### Adding New Patterns

When adding new reusable patterns:
1. Document in `layout-patterns.html`
2. Include all necessary classes
3. Add dark mode support
4. Mark demo elements appropriately

## Quality Assurance

### Pre-deployment Checklist

- [ ] All pages use shared color scheme
- [ ] Dark mode works on all pages
- [ ] Responsive design tested (mobile to desktop)
- [ ] All interactive elements marked `data-demo="true"`
- [ ] No functional JavaScript or API calls
- [ ] Build passes without errors
- [ ] Consistent spacing and typography
- [ ] Accessibility features (skip links, proper labels)

### Color Consistency Check

Run this command to verify color usage:
```bash
grep -r "bg-\|text-\|border-" ui-demo/ --include="*.html" | grep -v "background-\|text-primary\|text-secondary\|border-color"
```

This should return minimal results - all colors should use the shared palette.