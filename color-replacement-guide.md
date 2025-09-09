# Screen Rant Color System Refactoring Guide

## Overview
We have successfully refactored the Screen Rant app to use a consistent color system based on CSS custom properties instead of hard-coded color values.

## New Color System

### CSS Variables Defined (`app/globals.css`)

#### Brand Colors
- `--brand-primary`: Main brand red color (0 84% 60% in light, 0 84% 65% in dark)
- `--brand-primary-foreground`: Text color for brand primary background
- `--brand-secondary`: Secondary brand color
- `--brand-hover`: Hover state for brand elements
- `--brand-muted`: Muted brand background color
- `--brand-accent`: Brand accent color

#### Semantic Colors
- `--success`: Success state color
- `--warning`: Warning state color
- `--info`: Information state color

#### Gray Scale
- `--gray-50` through `--gray-900`: Consistent gray scale

### Tailwind Classes Available

#### Brand Colors
- `text-brand-primary`, `bg-brand-primary`, `border-brand-primary`
- `text-brand-hover`, `bg-brand-hover`, `border-brand-hover`
- `text-brand-muted`, `bg-brand-muted`, `border-brand-muted`
- `text-brand-secondary`, `bg-brand-secondary`, `border-brand-secondary`

#### Semantic Colors
- `text-success`, `bg-success`, `border-success`
- `text-warning`, `bg-warning`, `border-warning`
- `text-info`, `bg-info`, `border-info`

#### Gray Scale
- `text-gray-50` through `text-gray-900`
- `bg-gray-50` through `bg-gray-900`
- `border-gray-50` through `border-gray-900`

## Components Updated

### Core Components ✅
- `components/header.tsx` - Logo and navigation links
- `components/footer.tsx` - Logo
- `components/mobile-drawer.tsx` - Navigation hover states

### Database Components ✅
- `components/db/database-hero.tsx` - Hero section gradient and buttons
- `components/db/trending-now.tsx` - Icons and hover states
- `components/db/popular-searches.tsx` - Icons and hover states
- `components/db/category-grid.tsx` - Cards and hover states

### Thread Components ✅
- `components/threads/topics-section.tsx` - Buttons and hover states
- `components/threads/latest-threads.tsx` - Links and hover states
- `components/threads/trending-threads.tsx` - Links and hover states
- `components/threads/threads-sidebar.tsx` - Icons and hover states

### Cover Story Components ✅
- `components/cover-story/hero-section.tsx` - Badges and icons

### Shared Components ✅
- `components/shared/category-featured-section.tsx` - Hover states
- `components/shared/category-popular-content.tsx` - Links and hover states

### UI Components ✅
- `components/ui/chart.tsx` - Chart stroke colors

## Migration Pattern

### Before (Hard-coded)
```tsx
className="text-red-600 hover:text-red-700"
className="bg-red-600 hover:bg-red-700"
className="border-red-600"
```

### After (CSS Variables)
```tsx
className="text-brand-primary hover:text-brand-hover"
className="bg-brand-primary hover:bg-brand-hover"
className="border-brand-primary"
```

## Remaining Components to Update

To complete the migration, update these remaining components by replacing:

### Red Color Patterns
Replace these patterns in remaining files:
- `text-red-600` → `text-brand-primary`
- `text-red-500` → `text-brand-primary`
- `text-red-700` → `text-brand-hover`
- `bg-red-600` → `bg-brand-primary`
- `bg-red-700` → `bg-brand-hover`
- `bg-red-50` → `bg-brand-muted`
- `bg-red-100` → `bg-brand-muted`
- `border-red-600` → `border-brand-primary`
- `border-red-200` → `border-brand-muted`

### Gray Color Patterns
Replace hard-coded gray colors:
- `text-gray-900` → `text-gray-900` (already available)
- `text-gray-600` → `text-gray-600` (already available)
- Use the new gray scale variables consistently

## Search and Replace Commands

Use these regex patterns to find remaining instances:

```bash
# Find remaining red colors
grep -r "text-red-[0-9]" components/
grep -r "bg-red-[0-9]" components/
grep -r "border-red-[0-9]" components/

# Find hard-coded hex colors
grep -r "#[0-9a-fA-F]" components/
```

## Benefits of New System

1. **Consistency**: All brand colors are centrally defined
2. **Theme Support**: Automatic dark mode color adjustments
3. **Maintainability**: Change brand colors in one place
4. **Accessibility**: Better contrast management
5. **Design System**: Clear semantic color usage

## Dark Mode Support

All colors automatically adapt to dark mode through CSS custom properties. The dark theme values are defined in the `.dark` selector in `globals.css`.

## Next Steps

1. Complete migration of remaining components
2. Test dark mode functionality
3. Verify accessibility contrast ratios
4. Document component-specific color usage patterns
5. Create Storybook documentation for the color system 