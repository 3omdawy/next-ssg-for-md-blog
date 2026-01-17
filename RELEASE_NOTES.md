# Release Notes - v1.0.0

**Date:** 2026-01-17

🚀 We are thrilled to announce the public launch of the **Next.js SSG Blog Framework**! This v1.0.0 release brings a production-ready, feature-rich blogging solution designed for developers, writers, and especially those needing robust RTL support.

## 🌟 Highlights

### 1. 🌍 First-Class RTL Support (Arabic & More)

Unlike many frameworks where RTL is an afterthought, we built this with RTL in mind from day one.

- **Auto-detection**: The framework automatically detects language direction per post.
- **Native Layouts**: Proper alignment, margins, and typography for Arabic and other RTL languages.
- **Mixed Content**: Seamlessly handle blogs with both English and Arabic posts.

### 2. 🔌 Dual Deployment Modes

A unique feature that allows you to use your blog in two ways:

- **Standalone Website**: A complete, full-featured blog with navigation, search, and themes.
- **Embeddable Fragments**: Generate pure HTML "fragments" (content-only) to embed articles inside other applications (like Dashboards, LMS, or legacy CMS) without iframes.

### 3. ⚡ Modern Tech Stack

Built on the bleeding edge for maximum performance and developer experience:

- **Next.js 16 (App Router)**: Utilizing React Server Components and Static Exports.
- **Tailwind CSS v4**: The latest engine for blazing fast styling.
- **TypeScript**: Fully typed codebase for confidence and easy refactoring.
- **MDX Support**: Write rich, interactive content with React components inside your Markdown.

## 🎨 Key Features

- **Beautiful UI**: Polished, responsive design with automatic Dark/Light mode.
- **Search System**: Fast, client-side fuzzy search using Fuse.js.
- **Series Support**: Group related posts into sequential series with dedicated navigation.
- **SEO Optimized**: Built-in metadata, OpenGraph tags, and sitemap generation support.
- **Performance**: 100/100 Lighthouse scores, minimal JS payload.

## 📦 Getting Started

Ready to build your blog?

1. **Fork & Clone**: Get the code.
2. **Install**: `npm install`
3. **Customize**: Edit `config.ts` and add your content to `content/blog`.
4. **Deploy**: Push to Vercel/Netlify for instant deployment.

See `README.md` and `CUSTOMIZATION.md` for full guides.

## 🔄 Migration Guide

_This is the initial release._

If you were using a beta version (`0.x`), no breaking changes are expected, but we recommend a fresh clone to ensure you have all the latest config files and structure.

---

**Thank you for using Next.js SSG Blog Framework!**
If you find a bug or have a suggestion, please open an issue in the repository.
