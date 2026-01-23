/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Parse arguments
const args = process.argv.slice(2);

if (args.length === 0) {
  console.error("Usage: npm run convert:md <path-to-md-file>");
  console.error("Example: npm run convert:md content/blog/my-post.md");
  process.exit(1);
}

const inputPath = args[0];
const fullPath = path.resolve(inputPath);
const contentDir = path.resolve(__dirname, "../content/blog");

// Validation
if (!fs.existsSync(fullPath)) {
  console.error(`Error: File not found: ${fullPath}`);
  process.exit(1);
}

// Simple check to ensure we are processing blog content
// This logic assumes all posts are in content/blog per the current project structure
if (!fullPath.toLowerCase().startsWith(contentDir.toLowerCase())) {
  console.warn(
    `Warning: File appears to be outside ${contentDir}. Slug calculation might be incorrect.`
  );
}

// Calculate slug from path relative to content/blog
// e.g. C:\...\content\blog\nested\post.md -> nested/post
let relPath = path.relative(contentDir, fullPath);
// Remove extension (.md or .mdx)
relPath = relPath.replace(/\.mdx?$/, "");
// Ensure forward slashes for URL slug
const slug = relPath.split(path.sep).join("/");

console.log(`\nTARGET: ${slug}`);
console.log("--------------------------------------------------");

try {
  // 1. Run Next.js Build for Single Slug
  // We use the existing 'next build' command but inject our environment variables
  console.log("1. Building Static HTML...");
  console.log("   (This may take a moment as it compiles the worker)...");

  execSync("npx next build", {
    env: {
      ...process.env,
      BUILD_MODE: "embeddable-bootstrap",
      ONLY_BUILD_SLUG: slug,
    },
    stdio: "inherit", // Show build output to user
  });

  // 2. Run Bootstrap Fragment Fixer
  console.log("\n2. Processing HTML for Bootstrap Compatibility...");
  execSync("node scripts/bootstrap-fragment-fixer.js", {
    stdio: "inherit",
  });

  // 3. Verify Output
  // Next.js static export typically creates out/blog/slug.html or out/blog/slug/index.html
  const outDir = path.join(__dirname, "../out/blog");
  const possiblePaths = [path.join(outDir, `${slug}.html`), path.join(outDir, slug, "index.html")];

  const filesFound = possiblePaths.filter((p) => fs.existsSync(p));

  if (filesFound.length > 0) {
    console.log("\n--------------------------------------------------");
    console.log("SUCCESS! File converted.");
    console.log(`HTML Output: ${filesFound[0]}`);
    console.log("--------------------------------------------------");
  } else {
    console.error("\nError: Build completed but expected output file not found.");
    console.error("Expected locations:", possiblePaths.join(" or "));
  }
} catch (error) {
  console.error("\nConversion FAILED.");
  // The child process (next build) usually prints the error detail
  process.exit(1);
}
