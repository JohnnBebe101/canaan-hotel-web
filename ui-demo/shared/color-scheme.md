# Cannan Hotel UI Color Scheme

## Primary Color Palette

### Brand Colors
- **Primary**: `#f97316` (Orange - main brand color)
- **Background Light**: `#f8f8f5` (Cream/off-white)
- **Background Dark**: `#181611` (Dark brown/black)
- **Text Primary**: `#172554` (Dark blue)
- **Text Secondary**: `#64748b` (Gray)
- **Border Color**: `#e2e8f0` (Light gray)

## Usage Guidelines

### Public Site (Marketing Pages)
- Use full color palette for vibrant, welcoming feel
- Primary color for CTAs and highlights
- Background-light for main content areas
- Text-primary for headings, text-secondary for body text

### Admin Interface
- Same color palette for consistency
- Slightly muted usage for professional feel
- Background-light/dark for alternating sections
- Primary color for active states and buttons
- Text-primary for headings, text-secondary for labels

## Dark Mode Support

All components support dark mode with:
- `dark:bg-background-dark` for dark backgrounds
- `dark:text-background-light` for dark text
- `dark:border-text-secondary/20` for dark borders
- Consistent opacity levels (20%, 50%, 90%) for subtle variations

## Color Classes Reference

### Backgrounds
- `bg-background-light` - Main light background
- `dark:bg-background-dark` - Main dark background
- `bg-primary` - Primary brand color background
- `bg-white dark:bg-background-dark` - Card/container backgrounds

### Text Colors
- `text-text-primary dark:text-background-light` - Primary headings
- `text-text-secondary dark:text-text-secondary/90` - Secondary text/labels
- `text-primary` - Links and highlights

### Borders
- `border-border-color dark:border-text-secondary/20` - Default borders
- `border-primary` - Primary accent borders

### Buttons
- Primary: `bg-primary text-white hover:opacity-90`
- Secondary: `bg-gray-100 dark:bg-text-secondary/10 hover:bg-gray-200 dark:hover:bg-text-secondary/20`

## Typography

- **Font Family**: Plus Jakarta Sans (display), Noto Sans (fallback)
- **Weights**: 400 (regular), 500 (medium), 700 (bold), 800 (black)
- **Line Heights**: Consistent with Tailwind defaults

## Spacing

- **Standard padding**: 4, 6, 8 units (1rem, 1.5rem, 2rem)
- **Margins**: Consistent with padding scale
- **Border radius**: 0.25rem default, 0.5rem lg, 0.75rem xl, 9999px full

## Responsive Design

- **Mobile-first**: Base styles for mobile, enhanced for larger screens
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Grid systems**: 1-4 columns based on screen size