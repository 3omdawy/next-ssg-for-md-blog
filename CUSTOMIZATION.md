# 🎨 Customization Guide

This guide shows you exactly what to customize to make this blog your own. Everything else is the framework and should work out-of-the-box!

## 📂 What to Customize

### 🔴 **MUST CUSTOMIZE** - These define your blog

#### 1. `/content/` - Your Blog Content

This is where all your blog posts and pages live.

**Structure:**

```
content/
├── blog/           # Your blog posts (.md or .mdx files)
│   ├── my-post.md
│   ├── interactive-post.mdx
│   └── another-post.md
└── pages/          # Static pages (about, contact, etc.)
    └── about.md
```

**What to do:**

- ✅ Delete example posts or keep them as reference
- ✅ Add your own `.md` or `.mdx` files with proper frontmatter
- ✅ Organize posts in subdirectories if using series

**Example post structure:**

```markdown
---
title: "My First Post"
date: "2026-01-05"
author: "Your Name"
tags: ["tag1", "tag2"]
category: "Category"
description: "Post description"
---

Your content here...
```

#### 🚀 **MDX Support**

You can use `.mdx` files to add interactive React components to your blog posts. Simply create a file with the `.mdx` extension in the `/content/blog/` folder.

**Example MDX:**

```mdx
---
title: "Interactive Post"
date: "2026-01-08"
---

<div style={{ padding: "1rem", background: "#eee", borderRadius: "8px" }}>
  This is a React component in my blog!
</div>
```

#### ✨ Premium UI Components (Bespoke Design System)

We've upgraded the blog engine with a **Premium Bespoke Design System**. While these components are inspired by the **Bootstrap 5** API, they use a custom implementation (`premium-*` classes) to deliver high-end features like glassmorphism, dynamic gradients, and buttery-smooth animations that standard Bootstrap cannot provide.

**What is Compatible:**

- ✅ **API Familiarity**: Props like `variant="primary"` or `size="lg"` follow standard Bootstrap conventions.
- ✅ **Utility Classes**: Standard utility classes like `.btn-primary`, `.badge-success`, and `.bg-primary` are mapped to our premium design tokens.
- ✅ **Responsive & RTL**: Full support for mobile layouts and RTL (Right-to-Left) languages.

**What is Bespoke:**

- 🎨 **Visual Design**: Uses custom shadows, blurs, and weighted transitions.
- 🏗️ **DOM Structure**: Complex components (Accordion, Carousel) use a bespoke internal structure to support advanced animations and avoid visibility issues found in standard Bootstrap/MDB ports.
- 🚀 **Performance**: Optimized React components that handle state and transitions more reliably.

**Available Components:**

- `<AccordionGroup>` & `<Accordion title="...">` - Premium collapsible sections
- `<Checkbox label="..." checked={true} />` - Interactive animated checkboxes
- `<Icon name="..." size={20} color="..." />` - 1000+ Lucide icons
- `<Audio src="..." title="..." />` - Glass-styled media player
- `<Video src="..." poster="..." title="..." />` - Responsive HD video player
- `<Button variant="primary/secondary/outline-primary" size="sm/lg">` - High-impact buttons
- `<Badge variant="primary/success/danger/warning/info">` - Vibrant status tags
- `<FancyQuote header="..." footer="..." icon="...">` - Cinematic blockquotes
- `<Streak title="..." description="..." />` - Full-width "Wow" sections
- `<Carousel items={[{image, title}, ...]} />` - Animated image showcase with overlays
- `<Animate type="fade-in/pulse">` - High-intent micro-animations
- `<TableWrapper>` - Elegant responsive data tables

**How to use:**
Check the `content/blog/ui-components-showcase.mdx` file for live examples and interactive demos.

#### 2. `/public/` - Your Assets

Store images, favicon, robots.txt, etc.

**What to do:**

- ✅ Replace `favicon.ico` with your own
- ✅ Add your images for blog posts
- ✅ Add `robots.txt`, `sitemap.xml` if needed
- ✅ Add any other static assets

#### 3. `config.ts` - Site Configuration

Your blog's metadata and settings.

```typescript
export const config = {
  site: {
    name: "Your Blog Name", // ⬅️ CHANGE THIS
    description: "Your description", // ⬅️ CHANGE THIS
    url: "https://yourdomain.com", // ⬅️ CHANGE THIS
    author: "Your Name", // ⬅️ CHANGE THIS
  },
  content: {
    postsPerPage: 10,
    excerptLength: 160,
  },
};
```

### 🟡 **SHOULD CUSTOMIZE** - Make it yours

#### 4. `src/app/globals.css` - Theme Colors

Customize the color scheme to match your brand.

```css
@theme {
  /* Change these to your brand colors */
  --color-primary: #3b82f6; /* Your primary color */
  --color-accent: #8b5cf6; /* Your accent color */
  --color-background: #ffffff;
  /* ... more colors ... */
}

.dark {
  /* Adjust for dark mode */
  --color-primary: #60a5fa;
  /* ... */
}
```

**Popular color schemes:**

- **Tech/Professional**: Blue (#3b82f6) + Purple (#8b5cf6) ✅ Current
- **Nature/Eco**: Green (#10b981) + Teal (#14b8a6)
- **Creative/Bold**: Pink (#ec4899) + Orange (#f97316)
- **Minimal/Elegant**: Slate (#64748b) + Indigo (#6366f1)

#### 5. `components/layout/Header.tsx` - Navigation

Customize your header links and branding.

**Current structure:**

```tsx
<Link href="/">Home</Link>
<Link href="/blog">Blog</Link>
<Link href="/tags">Tags</Link>
<Link href="/about">About</Link>
```

**What to customize:**

- ✅ Add/remove navigation links
- ✅ Change site title/logo
- ✅ Modify header layout

### 🟢 **OPTIONAL** - Advanced customization

#### 6. Font Configuration

Change fonts in `src/app/layout.tsx`:

```typescript
import { Geist, Geist_Mono } from "next/font/google";

// Replace with your preferred Google Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
```

#### 7. Metadata & SEO

Update in individual page files:

```typescript
export const metadata = {
  title: "Your Page Title",
  description: "Your page description",
  openGraph: {
    // Add Open Graph tags
  },
};
```

## 🚫 What NOT to Modify

These are framework files - only modify if you need to change functionality:

### ⚙️ Framework/Engine Files (Leave Alone Unless Extending)

```
src/
├── app/
│   ├── [slug]/         # Dynamic page routing
│   ├── blog/           # Blog listing & post pages
│   ├── categories/     # Category pages
│   ├── tags/           # Tag pages
│   ├── series/         # Series pages
│   └── layout.tsx      # Root layout (except fonts)
├── components/
│   ├── blog/           # Blog components
│   └── layout/         # Layout components
└── lib/                # Utility functions

lib/
├── markdown.ts         # Markdown processing
├── posts.ts           # Post utilities
└── ...

types/                  # TypeScript types
next.config.ts         # Next.js configuration
tsconfig.json          # TypeScript configuration
package.json           # Dependencies
```

## 🎯 Quick Start Checklist

Use this checklist when setting up your blog:

- [ ] **Fork/Clone** the repository
- [ ] **Install** dependencies: `npm install`
- [ ] **Update** `config.ts` with your info
- [ ] **Replace** content in `/content/blog/` with your posts
- [ ] **Replace** `/public/favicon.ico` with your favicon
- [ ] **Customize** colors in `src/app/globals.css`
- [ ] **Update** navigation in `components/layout/Header.tsx`
- [ ] **Test** locally: `npm run dev`
- [ ] **Build** for production: `npm run build`
- [ ] **Deploy** to your hosting platform

## 📚 Example Workflows

### Starting Fresh (Remove Example Content)

```bash
# Remove example posts
rm -rf content/blog/*

# Keep the structure
mkdir -p content/blog
mkdir -p content/pages

# Create your first post
touch content/blog/my-first-post.md
```

### Keeping Examples as Reference

```bash
# Rename examples folder
mv content/blog content/blog-examples

# Create your content folder
mkdir content/blog

# Reference examples when needed
```

### Customizing for a Specific Niche

**Tech Blog:**

```typescript
// config.ts
export const config = {
  site: {
    name: "DevBytes",
    description: "Practical programming tutorials",
    // ...
  },
};

// Colors: Blue + Purple (already set!)
```

**Food Blog:**

```typescript
// config.ts
export const config = {
  site: {
    name: "Recipe Corner",
    description: "Delicious recipes from my kitchen",
    // ...
  }
};

// Colors: Warm orange + Red
--color-primary: #f97316;
--color-accent: #ef4444;
```

**Travel Blog:**

```typescript
// config.ts
export const config = {
  site: {
    name: "Wanderlust Diaries",
    description: "Exploring the world one city at a time",
    // ...
  }
};

// Colors: Teal + Cyan
--color-primary: #14b8a6;
--color-accent: #06b6d4;
```

### 8. Fragments & Embeddable Content

If you are integrating this blog into another application (like a dashboard or CMS), you can generate **pure HTML fragments** instead of full pages.

- **How to Build**: Run `npm run build:embeddable`
- **What it does**: Extracts only the article content and Table of Contents, strips site-navigation links, and removes all boilerplate (`<html>`, `<body>`, etc.).
- **Full Guide**: See [docs/EMBEDDABLE_FRAGMENTS.md](./docs/EMBEDDABLE_FRAGMENTS.md).

## 🔧 Advanced: Extending the Framework

If you want to modify the framework itself:

### Adding New Features

1. Read existing code in `/lib` and `/components`
2. Follow the established patterns
3. Add types in `/types`
4. Test thoroughly

### Common Extensions

- **Search**: Add search functionality in `/components/blog/Search.tsx`
- **Comments**: Integrate Giscus or other comment systems
- **Analytics**: Add Google Analytics or Plausible
- **Newsletter**: Add email signup forms

## 💡 Best Practices

1. **Keep Framework Updated**: Periodically pull updates from the main repo
2. **Version Control**: Use Git branches for experiments
3. **Test Before Deploy**: Always run `npm run build` before deploying
4. **Backup Content**: Keep your `/content` folder backed up separately
5. **Document Changes**: If you modify framework files, document why

## 🆘 Need Help?

- Check `docs/` folder for detailed guides
- Look at example posts in `content/blog/`

---

**Happy blogging!** 🚀
