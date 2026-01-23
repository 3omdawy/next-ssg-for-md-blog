# Bootstrap Integration Examples

This directory contains example files demonstrating how to integrate the Bootstrap-embeddable blog fragments into various projects.

## 📁 Files

### `bootstrap-integration.html`

A complete, working example showing how to embed blog content into a Bootstrap 5 application.

**Features:**

- ✅ Bootstrap 5 layout with responsive grid
- ✅ Dynamic content loading via JavaScript
- ✅ Table of Contents sidebar
- ✅ Dark mode toggle
- ✅ Smooth scrolling for TOC links
- ✅ Error handling

**How to Use:**

1. Build the blog in Bootstrap mode:

   ```bash
   npm run build:embeddable-bootstrap
   ```

2. Copy the example file and the `out/` directory to your web server:

   ```bash
   cp examples/bootstrap-integration.html out/index.html
   ```

3. Serve the `out/` directory:

   ```bash
   cd out
   npx serve
   ```

4. Open `http://localhost:3000` in your browser

**Customization:**

- Change the blog post loaded by modifying line 171:

  ```javascript
  loadBlogPost("blog/welcome.html");
  ```

- Customize colors by editing the CSS variables in the `<style>` section

- Modify the layout by changing the Bootstrap grid classes

## 🚀 Integration Scenarios

### Scenario 1: Static HTML Site

Simply copy the generated HTML fragments and include them in your pages:

```html
<!DOCTYPE html>
<html>
  <head>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="embeddable-bootstrap.css" />
  </head>
  <body>
    <div class="container"><?php include 'blog/welcome.html'; ?></div>
  </body>
</html>
```

### Scenario 2: PHP/Laravel Application

```php
Route::get('/blog/{slug}', function ($slug) {
    $htmlPath = public_path("blog/{$slug}.html");

    if (!file_exists($htmlPath)) {
        abort(404);
    }

    $content = file_get_contents($htmlPath);

    return view('blog.show', [
        'content' => $content
    ]);
});
```

### Scenario 3: React/Next.js Application

```jsx
import { useEffect, useState } from "react";

export default function BlogPost({ slug }) {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(`/blog/${slug}.html`)
      .then((res) => res.text())
      .then((html) => {
        const match = html.match(
          /<!-- ARTICLE CONTENT START -->([\s\S]*?)<!-- ARTICLE CONTENT END -->/
        );
        setContent(match?.[1] || "");
      });
  }, [slug]);

  return (
    <div className="container">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
```

### Scenario 4: WordPress Theme

```php
<?php
/**
 * Template Name: Blog Embed
 */
get_header();

$post_slug = get_query_var('blog_post', 'welcome');
$blog_path = get_template_directory() . "/blog/{$post_slug}.html";

if (file_exists($blog_path)) {
    $content = file_get_contents($blog_path);
    preg_match('/<!-- ARTICLE CONTENT START -->(.*?)<!-- ARTICLE CONTENT END -->/s', $content, $matches);
    echo $matches[1] ?? '<p>Content not found</p>';
}

get_footer();
?>
```

## 📚 Additional Resources

- [Bootstrap Embeddable Documentation](../docs/BOOTSTRAP_EMBEDDABLE.md)
- [Standard Embeddable Documentation](../docs/EMBEDDABLE_FRAGMENTS.md)
- [Customization Guide](../CUSTOMIZATION.md)

## 💡 Tips

1. **Always include the CSS file** - The fragments require `embeddable-bootstrap.css`
2. **Test dark mode** - Use `data-bs-theme="dark"` on the `<html>` tag
3. **Handle RTL content** - Add `dir="rtl"` for Arabic/Hebrew posts
4. **Cache fragments** - Blog content rarely changes, cache aggressively
5. **Validate paths** - Ensure image and asset paths are correct

## 🆘 Troubleshooting

**Problem:** Styles not applying

**Solution:** Make sure `embeddable-bootstrap.css` is loaded **after** Bootstrap CSS

---

**Problem:** Images not loading

**Solution:** Copy the entire `out/` directory including the `images/` folder

---

**Problem:** TOC links not working

**Solution:** The JavaScript in the example handles smooth scrolling. Make sure it's included.

---

For more help, see the [full documentation](../docs/BOOTSTRAP_EMBEDDABLE.md).
