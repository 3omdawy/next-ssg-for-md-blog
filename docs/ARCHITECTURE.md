# 🏗️ Architecture & Design

This document provides a visual overview of how the **Next.js SSG Blog Framework** works, from content processing to multi-mode deployment.

## 🌟 System Overview

The framework acts as a bridge between your Markdown content and multiple deployment targets. It transforms files in `/content` into static assets optimized for standalone sites or integration into other platforms.

```mermaid
graph TD
    subgraph Input ["Source Content"]
        MD[Markdown/MDX Files]
        CFG[config.ts / site metadata]
        IMG[Assets / Images]
    end

    subgraph Core ["SSG Engine (Next.js 16)"]
        engine[Markdown Processor / MDX Bundler]
        routes[App Router / Dynamic Pages]
        comp[Premium React Components]
    end

    subgraph Modes ["Output Modes"]
        standalone["🌐 Standalone Website<br/>(Full Navigation + UI)"]
        embed["🧩 Pure HTML Fragments<br/>(Tailwind-based)"]
        bootstrap["📦 Bootstrap Fragments<br/>(MDB 5 Colors + Scoped CSS)"]
    end

    MD --> engine
    CFG --> engine
    IMG --> engine
    engine --> routes
    routes --> comp

    comp -- "npm run build" --> standalone
    comp -- "npm run build:embeddable" --> embed
    comp -- "npm run build:embeddable-bootstrap" --> bootstrap
```

---

## ⚡ Single Post Conversion Flow

When using the `convert:md` script, the framework performs a targeted build to provide near-instant HTML fragment generation.

```mermaid
sequenceDiagram
    participant User
    participant Script as convert-md-to-bootstrap.js
    participant Next as Next.js (ONLY_BUILD_SLUG)
    participant Fixer as bootstrap-fragment-fixer.js
    participant Out as Output (out/)

    User->>Script: npm run convert:md post.md
    Script->>Script: Calculate URL Slug from path
    Script->>Next: Start build with ONLY_BUILD_SLUG
    Next->>Next: Compile targeted MDX to HTML
    Next->>Out: Save raw page
    Script->>Fixer: Run Fragment Processing
    Fixer->>Fixer: Scrape <article> & ToC
    Fixer->>Fixer: Map SEO-friendly classes
    Fixer->>Out: Save final .html fragment
    Out-->>User: File ready in out/blog/
```

---

## 🎨 Component Layering Strategy

The project uses a dual-styling strategy to ensure visual consistency across different deployment targets.

```mermaid
graph LR
    subgraph Source ["React Components"]
        JSX[Post Components]
    end

    subgraph Frameworks ["Styling Engine"]
        TW[Tailwind CSS v4]
        BS[Bootstrap 5 / MDB 5]
    end

    subgraph Output ["Visual Layer"]
        Bespoke["Premium Design System<br/>(Glassmorphism, Gradients)"]
        Scoped["Scoped Embeddable CSS<br/>(Zero Interference)"]
    end

    JSX --> TW
    JSX --> BS
    TW --> Bespoke
    BS --> Scoped
```

---

## 📁 Repository Organization

```mermaid
graph dir
    Root[next-ssg-for-md-blog]

    subgraph Content ["Your Content (Modify)"]
        content_blog[content/blog/]
        public_assets[public/images/]
    end

    subgraph Framework ["Core Engine (Don't Modify)"]
        src_app[src/app/]
        lib_logic[lib/]
        scripts[scripts/]
    end

    subgraph Artifacts ["Generated Files (Deploy)"]
        out_dir[out/]
    end

    Root --> Content
    Root --> Framework
    Root --> Artifacts
```

---

## 🚀 Deployment Pipeline

```mermaid
flowchart LR
    Write[Write Markdown] --> Build[Build Mode Selection]
    Build --> Vercel[Deploy Standalone to Vercel]
    Build --> Embed[Copy Fragment to Dashboard]
    Build --> MDB[Include in Bootstrap CMS]
```
