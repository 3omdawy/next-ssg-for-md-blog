/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Bootstrap Fragment Fixer
 *
 * Post-build script for BUILD_MODE=embeddable-bootstrap
 * Converts Tailwind classes to Bootstrap equivalents and creates clean HTML fragments
 */

const fs = require("fs");
const path = require("path");

const OUT_DIR = path.join(__dirname, "../out");
const CSS_FILE = "embeddable-bootstrap.css";

/**
 * Tailwind to Bootstrap 5 class mapping
 */
const CLASS_MAP = {
  // Display & Layout
  flex: "d-flex",
  "inline-flex": "d-inline-flex",
  block: "d-block",
  "inline-block": "d-inline-block",
  hidden: "d-none",
  grid: "d-grid",

  // Flexbox
  "flex-row": "flex-row",
  "flex-col": "flex-column",
  "flex-wrap": "flex-wrap",
  "items-start": "align-items-start",
  "items-center": "align-items-center",
  "items-end": "align-items-end",
  "justify-start": "justify-content-start",
  "justify-center": "justify-content-center",
  "justify-end": "justify-content-end",
  "justify-between": "justify-content-between",
  "justify-around": "justify-content-around",
  "gap-1": "gap-1",
  "gap-2": "gap-2",
  "gap-3": "gap-3",
  "gap-4": "gap-3",
  "gap-6": "gap-4",
  "gap-8": "gap-5",

  // Spacing (Padding)
  "p-0": "p-0",
  "p-1": "p-1",
  "p-2": "p-2",
  "p-3": "p-2",
  "p-4": "p-3",
  "p-6": "p-4",
  "p-8": "p-5",
  "px-2": "px-2",
  "px-4": "px-3",
  "px-6": "px-4",
  "py-2": "py-2",
  "py-4": "py-3",
  "py-6": "py-4",
  "pt-4": "pt-3",
  "pb-4": "pb-3",
  "pl-4": "ps-3",
  "pr-4": "pe-3",

  // Spacing (Margin)
  "m-0": "m-0",
  "m-2": "m-2",
  "m-4": "m-3",
  "m-6": "m-4",
  "m-8": "m-5",
  "mx-auto": "mx-auto",
  "mx-4": "mx-3",
  "my-4": "my-3",
  "my-6": "my-4",
  "mt-4": "mt-3",
  "mb-4": "mb-3",
  "ml-4": "ms-3",
  "mr-4": "me-3",

  // Typography
  "text-xs": "fs-6 small",
  "text-sm": "fs-6",
  "text-base": "fs-5",
  "text-lg": "fs-5",
  "text-xl": "fs-4",
  "text-2xl": "fs-3",
  "text-3xl": "fs-2",
  "text-4xl": "fs-1",
  "font-bold": "fw-bold",
  "font-semibold": "fw-semibold",
  "font-medium": "fw-medium",
  "font-normal": "fw-normal",
  "text-center": "text-center",
  "text-left": "text-start",
  "text-right": "text-end",
  uppercase: "text-uppercase",
  lowercase: "text-lowercase",
  capitalize: "text-capitalize",

  // Colors
  "text-primary": "text-primary",
  "text-secondary": "text-secondary",
  "text-muted": "text-muted",
  "text-white": "text-white",
  "bg-primary": "bg-primary",
  "bg-secondary": "bg-secondary",
  "bg-surface": "bg-light",
  "bg-white": "bg-white",
  "bg-gray-100": "bg-light",
  "bg-gray-800": "bg-dark",

  // Borders
  border: "border",
  "border-0": "border-0",
  "border-t": "border-top",
  "border-b": "border-bottom",
  "border-l": "border-start",
  "border-r": "border-end",
  "border-custom": "border",
  "rounded-none": "rounded-0",
  "rounded-sm": "rounded-1",
  rounded: "rounded",
  "rounded-md": "rounded-2",
  "rounded-lg": "rounded-3",
  "rounded-xl": "rounded-4",
  "rounded-full": "rounded-circle",

  // Sizing
  "w-full": "w-100",
  "w-auto": "w-auto",
  "h-full": "h-100",
  "h-auto": "h-auto",
  "max-w-prose": "mw-100",
  "max-w-screen-lg": "container",

  // Position
  relative: "position-relative",
  absolute: "position-absolute",
  fixed: "position-fixed",
  sticky: "position-sticky",

  // Shadow
  "shadow-sm": "shadow-sm",
  shadow: "shadow",
  "shadow-lg": "shadow-lg",

  // Overflow
  "overflow-hidden": "overflow-hidden",
  "overflow-auto": "overflow-auto",
  "overflow-x-auto": "overflow-x-auto",
  "overflow-y-auto": "overflow-y-auto",

  // Cursor
  "cursor-pointer": "cursor-pointer",

  // Opacity
  "opacity-0": "opacity-0",
  "opacity-50": "opacity-50",
  "opacity-75": "opacity-75",
  "opacity-100": "opacity-100",
};

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
 * Convert Tailwind classes to Bootstrap equivalents
 */
function convertClasses(html) {
  // Replace class attributes
  return html.replace(/class="([^"]*)"/g, (match, classes) => {
    const classArray = classes.split(/\s+/);
    const convertedClasses = classArray
      .map((cls) => {
        // Handle hover/focus/dark variants by stripping them
        const baseClass = cls.replace(/^(hover:|focus:|dark:)/, "");

        // Check if we have a mapping
        if (CLASS_MAP[baseClass]) {
          return CLASS_MAP[baseClass];
        }

        // Keep premium-* classes as-is (our custom components)
        if (baseClass.startsWith("premium-")) {
          return baseClass;
        }

        // Keep blog-* classes as-is
        if (baseClass.startsWith("blog-")) {
          return baseClass;
        }

        // Keep prose class
        if (baseClass === "prose") {
          return "blog-content-snippet";
        }

        // Keep Bootstrap classes as-is
        if (
          baseClass.startsWith("btn-") ||
          baseClass.startsWith("badge-") ||
          baseClass.startsWith("alert-") ||
          baseClass.startsWith("text-") ||
          baseClass.startsWith("bg-") ||
          baseClass.startsWith("border-") ||
          baseClass.startsWith("d-") ||
          baseClass.startsWith("flex-") ||
          baseClass.startsWith("justify-") ||
          baseClass.startsWith("align-") ||
          baseClass.startsWith("p-") ||
          baseClass.startsWith("m-") ||
          baseClass.startsWith("fs-") ||
          baseClass.startsWith("fw-")
        ) {
          return baseClass;
        }

        // If no mapping found, keep original (will be handled by CSS)
        return baseClass;
      })
      .filter((cls) => cls) // Remove empty strings
      .join(" ");

    return `class="${convertedClasses}"`;
  });
}

/**
 * Clean HTML and prepare for Bootstrap
 */
function cleanHtml(html) {
  let cleaned = html;

  // Convert classes
  cleaned = convertClasses(cleaned);

  // Strip Next.js / React internal attributes
  cleaned = cleaned.replace(/\s(data-[a-z-]+|suppressHydrationWarning|on[a-z]+)="[^"]*"/g, "");

  // Strip any remaining <script> or <style> tags
  cleaned = cleaned.replace(/<(script|style|link)[^>]*>[\s\S]*?<\/\1>/gi, "");

  // Remove empty class attributes
  cleaned = cleaned.replace(/\sclass=""\s*/g, " ");

  return cleaned.trim();
}

/**
 * Process fragments for Bootstrap compatibility
 */
function processFragments() {
  console.log("--- Starting Bootstrap Fragment Processing ---");

  if (!fs.existsSync(OUT_DIR)) {
    console.error("Error: out directory not found.");
    return;
  }

  const files = getAllFiles(OUT_DIR).filter((file) => file.endsWith(".html"));
  let processedCount = 0;

  files.forEach((filePath) => {
    const content = fs.readFileSync(filePath, "utf8");

    // Extract the Fragment
    const fragmentMatch = content.match(
      /<article id="article-content-fragment"[^>]*>([\s\S]*?)<\/article>/
    );
    const tocMatch = content.match(/<div id="article-toc-fragment"[^>]*>([\s\S]*?)<\/div>/);

    if (fragmentMatch) {
      console.log(`Processing: ${path.relative(OUT_DIR, filePath)}`);
      processedCount++;

      let fragmentHtml = fragmentMatch[1];
      let tocHtml = tocMatch ? tocMatch[1] : "";

      // Clean and convert to Bootstrap
      const finalFragment = cleanHtml(fragmentHtml);
      const finalToc = cleanHtml(tocHtml);

      // Assemble the final output with CSS and JS references
      let output = `<!-- Bootstrap-Compatible Blog Fragment -->\n`;
      output += `<!-- Include embeddable-bootstrap.css and embeddable-bootstrap.js in your project -->\n`;
      output += `<link rel="stylesheet" href="${CSS_FILE}">\n`;
      output += `<script src="embeddable-bootstrap.js" defer></script>\n\n`;

      // Detect direction and language from fragment if possible
      const dirMatch = fragmentHtml.match(/dir="(rtl|ltr)"/);
      const langMatch = fragmentHtml.match(/class="[^"]*(lang-[a-z]{2})[^"]*"/);

      const dirAttr = dirMatch ? ` dir="${dirMatch[1]}"` : "";
      const langClass = langMatch ? ` ${langMatch[1]}` : "";

      if (finalToc) {
        output += `<!-- SIDE-BY-SIDE LAYOUT WRAPPER -->\n<div class="blog-embed-wrapper"${dirAttr}>\n\n`;
        output += `  <!-- TABLE OF CONTENTS START -->\n  <div class="blog-toc-snippet">\n${finalToc}\n  </div>\n  <!-- TABLE OF CONTENTS END -->\n\n`;
        output += `  <!-- ARTICLE CONTENT START -->\n  <div class="blog-content-snippet${langClass}">\n    <article${dirAttr}>\n${finalFragment}\n    </article>\n  </div>\n  <!-- ARTICLE CONTENT END -->\n\n`;
        output += `</div>`;
      } else {
        output += `<!-- ARTICLE CONTENT START -->\n<div class="blog-content-snippet${langClass}">\n<article${dirAttr}>\n${finalFragment}\n</article>\n</div>\n<!-- ARTICLE CONTENT END -->`;
      }

      fs.writeFileSync(filePath, output);
    } else {
      console.log(`Skipping (No fragment found): ${path.relative(OUT_DIR, filePath)}`);
    }
  });

  console.log(`--- Processed ${processedCount} fragments ---`);

  // Copy CSS file to out directory
  const cssSource = path.join(__dirname, "../public", CSS_FILE);
  const cssDestination = path.join(OUT_DIR, CSS_FILE);

  if (fs.existsSync(cssSource)) {
    fs.copyFileSync(cssSource, cssDestination);
    console.log(`✓ Copied ${CSS_FILE} to output directory`);

    // Report CSS file size
    const stats = fs.statSync(cssDestination);
    const fileSizeInKB = (stats.size / 1024).toFixed(2);
    console.log(`✓ CSS file size: ${fileSizeInKB} KB`);
  } else {
    console.warn(`⚠ Warning: ${CSS_FILE} not found in /public directory`);
  }

  // Copy JavaScript file to out directory
  const jsFile = "embeddable-bootstrap.js";
  const jsSource = path.join(__dirname, "../public", jsFile);
  const jsDestination = path.join(OUT_DIR, jsFile);

  if (fs.existsSync(jsSource)) {
    fs.copyFileSync(jsSource, jsDestination);
    console.log(`✓ Copied ${jsFile} to output directory`);

    // Report JS file size
    const jsStats = fs.statSync(jsDestination);
    const jsFileSizeInKB = (jsStats.size / 1024).toFixed(2);
    console.log(`✓ JS file size: ${jsFileSizeInKB} KB`);
  } else {
    console.warn(`⚠ Warning: ${jsFile} not found in /public directory`);
  }

  console.log("--- Bootstrap Fragment Processing Complete ---");
}

processFragments();
