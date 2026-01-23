# Bootstrap-Compatible Embeddable Mode

This guide explains how to use the **Bootstrap-embeddable mode** to integrate your blog content into existing Bootstrap 5 or MDB (Material Design for Bootstrap) projects.

## 🎯 What is Bootstrap-Embeddable Mode?

The Bootstrap-embeddable mode generates **clean HTML fragments** with Bootstrap 5-compatible classes and a self-contained CSS file. This allows you to seamlessly embed blog posts into:

- 🏢 Corporate dashboards
- 📊 Admin panels
- 🎓 Learning Management Systems (LMS)
- 📝 Content Management Systems (CMS)
- 🌐 Any Bootstrap-based web application

### Comparison with Standard Embeddable Mode

| Feature                | `build:embeddable`          | `build:embeddable-bootstrap`     |
| ---------------------- | --------------------------- | -------------------------------- |
| **CSS Framework**      | Tailwind (custom)           | Bootstrap 5 compatible           |
| **Best For**           | Custom styling from scratch | Existing Bootstrap projects      |
| **CSS Included**       | No (you provide your own)   | Yes (`embeddable-bootstrap.css`) |
| **Class Names**        | Tailwind utilities          | Bootstrap utilities              |
| **File Size**          | Smaller HTML                | Slightly larger (includes CSS)   |
| **Integration Effort** | High (custom CSS needed)    | Low (drop-in ready)              |

---

## 🚀 Quick Start

### 1. Build for Bootstrap

```bash
npm run build:embeddable-bootstrap
```

### 1b. Fast Build (Single Post)

If you only want to convert a specific post, use the fast conversion script:

```bash
npm run convert:md content/blog/your-post.md
```

This will automatically generate the HTML fragment and its associated CSS/JS in the `out/` directory.

This generates:

- HTML fragments in `out/blog/*.html` with Bootstrap classes
- `out/embeddable-bootstrap.css` - Self-contained CSS file

### 2. Include in Your Bootstrap Project

**Option A: Link to CSS and JS files**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Your Bootstrap CSS -->
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
      rel="stylesheet"
    />

    <!-- Blog embeddable CSS -->
    <link rel="stylesheet" href="path/to/embeddable-bootstrap.css" />
  </head>
  <body>
    <div class="container my-5">
      <!-- Your blog fragment here -->
      <?php include 'path/to/blog/post.html'; ?>
    </div>

    <!-- Blog embeddable JS (Required for interactivity) -->
    <script src="path/to/embeddable-bootstrap.js" defer></script>
  </body>
</html>
```

**Option B: Inline the fragment**

```html
<div class="container my-5">
  <!-- Copy-paste the fragment content here -->
  <div class="blog-content-snippet">
    <article>
      <!-- Blog content -->
    </article>
  </div>
</div>
```

---

## 📦 Output Structure

Each generated HTML file contains:

```html
<!-- Bootstrap-Compatible Blog Fragment -->
<!-- Include embeddable-bootstrap.css and embeddable-bootstrap.js in your project -->
<link rel="stylesheet" href="embeddable-bootstrap.css" />
<script src="embeddable-bootstrap.js" defer></script>

<!-- TABLE OF CONTENTS START -->
<div class="blog-toc-snippet">
  <nav>
    <h2>Table of Contents</h2>
    <ul>
      <li><a href="#section-1">Section 1</a></li>
      <!-- ... -->
    </ul>
  </nav>
</div>
<!-- TABLE OF CONTENTS END -->

<!-- ARTICLE CONTENT START -->
<div class="blog-content-snippet">
  <article>
    <!-- Your markdown converted to Bootstrap-compatible HTML -->
    <h1>Post Title</h1>
    <p>Content...</p>
  </article>
</div>
<!-- ARTICLE CONTENT END -->
```

---

## 🔧 Integration Examples

### PHP / Laravel

```php
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog Post</title>

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Blog CSS -->
    <link rel="stylesheet" href="{{ asset('css/embeddable-bootstrap.css') }}">
</head>
<body>
    <div class="container my-5">
        <div class="row">
            <!-- Table of Contents Sidebar -->
            <div class="col-lg-3">
                <?php
                    $content = file_get_contents('path/to/blog/post.html');
                    // Extract TOC
                    preg_match('/<!-- TABLE OF CONTENTS START -->(.*?)<!-- TABLE OF CONTENTS END -->/s', $content, $toc);
                    echo $toc[1] ?? '';
                ?>
            </div>

            <!-- Main Content -->
            <div class="col-lg-9">
                <?php
                    // Extract article content
                    preg_match('/<!-- ARTICLE CONTENT START -->(.*?)<!-- ARTICLE CONTENT END -->/s', $content, $article);
                    echo $article[1] ?? '';
                ?>
            </div>
        </div>
    </div>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

### React / Next.js

```jsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./embeddable-bootstrap.css";

function BlogPost({ htmlContent }) {
  // Extract TOC and article
  const tocMatch = htmlContent.match(
    /<!-- TABLE OF CONTENTS START -->([\s\S]*?)<!-- TABLE OF CONTENTS END -->/
  );
  const articleMatch = htmlContent.match(
    /<!-- ARTICLE CONTENT START -->([\s\S]*?)<!-- ARTICLE CONTENT END -->/
  );

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-lg-3">
          <div dangerouslySetInnerHTML={{ __html: tocMatch?.[1] || "" }} />
        </div>
        <div className="col-lg-9">
          <div dangerouslySetInnerHTML={{ __html: articleMatch?.[1] || "" }} />
        </div>
      </div>
    </div>
  );
}

export default BlogPost;
```

### WordPress Theme

```php
<?php
/**
 * Template Name: Blog Post Embed
 */
get_header();
?>

<div class="container my-5">
    <div class="row">
        <div class="col-lg-3">
            <?php
            // Load TOC from custom field or file
            $post_html = get_post_meta(get_the_ID(), 'blog_fragment_html', true);
            if ($post_html) {
                preg_match('/<!-- TABLE OF CONTENTS START -->(.*?)<!-- TABLE OF CONTENTS END -->/s', $post_html, $toc);
                echo $toc[1] ?? '';
            }
            ?>
        </div>
        <div class="col-lg-9">
            <?php
            if ($post_html) {
                preg_match('/<!-- ARTICLE CONTENT START -->(.*?)<!-- ARTICLE CONTENT END -->/s', $post_html, $article);
                echo $article[1] ?? '';
            }
            ?>
        </div>
    </div>
</div>

<?php get_footer(); ?>
```

### Vanilla HTML + JavaScript

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Blog Post</title>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="embeddable-bootstrap.css" />
  </head>
  <body>
    <div class="container my-5">
      <div class="row">
        <div class="col-lg-3" id="toc-container"></div>
        <div class="col-lg-9" id="article-container"></div>
      </div>
    </div>

    <script>
      // Fetch and inject blog content
      fetch("blog/welcome.html")
        .then((response) => response.text())
        .then((html) => {
          // Extract TOC
          const tocMatch = html.match(
            /<!-- TABLE OF CONTENTS START -->([\s\S]*?)<!-- TABLE OF CONTENTS END -->/
          );
          if (tocMatch) {
            document.getElementById("toc-container").innerHTML = tocMatch[1];
          }

          // Extract article
          const articleMatch = html.match(
            /<!-- ARTICLE CONTENT START -->([\s\S]*?)<!-- ARTICLE CONTENT END -->/
          );
          if (articleMatch) {
            document.getElementById("article-container").innerHTML = articleMatch[1];
          }

          // Important: Re-initialize interactive components (accordions, carousels, etc.)
          if (window.initPremiumComponents) {
            window.initPremiumComponents();
          }
        });
    </script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
  </body>
</html>
```

---

## 🎨 Customization

### Customizing Colors

The CSS file uses Bootstrap-compatible CSS custom properties. You can override them:

```css
/* In your main CSS file, after including embeddable-bootstrap.css */
:root {
  --bs-primary: #your-brand-color;
  --bs-link-color: #your-link-color;
  --bs-body-font-family: "Your Font", sans-serif;
}
```

### Dark Mode

The CSS supports Bootstrap 5.3+ dark mode:

```html
<!-- Enable dark mode -->
<html data-bs-theme="dark">
  <!-- Your content -->
</html>
```

Or use the `.dark` class:

```html
<body class="dark">
  <!-- Your content -->
</body>
```

### RTL Support

For right-to-left languages (Arabic, Hebrew, etc.):

```html
<html dir="rtl" lang="ar">
  <!-- Your content -->
</html>
```

The CSS automatically adjusts layouts for RTL.

---

## 🧩 Premium Components

All premium components work with Bootstrap. They use `premium-*` classes that are defined in `embeddable-bootstrap.css`.

### Accordion

```html
<div class="premium-accordion-group">
  <div class="premium-accordion-item">
    <button class="premium-accordion-header">
      <span class="premium-accordion-title">Section Title</span>
      <span class="premium-accordion-icon">▼</span>
    </button>
    <div class="premium-accordion-collapse">
      <div class="premium-accordion-body">Content here...</div>
    </div>
  </div>
</div>
```

### Buttons

```html
<button class="premium-btn premium-btn-primary">Primary Button</button>
<button class="premium-btn premium-btn-secondary">Secondary Button</button>
<button class="premium-btn premium-btn-outline-primary">Outline Button</button>
```

### Badges

```html
<span class="premium-badge premium-badge-primary">Primary</span>
<span class="premium-badge premium-badge-success">Success</span>
<span class="premium-badge premium-badge-danger">Danger</span>
```

### Carousel

```html
<div class="premium-carousel">
  <div class="premium-carousel-inner">
    <div class="premium-carousel-item active">
      <img src="image1.jpg" alt="Slide 1" />
      <div class="premium-carousel-caption">
        <h3>Slide Title</h3>
      </div>
    </div>
    <!-- More slides... -->
  </div>
  <button class="premium-carousel-nav prev">‹</button>
  <button class="premium-carousel-nav next">›</button>
</div>
```

---

## 📐 Layout Recommendations

### Two-Column Side-by-Side Layout (Recommended)

To achieve the side-by-side sticky layout (as seen in the main app), wrap the ToC and Content fragments in a `.blog-embed-wrapper` div. This is already handled for you if you use the `convert:md` script or the latest build tools.

```html
<div class="blog-embed-wrapper">
  <!-- Sidebar part -->
  <div class="blog-toc-snippet">
    <!-- TOC content -->
  </div>

  <!-- Main content part -->
  <div class="blog-content-snippet">
    <!-- Article content -->
  </div>
</div>
```

**Customization:**

- **Sticky ToC**: The ToC is sticky by default on screens ≥ 992px.
- **ToC on Left**: Use `<div class="blog-embed-wrapper blog-toc-left">` to move the ToC to the left side on large screens.

### Manual Two-Column Layout (Custom Rows/Cols)

If you prefer to use standard Bootstrap row/column classes manually:

### Full-Width Layout (No TOC)

```html
<div class="container my-5">
  <div class="row justify-content-center">
    <div class="col-lg-8">
      <div class="blog-content-snippet">
        <!-- Article content -->
      </div>
    </div>
  </div>
</div>
```

### Card-Based Layout

```html
<div class="container my-5">
  <div class="card shadow">
    <div class="card-body">
      <div class="blog-content-snippet">
        <!-- Article content -->
      </div>
    </div>
  </div>
</div>
```

---

## 🔍 Troubleshooting

### Styles Not Applying

**Problem**: Blog content doesn't look styled.

**Solution**: Ensure `embeddable-bootstrap.css` is loaded **after** Bootstrap CSS:

```html
<link href="bootstrap.min.css" rel="stylesheet" />
<link href="embeddable-bootstrap.css" rel="stylesheet" />
<!-- After Bootstrap -->
```

### Bootstrap Classes Conflicting

**Problem**: Some Bootstrap utilities override blog styles.

**Solution**: The blog uses scoped classes (`.blog-content-snippet`, `.blog-toc-snippet`). Ensure your fragments are wrapped in these containers.

### Dark Mode Not Working

**Problem**: Dark mode styles not applying.

**Solution**: Add `data-bs-theme="dark"` to the `<html>` tag or `.dark` class to `<body>`:

```html
<html data-bs-theme="dark"></html>
```

### TOC Links Not Working

**Problem**: Table of Contents links don't scroll to sections.

**Solution**: Ensure the fragment IDs are preserved. The script automatically keeps hash links (`#section-id`).

### Images Not Loading

**Problem**: Images in blog posts show broken links.

**Solution**: Copy the entire `out/` directory including images, or update image paths to absolute URLs before building.

---

## 📊 File Size & Performance

### CSS File Size

The `embeddable-bootstrap.css` file is approximately **15-20 KB** (minified), which includes:

- Typography styles
- Premium component styles
- RTL support
- Dark mode support
- Utility classes

### Optimization Tips

1. **Minify CSS**: Use a CSS minifier in production
2. **Gzip Compression**: Enable gzip on your server (reduces size by ~70%)
3. **CDN**: Host the CSS file on a CDN for faster loading
4. **Cache Headers**: Set long cache expiration for the CSS file

---

## 🌐 Browser Support

The generated HTML and CSS work in:

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)
- ✅ Internet Explorer 11 (with Bootstrap 5 polyfills)

---

## 🚀 Advanced Usage

### Multiple Posts on One Page

```html
<div class="container my-5">
  <div class="row">
    <div class="col-lg-6"><?php include 'blog/post1.html'; ?></div>
    <div class="col-lg-6"><?php include 'blog/post2.html'; ?></div>
  </div>
</div>
```

### Dynamic Loading with AJAX

```javascript
function loadBlogPost(slug) {
  fetch(`blog/${slug}.html`)
    .then((response) => response.text())
    .then((html) => {
      const articleMatch = html.match(
        /<!-- ARTICLE CONTENT START -->([\s\S]*?)<!-- ARTICLE CONTENT END -->/
      );
      document.getElementById("blog-container").innerHTML = articleMatch?.[1] || "";
    });
}
```

### Search Integration

```javascript
// Index blog posts for search
const posts = [
  { slug: "welcome", title: "Welcome Post", content: "..." },
  // ... more posts
];

function searchPosts(query) {
  return posts.filter(
    (post) =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.content.toLowerCase().includes(query.toLowerCase())
  );
}
```

---

## 📚 Related Documentation

- [Standard Embeddable Mode](./EMBEDDABLE_FRAGMENTS.md)
- [RTL Support](./RTL_SUPPORT.md)
- [Customization Guide](../CUSTOMIZATION.md)
- [Deployment Guide](./DEPLOYMENT.md)

---

## 💡 Best Practices

1. **Always include the CSS file** - The fragments require `embeddable-bootstrap.css` to render correctly
2. **Use semantic HTML wrappers** - Wrap fragments in Bootstrap containers for proper spacing
3. **Test dark mode** - If your app supports dark mode, test the fragments in both themes
4. **Preserve fragment structure** - Don't remove the wrapper divs (`.blog-content-snippet`, etc.)
5. **Handle images properly** - Ensure image paths are correct in your deployment
6. **Cache fragments** - Blog content rarely changes, so cache aggressively
7. **Validate HTML** - Run the generated HTML through a validator to catch issues

---

## 🆘 Need Help?

- 📖 Check the [main documentation](../README.md)
- 🐛 Report issues on [GitHub Issues](../../issues)
- 💬 Ask questions in [Discussions](../../discussions)

---

**Happy embedding!** 🎉
