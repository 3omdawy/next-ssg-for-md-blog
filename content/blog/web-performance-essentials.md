---
title: "Web Performance: Build Faster Websites & Web Applications 🚀"
date: "2024-12-28"
author: "Yoga"
tags: ["performance", "web-vitals", "optimization", "frontend"]
category: "Performance"
description: "A comprehensive guide to web performance concepts, metrics (Core Web Vitals), and debugging strategies for building faster websites."
draft: false
---

## 📌 Scope

**Web Performance =**

- How quickly the page is displayed.
- How quickly it responds to user actions.

⚠️ Note: This does **not** include re-rendering performance when state changes in frameworks like React (that falls under React-specific performance optimization).

---

## 🤔 Why Care About Performance?

- **Core Web Vitals** (Google’s performance metrics) directly affect your **SEO score** and **search ranking**.
- Faster websites = **happier users** = **higher conversion rates**.

---

## ⚖️ Measuring Performance

You can measure performance in two main ways:

### 1. **Lab Data**

- Tools: **Google Lighthouse**, **PageSpeed Insights**
- Run Lighthouse locally:
  - Simulate device (e.g., iPhone 12 Pro)
  - Simulate network (e.g., Slow 4G)
  - Simulate CPU throttle (e.g., 6× slowdown)

![Lighthouse Report Example](https://developer.chrome.com/static/docs/lighthouse/overview/image/lighthouse-report_856.png)

### 2. **Field Data**

- Build your own **Real User Monitoring (RUM)** tool.
- Or use a **3rd party service** (e.g., New Relic, Datadog, SpeedCurve).

---

## 📊 Core Web Vitals

Google groups web performance into three major categories:

### 1. How Fast Elements Load

This is an **aggregate of 3 metrics**:

![LCP Metric](https://web.dev/static/articles/lcp/image/good-lcp-values.svg)  
_Image: Google Web.dev_

#### 1.a Time to First Byte (TTFB)

How quickly the server responds with the first piece of data.

**Improvements:** Optimize hosting & server configuration (Ops work).

- Enable compression: **Gzip** or **Brotli**.
- Use efficient protocols: **HTTP/3**.
- Increase server capacity.
- Use **CDNs** to serve content closer to users.

---

#### 1.b First Contentful Paint (FCP)

How quickly the page shows the first visible content.

**Improvements:**

- Bundle assets (Webpack, Vite) to reduce requests.
- Preload critical resources (e.g., fonts).
- Lazy-load non-critical resources (e.g., defer JavaScript).

---

#### 1.c Largest Contentful Paint (LCP)

How fast the most important (largest) element is visible.

**Improvements:**

- Preload & lazy-load to prioritize above-the-fold content.
- Optimize images: use modern formats (**WebP, AVIF**) and responsive sizes.

💡 **Note on caching:**  
Caching (images, CSS, JS) via HTTP headers is an excellent optimization for returning visitors. However, caching **does not count** in Core Web Vitals.

![LCP Example](https://web.dev/static/articles/lcp/image/largest-contentful-paint-fc43128e011aa_856.png)  
_Image: Example of Largest Contentful Paint element._

---

### 2. Cumulative Layout Shift (CLS)

How smooth and predictable the page layout is while loading.

![CLS Metric](https://web.dev/static/articles/cls/image/good-cls-values.svg)  
_Image: Google Web.dev_

**Improvements:**

- Reserve space for elements (e.g., set width/height for images).
- Ensure lazy-loaded content doesn’t shift existing elements.

![CLS Example](https://cdn-aahbe.nitrocdn.com/atRjhaAsMHbPaZMOukHscOVOXfGAsiqT/assets/images/optimized/rev-1074f35/nitropack.ams3.cdn.digitaloceanspaces.com/upload/blog/cls-ad-banner_771f0e7.png)  
_Ad / banner: Example of a bad layout shift._

---

### 3. Interaction to Next Paint (INP)

How quickly a page responds to user interaction (e.g., clicking a button).

![INP Metric](https://web.dev/static/articles/inp/image/inp-desktop-v2.svg)  
_Image: Google Web.dev_

**Improvements:**

- **Yield the main thread**: give instant feedback, then offload work.
- Use async APIs: `setTimeout`, `requestAnimationFrame`.

---

## 🔍 Debugging Performance

Modern browsers provide great tooling:

- **Performance Tab**

  - Shows flame charts & waterfall charts.
  - Helps identify long tasks and layout bottlenecks.

- **Network Tab**
  - Shows network request timing & caching behavior.

Both support:  
✅ Device emulation  
✅ Network throttling  
✅ CPU throttling

---

## 📚 References

- [Frontend Masters – Web Performance](https://frontendmasters.com)
- [Google Web Vitals](https://web.dev/vitals/)
