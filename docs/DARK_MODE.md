# Dark Mode Feature

The blog includes a fully functional dark mode with smooth transitions and theme persistence.

## Features

### 🌓 Theme Toggle
- **Manual Toggle**: Click the sun/moon icon in the header to switch themes
- **Visual Feedback**: Icon changes based on current theme (moon for light mode, sun for dark mode)
- **Smooth Transitions**: All colors transition smoothly when switching themes

### 💾 Persistence
- **localStorage**: Theme preference is saved and persists across sessions
- **System Preference**: Respects user's system dark mode preference on first visit
- **Priority**: Saved preference > System preference > Light mode (default)

### ⚡ Performance
- **No Flash**: Theme is applied before React hydration to prevent flash of wrong theme
- **Optimized**: Uses CSS variables for instant theme switching
- **SSG Compatible**: Works perfectly with static site generation

## How It Works

### Theme Detection Flow

1. **Initial Load**:
   ```javascript
   // Check localStorage
   const savedTheme = localStorage.getItem('theme');
   
   // Check system preference
   const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
   
   // Use saved > system > light
   const theme = savedTheme || (prefersDark ? 'dark' : 'light');
   ```

2. **Apply Theme**:
   ```javascript
   // Add/remove 'dark' class on html element
   document.documentElement.classList.toggle('dark', theme === 'dark');
   ```

3. **Save Preference**:
   ```javascript
   localStorage.setItem('theme', newTheme);
   ```

### CSS Implementation

Theme uses CSS variables that change based on the `.dark` class:

```css
:root {
  --background: #ffffff;
  --foreground: #171717;
  --primary: #3b82f6;
  /* ... */
}

.dark {
  --background: #0a0a0a;
  --foreground: #ededed;
  --primary: #60a5fa;
  /* ... */
}
```

All components use these variables:
```css
body {
  background: var(--background);
  color: var(--foreground);
}
```

## Components

### ThemeToggle
Location: `components/layout/ThemeToggle.tsx`

**Features**:
- Client-side component (uses `'use client'`)
- Reads/writes to localStorage
- Updates DOM class on html element
- Shows appropriate icon (sun/moon)
- Prevents hydration mismatch

**Usage**:
```tsx
import { ThemeToggle } from '@/components/layout/ThemeToggle';

<ThemeToggle />
```

### ThemeScript
Location: `components/layout/ThemeScript.tsx`

**Purpose**:
- Runs before React hydration
- Prevents flash of wrong theme
- Sets initial theme on html element

**Usage**:
```tsx
import { ThemeScript } from '@/components/layout/ThemeScript';

<html>
  <head>
    <ThemeScript />
  </head>
  {/* ... */}
</html>
```

## Color Palette

### Light Mode
| Variable | Color | Usage |
|----------|-------|-------|
| `--background` | #ffffff | Page background |
| `--foreground` | #171717 | Text color |
| `--primary` | #3b82f6 | Links, accents |
| `--accent` | #8b5cf6 | Code, highlights |
| `--muted` | #f3f4f6 | Backgrounds, code blocks |
| `--border` | #e5e7eb | Borders, dividers |

### Dark Mode
| Variable | Color | Usage |
|----------|-------|-------|
| `--background` | #0a0a0a | Page background |
| `--foreground` | #ededed | Text color |
| `--primary` | #60a5fa | Links, accents |
| `--accent` | #a78bfa | Code, highlights |
| `--muted` | #1f2937 | Backgrounds, code blocks |
| `--border` | #374151 | Borders, dividers |

## Customization

### Changing Colors

Edit `src/app/globals.css`:

```css
:root {
  /* Light mode colors */
  --background: #your-color;
  --foreground: #your-color;
  /* ... */
}

.dark {
  /* Dark mode colors */
  --background: #your-color;
  --foreground: #your-color;
  /* ... */
}
```

### Adding New Theme Variables

1. Add to globals.css:
```css
:root {
  --custom-color: #value;
}

.dark {
  --custom-color: #dark-value;
}
```

2. Register in Tailwind theme:
```css
@theme inline {
  --color-custom: var(--custom-color);
}
```

3. Use in components:
```tsx
<div className="text-custom bg-custom" />
```

### Customizing Transitions

Edit transition duration in `globals.css`:

```css
* {
  transition-duration: 200ms; /* Change to your preference */
}
```

## Accessibility

### Keyboard Navigation
- Toggle button is fully keyboard accessible
- Press `Tab` to focus the toggle
- Press `Enter` or `Space` to toggle theme

### Screen Readers
- Button has `aria-label` describing the action
- Dynamic label updates based on current theme
- Example: "Switch to dark mode" or "Switch to light mode"

### ARIA Attributes
```tsx
<button
  aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
  title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
>
  {/* Icon */}
</button>
```

## Browser Support

Works in all modern browsers:
- ✅ Chrome/Edge (88+)
- ✅ Firefox (78+)
- ✅ Safari (14+)
- ✅ Mobile browsers

Requirements:
- CSS Variables (widely supported)
- localStorage (widely supported)
- matchMedia API (widely supported)

## Troubleshooting

### Theme Not Persisting

**Issue**: Theme resets on page reload

**Solutions**:
1. Check if localStorage is enabled in browser
2. Verify no browser extensions blocking localStorage
3. Check browser console for errors

### Flash of Wrong Theme

**Issue**: Brief flash of light theme before dark theme loads

**Solutions**:
1. Ensure `<ThemeScript />` is in the `<head>`
2. Check that script runs before body renders
3. Verify `suppressHydrationWarning` is on `<html>` element

### Theme Not Applying to Components

**Issue**: Some components don't change with theme

**Solutions**:
1. Use CSS variables instead of hardcoded colors
2. Use Tailwind color classes that reference variables
3. Add custom prose styles for markdown content

### Dark Mode Too Dark/Light

**Issue**: Colors are too extreme

**Solution**: Adjust color values in `globals.css`:
```css
.dark {
  --background: #1a1a1a; /* Lighter than #0a0a0a */
  --foreground: #e0e0e0; /* Slightly dimmer than #ededed */
}
```

## Best Practices

### DO:
- ✅ Use CSS variables for all colors
- ✅ Test both themes during development
- ✅ Ensure sufficient contrast in both modes
- ✅ Use semantic color names (--background, --foreground)
- ✅ Provide smooth transitions

### DON'T:
- ❌ Hardcode colors in components
- ❌ Forget to test system preference detection
- ❌ Use too many transition effects (can be jarring)
- ❌ Assume all users want automatic dark mode
- ❌ Forget accessibility attributes

## Testing

### Manual Testing

1. **Toggle Functionality**:
   - Click toggle button
   - Verify theme changes
   - Check icon updates

2. **Persistence**:
   - Set theme
   - Reload page
   - Verify theme persists

3. **System Preference**:
   - Clear localStorage: `localStorage.clear()`
   - Change system dark mode setting
   - Reload page
   - Verify theme matches system

4. **Visual Testing**:
   - Check all page types (home, blog, post, series)
   - Verify code blocks render correctly
   - Check links are visible
   - Verify borders are subtle but visible

### Browser Testing

```javascript
// Open browser console

// Get current theme
localStorage.getItem('theme');

// Set theme manually
localStorage.setItem('theme', 'dark');
location.reload();

// Clear theme
localStorage.removeItem('theme');
location.reload();

// Check system preference
window.matchMedia('(prefers-color-scheme: dark)').matches;
```

## Future Enhancements

Potential improvements:
- [ ] Add theme options beyond light/dark (sepia, high contrast)
- [ ] Theme-specific syntax highlighting
- [ ] Animated theme transition effects
- [ ] User preference in URL query parameter
- [ ] Theme-specific images/illustrations
