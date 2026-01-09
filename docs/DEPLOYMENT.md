# Deployment Guide

This guide explains how to deploy the **standalone version** of your blog to Vercel.

## ✅ Prerequisites

1. A [GitHub](https://github.com/) account.
2. A [Vercel](https://vercel.com/) account.
3. Your local project pushed to a GitHub repository.

---

## 🚀 Deploying to Vercel

Vercel is the recommended hosting platform as it provides the smoothest integration with Next.js.

### 1. Import Project

1. Log in to your Vercel Dashboard.
2. Click **"Add New..."** -> **"Project"**.
3. Select your git repository from the list and click **"Import"**.

### 2. Configure Project

Vercel should automatically detect that this is a Next.js project.

- **Framework Preset:** `Next.js`
- **Root Directory:** `./` (Leave default)
- **Build Command:** `npm run build` (or `next build`)
  - _Note: The default build command runs the standalone build._
- **Output Directory:** Leave default (empty).

### 3. Environment Variables (Important!)

To ensure your blog metadata is correct, you should set these environment variables in the **"Environment Variables"** section before deploying (or update them later in Settings).

Refer to your `config.ts` file for all used variables. Common ones include:

| Variable Name           | Description                          | Example                       |
| ----------------------- | ------------------------------------ | ----------------------------- |
| `SITE_NAME`             | The name of your blog                | `My Tech Blog`                |
| `SITE_URL`              | The production URL                   | `https://my-blog.vercel.app`  |
| `SITE_DESCRIPTION`      | SEO description                      | `Sharing my learning journey` |
| `NEXT_PUBLIC_BASE_PATH` | (Optional) If deploying to a subpath | `/blog`                       |

### 4. Deploy

Click **"Deploy"**. Vercel will build your site and assign it a domain (e.g., `project-name.vercel.app`).

---

## 🛠️ Verification

After deployment, visit your URL. You should see:

- The specific **Standalone** navigation (Header/Footer).
- Working internal links.
- Correct styling (Tailwind CSS).

If you see a directory listing or broken styles, ensure that `output: 'export'` is active in `next.config.ts` (it is by default in this template).

## 🔄 Re-deploying

Every time you push changes to your `main` branch on GitHub, Vercel will automatically trigger a new deployment.
