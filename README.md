# Next.js SSG Blog

A modern, high-performance static blog built with Next.js 16, supporting both standalone website deployment and embeddable content modes.

## ✨ Features

### Core Functionality

- ✅ **Markdown & MDX Support** - Write content in `.md` or `.mdx` files
- ✅ **Static Site Generation** - Pre-rendered HTML for optimal performance
- ✅ **Syntax Highlighting** - Beautiful code blocks with highlight.js
- ✅ **GitHub Flavored Markdown** - Tables, task lists, and more
- ✅ **Frontmatter Support** - Rich metadata (title, date, tags, author, etc.)
- ✅ **Reading Time Estimation** - Automatic calculation
- ✅ **Table of Contents** - Auto-generated from headings
- ✅ **Draft Posts** - Hide posts in production with `draft: true`

### Design & UX

- ✅ **Dark & Light Mode** - Automatic theme switching
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Modern Typography** - Tailwind Typography plugin
- ✅ **Configurable Theme** - Easy color customization
- ✅ **Smooth Transitions** - Polished user experience

### Dual Deployment Modes

- ✅ **Standalone Website** - Full-featured blog with navigation
- ✅ **Embeddable Content** - Individual articles for integration

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
cd next-ssg-for-md-blog

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit `http://localhost:3000` to see your blog!

## 📝 Creating Content

### Add a New Blog Post

1. Create a new `.md` file in `content/blog/`:

```markdown
---
title: "Your Post Title"
date: "2024-12-28"
author: "Your Name"
tags: ["tag1", "tag2"]
category: "Category Name"
description: "A brief description for SEO"
draft: false
---

## Your Content Here

Write your blog post content using markdown...
```

2. The post will automatically appear on your blog!

### Frontmatter Fields

| Field         | Type                | Required | Description        |
| ------------- | ------------------- | -------- | ------------------ |
| `title`       | string              | ✅       | Post title         |
| `date`        | string (YYYY-MM-DD) | ✅       | Publication date   |
| `author`      | string              | ❌       | Author name        |
| `tags`        | string[]            | ❌       | Post tags          |
| `category`    | string              | ❌       | Post category      |
| `description` | string              | ❌       | SEO description    |
| `image`       | string              | ❌       | Cover image path   |
| `draft`       | boolean             | ❌       | Hide in production |

## 🏗️ Project Structure

```
next-ssg-for-md-blog/
├── src/
│   └── app/                    # Next.js App Router
│       ├── page.tsx            # Homepage
│       ├── blog/
│       │   ├── page.tsx        # Blog index
│       │   └── [slug]/
│       │       └── page.tsx    # Individual post
│       ├── layout.tsx          # Root layout
│       └── globals.css         # Global styles
├── components/
│   └── blog/
│       └── ArticleContent.tsx  # Markdown renderer
├── lib/
│   ├── markdown.ts             # Markdown processing
│   └── posts.ts                # Post utilities
├── content/
│   └── blog/                   # Your blog posts (.md files)
├── types/
│   └── index.ts                # TypeScript types
├── config.ts                   # Site configuration
├── next.config.ts              # Next.js config
└── package.json
```

## ⚙️ Configuration

Edit `config.ts` to customize your blog:

```typescript
export const config = {
  buildMode: "standalone", // or 'embeddable'
  site: {
    name: "Your Blog Name",
    description: "Your blog description",
    url: "https://yourblog.com",
    author: "Your Name",
  },
  theme: {
    colors: {
      primary: "#3b82f6", // Customize colors
      accent: "#8b5cf6",
    },
  },
  content: {
    postsPerPage: 10,
    excerptLength: 160,
  },
};
```

## 🎨 Customizing Themes

### Colors

Update `src/app/globals.css` to change theme colors:

```css
:root {
  --primary: #3b82f6; /* Your primary color */
  --accent: #8b5cf6; /* Your accent color */
  /* ... */
}
```

### Typography

The blog uses Tailwind Typography. Customize in `globals.css`:

```css
.prose {
  --tw-prose-body: var(--foreground);
  --tw-prose-headings: var(--foreground);
  --tw-prose-links: var(--primary);
  /* ... */
}
```

## 📦 Building for Production

### Standalone Website

```bash
npm run build:standalone
```

Output: `out/` directory with complete HTML site

### Embeddable Content

```bash
npm run build:embeddable
```

Output: Individual article HTML files for embedding

### Both Modes

```bash
npm run build:both
```

### Testing locally

You need to serve the files by an HTTP server, for example with `python -m http.server 3000` or `npx serve`.

```bash
npx serve out -l 3000
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Deploy!

### Netlify

1. Connect your repository
2. Build command: `npm run build`
3. Publish directory: `out`

### Other Static Hosts

Any static hosting service works:

- GitHub Pages
- AWS S3 + CloudFront
- Cloudflare Pages
- etc.

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + Typography plugin
- **Markdown:** remark + rehype ecosystem
- **Syntax Highlighting:** highlight.js
- **Deployment:** Static export

## 📚 Key Dependencies

```json
{
  "next": "16.1.1",
  "react": "19.2.3",
  "tailwindcss": "^4",
  "@tailwindcss/typography": "^0.5.19",
  "gray-matter": "^4.0.3",
  "remark": "^15.0.1",
  "remark-gfm": "^4.0.1",
  "rehype-highlight": "^7.0.2",
  "highlight.js": "^11.11.1"
}
```

## 🎯 Roadmap

### Phase 1: MVP (✅ Complete)

- [x] Basic markdown rendering
- [x] Blog post pages
- [x] Homepage with latest posts
- [x] Syntax highlighting
- [x] Dark/light mode
- [x] Responsive design

### Phase 2: Enhanced Features (Planned)

- [ ] Search functionality
- [ ] Tag/category filtering
- [ ] Related posts
- [ ] RSS feed
- [ ] Sitemap generation
- [ ] SEO optimization

### Phase 3: Advanced (Future)

- [ ] Comments (Giscus)
- [ ] Analytics integration
- [ ] Newsletter signup
- [ ] Social sharing
- [ ] Performance monitoring

## 🤝 Contributing

This is a personal project, but suggestions and improvements are welcome!

## 📄 License

MIT License - feel free to use this for your own blog!

## 🙏 Acknowledgments

- Built following the [Next.js SSG documentation](https://nextjs.org/docs/pages/building-your-application/rendering/static-site-generation)
- Inspired by [Intermediate React v6 course](https://intermediate-react-v6.holt.courses/)
- Uses the excellent [Tailwind Typography](https://tailwindcss.com/docs/typography-plugin) plugin

---

**Happy blogging! 📝**
