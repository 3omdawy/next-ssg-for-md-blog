# Content Management Guide

This directory contains all the content for your blog.

## 📂 Structure

- `blog/`: Contains all blog post markdown files (`.md` or `.mdx`)
- `pages/`: (Optional) Static pages like About, Contact, etc.

## 📝 Creating a New Post

1. Create a new file in `blog/` with a descriptive filename (e.g., `my-new-post.md`).
2. Add the required frontmatter at the top of the file.
3. Write your content in Markdown/MDX.

### Frontmatter Template

Copy and paste this into your new file:

```markdown
---
title: "Your Post Title"
date: "YYYY-MM-DD"
author: "Your Name"
tags: ["tag1", "tag2"]
category: "General"
description: "A short summary for SEO and previews."
draft: false
---
```

### Writing Feature Highlights

#### 1. Code Blocks

Use triple backticks with a language identifier for syntax highlighting:

\`\`\`javascript
const greeting = "Hello World";
console.log(greeting);
\`\`\`

#### 2. Images

Place images in the `public/images` folder and reference them:

```markdown
![Image Alt Text](/images/my-image.jpg)
```

#### 3. Alerts & Callouts

We provide built-in Bootstrap-consistent components for important notes and alerts. You can use standard HTML `<div>` tags with the following classes:

**Alerts (Bootstrap-style):**

```markdown
<div class="alert alert-primary">Primary alert for important info.</div>
<div class="alert alert-success">Success alert for completed tasks.</div>
<div class="alert alert-danger">Danger alert for warnings or errors.</div>
<div class="alert alert-warning">Warning alert for caution.</div>
<div class="alert alert-info">Info alert for general helpful data.</div>
```

**Notes (Callout-style):**

```markdown
<div class="note note-info">Helpful information note with a side border.</div>
<div class="note note-warning">Cautionary note with a side border.</div>
<div class="note note-danger">Critical warning note with a side border.</div>
```

**Standard Blockquotes:**
You can also use standard markdown blockquotes:

> **Note:** This is a standard markdown blockquote.

## 🏷️ Tags & Categories

- **Tags**: Use lowercase, hyphenated strings properly (e.g., `react-hooks`, `web-performance`).
- **Categories**: Use consistent capitalization (e.g., `React`, `Backend`, `Tutorials`).

## 🙈 Drafts

To work on a post without publishing it, set `draft: true` in the frontmatter. It will be visible in development mode but excluded from the production build.
