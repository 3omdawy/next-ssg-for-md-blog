# 🎯 Project Concept

- **Input**: Markdown files (blog posts)
- **Output**: Static HTML files deployable as web pages or fragments
- **Mechanism**: Static Site Generation (SSG) via Next.js
- **Value Proposition**:
  1. **Version Control**: Content managed in Git
  2. **Accessibility**: Editable via any text editor
  3. **Performance**: Pre-rendered static HTML
  4. **Flexibility**: Dual deployment (Standalone Site vs. Embeddable Fragments)

---

# 📖 Reference

- [Intermediate React v6 course on Frontend Masters](https://intermediate-react-v6.holt.courses/lessons/react-render-modes/static-site-generation)
- [Example GitHub project that build the notes of the previous course](https://github.com/btholt/intermediate-react-v6/tree/main)
- [Next.js Static Exports Documentation](https://nextjs.org/docs/pages/building-your-application/deploying/static-exports)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

# 💡 Architecture Decisions

## Core Criteria

1. **Simplicity**: Minimal configuration required
2. **Portability**: Standard Markdown/MDX
3. **Performance**: Zero-JS runtime overhead where possible for content
4. **Integration**: Ability to embed content in other apps

## Technology Choices

### Framework: Next.js

Chosen for its robust Static Site Generation (SSG) capabilities, rich ecosystem, and "App Router" architecture which simplifies layout nesting and metadata management.

### Styling: Tailwind CSS

Chosen for its utility-first approach, allowing for a highly customizable design system without fighting specific theme overrides.

### Content: MDX

Chosen to allow rich interactivity within posts while maintaining the portability of Markdown.
