# Migration Note for Folder Hierarchy Feature

## Important: Remove Old Route Directory

After pulling this branch, you need to manually delete the old blog route directory to avoid conflicts:

```bash
# Remove the old single-segment route
rm -rf src/app/blog/[slug]
```

## Why?

The blog route has been changed from `[slug]` (single segment) to `[...slug]` (catch-all) to support nested paths like:
- `/blog/standalone-post` (still works)
- `/blog/series-name/post-name` (new functionality)

Next.js doesn't allow both `[slug]` and `[...slug]` routes to exist simultaneously in the same directory.

## After Deletion

Once you've removed the old directory:

1. **Test standalone posts**: Navigate to `/blog/welcome` (or any root-level post)
2. **Test series posts**: Navigate to `/blog/example-series/01-getting-started`
3. **Test series pages**: Navigate to `/series` and `/series/example-series`

All routes should now work correctly!

## Build the Project

```bash
npm run build
```

This will verify that all static routes are generated properly.
