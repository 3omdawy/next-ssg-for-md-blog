# Next.js SSG Markdown Blog

A modern, high-performance static blog built with Next.js 16, featuring full RTL (Right-to-Left) support for Arabic and other RTL languages.

## Features

- 📝 **Markdown & MDX Support** - Write content in Markdown with frontmatter
- 🎨 **Modern Design** - Clean, responsive design with dark mode
- 🚀 **Static Site Generation** - Pre-rendered for optimal performance
- 🔍 **Full-text Search** - Client-side search with Fuse.js
- 🏷️ **Tags & Categories** - Organize content efficiently
- 📚 **Series Support** - Group related posts into series
- 🌐 **RTL Support** - Full Arabic language and RTL formatting support
- 🎯 **Dual Build Modes** - Standalone or embeddable deployment
- ⚡ **SEO Optimized** - Proper meta tags and semantic HTML
- 🔗 **Table of Contents** - Auto-generated from headings
- 💻 **Syntax Highlighting** - Beautiful code blocks with highlight.js
- 📱 **Fully Responsive** - Works perfectly on all devices

## RTL Language Support

### Configuration

The blog now supports RTL languages with configurable behavior:

**In `config.ts`:**

```typescript
export const config = {
  // ... other config

  // Language and direction configuration
  // Options: 'ar' for Arabic (RTL), 'ltr' for explicit LTR, or 'default' for auto-detect per post
  language: (process.env.LANGUAGE || "default") as "ar" | "ltr" | "default",
};
```

**Configuration options:**

1. **`language: 'ar'`** - The entire blog layout will be RTL with Arabic font
2. **`language: 'ltr'`** - Force LTR layout for all content
3. **`language: 'default'`** - Auto-detect per post based on frontmatter or content

### Per-Post Language Control

You can specify the language for individual posts in the frontmatter:

```yaml
---
title: "مرحباً بك في المدونة التقنية"
date: "2026-01-08"
author: "عماد أشرف"
language: "ar" # This post will be rendered in RTL
---
```

**Language field:**

- `"ar"` or `"arabic"` - Renders post in RTL with Arabic font
- `"en"` or omitted - Renders post in LTR
- Auto-detection also works by analyzing content

### Features

✅ Beautiful Arabic typography with Cairo font  
✅ Proper RTL text alignment and flow  
✅ RTL-aware UI elements (borders, margins, padding)  
✅ Code blocks remain LTR (as they should be)  
✅ Bidirectional content support in the same blog  
✅ No regression to existing LTR functionality  
✅ Works perfectly with SSG export mode

### Examples

Check out:

- `content/blog/arabic-sample-post.md` - A complete Arabic blog post example
- `content/blog/welcome.md` - English blog post (unchanged)

## Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/3omdawy/next-ssg-for-md-blog.git
cd next-ssg-for-md-blog

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your blog.

### Configuration

1. **Site Configuration** - Edit `config.ts`:

```typescript
export const config = {
  buildMode: "standalone", // or 'embeddable'
  site: {
    name: "Your Blog Name",
    description: "Your blog description",
    url: "https://yourdomain.com",
    author: "Your Name",
  },
  language: "default", // 'ar' for RTL, 'ltr' for LTR, 'default' for auto-detect
};
```

2. **Environment Variables** (optional):

```bash
BUILD_MODE=standalone
SITE_NAME="Tech Blog"
SITE_DESCRIPTION="Technical articles and tutorials"
SITE_URL="https://yourdomain.com"
LANGUAGE=default  # or 'ar' for Arabic RTL layout
```

## Writing Content

### Blog Posts

Create markdown files in `content/blog/`:

```markdown
---
title: "Your Post Title"
date: "2026-01-08"
author: "Your Name"
tags: ["tag1", "tag2"]
category: "Category Name"
description: "Brief description"
language: "ar" # Optional: 'ar' for Arabic/RTL
draft: false
---

## Your Content

Write your post content here...
```

### Arabic Posts

For Arabic content:

```markdown
---
title: "عنوان المقالة"
date: "2026-01-08"
author: "اسم المؤلف"
tags: ["وسم١", "وسم٢"]
category: "الفئة"
description: "وصف مختصر"
language: "ar"
---

## المحتوى

اكتب محتوى المقالة هنا...
```

### Series

Organize related posts into series by creating folders:

```
content/blog/
  my-series/
    part-1.md
    part-2.md
    part-3.md
```

Or use frontmatter:

```yaml
series: "My Series Name"
seriesOrder: 1
```

## Build & Deploy

### Standalone Mode

```bash
npm run build:standalone
```

Creates a complete static website with navigation, search, and all features.

### Embeddable Mode

```bash
npm run build:embeddable
```

Creates minimal static pages suitable for embedding in other applications.

### Both Modes

```bash
npm run build:both
```

## Project Structure

```
├── components/           # React components
│   ├── blog/            # Blog-specific components
│   └── layout/          # Layout components
├── content/             # Markdown content
│   ├── blog/           # Blog posts
│   └── pages/          # Static pages
├── lib/                # Utility functions
├── public/             # Static assets
├── src/
│   └── app/           # Next.js app directory
├── types/             # TypeScript types
└── config.ts          # Blog configuration
```

## Customization

See [CUSTOMIZATION.md](CUSTOMIZATION.md) for detailed customization guide including:

- Theme colors
- Typography
- Layout modifications
- Adding new features
- RTL styling customization

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **Content**: Markdown/MDX with gray-matter
- **Search**: Fuse.js
- **Syntax Highlighting**: highlight.js
- **Typography**: @tailwindcss/typography
- **Fonts**: Geist Sans, Geist Mono, Cairo
- **Language**: TypeScript

## License

MIT License - feel free to use this for your own blog!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Author

Emad Ashraf (3omdawy)
