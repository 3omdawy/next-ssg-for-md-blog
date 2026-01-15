import { test, expect } from "@playwright/test";

test.describe("Blog E2E Tests", () => {
  test("Homepage loads correctly", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Tech Blog/);
    await expect(page.getByRole("heading", { level: 1, name: "Tech Blog" })).toBeVisible();
    await expect(page.getByText("Latest Posts")).toBeVisible();
  });

  test("Blog navigation works", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "View all" }).click();
    await expect(page).toHaveURL("/blog");
    await expect(page.getByRole("heading", { level: 1, name: "Blog Posts" })).toBeVisible();
  });

  test("Search functionality", async ({ page }) => {
    await page.goto("/blog");
    const searchInput = page.getByPlaceholder("Search posts...");
    await searchInput.fill("Your Post");
    await expect(page.getByRole("link", { name: "Your Post Title" }).first()).toBeVisible();
  });

  test("Dark mode toggle works", async ({ page }) => {
    await page.goto("/");
    const html = page.locator("html");
    // Initial state depends on system preference or default (light)
    // Let's assume default is light (no dark class)

    const themeButton = page
      .getByLabel("Toggle theme")
      .or(page.getByLabel("Switch to dark mode"))
      .or(page.getByLabel("Switch to light mode"));

    // Check initial state
    const initialClass = await html.getAttribute("class");

    await themeButton.click();

    // Check if class changed
    const newClass = await html.getAttribute("class");
    expect(newClass).not.toBe(initialClass);

    // Optionally check specifically for 'dark'
    if (initialClass?.includes("dark")) {
      expect(newClass).not.toContain("dark");
    } else {
      expect(newClass).toContain("dark");
    }
  });

  test("RTL content rendering", async ({ page }) => {
    await page.goto("/blog/arabic-sample-post");

    // Verify title is visible
    await expect(
      page.getByRole("heading", { name: "مرحباً بك في المدونة التقنية", level: 1 })
    ).toBeVisible();

    // Verify dir="rtl" is present on the main container
    // The main container has class "container" and "lang-ar"
    const container = page.locator(".container.lang-ar");
    await expect(container).toHaveAttribute("dir", "rtl");
  });

  test("Series Navigation", async ({ page }) => {
    // example-series/01-getting-started
    await page.goto("/blog/example-series/01-getting-started");

    // Check for "Part of: Example Series" badge
    await expect(page.getByText("Part of: Example Series")).toBeVisible();

    // Check for Next Series Navigation
    await expect(page.getByText("Next →")).toBeVisible();
  });
});
