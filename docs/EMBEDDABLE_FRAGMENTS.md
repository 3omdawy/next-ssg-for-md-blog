# Embeddable Content Fragments

The **Embeddable Content** mode allows you to use this blog framework as a high-quality "Content-as-a-Service" or "Headless Content" engine.

Instead of generating a full website with its own layout and navigation, this mode produces **pure HTML fragments** that contain only the article's body and its Table of Contents.

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
  return (
    <div
      className="prose-container"
      dangerouslySetInnerHTML={{ __html: htmlFragment }}
    />
  );
}
```

## 💡 Benefits for Integration

- **Style Control**: Since these are pure HTML snippets, they will inherit the typography and colors of your host application's CSS.
- **No CORS**: Because you are embedding the content directly, you avoid cross-origin resource sharing issues.
- **Preserved Rich Content**: Any raw HTML or inline CSS you write inside your Markdown files is preserved exactly as is, allowing for highly customized layouts within the content.
- **Portable**: Each article is a single, self-contained snippet.
