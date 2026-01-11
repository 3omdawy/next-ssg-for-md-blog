/**
 * Static Page fetching utilities
 */

import fs from "fs";
import path from "path";
import { parseMarkdown, markdownToHtml } from "./markdown";

const pagesDirectory = path.join(process.cwd(), "content/pages");

export function getAllPageSlugs(): string[] {
  if (!fs.existsSync(pagesDirectory)) {
    return [];
  }
  return fs
    .readdirSync(pagesDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export async function getPageBySlug(slug: string) {
  const fullPath = path.join(pagesDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { frontmatter, content } = parseMarkdown(fileContents);
  const htmlContent = await markdownToHtml(content);

  return {
    slug,
    frontmatter,
    content: htmlContent,
  };
}
