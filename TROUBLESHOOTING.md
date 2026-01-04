# Troubleshooting Guide

## Issue: 404 Errors After Build

### Symptoms
- `npm run dev` works fine
- After `npm run build:standalone`, you get 404 errors
- URLs like `/blog/example-series/01-getting-started` don't work

### Root Cause
The project uses `trailingSlash: false` for better static hosting compatibility. This means:
- Files are generated as `.html` files: `01-getting-started.html`
- NOT as directories: `01-getting-started/index.html`

### Solution Steps

#### 1. Clean Everything
```bash
# Remove all build artifacts
rm -rf .next out node_modules/.cache
```

#### 2. Rebuild
```bash
npm run build:standalone
```

#### 3. Verify File Structure
Check that files are generated as `.html` files, not directories:

```bash
ls -la out/blog/
# Should show: welcome.html, thinking-in-react.html, etc.

ls -la out/blog/example-series/
# Should show: 01-getting-started.html, 02-advanced-usage.html
# NOT directories!
```

If you see directories instead of `.html` files, the config change wasn't applied.

#### 4. Test Serving

**Option A: Using `serve`** (recommended)
```bash
npx serve out
```

**Option B: Using Python**
```bash
cd out
python3 -m http.server 3000
```

**Option C: Using Node's http-server**
```bash
npx http-server out -p 3000
```

#### 5. Test URLs
Access these URLs (without trailing slashes):
- http://localhost:3000/blog/welcome
- http://localhost:3000/blog/example-series/01-getting-started
- http://localhost:3000/series/example-series

### Still Getting 404s?

#### Check 1: Are you accessing the right URL?
- ✅ Correct: `/blog/example-series/01-getting-started`
- ❌ Wrong: `/blog/example-series/01-getting-started/` (trailing slash)

With `trailingSlash: false`, trailing slashes will cause 404s.

#### Check 2: Did you rebuild after pulling changes?
If you pulled the latest code but didn't rebuild:
```bash
rm -rf .next out
npm run build:standalone
```

#### Check 3: Are you clicking old links?
If you're clicking links from an old build, they might have trailing slashes. Clear your browser cache or use incognito mode.

#### Check 4: Check the actual files
Manually verify the files exist:
```bash
# This should exist as a FILE:
ls -lh out/blog/example-series/01-getting-started.html

# NOT as a directory:
ls -lh out/blog/example-series/01-getting-started/
```

### Understanding the File Structure

#### With `trailingSlash: false` (current config):
```
out/
├── index.html
├── blog.html
├── blog/
│   ├── welcome.html
│   ├── thinking-in-react.html
│   └── example-series/
│       ├── 01-getting-started.html  ← FILE
│       └── 02-advanced-usage.html   ← FILE
└── series.html
```

URLs: `/blog/example-series/01-getting-started` (no trailing slash)

#### With `trailingSlash: true` (old config):
```
out/
├── index.html
├── blog/
│   └── index.html
├── blog/
│   ├── welcome/
│   │   └── index.html
│   └── example-series/
│       └── 01-getting-started/      ← DIRECTORY
│           └── index.html
└── series/
    └── index.html
```

URLs: `/blog/example-series/01-getting-started/` (WITH trailing slash)

## Issue: Links in the Site Have Trailing Slashes

### Symptom
Clicking links in your site adds a trailing slash to the URL, causing 404s.

### Cause
Next.js Link component respects the `trailingSlash` config, but only after a clean rebuild.

### Solution
```bash
rm -rf .next out
npm run build:standalone
```

The generated HTML will now have correct links without trailing slashes.

## Issue: Some Pages Work, Others Don't

### Likely Causes
1. **Mixed old/new builds**: Old pages with trailing slashes, new pages without
   - Solution: Clean rebuild (see above)

2. **Browser cache**: Browser is caching old HTML with wrong links
   - Solution: Hard refresh (Ctrl+Shift+R) or incognito mode

3. **Server caching**: Your HTTP server is caching old content
   - Solution: Restart the server after rebuild

## Issue: Works Locally but Not on Hosting Platform

### For Netlify/Vercel/Cloudflare Pages
These platforms handle trailing slashes automatically. If you're deploying there:
1. Ensure you're deploying the `out` folder
2. Check the platform's build settings
3. Consider keeping `trailingSlash: true` if you prefer (but rebuild!)

### For GitHub Pages
```bash
# In your repo settings, set:
# - Source: Deploy from a branch
# - Branch: main (or your branch)
# - Folder: /out
```

GitHub Pages handles both trailing slash configs well.

### For AWS S3 / Custom Server
For S3 or custom servers, `trailingSlash: false` works best as it:
- Requires no special redirect rules
- Works with standard S3 static hosting
- Compatible with basic web servers

## Quick Checklist

When troubleshooting 404s after build:

- [ ] Cleaned `.next` and `out` directories
- [ ] Rebuilt with `npm run build:standalone`
- [ ] Verified files are `.html` files (not directories)
- [ ] Tested URLs without trailing slashes
- [ ] Cleared browser cache or used incognito
- [ ] Restarted the HTTP server
- [ ] Checked actual file exists on disk

## Still Having Issues?

If you've tried everything above and still have problems:

1. **Share your build output**: Run `npm run build:standalone` and share the output
2. **Share file structure**: Run `find out -name '*.html' | head -20` and share results
3. **Share the exact URL**: What URL gives you 404?
4. **Share browser console**: Open DevTools → Console → Share any errors
5. **Try both servers**: Test with both `serve` and `python -m http.server`
