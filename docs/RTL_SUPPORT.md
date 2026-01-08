# RTL (Right-to-Left) Language Support

This blog has comprehensive support for RTL languages, particularly Arabic. This document explains how to use and configure RTL features.

## Overview

The blog supports three configuration modes:

1. **Global RTL** - Entire blog in RTL mode
2. **Global LTR** - Entire blog in LTR mode
3. **Auto-detect** - Each post's direction detected automatically

## Configuration

### Global Configuration

In `config.ts`, set the language option:

```typescript
export const config = {
  // ... other settings
  
  // Language and direction configuration
  language: 'default', // 'ar' | 'ltr' | 'default'
};
```

**Options:**

- **`'ar'`** - Arabic/RTL mode for entire site
  - Layout renders right-to-left
  - Uses Noto Sans Arabic font
  - Header, footer, and all UI elements are RTL
  
- **`'ltr'`** - Explicit LTR mode
  - Forces left-to-right layout
  - Uses Geist Sans font
  - Standard Western layout
  
- **`'default'`** (recommended) - Auto-detect per post
  - Main layout uses config or defaults to LTR
  - Individual posts detect their own direction
  - Best for multilingual blogs

### Environment Variable

You can also set via environment variable:

```bash
LANGUAGE=ar npm run build
```

### Per-Post Configuration

Add `language` field to post frontmatter:

```yaml
---
title: "Your Post Title"
language: "ar"  # or "en", "arabic", etc.
---
```

**Supported values:**
- `"ar"` or `"arabic"` - Renders in RTL
- `"en"` or `"english"` - Renders in LTR
- Omit for auto-detection

## Auto-Detection

When `language` is not specified in frontmatter, the system automatically detects the text direction by analyzing the content:

- If ≥30% of characters are Arabic (Unicode U+0600-U+06FF), renders as RTL
- Otherwise, renders as LTR

This works seamlessly without manual configuration.

## How It Works

### Layout Level (config.ts)

When you set `language: 'ar'`:

```typescript
// src/app/layout.tsx
const direction = config.language === 'ar' ? 'rtl' : 'ltr';
const language = config.language === 'ar' ? 'ar' : 'en';

<html lang={language} dir={direction}>
```

This applies to:
- Header navigation
- Footer
- Page layouts
- All UI elements

### Post Level (ArticleContent.tsx)

Each article can have its own direction:

```typescript
// Auto-detect or use frontmatter
const shouldBeRTL = language === 'ar' || isArabicText(content);

if (shouldBeRTL) {
  articleRef.current.setAttribute('dir', 'rtl');
  articleRef.current.classList.add('lang-ar');
}
```

## Styling

### CSS Classes

The following classes are automatically applied:

**RTL Detection:**
```css
/* Applied to RTL articles */
[dir="rtl"] { /* RTL-specific styles */ }
.lang-ar { font-family: var(--font-arabic); }
```

**Font Application:**
```css
html[lang="ar"] body,
html[dir="rtl"] body {
  font-family: var(--font-arabic), var(--font-sans);
}
```

### RTL-Aware Elements

The CSS includes RTL-aware styling for:

**Lists:**
```css
[dir="rtl"] .prose ul,
[dir="rtl"] .prose ol {
  padding-inline-start: 1.625em;
  padding-inline-end: 0;
}
```

**Blockquotes:**
```css
[dir="rtl"] .prose blockquote {
  border-inline-start-width: 4px;
  border-inline-end-width: 0;
}
```

**Code Blocks:**
```css
/* Code blocks always LTR */
.prose pre {
  direction: ltr;
  text-align: left;
}
```

## Typography

### Arabic Font

**Noto Sans Arabic** is used for Arabic content:

```typescript
const notoSansArabic = Noto_Sans_Arabic({
  variable: "--font-noto-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});
```

**Features:**
- Clean, modern Arabic typography
- Excellent readability
- Multiple font weights
- Optimized for web

### Font Loading

Fonts are loaded via Next.js Font Optimization:
- Automatic font subsetting
- Optimal loading strategy
- No layout shift (CLS)

## Best Practices

### 1. Use Config for Site-wide Language

If your entire blog is in Arabic:
```typescript
// config.ts
language: 'ar'
```

### 2. Use Frontmatter for Mixed Content

For multilingual blogs:
```typescript
// config.ts
language: 'default'
```

Then in each post:
```yaml
# Arabic post
language: "ar"

# English post
language: "en"
```

### 3. Code Blocks

Always write code in LTR (automatically handled):

```markdown
```typescript
// This will always be LTR
function example() {
  return "Hello World";
}
```
```

### 4. Mixed Language Content

For posts with both languages:

```markdown
---
language: "ar"  # Primary language
---

## Arabic Title

Arabic text here...

### English Section

<div dir="ltr">
English text here...
</div>
```

## Example Posts

### Arabic Post

```markdown
---
title: "مرحباً بك"
date: "2026-01-08"
author: "عماد"
language: "ar"
tags: ["عربي", "تقني"]
---

## المقدمة

هذا مثال على مقالة عربية...

### كود برمجي

```typescript
const message = "مرحباً";
```

> اقتباس باللغة العربية
```

### English Post

```markdown
---
title: "Welcome"
date: "2026-01-08"
author: "Emad"
language: "en"  # Optional, auto-detected
tags: ["english", "tech"]
---

## Introduction

This is an English post...
```

## Testing RTL Support

### Test Checklist

- [ ] Header navigation aligns correctly
- [ ] Footer text aligns correctly
- [ ] Post content flows RTL
- [ ] Lists indent from the right
- [ ] Blockquote border on the right
- [ ] Code blocks remain LTR
- [ ] Arabic font loads properly
- [ ] Tags and categories display correctly
- [ ] Table of contents aligns correctly
- [ ] Search functionality works
- [ ] Dark mode works with RTL

### Development Testing

```bash
# Test with Arabic layout
LANGUAGE=ar npm run dev

# Test with auto-detect (recommended)
LANGUAGE=default npm run dev

# Test with explicit LTR
LANGUAGE=ltr npm run dev
```

### Build Testing

```bash
# Build with Arabic
LANGUAGE=ar npm run build

# Build with default (recommended)
npm run build
```

## Troubleshooting

### Issue: RTL Not Applied

**Solution:**
1. Check `language` field in frontmatter
2. Verify config.ts setting
3. Clear `.next` cache and rebuild
4. Check browser devtools for `dir` attribute

### Issue: Wrong Font

**Solution:**
1. Verify Noto Sans Arabic is loaded
2. Check if `lang-ar` class is applied
3. Clear font cache and reload

### Issue: Code Blocks in RTL

**Solution:**
Code blocks should automatically be LTR. If not:
```css
.prose pre {
  direction: ltr !important;
  text-align: left !important;
}
```

### Issue: Mixed Content Alignment

**Solution:**
Use explicit `dir` attributes:
```html
<div dir="ltr">English content</div>
<div dir="rtl">محتوى عربي</div>
```

## Technical Details

### CSS Logical Properties

We use CSS logical properties for RTL support:

```css
/* Instead of margin-left */
margin-inline-start: 1rem;

/* Instead of margin-right */
margin-inline-end: 1rem;

/* Instead of padding-left */
padding-inline-start: 2rem;
```

### Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support

### Performance

- Font subsetting reduces Arabic font size
- Direction detection is client-side (no SSR impact)
- CSS logical properties have no performance cost
- No JavaScript required for static RTL

## Future Enhancements

Potential improvements:

- [ ] Additional RTL languages (Hebrew, Urdu, etc.)
- [ ] RTL-specific theme customization
- [ ] Admin panel language switcher
- [ ] Automatic translation integration
- [ ] More Arabic fonts options

## References

- [MDN: CSS Logical Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties)
- [W3C: Structural markup and right-to-left text](https://www.w3.org/International/questions/qa-html-dir)
- [Google Fonts: Noto Sans Arabic](https://fonts.google.com/noto/specimen/Noto+Sans+Arabic)
- [Next.js Font Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
