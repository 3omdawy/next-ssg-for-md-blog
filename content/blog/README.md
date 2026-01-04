# Blog Content Directory

This directory contains all your blog posts. Posts can be organized in a flat structure or grouped into series using folders.

## Directory Structure

### Flat Structure (Simple)
For standalone blog posts, place markdown files directly in this directory:

```
content/blog/
├── my-first-post.md
├── another-post.md
└── web-development-tips.md
```

### Folder Hierarchy (Series)
For sequential or related posts, organize them in subdirectories:

```
content/blog/
├── standalone-post.md
├── 01-react-fundamentals/
│   ├── 01-introduction.md
│   ├── 02-components.md
│   └── 03-hooks.md
└── 02-typescript-guide/
    ├── 01-basics.md
    └── 02-advanced.md
```

### Mixed Approach (Recommended)
You can freely mix both approaches:

```
content/blog/
├── welcome.md                    # Standalone
├── about-this-blog.md           # Standalone
├── react-tutorial/              # Series
│   ├── 01-intro.md
│   └── 02-advanced.md
└── random-thoughts.md           # Standalone
```

## Creating Posts

### Standalone Post

Create a file like `my-post.md`:

```yaml
---
title: "My Blog Post Title"
date: "2024-01-15"
author: "Your Name"
tags: ["web", "javascript"]
description: "A brief description of the post"
category: "Tutorial"
---

Your content here...
```

### Series Post

1. Create a folder: `content/blog/my-series/`
2. Add posts with numbered prefixes: `01-intro.md`, `02-setup.md`, etc.
3. Each post uses the same frontmatter format, optionally with `seriesOrder`:

```yaml
---
title: "Introduction to My Series"
date: "2024-01-15"
author: "Your Name"
tags: ["tutorial"]
description: "First post in the series"
seriesOrder: 1
---

Welcome to this series...
```

## Frontmatter Fields

### Required
- `title`: Post title
- `date`: Publication date (YYYY-MM-DD format)

### Optional
- `author`: Author name
- `tags`: Array of tags
- `description`: Post excerpt/description
- `category`: Post category
- `draft`: Set to `true` to hide in production
- `series`: Override series name from folder
- `seriesOrder`: Explicit ordering within series
- `image`: Featured image URL

## Series Features

When you organize posts in folders:

1. **Automatic Series Detection**: Folder name becomes the series name
   - `01-react-basics` → "React Basics" series
   
2. **Series Pages**: Accessible at `/series` and `/series/[folder-name]`

3. **Navigation**: Posts in a series get prev/next links automatically

4. **Ordering**: Posts are ordered by:
   - `seriesOrder` in frontmatter (if present)
   - Date (oldest first)
   - Filename (alphabetically)

## File Naming Tips

### For Standalone Posts
- Use descriptive, URL-friendly names
- Use hyphens instead of spaces
- Example: `understanding-react-hooks.md`

### For Series Posts
- Use numbered prefixes: `01-`, `02-`, `03-`
- Keeps posts in order
- Numbers are stripped from URLs
- Example: `01-introduction.md` → URL: `/blog/series-name/01-introduction`

## Markdown Features

Supported markdown features:
- Headers (H1-H6)
- Code blocks with syntax highlighting
- Tables
- Lists (ordered and unordered)
- Links and images
- Blockquotes
- Bold and italic text
- Inline code

## Content Guidelines

1. **Use descriptive titles**: Clear, concise, and searchable
2. **Add descriptions**: Helps with SEO and previews
3. **Tag appropriately**: Makes content discoverable
4. **Check formatting**: Preview before publishing
5. **Update dates**: Use actual publication dates
6. **Series coherence**: Ensure posts in a series flow logically

## Examples

Check the existing posts in this directory for examples of:
- Standalone posts: `welcome.md`
- Code highlighting
- Proper frontmatter usage
- Markdown formatting

For more details on the series feature, see `docs/SERIES_FEATURE.md`.
