/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");

const OUT_DIR = path.join(__dirname, "../out");

/**
 * Recursively get all files in a directory
 */
function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function (file) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

/**
 * Extract article fragment and clean up HTML
 */
function processFragments() {
  console.log("--- Starting Fragment Extraction ---");

  if (!fs.existsSync(OUT_DIR)) {
    console.error("Error: out directory not found.");
    return;
  }

  const files = getAllFiles(OUT_DIR).filter((file) => file.endsWith(".html"));

  files.forEach((filePath) => {
    const content = fs.readFileSync(filePath, "utf8");

    // 1. Extract the Fragment
    // We look for the <article id="article-content-fragment"> and ToC divs
    const fragmentMatch = content.match(
      /<article id="article-content-fragment"[^>]*>([\s\S]*?)<\/article>/
    );
    const tocMatch = content.match(/<div id="article-toc-fragment"[^>]*>([\s\S]*?)<\/div>/);

    if (fragmentMatch) {
      console.log(`Extracting: ${path.relative(OUT_DIR, filePath)}`);

      let fragmentHtml = fragmentMatch[1];
      let tocHtml = tocMatch ? tocMatch[1] : "";

      // 2. Clean up Fragments
      const cleanHtml = (html) => {
        let cleaned = html;

        // A. Strip all <a> tags EXCEPT local anchor links (#)
        cleaned = cleaned.replace(
          /<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g,
          (match, href, inner) => {
            if (href.startsWith("#")) {
              return match; // Keep local anchors
            }
            return inner; // Strip the <a> tag but keep the content
          }
        );

        // B. Strip Next.js / React internal attributes for extreme cleanliness
        cleaned = cleaned.replace(/\s(data-[\w-]+|suppressHydrationWarning|on[a-z]+)="[^"]*"/g, "");

        // C. Strip any remaining <script> or <style> tags that might have leaked into the fragment
        cleaned = cleaned.replace(/<(script|style|link)[^>]*>[\s\S]*?<\/\1>/gi, "");

        return cleaned.trim();
      };

      const finalFragment = cleanHtml(fragmentHtml);
      const finalToc = cleanHtml(tocHtml);

      // 3. Assemble the final output
      // We output a structured fragment. You can easily parse this or just use the body.
      let output = "";
      if (finalToc) {
        output += `<!-- TABLE OF CONTENTS START -->\n<div class="blog-toc-snippet">\n${finalToc}\n</div>\n<!-- TABLE OF CONTENTS END -->\n\n`;
      }
      output += `<!-- ARTICLE CONTENT START -->\n<div class="blog-content-snippet">\n${finalFragment}\n</div>\n<!-- ARTICLE CONTENT END -->`;

      fs.writeFileSync(filePath, output);
    } else {
      console.log(`Skipping (No fragment found): ${path.relative(OUT_DIR, filePath)}`);
    }
  });

  console.log("--- Fragment Extraction Complete ---");
}

processFragments();
