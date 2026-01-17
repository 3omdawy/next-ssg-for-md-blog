# Frequently Asked Questions (FAQ)

## General

### Is this really free to use?

Yes! The project is open-source under the MIT license. You can use it for personal, commercial, or client projects.

### Do I need to know React/Next.js to use this?

**To use it:** No. You can just manage content in Markdown strings and change config files.
**To customize it heavily:** Yes, basic knowledge of React and Tailwind CSS will help you modify components.

## Content & Features

### How do I add a new page?

Create a new markdown file in `content/pages/` (e.g., `about.md`). The framework will automatically handle the routing (though you may need to add a link to the `Header.tsx` manually if you want it in the navigation).

### How do I enable Disqus/Giscus comments?

We don't include a comment system by default to keep the framework static and privacy-focused. However, you can easily add [Giscus](https://giscus.app/) or [Disqus](https://disqus.com/) by editing `components/blog/ArticleContent.tsx` or creating a new Comment component.

### Can I use a CMS?

This framework is designed for **Git-based CMS** workflows (editing files directly). However, you could connect it to a Headless CMS by modifying `lib/posts.ts` to fetch from an API instead of the file system.

## Troubleshooting

### My images aren't loading!

Make sure your images are in the `public/` folder. If you have `public/images/mypic.jpg`, reference it in markdown as `/images/mypic.jpg` (note the leading slash).

### RTL isn't working for my Arabic post.

1. Check if you have `language: "ar"` in your post frontmatter.
2. If relying on auto-detection, ensure you have enough Arabic text in the content.
3. Check `config.ts` to ensure you haven't forced `language: "ltr"` globally.

### Build fails with "Error: Duplicate user" or similar.

Check if you have conflicting IDs in your headings. The Table of Contents generator requires unique IDs for headings.

---

_Still have questions? Open an issue on GitHub!_
