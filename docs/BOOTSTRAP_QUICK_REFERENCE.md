# Quick Reference: Bootstrap Embeddable Mode

## 🚀 Quick Start

```bash
# Build for Bootstrap
npm run build:embeddable-bootstrap

# Output: out/embeddable-bootstrap.css + HTML fragments
```

## 📦 Include in Your Project

```html
<!-- 1. Include Bootstrap CSS -->
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
  rel="stylesheet"
/>

<!-- 2. Include blog CSS -->
<link rel="stylesheet" href="embeddable-bootstrap.css" />

<!-- 3. Include blog JS (for interactive components) -->
<script src="embeddable-bootstrap.js" defer></script>

<!-- 4. Include fragment -->
<div class="container"><?php include 'blog/welcome.html'; ?></div>
```

## 🎨 Dark Mode

```html
<!-- Method 1: Bootstrap 5.3+ -->
<html data-bs-theme="dark">
  <!-- Method 2: Class-based -->
  <body class="dark"></body>
</html>
```

## 🌍 RTL Support

```html
<html dir="rtl" lang="ar"></html>
```

## 📋 Fragment Structure

```html
<!-- TABLE OF CONTENTS START -->
<div class="blog-toc-snippet">
  <!-- TOC content -->
</div>
<!-- TABLE OF CONTENTS END -->

<!-- ARTICLE CONTENT START -->
<div class="blog-content-snippet">
  <article>
    <!-- Article content -->
  </article>
</div>
<!-- ARTICLE CONTENT END -->
```

## 🎯 Common Layouts

### Two-Column (TOC + Content)

```html
<div class="container my-5">
  <div class="row">
    <div class="col-lg-3">
      <!-- TOC -->
    </div>
    <div class="col-lg-9">
      <!-- Article -->
    </div>
  </div>
</div>
```

### Full-Width

```html
<div class="container my-5">
  <div class="row justify-content-center">
    <div class="col-lg-8">
      <!-- Article -->
    </div>
  </div>
</div>
```

## 🔧 Customization

```css
/* Override colors */
:root {
  --bs-primary: #your-color;
  --bs-link-color: #your-link-color;
}
```

## 🧩 Premium Components

All components work automatically:

- Accordion
- Carousel
- Buttons
- Badges
- Alerts
- Fancy Quote
- Streak

## 📚 Full Documentation

- [Complete Guide](./BOOTSTRAP_EMBEDDABLE.md)
- [Integration Examples](../examples/README.md)
- [Implementation Summary](./BOOTSTRAP_IMPLEMENTATION_SUMMARY.md)

## ⚡ Tips

1. Include CSS **after** Bootstrap
2. Use `.blog-content-snippet` wrapper
3. Test dark mode
4. Cache fragments aggressively
5. Copy entire `out/` directory (includes images)

## 🆘 Troubleshooting

**Styles not working?**  
→ Ensure CSS is loaded after Bootstrap

**Images broken?**  
→ Copy the entire `out/` directory

**TOC links not scrolling?**  
→ Use the JavaScript from `examples/bootstrap-integration.html`
