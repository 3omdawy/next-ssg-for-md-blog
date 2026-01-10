# Article Series and Folder Hierarchy Feature

This document explains how to use the article series and folder hierarchy feature to organize sequential or related blog posts.

## Overview

The series feature allows you to:

- Organize related articles into sequential collections
- Create folder-based hierarchies in your content directory
- Automatically generate series navigation (previous/next)
- Display series badges and groupings in the UI
- Maintain backward compatibility with flat file structures

## How It Works

### Folder Structure

You can organize your blog posts in two ways:

#### 1. Flat Structure (Original, Still Supported)

```
content/blog/
├── post-1.md
├── post-2.md
└── post-3.md
```

#### 2. Folder Hierarchy (New)

```
content/blog/
├── post-1.md                          # Standalone post
├── 01-react-basics/                   # Series folder
│   ├── 01-introduction.md
│   ├── 02-components.md
│   └── 03-state-management.md
└── 02-advanced-patterns/              # Another series
    ├── 01-hooks.md
    └── 02-context.md
```

### Series Detection

The system automatically detects series based on folder structure:

- Posts in the root `content/blog/` directory are standalone posts
- Posts inside subdirectories become part of a series
- The folder name is converted to a series name:
  - `01-react-basics` → "React Basics"
  - `advanced-patterns` → "Advanced Patterns"

## Folder Naming Convention

### Recommended Pattern

Use numbered prefixes for ordering:

```
01-introduction/
02-getting-started/
03-advanced-topics/
```

The numbers are stripped from the display name but help with filesystem ordering.

### Without Numbers

You can also use descriptive names:

```
react-fundamentals/
advanced-react/
testing-strategies/
```

## Post Ordering Within Series

Posts within a series can be ordered in two ways:

### 1. File Name Ordering (Simple)

Use numbered prefixes in filenames:

```
01-introduction.md
02-components.md
03-state.md
```

### 2. Frontmatter Ordering (Explicit)

Add `seriesOrder` to your frontmatter:

```yaml
---
title: "Advanced Component Patterns"
date: "2024-01-15"
seriesOrder: 3
---
```

If `seriesOrder` is not specified, posts are sorted by date (oldest first within the series).

## Frontmatter Options

### New Fields

```yaml
---
title: "Understanding React Hooks"
date: "2024-01-15"
author: "Your Name"
tags: ["react", "hooks"]
description: "A comprehensive guide to React Hooks"

# Optional: Override the series name from folder
series: "React Deep Dive"

# Optional: Explicit ordering within series
seriesOrder: 2
---
```

### Field Precedence

- If both folder structure and frontmatter `series` are present, frontmatter takes precedence
- If both filename numbering and `seriesOrder` exist, `seriesOrder` takes precedence

## URL Structure

### Blog Posts

Posts maintain their relative path in URLs:

```
/blog/standalone-post           # Root level post
/blog/react-basics/introduction # Post in series folder
/blog/react-basics/components   # Another post in same series
```

### Series Pages

```
/series                          # List all series
/series/01-react-basics         # View all posts in this series
```

## Features

### 1. Series Listing Page (`/series`)

- Shows all available series
- Displays article count for each series
- Preview of first 3 articles
- Link to view complete series

### 2. Series Detail Page (`/series/[slug]`)

- Lists all articles in the series in order
- Shows post metadata (date, reading time, tags)
- Sequential numbering (01, 02, 03...)
- Direct links to each article

### 3. Post Pages

![Series Navigation](../public/images/screenshots/6-series-navigation.jpg)

- Series badge at the top (if part of a series)
- Previous/Next navigation for series articles
- Links back to series overview
- Maintains all existing features (TOC, tags, etc.)

### 4. Blog Listing Page

- Shows series badge for posts that belong to a series
- Badge links to series detail page
- Works with existing search and filtering

## Migration Guide

### From Flat Structure

No changes required! Your existing posts continue to work exactly as before.

### Adding Series

1. **Create a folder** in `content/blog/`:

   ```bash
   mkdir content/blog/01-react-series
   ```

2. **Move related posts** into the folder:

   ```bash
   mv content/blog/react-*.md content/blog/01-react-series/
   ```

3. **Rename files** with numbering (optional):

   ```bash
   cd content/blog/01-react-series
   mv react-intro.md 01-introduction.md
   mv react-components.md 02-components.md
   ```

4. **Build the site**:
   ```bash
   npm run build
   ```

The series will be automatically detected and displayed!

## Example: Creating a Tutorial Series

```
content/blog/nextjs-complete-guide/
├── 01-introduction.md
├── 02-setup.md
├── 03-routing.md
├── 04-data-fetching.md
└── 05-deployment.md
```

**01-introduction.md:**

```yaml
---
title: "Next.js Complete Guide: Introduction"
date: "2024-01-01"
author: "Your Name"
tags: ["nextjs", "tutorial"]
description: "Welcome to the complete Next.js guide"
seriesOrder: 1
---
Welcome to the Next.js Complete Guide series...
```

This creates:

- Series name: "Nextjs Complete Guide"
- Series URL: `/series/nextjs-complete-guide`
- Post URLs: `/blog/nextjs-complete-guide/01-introduction`, etc.
- Automatic prev/next navigation between posts

## Static Site Generation (SSG)

All series-related pages are statically generated at build time:

- `/series` - Generated once
- `/series/[slug]` - Generated for each series
- `/blog/[...slug]` - Generated for all posts (flat and nested)

This ensures optimal performance with no runtime overhead.

## Backward Compatibility

✅ **Fully backward compatible:**

- Existing flat posts continue to work unchanged
- No frontmatter changes required for existing posts
- All existing features (tags, categories, search) work as before
- No breaking changes to URLs or routing
- Can mix flat and hierarchical posts freely

## Best Practices

1. **Use numbered folders** for series you want in a specific order
2. **Use descriptive names** without numbers for topical groupings
3. **Add seriesOrder** in frontmatter for explicit control
4. **Keep series focused** - 3-10 posts is ideal
5. **Write standalone posts** outside of series for one-off content
6. **Update dates** to reflect when posts are published, not their order

## Troubleshooting

### Series not appearing

- Ensure posts are in a subdirectory of `content/blog/`
- Check that posts have valid frontmatter
- Verify posts are not marked as `draft: true` (in production)

### Wrong order

- Add `seriesOrder` to frontmatter for explicit ordering
- Check file naming if relying on alphabetical order
- Ensure dates are correct if using date-based ordering

### URL conflicts

- Avoid using the same filename in different series
- Use unique folder names for different series
- Don't create a post named `series` (reserved route)
