# Embeddable Content Fragments

The **Embeddable Content** mode allows you to use this blog framework as a high-quality "Content-as-a-Service" or "Headless Content" engine.

Instead of generating a full website with its own layout and navigation, this mode produces **pure HTML fragments** that contain only the article's body and its Table of Contents.

## 📋 Embeddable Modes Comparison

This project offers **two embeddable modes** to suit different integration needs:

| Feature                | `build:embeddable`       | `build:embeddable-bootstrap`                         |
| ---------------------- | ------------------------ | ---------------------------------------------------- |
| **CSS Framework**      | None (custom)            | Bootstrap 5 compatible                               |
| **Best For**           | Full styling control     | Existing Bootstrap/MDB projects                      |
| **CSS Included**       | No (you provide)         | Yes (`embeddable-bootstrap.css`)                     |
| **Class Names**        | Tailwind utilities       | Bootstrap utilities                                  |
| **File Size**          | Smaller                  | Slightly larger (includes CSS)                       |
| **Integration Effort** | High (custom CSS needed) | Low (drop-in ready)                                  |
| **Documentation**      | This file                | [BOOTSTRAP_EMBEDDABLE.md](./BOOTSTRAP_EMBEDDABLE.md) |

**Choose `build:embeddable`** when:

- You want complete control over styling
- You're integrating into a non-Bootstrap project
- You prefer minimal file sizes

**Choose `build:embeddable-bootstrap`** when:

- You're using Bootstrap 5 or MDB
- You want drop-in ready fragments
- You prefer convenience over customization

---

### ⚡ Single Post Fast Conversion

Instead of rebuilding the entire blog, you can convert a single `.md` or `.mdx` file to its embeddable version (either standard or Bootstrap) using:

```bash
npm run convert:md content/blog/your-post.md
```

This script automatically triggers a filtered build for that specific post and runs the fragment extractor, significantly reducing development time.

---

## 🚀 How it Works

When you run `npm run build:embeddable`, the following workflow is triggered:

1.  **Rendering**: Next.js renders the full article pages using MDX and React.
2.  **Extraction**: A post-build script (`scripts/fragment-fixer.js`) scans the generated HTML files.
3.  **Fragmenting**: The script extracts the content from the `<article>` tag and the Table of Contents.
4.  **Cleaning**:
    - **Links**: All site-specific navigation links (like categories, tags, or home) are stripped, leaving only their text.
    - **Local Anchors**: Hash-links (`#section-id`) are **preserved** so the Table of Contents continues to work within the fragment.
    - **React/Next attributes**: All internal attributes (e.g., `data-nt-pc`) are stripped for a clean HTML output.
    - **No Boilerplate**: The final files contain no `<html>`, `<head>`, or `<body>` tags.

## 📦 Output Structure

The output generated in `out/blog/*.html` follows this structure:

```html
<!-- TABLE OF CONTENTS START -->
<div class="blog-toc-snippet">
  <!-- Cleaned HTML for TOC -->
</div>
<!-- TABLE OF CONTENTS END -->

<!-- ARTICLE CONTENT START -->
<div class="blog-content-snippet">
  <article>
    <!-- Your MD/MDX converted to pure HTML -->
  </article>
</div>
<!-- ARTICLE CONTENT END -->
```

## 🛠️ Usage Example

You can easily integrate these fragments into an existing application (e.g., a custom Dashboard or a CMS):

### 1. Simple PHP Include

```php
<div class="my-article-container">
    <?php echo file_get_contents('path/to/extracted/article.html'); ?>
</div>
```

### 2. React Integration

```jsx
function ArticleEmbed({ htmlFragment }) {
  return <div className="prose-container" dangerouslySetInnerHTML={{ __html: htmlFragment }} />;
}
```

### 3. Recommended Styles

Since the fragments are stripped of Next.js-specific styles, you should add these base styles to your host application to ensure the Table of Contents and Typography look correct:

```css
/* Table of Contents Styling */
.blog-toc-snippet nav {
  position: sticky;
  top: 2rem;
  max-height: calc(100vh - 4rem);
  overflow-y: auto;
}

.blog-toc-snippet h2 {
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  color: #6b7280;
  margin-bottom: 1rem;
}

.blog-toc-snippet ul {
  list-style: none;
  padding: 0;
}

.blog-toc-snippet li {
  margin-bottom: 0.5rem;
}

.blog-toc-snippet a {
  text-decoration: none;
  color: #6b7280;
  font-size: 0.875rem;
  transition: color 0.2s;
}

.blog-toc-snippet a:hover {
  color: #111827;
}

/* Typography for the content */
.blog-content-snippet article {
  line-height: 1.6;
  color: #374151;
}

.blog-content-snippet h1,
.blog-content-snippet h2,
.blog-content-snippet h3 {
  color: #111827;
  margin-top: 2rem;
  margin-bottom: 1rem;
}
```

## 💡 Benefits for Integration

- **Style Control**: Since these are pure HTML snippets, they will inherit the typography and colors of your host application's CSS.
- **No CORS**: Because you are embedding the content directly, you avoid cross-origin resource sharing issues.
- **Preserved Rich Content**: Any raw HTML or inline CSS you write inside your Markdown files is preserved exactly as is, allowing for highly customized layouts within the content.
- **Portable**: Each article is a single, self-contained snippet.
